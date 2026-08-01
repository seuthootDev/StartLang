/**
 * Build JLPT vocab decks from OpenJLPT JSON (scripts/openjlpt/{n5..n1}.json).
 * Chunks each level into days of WORDS_PER_DAY words.
 *
 * Source: https://github.com/evanclan/OpenJLPT
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC_DIR = join(__dirname, 'openjlpt')
const OUT_DIR = join(ROOT, 'src/data/ja')

const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1']
const WORDS_PER_DAY = 20
const LANGS = ['en', 'ko', 'ja', 'zh', 'fr', 'es', 'de', 'it', 'ru']

function toHiragana(text) {
  return text.replace(/[\u30A1-\u30F6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60),
  )
}

function resolveReading(word, reading) {
  if (reading && reading.trim()) return toHiragana(reading.trim())
  if (/^[\u3040-\u309F\u30A0-\u30FFーゝゞヽヾ]+$/u.test(word)) {
    return toHiragana(word)
  }
  return ''
}

function meaningEn(meanings) {
  return (meanings ?? []).map((m) => String(m).trim()).filter(Boolean).join('; ')
}

function meaningMap(en) {
  return Object.fromEntries(LANGS.map((l) => [l, en || '—']))
}

function readingMap(hiragana) {
  return Object.fromEntries(LANGS.map((l) => [l, hiragana]))
}

const manifest = {
  wordsPerDay: WORDS_PER_DAY,
  levels: {},
}

for (const level of LEVELS) {
  const raw = JSON.parse(readFileSync(join(SRC_DIR, `${level}.json`), 'utf8'))
  const cleaned = []
  const seen = new Set()

  for (const item of raw) {
    const word = String(item.word ?? '').trim()
    if (!word || seen.has(word)) continue
    const reading = resolveReading(word, item.reading ?? '')
    if (!reading) continue
    const en = meaningEn(item.meanings)
    if (!en) continue
    seen.add(word)
    cleaned.push({ word, reading, en })
  }

  const dayCount = Math.max(1, Math.ceil(cleaned.length / WORDS_PER_DAY))
  const quiz = cleaned.map((e, index) => {
    const day = Math.floor(index / WORDS_PER_DAY) + 1
    const seq = String((index % WORDS_PER_DAY) + 1).padStart(2, '0')
    return {
      quiz_id: `ja_vocab_${level}_d${String(day).padStart(2, '0')}_${seq}`,
      level,
      day,
      question_word: e.word,
      reading: e.reading,
      meanings: meaningMap(e.en),
      pronunciations: {},
      translations: readingMap(e.reading),
    }
  })

  const table = {
    table_id: `ja_vocab_${level}_ref`,
    title: {
      en: `JLPT ${level.toUpperCase()} vocabulary`,
      ko: `JLPT ${level.toUpperCase()} 어휘`,
      ja: `JLPT ${level.toUpperCase()}語彙`,
      zh: `JLPT ${level.toUpperCase()}词汇`,
      fr: `Vocabulaire JLPT ${level.toUpperCase()}`,
      es: `Vocabulario JLPT ${level.toUpperCase()}`,
      de: `JLPT-${level.toUpperCase()}-Wortschatz`,
      ru: `Лексика JLPT ${level.toUpperCase()}`,
    },
    note: {
      en: `OpenJLPT · ${WORDS_PER_DAY} words/day · ${dayCount} days. Meanings start in English; run translate script for learner langs.`,
      ko: `OpenJLPT · Day당 ${WORDS_PER_DAY}단어 · ${dayCount}일. 뜻은 영어 시작, 번역 스크립트로 학습자 언어 채움.`,
      ja: `OpenJLPT · 1日${WORDS_PER_DAY}語 · ${dayCount}日。意味は英語から開始。`,
      zh: `OpenJLPT · 每天${WORDS_PER_DAY}词 · 共${dayCount}天。`,
      fr: `OpenJLPT · ${WORDS_PER_DAY} mots/jour · ${dayCount} jours.`,
      es: `OpenJLPT · ${WORDS_PER_DAY} palabras/día · ${dayCount} días.`,
      de: `OpenJLPT · ${WORDS_PER_DAY} Wörter/Tag · ${dayCount} Tage.`,
      ru: `OpenJLPT · ${WORDS_PER_DAY} слов/день · ${dayCount} дней.`,
    },
    columns: [
      {
        key: 'day',
        labels: {
          en: 'Day',
          ko: 'Day',
          ja: 'Day',
          zh: 'Day',
          fr: 'Day',
          es: 'Day',
          de: 'Day',
          ru: 'Day',
        },
      },
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
      {
        key: 'sound',
        labels: {
          en: 'Reading',
          ko: '읽기',
          ja: '読み',
          zh: '读法',
          fr: 'Lecture',
          es: 'Lectura',
          de: 'Lesung',
          ru: 'Чтение',
        },
      },
      {
        key: 'meaning',
        labels: {
          en: 'Meaning',
          ko: '의미',
          ja: '意味',
          zh: '意思',
          fr: 'Sens',
          es: 'Significado',
          de: 'Bedeutung',
          ru: 'Значение',
        },
      },
    ],
    rows: quiz.map((e) => ({
      day: String(e.day),
      form: e.question_word,
      sound: e.reading,
      meaning: meaningMap(e.meanings.en),
    })),
  }

  writeFileSync(join(OUT_DIR, `vocab.${level}.json`), `${JSON.stringify(quiz, null, 2)}\n`)
  writeFileSync(
    join(OUT_DIR, `vocab.${level}.table.json`),
    `${JSON.stringify(table, null, 2)}\n`,
  )

  manifest.levels[level] = {
    words: quiz.length,
    days: dayCount,
    wordsPerDay: WORDS_PER_DAY,
  }
  console.log(
    `${level.toUpperCase()}: ${quiz.length} words → ${dayCount} days (×${WORDS_PER_DAY})`,
  )
}

writeFileSync(
  join(OUT_DIR, 'vocab.manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
)
console.log('wrote vocab.n*.json + tables + manifest')
