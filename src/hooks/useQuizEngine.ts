import type { LangCode } from '../types/language'
import type { MeaningQuizEntry, QuizQuestion } from '../types/vocab'

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Meaning quiz choices:
 * prompt = question_word (target language)
 * choices = translations[learnerLang]
 */
export function generateChoices(
  current: MeaningQuizEntry,
  pool: MeaningQuizEntry[],
  learnerLang: LangCode,
  choiceCount = 4,
): string[] {
  const correctAnswer = current.translations[learnerLang]
  if (!correctAnswer) {
    throw new Error(
      `Missing translation for ${current.quiz_id} in learner lang "${learnerLang}"`,
    )
  }

  const wrongCandidates = pool.filter(
    (entry) =>
      entry.quiz_id !== current.quiz_id &&
      Boolean(entry.translations[learnerLang]) &&
      entry.translations[learnerLang] !== correctAnswer,
  )

  const needed = Math.min(choiceCount - 1, wrongCandidates.length)
  const wrongAnswers = shuffle(wrongCandidates)
    .slice(0, needed)
    .map((entry) => entry.translations[learnerLang] as string)

  return shuffle([correctAnswer, ...wrongAnswers])
}

export function buildQuestion(
  entry: MeaningQuizEntry,
  pool: MeaningQuizEntry[],
  learnerLang: LangCode,
): QuizQuestion | null {
  const prompt = entry.question_word
  const correctAnswer = entry.translations[learnerLang]
  if (!prompt || !correctAnswer) return null
  if (prompt === correctAnswer) return null

  const pronunciation =
    entry.pronunciations[learnerLang] ?? entry.pronunciations.en ?? ''

  return {
    entry,
    prompt,
    pronunciation,
    choices: generateChoices(entry, pool, learnerLang),
    correctAnswer,
  }
}

export function buildQuizDeck(
  entries: MeaningQuizEntry[],
  learnerLang: LangCode,
  /** If set, only these cards are asked; distractors still come from `entries`. */
  subset?: MeaningQuizEntry[],
): QuizQuestion[] {
  const pool = entries.filter((entry) => entry.translations[learnerLang])
  const askFrom = subset
    ? subset.filter((entry) => entry.translations[learnerLang])
    : pool

  return shuffle(askFrom)
    .map((entry) => buildQuestion(entry, pool, learnerLang))
    .filter((q): q is QuizQuestion => q !== null)
}
