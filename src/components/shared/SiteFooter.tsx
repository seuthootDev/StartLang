import { GITHUB_REPO_URL } from '../../config/site'
import { t } from '../../config/uiStrings'
import { useSession } from '../../context/SessionContext'
import './SiteFooter.css'

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  const { learnerLang } = useSession()

  return (
    <footer className={`site-footer${compact ? ' site-footer--compact' : ''}`}>
      <div className="site-footer__inner">
        {compact ? (
          <>
            <a
              className="site-footer__title site-footer__title--link"
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(learnerLang, 'contributeTitle')}
            </a>
            <a
              className="site-footer__link"
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(learnerLang, 'contributeCta')}
            </a>
          </>
        ) : (
          <>
            <p className="site-footer__title">{t(learnerLang, 'contributeTitle')}</p>
            <p className="site-footer__lead">{t(learnerLang, 'contributeLead')}</p>
            <a
              className="site-footer__link"
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(learnerLang, 'contributeCta')}
            </a>
          </>
        )}
      </div>
    </footer>
  )
}
