import { useEffect } from 'react'
import { t } from '../../config/uiStrings'
import type { LangCode } from '../../types/language'
import { resolveLocalized, type RefTable } from '../../types/table'
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
          <table className="ref-table">
            <thead>
              <tr>
                {table.columns.map((column) => (
                  <th key={column.key}>
                    {resolveLocalized(column.labels, learnerLang)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {table.columns.map((column) => (
                    <td key={column.key}>
                      {resolveLocalized(row[column.key], learnerLang)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
