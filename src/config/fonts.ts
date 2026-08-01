import type { TargetLangCode } from '../types/language'

/** Quiz prompt / native-script display stacks (Western cultural cue per target). */
export const TARGET_PROMPT_FONTS: Record<TargetLangCode, string> = {
  ja: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
  ko: "'Gothic A1', 'Noto Sans KR', sans-serif",
  zh: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  fr: "'Cormorant Garamond', Georgia, serif",
  es: "'Nunito', 'Segoe UI', sans-serif",
  de: "'Space Grotesk', 'Helvetica Neue', sans-serif",
  it: "'Libre Baskerville', Georgia, serif",
  ru: "'PT Serif', Georgia, serif",
}

export function promptFontFor(target: TargetLangCode): string {
  return TARGET_PROMPT_FONTS[target]
}
