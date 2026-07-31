import type { LangCode, TargetLangCode } from '../types/language'
import type { MeaningQuizEntry } from '../types/vocab'

export type NumberSystemId = 'sino' | 'native'

const COMBO_COUNT = 5

const DIGIT_TRANSLATIONS = (n: number): Partial<Record<LangCode, string>> => {
  const s = String(n)
  return {
    en: s,
    ko: s,
    ja: s,
    zh: s,
    fr: s,
    es: s,
    de: s,
    ru: s,
  }
}

const KO_SINO_ONES = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'] as const
const KO_NATIVE_ONES = [
  '',
  '하나',
  '둘',
  '셋',
  '넷',
  '다섯',
  '여섯',
  '일곱',
  '여덟',
  '아홉',
] as const
const KO_NATIVE_TENS: Record<number, string> = {
  10: '열',
  20: '스물',
  30: '서른',
  40: '마흔',
  50: '쉰',
  60: '예순',
  70: '일흔',
  80: '여든',
  90: '아흔',
}

const JA_SINO_ONES = [
  '',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
] as const
const JA_SINO_ONES_READ = [
  '',
  'ichi',
  'ni',
  'san',
  'yon',
  'go',
  'roku',
  'nana',
  'hachi',
  'kyuu',
] as const
const JA_SINO_ONES_KO = [
  '',
  '이치',
  '니',
  '산',
  '욘',
  '고',
  '로쿠',
  '나나',
  '하치',
  '큐우',
] as const

function shuffleInPlace<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}

function pickDistinct(min: number, max: number, count: number, exclude: Set<number>): number[] {
  const pool: number[] = []
  for (let n = min; n <= max; n += 1) {
    if (!exclude.has(n)) pool.push(n)
  }
  return shuffleInPlace(pool).slice(0, count)
}

function koSinoWord(n: number): string {
  if (n < 10) return KO_SINO_ONES[n]
  if (n === 10) return '십'
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const tensPart = tens === 1 ? '십' : `${KO_SINO_ONES[tens]}십`
  return ones === 0 ? tensPart : `${tensPart}${KO_SINO_ONES[ones]}`
}

function koSinoReading(n: number): { en: string; ja: string; ko: string } {
  const map: Record<number, { en: string; ja: string }> = {
    1: { en: 'il', ja: 'イル' },
    2: { en: 'i', ja: 'イ' },
    3: { en: 'sam', ja: 'サム' },
    4: { en: 'sa', ja: 'サ' },
    5: { en: 'o', ja: 'オ' },
    6: { en: 'yuk', ja: 'ユク' },
    7: { en: 'chil', ja: 'チル' },
    8: { en: 'pal', ja: 'パル' },
    9: { en: 'gu', ja: 'ク' },
    10: { en: 'sip', ja: 'シプ' },
  }
  if (n <= 10) {
    const m = map[n]
    return { en: m.en, ja: m.ja, ko: koSinoWord(n) }
  }
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const tenRead =
    tens === 1 ? 'sip' : `${map[tens].en}-sip`
  const tenJa =
    tens === 1 ? 'シプ' : `${map[tens].ja}シプ`
  if (ones === 0) return { en: tenRead, ja: tenJa, ko: koSinoWord(n) }
  return {
    en: `${tenRead}-${map[ones].en}`,
    ja: `${tenJa}${map[ones].ja}`,
    ko: koSinoWord(n),
  }
}

function koNativeWord(n: number): string {
  if (n < 10) return KO_NATIVE_ONES[n]
  if (n === 10) return '열'
  if (n % 10 === 0) return KO_NATIVE_TENS[n]
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  return `${KO_NATIVE_TENS[tens]}${KO_NATIVE_ONES[ones]}`
}

function koNativeReading(n: number): { en: string; ja: string; ko: string } {
  const onesEn = [
    '',
    'ha-na',
    'dul',
    'set',
    'net',
    'da-seot',
    'yeo-seot',
    'il-gop',
    'yeo-deol',
    'a-hop',
  ]
  const onesJa = [
    '',
    'ハナ',
    'ドゥル',
    'セッ',
    'ネッ',
    'ダソッ',
    'ヨソッ',
    'イルゴプ',
    'ヨドル',
    'アホプ',
  ]
  const tensEn: Record<number, string> = {
    10: 'yeol',
    20: 'seu-mul',
    30: 'seo-reun',
    40: 'ma-heun',
    50: 'swin',
    60: 'ye-sun',
    70: 'il-heun',
    80: 'yeo-deun',
    90: 'a-heun',
  }
  const tensJa: Record<number, string> = {
    10: 'ヨル',
    20: 'スムル',
    30: 'ソルン',
    40: 'マフン',
    50: 'スィン',
    60: 'イェスン',
    70: 'イルフン',
    80: 'ヨドゥン',
    90: 'アフン',
  }
  if (n < 10) {
    return { en: onesEn[n], ja: onesJa[n], ko: KO_NATIVE_ONES[n] }
  }
  if (n === 10 || n % 10 === 0) {
    return { en: tensEn[n], ja: tensJa[n], ko: KO_NATIVE_TENS[n] }
  }
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  return {
    en: `${tensEn[tens]}-${onesEn[ones]}`,
    ja: `${tensJa[tens]}${onesJa[ones]}`,
    ko: koNativeWord(n),
  }
}

function jaSinoWord(n: number): string {
  if (n < 10) return JA_SINO_ONES[n]
  if (n === 10) return '十'
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const tensPart = tens === 1 ? '十' : `${JA_SINO_ONES[tens]}十`
  return ones === 0 ? tensPart : `${tensPart}${JA_SINO_ONES[ones]}`
}

function jaSinoReading(n: number): { en: string; ko: string; ja: string } {
  if (n < 10) {
    return {
      en: JA_SINO_ONES_READ[n],
      ko: JA_SINO_ONES_KO[n],
      ja: JA_SINO_ONES_READ[n],
    }
  }
  if (n === 10) return { en: 'juu', ko: '주우', ja: 'じゅう' }
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const tenEn = tens === 1 ? 'juu' : `${JA_SINO_ONES_READ[tens]}-juu`
  const tenKo = tens === 1 ? '주우' : `${JA_SINO_ONES_KO[tens]}주우`
  if (ones === 0) {
    return {
      en: tenEn,
      ko: tenKo,
      ja: tens === 1 ? 'じゅう' : `${toJaKanaHint(tens)}じゅう`,
    }
  }
  return {
    en: `${tenEn}-${JA_SINO_ONES_READ[ones]}`,
    ko: `${tenKo}${JA_SINO_ONES_KO[ones]}`,
    ja: `${tens === 1 ? 'じゅう' : `${toJaKanaHint(tens)}じゅう`}${toJaKanaHint(ones)}`,
  }
}

function toJaKanaHint(ones: number): string {
  const map = [
    '',
    'いち',
    'に',
    'さん',
    'よん',
    'ご',
    'ろく',
    'なな',
    'はち',
    'きゅう',
  ]
  return map[ones]
}

function makeEntry(
  quizId: string,
  word: string,
  n: number,
  reading: { en: string; ko?: string; ja?: string },
): MeaningQuizEntry {
  return {
    quiz_id: quizId,
    question_word: word,
    pronunciations: {
      en: reading.en,
      ko: reading.ko ?? reading.en,
      ja: reading.ja ?? reading.en,
      zh: reading.en,
      fr: reading.en,
      es: reading.en,
      de: reading.en,
      ru: reading.en,
    },
    translations: DIGIT_TRANSLATIONS(n),
  }
}

/** Random compound numbers (11–99) built from the language’s number system. */
export function generateNumberComboEntries(
  targetLang: TargetLangCode,
  system: NumberSystemId,
  count = COMBO_COUNT,
): MeaningQuizEntry[] {
  // Japanese native counters (ひとつ…) do not compose past 10.
  if (targetLang === 'ja' && system === 'native') return []

  const exclude = new Set<number>()
  // Prefer non-round teens/compounds for practice.
  const candidates = pickDistinct(11, 99, count * 4, exclude).filter(
    (n) => n % 10 !== 0,
  )
  const chosen = candidates.slice(0, count)
  // Fallback if filter too aggressive
  while (chosen.length < count) {
    const n = 11 + Math.floor(Math.random() * 89)
    if (n % 10 === 0 || chosen.includes(n)) continue
    chosen.push(n)
  }

  return chosen.map((n) => {
    if (targetLang === 'ko' && system === 'sino') {
      const reading = koSinoReading(n)
      return makeEntry(
        `ko_numbers_sino_combo_${n}`,
        koSinoWord(n),
        n,
        reading,
      )
    }
    if (targetLang === 'ko' && system === 'native') {
      const reading = koNativeReading(n)
      return makeEntry(
        `ko_numbers_native_combo_${n}`,
        koNativeWord(n),
        n,
        reading,
      )
    }
    // ja sino
    const reading = jaSinoReading(n)
    return makeEntry(
      `ja_numbers_sino_combo_${n}`,
      jaSinoWord(n),
      n,
      reading,
    )
  })
}

export function filterNumberSystem(
  entries: MeaningQuizEntry[],
  system: NumberSystemId,
): MeaningQuizEntry[] {
  return entries.filter((entry) =>
    entry.quiz_id.includes(`_numbers_${system}_`),
  )
}
