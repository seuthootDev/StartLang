import { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { getLanguage, isTargetLang } from '../../config/languages'
import { t } from '../../config/uiStrings'
import { useSession } from '../../context/SessionContext'
import type { LangCode } from '../../types/language'
import { Navbar } from './Navbar'
import { LearnSidebar } from './LearnSidebar'
import './LearnSidebar.css'

export function LearnShell() {
  const { targetLang } = useParams()
  const { learnerLang } = useSession()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (!targetLang || !isTargetLang(targetLang)) {
    return <Navigate to="/" replace />
  }

  const target = getLanguage(targetLang)
  if (!target?.enabledAsTarget) {
    return <Navigate to="/" replace />
  }

  return (
    <LearnShellFrame
      learnerLang={learnerLang}
      exclude={targetLang as LangCode}
      drawerOpen={drawerOpen}
      setDrawerOpen={setDrawerOpen}
      pathname={location.pathname}
    />
  )
}

function LearnShellFrame({
  learnerLang,
  exclude,
  drawerOpen,
  setDrawerOpen,
  pathname,
}: {
  learnerLang: LangCode
  exclude: LangCode
  drawerOpen: boolean
  setDrawerOpen: (open: boolean | ((v: boolean) => boolean)) => void
  pathname: string
}) {
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname, setDrawerOpen])

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen, setDrawerOpen])

  return (
    <div className="learn-shell">
      <div className="learn-shell__chrome">
        <div className="learn-shell__top">
          <button
            type="button"
            className="learn-shell__burger"
            aria-expanded={drawerOpen}
            aria-label={t(learnerLang, 'categories')}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <Link to="/" className="learn-shell__brand">
            {t(learnerLang, 'appName')}
          </Link>

          <Navbar excludeLearnerLang={exclude} compact />
        </div>
      </div>

      <div className="learn-shell__body">
        <aside className="learn-sidebar learn-sidebar--desktop">
          <LearnSidebar />
        </aside>

        {drawerOpen && (
          <div className="learn-sidebar--drawer">
            <button
              type="button"
              className="learn-sidebar--backdrop"
              aria-label="Close"
              onClick={() => setDrawerOpen(false)}
            />
            <aside className="learn-sidebar--panel learn-sidebar">
              <LearnSidebar />
            </aside>
          </div>
        )}

        <div className="learn-shell__main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
