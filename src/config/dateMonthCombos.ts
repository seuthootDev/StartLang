import type { LangCode } from '../types/language'
import type { MeaningQuizEntry } from '../types/vocab'

/** Japanese month kanji + 〜がつ readings (April/July/September are irregular). */
export const JA_MONTHS: Array<{
  n: number
  kanji: string
  reading: Partial<Record<LangCode, string>>
}> = [
  {
    n: 1,
    kanji: '一月',
    reading: {
      en: 'ichi-gatsu',
      ko: '이치가쓰',
      ja: 'いちがつ',
      zh: 'ichi-gatsu',
      fr: 'ichi-gatsu',
      es: 'ichi-gatsu',
      de: 'ichi-gatsu',
      ru: 'ити-гацу',
    },
  },
  {
    n: 2,
    kanji: '二月',
    reading: {
      en: 'ni-gatsu',
      ko: '니가쓰',
      ja: 'にがつ',
      zh: 'ni-gatsu',
      fr: 'ni-gatsu',
      es: 'ni-gatsu',
      de: 'ni-gatsu',
      ru: 'ни-гацу',
    },
  },
  {
    n: 3,
    kanji: '三月',
    reading: {
      en: 'san-gatsu',
      ko: '산가쓰',
      ja: 'さんがつ',
      zh: 'san-gatsu',
      fr: 'san-gatsu',
      es: 'san-gatsu',
      de: 'san-gatsu',
      ru: 'сан-гацу',
    },
  },
  {
    n: 4,
    kanji: '四月',
    reading: {
      en: 'shi-gatsu',
      ko: '시가쓰',
      ja: 'しがつ',
      zh: 'shi-gatsu',
      fr: 'shi-gatsu',
      es: 'shi-gatsu',
      de: 'shi-gatsu',
      ru: 'си-гацу',
    },
  },
  {
    n: 5,
    kanji: '五月',
    reading: {
      en: 'go-gatsu',
      ko: '고가쓰',
      ja: 'ごがつ',
      zh: 'go-gatsu',
      fr: 'go-gatsu',
      es: 'go-gatsu',
      de: 'go-gatsu',
      ru: 'го-гацу',
    },
  },
  {
    n: 6,
    kanji: '六月',
    reading: {
      en: 'roku-gatsu',
      ko: '로쿠가쓰',
      ja: 'ろくがつ',
      zh: 'roku-gatsu',
      fr: 'roku-gatsu',
      es: 'roku-gatsu',
      de: 'roku-gatsu',
      ru: 'року-гацу',
    },
  },
  {
    n: 7,
    kanji: '七月',
    reading: {
      en: 'shichi-gatsu',
      ko: '시치가쓰',
      ja: 'しちがつ',
      zh: 'shichi-gatsu',
      fr: 'shichi-gatsu',
      es: 'shichi-gatsu',
      de: 'shichi-gatsu',
      ru: 'сити-гацу',
    },
  },
  {
    n: 8,
    kanji: '八月',
    reading: {
      en: 'hachi-gatsu',
      ko: '하치가쓰',
      ja: 'はちがつ',
      zh: 'hachi-gatsu',
      fr: 'hachi-gatsu',
      es: 'hachi-gatsu',
      de: 'hachi-gatsu',
      ru: 'хати-гацу',
    },
  },
  {
    n: 9,
    kanji: '九月',
    reading: {
      en: 'ku-gatsu',
      ko: '쿠가쓰',
      ja: 'くがつ',
      zh: 'ku-gatsu',
      fr: 'ku-gatsu',
      es: 'ku-gatsu',
      de: 'ku-gatsu',
      ru: 'ку-гацу',
    },
  },
  {
    n: 10,
    kanji: '十月',
    reading: {
      en: 'juu-gatsu',
      ko: '주우가쓰',
      ja: 'じゅうがつ',
      zh: 'juu-gatsu',
      fr: 'juu-gatsu',
      es: 'juu-gatsu',
      de: 'juu-gatsu',
      ru: 'дзю:-гацу',
    },
  },
  {
    n: 11,
    kanji: '十一月',
    reading: {
      en: 'juuichi-gatsu',
      ko: '주우이치가쓰',
      ja: 'じゅういちがつ',
      zh: 'juuichi-gatsu',
      fr: 'juuichi-gatsu',
      es: 'juuichi-gatsu',
      de: 'juuichi-gatsu',
      ru: 'дзю:ити-гацу',
    },
  },
  {
    n: 12,
    kanji: '十二月',
    reading: {
      en: 'juuni-gatsu',
      ko: '주우니가쓰',
      ja: 'じゅうにがつ',
      zh: 'juuni-gatsu',
      fr: 'juuni-gatsu',
      es: 'juuni-gatsu',
      de: 'juuni-gatsu',
      ru: 'дзю:ни-гацу',
    },
  },
]

const NANNICHI_READING: Partial<Record<LangCode, string>> = {
  en: 'nannichi',
  ko: '난니치',
  ja: 'なんにち',
  zh: 'nannichi',
  fr: 'nannichi',
  es: 'nannichi',
  de: 'nannichi',
  ru: 'наннити',
}

const KO_MONTH_EN = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

const KO_MONTH_JA = [
  '',
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
] as const

const KO_MONTH_SOUND: Array<{
  n: number
  form: string
  reading: Partial<Record<LangCode, string>>
}> = [
  {
    n: 1,
    form: '1월',
    reading: {
      en: 'il-wol',
      ko: '일월',
      ja: 'イルウォル',
      zh: 'il-wol',
      fr: 'il-wol',
      es: 'il-wol',
      de: 'il-wol',
      ru: 'иль-воль',
    },
  },
  {
    n: 2,
    form: '2월',
    reading: {
      en: 'i-wol',
      ko: '이월',
      ja: 'イウォル',
      zh: 'i-wol',
      fr: 'i-wol',
      es: 'i-wol',
      de: 'i-wol',
      ru: 'и-воль',
    },
  },
  {
    n: 3,
    form: '3월',
    reading: {
      en: 'sam-wol',
      ko: '삼월',
      ja: 'サムウォル',
      zh: 'sam-wol',
      fr: 'sam-wol',
      es: 'sam-wol',
      de: 'sam-wol',
      ru: 'сам-воль',
    },
  },
  {
    n: 4,
    form: '4월',
    reading: {
      en: 'sa-wol',
      ko: '사월',
      ja: 'サウォル',
      zh: 'sa-wol',
      fr: 'sa-wol',
      es: 'sa-wol',
      de: 'sa-wol',
      ru: 'са-воль',
    },
  },
  {
    n: 5,
    form: '5월',
    reading: {
      en: 'o-wol',
      ko: '오월',
      ja: 'オウォル',
      zh: 'o-wol',
      fr: 'o-wol',
      es: 'o-wol',
      de: 'o-wol',
      ru: 'о-воль',
    },
  },
  {
    n: 6,
    form: '6월',
    reading: {
      en: 'yu-wol',
      ko: '유월',
      ja: 'ユウォル',
      zh: 'yu-wol',
      fr: 'yu-wol',
      es: 'yu-wol',
      de: 'yu-wol',
      ru: 'ю-воль',
    },
  },
  {
    n: 7,
    form: '7월',
    reading: {
      en: 'chir-wol',
      ko: '칠월',
      ja: 'チルウォル',
      zh: 'chir-wol',
      fr: 'chir-wol',
      es: 'chir-wol',
      de: 'chir-wol',
      ru: 'чиль-воль',
    },
  },
  {
    n: 8,
    form: '8월',
    reading: {
      en: 'pal-wol',
      ko: '팔월',
      ja: 'パルウォル',
      zh: 'pal-wol',
      fr: 'pal-wol',
      es: 'pal-wol',
      de: 'pal-wol',
      ru: 'паль-воль',
    },
  },
  {
    n: 9,
    form: '9월',
    reading: {
      en: 'gu-wol',
      ko: '구월',
      ja: 'クウォル',
      zh: 'gu-wol',
      fr: 'gu-wol',
      es: 'gu-wol',
      de: 'gu-wol',
      ru: 'ку-воль',
    },
  },
  {
    n: 10,
    form: '10월',
    reading: {
      en: 'si-wol',
      ko: '시월',
      ja: 'シウォル',
      zh: 'si-wol',
      fr: 'si-wol',
      es: 'si-wol',
      de: 'si-wol',
      ru: 'си-воль',
    },
  },
  {
    n: 11,
    form: '11월',
    reading: {
      en: 'sip-il-wol',
      ko: '십일월',
      ja: 'シピルウォル',
      zh: 'sip-il-wol',
      fr: 'sip-il-wol',
      es: 'sip-il-wol',
      de: 'sip-il-wol',
      ru: 'сип-иль-воль',
    },
  },
  {
    n: 12,
    form: '12월',
    reading: {
      en: 'sip-i-wol',
      ko: '십이월',
      ja: 'シピウォル',
      zh: 'sip-i-wol',
      fr: 'sip-i-wol',
      es: 'sip-i-wol',
      de: 'sip-i-wol',
      ru: 'сип-и-воль',
    },
  },
]

function pickJaMonth() {
  return JA_MONTHS[Math.floor(Math.random() * JA_MONTHS.length)]!
}

function pickKoMonth() {
  return KO_MONTH_SOUND[Math.floor(Math.random() * KO_MONTH_SOUND.length)]!
}

function joinReading(
  month: (typeof JA_MONTHS)[number],
  dayReading: string,
  lang: LangCode,
): string {
  const m = month.reading[lang] ?? month.reading.en ?? ''
  return `${m} ${dayReading}`.trim()
}

function koFullDateMeaning(month: number, day: number): Partial<Record<LangCode, string>> {
  return {
    en: `${KO_MONTH_EN[month]} ${day}`,
    ko: `${month}월 ${day}일`,
    ja: `${KO_MONTH_JA[month]}${day}日`,
    zh: `${month}月${day}日`,
    fr: `${day} ${KO_MONTH_EN[month].toLowerCase()}`,
    es: `${day} de ${KO_MONTH_EN[month].toLowerCase()}`,
    de: `${day}. ${KO_MONTH_EN[month]}`,
    ru: `${day} ${KO_MONTH_EN[month].toLowerCase()}`,
  }
}

/**
 * Prefix each Japanese day-reading card with a random 1–12 month so the
 * quiz practices 〜がつ + day together. Each card (and thus each choice)
 * carries its own month reading.
 */
export function applyRandomJapaneseMonths(
  entries: MeaningQuizEntry[],
): MeaningQuizEntry[] {
  return entries.map((entry) => {
    if (/_m\d+$/.test(entry.quiz_id)) return entry

    const isDay = /^ja_dates_day_\d+$/.test(entry.quiz_id)
    const isNannichi = entry.quiz_id === 'ja_dates_nannichi'
    if (!isDay && !isNannichi) return entry

    const month = pickJaMonth()
    const translations: MeaningQuizEntry['translations'] = {}

    if (isNannichi) {
      for (const lang of Object.keys(NANNICHI_READING) as LangCode[]) {
        translations[lang] = joinReading(
          month,
          NANNICHI_READING[lang] as string,
          lang,
        )
      }
    } else {
      for (const [lang, dayReading] of Object.entries(entry.translations)) {
        if (!dayReading) continue
        translations[lang as LangCode] = joinReading(
          month,
          dayReading,
          lang as LangCode,
        )
      }
    }

    return {
      ...entry,
      quiz_id: `${entry.quiz_id}_m${month.n}`,
      question_word: `${month.kanji}${entry.question_word}`,
      translations,
      pronunciations: {},
    }
  })
}

/**
 * Korean calendar day cards (1일, 5일…): prefix a random 1–12월.
 * Prompt becomes `3월 5일`; choices become full dates (March 5, …).
 */
export function applyRandomKoreanMonths(
  entries: MeaningQuizEntry[],
): MeaningQuizEntry[] {
  return entries.map((entry) => {
    if (/_m\d+$/.test(entry.quiz_id)) return entry

    const match = /^ko_calendar_day_(\d+)$/.exec(entry.quiz_id)
    if (!match) return entry

    const day = Number(match[1])
    const month = pickKoMonth()
    const meanings = koFullDateMeaning(month.n, day)
    const pronunciations: MeaningQuizEntry['pronunciations'] = {}
    for (const lang of Object.keys(month.reading) as LangCode[]) {
      const daySound = entry.pronunciations[lang] ?? entry.pronunciations.en ?? ''
      const monthSound = month.reading[lang] ?? month.reading.en ?? ''
      pronunciations[lang] = `${monthSound} ${daySound}`.trim()
    }

    return {
      ...entry,
      quiz_id: `${entry.quiz_id}_m${month.n}`,
      question_word: `${month.n}월 ${day}일`,
      translations: meanings,
      pronunciations,
    }
  })
}

export type DateMonthComboMode = 'ja' | 'ko'

export function applyDateMonthCombos(
  entries: MeaningQuizEntry[],
  mode: DateMonthComboMode,
): MeaningQuizEntry[] {
  return mode === 'ja'
    ? applyRandomJapaneseMonths(entries)
    : applyRandomKoreanMonths(entries)
}
