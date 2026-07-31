import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import {
  categoryLabel,
  getCategory,
  isCategoryId,
  type CategoryId,
} from '../config/categories'
import {
  filterNumberSystem,
  type NumberSystemId,
} from '../config/numberCombos'
import { getLanguage, isTargetLang } from '../config/languages'
import { t, tf } from '../config/uiStrings'
import { useSession } from '../context/SessionContext'
import { QuizContainer } from '../components/shared/QuizContainer'
import { useQuizSession } from '../hooks/useQuizSession'
import { getMeaningQuizzes, getRefTable } from '../data'
import type { LangCode, TargetLangCode } from '../types/language'
import './pages.css'

type JapaneseAlphabetSet = 'hiragana' | 'katakana'

export function QuizPage() {
  const { targetLang: targetParam, categoryId } = useParams()
  const { learnerLang } = useSession()
  const [japaneseAlphabetSet, setJapaneseAlphabetSet] =
    useState<JapaneseAlphabetSet>('hiragana')
  const [numberSystem, setNumberSystem] = useState<NumberSystemId>('sino')
  const mergedIntoTime =
    categoryId === 'weekdays' ||
    categoryId === 'ordinals' ||
    categoryId === 'months'

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

  if (categoryId === 'dates' && targetParam === 'ko') {
    return <Navigate to={`/${targetParam}/time`} replace />
  }

  const effectiveLearner: LangCode =
    learnerLang === targetParam ? 'en' : learnerLang

  const sessionKey =
    categoryId === 'numbers'
      ? numberSystem
      : categoryId === 'alphabet' && targetParam === 'ja'
        ? japaneseAlphabetSet
        : 'default'

  return (
    <QuizPageInner
      key={`${targetParam}-${categoryId}-${effectiveLearner}-${sessionKey}`}
      targetLang={targetParam}
      categoryId={categoryId}
      learnerLang={effectiveLearner}
      japaneseAlphabetSet={japaneseAlphabetSet}
      onJapaneseAlphabetSetChange={setJapaneseAlphabetSet}
      numberSystem={numberSystem}
      onNumberSystemChange={setNumberSystem}
    />
  )
}

function QuizPageInner({
  targetLang,
  categoryId,
  learnerLang,
  japaneseAlphabetSet,
  onJapaneseAlphabetSetChange,
  numberSystem,
  onNumberSystemChange,
}: {
  targetLang: TargetLangCode
  categoryId: CategoryId
  learnerLang: LangCode
  japaneseAlphabetSet: JapaneseAlphabetSet
  onJapaneseAlphabetSetChange: (set: JapaneseAlphabetSet) => void
  numberSystem: NumberSystemId
  onNumberSystemChange: (set: NumberSystemId) => void
}) {
  const category = getCategory(categoryId)
  const entries = useMemo(() => {
    const allEntries = getMeaningQuizzes(targetLang, categoryId)
    if (categoryId === 'numbers') {
      return filterNumberSystem(allEntries, numberSystem)
    }
    if (targetLang === 'ja' && categoryId === 'alphabet') {
      return allEntries.filter((entry) =>
        entry.quiz_id.includes(`_alphabet_${japaneseAlphabetSet}_`),
      )
    }
    return allEntries
  }, [targetLang, categoryId, japaneseAlphabetSet, numberSystem])

  const refTable = useMemo(
    () => getRefTable(targetLang, categoryId),
    [targetLang, categoryId],
  )
  const quiz = useQuizSession(entries, learnerLang, {
    inputMode: categoryId === 'alphabet' ? 'type' : 'choice',
    numberCombos:
      categoryId === 'numbers'
        ? { targetLang, system: numberSystem, count: 5 }
        : undefined,
    dateMonthCombos:
      targetLang === 'ko' && categoryId === 'time' ? 'ko' : undefined,
  })
  const target = getLanguage(targetLang)

  useEffect(() => {
    const catName = category ? categoryLabel(category, learnerLang) : categoryId
    document.title = `${target?.englishName ?? targetLang} · ${catName} | LangStart`
    return () => {
      document.title = 'LangStart'
    }
  }, [target, targetLang, category, categoryId, learnerLang])

  const scriptToggle =
    targetLang === 'ja' && categoryId === 'alphabet' ? (
      <JapaneseAlphabetToggle
        value={japaneseAlphabetSet}
        onChange={onJapaneseAlphabetSetChange}
      />
    ) : null

  const numbersToggle =
    categoryId === 'numbers' &&
    (targetLang === 'ko' || targetLang === 'ja') ? (
      <NumberSystemToggle
        targetLang={targetLang}
        value={numberSystem}
        onChange={onNumberSystemChange}
      />
    ) : null

  const toolbarExtra = numbersToggle ?? scriptToggle

  if (quiz.total === 0) {
    return (
      <main className="learn-main learn-main--center">
        {toolbarExtra}
        <h1 className="section-head__title">{t(learnerLang, 'emptyCategory')}</h1>
      </main>
    )
  }

  if (quiz.isFinished) {
    const hasMissed = quiz.missed.length > 0

    return (
      <main className="learn-main learn-main--center">
        {toolbarExtra}
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
        toolbarExtra={toolbarExtra}
      />
    </main>
  )
}

function JapaneseAlphabetToggle({
  value,
  onChange,
}: {
  value: JapaneseAlphabetSet
  onChange: (set: JapaneseAlphabetSet) => void
}) {
  return (
    <div
      className="alphabet-toggle"
      role="group"
      aria-label="Japanese alphabet set"
    >
      <button
        type="button"
        className={`alphabet-toggle__button${value === 'hiragana' ? ' is-active' : ''}`}
        aria-pressed={value === 'hiragana'}
        onClick={() => onChange('hiragana')}
      >
        ひらがな
      </button>
      <button
        type="button"
        className={`alphabet-toggle__button${value === 'katakana' ? ' is-active' : ''}`}
        aria-pressed={value === 'katakana'}
        onClick={() => onChange('katakana')}
      >
        カタカナ
      </button>
    </div>
  )
}

function NumberSystemToggle({
  targetLang,
  value,
  onChange,
}: {
  targetLang: 'ko' | 'ja'
  value: NumberSystemId
  onChange: (set: NumberSystemId) => void
}) {
  const labels =
    targetLang === 'ko'
      ? { sino: '한자어', native: '셈수' }
      : { sino: 'いち・に', native: 'ひとつ' }

  return (
    <div
      className="alphabet-toggle"
      role="group"
      aria-label="Number system"
    >
      <button
        type="button"
        className={`alphabet-toggle__button${value === 'sino' ? ' is-active' : ''}`}
        aria-pressed={value === 'sino'}
        onClick={() => onChange('sino')}
      >
        {labels.sino}
      </button>
      <button
        type="button"
        className={`alphabet-toggle__button${value === 'native' ? ' is-active' : ''}`}
        aria-pressed={value === 'native'}
        onClick={() => onChange('native')}
      >
        {labels.native}
      </button>
    </div>
  )
}
