import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { t } from '../../config/uiStrings'
import { isTypedAnswerCorrect } from '../../hooks/useQuizEngine'
import type { LangCode } from '../../types/language'
import type { RefTable } from '../../types/table'
import type { QuizQuestion } from '../../types/vocab'
import { ReferenceTableModal } from './ReferenceTableModal'
import './QuizContainer.css'

const AUTO_NEXT_MS = 2500

interface QuizContainerProps {
  learnerLang: LangCode
  question: QuizQuestion
  index: number
  total: number
  score: number
  selected: string | null
  onSelect: (choice: string) => void
  onNext: () => void
  /** Alphabet drills ask the sound as typed input — hide pronunciation tip */
  showPronunciation?: boolean
  /** Optional category reference chart (JSON-driven) */
  refTable?: RefTable | null
  /** Small controls placed next to the table button (e.g. script switch) */
  toolbarExtra?: ReactNode
}

export function QuizContainer({
  learnerLang,
  question,
  index,
  total,
  score,
  selected,
  onSelect,
  onNext,
  showPronunciation = true,
  refTable = null,
  toolbarExtra = null,
}: QuizContainerProps) {
  const [tableOpen, setTableOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  /** Blocks a ghost click/submit that lands on the next question's Check button. */
  const blockSubmitRef = useRef(false)
  const isTypeMode = question.inputMode === 'type'
  const isAnswered = selected !== null
  const isCorrect = isTypeMode
    ? selected !== null &&
      isTypedAnswerCorrect(selected, question.correctAnswer)
    : selected === question.correctAnswer
  const tip =
    !isTypeMode && showPronunciation && question.pronunciation
      ? question.pronunciation
      : ''

  const goNext = useCallback(() => {
    blockSubmitRef.current = true
    setDraft('')
    onNext()
  }, [onNext])

  useEffect(() => {
    setTableOpen(false)
    setDraft('')
    const timer = window.setTimeout(() => {
      blockSubmitRef.current = false
    }, 300)
    return () => window.clearTimeout(timer)
  }, [question.entry.quiz_id])

  useEffect(() => {
    if (!isTypeMode || isAnswered) return
    inputRef.current?.focus()
  }, [isTypeMode, isAnswered, question.entry.quiz_id])

  useEffect(() => {
    if (!isAnswered || tableOpen) return
    const timer = window.setTimeout(goNext, AUTO_NEXT_MS)
    return () => window.clearTimeout(timer)
  }, [isAnswered, tableOpen, question.entry.quiz_id, goNext])

  useEffect(() => {
    if (!isAnswered || !isTypeMode) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || event.isComposing) return
      if (tableOpen) return
      event.preventDefault()
      goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isAnswered, isTypeMode, tableOpen, goNext])

  function submitDraft() {
    if (isAnswered || blockSubmitRef.current) return
    const value = draft
    if (!value.trim()) return
    onSelect(value)
  }

  return (
    <>
      <section
        className={`quiz${isAnswered ? ' quiz--continue' : ''}${isTypeMode ? ' quiz--type' : ''}`}
        onClick={isAnswered && !tableOpen ? goNext : undefined}
      >
        <div className="quiz__progress">
          <span>
            {index + 1} / {total}
          </span>
          <div className="quiz__progress-actions">
            {toolbarExtra && (
              <div
                className="quiz__toolbar-extra"
                onClick={(event) => event.stopPropagation()}
              >
                {toolbarExtra}
              </div>
            )}
            {refTable && (
              <button
                type="button"
                className="quiz__table-btn"
                onClick={(event) => {
                  event.stopPropagation()
                  setTableOpen(true)
                }}
              >
                {t(learnerLang, 'openTable')}
              </button>
            )}
            <span>
              {t(learnerLang, 'score')}: {score}
            </span>
          </div>
        </div>

        <div className="quiz__prompt-block">
          <p
            className={`quiz__prompt${tip ? ' quiz__prompt--tip' : ''}`}
            tabIndex={tip ? 0 : undefined}
            aria-label={
              tip
                ? `${question.prompt}. ${t(learnerLang, 'hearPronunciation')}: ${tip}`
                : undefined
            }
            data-tip={tip || undefined}
          >
            {question.prompt}
          </p>
        </div>

        {isTypeMode ? (
          <form
            className="quiz__type"
            onSubmit={(event) => {
              event.preventDefault()
              if (isAnswered) {
                goNext()
                return
              }
              submitDraft()
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="quiz__type-row">
              <input
                ref={inputRef}
                className={`quiz__type-input${
                  isAnswered ? (isCorrect ? ' is-correct' : ' is-wrong') : ''
                }`}
                type="text"
                value={isAnswered ? (selected ?? '') : draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={t(learnerLang, 'typeCharacter')}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                disabled={isAnswered}
                aria-label={t(learnerLang, 'typeCharacter')}
              />
              <button
                type="button"
                className="quiz__type-submit"
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  if (isAnswered) goNext()
                  else submitDraft()
                }}
              >
                {t(learnerLang, isAnswered ? 'next' : 'checkAnswer')}
              </button>
            </div>
            {isAnswered && !isCorrect && (
              <p className="quiz__type-answer">
                {t(learnerLang, 'correctAnswer')}:{' '}
                <span className="quiz__type-answer-char">
                  {question.correctAnswer}
                </span>
              </p>
            )}
          </form>
        ) : (
          <div className="quiz__choices" role="group">
            {question.choices.map((choice) => {
              let stateClass = ''
              if (isAnswered) {
                if (choice === question.correctAnswer) stateClass = 'is-correct'
                else if (choice === selected) stateClass = 'is-wrong'
                else stateClass = 'is-dimmed'
              }

              return (
                <button
                  key={choice}
                  type="button"
                  className={`quiz__choice ${stateClass}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    if (isAnswered) {
                      goNext()
                      return
                    }
                    onSelect(choice)
                  }}
                >
                  {choice}
                </button>
              )
            })}
          </div>
        )}

        {isAnswered && (
          <div className="quiz__feedback">
            <p className={isCorrect ? 'is-ok' : 'is-bad'}>
              {isCorrect ? t(learnerLang, 'correct') : t(learnerLang, 'wrong')}
            </p>
            <p className="quiz__continue-hint">
              {t(learnerLang, isTypeMode ? 'enterToContinue' : 'tapToContinue')}
            </p>
          </div>
        )}
      </section>

      {tableOpen && refTable && (
        <ReferenceTableModal
          table={refTable}
          learnerLang={learnerLang}
          onClose={() => setTableOpen(false)}
        />
      )}
    </>
  )
}

