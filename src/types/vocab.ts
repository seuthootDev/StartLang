import type { LangCode } from './language'

/**
 * Standard drill card for a single learning language.
 * File lives at: data/{targetLang}/{category}.json
 *
 * Prompt = question_word (already in the target language)
 * Choices = translations[learnerLang]
 * Tooltip = pronunciations[learnerLang]
 */
export interface MeaningQuizEntry {
  quiz_id: string
  question_word: string
  pronunciations: Partial<Record<LangCode, string>>
  translations: Partial<Record<LangCode, string>>
}

/**
 * Language-specific grammar drills (gender, case, etc.).
 * Example path: data/es/gender.json, data/de/gender.json
 */
export interface GenderQuizEntry {
  quiz_id: string
  question_word: string
  pronunciations: Partial<Record<LangCode, string>>
  correct_gender: string
  gender_options: string[]
}

export type QuizEntry = MeaningQuizEntry | GenderQuizEntry

export function isMeaningQuiz(entry: QuizEntry): entry is MeaningQuizEntry {
  return 'translations' in entry
}

export function isGenderQuiz(entry: QuizEntry): entry is GenderQuizEntry {
  return 'correct_gender' in entry
}

export type QuizInputMode = 'choice' | 'type'

export interface QuizQuestion {
  entry: MeaningQuizEntry
  prompt: string
  pronunciation: string
  choices: string[]
  correctAnswer: string
  /** Alphabet drills type the character; others pick a meaning. */
  inputMode?: QuizInputMode
}
