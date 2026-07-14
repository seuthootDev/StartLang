import type { LangCode, LanguageMeta, TargetLangCode } from '../types/language'

export const LANGUAGES: LanguageMeta[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', enabledAsTarget: false, enabledAsLearner: true },
  { code: 'ko', nativeName: '한국어', englishName: 'Korean', enabledAsTarget: true, enabledAsLearner: true },
  { code: 'ja', nativeName: '日本語', englishName: 'Japanese', enabledAsTarget: true, enabledAsLearner: true },
  { code: 'zh', nativeName: '中文', englishName: 'Chinese', enabledAsTarget: false, enabledAsLearner: true },
  { code: 'fr', nativeName: 'Français', englishName: 'French', enabledAsTarget: false, enabledAsLearner: true },
  { code: 'es', nativeName: 'Español', englishName: 'Spanish', enabledAsTarget: false, enabledAsLearner: true },
  { code: 'de', nativeName: 'Deutsch', englishName: 'German', enabledAsTarget: false, enabledAsLearner: true },
  { code: 'ru', nativeName: 'Русский', englishName: 'Russian', enabledAsTarget: false, enabledAsLearner: true },
]

/** All planned learning targets (enabled + coming soon) */
export const TARGET_LANGUAGES: LanguageMeta[] = LANGUAGES.filter((l) => l.code !== 'en')

export const LEARNER_LANGUAGES: LanguageMeta[] = LANGUAGES.filter((l) => l.enabledAsLearner)

export function getLanguage(code: LangCode): LanguageMeta | undefined {
  return LANGUAGES.find((l) => l.code === code)
}

export function isTargetLang(code: string): code is TargetLangCode {
  return TARGET_LANGUAGES.some((l) => l.code === code)
}

export function isLearnerLang(code: string): code is LangCode {
  return LEARNER_LANGUAGES.some((l) => l.code === code)
}
