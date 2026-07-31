/**
 * Apply scripts/.vocab-meaning-cache.json onto vocab.*.json (+ tables).
 * Safe to run while translate-vocab-meanings.mjs is still filling the cache.
 */
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

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
  { code: 'ru', tl: 'ru' },
]

const cache = JSON.parse(readFileSync(CACHE_PATH, 'utf8'))

function localized(en) {
  const out = { en }
  for (const { code, tl } of TARGETS) {
    out[code] = cache[`${tl}::${en}`] ?? en
  }
  return out
}

let filled = 0
let missingKo = 0
for (const level of LEVELS) {
  const quiz = JSON.parse(readFileSync(join(OUT_DIR, `vocab.${level}.json`), 'utf8'))
  const table = JSON.parse(
    readFileSync(join(OUT_DIR, `vocab.${level}.table.json`), 'utf8'),
  )

  for (const entry of quiz) {
    const en = entry.meanings?.en
    if (!en) continue
    entry.meanings = localized(en)
    if (entry.meanings.ko && entry.meanings.ko !== en) filled += 1
    else missingKo += 1
  }
  for (const row of table.rows ?? []) {
    const en =
      typeof row.meaning === 'string' ? row.meaning : row.meaning?.en
    if (!en) continue
    row.meaning = localized(en)
  }

  writeFileSync(join(OUT_DIR, `vocab.${level}.json`), `${JSON.stringify(quiz, null, 2)}\n`)
  writeFileSync(
    join(OUT_DIR, `vocab.${level}.table.json`),
    `${JSON.stringify(table, null, 2)}\n`,
  )
  console.log(`applied ${level}`)
}

console.log(`ko filled≈${filled}, still en≈${missingKo}`)
