import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { categoryLabel, getCategory } from '../config/categories'
import { getLanguage, isTargetLang } from '../config/languages'
import { t, tf } from '../config/uiStrings'
import {
  JLPT_LEVELS,
  jlptLevelLabel,
  type JlptLevel,
} from '../config/vocabQuiz'
import { useSession } from '../context/SessionContext'
import { getVocabManifest } from '../data'
import type { LangCode } from '../types/language'
import './pages.css'

export function JlptVocabHubPage() {
  const { targetLang: targetParam } = useParams()
  const { learnerLang } = useSession()

  if (!targetParam || !isTargetLang(targetParam)) {
    return <Navigate to="/" replace />
  }

  if (targetParam !== 'ja') {
    return <Navigate to={`/${targetParam}`} replace />
  }

  const target = getLanguage(targetParam)
  if (!target?.enabledAsTarget) {
    return <Navigate to="/" replace />
  }

  return (
    <JlptVocabHubInner
      targetLang={targetParam}
      targetEnglish={target.englishName}
      learnerLang={learnerLang}
    />
  )
}

function JlptVocabHubInner({
  targetLang,
  targetEnglish,
  learnerLang,
}: {
  targetLang: string
  targetEnglish: string
  learnerLang: LangCode
}) {
  const manifest = getVocabManifest()
  const [level, setLevel] = useState<JlptLevel>('n5')
  const days = manifest.levels[level]?.days ?? 0
  const words = manifest.levels[level]?.words ?? 0

  const category = getCategory('vocab')
  const title = category
    ? categoryLabel(category, learnerLang)
    : 'JLPT Vocabulary'

  useEffect(() => {
    document.title = `${title} · ${targetEnglish} | LangStart`
    return () => {
      document.title = 'LangStart'
    }
  }, [targetEnglish, title])

  return (
    <main className="learn-main">
      <div className="section-head">
        <p className="section-head__eyebrow">JLPT</p>
        <h1 className="section-head__title">{title}</h1>
        <p className="section-head__lead">{t(learnerLang, 'jlptHubLead')}</p>
      </div>

      <div className="jlpt-hub__levels" role="tablist" aria-label="JLPT levels">
        {JLPT_LEVELS.map((id) => {
          const meta = manifest.levels[id]
          if (!meta) return null
          const active = id === level
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`jlpt-hub__level${active ? ' is-active' : ''}`}
              onClick={() => setLevel(id)}
            >
              <span className="jlpt-hub__level-name">{jlptLevelLabel(id)}</span>
              <span className="jlpt-hub__level-meta">
                {tf(learnerLang, 'jlptHubMeta', {
                  days: meta.days,
                  words: meta.words,
                })}
              </span>
            </button>
          )
        })}
      </div>

      <div className="jlpt-hub__days-head">
        <h2 className="jlpt-hub__days-title">{jlptLevelLabel(level)}</h2>
        <p className="jlpt-hub__days-meta">
          {tf(learnerLang, 'jlptHubMeta', { days, words })}
        </p>
      </div>

      <div className="jlpt-hub__days panel-scroll" role="list">
        {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
          <Link
            key={day}
            role="listitem"
            to={`/${targetLang}/vocab/${level}/${day}`}
            className="jlpt-hub__day"
          >
            {day}
          </Link>
        ))}
      </div>
    </main>
  )
}
