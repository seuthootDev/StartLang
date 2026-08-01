/**
 * Translate vocab.*.json meanings from English into learner langs.
 * Resume-safe via scripts/.vocab-meaning-cache.json.
 * Applies cache to JSON after each target language finishes.
 *
 * Usage: node scripts/translate-vocab-meanings.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { spawnSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT_DIR = join(ROOT, 'src/data/ja')
const CACHE_PATH = join(ROOT, 'scripts/.vocab-meaning-cache.json')
const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1']

const TARGETS = [
  { code: 'ko', tl: 'ko' },
  { code: 'ja', tl: 'ja' },
  { code: 'zh', tl: 'zh-CN' },
  { code: 'fr', tl: 'fr' },
  { code: 'es', tl: 'es' },
  { code: 'de', tl: 'de' },
  { code: 'it', tl: 'it' },
  { code: 'ru', tl: 'ru' },
]

const CONCURRENCY = 8
const RETRIES = 4

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function loadCache() {
  try {
    return JSON.parse(readFileSync(CACHE_PATH, 'utf8'))
  } catch {
    return {}
  }
}

function saveCache(cache) {
  writeFileSync(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`)
}

function applyCache() {
  const result = spawnSync(process.execPath, [join(__dirname, 'apply-vocab-meaning-cache.mjs')], {
    cwd: ROOT,
    encoding: 'utf8',
  })
  if (result.stdout) process.stdout.write(result.stdout)
  if (result.stderr) process.stderr.write(result.stderr)
  if (result.status !== 0) {
    throw new Error(`apply-vocab-meaning-cache failed (${result.status})`)
  }
}

async function translateOnce(text, tl) {
  const url =
    'https://translate.googleapis.com/translate_a/single' +
    `?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(text)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const out = (data?.[0] ?? []).map((chunk) => chunk?.[0] ?? '').join('').trim()
  if (!out) throw new Error('empty translation')
  return out
}

async function translate(text, tl) {
  let lastErr
  for (let i = 0; i < RETRIES; i += 1) {
    try {
      return await translateOnce(text, tl)
    } catch (err) {
      lastErr = err
      await sleep(400 * (i + 1))
    }
  }
  throw lastErr
}

async function mapPool(items, limit, worker) {
  const results = new Array(items.length)
  let next = 0
  async function run() {
    while (next < items.length) {
      const i = next
      next += 1
      results[i] = await worker(items[i], i)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run))
  return results
}

const unique = [
  ...new Set(
    LEVELS.flatMap((level) => {
      const quiz = JSON.parse(readFileSync(join(OUT_DIR, `vocab.${level}.json`), 'utf8'))
      return quiz.map((e) => e.meanings?.en).filter(Boolean)
    }),
  ),
]
console.log(`unique English glosses: ${unique.length}`)

const cache = loadCache()

for (const { code, tl } of TARGETS) {
  const pending = unique.filter((en) => !cache[`${tl}::${en}`])
  console.log(`→ ${code} (${tl}): ${pending.length} to translate`)
  let done = 0
  await mapPool(pending, CONCURRENCY, async (en) => {
    const key = `${tl}::${en}`
    try {
      cache[key] = await translate(en, tl)
      done += 1
      if (done % 50 === 0 || done === pending.length) {
        console.log(`  ${code}: ${done}/${pending.length}`)
        saveCache(cache)
      }
    } catch (err) {
      console.warn(`  fail [${code}] “${en.slice(0, 40)}…”: ${err.message}`)
    }
  })
  saveCache(cache)
  console.log(`apply after ${code}`)
  applyCache()
  writeStatus('running', code)
}

writeStatus('done')
console.log('done')

function writeStatus(state, lastLang) {
  const path = join(ROOT, 'scripts/.vocab-translate-status.json')
  writeFileSync(
    path,
    `${JSON.stringify(
      {
        state,
        lastLang: lastLang ?? null,
        updatedAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  )
}
