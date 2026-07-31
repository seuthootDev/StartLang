import type { LangCode, TargetLangCode } from '../types/language'
import type { MeaningQuizEntry, QuizQuestion } from '../types/vocab'
import {
  generateNumberComboEntries,
  type NumberSystemId,
} from '../config/numberCombos'
import { applyDateMonthCombos, type DateMonthComboMode } from '../config/dateMonthCombos'

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

export function normalizeTypedAnswer(value: string): string {
  return value.normalize('NFC').trim()
}

/**
 * Typed alphabet answers: when the key is `g/k` (or `グ/ク`), accept
 * any single side (`g`, `k`) or the full slash form. Same rule for every
 * language; Korean Hangul romanization is the main current case.
 */
export function isTypedAnswerCorrect(
  userInput: string,
  correctAnswer: string,
): boolean {
  const normalize = (value: string) =>
    normalizeTypedAnswer(value)
      .toLowerCase()
      .replace(/／/g, '/')
      .replace(/\s*\/\s*/g, '/')
      .replace(/\s+/g, '')

  const user = normalize(userInput)
  const correct = normalize(correctAnswer)
  if (!user || !correct) return false
  if (user === correct) return true

  const alternatives = correct.split('/').filter(Boolean)
  return alternatives.length > 1 && alternatives.includes(user)
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
    inputMode: 'choice',
  }
}

/**
 * Alphabet: show the target character (ㄱ / あ), then type its sound
 * using the learner's writing system (g/k / 아).
 */
export function buildTypedAlphabetQuestion(
  entry: MeaningQuizEntry,
  learnerLang: LangCode,
): QuizQuestion | null {
  const prompt = entry.question_word
  const correctAnswer =
    entry.translations[learnerLang] ??
    entry.pronunciations[learnerLang] ??
    entry.pronunciations.en ??
    ''
  if (!correctAnswer || !prompt) return null

  return {
    entry,
    prompt,
    pronunciation: '',
    choices: [],
    correctAnswer,
    inputMode: 'type',
  }
}

export function buildQuizDeck(
  entries: MeaningQuizEntry[],
  learnerLang: LangCode,
  /** If set, only these cards are asked; distractors still come from `entries`. */
  subset?: MeaningQuizEntry[],
  options?: {
    inputMode?: 'choice' | 'type'
    /** Append ~5 random compound-number cards for numbers drills. */
    numberCombos?: {
      targetLang: TargetLangCode
      system: NumberSystemId
      count?: number
    }
    /** JA dates / KO calendar days: prefix a random month on day cards. */
    dateMonthCombos?: DateMonthComboMode
  },
): QuizQuestion[] {
  const inputMode = options?.inputMode ?? 'choice'

  if (inputMode === 'type') {
    const askFrom = subset ?? entries
    return shuffle(askFrom)
      .map((entry) => buildTypedAlphabetQuestion(entry, learnerLang))
      .filter((q): q is QuizQuestion => q !== null)
  }

  let pool = entries.filter((entry) => entry.translations[learnerLang])
  let askFrom = subset
    ? subset.filter((entry) => entry.translations[learnerLang])
    : pool

  if (options?.numberCombos && !subset) {
    const combos = generateNumberComboEntries(
      options.numberCombos.targetLang,
      options.numberCombos.system,
      options.numberCombos.count ?? 5,
    )
    askFrom = [...askFrom, ...combos]
    pool = [...pool, ...combos]
  }

  if (options?.dateMonthCombos) {
    askFrom = applyDateMonthCombos(askFrom, options.dateMonthCombos)
    pool = applyDateMonthCombos(pool, options.dateMonthCombos)
  }

  return shuffle(askFrom)
    .map((entry) => buildQuestion(entry, pool, learnerLang))
    .filter((q): q is QuizQuestion => q !== null)
}
