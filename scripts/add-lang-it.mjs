/**
 * Add Italian (`it`) keys to localized maps in src/data JSON
 * and selected TS config files. Copies from `en` when present,
 * else from `es` / `fr` / first string value.
 *
 * JLPT meanings currently fall back to English glosses until a
 * proper Italian pass is done (~8k entries).
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LANG_KEYS = new Set(['en', 'ko', 'ja', 'zh', 'fr', 'es', 'de', 'it', 'ru'])

function pickIt(map) {
  if (typeof map.it === 'string') return map.it
  if (typeof map.en === 'string') return map.en
  if (typeof map.es === 'string') return map.es
  if (typeof map.fr === 'string') return map.fr
  for (const [k, v] of Object.entries(map)) {
    if (LANG_KEYS.has(k) && typeof v === 'string') return v
  }
  return null
}

function isLangMap(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false
  const keys = Object.keys(obj)
  if (keys.length === 0) return false
  let langish = 0
  for (const k of keys) {
    if (!LANG_KEYS.has(k)) return false
    if (typeof obj[k] !== 'string' && !Array.isArray(obj[k])) return false
    langish += 1
  }
  return langish >= 2 && ('en' in obj || 'ko' in obj || 'fr' in obj)
}

function walk(node, stats) {
  if (Array.isArray(node)) {
    for (const item of node) walk(item, stats)
    return
  }
  if (!node || typeof node !== 'object') return

  if (isLangMap(node)) {
    if (typeof node.it === 'string') {
      /* keep */
    } else if (Array.isArray(node.en)) {
      /* string[] maps — copy en array */
      node.it = structuredClone(node.en)
      stats.added += 1
    } else {
      const v = pickIt(node)
      if (v != null) {
        node.it = v
        stats.added += 1
      }
    }
  }

  for (const v of Object.values(node)) walk(v, stats)
}

function walkDir(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walkDir(p, out)
    else if (extname(name) === '.json') out.push(p)
  }
  return out
}

function patchJson(file) {
  const raw = readFileSync(file, 'utf8')
  const data = JSON.parse(raw)
  const stats = { added: 0 }
  walk(data, stats)
  if (stats.added > 0) {
    writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  }
  return stats.added
}

/** Insert `it: <same as en or de>` before `ru:` in lang map literals. */
function patchTsLangMaps(file) {
  let src = readFileSync(file, 'utf8')
  const before = src
  // After a de: '...' line, before ru: — insert it with de's value (usually latin like en)
  src = src.replace(
    /(\n(\s*)de: ('[^']*'|"[^"]*"),)(\n\2)(ru:)/g,
    (m, deLine, indent, deVal, nl, ru) => {
      if (m.includes("it:")) return m
      return `${deLine}${nl}it: ${deVal},${nl}${ru}`
    },
  )
  // Objects that have es then ru without de
  src = src.replace(
    /(\n(\s*)es: ('[^']*'|"[^"]*"),)(\n\2)(ru:)/g,
    (m, esLine, indent, esVal, nl, ru) => {
      if (src.slice(src.indexOf(m) - 40, src.indexOf(m)).includes('de:')) return m
      return `${esLine}${nl}it: ${esVal},${nl}${ru}`
    },
  )
  // Top-level style: de: 'x',\n  ru: without matching indent via previous — also
  // LEVEL-like: de: 'Grundlagen',\n    ru:
  src = src.replace(
    /(de: ('[^']*'),\n)(\s*)(ru:)/g,
    (m, deLine, deVal, indent, ru) => {
      if (m.includes('it:')) return m
      // avoid double-insert if already patched with it on next line check
      return `${deLine}${indent}it: ${deVal},\n${indent}${ru}`
    },
  )

  if (src !== before) writeFileSync(file, src, 'utf8')
  return src !== before
}

const dataDir = join(ROOT, 'src/data')
const files = walkDir(dataDir)
let total = 0
for (const f of files) {
  total += patchJson(f)
}
console.log(`JSON: added ${total} it keys across ${files.length} files`)

const tsFiles = [
  join(ROOT, 'src/config/dateMonthCombos.ts'),
  join(ROOT, 'src/config/categories.ts'),
]
for (const f of tsFiles) {
  const changed = patchTsLangMaps(f)
  console.log(`TS ${f}: ${changed ? 'patched' : 'unchanged'}`)
}

// Generators LANGS arrays
for (const name of readdirSync(join(ROOT, 'scripts'))) {
  if (!name.startsWith('gen-') || !name.endsWith('.mjs')) continue
  const p = join(ROOT, 'scripts', name)
  let s = readFileSync(p, 'utf8')
  const next = s.replace(
    /const LANGS = \['en', 'ko', 'ja', 'zh', 'fr', 'es', 'de', 'ru'\]/g,
    "const LANGS = ['en', 'ko', 'ja', 'zh', 'fr', 'es', 'de', 'it', 'ru']",
  )
  if (next !== s) {
    writeFileSync(p, next, 'utf8')
    console.log(`updated LANGS in ${name}`)
  }
}
