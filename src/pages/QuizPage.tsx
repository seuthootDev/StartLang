import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
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
import {
  dayLabel,
  filterVocabByDay,
  filterVocabTableByDay,
  isKanaOnlyWord,
  jlptLevelLabel,
  parseJlptLevel,
  parseVocabDay,
  toVocabModeEntry,
  type JlptLevel,
  type VocabQuizEntry,
  type VocabQuizMode,
} from '../config/vocabQuiz'
import { getLanguage, isTargetLang } from '../config/languages'
import { t, tf } from '../config/uiStrings'
import { useSession } from '../context/SessionContext'
import { QuizContainer } from '../components/shared/QuizContainer'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useQuizSession } from '../hooks/useQuizSession'
import {
  getMeaningQuizzes,
  getRefTable,
  getVocabManifest,
  loadVocabQuizzes,
  loadVocabRefTable,
} from '../data'
import type { LangCode, TargetLangCode } from '../types/language'
import type { RefTable } from '../types/table'
import './pages.css'

type JapaneseAlphabetSet = 'hiragana' | 'katakana'

export function QuizPage() {
  const {
    targetLang: targetParam,
    categoryId: categoryParam,
    jlptLevel: jlptLevelParam,
    day: dayParam,
  } = useParams()
  const { learnerLang } = useSession()
  const [japaneseAlphabetSet, setJapaneseAlphabetSet] =
    useState<JapaneseAlphabetSet>('hiragana')
  const [numberSystem, setNumberSystem] = useState<NumberSystemId>('sino')
  const [vocabMode, setVocabMode] = useState<VocabQuizMode>('meaning')
  const [vocabRaw, setVocabRaw] = useState<VocabQuizEntry[]>([])
  const [vocabTable, setVocabTable] = useState<RefTable | null>(null)
  const [vocabReady, setVocabReady] = useState(false)

  const isVocabRoute = Boolean(jlptLevelParam) || categoryParam === 'vocab'
  const categoryId: CategoryId | undefined = isVocabRoute
    ? 'vocab'
    : categoryParam && isCategoryId(categoryParam)
      ? categoryParam
      : undefined

  const jlptLevel = parseJlptLevel(jlptLevelParam) ?? 'n5'
  const maxDay = getVocabManifest().levels[jlptLevel]?.days ?? 1
  const vocabDay = parseVocabDay(dayParam, maxDay) ?? 1

  useEffect(() => {
    if (!isVocabRoute) {
      setVocabRaw([])
      setVocabTable(null)
      setVocabReady(true)
      return
    }
    let cancelled = false
    setVocabReady(false)
    Promise.all([loadVocabQuizzes(jlptLevel), loadVocabRefTable(jlptLevel)]).then(
      ([quiz, table]) => {
        if (cancelled) return
        setVocabRaw(quiz)
        setVocabTable(table)
        setVocabReady(true)
      },
    )
    return () => {
      cancelled = true
    }
  }, [isVocabRoute, jlptLevel])

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

  if (!categoryId) {
    return <Navigate to={`/${targetParam}`} replace />
  }

  if (isVocabRoute) {
    const levelOk = parseJlptLevel(jlptLevelParam)
    const dayOk = parseVocabDay(dayParam, maxDay)
    if (!levelOk || !dayOk) {
      return (
        <Navigate
          to={`/${targetParam}/vocab/${levelOk ?? 'n5'}/1`}
          replace
        />
      )
    }
  }

  if (mergedIntoTime) {
    return <Navigate to={`/${targetParam}/time`} replace />
  }

  if (categoryId === 'dates' && targetParam === 'ko') {
    return <Navigate to={`/${targetParam}/time`} replace />
  }

  const effectiveLearner: LangCode =
    learnerLang === targetParam ? 'en' : learnerLang

  if (categoryId === 'vocab' && !vocabReady) {
    return (
      <main className="learn-main learn-main--center">
        <h1 className="section-head__title">…</h1>
      </main>
    )
  }

  const sessionKey =
    categoryId === 'numbers'
      ? numberSystem
      : categoryId === 'alphabet' && targetParam === 'ja'
        ? japaneseAlphabetSet
        : categoryId === 'vocab'
          ? `${jlptLevel}-${vocabDay}-${vocabMode}-ready`
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
      jlptLevel={jlptLevel}
      vocabDay={vocabDay}
      vocabMode={vocabMode}
      onVocabModeChange={setVocabMode}
      vocabRaw={vocabRaw}
      vocabTable={vocabTable}
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
  jlptLevel,
  vocabDay,
  vocabMode,
  onVocabModeChange,
  vocabRaw,
  vocabTable,
}: {
  targetLang: TargetLangCode
  categoryId: CategoryId
  learnerLang: LangCode
  japaneseAlphabetSet: JapaneseAlphabetSet
  onJapaneseAlphabetSetChange: (set: JapaneseAlphabetSet) => void
  numberSystem: NumberSystemId
  onNumberSystemChange: (set: NumberSystemId) => void
  jlptLevel: JlptLevel
  vocabDay: number
  vocabMode: VocabQuizMode
  onVocabModeChange: (mode: VocabQuizMode) => void
  vocabRaw: VocabQuizEntry[]
  vocabTable: RefTable | null
}) {
  const category = getCategory(categoryId)

  const levelEntries = useMemo(() => {
    if (categoryId !== 'vocab') return []
    const source =
      vocabMode === 'reading'
        ? vocabRaw.filter((entry) => !isKanaOnlyWord(entry.question_word))
        : vocabRaw
    return source.map((entry) => toVocabModeEntry(entry, vocabMode))
  }, [categoryId, vocabRaw, vocabMode])

  const dayEntries = useMemo(() => {
    if (categoryId !== 'vocab') return []
    const source =
      vocabMode === 'reading'
        ? filterVocabByDay(vocabRaw, vocabDay).filter(
            (entry) => !isKanaOnlyWord(entry.question_word),
          )
        : filterVocabByDay(vocabRaw, vocabDay)
    return source.map((entry) => toVocabModeEntry(entry, vocabMode))
  }, [categoryId, vocabRaw, vocabDay, vocabMode])

  const entries = useMemo(() => {
    const allEntries = getMeaningQuizzes(targetLang, categoryId)
    if (categoryId === 'numbers' && (targetLang === 'ko' || targetLang === 'ja')) {
      return filterNumberSystem(allEntries, numberSystem)
    }
    if (targetLang === 'ja' && categoryId === 'alphabet') {
      return allEntries.filter((entry) =>
        entry.quiz_id.includes(`_alphabet_${japaneseAlphabetSet}_`),
      )
    }
    if (categoryId === 'vocab') {
      return levelEntries
    }
    return allEntries
  }, [
    targetLang,
    categoryId,
    japaneseAlphabetSet,
    numberSystem,
    levelEntries,
  ])

  const refTable = useMemo(() => {
    if (categoryId === 'vocab') {
      return filterVocabTableByDay(vocabTable, vocabDay)
    }
    return getRefTable(targetLang, categoryId)
  }, [targetLang, categoryId, vocabTable, vocabDay])

  const isCompactViewport = useMediaQuery('(max-width: 639px)')

  const quiz = useQuizSession(entries, learnerLang, {
    inputMode:
      categoryId === 'alphabet' && !isCompactViewport ? 'type' : 'choice',
    numberCombos:
      categoryId === 'numbers'
        ? { targetLang, system: numberSystem, count: 5 }
        : undefined,
    dateMonthCombos:
      targetLang === 'ko' && categoryId === 'time'
        ? 'ko'
        : targetLang === 'ja' && categoryId === 'dates'
          ? 'ja'
          : targetLang === 'ru' && categoryId === 'dates'
            ? 'ru'
            : undefined,
    askEntries: categoryId === 'vocab' ? dayEntries : undefined,
  })
  const target = getLanguage(targetLang)

  useEffect(() => {
    const catName = category ? categoryLabel(category, learnerLang) : categoryId
    const vocabBit =
      categoryId === 'vocab'
        ? ` · ${jlptLevelLabel(jlptLevel)} · ${dayLabel(vocabDay, learnerLang)}`
        : ''
    document.title = `${target?.englishName ?? targetLang} · ${catName}${vocabBit} | LangStart`
    return () => {
      document.title = 'LangStart'
    }
  }, [
    target,
    targetLang,
    category,
    categoryId,
    learnerLang,
    jlptLevel,
    vocabDay,
  ])

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

  const vocabToggle =
    categoryId === 'vocab' ? (
      <VocabControls
        learnerLang={learnerLang}
        mode={vocabMode}
        onModeChange={onVocabModeChange}
      />
    ) : null

  const vocabSessionNav =
    categoryId === 'vocab' ? (
      <VocabSessionNav
        learnerLang={learnerLang}
        targetLang={targetLang}
        jlptLevel={jlptLevel}
        vocabDay={vocabDay}
        maxDay={getVocabManifest().levels[jlptLevel]?.days ?? 1}
      />
    ) : null

  const toolbarExtra = vocabToggle ?? numbersToggle ?? scriptToggle

  if (quiz.total === 0) {
    return (
      <main className="learn-main learn-main--center">
        {vocabSessionNav}
        {toolbarExtra}
        <h1 className="section-head__title">{t(learnerLang, 'emptyCategory')}</h1>
      </main>
    )
  }

  if (quiz.isFinished) {
    const hasMissed = quiz.missed.length > 0

    return (
      <main className="learn-main learn-main--center">
        {vocabSessionNav}
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
          <ul className="missed-list panel-scroll">
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
      {vocabSessionNav}
      {category && (
        <p className="quiz-eyebrow">
          {categoryLabel(category, learnerLang)}
          {categoryId === 'vocab'
            ? ` · ${jlptLevelLabel(jlptLevel)} · ${dayLabel(vocabDay, learnerLang)}`
            : ''}
        </p>
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

function VocabSessionNav({
  learnerLang,
  targetLang,
  jlptLevel,
  vocabDay,
  maxDay,
}: {
  learnerLang: LangCode
  targetLang: TargetLangCode
  jlptLevel: JlptLevel
  vocabDay: number
  maxDay: number
}) {
  const prevDay = vocabDay > 1 ? vocabDay - 1 : null
  const nextDay = vocabDay < maxDay ? vocabDay + 1 : null

  return (
    <nav className="vocab-nav" aria-label="JLPT day">
      <Link className="vocab-nav__hub" to={`/${targetLang}/vocab`}>
        {t(learnerLang, 'jlptBackToHub')}
      </Link>
      <div className="vocab-nav__day-row">
        {prevDay ? (
          <Link
            className="vocab-nav__day-btn"
            to={`/${targetLang}/vocab/${jlptLevel}/${prevDay}`}
            aria-label={t(learnerLang, 'jlptPrevDay')}
          >
            ←
          </Link>
        ) : (
          <span className="vocab-nav__day-btn is-disabled" aria-hidden>
            ←
          </span>
        )}
        <span className="vocab-nav__day-label">
          {jlptLevelLabel(jlptLevel)} · {dayLabel(vocabDay, learnerLang)}
        </span>
        {nextDay ? (
          <Link
            className="vocab-nav__day-btn"
            to={`/${targetLang}/vocab/${jlptLevel}/${nextDay}`}
            aria-label={t(learnerLang, 'jlptNextDay')}
          >
            →
          </Link>
        ) : (
          <span className="vocab-nav__day-btn is-disabled" aria-hidden>
            →
          </span>
        )}
      </div>
    </nav>
  )
}

function VocabControls({
  learnerLang,
  mode,
  onModeChange,
}: {
  learnerLang: LangCode
  mode: VocabQuizMode
  onModeChange: (mode: VocabQuizMode) => void
}) {
  return (
    <div className="vocab-controls">
      <div
        className="alphabet-toggle"
        role="group"
        aria-label={t(learnerLang, 'vocabMode')}
      >
        <button
          type="button"
          className={`alphabet-toggle__button${mode === 'reading' ? ' is-active' : ''}`}
          aria-pressed={mode === 'reading'}
          onClick={() => onModeChange('reading')}
        >
          {t(learnerLang, 'vocabModeReading')}
        </button>
        <button
          type="button"
          className={`alphabet-toggle__button${mode === 'meaning' ? ' is-active' : ''}`}
          aria-pressed={mode === 'meaning'}
          onClick={() => onModeChange('meaning')}
        >
          {t(learnerLang, 'vocabModeMeaning')}
        </button>
      </div>
    </div>
  )
}
