import type { LangCode } from './language'

/** Plain text, or learner-language variants */
export type LocalizedText = string | Partial<Record<LangCode, string>>

export interface RefTableColumn {
  key: string
  labels: Partial<Record<LangCode, string>>
}

/** One grid inside a reference chart (e.g. paradigm + detail list). */
export interface RefTableSection {
  title?: Partial<Record<LangCode, string>>
  note?: Partial<Record<LangCode, string>>
  columns: RefTableColumn[]
  rows: Array<Record<string, LocalizedText>>
}

/**
 * Category reference chart shown from the quiz “table” button.
 * Path: data/{targetLang}/{category}.table.json
 *
 * Prefer `sections` when a category needs more than one grid.
 * Legacy single-grid charts still use top-level `columns` + `rows`.
 */
export interface RefTable {
  table_id: string
  title: Partial<Record<LangCode, string>>
  /** Short tip under the title (optional) */
  note?: Partial<Record<LangCode, string>>
  /**
   * Number-system / formation rules shown above the grid.
   * Useful for irregular systems (e.g. English teens) and regular composition patterns.
   */
  rules?: Partial<Record<LangCode, string[]>>
  columns?: RefTableColumn[]
  rows?: Array<Record<string, LocalizedText>>
  /** Extra / primary grids (pronoun paradigm, etc.) */
  sections?: RefTableSection[]
}

export function resolveLocalized(
  value: LocalizedText | undefined,
  learnerLang: LangCode,
): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[learnerLang] ?? value.en ?? Object.values(value)[0] ?? ''
}

export function resolveRefSections(table: RefTable): RefTableSection[] {
  if (table.sections && table.sections.length > 0) return table.sections
  if (table.columns && table.rows) {
    return [{ columns: table.columns, rows: table.rows }]
  }
  return []
}
