import { useEffect, useState } from 'react'
import { t } from '../../config/uiStrings'
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
  /** Alphabet drills already are the sound — hide pronunciation tip */
  showPronunciation?: boolean
  /** Optional category reference chart (JSON-driven) */
  refTable?: RefTable | null
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
}: QuizContainerProps) {
  const [tableOpen, setTableOpen] = useState(false)
  const isAnswered = selected !== null
  const isCorrect = selected === question.correctAnswer
  const tip =
    showPronunciation && question.pronunciation
      ? question.pronunciation
      : ''

  useEffect(() => {
    setTableOpen(false)
  }, [question.entry.quiz_id])

  useEffect(() => {
    if (!isAnswered || tableOpen) return
    const timer = window.setTimeout(onNext, AUTO_NEXT_MS)
    return () => window.clearTimeout(timer)
  }, [isAnswered, tableOpen, question.entry.quiz_id, onNext])

  return (
    <>
      <section
        className={`quiz${isAnswered ? ' quiz--continue' : ''}`}
        onClick={isAnswered && !tableOpen ? onNext : undefined}
      >
        <div className="quiz__progress">
          <span>
            {index + 1} / {total}
          </span>
          <div className="quiz__progress-actions">
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
                    onNext()
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

        {isAnswered && (
          <div className="quiz__feedback">
            <p className={isCorrect ? 'is-ok' : 'is-bad'}>
              {isCorrect ? t(learnerLang, 'correct') : t(learnerLang, 'wrong')}
            </p>
            <p className="quiz__continue-hint">{t(learnerLang, 'tapToContinue')}</p>
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
