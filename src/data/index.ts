import type { CategoryId } from '../config/categories'
import type { TargetLangCode } from '../types/language'
import type { MeaningQuizEntry } from '../types/vocab'
import type { RefTable } from '../types/table'

import koAlphabet from './ko/alphabet.json'
import koOrdinals from './ko/ordinals.json'
import koMonths from './ko/months.json'
import koTime from './ko/time.json'
import koAlphabetTable from './ko/alphabet.table.json'
import koOrdinalsTable from './ko/ordinals.table.json'
import koMonthsTable from './ko/months.table.json'
import koTimeTable from './ko/time.table.json'

import jaAlphabet from './ja/alphabet.json'
import jaOrdinals from './ja/ordinals.json'
import jaMonths from './ja/months.json'
import jaTime from './ja/time.json'
import jaAlphabetTable from './ja/alphabet.table.json'
import jaOrdinalsTable from './ja/ordinals.table.json'
import jaMonthsTable from './ja/months.table.json'
import jaTimeTable from './ja/time.table.json'

type CategoryBundles = Partial<Record<CategoryId, MeaningQuizEntry[]>>
type TableBundles = Partial<Record<CategoryId, RefTable>>

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
  },
  ja: {
    alphabet: jaAlphabet as MeaningQuizEntry[],
    ordinals: jaOrdinals as MeaningQuizEntry[],
    months: jaMonths as MeaningQuizEntry[],
    time: jaTime as MeaningQuizEntry[],
  },
}

const TABLES: Partial<Record<TargetLangCode, TableBundles>> = {
  ko: {
    alphabet: koAlphabetTable as RefTable,
    ordinals: koOrdinalsTable as RefTable,
    months: koMonthsTable as RefTable,
    time: koTimeTable as RefTable,
  },
  ja: {
    alphabet: jaAlphabetTable as RefTable,
    ordinals: jaOrdinalsTable as RefTable,
    months: jaMonthsTable as RefTable,
    time: jaTimeTable as RefTable,
  },
}

export function getMeaningQuizzes(
  targetLang: TargetLangCode,
  category: CategoryId,
): MeaningQuizEntry[] {
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
  return TABLES[targetLang]?.[category] ?? null
}
