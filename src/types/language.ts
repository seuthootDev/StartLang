/** ISO-like codes used across the app */
export type LangCode = 'ko' | 'zh' | 'ja' | 'fr' | 'es' | 'de' | 'it' | 'ru' | 'en'

export type TargetLangCode = Exclude<LangCode, 'en'>

export interface LanguageMeta {
  code: LangCode
  nativeName: string
  englishName: string
  /** Target languages available for learning right now */
  enabledAsTarget: boolean
  /** Can be selected as the learner's UI / meaning language */
  enabledAsLearner: boolean
}
