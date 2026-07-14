import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
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

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/:targetLang" element={<LearnShell />}>
            <Route index element={<LanguageHubPage />} />
            <Route path=":categoryId" element={<QuizPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  )
}
