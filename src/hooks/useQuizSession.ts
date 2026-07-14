import { useCallback, useState } from 'react'
import type { LangCode } from '../types/language'
import type { MeaningQuizEntry, QuizQuestion } from '../types/vocab'
import { buildQuizDeck } from './useQuizEngine'

export interface MissedQuestion {
  entry: MeaningQuizEntry
  prompt: string
  correctAnswer: string
  userAnswer: string
}

export function useQuizSession(entries: MeaningQuizEntry[], learnerLang: LangCode) {
  const [deck, setDeck] = useState<QuizQuestion[]>(() =>
    buildQuizDeck(entries, learnerLang),
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
      setSelected(choice)
      if (choice === current.correctAnswer) {
        setScore((s) => s + 1)
      } else {
        setMissed((prev) => [
          ...prev,
          {
            entry: current.entry,
            prompt: current.prompt,
            correctAnswer: current.correctAnswer,
            userAnswer: choice,
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
    setDeck(buildQuizDeck(entries, learnerLang))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setRound(1)
    setMissed([])
  }, [entries, learnerLang])

  /** goJapan-style: reshuffle only the missed cards into a new round */
  const retryMissed = useCallback(() => {
    if (missed.length === 0) return
    const subset = missed.map((m) => m.entry)
    setDeck(buildQuizDeck(entries, learnerLang, subset))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setRound((r) => r + 1)
    setMissed([])
  }, [missed, entries, learnerLang])

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
