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

export type DateMonthComboMode = 'ja' | 'ko' | 'ru'

/** Genitive month forms used in Russian dates (5 января). */
export const RU_MONTHS_GEN: Array<{
  n: number
  form: string
  reading: Partial<Record<LangCode, string>>
  name: Partial<Record<LangCode, string>>
}> = [
  {
    n: 1,
    form: 'января',
    reading: { en: 'yan-va-rya', ko: '얀바랴', ja: 'ヤンヴァーリャ', ru: 'января' },
    name: { en: 'January', ko: '1월', ja: '一月', zh: '一月', fr: 'janvier', es: 'enero', de: 'Januar', ru: 'январь' },
  },
  {
    n: 2,
    form: 'февраля',
    reading: { en: 'fev-ra-lya', ko: '페브랄랴', ja: 'フィヴラーリャ', ru: 'февраля' },
    name: { en: 'February', ko: '2월', ja: '二月', zh: '二月', fr: 'février', es: 'febrero', de: 'Februar', ru: 'февраль' },
  },
  {
    n: 3,
    form: 'марта',
    reading: { en: 'mar-ta', ko: '마르타', ja: 'マルタ', ru: 'марта' },
    name: { en: 'March', ko: '3월', ja: '三月', zh: '三月', fr: 'mars', es: 'marzo', de: 'März', ru: 'март' },
  },
  {
    n: 4,
    form: 'апреля',
    reading: { en: 'a-pre-lya', ko: '아프레랴', ja: 'アプレーリャ', ru: 'апреля' },
    name: { en: 'April', ko: '4월', ja: '四月', zh: '四月', fr: 'avril', es: 'abril', de: 'April', ru: 'апрель' },
  },
  {
    n: 5,
    form: 'мая',
    reading: { en: 'ma-ya', ko: '마야', ja: 'マーヤ', ru: 'мая' },
    name: { en: 'May', ko: '5월', ja: '五月', zh: '五月', fr: 'mai', es: 'mayo', de: 'Mai', ru: 'май' },
  },
  {
    n: 6,
    form: 'июня',
    reading: { en: 'i-yu-nya', ko: '이유냐', ja: 'イユーニャ', ru: 'июня' },
    name: { en: 'June', ko: '6월', ja: '六月', zh: '六月', fr: 'juin', es: 'junio', de: 'Juni', ru: 'июнь' },
  },
  {
    n: 7,
    form: 'июля',
    reading: { en: 'i-yu-lya', ko: '이율랴', ja: 'イユーリャ', ru: 'июля' },
    name: { en: 'July', ko: '7월', ja: '七月', zh: '七月', fr: 'juillet', es: 'julio', de: 'Juli', ru: 'июль' },
  },
  {
    n: 8,
    form: 'августа',
    reading: { en: 'av-gu-sta', ko: '아브구스타', ja: 'アーヴグスタ', ru: 'августа' },
    name: { en: 'August', ko: '8월', ja: '八月', zh: '八月', fr: 'août', es: 'agosto', de: 'August', ru: 'август' },
  },
  {
    n: 9,
    form: 'сентября',
    reading: { en: 'sen-tyab-rya', ko: '센탸브랴', ja: 'センチャーブリャ', ru: 'сентября' },
    name: { en: 'September', ko: '9월', ja: '九月', zh: '九月', fr: 'septembre', es: 'septiembre', de: 'September', ru: 'сентябрь' },
  },
  {
    n: 10,
    form: 'октября',
    reading: { en: 'ok-tyab-rya', ko: '옥탸브랴', ja: 'オクチャーブリャ', ru: 'октября' },
    name: { en: 'October', ko: '10월', ja: '十月', zh: '十月', fr: 'octobre', es: 'octubre', de: 'Oktober', ru: 'октябрь' },
  },
  {
    n: 11,
    form: 'ноября',
    reading: { en: 'no-yab-rya', ko: '나야브랴', ja: 'ナヤーブリャ', ru: 'ноября' },
    name: { en: 'November', ko: '11월', ja: '十一月', zh: '十一月', fr: 'novembre', es: 'noviembre', de: 'November', ru: 'ноябрь' },
  },
  {
    n: 12,
    form: 'декабря',
    reading: { en: 'de-kab-rya', ko: '디카브랴', ja: 'ヂィカブリーャ', ru: 'декабря' },
    name: { en: 'December', ko: '12월', ja: '十二月', zh: '十二月', fr: 'décembre', es: 'diciembre', de: 'Dezember', ru: 'декабрь' },
  },
]

function pickRuMonth() {
  return RU_MONTHS_GEN[Math.floor(Math.random() * RU_MONTHS_GEN.length)]!
}

function ruFullDateMeaning(
  month: (typeof RU_MONTHS_GEN)[number],
  day: number,
): Partial<Record<LangCode, string>> {
  return {
    en: `${month.name.en} ${day}`,
    ko: `${month.name.ko} ${day}일`,
    ja: `${month.name.ja}${day}日`,
    zh: `${month.name.zh}${day}日`,
    fr: `${day} ${month.name.fr}`,
    es: `${day} de ${month.name.es}`,
    de: `${day}. ${month.name.de}`,
    ru: `${day} ${month.form}`,
  }
}

export function baseDateQuizId(quizId: string): string {
  return quizId.replace(/_m\d+$/, '')
}

function monthFromQuizId(quizId: string): number | null {
  const match = /_m(\d+)$/.exec(quizId)
  return match ? Number(match[1]) : null
}

export function isDateMonthComboEntry(
  entry: MeaningQuizEntry,
  mode: DateMonthComboMode,
): boolean {
  const id = baseDateQuizId(entry.quiz_id)
  if (mode === 'ja') {
    return /^ja_dates_day_\d+$/.test(id) || id === 'ja_dates_nannichi'
  }
  if (mode === 'ru') {
    return /^ru_dates_day_\d+$/.test(id)
  }
  return /^ko_calendar_day_\d+$/.test(id)
}

function resolveBaseEntry(
  entry: MeaningQuizEntry,
  originals: MeaningQuizEntry[],
): MeaningQuizEntry {
  const id = baseDateQuizId(entry.quiz_id)
  return originals.find((e) => e.quiz_id === id) ?? { ...entry, quiz_id: id }
}

function withJapaneseMonth(
  entry: MeaningQuizEntry,
  month: (typeof JA_MONTHS)[number],
): MeaningQuizEntry {
  const id = baseDateQuizId(entry.quiz_id)
  const isNannichi = id === 'ja_dates_nannichi'
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

  // Prefer base form from originals (一日), not a previously prefixed prompt.
  const dayKanji =
    id === 'ja_dates_nannichi'
      ? '何日'
      : (entry.question_word.match(
          /(一日|二日|三日|四日|五日|六日|七日|八日|九日|十日|十一日|十二日|十三日|十四日|十五日|十六日|十七日|十八日|十九日|二十日|二十一日|二十二日|二十三日|二十四日|二十五日|二十六日|二十七日|二十八日|二十九日|三十日|三十一日|何日)$/,
        )?.[1] ??
        entry.question_word.replace(
          /^(一月|二月|三月|四月|五月|六月|七月|八月|九月|十月|十一月|十二月)/,
          '',
        ))

  return {
    ...entry,
    quiz_id: `${id}_m${month.n}`,
    question_word: `${month.kanji}${dayKanji}`,
    translations,
    pronunciations: {},
  }
}

function withKoreanMonth(
  entry: MeaningQuizEntry,
  month: (typeof KO_MONTH_SOUND)[number],
): MeaningQuizEntry {
  const id = baseDateQuizId(entry.quiz_id)
  const dayMatch = /^ko_calendar_day_(\d+)$/.exec(id)
  if (!dayMatch) return entry

  const day = Number(dayMatch[1])
  const pronunciations: MeaningQuizEntry['pronunciations'] = {}
  for (const lang of Object.keys(month.reading) as LangCode[]) {
    const daySound = entry.pronunciations[lang] ?? entry.pronunciations.en ?? ''
    const monthSound = month.reading[lang] ?? month.reading.en ?? ''
    pronunciations[lang] = `${monthSound} ${daySound}`.trim()
  }

  return {
    ...entry,
    quiz_id: `${id}_m${month.n}`,
    question_word: `${month.n}월 ${day}일`,
    translations: koFullDateMeaning(month.n, day),
    pronunciations,
  }
}

function withRussianMonth(
  entry: MeaningQuizEntry,
  month: (typeof RU_MONTHS_GEN)[number],
): MeaningQuizEntry {
  const id = baseDateQuizId(entry.quiz_id)
  const dayMatch = /^ru_dates_day_(\d+)$/.exec(id)
  if (!dayMatch) return entry

  const day = Number(dayMatch[1])
  const pronunciations: MeaningQuizEntry['pronunciations'] = {}
  for (const lang of Object.keys(month.reading) as LangCode[]) {
    const daySound = entry.pronunciations[lang] ?? entry.pronunciations.en ?? ''
    const monthSound = month.reading[lang] ?? month.reading.en ?? ''
    pronunciations[lang] = `${daySound} ${monthSound}`.trim()
  }
  // Fill remaining learner langs from en day + month reading.
  for (const lang of ['zh', 'fr', 'es', 'de'] as LangCode[]) {
    if (pronunciations[lang]) continue
    const daySound = entry.pronunciations[lang] ?? entry.pronunciations.en ?? ''
    const monthSound = month.reading[lang] ?? month.reading.en ?? ''
    pronunciations[lang] = `${daySound} ${monthSound}`.trim()
  }

  return {
    ...entry,
    quiz_id: `${id}_m${month.n}`,
    question_word: `${entry.question_word} ${month.form}`,
    translations: ruFullDateMeaning(month, day),
    pronunciations,
  }
}

/**
 * One random month for the prompt; the same month is applied to every
 * distractor so month reading alone cannot reveal the answer.
 */
export function entriesWithSharedMonth(
  current: MeaningQuizEntry,
  pool: MeaningQuizEntry[],
  mode: DateMonthComboMode,
): { current: MeaningQuizEntry; pool: MeaningQuizEntry[] } {
  const originals = pool.map((entry) => resolveBaseEntry(entry, pool))
  const baseCurrent = resolveBaseEntry(current, originals)
  if (!isDateMonthComboEntry(baseCurrent, mode)) {
    return { current, pool }
  }

  const forcedMonth = monthFromQuizId(current.quiz_id)
  const jaMonth =
    mode === 'ja'
      ? forcedMonth
        ? (JA_MONTHS.find((m) => m.n === forcedMonth) ?? pickJaMonth())
        : pickJaMonth()
      : null
  const koMonth =
    mode === 'ko'
      ? forcedMonth
        ? (KO_MONTH_SOUND.find((m) => m.n === forcedMonth) ?? pickKoMonth())
        : pickKoMonth()
      : null
  const ruMonth =
    mode === 'ru'
      ? forcedMonth
        ? (RU_MONTHS_GEN.find((m) => m.n === forcedMonth) ?? pickRuMonth())
        : pickRuMonth()
      : null

  const apply = (entry: MeaningQuizEntry): MeaningQuizEntry => {
    const base = resolveBaseEntry(entry, originals)
    if (!isDateMonthComboEntry(base, mode)) return base
    if (mode === 'ja') return withJapaneseMonth(base, jaMonth!)
    if (mode === 'ru') return withRussianMonth(base, ruMonth!)
    return withKoreanMonth(base, koMonth!)
  }

  const sharedCurrent = apply(baseCurrent)
  const sharedPool = originals
    .filter(
      (entry) =>
        isDateMonthComboEntry(entry, mode) &&
        baseDateQuizId(entry.quiz_id) !== baseDateQuizId(baseCurrent.quiz_id),
    )
    .map(apply)

  return { current: sharedCurrent, pool: sharedPool }
}
