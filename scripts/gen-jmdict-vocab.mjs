/**
 * Build Japanese joyo vocab quiz + table from JMdict_b + KANJIDIC2 grades.
 *
 * Word grade = max KANJIDIC2 <grade> of its kanji (1–6 elementary, 8 junior high).
 * ~PER_GRADE common (P) words per grade. Readings are hiragana; meanings EN for now.
 *
 * Sources: EDRDG JMdict / KANJIDIC2 — acknowledge in app docs.
 */
import { createReadStream, readFileSync, writeFileSync } from 'fs'
import { createInterface } from 'readline'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const JMDICT = join(ROOT, 'src/data/ja/JMdict_b')
const KANJIDIC = join(ROOT, 'src/data/ja/kanjidic2.xml')
const OUT_JSON = join(ROOT, 'src/data/ja/vocab.json')
const OUT_TABLE = join(ROOT, 'src/data/ja/vocab.table.json')

const PER_GRADE = 100
const MAX_KEB_LEN = 4
const JOYO_GRADES = new Set([1, 2, 3, 4, 5, 6, 8])
const P_TAGS = new Set(['news1', 'ichi1', 'spec1', 'gai1'])
const LANGS = ['en', 'ko', 'ja', 'zh', 'fr', 'es', 'de', 'ru']

function loadKanjiGrades(xmlPath) {
  const xml = readFileSync(xmlPath, 'utf8')
  const map = new Map()
  for (const m of xml.matchAll(
    /<literal>([^<]+)<\/literal>[\s\S]*?<grade>(\d+)<\/grade>/g,
  )) {
    const grade = Number(m[2])
    if (JOYO_GRADES.has(grade)) map.set(m[1], grade)
  }
  return map
}

function wordGrade(keb, gradeMap) {
  const chars = [...keb].filter((c) => /\p{Script=Han}/u.test(c))
  if (chars.length === 0) return null
  let max = 0
  for (const c of chars) {
    const g = gradeMap.get(c)
    if (g == null) return null
    if (g > max) max = g
  }
  return max
}

function hasKanji(text) {
  return /\p{Script=Han}/u.test(text)
}

function isPriority(tags) {
  return tags.some((t) => P_TAGS.has(t))
}

function nfRank(tags) {
  for (const t of tags) {
    const m = /^nf(\d+)$/.exec(t)
    if (m) return Number(m[1])
  }
  return 99
}

function meaningMap(gloss) {
  const text = gloss || '—'
  return Object.fromEntries(LANGS.map((l) => [l, text]))
}

function readingMap(hiragana) {
  return Object.fromEntries(LANGS.map((l) => [l, hiragana]))
}

function parseEntry(xml, gradeMap) {
  const seq = xml.match(/<ent_seq>(\d+)<\/ent_seq>/)?.[1]
  if (!seq) return null

  const kBlocks = [...xml.matchAll(/<k_ele>([\s\S]*?)<\/k_ele>/g)].map((m) => m[1])
  const rBlocks = [...xml.matchAll(/<r_ele>([\s\S]*?)<\/r_ele>/g)].map((m) => m[1])
  if (kBlocks.length === 0 || rBlocks.length === 0) return null

  const kanjiForms = kBlocks.map((block) => ({
    keb: block.match(/<keb>([^<]+)<\/keb>/)?.[1] ?? '',
    pri: [...block.matchAll(/<ke_pri>([^<]+)<\/ke_pri>/g)].map((m) => m[1]),
  }))

  const readings = rBlocks.map((block) => ({
    reb: block.match(/<reb>([^<]+)<\/reb>/)?.[1] ?? '',
    pri: [...block.matchAll(/<re_pri>([^<]+)<\/re_pri>/g)].map((m) => m[1]),
    noKanji: block.includes('<re_nokanji'),
  }))

  const gloss =
    xml.match(/<gloss(?:\s[^>]*)?>([^<]+)<\/gloss>/)?.[1]?.trim() ?? ''

  const misc = [...xml.matchAll(/<misc>([^<]+)<\/misc>/g)].map((m) => m[1])
  if (misc.some((m) => m === '&uk;' || m === 'uk')) return null

  const candidates = kanjiForms.filter(
    (k) =>
      k.keb &&
      hasKanji(k.keb) &&
      k.keb.length <= MAX_KEB_LEN &&
      !k.keb.includes('・') &&
      isPriority(k.pri) &&
      wordGrade(k.keb, gradeMap) != null,
  )
  if (candidates.length === 0) return null

  candidates.sort((a, b) => nfRank(a.pri) - nfRank(b.pri))
  const bestK = candidates[0]
  const grade = wordGrade(bestK.keb, gradeMap)
  if (grade == null) return null

  const readingCandidates = readings.filter(
    (r) => r.reb && !r.noKanji && /^[\u3040-\u309Fー]+$/.test(r.reb),
  )
  if (readingCandidates.length === 0) return null

  const priorityReading = readingCandidates.find((r) => isPriority(r.pri))
  const bestR = priorityReading ?? readingCandidates[0]

  return {
    seq,
    keb: bestK.keb,
    reb: bestR.reb,
    gloss,
    grade,
    nf: Math.min(nfRank(bestK.pri), nfRank(bestR.pri)),
  }
}

console.log('Loading KANJIDIC2 grades…')
const gradeMap = loadKanjiGrades(KANJIDIC)
console.log(`  joyo kanji with grade: ${gradeMap.size}`)

const byGrade = new Map([...JOYO_GRADES].map((g) => [g, []]))
const seenKeb = new Set()

const rl = createInterface({
  input: createReadStream(JMDICT, { encoding: 'utf8' }),
  crlfDelay: Infinity,
})

let buf = ''
let scanned = 0
for await (const line of rl) {
  buf += `${line}\n`
  if (!line.includes('</entry>')) continue
  scanned += 1
  const parsed = parseEntry(buf, gradeMap)
  buf = ''
  if (!parsed) continue
  if (seenKeb.has(parsed.keb)) continue
  seenKeb.add(parsed.keb)
  byGrade.get(parsed.grade).push(parsed)
}

const picked = []
for (const grade of [...JOYO_GRADES].sort((a, b) => a - b)) {
  const list = byGrade.get(grade)
  list.sort((a, b) => a.nf - b.nf || a.seq.localeCompare(b.seq))
  const slice = list.slice(0, PER_GRADE)
  picked.push(...slice)
  console.log(`  grade ${grade}: ${list.length} candidates → ${slice.length}`)
}

const quiz = picked.map((e) => ({
  quiz_id: `ja_vocab_g${e.grade}_${e.seq}`,
  grade: e.grade,
  question_word: e.keb,
  reading: e.reb,
  meanings: meaningMap(e.gloss),
  pronunciations: {},
  translations: readingMap(e.reb),
}))

const meaningLabels = {
  en: 'Meaning',
  ko: '의미',
  ja: '意味',
  zh: '意思',
  fr: 'Sens',
  es: 'Significado',
  de: 'Bedeutung',
  ru: 'Значение',
}
const soundLabels = {
  en: 'Reading',
  ko: '읽기',
  ja: '読み',
  zh: '读法',
  fr: 'Lecture',
  es: 'Lectura',
  de: 'Lesung',
  ru: 'Чтение',
}
const gradeLabels = {
  en: 'Grade',
  ko: '학년',
  ja: '学年',
  zh: '学年',
  fr: 'Niveau',
  es: 'Grado',
  de: 'Stufe',
  ru: 'Класс',
}

const table = {
  table_id: 'ja_vocab_ref',
  title: {
    en: 'Joyo kanji words by school grade',
    ko: '학년별 상용 한자 단어',
    ja: '学年別・常用漢字の語彙',
    zh: '按学年的常用汉字词',
    fr: 'Mots jouyou par niveau scolaire',
    es: 'Palabras joyo por grado escolar',
    de: 'Joyo-Wörter nach Schuljahr',
    ru: 'Слова дзёё по школьным классам',
  },
  note: {
    en: 'From JMdict + KANJIDIC2 (EDRDG). Meanings are English for now; translate per learner language later. Quiz: reading (hiragana) or meaning.',
    ko: '출처 JMdict + KANJIDIC2(EDRDG). 뜻은 당분간 영어이며 학습자 언어별 번역은 추후. 퀴즈: 읽기(히라가나) 또는 의미.',
    ja: '出典 JMdict + KANJIDIC2（EDRDG）。意味は当面英語。学習者言語への翻訳は後日。クイズは読み（ひらがな）または意味。',
    zh: '来源 JMdict + KANJIDIC2（EDRDG）。释义暂为英语，按学习语言翻译稍后。测验：读音（平假名）或意思。',
    fr: 'Source JMdict + KANJIDIC2 (EDRDG). Gloses EN pour l’instant. Quiz: lecture (hiragana) ou sens.',
    es: 'Fuente JMdict + KANJIDIC2 (EDRDG). Glosas EN por ahora. Quiz: lectura (hiragana) o significado.',
    de: 'Quelle JMdict + KANJIDIC2 (EDRDG). EN-Glossen vorerst. Quiz: Lesung (Hiragana) oder Bedeutung.',
    ru: 'Источник JMdict + KANJIDIC2 (EDRDG). Пока глоссы EN. Квиз: чтение (хирагана) или значение.',
  },
  rules: {
    en: [
      'Pick a school grade, then reading or meaning mode, then how many questions.',
      'Word grade = hardest joyo kanji in the word (KANJIDIC2). Grade 8 = junior high.',
      'Data © Electronic Dictionary Research and Development Group.',
    ],
    ko: [
      '학년을 고른 뒤 읽기/의미 모드와 문제 수를 선택하세요.',
      '단어 학년 = 단어 안 상용한자 중 가장 높은 KANJIDIC2 학년(8=중학).',
      '데이터 © Electronic Dictionary Research and Development Group.',
    ],
    ja: [
      '学年を選び、読み／意味モードと問題数を決めてください。',
      '語の学年＝含まれる常用漢字の最高学年（KANJIDIC2。8＝中学）。',
      'データ © Electronic Dictionary Research and Development Group.',
    ],
    zh: [
      '先选学年，再选读音/意思模式与题数。',
      '词的学年＝词内常用汉字的最高学年（KANJIDIC2；8＝初中）。',
      '数据 © Electronic Dictionary Research and Development Group.',
    ],
    fr: [
      'Choisissez le niveau, le mode (lecture/sens) et le nombre de questions.',
      'Niveau du mot = kanji joyo le plus avancé (KANJIDIC2 ; 8 = collège).',
      'Données © Electronic Dictionary Research and Development Group.',
    ],
    es: [
      'Elige grado, modo (lectura/significado) y número de preguntas.',
      'Grado de la palabra = kanji joyo más alto (KANJIDIC2; 8 = secundaria).',
      'Datos © Electronic Dictionary Research and Development Group.',
    ],
    de: [
      'Wähle Stufe, Modus (Lesung/Bedeutung) und Fragenanzahl.',
      'Wortstufe = höchstes Joyo-Kanji (KANJIDIC2; 8 = Mittelstufe).',
      'Daten © Electronic Dictionary Research and Development Group.',
    ],
    ru: [
      'Выберите класс, режим (чтение/значение) и число вопросов.',
      'Класс слова = самый высокий кандзи дзёё (KANJIDIC2; 8 = средняя школа).',
      'Данные © Electronic Dictionary Research and Development Group.',
    ],
  },
  columns: [
    { key: 'grade', labels: gradeLabels },
    {
      key: 'form',
      labels: {
        en: 'Japanese',
        ko: '일본어',
        ja: '日本語',
        zh: '日语',
        fr: 'Japonais',
        es: 'Japonés',
        de: 'Japanisch',
        ru: 'Японский',
      },
    },
    { key: 'sound', labels: soundLabels },
    { key: 'meaning', labels: meaningLabels },
  ],
  rows: picked.map((e) => ({
    grade: String(e.grade === 8 ? 'JH' : e.grade),
    form: e.keb,
    sound: e.reb,
    meaning: meaningMap(e.gloss),
  })),
}

writeFileSync(OUT_JSON, `${JSON.stringify(quiz, null, 2)}\n`)
writeFileSync(OUT_TABLE, `${JSON.stringify(table, null, 2)}\n`)
console.log(
  `jmdict vocab ok — scanned ${scanned}, wrote ${picked.length} (≤${PER_GRADE}/grade)`,
)
