import { Link } from 'react-router-dom'
import { TARGET_LANGUAGES } from '../config/languages'
import { t } from '../config/uiStrings'
import { useSession } from '../context/SessionContext'
import './pages.css'

export function HomePage() {
  const { learnerLang } = useSession()

  return (
    <main className="page page--hero">
      <div className="hero">
        <p className="hero__brand">{t(learnerLang, 'appName')}</p>
        <h1 className="hero__title">{t(learnerLang, 'tagline')}</h1>
        <p className="hero__lead">{t(learnerLang, 'chooseTarget')}</p>
      </div>

      <ul className="lang-grid">
        {TARGET_LANGUAGES.map((lang) => {
          const enabled = lang.enabledAsTarget
          const content = (
            <>
              <span className="lang-card__native">{lang.nativeName}</span>
              <span className="lang-card__en">{lang.englishName}</span>
              {!enabled && (
                <span className="lang-card__badge">{t(learnerLang, 'comingSoon')}</span>
              )}
            </>
          )

          return (
            <li key={lang.code}>
              {enabled ? (
                <Link
                  to={`/${lang.code}`}
                  className={`lang-card lang-card--${lang.code}`}
                >
                  {content}
                </Link>
              ) : (
                <div
                  className={`lang-card lang-card--${lang.code} lang-card--disabled`}
                  aria-disabled="true"
                >
                  {content}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </main>
  )
}
