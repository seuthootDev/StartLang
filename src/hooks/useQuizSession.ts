import { useCallback, useState } from 'react'
import type { NumberSystemId } from '../config/numberCombos'
import type { LangCode, TargetLangCode } from '../types/language'
import type { MeaningQuizEntry, QuizInputMode, QuizQuestion } from '../types/vocab'
import {
  buildQuizDeck,
  isTypedAnswerCorrect,
  normalizeTypedAnswer,
} from './useQuizEngine'

export interface MissedQuestion {
  entry: MeaningQuizEntry
  prompt: string
  correctAnswer: string
  userAnswer: string
}

export function useQuizSession(
  entries: MeaningQuizEntry[],
  learnerLang: LangCode,
  options?: {
    inputMode?: QuizInputMode
    numberCombos?: {
      targetLang: TargetLangCode
      system: NumberSystemId
      count?: number
    }
  },
) {
  const inputMode = options?.inputMode ?? 'choice'
  const numberCombos = options?.numberCombos
  const [deck, setDeck] = useState<QuizQuestion[]>(() =>
    buildQuizDeck(entries, learnerLang, undefined, { inputMode, numberCombos }),
  )
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [missed, setMissed] = useState<MissedQuestion[]>([])

  const current = deck[index] ?? null
  const isFinished = deck.length > 0 && index >= deck.length

  const selectChoice = useCallback(
    (choice: string) => {
      if (selected || !current) return

      const typed = current.inputMode === 'type'
      const answer = typed ? normalizeTypedAnswer(choice) : choice
      if (typed && !answer) return

      const isCorrect = typed
        ? isTypedAnswerCorrect(answer, current.correctAnswer)
        : answer === current.correctAnswer

      setSelected(answer)
      if (isCorrect) {
        setScore((s) => s + 1)
      } else {
        setMissed((prev) => [
          ...prev,
          {
            entry: current.entry,
            prompt: current.prompt,
            correctAnswer: current.correctAnswer,
            userAnswer: answer,
          },
        ])
      }
    },
    [selected, current],
  )

  const next = useCallback(() => {
    setSelected(null)
    setIndex((i) => i + 1)
  }, [])

  const restart = useCallback(() => {
    setDeck(buildQuizDeck(entries, learnerLang, undefined, { inputMode, numberCombos }))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setRound(1)
    setMissed([])
  }, [entries, learnerLang, inputMode, numberCombos])

  /** goJapan-style: reshuffle only the missed cards into a new round */
  const retryMissed = useCallback(() => {
    if (missed.length === 0) return
    const subset = missed.map((m) => m.entry)
    setDeck(buildQuizDeck(entries, learnerLang, subset, { inputMode, numberCombos }))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setRound((r) => r + 1)
    setMissed([])
  }, [missed, entries, learnerLang, inputMode, numberCombos])

  return {
    current,
    index,
    total: deck.length,
    score,
    round,
    missed,
    selected,
    isAnswered: selected !== null,
    isFinished,
    selectChoice,
    next,
    restart,
    retryMissed,
  }
}
