import { useEffect } from 'react'
import { t } from '../../config/uiStrings'
import type { LangCode } from '../../types/language'
import {
  resolveLocalized,
  resolveRefSections,
  type RefTable,
  type RefTableSection,
} from '../../types/table'
import './ReferenceTableModal.css'

interface ReferenceTableModalProps {
  table: RefTable
  learnerLang: LangCode
  onClose: () => void
}

export function ReferenceTableModal({
  table,
  learnerLang,
  onClose,
}: ReferenceTableModalProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const title = resolveLocalized(table.title, learnerLang)
  const note = resolveLocalized(table.note, learnerLang)
  const rules =
    table.rules?.[learnerLang] ?? table.rules?.en ?? Object.values(table.rules ?? {})[0] ?? []
  const sections = resolveRefSections(table)

  return (
    <div className="ref-modal" role="presentation" onClick={onClose}>
      <div
        className="ref-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="ref-modal__head">
          <div>
            <h2 className="ref-modal__title">{title}</h2>
            {note && <p className="ref-modal__note">{note}</p>}
            {rules.length > 0 && (
              <ul className="ref-modal__rules">
                {rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            className="ref-modal__close"
            onClick={onClose}
            aria-label={t(learnerLang, 'close')}
          >
            ×
          </button>
        </header>

        <div className="ref-modal__scroll">
          {sections.map((section, index) => (
            <RefSection
              key={`${table.table_id}-${index}`}
              section={section}
              learnerLang={learnerLang}
              showDivider={index > 0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function RefSection({
  section,
  learnerLang,
  showDivider,
}: {
  section: RefTableSection
  learnerLang: LangCode
  showDivider: boolean
}) {
  const sectionTitle = resolveLocalized(section.title, learnerLang)
  const sectionNote = resolveLocalized(section.note, learnerLang)

  return (
    <section className={`ref-section${showDivider ? ' ref-section--divided' : ''}`}>
      {sectionTitle && <h3 className="ref-section__title">{sectionTitle}</h3>}
      {sectionNote && <p className="ref-section__note">{sectionNote}</p>}
      <table className="ref-table">
        <thead>
          <tr>
            {section.columns.map((column) => (
              <th key={column.key}>
                {resolveLocalized(column.labels, learnerLang)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {section.columns.map((column) => (
                <td key={column.key}>
                  {resolveLocalized(row[column.key], learnerLang)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
