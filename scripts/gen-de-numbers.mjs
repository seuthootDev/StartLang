/**
 * Generate German cardinal number quiz + reference table.
 * Run: node scripts/gen-de-numbers.mjs
 *
 * German compounds invert English/Romance order: ones + und + tens
 * (einundzwanzig = 21).
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/de')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

/** @typedef {{ n: number, form: string, en: string, ko: string, ja: string }} NumRow */

/** @type {NumRow[]} */
const BASE = [
  { n: 0, form: 'null', en: 'nool/null', ko: '눌', ja: 'ヌル' },
  { n: 1, form: 'eins', en: 'aints/eins', ko: '아インス', ja: 'アインス' },
  { n: 2, form: 'zwei', en: 'tsvai/zwei', ko: '츠바이', ja: 'ツヴァイ' },
  { n: 3, form: 'drei', en: 'dry/drei', ko: '드라이', ja: 'ドライ' },
  { n: 4, form: 'vier', en: 'feer/vier', ko: '피어', ja: 'フィーア' },
  { n: 5, form: 'fünf', en: 'fuenf/fünf', ko: '픈프', ja: 'フンフ' },
  { n: 6, form: 'sechs', en: 'zex/sechs', ko: '젝스', ja: 'ゼクス' },
  { n: 7, form: 'sieben', en: 'zee-ben', ko: '지벤', ja: 'ジーベン' },
  { n: 8, form: 'acht', en: 'akht/acht', ko: '아흐트', ja: 'アハト' },
  { n: 9, form: 'neun', en: 'noyn/neun', ko: '노인', ja: 'ノイン' },
  { n: 10, form: 'zehn', en: 'tsayn/zehn', ko: '체인', ja: 'ツェーン' },
  { n: 11, form: 'elf', en: 'elf', ko: '엘프', ja: 'エルフ' },
  { n: 12, form: 'zwölf', en: 'tsvuhlf/zwölf', ko: '츠뵐프', ja: 'ツヴェルフ' },
  { n: 13, form: 'dreizehn', en: 'dry-tsayn', ko: '드라이체인', ja: 'ドライツェーン' },
  { n: 14, form: 'vierzehn', en: 'feer-tsayn', ko: '피어체인', ja: 'フィーアツェーン' },
  { n: 15, form: 'fünfzehn', en: 'fuenf-tsayn', ko: '픈프체인', ja: 'フンフツェーン' },
  { n: 16, form: 'sechzehn', en: 'zekh-tsayn', ko: '제흐체인', ja: 'ゼヒツェーン' },
  { n: 17, form: 'siebzehn', en: 'zeep-tsayn', ko: '집체인', ja: 'ジープツェーン' },
  { n: 18, form: 'achtzehn', en: 'akht-tsayn', ko: '아흐트체인', ja: 'アハツェーン' },
  { n: 19, form: 'neunzehn', en: 'noyn-tsayn', ko: '노인체인', ja: 'ノインツェーン' },
  { n: 20, form: 'zwanzig', en: 'tsvun-tsikh', ko: '츠반치히', ja: 'ツヴァンツィヒ' },
  { n: 30, form: 'dreißig', en: 'dry-sikh', ko: '드라이시히', ja: 'ドライシヒ' },
  { n: 40, form: 'vierzig', en: 'feer-tsikh', ko: '피어치히', ja: 'フィーアツィヒ' },
  { n: 50, form: 'fünfzig', en: 'fuenf-tsikh', ko: '픈프치히', ja: 'フンフツィヒ' },
  { n: 60, form: 'sechzig', en: 'zekh-tsikh', ko: '제흐치히', ja: 'ゼヒツィヒ' },
  { n: 70, form: 'siebzig', en: 'zeep-tsikh', ko: '집치히', ja: 'ジープツィヒ' },
  { n: 80, form: 'achtzig', en: 'akht-tsikh', ko: '아흐트치히', ja: 'アハツィヒ' },
  { n: 90, form: 'neunzig', en: 'noyn-tsikh', ko: '노인치히', ja: 'ノインツィヒ' },
  { n: 100, form: 'hundert', en: 'hoon-dert', ko: '훈데르트', ja: 'フンデルト' },
  { n: 200, form: 'zweihundert', en: 'tsvai-hoon-dert', ko: '츠바이훈데르트', ja: 'ツヴァイフンデルト' },
  { n: 300, form: 'dreihundert', en: 'dry-hoon-dert', ko: '드라이훈데르트', ja: 'ドライフンデルト' },
  { n: 400, form: 'vierhundert', en: 'feer-hoon-dert', ko: '피어훈데르트', ja: 'フィーアフンデルト' },
  { n: 500, form: 'fünfhundert', en: 'fuenf-hoon-dert', ko: '픈프훈데르트', ja: 'フンフフンデルト' },
  { n: 600, form: 'sechshundert', en: 'zex-hoon-dert', ko: '젝스훈데르트', ja: 'ゼクスフンデルト' },
  { n: 700, form: 'siebenhundert', en: 'zee-ben-hoon-dert', ko: '지벤훈데르트', ja: 'ジーベンフンデルト' },
  { n: 800, form: 'achthundert', en: 'akht-hoon-dert', ko: '아흐트훈데르트', ja: 'アハトフンデルト' },
  { n: 900, form: 'neunhundert', en: 'noyn-hoon-dert', ko: '노인훈데르트', ja: 'ノインフンデルト' },
  { n: 1000, form: 'tausend', en: 'tow-zent', ko: '타우젠트', ja: 'タウゼント' },
]

const DIGIT = (n) =>
  loc({
    en: String(n),
    ko: String(n),
    ja: String(n),
    zh: String(n),
    fr: String(n),
    es: String(n),
    de: String(n),
    ru: String(n),
  })

function sounds(row) {
  return loc({
    en: row.en,
    ko: row.ko,
    ja: row.ja,
    zh: row.en,
    fr: row.en,
    es: row.en,
    de: row.form,
    ru: row.en,
  })
}

function quizEntry(row) {
  return {
    quiz_id: `de_numbers_${row.n}`,
    question_word: row.form,
    pronunciations: sounds(row),
    translations: DIGIT(row.n),
  }
}

function tableRow(row) {
  return {
    form: row.form,
    meaning: DIGIT(row.n),
    sound: sounds(row),
  }
}

const FORM_COLS = [
  {
    key: 'form',
    labels: loc({
      en: 'German',
      ko: '독일어',
      ja: 'ドイツ語',
      zh: '德语',
      fr: 'Allemand',
      es: 'Alemán',
      de: 'Deutsch',
      ru: 'Немецкий',
      it: 'Tedesco',
    }),
  },
  {
    key: 'meaning',
    labels: loc({
      en: 'Meaning',
      ko: '의미',
      ja: '意味',
      zh: '意思',
      fr: 'Sens',
      es: 'Significado',
      de: 'Bedeutung',
      ru: 'Значение',
      it: 'Significato',
    }),
  },
  {
    key: 'sound',
    labels: loc({
      en: 'Sound',
      ko: '발음',
      ja: '読み',
      zh: '发音',
      fr: 'Prononciation',
      es: 'Pronunciación',
      de: 'Aussprache',
      ru: 'Произношение',
      it: 'Pronuncia',
    }),
  },
]

const byRange = (min, max) => BASE.filter((r) => r.n >= min && r.n <= max)
const tens = () => BASE.filter((r) => r.n >= 20 && r.n <= 90 && r.n % 10 === 0)
const hundreds = () => BASE.filter((r) => (r.n >= 100 && r.n <= 900) || r.n === 1000)

mkdirSync(OUT_DIR, { recursive: true })

const quiz = BASE.map(quizEntry)

const table = {
  table_id: 'de_numbers_ref',
  title: loc({
    en: 'Cardinal numbers',
    ko: '기수사',
    ja: '基数',
    zh: '基数词',
    fr: 'Nombres cardinaux',
    es: 'Números cardinales',
    de: 'Kardinalzahlen',
    ru: 'Количественные числительные',
    it: 'Numeri cardinali',
  }),
  note: loc({
    en: '0–12 mostly unique. From 21: ones + und + tens (einundzwanzig) — opposite of English/Romance order.',
    ko: '0–12 대체로 고유. 21부터: 일 + und + 십 (einundzwanzig) — 영어·로망스어와 반대 순서.',
    ja: '0–12はほぼ固有。21以降は一＋und＋十（einundzwanzig）— 英・ロマンス語と逆順。',
    zh: '0–12 多专名。从21起：个位 + und + 十位（einundzwanzig）— 与英／罗曼语顺序相反。',
    fr: '0–12 surtout uniques. Dès 21 : unité + und + dizaine (ordre inversé).',
    es: '0–12 casi propios. Desde 21: unidad + und + decena (orden invertido).',
    de: '0–12 meist eigen. Ab 21: Einer + und + Zehner (einundzwanzig).',
    ru: '0–12 в основном особые. С 21: единицы + und + десятки (обратный порядок).',
    it: '0–12 quasi unici. Dal 21: unità + und + decina (ordine invertito).',
  }),
  rules: {
    en: [
      'eins alone; in compounds use ein- (einundzwanzig). Before nouns: ein / eine (not a quiz topic yet).',
      '21–99: ones + und + tens as one word: zweiunddreißig.',
      'sechs → sech- in teens/tens (sechzehn, sechzig); sieben → sieb- (siebzehn, siebzig).',
      'dreißig keeps ß. Quiz adds random compounds.',
    ],
    ko: [
      '단독 eins; 합성에서는 ein- (einundzwanzig). 명사 앞 ein / eine는 나중에.',
      '21–99: 일 + und + 십을 한 단어로: zweiunddreißig.',
      'sechs → sech- (sechzehn, sechzig); sieben → sieb- (siebzehn, siebzig).',
      'dreißig는 ß. 퀴즈에 랜덤 합성 추가.',
    ],
    ja: [
      '単独は eins、合成は ein-。名詞の前の ein/eine は後で。',
      '21–99は一＋und＋十で一語。',
      'sechs→sech-、sieben→sieb-。',
      'dreißig は ß。クイズに合成あり。',
    ],
    zh: [
      '单独 eins；合成用 ein-。名词前 ein/eine 以后再学。',
      '21–99：个位 + und + 十位，连写。',
      'sechs→sech-；sieben→sieb-。',
      'dreißig 用 ß。测验含随机合成。',
    ],
    fr: [
      'eins seul ; en composé ein-. ein/eine devant nom plus tard.',
      '21–99 : unité + und + dizaine en un mot.',
      'sechs → sech- ; sieben → sieb-.',
      'dreißig avec ß. Quiz = composés aléatoires.',
    ],
    es: [
      'eins solo; en compuesto ein-. ein/eine ante nombre después.',
      '21–99: unidad + und + decena en una palabra.',
      'sechs → sech-; sieben → sieb-.',
      'dreißig con ß. Quiz con compuestos.',
    ],
    de: [
      'eins allein; in Zusammensetzungen ein-.',
      '21–99: Einer + und + Zehner in einem Wort.',
      'sechs → sech-; sieben → sieb-.',
      'dreißig mit ß. Quiz ergänzt Zufallsverbindungen.',
    ],
    ru: [
      'eins отдельно; в сложных — ein-.',
      '21–99: единицы + und + десятки одним словом.',
      'sechs → sech-; sieben → sieb-.',
      'dreißig с ß. В квизе — случайные составные.',
    ],
    it: [
      'eins da solo; nei composti ein-.',
      '21–99: unità + und + decina in una parola.',
      'sechs → sech-; sieben → sieb-.',
      'dreißig con ß. Il quiz aggiunge composti.',
    ],
  },
  sections: [
    {
      title: loc({
        en: '0–10',
        ko: '0–10',
        ja: '0–10',
        zh: '0–10',
        fr: '0–10',
        es: '0–10',
        de: '0–10',
        ru: '0–10',
        it: '0–10',
      }),
      columns: FORM_COLS,
      rows: byRange(0, 10).map(tableRow),
    },
    {
      title: loc({
        en: '11–19',
        ko: '11–19',
        ja: '11–19',
        zh: '11–19',
        fr: '11–19',
        es: '11–19',
        de: '11–19',
        ru: '11–19',
        it: '11–19',
      }),
      note: loc({
        en: 'elf / zwölf unique; 13–19 = ones + zehn (with sech-/sieb- shortenings).',
        ko: 'elf / zwölf 고유; 13–19 = 일 + zehn (sech-/sieb- 축약).',
        ja: 'elf／zwölf は固有。13–19は一＋zehn（sech-／sieb-）。',
        zh: 'elf／zwölf 专名；13–19 = 个位 + zehn（sech-／sieb-）。',
        fr: 'elf / zwölf uniques ; 13–19 = unités + zehn.',
        es: 'elf / zwölf propios; 13–19 = unidades + zehn.',
        de: 'elf / zwölf eigen; 13–19 = Einer + zehn.',
        ru: 'elf / zwölf особые; 13–19 = единицы + zehn.',
        it: 'elf / zwölf unici; 13–19 = unità + zehn.',
      }),
      columns: FORM_COLS,
      rows: byRange(11, 19).map(tableRow),
    },
    {
      title: loc({
        en: 'Tens',
        ko: '십 단위',
        ja: '十の位',
        zh: '整十',
        fr: 'Dizaines',
        es: 'Decenas',
        de: 'Zehner',
        ru: 'Десятки',
        it: 'Decine',
      }),
      columns: FORM_COLS,
      rows: tens().map(tableRow),
    },
    {
      title: loc({
        en: 'Hundreds & 1000',
        ko: '백·천',
        ja: '百・千',
        zh: '百与千',
        fr: 'Centaines & 1000',
        es: 'Centenas y 1000',
        de: 'Hunderter & 1000',
        ru: 'Сотни и 1000',
        it: 'Centinaia e 1000',
      }),
      note: loc({
        en: 'hundert / einhundert both OK for 100. tausend / eintausend for 1000.',
        ko: '100은 hundert / einhundert 모두 가능. 1000은 tausend / eintausend.',
        ja: '100は hundert／einhundert。1000は tausend／eintausend。',
        zh: '100 可用 hundert／einhundert；1000 可用 tausend／eintausend。',
        fr: 'hundert / einhundert ; tausend / eintausend.',
        es: 'hundert / einhundert; tausend / eintausend.',
        de: 'hundert / einhundert; tausend / eintausend.',
        ru: 'hundert / einhundert; tausend / eintausend.',
        it: 'hundert / einhundert; tausend / eintausend.',
      }),
      columns: FORM_COLS,
      rows: hundreds().map(tableRow),
    },
  ],
}

writeFileSync(join(OUT_DIR, 'numbers.json'), `${JSON.stringify(quiz, null, 2)}\n`)
writeFileSync(join(OUT_DIR, 'numbers.table.json'), `${JSON.stringify(table, null, 2)}\n`)
console.log(`de numbers ok — ${quiz.length} cards`)
