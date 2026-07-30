import type { CategoryId } from '../config/categories'
import type { TargetLangCode } from '../types/language'
import type { MeaningQuizEntry } from '../types/vocab'
import type { RefTable } from '../types/table'

import koAlphabet from './ko/alphabet.json'
import koOrdinals from './ko/ordinals.json'
import koMonths from './ko/months.json'
import koTime from './ko/time.json'
import koWeekdays from './ko/weekdays.json'
import koAlphabetTable from './ko/alphabet.table.json'
import koOrdinalsTable from './ko/ordinals.table.json'
import koMonthsTable from './ko/months.table.json'
import koTimeTable from './ko/time.table.json'
import koWeekdaysTable from './ko/weekdays.table.json'

import jaAlphabet from './ja/alphabet.json'
import jaOrdinals from './ja/ordinals.json'
import jaMonths from './ja/months.json'
import jaTime from './ja/time.json'
import jaWeekdays from './ja/weekdays.json'
import jaAlphabetTable from './ja/alphabet.table.json'
import jaOrdinalsTable from './ja/ordinals.table.json'
import jaMonthsTable from './ja/months.table.json'
import jaTimeTable from './ja/time.table.json'
import jaWeekdaysTable from './ja/weekdays.table.json'

type CategoryBundles = Partial<Record<CategoryId, MeaningQuizEntry[]>>
type TableBundles = Partial<Record<CategoryId, RefTable>>

const MERGED_TIME_IDS: CategoryId[] = ['time', 'weekdays', 'ordinals', 'months']

function mergeEntries(...groups: MeaningQuizEntry[][]): MeaningQuizEntry[] {
  return groups.flat()
}

function mergeTables(
  tableId: string,
  title: RefTable['title'],
  formLabels: RefTable['columns'][number]['labels'],
  tables: Array<{ section: RefTable['title']; table: RefTable }>,
): RefTable {
  return {
    table_id: tableId,
    title,
    note: {
      en: 'Grouped into one compact quiz: time words, relative days, ordinals, and months.',
      ko: '시간말, 상대 날짜, 서수, 월 이름을 한 퀴즈로 묶었습니다.',
      ja: '時間語・相対的な日付・序数・月名を一つのクイズにまとめました。',
      zh: '把时间词、相对日期、序数和月份合并成一个紧凑的测验。',
      fr: 'Un seul quiz compact: moments, jours relatifs, ordinaux et mois.',
      es: 'Un solo quiz compacto: momentos, tiempo relativo, ordinales y meses.',
      de: 'Ein kompaktes Quiz: Tageszeiten, relative Tage, Ordnungszahlen und Monate.',
      ru: 'Один компактный квиз: время суток, относительные дни, порядковые и месяцы.',
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
      table.rows.map((row) => ({
        section,
        form: row.form,
        meaning: row.meaning,
        sound: row.sound,
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
    ordinals: koOrdinals as MeaningQuizEntry[],
    months: koMonths as MeaningQuizEntry[],
    time: koTime as MeaningQuizEntry[],
    weekdays: koWeekdays as MeaningQuizEntry[],
  },
  ja: {
    alphabet: jaAlphabet as MeaningQuizEntry[],
    ordinals: jaOrdinals as MeaningQuizEntry[],
    months: jaMonths as MeaningQuizEntry[],
    time: jaTime as MeaningQuizEntry[],
    weekdays: jaWeekdays as MeaningQuizEntry[],
  },
}

const TABLES: Partial<Record<TargetLangCode, TableBundles>> = {
  ko: {
    alphabet: koAlphabetTable as RefTable,
    ordinals: koOrdinalsTable as RefTable,
    months: koMonthsTable as RefTable,
    time: koTimeTable as RefTable,
    weekdays: koWeekdaysTable as RefTable,
  },
  ja: {
    alphabet: jaAlphabetTable as RefTable,
    ordinals: jaOrdinalsTable as RefTable,
    months: jaMonthsTable as RefTable,
    time: jaTimeTable as RefTable,
    weekdays: jaWeekdaysTable as RefTable,
  },
}

export function getMeaningQuizzes(
  targetLang: TargetLangCode,
  category: CategoryId,
): MeaningQuizEntry[] {
  if (category === 'time') {
    const bundle = DATASET[targetLang]
    return mergeEntries(
      ...MERGED_TIME_IDS.map((id) => (bundle?.[id] ?? []) as MeaningQuizEntry[]),
    )
  }
  return DATASET[targetLang]?.[category] ?? []
}

export function getCategoryCount(
  targetLang: TargetLangCode,
  category: CategoryId,
): number {
  return getMeaningQuizzes(targetLang, category).length
}

export function getRefTable(
  targetLang: TargetLangCode,
  category: CategoryId,
): RefTable | null {
  if (category === 'time') {
    const tables = TABLES[targetLang]
    if (!tables?.time || !tables.weekdays || !tables.ordinals || !tables.months) {
      return tables?.time ?? null
    }

    const formLabels = tables.time.columns[0]?.labels ?? { en: 'Form' }
    const title = {
      en: 'Time & calendar basics',
      ko: '시간과 달력 기초',
      ja: '時間と暦の基礎',
      zh: '时间与日历基础',
      fr: 'Bases du temps et du calendrier',
      es: 'Bases de tiempo y calendario',
      de: 'Zeit- und Kalendergrundlagen',
      ru: 'Основы времени и календаря',
    }

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
        },
        table: tables.weekdays,
      },
      {
        section: {
          en: 'Ordinals',
          ko: '서수',
          ja: '序数',
          zh: '序数',
          fr: 'Ordinaux',
          es: 'Ordinales',
          de: 'Ordinalzahlen',
          ru: 'Порядковые',
        },
        table: tables.ordinals,
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
        },
        table: tables.months,
      },
    ])
  }
  return TABLES[targetLang]?.[category] ?? null
}
