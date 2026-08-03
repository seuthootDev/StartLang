import type { CategoryId } from '../config/categories'
import type { TargetLangCode } from '../types/language'
import type { MeaningQuizEntry } from '../types/vocab'
import type { RefTable, LocalizedText } from '../types/table'

import koAlphabet from './ko/alphabet.json'
import koPronouns from './ko/pronouns.json'
import koNumbers from './ko/numbers.json'
import koOrdinals from './ko/ordinals.json'
import koMonths from './ko/months.json'
import koTime from './ko/time.json'
import koWeekdays from './ko/weekdays.json'
import koQuestions from './ko/questions.json'
import koDemonstratives from './ko/demonstratives.json'
import koAlphabetTable from './ko/alphabet.table.json'
import koPronounsTable from './ko/pronouns.table.json'
import koNumbersTable from './ko/numbers.table.json'
import koOrdinalsTable from './ko/ordinals.table.json'
import koMonthsTable from './ko/months.table.json'
import koTimeTable from './ko/time.table.json'
import koWeekdaysTable from './ko/weekdays.table.json'
import koQuestionsTable from './ko/questions.table.json'
import koDemonstrativesTable from './ko/demonstratives.table.json'
import koDayOfMonth from './ko/dayOfMonth.json'
import koDayOfMonthTable from './ko/dayOfMonth.table.json'

import jaAlphabet from './ja/alphabet.json'
import jaPronouns from './ja/pronouns.json'
import jaNumbers from './ja/numbers.json'
import jaOrdinals from './ja/ordinals.json'
import jaMonths from './ja/months.json'
import jaTime from './ja/time.json'
import jaWeekdays from './ja/weekdays.json'
import jaQuestions from './ja/questions.json'
import jaDemonstratives from './ja/demonstratives.json'
import jaDates from './ja/dates.json'
import jaVocabManifest from './ja/vocab.manifest.json'
import jaAlphabetTable from './ja/alphabet.table.json'
import jaPronounsTable from './ja/pronouns.table.json'
import jaNumbersTable from './ja/numbers.table.json'
import jaOrdinalsTable from './ja/ordinals.table.json'
import jaMonthsTable from './ja/months.table.json'
import jaTimeTable from './ja/time.table.json'
import jaWeekdaysTable from './ja/weekdays.table.json'
import jaQuestionsTable from './ja/questions.table.json'
import jaDemonstrativesTable from './ja/demonstratives.table.json'
import jaDatesTable from './ja/dates.table.json'
import type { JlptLevel, VocabManifest, VocabQuizEntry } from '../config/vocabQuiz'

import ruAlphabet from './ru/alphabet.json'
import ruPronouns from './ru/pronouns.json'
import ruNumbers from './ru/numbers.json'
import ruTime from './ru/time.json'
import ruWeekdays from './ru/weekdays.json'
import ruMonths from './ru/months.json'
import ruDates from './ru/dates.json'
import ruQuestions from './ru/questions.json'
import ruDemonstratives from './ru/demonstratives.json'
import ruAlphabetTable from './ru/alphabet.table.json'
import ruPronounsTable from './ru/pronouns.table.json'
import ruNumbersTable from './ru/numbers.table.json'
import ruTimeTable from './ru/time.table.json'
import ruWeekdaysTable from './ru/weekdays.table.json'
import ruMonthsTable from './ru/months.table.json'
import ruDatesTable from './ru/dates.table.json'
import ruQuestionsTable from './ru/questions.table.json'
import ruDemonstrativesTable from './ru/demonstratives.table.json'

import frAlphabet from './fr/alphabet.json'
import frPronouns from './fr/pronouns.json'
import frNumbers from './fr/numbers.json'
import frTime from './fr/time.json'
import frWeekdays from './fr/weekdays.json'
import frMonths from './fr/months.json'
import frQuestions from './fr/questions.json'
import frDemonstratives from './fr/demonstratives.json'
import frAlphabetTable from './fr/alphabet.table.json'
import frPronounsTable from './fr/pronouns.table.json'
import frNumbersTable from './fr/numbers.table.json'
import frTimeTable from './fr/time.table.json'
import frWeekdaysTable from './fr/weekdays.table.json'
import frMonthsTable from './fr/months.table.json'
import frQuestionsTable from './fr/questions.table.json'
import frDemonstrativesTable from './fr/demonstratives.table.json'

import esAlphabet from './es/alphabet.json'
import esPronouns from './es/pronouns.json'
import esNumbers from './es/numbers.json'
import esTime from './es/time.json'
import esWeekdays from './es/weekdays.json'
import esMonths from './es/months.json'
import esQuestions from './es/questions.json'
import esDemonstratives from './es/demonstratives.json'
import esAlphabetTable from './es/alphabet.table.json'
import esPronounsTable from './es/pronouns.table.json'
import esNumbersTable from './es/numbers.table.json'
import esTimeTable from './es/time.table.json'
import esWeekdaysTable from './es/weekdays.table.json'
import esMonthsTable from './es/months.table.json'
import esQuestionsTable from './es/questions.table.json'
import esDemonstrativesTable from './es/demonstratives.table.json'

import itAlphabet from './it/alphabet.json'
import itPronouns from './it/pronouns.json'
import itNumbers from './it/numbers.json'
import itTime from './it/time.json'
import itWeekdays from './it/weekdays.json'
import itMonths from './it/months.json'
import itQuestions from './it/questions.json'
import itDemonstratives from './it/demonstratives.json'
import itAlphabetTable from './it/alphabet.table.json'
import itPronounsTable from './it/pronouns.table.json'
import itNumbersTable from './it/numbers.table.json'
import itTimeTable from './it/time.table.json'
import itWeekdaysTable from './it/weekdays.table.json'
import itMonthsTable from './it/months.table.json'
import itQuestionsTable from './it/questions.table.json'
import itDemonstrativesTable from './it/demonstratives.table.json'

import deAlphabet from './de/alphabet.json'
import dePronouns from './de/pronouns.json'
import deNumbers from './de/numbers.json'
import deTime from './de/time.json'
import deWeekdays from './de/weekdays.json'
import deMonths from './de/months.json'
import deDates from './de/dates.json'
import deQuestions from './de/questions.json'
import deDemonstratives from './de/demonstratives.json'
import deAlphabetTable from './de/alphabet.table.json'
import dePronounsTable from './de/pronouns.table.json'
import deNumbersTable from './de/numbers.table.json'
import deTimeTable from './de/time.table.json'
import deWeekdaysTable from './de/weekdays.table.json'
import deMonthsTable from './de/months.table.json'
import deDatesTable from './de/dates.table.json'
import deQuestionsTable from './de/questions.table.json'
import deDemonstrativesTable from './de/demonstratives.table.json'

type CategoryBundles = Partial<Record<CategoryId, MeaningQuizEntry[]>>
type TableBundles = Partial<Record<CategoryId, RefTable>>

const MERGED_TIME_IDS: CategoryId[] = ['time', 'weekdays', 'months']

function mergeEntries(...groups: MeaningQuizEntry[][]): MeaningQuizEntry[] {
  return groups.flat()
}

function mergeTableRows(table: RefTable): Array<Record<string, LocalizedText>> {
  if (table.sections && table.sections.length > 0) {
    return table.sections.flatMap((section) => section.rows)
  }
  return table.rows ?? []
}

function sectionAsTable(table: RefTable, sectionIndex: number): RefTable | null {
  const section = table.sections?.[sectionIndex]
  if (!section) return null
  return {
    table_id: `${table.table_id}_s${sectionIndex}`,
    title: section.title ?? table.title,
    note: section.note,
    columns: section.columns,
    rows: section.rows,
  }
}

function mergeTables(
  tableId: string,
  title: RefTable['title'],
  formLabels: NonNullable<RefTable['columns']>[number]['labels'],
  tables: Array<{ section: RefTable['title']; table: RefTable }>,
): RefTable {
  return {
    table_id: tableId,
    title,
    note: {
      en: 'Grouped into one compact quiz: time words, relative days, months, and (Korean) day-of-month samples.',
      ko: '시간말, 상대 날짜, 월 이름, (한국어) 일자 예시를 한 퀴즈로 묶었습니다.',
      ja: '時間語・相対的な日付・月名、（韓国語）日付の例を一つのクイズにまとめました。',
      zh: '把时间词、相对日期、月份和（韩语）日子例子合并成一个紧凑的测验。',
      fr: 'Un seul quiz compact: moments, jours relatifs, mois et (coreen) jours du mois.',
      es: 'Un solo quiz compacto: momentos, tiempo relativo, meses y (coreano) dias del mes.',
      de: 'Ein kompaktes Quiz: Tageszeiten, relative Tage, Monate und (Koreanisch) Monatstage.',
      ru: 'Один компактный квиз: время суток, относительные дни, месяцы и (кор.) числа месяца.',
    },
    columns: [
      {
        key: 'section',
        labels: {
          en: 'Set',
          ko: '묶음',
          ja: 'まとまり',
          zh: '组别',
          fr: 'Groupe',
          es: 'Grupo',
          de: 'Gruppe',
          ru: 'Раздел',
        },
      },
      { key: 'form', labels: formLabels },
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
      {
        key: 'sound',
        labels: {
          en: 'Sound',
          ko: '발음',
          ja: '読み',
          zh: '发音',
          fr: 'Prononciation',
          es: 'Pronunciación',
          de: 'Aussprache',
          ru: 'Произношение',
        },
      },
    ],
    rows: tables.flatMap(({ section, table }) =>
      mergeTableRows(table).map((row) => ({
        section,
        form: row.form ?? '',
        meaning: row.meaning ?? '',
        sound: row.sound ?? '',
      })),
    ),
  }
}

/**
 * Learning-language → category → drill cards.
 * New curriculum steps appear in the sidebar even before JSON exists.
 */
const DATASET: Partial<Record<TargetLangCode, CategoryBundles>> = {
  ko: {
    alphabet: koAlphabet as MeaningQuizEntry[],
    pronouns: koPronouns as MeaningQuizEntry[],
    numbers: koNumbers as MeaningQuizEntry[],
    ordinals: koOrdinals as MeaningQuizEntry[],
    months: koMonths as MeaningQuizEntry[],
    time: koTime as MeaningQuizEntry[],
    weekdays: koWeekdays as MeaningQuizEntry[],
    questions: koQuestions as MeaningQuizEntry[],
    demonstratives: koDemonstratives as MeaningQuizEntry[],
  },
  ja: {
    alphabet: jaAlphabet as MeaningQuizEntry[],
    pronouns: jaPronouns as MeaningQuizEntry[],
    numbers: jaNumbers as MeaningQuizEntry[],
    ordinals: jaOrdinals as MeaningQuizEntry[],
    months: jaMonths as MeaningQuizEntry[],
    time: jaTime as MeaningQuizEntry[],
    weekdays: jaWeekdays as MeaningQuizEntry[],
    questions: jaQuestions as MeaningQuizEntry[],
    demonstratives: jaDemonstratives as MeaningQuizEntry[],
    dates: jaDates as MeaningQuizEntry[],
  },
  ru: {
    alphabet: ruAlphabet as MeaningQuizEntry[],
    pronouns: ruPronouns as MeaningQuizEntry[],
    numbers: ruNumbers as MeaningQuizEntry[],
    time: ruTime as MeaningQuizEntry[],
    weekdays: ruWeekdays as MeaningQuizEntry[],
    months: ruMonths as MeaningQuizEntry[],
    dates: ruDates as MeaningQuizEntry[],
    questions: ruQuestions as MeaningQuizEntry[],
    demonstratives: ruDemonstratives as MeaningQuizEntry[],
  },
  fr: {
    alphabet: frAlphabet as MeaningQuizEntry[],
    pronouns: frPronouns as MeaningQuizEntry[],
    numbers: frNumbers as MeaningQuizEntry[],
    time: frTime as MeaningQuizEntry[],
    weekdays: frWeekdays as MeaningQuizEntry[],
    months: frMonths as MeaningQuizEntry[],
    questions: frQuestions as MeaningQuizEntry[],
    demonstratives: frDemonstratives as MeaningQuizEntry[],
  },
  es: {
    alphabet: esAlphabet as MeaningQuizEntry[],
    pronouns: esPronouns as MeaningQuizEntry[],
    numbers: esNumbers as MeaningQuizEntry[],
    time: esTime as MeaningQuizEntry[],
    weekdays: esWeekdays as MeaningQuizEntry[],
    months: esMonths as MeaningQuizEntry[],
    questions: esQuestions as MeaningQuizEntry[],
    demonstratives: esDemonstratives as MeaningQuizEntry[],
  },
  it: {
    alphabet: itAlphabet as MeaningQuizEntry[],
    pronouns: itPronouns as MeaningQuizEntry[],
    numbers: itNumbers as MeaningQuizEntry[],
    time: itTime as MeaningQuizEntry[],
    weekdays: itWeekdays as MeaningQuizEntry[],
    months: itMonths as MeaningQuizEntry[],
    questions: itQuestions as MeaningQuizEntry[],
    demonstratives: itDemonstratives as MeaningQuizEntry[],
  },
  de: {
    alphabet: deAlphabet as MeaningQuizEntry[],
    pronouns: dePronouns as MeaningQuizEntry[],
    numbers: deNumbers as MeaningQuizEntry[],
    time: deTime as MeaningQuizEntry[],
    weekdays: deWeekdays as MeaningQuizEntry[],
    months: deMonths as MeaningQuizEntry[],
    dates: deDates as MeaningQuizEntry[],
    questions: deQuestions as MeaningQuizEntry[],
    demonstratives: deDemonstratives as MeaningQuizEntry[],
  },
}

const vocabQuizLoaders: Record<JlptLevel, () => Promise<{ default: VocabQuizEntry[] }>> = {
  n5: () => import('./ja/vocab.n5.json') as Promise<{ default: VocabQuizEntry[] }>,
  n4: () => import('./ja/vocab.n4.json') as Promise<{ default: VocabQuizEntry[] }>,
  n3: () => import('./ja/vocab.n3.json') as Promise<{ default: VocabQuizEntry[] }>,
  n2: () => import('./ja/vocab.n2.json') as Promise<{ default: VocabQuizEntry[] }>,
  n1: () => import('./ja/vocab.n1.json') as Promise<{ default: VocabQuizEntry[] }>,
}

const vocabTableLoaders: Record<JlptLevel, () => Promise<{ default: RefTable }>> = {
  n5: () => import('./ja/vocab.n5.table.json') as Promise<{ default: RefTable }>,
  n4: () => import('./ja/vocab.n4.table.json') as Promise<{ default: RefTable }>,
  n3: () => import('./ja/vocab.n3.table.json') as Promise<{ default: RefTable }>,
  n2: () => import('./ja/vocab.n2.table.json') as Promise<{ default: RefTable }>,
  n1: () => import('./ja/vocab.n1.table.json') as Promise<{ default: RefTable }>,
}

export function getVocabManifest(): VocabManifest {
  return jaVocabManifest as VocabManifest
}

export async function loadVocabQuizzes(level: JlptLevel): Promise<VocabQuizEntry[]> {
  const mod = await vocabQuizLoaders[level]()
  return mod.default
}

export async function loadVocabRefTable(level: JlptLevel): Promise<RefTable | null> {
  const mod = await vocabTableLoaders[level]()
  return mod.default
}

export function getVocabTotalCount(): number {
  const levels = getVocabManifest().levels
  return (Object.values(levels) as Array<{ words: number }>).reduce(
    (sum, row) => sum + (row?.words ?? 0),
    0,
  )
}

const TABLES: Partial<Record<TargetLangCode, TableBundles>> = {
  ko: {
    alphabet: koAlphabetTable as RefTable,
    pronouns: koPronounsTable as RefTable,
    numbers: koNumbersTable as RefTable,
    ordinals: koOrdinalsTable as RefTable,
    months: koMonthsTable as RefTable,
    time: koTimeTable as RefTable,
    weekdays: koWeekdaysTable as RefTable,
    questions: koQuestionsTable as RefTable,
    demonstratives: koDemonstrativesTable as RefTable,
  },
  ja: {
    alphabet: jaAlphabetTable as RefTable,
    pronouns: jaPronounsTable as RefTable,
    numbers: jaNumbersTable as RefTable,
    ordinals: jaOrdinalsTable as RefTable,
    months: jaMonthsTable as RefTable,
    time: jaTimeTable as RefTable,
    weekdays: jaWeekdaysTable as RefTable,
    questions: jaQuestionsTable as RefTable,
    demonstratives: jaDemonstrativesTable as RefTable,
    dates: jaDatesTable as RefTable,
  },
  ru: {
    alphabet: ruAlphabetTable as RefTable,
    pronouns: ruPronounsTable as RefTable,
    numbers: ruNumbersTable as RefTable,
    time: ruTimeTable as RefTable,
    weekdays: ruWeekdaysTable as RefTable,
    months: ruMonthsTable as RefTable,
    dates: ruDatesTable as RefTable,
    questions: ruQuestionsTable as RefTable,
    demonstratives: ruDemonstrativesTable as RefTable,
  },
  fr: {
    alphabet: frAlphabetTable as RefTable,
    pronouns: frPronounsTable as RefTable,
    numbers: frNumbersTable as RefTable,
    time: frTimeTable as RefTable,
    weekdays: frWeekdaysTable as RefTable,
    months: frMonthsTable as RefTable,
    questions: frQuestionsTable as RefTable,
    demonstratives: frDemonstrativesTable as RefTable,
  },
  es: {
    alphabet: esAlphabetTable as RefTable,
    pronouns: esPronounsTable as RefTable,
    numbers: esNumbersTable as RefTable,
    time: esTimeTable as RefTable,
    weekdays: esWeekdaysTable as RefTable,
    months: esMonthsTable as RefTable,
    questions: esQuestionsTable as RefTable,
    demonstratives: esDemonstrativesTable as RefTable,
  },
  it: {
    alphabet: itAlphabetTable as RefTable,
    pronouns: itPronounsTable as RefTable,
    numbers: itNumbersTable as RefTable,
    time: itTimeTable as RefTable,
    weekdays: itWeekdaysTable as RefTable,
    months: itMonthsTable as RefTable,
    questions: itQuestionsTable as RefTable,
    demonstratives: itDemonstrativesTable as RefTable,
  },
  de: {
    alphabet: deAlphabetTable as RefTable,
    pronouns: dePronounsTable as RefTable,
    numbers: deNumbersTable as RefTable,
    time: deTimeTable as RefTable,
    weekdays: deWeekdaysTable as RefTable,
    months: deMonthsTable as RefTable,
    dates: deDatesTable as RefTable,
    questions: deQuestionsTable as RefTable,
    demonstratives: deDemonstrativesTable as RefTable,
  },
}

export function getMeaningQuizzes(
  targetLang: TargetLangCode,
  category: CategoryId,
): MeaningQuizEntry[] {
  if (category === 'vocab') {
    return []
  }
  if (category === 'time') {
    const bundle = DATASET[targetLang]
    const base = mergeEntries(
      ...MERGED_TIME_IDS.map((id) => (bundle?.[id] ?? []) as MeaningQuizEntry[]),
    )
    if (targetLang === 'ko') {
      return mergeEntries(base, koDayOfMonth as MeaningQuizEntry[])
    }
    return base
  }
  return DATASET[targetLang]?.[category] ?? []
}

export function getCategoryCount(
  targetLang: TargetLangCode,
  category: CategoryId,
): number {
  if (category === 'vocab' && targetLang === 'ja') {
    return getVocabTotalCount()
  }
  return getMeaningQuizzes(targetLang, category).length
}

export function getRefTable(
  targetLang: TargetLangCode,
  category: CategoryId,
): RefTable | null {
  if (category === 'time') {
    const tables = TABLES[targetLang]
    if (!tables?.time || !tables.weekdays || !tables.months) {
      return tables?.time ?? null
    }

    const formLabels = tables.time.columns?.[0]?.labels ?? { en: 'Form' }
    const title = {
      en: 'Time & calendar basics',
      ko: '시간과 달력 기초',
      ja: '時間と暦の基礎',
      zh: '时间与日历基础',
      fr: 'Bases du temps et du calendrier',
      es: 'Bases de tiempo y calendario',
      de: 'Zeit- und Kalendergrundlagen',
      ru: 'Основы времени и календаря',
      it: 'Basi di tempo e calendario',
    }

    const monthsMain = sectionAsTable(tables.months, 0) ?? tables.months
    const dateWriting =
      targetLang === 'fr' || targetLang === 'es' || targetLang === 'it'
        ? sectionAsTable(tables.months, 1)
        : null

    return mergeTables(`merged_${targetLang}_time_ref`, title, formLabels, [
      {
        section: {
          en: 'Time',
          ko: '시간',
          ja: '時間',
          zh: '时间',
          fr: 'Temps',
          es: 'Tiempo',
          de: 'Zeit',
          ru: 'Время',
          it: 'Tempo',
        },
        table: tables.time,
      },
      {
        section: {
          en: 'Days',
          ko: '요일·상대 날짜',
          ja: '曜日・相対日付',
          zh: '星期与相对日期',
          fr: 'Jours',
          es: 'Días',
          de: 'Tage',
          ru: 'Дни',
          it: 'Giorni',
        },
        table: tables.weekdays,
      },
      {
        section: {
          en: 'Months',
          ko: '월',
          ja: '月',
          zh: '月份',
          fr: 'Mois',
          es: 'Meses',
          de: 'Monate',
          ru: 'Месяцы',
          it: 'Mesi',
        },
        table: monthsMain,
      },
      ...(dateWriting
        ? [
            {
              section: {
                en: 'Writing dates',
                ko: '날짜 쓰기',
                ja: '日付の書き方',
                zh: '日期写法',
                fr: 'Écrire une date',
                es: 'Escribir fechas',
                de: 'Daten schreiben',
                it: 'Scrivere le date',
                ru: 'Запись дат',
              },
              table: dateWriting,
            },
          ]
        : []),
      ...(targetLang === 'ko'
        ? [
            {
              section: {
                en: 'Day of month',
                ko: '일자',
                ja: '日付（日）',
                zh: '几号',
                fr: 'Jour du mois',
                es: 'Día del mes',
                de: 'Tag im Monat',
                ru: 'Число месяца',
              },
              table: koDayOfMonthTable as RefTable,
            },
          ]
        : []),
    ])
  }
  return TABLES[targetLang]?.[category] ?? null
}
