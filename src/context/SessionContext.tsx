import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isLearnerLang } from '../config/languages'
import type { LangCode } from '../types/language'

interface SessionState {
  learnerLang: LangCode
  setLearnerLang: (lang: LangCode) => void
}

const SessionContext = createContext<SessionState | null>(null)

const LEARNER_STORAGE_KEY = 'langstart.learnerLang'

function readStoredLearnerLang(): LangCode {
  try {
    const stored = localStorage.getItem(LEARNER_STORAGE_KEY)
    if (stored && isLearnerLang(stored)) return stored
  } catch {
    /* ignore */
  }
  return 'en'
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [learnerLang, setLearnerLangState] = useState<LangCode>(readStoredLearnerLang)

  const setLearnerLang = (lang: LangCode) => {
    try {
      localStorage.setItem(LEARNER_STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
    setLearnerLangState(lang)
  }

  const value = useMemo(
    () => ({ learnerLang, setLearnerLang }),
    [learnerLang],
  )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
