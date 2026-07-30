import { useEffect, useMemo } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {
  categoryLabel,
  getCategory,
  isCategoryId,
  type CategoryId,
} from '../config/categories'
import { getLanguage, isTargetLang } from '../config/languages'
import { t, tf } from '../config/uiStrings'
import { useSession } from '../context/SessionContext'
import { QuizContainer } from '../components/shared/QuizContainer'
import { useQuizSession } from '../hooks/useQuizSession'
import { getMeaningQuizzes, getRefTable } from '../data'
import type { LangCode, TargetLangCode } from '../types/language'
import './pages.css'

export function QuizPage() {
  const { targetLang: targetParam, categoryId } = useParams()
  const { learnerLang } = useSession()
  const mergedIntoTime = categoryId === 'weekdays' || categoryId === 'ordinals' || categoryId === 'months'

  if (!targetParam || !isTargetLang(targetParam)) {
    return <Navigate to="/" replace />
  }

  const target = getLanguage(targetParam)
  if (!target?.enabledAsTarget) {
    return <Navigate to="/" replace />
  }

  if (!categoryId || !isCategoryId(categoryId)) {
    return <Navigate to={`/${targetParam}`} replace />
  }

  if (mergedIntoTime) {
    return <Navigate to={`/${targetParam}/time`} replace />
  }

  const effectiveLearner: LangCode =
    learnerLang === targetParam ? 'en' : learnerLang

  return (
    <QuizPageInner
      key={`${targetParam}-${categoryId}-${effectiveLearner}`}
      targetLang={targetParam}
      categoryId={categoryId}
      learnerLang={effectiveLearner}
    />
  )
}

function QuizPageInner({
  targetLang,
  categoryId,
  learnerLang,
}: {
  targetLang: TargetLangCode
  categoryId: CategoryId
  learnerLang: LangCode
}) {
  const category = getCategory(categoryId)
  const entries = useMemo(
    () => getMeaningQuizzes(targetLang, categoryId),
    [targetLang, categoryId],
  )
  const refTable = useMemo(
    () => getRefTable(targetLang, categoryId),
    [targetLang, categoryId],
  )
  const quiz = useQuizSession(entries, learnerLang)
  const target = getLanguage(targetLang)

  useEffect(() => {
    const catName = category ? categoryLabel(category, learnerLang) : categoryId
    document.title = `${target?.englishName ?? targetLang} · ${catName} | LangStart`
    return () => {
      document.title = 'LangStart'
    }
  }, [target, targetLang, category, categoryId, learnerLang])

  if (quiz.total === 0) {
    return (
      <main className="learn-main learn-main--center">
        <h1 className="section-head__title">{t(learnerLang, 'emptyCategory')}</h1>
      </main>
    )
  }

  if (quiz.isFinished) {
    const hasMissed = quiz.missed.length > 0

    return (
      <main className="learn-main learn-main--center">
        <h1 className="section-head__title">
          {hasMissed
            ? tf(learnerLang, 'roundResult', { n: quiz.round })
            : t(learnerLang, 'perfectRound')}
        </h1>

        <p className="finish-score">
          {hasMissed
            ? tf(learnerLang, 'missedSummary', {
                correct: quiz.score,
                missed: quiz.missed.length,
              })
            : `${t(learnerLang, 'score')}: ${quiz.score} / ${quiz.total}`}
        </p>

        {hasMissed && (
          <ul className="missed-list">
            {quiz.missed.map((item) => (
              <li key={`${item.entry.quiz_id}-${item.userAnswer}`}>
                <span className="missed-list__prompt">{item.prompt}</span>
                <span className="missed-list__detail">
                  {t(learnerLang, 'correctAnswer')}: {item.correctAnswer}
                  {' · '}
                  {t(learnerLang, 'yourAnswer')}: {item.userAnswer}
                </span>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className="primary-btn"
          onClick={hasMissed ? quiz.retryMissed : quiz.restart}
        >
          {hasMissed
            ? tf(learnerLang, 'retryMissed', { n: quiz.missed.length })
            : t(learnerLang, 'restart')}
        </button>
      </main>
    )
  }

  if (!quiz.current) return null

  return (
    <main className="learn-main">
      {category && (
        <p className="quiz-eyebrow">{categoryLabel(category, learnerLang)}</p>
      )}
      <QuizContainer
        learnerLang={learnerLang}
        question={quiz.current}
        index={quiz.index}
        total={quiz.total}
        score={quiz.score}
        selected={quiz.selected}
        onSelect={quiz.selectChoice}
        onNext={quiz.next}
        showPronunciation={categoryId !== 'alphabet'}
        refTable={refTable}
      />
    </main>
  )
}
