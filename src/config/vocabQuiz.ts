import type { LangCode } from '../types/language'
import type { MeaningQuizEntry } from '../types/vocab'
import type { RefTable } from '../types/table'

export type VocabQuizMode = 'reading' | 'meaning'

export type JlptLevel = 'n5' | 'n4' | 'n3' | 'n2' | 'n1'

export const JLPT_LEVELS: JlptLevel[] = ['n5', 'n4', 'n3', 'n2', 'n1']

/** Words asked in one day session (matches generator). */
export const VOCAB_WORDS_PER_DAY = 20

export interface VocabQuizEntry extends MeaningQuizEntry {
  level: JlptLevel
  day: number
  reading: string
  meanings: Partial<Record<LangCode, string>>
}

export interface VocabManifest {
  wordsPerDay: number
  levels: Partial<
    Record<JlptLevel, { words: number; days: number; wordsPerDay: number }>
  >
}

const LANGS: LangCode[] = ['en', 'ko', 'ja', 'zh', 'fr', 'es', 'de', 'ru']

function fillAllLangs(value: string): Partial<Record<LangCode, string>> {
  return Object.fromEntries(LANGS.map((l) => [l, value]))
}

export function isVocabQuizEntry(entry: MeaningQuizEntry): entry is VocabQuizEntry {
  return (
    typeof (entry as VocabQuizEntry).level === 'string' &&
    typeof (entry as VocabQuizEntry).day === 'number' &&
    typeof (entry as VocabQuizEntry).reading === 'string' &&
    Boolean((entry as VocabQuizEntry).meanings)
  )
}

export function parseJlptLevel(value: string | undefined): JlptLevel | null {
  if (!value) return null
  const v = value.toLowerCase()
  return (JLPT_LEVELS as string[]).includes(v) ? (v as JlptLevel) : null
}

export function parseVocabDay(
  value: string | undefined,
  maxDay: number,
): number | null {
  if (value == null) return null
  const n = Number(value)
  if (!Number.isInteger(n) || n < 1 || n > maxDay) return null
  return n
}

export function jlptLevelLabel(level: JlptLevel): string {
  return level.toUpperCase()
}

/** No kanji — reading quiz is trivial or identical to the prompt. */
export function isKanaOnlyWord(word: string): boolean {
  const chars = [...word].filter(
    (c) => c !== 'ー' && c !== '・' && c !== ' ' && c !== '　',
  )
  if (chars.length === 0) return false
  if (chars.some((c) => /\p{Script=Han}/u.test(c))) return false
  return chars.every((c) => /[\u3040-\u309F\u30A0-\u30FF]/u.test(c))
}

export function isKatakanaOnlyWord(word: string): boolean {
  const chars = [...word].filter(
    (c) => c !== 'ー' && c !== '・' && c !== ' ' && c !== '　',
  )
  if (chars.length === 0) return false
  if (chars.some((c) => /\p{Script=Han}/u.test(c))) return false
  return chars.every((c) => /[\u30A0-\u30FF]/u.test(c))
}

export function isHiraganaOnlyWord(word: string): boolean {
  const chars = [...word].filter(
    (c) => c !== 'ー' && c !== '・' && c !== ' ' && c !== '　',
  )
  if (chars.length === 0) return false
  if (chars.some((c) => /\p{Script=Han}/u.test(c))) return false
  return chars.every((c) => /[\u3040-\u309F]/u.test(c))
}

export function dayLabel(day: number, learnerLang: LangCode): string {
  const prefix: Partial<Record<LangCode, string>> = {
    en: 'Day',
    ko: 'Day',
    ja: 'Day',
    zh: 'Day',
    fr: 'Jour',
    es: 'Día',
    de: 'Tag',
    ru: 'День',
  }
  return `${prefix[learnerLang] ?? 'Day'} ${day}`
}

/** Map stored vocab card into the active quiz mode’s answer field. */
export function toVocabModeEntry(
  entry: VocabQuizEntry,
  mode: VocabQuizMode,
): MeaningQuizEntry {
  if (mode === 'reading') {
    return {
      quiz_id: entry.quiz_id,
      question_word: entry.question_word,
      pronunciations: { ...entry.meanings },
      translations: fillAllLangs(entry.reading),
    }
  }

  return {
    quiz_id: entry.quiz_id,
    question_word: entry.question_word,
    pronunciations: fillAllLangs(entry.reading),
    translations: { ...entry.meanings },
  }
}

export function filterVocabByDay(
  entries: MeaningQuizEntry[],
  day: number,
): VocabQuizEntry[] {
  return entries.filter(
    (e): e is VocabQuizEntry => isVocabQuizEntry(e) && e.day === day,
  )
}

export function filterVocabTableByDay(
  table: RefTable | null | undefined,
  day: number,
): RefTable | null {
  if (!table) return null
  const dayText = String(day)
  return {
    ...table,
    rows: (table.rows ?? []).filter((row) => {
      const d = row.day
      const text =
        typeof d === 'string'
          ? d
          : d && typeof d === 'object'
            ? (d.en ?? Object.values(d)[0] ?? '')
            : ''
      return text === dayText
    }),
  }
}
