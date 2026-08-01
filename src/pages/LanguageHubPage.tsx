import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getLanguage, isTargetLang } from '../config/languages'
import { t } from '../config/uiStrings'
import { useSession } from '../context/SessionContext'
import type { LangCode, TargetLangCode } from '../types/language'
import './pages.css'

export function LanguageHubPage() {
  const { targetLang: targetParam } = useParams()
  const { learnerLang } = useSession()

  if (!targetParam || !isTargetLang(targetParam)) {
    return <Navigate to="/" replace />
  }

  const target = getLanguage(targetParam)
  if (!target?.enabledAsTarget) {
    return <Navigate to="/" replace />
  }

  return (
    <LanguageHubInner
      targetCode={targetParam}
      targetNative={target.nativeName}
      targetEnglish={target.englishName}
      learnerLang={learnerLang}
    />
  )
}

function LanguageHubInner({
  targetNative,
  targetEnglish,
  learnerLang,
}: {
  targetCode: TargetLangCode
  targetNative: string
  targetEnglish: string
  learnerLang: LangCode
}) {
  useEffect(() => {
    document.title = `${targetEnglish} · LangStart`
    return () => {
      document.title = 'LangStart'
    }
  }, [targetEnglish])

  return (
    <main className="learn-main">
      <div className="section-head">
        <p className="section-head__eyebrow">{targetEnglish}</p>
        <h1 className="section-head__title">{targetNative}</h1>
        <p className="section-head__lead">{t(learnerLang, 'languageHubLead')}</p>
        <p className="section-head__menu-hint">
          <span className="section-head__menu-icon" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          {t(learnerLang, 'languageHubMenuHint')}
        </p>
      </div>
    </main>
  )
}
