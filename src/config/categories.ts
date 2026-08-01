import type { LangCode, TargetLangCode } from '../types/language'

/**
 * Shared “must-memorize” curriculum every language starts with.
 * Language-only drills (gender, case…) can be separate groups later.
 */
export type CategoryId =
  | 'alphabet'
  | 'pronouns'
  | 'numbers'
  | 'time'
  | 'weekdays'
  | 'questions'
  | 'demonstratives'
  | 'ordinals'
  | 'months'
  | 'dates'
  | 'vocab'

export type CategoryGroupId = 'basic' | 'intermediate' | 'advanced'

export interface CategoryMeta {
  id: CategoryId
  group: CategoryGroupId
  /** Display order within the group (1-based curriculum step) */
  step: number
  labels: Partial<Record<LangCode, string>>
  /** Keep route compatibility without showing in the sidebar */
  hidden?: boolean
  /** If set, only these learning languages show the category */
  visibleFor?: TargetLangCode[]
  /** Optional short subtitle (e.g. Hangul / Hiragana) */
  hints?: Partial<Record<TargetLangCode, Partial<Record<LangCode, string>>>>
}

export interface CategoryGroupMeta {
  id: CategoryGroupId
  labels: Partial<Record<LangCode, string>>
  /** Start collapsed when no saved preference exists */
  defaultCollapsed?: boolean
}

const LEVEL = {
  basic: {
    en: 'Basic',
    ko: '기초',
    ja: '基礎',
    zh: '基础',
    fr: 'Bases',
    es: 'Básico',
    de: 'Grundlagen',
    ru: 'Основы',
  },
  intermediate: {
    en: 'Intermediate',
    ko: '중급',
    ja: '中級',
    zh: '中级',
    fr: 'Intermédiaire',
    es: 'Intermedio',
    de: 'Mittelstufe',
    ru: 'Средний',
  },
  advanced: {
    en: 'Advanced',
    ko: '고급',
    ja: '上級',
    zh: '高级',
    fr: 'Avancé',
    es: 'Avanzado',
    de: 'Fortgeschritten',
    ru: 'Продвинутый',
  },
} as const

export const CATEGORY_GROUPS: CategoryGroupMeta[] = [
  { id: 'basic', labels: { ...LEVEL.basic } },
  { id: 'intermediate', labels: { ...LEVEL.intermediate }, defaultCollapsed: true },
  { id: 'advanced', labels: { ...LEVEL.advanced }, defaultCollapsed: true },
]

/** Shared category list for every learning language */
export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'alphabet',
    group: 'basic',
    step: 1,
    labels: {
      en: 'Alphabet & Phonetics',
      ko: '문자와 발음',
      ja: '文字と発音',
      zh: '字母与发音',
      fr: 'Alphabet & phonétique',
      es: 'Alfabeto y fonética',
      de: 'Alphabet & Phonetik',
      ru: 'Алфавит и фонетика',
    },
    hints: {
      ko: {
        en: 'Hangul', ko: '한글', ja: 'ハングル', zh: '韩文', fr: 'Hangeul', es: 'Hangul', de: 'Hangul', ru: 'Хангыль',
      },
      ja: {
        en: 'Hiragana & Katakana',
        ko: '히라가나·가타카나',
        ja: 'ひらがな・カタカナ',
        zh: '平假名与片假名',
        fr: 'Hiragana & katakana',
        es: 'Hiragana y katakana',
        de: 'Hiragana & Katakana',
        ru: 'Хирагана и катакана',
      },
      zh: { en: 'Pinyin', ko: '병음', ja: 'ピンイン', zh: '拼音', fr: 'Pinyin', es: 'Pinyin', de: 'Pinyin', ru: 'Пиньинь' },
      fr: { en: 'Alphabet', ko: '알파벳', ja: 'アルファベット', zh: '字母', fr: 'Alphabet', es: 'Alfabeto', de: 'Alphabet', ru: 'Алфавит' },
      es: { en: 'Alphabet', ko: '알파벳', ja: 'アルファベット', zh: '字母', fr: 'Alphabet', es: 'Alfabeto', de: 'Alphabet', ru: 'Алфавит' },
      de: { en: 'Alphabet', ko: '알파벳', ja: 'アルファベット', zh: '字母', fr: 'Alphabet', es: 'Alfabeto', de: 'Alphabet', ru: 'Алфавит' },
      ru: { en: 'Cyrillic', ko: '키릴 문자', ja: 'キリル文字', zh: '西里尔字母', fr: 'Cyrillique', es: 'Cirílico', de: 'Kyrillisch', ru: 'Кириллица' },
    },
  },
  {
    id: 'pronouns',
    group: 'basic',
    step: 2,
    labels: {
      en: 'Personal Pronouns', ko: '인칭대명사', ja: '人称代名詞', zh: '人称代词',
      fr: 'Pronoms personnels', es: 'Pronombres personales', de: 'Personalpronomen', ru: 'Личные местоимения',
    },
  },
  {
    id: 'numbers',
    group: 'basic',
    step: 3,
    labels: {
      en: 'Cardinal Numbers', ko: '기수사', ja: '基数', zh: '基数词',
      fr: 'Nombres cardinaux', es: 'Números cardinales', de: 'Kardinalzahlen', ru: 'Количественные числительные',
    },
  },
  {
    id: 'time',
    group: 'basic',
    step: 4,
    labels: {
      en: 'Time & Calendar Basics',
      ko: '시간과 달력 기초',
      ja: '時間と暦の基礎',
      zh: '时间与日历基础',
      fr: 'Bases du temps et du calendrier',
      es: 'Bases de tiempo y calendario',
      de: 'Zeit- und Kalendergrundlagen',
      ru: 'Основы времени и календаря',
    },
  },
  {
    id: 'weekdays',
    group: 'basic',
    step: 5,
    hidden: true,
    labels: {
      en: 'Days & Relative Time',
      ko: '요일과 상대적 때',
      ja: '曜日と相対的な時',
      zh: '星期与相对时间',
      fr: 'Jours & temps relatif',
      es: 'Días y tiempo relativo',
      de: 'Wochentage & relative Zeit',
      ru: 'Дни и относительное время',
    },
  },
  {
    id: 'questions',
    group: 'basic',
    step: 5,
    labels: {
      en: 'Question Words', ko: '필수 의문사', ja: '疑問詞', zh: '疑问词',
      fr: 'Mots interrogatifs', es: 'Palabras interrogativas', de: 'Fragewörter', ru: 'Вопросительные слова',
    },
  },
  {
    id: 'demonstratives',
    group: 'basic',
    step: 6,
    labels: {
      en: 'Demonstratives & Directions', ko: '지시대명사·방향', ja: '指示詞・方向', zh: '指示词与方向',
      fr: 'Démonstratifs & directions', es: 'Demostrativos y direcciones', de: 'Demonstrativa & Richtungen', ru: 'Указательные и направления',
    },
  },
  {
    id: 'ordinals',
    group: 'basic',
    step: 8,
    hidden: true,
    labels: {
      en: 'Ordinal Numbers', ko: '서수사', ja: '序数', zh: '序数词',
      fr: 'Nombres ordinaux', es: 'Números ordinales', de: 'Ordinalzahlen', ru: 'Порядковые числительные',
    },
  },
  {
    id: 'months',
    group: 'basic',
    step: 9,
    hidden: true,
    labels: {
      en: 'Months & Seasons', ko: '월과 계절', ja: '月と季節', zh: '月份与季节',
      fr: 'Mois & saisons', es: 'Meses y estaciones', de: 'Monate & Jahreszeiten', ru: 'Месяцы и сезоны',
    },
  },
  {
    id: 'dates',
    group: 'basic',
    step: 7,
    /** Korean date units live under Time & calendar; JA/RU keep irregular date drills here. */
    visibleFor: ['ja', 'ru'],
    labels: {
      en: 'Dates', ko: '날짜 표현', ja: '日付の表現', zh: '日期表达',
      fr: 'Dates', es: 'Fechas', de: 'Daten', ru: 'Даты',
    },
  },
  {
    id: 'vocab',
    group: 'intermediate',
    step: 1,
    visibleFor: ['ja'],
    labels: {
      en: 'JLPT Vocabulary',
      ko: 'JLPT 어휘',
      ja: 'JLPT語彙',
      zh: 'JLPT词汇',
      fr: 'Vocabulaire JLPT',
      es: 'Vocabulario JLPT',
      de: 'JLPT-Wortschatz',
      ru: 'Лексика JLPT',
    },
    hints: {
      ja: {
        en: 'Separate hub · N5–N1',
        ko: '별도 허브 · N5–N1',
        ja: '別ハブ・N5–N1',
        zh: '独立入口 · N5–N1',
        fr: 'Hub séparé · N5–N1',
        es: 'Hub aparte · N5–N1',
        de: 'Eigener Hub · N5–N1',
        ru: 'Отдельный хаб · N5–N1',
      },
    },
  },
]

export function getCategory(id: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

export function isCategoryId(id: string): id is CategoryId {
  return CATEGORIES.some((c) => c.id === id)
}

export function categoriesInGroup(
  groupId: CategoryGroupId,
  targetLang?: TargetLangCode,
): CategoryMeta[] {
  return CATEGORIES.filter((c) => {
    if (c.group !== groupId || c.hidden) return false
    if (targetLang && c.visibleFor && !c.visibleFor.includes(targetLang)) {
      return false
    }
    return true
  }).sort((a, b) => a.step - b.step)
}

export function groupLabel(
  group: CategoryGroupMeta,
  learnerLang: LangCode,
): string {
  return group.labels[learnerLang] ?? group.labels.en ?? group.id
}

export function categoryLabel(
  category: CategoryMeta,
  learnerLang: LangCode,
): string {
  return category.labels[learnerLang] ?? category.labels.en ?? category.id
}

export function categoryHint(
  category: CategoryMeta,
  targetLang: TargetLangCode,
  learnerLang: LangCode,
): string | undefined {
  const byTarget = category.hints?.[targetLang]
  if (!byTarget) return undefined
  return byTarget[learnerLang] ?? byTarget.en
}
