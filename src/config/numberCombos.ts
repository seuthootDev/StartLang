import type { LangCode, TargetLangCode } from '../types/language'
import type { MeaningQuizEntry } from '../types/vocab'

export type NumberSystemId = 'sino' | 'native'

const COMBO_COUNT = 5

const DIGIT_TRANSLATIONS = (n: number): Partial<Record<LangCode, string>> => {
  const s = String(n)
  return {
    en: s,
    ko: s,
    ja: s,
    zh: s,
    fr: s,
    es: s,
    de: s,
    it: s,
    ru: s,
  }
}

const KO_SINO_ONES = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'] as const
const KO_NATIVE_ONES = [
  '',
  '하나',
  '둘',
  '셋',
  '넷',
  '다섯',
  '여섯',
  '일곱',
  '여덟',
  '아홉',
] as const
const KO_NATIVE_TENS: Record<number, string> = {
  10: '열',
  20: '스물',
  30: '서른',
  40: '마흔',
  50: '쉰',
  60: '예순',
  70: '일흔',
  80: '여든',
  90: '아흔',
}

const JA_SINO_ONES = [
  '',
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
] as const
const JA_SINO_ONES_READ = [
  '',
  'ichi',
  'ni',
  'san',
  'yon',
  'go',
  'roku',
  'nana',
  'hachi',
  'kyuu',
] as const
const JA_SINO_ONES_KO = [
  '',
  '이치',
  '니',
  '산',
  '욘',
  '고',
  '로쿠',
  '나나',
  '하치',
  '큐우',
] as const

function shuffleInPlace<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}

function pickDistinct(min: number, max: number, count: number, exclude: Set<number>): number[] {
  const pool: number[] = []
  for (let n = min; n <= max; n += 1) {
    if (!exclude.has(n)) pool.push(n)
  }
  return shuffleInPlace(pool).slice(0, count)
}

function koSinoWord(n: number): string {
  if (n < 10) return KO_SINO_ONES[n]
  if (n === 10) return '십'
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const tensPart = tens === 1 ? '십' : `${KO_SINO_ONES[tens]}십`
  return ones === 0 ? tensPart : `${tensPart}${KO_SINO_ONES[ones]}`
}

function koSinoReading(n: number): { en: string; ja: string; ko: string } {
  const map: Record<number, { en: string; ja: string }> = {
    1: { en: 'il', ja: 'イル' },
    2: { en: 'i', ja: 'イ' },
    3: { en: 'sam', ja: 'サム' },
    4: { en: 'sa', ja: 'サ' },
    5: { en: 'o', ja: 'オ' },
    6: { en: 'yuk', ja: 'ユク' },
    7: { en: 'chil', ja: 'チル' },
    8: { en: 'pal', ja: 'パル' },
    9: { en: 'gu', ja: 'ク' },
    10: { en: 'sip', ja: 'シプ' },
  }
  if (n <= 10) {
    const m = map[n]
    return { en: m.en, ja: m.ja, ko: koSinoWord(n) }
  }
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const tenRead =
    tens === 1 ? 'sip' : `${map[tens].en}-sip`
  const tenJa =
    tens === 1 ? 'シプ' : `${map[tens].ja}シプ`
  if (ones === 0) return { en: tenRead, ja: tenJa, ko: koSinoWord(n) }
  return {
    en: `${tenRead}-${map[ones].en}`,
    ja: `${tenJa}${map[ones].ja}`,
    ko: koSinoWord(n),
  }
}

function koNativeWord(n: number): string {
  if (n < 10) return KO_NATIVE_ONES[n]
  if (n === 10) return '열'
  if (n % 10 === 0) return KO_NATIVE_TENS[n]
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  return `${KO_NATIVE_TENS[tens]}${KO_NATIVE_ONES[ones]}`
}

function koNativeReading(n: number): { en: string; ja: string; ko: string } {
  const onesEn = [
    '',
    'ha-na',
    'dul',
    'set',
    'net',
    'da-seot',
    'yeo-seot',
    'il-gop',
    'yeo-deol',
    'a-hop',
  ]
  const onesJa = [
    '',
    'ハナ',
    'ドゥル',
    'セッ',
    'ネッ',
    'ダソッ',
    'ヨソッ',
    'イルゴプ',
    'ヨドル',
    'アホプ',
  ]
  const tensEn: Record<number, string> = {
    10: 'yeol',
    20: 'seu-mul',
    30: 'seo-reun',
    40: 'ma-heun',
    50: 'swin',
    60: 'ye-sun',
    70: 'il-heun',
    80: 'yeo-deun',
    90: 'a-heun',
  }
  const tensJa: Record<number, string> = {
    10: 'ヨル',
    20: 'スムル',
    30: 'ソルン',
    40: 'マフン',
    50: 'スィン',
    60: 'イェスン',
    70: 'イルフン',
    80: 'ヨドゥン',
    90: 'アフン',
  }
  if (n < 10) {
    return { en: onesEn[n], ja: onesJa[n], ko: KO_NATIVE_ONES[n] }
  }
  if (n === 10 || n % 10 === 0) {
    return { en: tensEn[n], ja: tensJa[n], ko: KO_NATIVE_TENS[n] }
  }
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  return {
    en: `${tensEn[tens]}-${onesEn[ones]}`,
    ja: `${tensJa[tens]}${onesJa[ones]}`,
    ko: koNativeWord(n),
  }
}

function jaSinoWord(n: number): string {
  if (n < 10) return JA_SINO_ONES[n]
  if (n === 10) return '十'
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const tensPart = tens === 1 ? '十' : `${JA_SINO_ONES[tens]}十`
  return ones === 0 ? tensPart : `${tensPart}${JA_SINO_ONES[ones]}`
}

function jaSinoReading(n: number): { en: string; ko: string; ja: string } {
  if (n < 10) {
    return {
      en: JA_SINO_ONES_READ[n],
      ko: JA_SINO_ONES_KO[n],
      ja: JA_SINO_ONES_READ[n],
    }
  }
  if (n === 10) return { en: 'juu', ko: '주우', ja: 'じゅう' }
  const tens = Math.floor(n / 10)
  const ones = n % 10
  const tenEn = tens === 1 ? 'juu' : `${JA_SINO_ONES_READ[tens]}-juu`
  const tenKo = tens === 1 ? '주우' : `${JA_SINO_ONES_KO[tens]}주우`
  if (ones === 0) {
    return {
      en: tenEn,
      ko: tenKo,
      ja: tens === 1 ? 'じゅう' : `${toJaKanaHint(tens)}じゅう`,
    }
  }
  return {
    en: `${tenEn}-${JA_SINO_ONES_READ[ones]}`,
    ko: `${tenKo}${JA_SINO_ONES_KO[ones]}`,
    ja: `${tens === 1 ? 'じゅう' : `${toJaKanaHint(tens)}じゅう`}${toJaKanaHint(ones)}`,
  }
}

function toJaKanaHint(ones: number): string {
  const map = [
    '',
    'いち',
    'に',
    'さん',
    'よん',
    'ご',
    'ろく',
    'なな',
    'はち',
    'きゅう',
  ]
  return map[ones]
}

/** Nominative masculine forms used for compounds (один / два). */
const RU_ONES = [
  '',
  'один',
  'два',
  'три',
  'четыре',
  'пять',
  'шесть',
  'семь',
  'восемь',
  'девять',
] as const
const RU_ONES_EN = [
  '',
  'o-din',
  'dva',
  'tri',
  'che-ty-re',
  'pyatʹ',
  'shestʹ',
  'semʹ',
  'vo-semʹ',
  'de-vyatʹ',
] as const
const RU_ONES_KO = [
  '',
  '아딘',
  '드바',
  '트리',
  '치티레',
  '퍄찌',
  '셰스찌',
  '셈',
  '바셈',
  '제뱌찌',
] as const
const RU_ONES_JA = [
  '',
  'アヂン',
  'ドヴァ',
  'トリ',
  'チティレ',
  'ピャチ',
  'シェスチ',
  'セミ',
  'ヴォセミ',
  'ヂェヴャチ',
] as const
const RU_TENS: Record<number, { form: string; en: string; ko: string; ja: string }> = {
  20: { form: 'двадцать', en: 'dva-tsatʹ', ko: '드바찻', ja: 'ドヴァーツァチ' },
  30: { form: 'тридцать', en: 'tri-tsatʹ', ko: '트리찻', ja: 'トリーツァチ' },
  40: { form: 'сорок', en: 'so-rok', ko: '소록', ja: 'ソーラク' },
  50: { form: 'пятьдесят', en: 'pyatʹ-de-syat', ko: '퍄찌젯샷', ja: 'ピャチヂェシャト' },
  60: { form: 'шестьдесят', en: 'shestʹ-de-syat', ko: '셰스찌젯샷', ja: 'シェスチヂェシャト' },
  70: { form: 'семьдесят', en: 'semʹ-de-syat', ko: '셈젯샷', ja: 'セミヂェシャト' },
  80: { form: 'восемьдесят', en: 'vo-semʹ-de-syat', ko: '바셈젯샷', ja: 'ヴォセミヂェシャト' },
  90: { form: 'девяносто', en: 'de-vya-no-sto', ko: '제뱌노스토', ja: 'ヂェヴャノースト' },
}

const RU_COMBO_COUNT = 8

function ruCompoundWord(n: number): string {
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  return `${RU_TENS[tens].form} ${RU_ONES[ones]}`
}

function ruCompoundReading(n: number): { en: string; ko: string; ja: string } {
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  const t = RU_TENS[tens]
  return {
    en: `${t.en} ${RU_ONES_EN[ones]}`,
    ko: `${t.ko} ${RU_ONES_KO[ones]}`,
    ja: `${t.ja} ${RU_ONES_JA[ones]}`,
  }
}

/** French 1–19 building blocks for 21–99 compounds. */
const FR_ONES = [
  '',
  'un',
  'deux',
  'trois',
  'quatre',
  'cinq',
  'six',
  'sept',
  'huit',
  'neuf',
] as const
const FR_ONES_EN = [
  '',
  'uhn',
  'duh',
  'trwah',
  'katr',
  'sank',
  'sees',
  'set',
  'weet',
  'nuhf',
] as const
const FR_ONES_KO = [
  '',
  '앙',
  '되',
  '트와',
  '카트르',
  '생크',
  '시스',
  '세트',
  '위트',
  '뇌프',
] as const
const FR_ONES_JA = [
  '',
  'アン',
  'ドゥ',
  'トロワ',
  'キャトル',
  'サンク',
  'シス',
  'セット',
  'ユイット',
  'ヌフ',
] as const
const FR_TEENS: Record<number, { form: string; en: string; ko: string; ja: string }> = {
  10: { form: 'dix', en: 'dees', ko: '디스', ja: 'ディス' },
  11: { form: 'onze', en: 'onz', ko: '온즈', ja: 'オンズ' },
  12: { form: 'douze', en: 'dooz', ko: '두즈', ja: 'ドゥーズ' },
  13: { form: 'treize', en: 'trez', ko: '트레즈', ja: 'トレーズ' },
  14: { form: 'quatorze', en: 'ka-torz', ko: '카토르즈', ja: 'カトルズ' },
  15: { form: 'quinze', en: 'kanz', ko: '캥즈', ja: 'キャンズ' },
  16: { form: 'seize', en: 'sez', ko: '세즈', ja: 'セーズ' },
  17: { form: 'dix-sept', en: 'dees-set', ko: '디스세트', ja: 'ディスセット' },
  18: { form: 'dix-huit', en: 'deez-weet', ko: '디즈위트', ja: 'ディズユイット' },
  19: { form: 'dix-neuf', en: 'deez-nuhf', ko: '디즈뇌프', ja: 'ディズヌフ' },
}
const FR_TENS_BASE: Record<number, { form: string; en: string; ko: string; ja: string }> = {
  20: { form: 'vingt', en: 'van', ko: '뱅', ja: 'ヴァン' },
  30: { form: 'trente', en: 'tront', ko: '트랑트', ja: 'トラント' },
  40: { form: 'quarante', en: 'ka-ront', ko: '카랑트', ja: 'キャラント' },
  50: { form: 'cinquante', en: 'san-kont', ko: '생캉트', ja: 'サンカント' },
  60: { form: 'soixante', en: 'swa-sont', ko: '수아상트', ja: 'ソワサント' },
}

const FR_COMBO_COUNT = 8

function frUnitReading(unit: number): { form: string; en: string; ko: string; ja: string } {
  if (unit >= 10) return FR_TEENS[unit]
  return {
    form: FR_ONES[unit],
    en: FR_ONES_EN[unit],
    ko: FR_ONES_KO[unit],
    ja: FR_ONES_JA[unit],
  }
}

function frCompoundWord(n: number): string {
  if (n >= 80) {
    const rest = n - 80
    if (rest === 0) return 'quatre-vingts'
    const u = frUnitReading(rest)
    return `quatre-vingt-${u.form}`
  }
  if (n >= 70) {
    const rest = n - 60
    if (rest === 11) return 'soixante et onze'
    const u = frUnitReading(rest)
    return `soixante-${u.form}`
  }
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  const t = FR_TENS_BASE[tens]
  if (ones === 1) return `${t.form} et un`
  return `${t.form}-${FR_ONES[ones]}`
}

function frCompoundReading(n: number): { en: string; ko: string; ja: string } {
  if (n >= 80) {
    const rest = n - 80
    if (rest === 0) {
      return { en: 'katr-van', ko: '카트르뱅', ja: 'キャトルヴァン' }
    }
    const u = frUnitReading(rest)
    return {
      en: `katr-van-${u.en}`,
      ko: `카트르뱅-${u.ko}`,
      ja: `キャトルヴァン-${u.ja}`,
    }
  }
  if (n >= 70) {
    const rest = n - 60
    if (rest === 11) {
      return {
        en: 'swa-sont e onz',
        ko: '수아상트 에 온즈',
        ja: 'ソワサント・エ・オンズ',
      }
    }
    const u = frUnitReading(rest)
    return {
      en: `swa-sont-${u.en}`,
      ko: `수아상트-${u.ko}`,
      ja: `ソワサント-${u.ja}`,
    }
  }
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  const t = FR_TENS_BASE[tens]
  if (ones === 1) {
    return {
      en: `${t.en} e uhn`,
      ko: `${t.ko} 에 앙`,
      ja: `${t.ja}・エ・アン`,
    }
  }
  return {
    en: `${t.en}-${FR_ONES_EN[ones]}`,
    ko: `${t.ko}-${FR_ONES_KO[ones]}`,
    ja: `${t.ja}-${FR_ONES_JA[ones]}`,
  }
}

/** Spanish compounds: 21–29 one word; 30–99 = tens + y + ones. */
const ES_ONES = [
  '',
  'uno',
  'dos',
  'tres',
  'cuatro',
  'cinco',
  'seis',
  'siete',
  'ocho',
  'nueve',
] as const
const ES_ONES_EN = [
  '',
  'oo-no',
  'dos',
  'tres',
  'kwa-tro',
  'seen-ko',
  'says',
  'sye-te',
  'o-cho',
  'nwe-ve',
] as const
const ES_ONES_KO = [
  '',
  '우노',
  '도스',
  '트레스',
  '쿠아트로',
  '싱코',
  '세이스',
  '시에테',
  '오초',
  '누에베',
] as const
const ES_ONES_JA = [
  '',
  'ウノ',
  'ドス',
  'トレス',
  'クアトロ',
  'シンコ',
  'セイス',
  'シエテ',
  'オチョ',
  'ヌエベ',
] as const
const ES_TEENS_21: Record<number, { form: string; en: string; ko: string; ja: string }> = {
  21: { form: 'veintiuno', en: 'bayn-tee-oo-no', ko: '베인티우노', ja: 'ベインティウノ' },
  22: { form: 'veintidós', en: 'bayn-tee-dos', ko: '베인티도스', ja: 'ベインティドス' },
  23: { form: 'veintitrés', en: 'bayn-tee-tres', ko: '베인티트레스', ja: 'ベインティトレス' },
  24: { form: 'veinticuatro', en: 'bayn-tee-kwa-tro', ko: '베인티쿠아트로', ja: 'ベインティクアトロ' },
  25: { form: 'veinticinco', en: 'bayn-tee-seen-ko', ko: '베인티싱코', ja: 'ベインティシンコ' },
  26: { form: 'veintiséis', en: 'bayn-tee-says', ko: '베인티세이스', ja: 'ベインティセイス' },
  27: { form: 'veintisiete', en: 'bayn-tee-sye-te', ko: '베인티시에테', ja: 'ベインティシエテ' },
  28: { form: 'veintiocho', en: 'bayn-tee-o-cho', ko: '베인티오초', ja: 'ベインティオチョ' },
  29: { form: 'veintinueve', en: 'bayn-tee-nwe-ve', ko: '베인티누에베', ja: 'ベインティヌエベ' },
}
const ES_TENS: Record<number, { form: string; en: string; ko: string; ja: string }> = {
  30: { form: 'treinta', en: 'trayn-ta', ko: '트레인트아', ja: 'トレインタ' },
  40: { form: 'cuarenta', en: 'kwa-ren-ta', ko: '쿠아렌타', ja: 'クアレンタ' },
  50: { form: 'cincuenta', en: 'seen-kwen-ta', ko: '싱쿠엔타', ja: 'シンクエンタ' },
  60: { form: 'sesenta', en: 'se-sen-ta', ko: '세센타', ja: 'セセンタ' },
  70: { form: 'setenta', en: 'se-ten-ta', ko: '세텐타', ja: 'セテンタ' },
  80: { form: 'ochenta', en: 'o-chen-ta', ko: '오첸타', ja: 'オチェンタ' },
  90: { form: 'noventa', en: 'no-ven-ta', ko: '노벤타', ja: 'ノベンタ' },
}

const ES_COMBO_COUNT = 8

function esCompoundWord(n: number): string {
  if (n >= 21 && n <= 29) return ES_TEENS_21[n].form
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  return `${ES_TENS[tens].form} y ${ES_ONES[ones]}`
}

function esCompoundReading(n: number): { en: string; ko: string; ja: string } {
  if (n >= 21 && n <= 29) {
    const t = ES_TEENS_21[n]
    return { en: t.en, ko: t.ko, ja: t.ja }
  }
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  const t = ES_TENS[tens]
  return {
    en: `${t.en} ee ${ES_ONES_EN[ones]}`,
    ko: `${t.ko} 이 ${ES_ONES_KO[ones]}`,
    ja: `${t.ja}・イ・${ES_ONES_JA[ones]}`,
  }
}

/** Italian compounds: one word; drop tens vowel before 1 and 8; -tré accented. */
const IT_ONES = [
  '',
  'uno',
  'due',
  'tré',
  'quattro',
  'cinque',
  'sei',
  'sette',
  'otto',
  'nove',
] as const
const IT_ONES_EN = [
  '',
  'oo-no',
  'doo-e',
  'tre',
  'kwa-tro',
  'chin-kwe',
  'say',
  'set-te',
  'ot-to',
  'no-ve',
] as const
const IT_ONES_KO = [
  '',
  '우노',
  '두에',
  '트레',
  '쿠아트로',
  '칭퀘',
  '세이',
  '세테',
  '오토',
  '노베',
] as const
const IT_ONES_JA = [
  '',
  'ウノ',
  'ドゥエ',
  'トレ',
  'クアトロ',
  'チンクェ',
  'セイ',
  'セッテ',
  'オット',
  'ノヴェ',
] as const
const IT_TENS: Record<number, { form: string; en: string; ko: string; ja: string }> = {
  20: { form: 'venti', en: 'ven-tee', ko: '벤티', ja: 'ヴェンティ' },
  30: { form: 'trenta', en: 'tren-ta', ko: '트렌타', ja: 'トレンタ' },
  40: { form: 'quaranta', en: 'kwa-ran-ta', ko: '쿠아란타', ja: 'クアランタ' },
  50: { form: 'cinquanta', en: 'chin-kwan-ta', ko: '칭콴타', ja: 'チンクワンタ' },
  60: { form: 'sessanta', en: 'ses-san-ta', ko: '세산타', ja: 'セッサンタ' },
  70: { form: 'settanta', en: 'set-tan-ta', ko: '세탄타', ja: 'セッタンタ' },
  80: { form: 'ottanta', en: 'ot-tan-ta', ko: '오탄타', ja: 'オッタンタ' },
  90: { form: 'novanta', en: 'no-van-ta', ko: '노반타', ja: 'ノヴァンタ' },
}

const IT_COMBO_COUNT = 8

function itTensStem(tens: number, ones: number): string {
  const base = IT_TENS[tens].form
  // Drop final vowel before uno / otto.
  if (ones === 1 || ones === 8) return base.slice(0, -1)
  return base
}

function itCompoundWord(n: number): string {
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  return `${itTensStem(tens, ones)}${IT_ONES[ones]}`
}

function itCompoundReading(n: number): { en: string; ko: string; ja: string } {
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  const t = IT_TENS[tens]
  const enStem =
    ones === 1 || ones === 8
      ? t.en.replace(/-(tee|ta)$/, 't').replace(/(tee|ta)$/, 't')
      : t.en
  const koStem =
    ones === 1 || ones === 8 ? t.ko.replace(/티$|타$/, '트') : t.ko
  const jaStem =
    ones === 1 || ones === 8
      ? t.ja.replace(/ティ$|タ$/, 'ト')
      : t.ja
  return {
    en: `${enStem}-${IT_ONES_EN[ones]}`,
    ko: `${koStem}${IT_ONES_KO[ones]}`,
    ja: `${jaStem}${IT_ONES_JA[ones]}`,
  }
}

/** German compounds: ones + und + tens (einundzwanzig). */
const DE_ONES = [
  '',
  'ein',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sechs',
  'sieben',
  'acht',
  'neun',
] as const
const DE_ONES_EN = [
  '',
  'ain',
  'tsvai',
  'dry',
  'feer',
  'fuenf',
  'zex',
  'zee-ben',
  'akht',
  'noyn',
] as const
const DE_ONES_KO = [
  '',
  '아인',
  '츠바이',
  '드라이',
  '피어',
  '픈프',
  '젝스',
  '지벤',
  '아흐트',
  '노인',
] as const
const DE_ONES_JA = [
  '',
  'アイン',
  'ツヴァイ',
  'ドライ',
  'フィーア',
  'フンフ',
  'ゼクス',
  'ジーベン',
  'アハト',
  'ノイン',
] as const
const DE_TENS: Record<number, { form: string; en: string; ko: string; ja: string }> = {
  20: { form: 'zwanzig', en: 'tsvun-tsikh', ko: '츠반치히', ja: 'ツヴァンツィヒ' },
  30: { form: 'dreißig', en: 'dry-sikh', ko: '드라이시히', ja: 'ドライシヒ' },
  40: { form: 'vierzig', en: 'feer-tsikh', ko: '피어치히', ja: 'フィーアツィヒ' },
  50: { form: 'fünfzig', en: 'fuenf-tsikh', ko: '픈프치히', ja: 'フンフツィヒ' },
  60: { form: 'sechzig', en: 'zekh-tsikh', ko: '제흐치히', ja: 'ゼヒツィヒ' },
  70: { form: 'siebzig', en: 'zeep-tsikh', ko: '집치히', ja: 'ジープツィヒ' },
  80: { form: 'achtzig', en: 'akht-tsikh', ko: '아흐트치히', ja: 'アハツィヒ' },
  90: { form: 'neunzig', en: 'noyn-tsikh', ko: '노인치히', ja: 'ノインツィヒ' },
}

const DE_COMBO_COUNT = 8

function deCompoundWord(n: number): string {
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  return `${DE_ONES[ones]}und${DE_TENS[tens].form}`
}

function deCompoundReading(n: number): { en: string; ko: string; ja: string } {
  const tens = Math.floor(n / 10) * 10
  const ones = n % 10
  const t = DE_TENS[tens]
  return {
    en: `${DE_ONES_EN[ones]}-oont-${t.en}`,
    ko: `${DE_ONES_KO[ones]}운트${t.ko}`,
    ja: `${DE_ONES_JA[ones]}ウント${t.ja}`,
  }
}

function makeEntry(
  quizId: string,
  word: string,
  n: number,
  reading: { en: string; ko?: string; ja?: string },
): MeaningQuizEntry {
  return {
    quiz_id: quizId,
    question_word: word,
    pronunciations: {
      en: reading.en,
      ko: reading.ko ?? reading.en,
      ja: reading.ja ?? reading.en,
      zh: reading.en,
      fr: reading.en,
      es: reading.en,
      de: reading.en,
      it: reading.en,
      ru: reading.en,
    },
    translations: DIGIT_TRANSLATIONS(n),
  }
}

/** Random compound numbers built from the language’s number system. */
export function generateNumberComboEntries(
  targetLang: TargetLangCode,
  system: NumberSystemId,
  count = COMBO_COUNT,
): MeaningQuizEntry[] {
  // Japanese native counters (ひとつ…) do not compose past 10.
  if (targetLang === 'ja' && system === 'native') return []

  if (targetLang === 'ru') {
    // Teens + round tens are in the base list; practice spaced 21–99 compounds.
    const comboCount = count === COMBO_COUNT ? RU_COMBO_COUNT : count
    const candidates = pickDistinct(21, 99, comboCount * 4, new Set()).filter(
      (n) => n % 10 !== 0,
    )
    const chosen = candidates.slice(0, comboCount)
    while (chosen.length < comboCount) {
      const n = 21 + Math.floor(Math.random() * 79)
      if (n % 10 === 0 || chosen.includes(n)) continue
      chosen.push(n)
    }
    return chosen.map((n) =>
      makeEntry(
        `ru_numbers_combo_${n}`,
        ruCompoundWord(n),
        n,
        ruCompoundReading(n),
      ),
    )
  }

  if (targetLang === 'fr') {
    const comboCount = count === COMBO_COUNT ? FR_COMBO_COUNT : count
    const candidates = pickDistinct(21, 99, comboCount * 4, new Set()).filter(
      (n) => n % 10 !== 0,
    )
    const chosen = candidates.slice(0, comboCount)
    while (chosen.length < comboCount) {
      const n = 21 + Math.floor(Math.random() * 79)
      if (n % 10 === 0 || chosen.includes(n)) continue
      chosen.push(n)
    }
    return chosen.map((n) =>
      makeEntry(
        `fr_numbers_combo_${n}`,
        frCompoundWord(n),
        n,
        frCompoundReading(n),
      ),
    )
  }

  if (targetLang === 'es') {
    const comboCount = count === COMBO_COUNT ? ES_COMBO_COUNT : count
    const candidates = pickDistinct(21, 99, comboCount * 4, new Set()).filter(
      (n) => n % 10 !== 0,
    )
    const chosen = candidates.slice(0, comboCount)
    while (chosen.length < comboCount) {
      const n = 21 + Math.floor(Math.random() * 79)
      if (n % 10 === 0 || chosen.includes(n)) continue
      chosen.push(n)
    }
    return chosen.map((n) =>
      makeEntry(
        `es_numbers_combo_${n}`,
        esCompoundWord(n),
        n,
        esCompoundReading(n),
      ),
    )
  }

  if (targetLang === 'it') {
    const comboCount = count === COMBO_COUNT ? IT_COMBO_COUNT : count
    const candidates = pickDistinct(21, 99, comboCount * 4, new Set()).filter(
      (n) => n % 10 !== 0,
    )
    const chosen = candidates.slice(0, comboCount)
    while (chosen.length < comboCount) {
      const n = 21 + Math.floor(Math.random() * 79)
      if (n % 10 === 0 || chosen.includes(n)) continue
      chosen.push(n)
    }
    return chosen.map((n) =>
      makeEntry(
        `it_numbers_combo_${n}`,
        itCompoundWord(n),
        n,
        itCompoundReading(n),
      ),
    )
  }

  if (targetLang === 'de') {
    const comboCount = count === COMBO_COUNT ? DE_COMBO_COUNT : count
    const candidates = pickDistinct(21, 99, comboCount * 4, new Set()).filter(
      (n) => n % 10 !== 0,
    )
    const chosen = candidates.slice(0, comboCount)
    while (chosen.length < comboCount) {
      const n = 21 + Math.floor(Math.random() * 79)
      if (n % 10 === 0 || chosen.includes(n)) continue
      chosen.push(n)
    }
    return chosen.map((n) =>
      makeEntry(
        `de_numbers_combo_${n}`,
        deCompoundWord(n),
        n,
        deCompoundReading(n),
      ),
    )
  }

  // Unknown targets: do not invent Japanese Sino forms.
  if (targetLang !== 'ko' && targetLang !== 'ja') return []

  const exclude = new Set<number>()
  // Prefer non-round teens/compounds for practice.
  const candidates = pickDistinct(11, 99, count * 4, exclude).filter(
    (n) => n % 10 !== 0,
  )
  const chosen = candidates.slice(0, count)
  // Fallback if filter too aggressive
  while (chosen.length < count) {
    const n = 11 + Math.floor(Math.random() * 89)
    if (n % 10 === 0 || chosen.includes(n)) continue
    chosen.push(n)
  }

  return chosen.map((n) => {
    if (targetLang === 'ko' && system === 'sino') {
      const reading = koSinoReading(n)
      return makeEntry(
        `ko_numbers_sino_combo_${n}`,
        koSinoWord(n),
        n,
        reading,
      )
    }
    if (targetLang === 'ko' && system === 'native') {
      const reading = koNativeReading(n)
      return makeEntry(
        `ko_numbers_native_combo_${n}`,
        koNativeWord(n),
        n,
        reading,
      )
    }
    // ja sino
    const reading = jaSinoReading(n)
    return makeEntry(
      `ja_numbers_sino_combo_${n}`,
      jaSinoWord(n),
      n,
      reading,
    )
  })
}

export function filterNumberSystem(
  entries: MeaningQuizEntry[],
  system: NumberSystemId,
): MeaningQuizEntry[] {
  return entries.filter((entry) =>
    entry.quiz_id.includes(`_numbers_${system}_`),
  )
}
