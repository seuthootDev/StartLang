import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { SessionProvider } from './context/SessionContext'
import { Navbar } from './components/shared/Navbar'
import { LearnShell } from './components/shared/LearnShell'
import { HomePage } from './pages/HomePage'
import { LanguageHubPage } from './pages/LanguageHubPage'
import { QuizPage } from './pages/QuizPage'

function HomeLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <HomePage />
    </div>
  )
}

function VocabRedirect() {
  const { targetLang } = useParams()
  return <Navigate to={`/${targetLang}/vocab/n5/1`} replace />
}

function VocabLevelRedirect() {
  const { targetLang, jlptLevel } = useParams()
  return <Navigate to={`/${targetLang}/vocab/${jlptLevel}/1`} replace />
}

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/:targetLang" element={<LearnShell />}>
            <Route index element={<LanguageHubPage />} />
            <Route path="vocab/:jlptLevel/:day" element={<QuizPage />} />
            <Route path="vocab/:jlptLevel" element={<VocabLevelRedirect />} />
            <Route path="vocab" element={<VocabRedirect />} />
            <Route path=":categoryId" element={<QuizPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}
