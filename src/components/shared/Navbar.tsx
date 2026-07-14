import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LEARNER_LANGUAGES, getLanguage } from '../../config/languages'
import { t } from '../../config/uiStrings'
import { useSession } from '../../context/SessionContext'
import type { LangCode } from '../../types/language'
import './Navbar.css'

interface NavbarProps {
  /** When set, hide this language from the learner toggle (same as target). */
  excludeLearnerLang?: LangCode
  /** Learn layout: learner toggle only (brand lives in the sidebar). */
  compact?: boolean
}

export function Navbar({ excludeLearnerLang, compact = false }: NavbarProps = {}) {
  const { learnerLang, setLearnerLang } = useSession()
  const learner = getLanguage(learnerLang)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const options = LEARNER_LANGUAGES.filter((l) => l.code !== excludeLearnerLang)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // If current learner lang is excluded (e.g. learning Japanese as Japanese), fall back
  useEffect(() => {
    if (excludeLearnerLang && learnerLang === excludeLearnerLang) {
      const fallback =
        LEARNER_LANGUAGES.find((l) => l.code !== excludeLearnerLang)?.code ?? 'en'
      setLearnerLang(fallback)
    }
  }, [excludeLearnerLang, learnerLang, setLearnerLang])

  const pick = (code: LangCode) => {
    setLearnerLang(code)
    setOpen(false)
  }

  return (
    <header className={`navbar${compact ? ' navbar--compact' : ''}`}>
      {!compact && (
        <Link to="/" className="navbar__brand">
          {t(learnerLang, 'appName')}
        </Link>
      )}

      <div className="navbar__meta" ref={rootRef}>
        <button
          type="button"
          className={`learner-toggle ${open ? 'is-open' : ''}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={t(learnerLang, 'asLearner')}
          onClick={() => setOpen((v) => !v)}
        >
          {!compact && (
            <span className="learner-toggle__label">{t(learnerLang, 'asLearner')}:</span>
          )}
          <span className="learner-toggle__value">{learner?.englishName ?? learnerLang}</span>
          <span className="learner-toggle__chev" aria-hidden>
            ▾
          </span>
        </button>

        {open && (
          <ul id={listId} className="learner-menu" role="listbox">
            {options.map((lang) => (
              <li key={lang.code} role="option" aria-selected={lang.code === learnerLang}>
                <button
                  type="button"
                  className={`learner-menu__item ${lang.code === learnerLang ? 'is-active' : ''}`}
                  onClick={() => pick(lang.code)}
                >
                  <span>{lang.englishName}</span>
                  <span className="learner-menu__native">{lang.nativeName}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}
