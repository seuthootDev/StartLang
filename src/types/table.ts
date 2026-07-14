import type { LangCode } from './language'

/** Plain text, or learner-language variants */
export type LocalizedText = string | Partial<Record<LangCode, string>>

export interface RefTableColumn {
  key: string
  labels: Partial<Record<LangCode, string>>
}

/**
 * Category reference chart shown from the quiz “table” button.
 * Path: data/{targetLang}/{category}.table.json
 */
export interface RefTable {
  table_id: string
  title: Partial<Record<LangCode, string>>
  /** Short tip under the title (optional) */
  note?: Partial<Record<LangCode, string>>
  columns: RefTableColumn[]
  rows: Array<Record<string, LocalizedText>>
}

export function resolveLocalized(
  value: LocalizedText | undefined,
  learnerLang: LangCode,
): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[learnerLang] ?? value.en ?? Object.values(value)[0] ?? ''
}
