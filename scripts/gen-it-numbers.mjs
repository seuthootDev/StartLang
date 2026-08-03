/**
 * Generate Italian cardinal number quiz + reference table.
 * Run: node scripts/gen-it-numbers.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/it')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

/** @typedef {{ n: number, form: string, en: string, ko: string, ja: string }} NumRow */

/** @type {NumRow[]} */
const BASE = [
  { n: 0, form: 'zero', en: 'dze-ro/zero', ko: '제로', ja: 'ゼロ' },
  { n: 1, form: 'uno', en: 'oo-no/uno', ko: '우노', ja: 'ウノ' },
  { n: 2, form: 'due', en: 'doo-e/due', ko: '두에', ja: 'ドゥエ' },
  { n: 3, form: 'tre', en: 'tre', ko: '트레', ja: 'トレ' },
  { n: 4, form: 'quattro', en: 'kwa-tro', ko: '쿠아트로', ja: 'クアトロ' },
  { n: 5, form: 'cinque', en: 'chin-kwe', ko: '칭퀘', ja: 'チンクェ' },
  { n: 6, form: 'sei', en: 'say/sei', ko: '세이', ja: 'セイ' },
  { n: 7, form: 'sette', en: 'set-te', ko: '세테', ja: 'セッテ' },
  { n: 8, form: 'otto', en: 'ot-to', ko: '오토', ja: 'オット' },
  { n: 9, form: 'nove', en: 'no-ve', ko: '노베', ja: 'ノヴェ' },
  { n: 10, form: 'dieci', en: 'dye-chee', ko: '디에치', ja: 'ディエチ' },
  { n: 11, form: 'undici', en: 'oon-dee-chee', ko: '운디치', ja: 'ウンディチ' },
  { n: 12, form: 'dodici', en: 'do-dee-chee', ko: '도디치', ja: 'ドディチ' },
  { n: 13, form: 'tredici', en: 'tre-dee-chee', ko: '트레디치', ja: 'トレディチ' },
  { n: 14, form: 'quattordici', en: 'kwa-tor-dee-chee', ko: '쿠아토르디치', ja: 'クアトルディチ' },
  { n: 15, form: 'quindici', en: 'kween-dee-chee', ko: '퀸디치', ja: 'クインディチ' },
  { n: 16, form: 'sedici', en: 'se-dee-chee', ko: '세디치', ja: 'セディチ' },
  { n: 17, form: 'diciassette', en: 'dee-cha-set-te', ko: '디차세테', ja: 'ディチャセッテ' },
  { n: 18, form: 'diciotto', en: 'dee-chot-to', ko: '디초토', ja: 'ディチョット' },
  { n: 19, form: 'diciannove', en: 'dee-cha-no-ve', ko: '디차노베', ja: 'ディチャノヴェ' },
  { n: 20, form: 'venti', en: 'ven-tee', ko: '벤티', ja: 'ヴェンティ' },
  { n: 30, form: 'trenta', en: 'tren-ta', ko: '트렌타', ja: 'トレンタ' },
  { n: 40, form: 'quaranta', en: 'kwa-ran-ta', ko: '쿠아란타', ja: 'クアランタ' },
  { n: 50, form: 'cinquanta', en: 'chin-kwan-ta', ko: '칭콴타', ja: 'チンクワンタ' },
  { n: 60, form: 'sessanta', en: 'ses-san-ta', ko: '세산타', ja: 'セッサンタ' },
  { n: 70, form: 'settanta', en: 'set-tan-ta', ko: '세탄타', ja: 'セッタンタ' },
  { n: 80, form: 'ottanta', en: 'ot-tan-ta', ko: '오탄타', ja: 'オッタンタ' },
  { n: 90, form: 'novanta', en: 'no-van-ta', ko: '노반타', ja: 'ノヴァンタ' },
  { n: 100, form: 'cento', en: 'chen-to', ko: '첸토', ja: 'チェント' },
  { n: 200, form: 'duecento', en: 'doo-e-chen-to', ko: '두에첸토', ja: 'ドゥエチェント' },
  { n: 300, form: 'trecento', en: 'tre-chen-to', ko: '트레첸토', ja: 'トレチェント' },
  { n: 400, form: 'quattrocento', en: 'kwa-tro-chen-to', ko: '쿠아트로첸토', ja: 'クアトロチェント' },
  { n: 500, form: 'cinquecento', en: 'chin-kwe-chen-to', ko: '칭퀘첸토', ja: 'チンクェチェント' },
  { n: 600, form: 'seicento', en: 'say-chen-to', ko: '세이첸토', ja: 'セイチェント' },
  { n: 700, form: 'settecento', en: 'set-te-chen-to', ko: '세테첸토', ja: 'セッテチェント' },
  { n: 800, form: 'ottocento', en: 'ot-to-chen-to', ko: '오토첸토', ja: 'オットチェント' },
  { n: 900, form: 'novecento', en: 'no-ve-chen-to', ko: '노베첸토', ja: 'ノヴェチェント' },
  { n: 1000, form: 'mille', en: 'mee-le/mille', ko: '밀레', ja: 'ミッレ' },
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
    de: row.en,
    ru: row.en,
    it: row.form,
  })
}

function quizEntry(row) {
  return {
    quiz_id: `it_numbers_${row.n}`,
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
      en: 'Italian',
      ko: '이탈리아어',
      ja: 'イタリア語',
      zh: '意大利语',
      fr: 'Italien',
      es: 'Italiano',
      de: 'Italienisch',
      ru: 'Итальянский',
      it: 'Italiano',
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
  table_id: 'it_numbers_ref',
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
    en: '0–16 mostly unique; 17–19 = dieci + ones. From 21: one word (ventuno, trentadue). Drop tens vowel before 1 and 8.',
    ko: '0–16 대체로 고유, 17–19 = dieci + 일. 21부터 한 단어(ventuno…). 1·8 앞에서 십 단위 모음 탈락.',
    ja: '0–16はほぼ固有。17–19は dieci＋一。21以降は一語。1・8の前で十の母音が落ちる。',
    zh: '0–16 多专名；17–19 = dieci + 个位。从21起一词连写；1、8前十位元音脱落。',
    fr: '0–16 surtout uniques ; 17–19 = dieci + unités. Dès 21 : un mot. Voyelle des dizaines tombe devant 1 et 8.',
    es: '0–16 casi propios; 17–19 = dieci + unidades. Desde 21: una palabra. Vocal de decena cae ante 1 y 8.',
    de: '0–16 meist eigen; 17–19 = dieci + Einer. Ab 21 ein Wort. Zehnervokal fällt vor 1 und 8.',
    ru: '0–16 в основном особые; 17–19 = dieci + единицы. С 21 — одно слово. Гласная десятков падает перед 1 и 8.',
    it: '0–16 per lo più unici; 17–19 = dieci + unità. Dal 21: una parola. Vocale della decina cade davanti a 1 e 8.',
  }),
  rules: {
    en: [
      'uno → un before a masculine noun (un libro); una for feminine.',
      'cento alone for 100; duecento… for round hundreds. mille does not pluralize for round thousands (duemila).',
      '21–99: one word — ventuno, ventotto (drop -i/-a before 1, 8); ventitré with accent on -tré.',
      'Quiz adds random compounds (21–99).',
    ],
    ko: [
      '남성 명사 앞 uno → un (un libro); 여성은 una.',
      '100은 cento; 백 단위 duecento…. mille는 천 단위에서 복수 안 씀(duemila).',
      '21–99: 한 단어 — ventuno, ventotto(1·8 앞 모음 탈락); ventitré는 -tré 악센트.',
      '퀴즈에 랜덤 합성(21–99) 추가.',
    ],
    ja: [
      '男性名詞の前は uno → un。女性は una。',
      '100は cento。百は duecento…。mille は千で複数にしない（duemila）。',
      '21–99は一語。1・8の前で母音脱落。-tré にアクセント。',
      'クイズに合成あり。',
    ],
    zh: [
      '阳性名词前 uno → un；阴性 una。',
      '100 用 cento；整百 duecento…。mille 整千不加复数（duemila）。',
      '21–99 连写；1、8 前十位元音脱落；-tré 加重音。',
      '测验含随机合成。',
    ],
    fr: [
      'uno → un devant un nom masculin ; una au féminin.',
      'cento pour 100 ; duecento… mille sans pluriel (duemila).',
      '21–99 en un mot ; chute de voyelle devant 1 et 8 ; accent sur -tré.',
      'Le quiz ajoute des composés aléatoires.',
    ],
    es: [
      'uno → un ante nombre masculino; una en femenino.',
      'cento = 100; duecento…. mille sin plural (duemila).',
      '21–99 en una palabra; vocal cae ante 1 y 8; acento en -tré.',
      'El quiz añade compuestos aleatorios.',
    ],
    de: [
      'uno → un vor mask. Nomen; una feminin.',
      'cento = 100; duecento…. mille ohne Plural (duemila).',
      '21–99 ein Wort; Vokal fällt vor 1 und 8; Akzent auf -tré.',
      'Quiz ergänzt Zufallsverbindungen.',
    ],
    ru: [
      'uno → un перед сущ. м. р.; una — ж. р.',
      'cento = 100; duecento…. mille без мн. (duemila).',
      '21–99 одно слово; гласная падает перед 1 и 8; ударение на -tré.',
      'В квизе — случайные составные.',
    ],
    it: [
      'uno → un davanti a nome maschile; una al femminile.',
      'cento = 100; duecento…. mille senza plurale (duemila).',
      '21–99 in una parola; vocale cade davanti a 1 e 8; accento su -tré.',
      'Il quiz aggiunge composti casuali.',
    ],
  },
  sections: [
    {
      title: loc({ en: '0–10', ko: '0–10', ja: '0–10', zh: '0–10', fr: '0–10', es: '0–10', de: '0–10', ru: '0–10', it: '0–10' }),
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
        en: '11–16 unique-ish; 17–19 built on dieci (diciassette, diciotto, diciannove).',
        ko: '11–16 고유에 가깝고, 17–19는 dieci 계열.',
        ja: '11–16は固有寄り、17–19は dieci 系。',
        zh: '11–16 近专名；17–19 基于 dieci。',
        fr: '11–16 plutôt uniques ; 17–19 sur dieci.',
        es: '11–16 casi propios; 17–19 sobre dieci.',
        de: '11–16 eher eigen; 17–19 auf dieci.',
        ru: '11–16 почти особые; 17–19 на dieci.',
        it: '11–16 quasi unici; 17–19 su dieci.',
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
        en: 'cento = 100 (no “un”). Round hundreds fuse: duecento. mille → mila in compounds (duemila).',
        ko: '100은 cento(“un” 없음). 백 단위는 붙여 씀(duecento). 합성에서 mille → mila(duemila).',
        ja: '100は cento（un なし）。百は duecento。合成では mille → mila。',
        zh: '100 用 cento（不加 un）。整百连写；合成中 mille → mila。',
        fr: 'cento = 100 (pas « un »). Centaines soudées. mille → mila.',
        es: 'cento = 100 (sin « un »). Centenas unidas. mille → mila.',
        de: 'cento = 100 (kein „un“). Hunderter verschmolzen. mille → mila.',
        ru: 'cento = 100 (без «un»). Сотни слитно. mille → mila.',
        it: 'cento = 100 (senza «un»). Centinaia fuse. mille → mila.',
      }),
      columns: FORM_COLS,
      rows: hundreds().map(tableRow),
    },
  ],
}

writeFileSync(join(OUT_DIR, 'numbers.json'), `${JSON.stringify(quiz, null, 2)}\n`)
writeFileSync(join(OUT_DIR, 'numbers.table.json'), `${JSON.stringify(table, null, 2)}\n`)
console.log(`it numbers ok — ${quiz.length} cards`)
