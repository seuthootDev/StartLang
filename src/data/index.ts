import type { CategoryId } from '../config/categories'
import type { TargetLangCode } from '../types/language'
import type { MeaningQuizEntry } from '../types/vocab'
import type { RefTable } from '../types/table'

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

type CategoryBundles = Partial<Record<CategoryId, MeaningQuizEntry[]>>
type TableBundles = Partial<Record<CategoryId, RefTable>>

const MERGED_TIME_IDS: CategoryId[] = ['time', 'weekdays', 'months']

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
}

export function getMeaningQuizzes(
  targetLang: TargetLangCode,
  category: CategoryId,
): MeaningQuizEntry[] {
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
