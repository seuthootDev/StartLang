/**
 * Generate Spanish cardinal number quiz + reference table.
 * Run: node scripts/gen-es-numbers.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/es')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

/** @typedef {{ n: number, form: string, en: string, ko: string, ja: string }} NumRow */

/** @type {NumRow[]} */
const BASE = [
  { n: 0, form: 'cero', en: 'seh-ro/cero', ko: '세로', ja: 'セロ' },
  { n: 1, form: 'uno', en: 'oo-no/uno', ko: '우노', ja: 'ウノ' },
  { n: 2, form: 'dos', en: 'dos', ko: '도스', ja: 'ドス' },
  { n: 3, form: 'tres', en: 'tres', ko: '트레스', ja: 'トレス' },
  { n: 4, form: 'cuatro', en: 'kwa-tro', ko: '쿠아트로', ja: 'クアトロ' },
  { n: 5, form: 'cinco', en: 'seen-ko', ko: '싱코', ja: 'シンコ' },
  { n: 6, form: 'seis', en: 'says/seis', ko: '세이스', ja: 'セイス' },
  { n: 7, form: 'siete', en: 'sye-te', ko: '시에테', ja: 'シエテ' },
  { n: 8, form: 'ocho', en: 'o-cho', ko: '오초', ja: 'オチョ' },
  { n: 9, form: 'nueve', en: 'nwe-ve', ko: '누에베', ja: 'ヌエベ' },
  { n: 10, form: 'diez', en: 'dyes/diez', ko: '디에스', ja: 'ディエス' },
  { n: 11, form: 'once', en: 'on-se', ko: '온세', ja: 'オンセ' },
  { n: 12, form: 'doce', en: 'do-se', ko: '도세', ja: 'ドセ' },
  { n: 13, form: 'trece', en: 'tre-se', ko: '트레세', ja: 'トレセ' },
  { n: 14, form: 'catorce', en: 'ka-tor-se', ko: '카토르세', ja: 'カトルセ' },
  { n: 15, form: 'quince', en: 'keen-se', ko: '킨세', ja: 'キンセ' },
  { n: 16, form: 'dieciséis', en: 'dye-see-says', ko: '디에시세이스', ja: 'ディエシセイス' },
  { n: 17, form: 'diecisiete', en: 'dye-see-sye-te', ko: '디에시시에테', ja: 'ディエシシエテ' },
  { n: 18, form: 'dieciocho', en: 'dye-syo-cho', ko: '디에시오초', ja: 'ディエシオチョ' },
  { n: 19, form: 'diecinueve', en: 'dye-see-nwe-ve', ko: '디에시누에베', ja: 'ディエシヌエベ' },
  { n: 20, form: 'veinte', en: 'bayn-te', ko: '베인테', ja: 'ベインテ' },
  { n: 30, form: 'treinta', en: 'trayn-ta', ko: '트레인트아', ja: 'トレインタ' },
  { n: 40, form: 'cuarenta', en: 'kwa-ren-ta', ko: '쿠아렌타', ja: 'クアレンタ' },
  { n: 50, form: 'cincuenta', en: 'seen-kwen-ta', ko: '싱쿠엔타', ja: 'シンクエンタ' },
  { n: 60, form: 'sesenta', en: 'se-sen-ta', ko: '세센타', ja: 'セセンタ' },
  { n: 70, form: 'setenta', en: 'se-ten-ta', ko: '세텐타', ja: 'セテンタ' },
  { n: 80, form: 'ochenta', en: 'o-chen-ta', ko: '오첸타', ja: 'オチェンタ' },
  { n: 90, form: 'noventa', en: 'no-ven-ta', ko: '노벤타', ja: 'ノベンタ' },
  { n: 100, form: 'cien', en: 'syen/cien', ko: '시엔', ja: 'シエン' },
  { n: 200, form: 'doscientos', en: 'dos-syen-tos', ko: '도시엔토스', ja: 'ドシエントス' },
  { n: 300, form: 'trescientos', en: 'tres-syen-tos', ko: '트레시엔토스', ja: 'トレシエントス' },
  { n: 400, form: 'cuatrocientos', en: 'kwa-tro-syen-tos', ko: '쿠아트로시엔토스', ja: 'クアトロシエントス' },
  { n: 500, form: 'quinientos', en: 'kee-nyen-tos', ko: '키니엔토스', ja: 'キニエントス' },
  { n: 600, form: 'seiscientos', en: 'says-syen-tos', ko: '세이시엔토스', ja: 'セイシエントス' },
  { n: 700, form: 'setecientos', en: 'se-te-syen-tos', ko: '세테시엔토스', ja: 'セテシエントス' },
  { n: 800, form: 'ochocientos', en: 'o-cho-syen-tos', ko: '오초시엔토스', ja: 'オチョシエントス' },
  { n: 900, form: 'novecientos', en: 'no-ve-syen-tos', ko: '노베시엔토스', ja: 'ノベシエントス' },
  { n: 1000, form: 'mil', en: 'meel/mil', ko: '밀', ja: 'ミル' },
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
    es: row.form,
    de: row.en,
    ru: row.en,
  })
}

function quizEntry(row) {
  return {
    quiz_id: `es_numbers_${row.n}`,
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
      en: 'Spanish',
      ko: '스페인어',
      ja: 'スペイン語',
      zh: '西班牙语',
      fr: 'Espagnol',
      es: 'Español',
      de: 'Spanisch',
      ru: 'Испанский',
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
    }),
  },
]

const byRange = (min, max) => BASE.filter((r) => r.n >= min && r.n <= max)
const tens = () => BASE.filter((r) => r.n >= 20 && r.n <= 90 && r.n % 10 === 0)
const hundreds = () => BASE.filter((r) => (r.n >= 100 && r.n <= 900) || r.n === 1000)

mkdirSync(OUT_DIR, { recursive: true })

const quiz = BASE.map(quizEntry)

const table = {
  table_id: 'es_numbers_ref',
  title: loc({
    en: 'Cardinal numbers',
    ko: '기수사',
    ja: '基数',
    zh: '基数词',
    fr: 'Nombres cardinaux',
    es: 'Números cardinales',
    de: 'Kardinalzahlen',
    ru: 'Количественные числительные',
  }),
  note: loc({
    en: '0–15 unique; 16–29 often one word (dieciséis, veintiuno). From 30: tens + y + ones (treinta y uno).',
    ko: '0–15 고유, 16–29는 한 단어(dieciséis, veintiuno). 30부터: 십 + y + 일 (treinta y uno).',
    ja: '0–15は固有。16–29は一語が多い。30以降は十＋y＋一。',
    zh: '0–15 专名；16–29 常为一词。从30起：十位 + y + 个位。',
    fr: '0–15 uniques ; 16–29 souvent un mot. Dès 30 : dizaine + y + unité.',
    es: '0–15 propios; 16–29 a menudo una palabra. Desde 30: decena + y + unidad.',
    de: '0–15 eigen; 16–29 oft ein Wort. Ab 30: Zehner + y + Einer.',
    ru: '0–15 особые; 16–29 часто одно слово. С 30: десятки + y + единицы.',
  }),
  rules: {
    en: [
      'uno → un before a masculine noun (un libro); una for feminine.',
      'cien alone; ciento before another number (ciento uno). Round hundreds: doscientos…',
      '21–29: veintiuno, veintidós… (accents on veintidós, veintitrés, veintiséis).',
      '30–99: treinta y uno, etc. Quiz adds random compounds.',
    ],
    ko: [
      '남성 명사 앞 uno → un (un libro); 여성은 una.',
      '단독 cien; 다른 수 앞 ciento (ciento uno). 백 단위 doscientos…',
      '21–29: veintiuno, veintidós… (악센트 주의).',
      '30–99: treinta y uno. 퀴즈에 랜덤 합성 추가.',
    ],
    ja: [
      '男性名詞の前は uno → un。女性は una。',
      '単独 cien、他の数の前 ciento。百は doscientos…',
      '21–29は veintiuno など（アクセント注意）。',
      '30–99は treinta y uno。クイズに合成あり。',
    ],
    zh: [
      '阳性名词前 uno → un；阴性 una。',
      '单独 cien；后面有数用 ciento。整百 doscientos…',
      '21–29：veintiuno 等（注意重音）。',
      '30–99：treinta y uno。测验含随机合成。',
    ],
    fr: [
      'uno → un devant un nom masculin ; una au féminin.',
      'cien seul ; ciento devant un autre nombre.',
      '21–29 : veintiuno… ; 30–99 : treinta y uno.',
      'Le quiz ajoute des composés aléatoires.',
    ],
    es: [
      'uno → un ante nombre masculino; una en femenino.',
      'cien solo; ciento ante otro número.',
      '21–29: veintiuno…; 30–99: treinta y uno.',
      'El quiz añade compuestos aleatorios.',
    ],
    de: [
      'uno → un vor mask. Nomen; una feminin.',
      'cien allein; ciento vor weiterer Zahl.',
      '21–29: veintiuno…; 30–99: treinta y uno.',
      'Quiz ergänzt Zufallsverbindungen.',
    ],
    ru: [
      'uno → un перед сущ. м. р.; una — ж. р.',
      'cien отдельно; ciento перед другим числом.',
      '21–29: veintiuno…; 30–99: treinta y uno.',
      'В квизе — случайные составные.',
    ],
    it: [
      'uno → un davanti a nome maschile; una al femminile.',
      'cien da solo; ciento davanti a un altro numero.',
      '21–29: veintiuno…; 30–99: treinta y uno.',
      'Il quiz aggiunge composti casuali.',
    ],
  },
  sections: [
    {
      title: loc({ en: '0–10', ko: '0–10', ja: '0–10', zh: '0–10', fr: '0–10', es: '0–10', de: '0–10', ru: '0–10' }),
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
      }),
      note: loc({
        en: '11–15 unique; 16–19 = diez + ones (dieci-…).',
        ko: '11–15 고유, 16–19 = diez + 일자리.',
        ja: '11–15は固有、16–19は diez＋一。',
        zh: '11–15 专名；16–19 = diez + 个位。',
        fr: '11–15 uniques ; 16–19 = diez + unités.',
        es: '11–15 propios; 16–19 = diez + unidades.',
        de: '11–15 eigen; 16–19 = diez + Einer.',
        ru: '11–15 особые; 16–19 = diez + единицы.',
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
      }),
      note: loc({
        en: 'cien = 100 alone; quinientos (500) is irregular. mil does not take plural for round thousands.',
        ko: '단독 100은 cien; 500 quinientos는 불규칙. mil은 천 단위에서 복수 안 씀.',
        ja: '100単独は cien。500 quinientos は不規則。mil は複数にしない。',
        zh: '单独100用 cien；500 quinientos 不规则。mil 整千不加复数。',
        fr: 'cien seul ; quinientos irrégulier. mil sans pluriel.',
        es: 'cien solo; quinientos irregular. mil sin plural.',
        de: 'cien allein; quinientos unregelmäßig. mil ohne Plural.',
        ru: 'cien отдельно; quinientos нерегулярно. mil без мн. ч.',
      }),
      columns: FORM_COLS,
      rows: hundreds().map(tableRow),
    },
  ],
}

writeFileSync(join(OUT_DIR, 'numbers.json'), `${JSON.stringify(quiz, null, 2)}\n`)
writeFileSync(join(OUT_DIR, 'numbers.table.json'), `${JSON.stringify(table, null, 2)}\n`)
console.log(`es numbers ok — ${quiz.length} cards`)
