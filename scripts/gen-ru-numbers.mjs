/**
 * Generate Russian cardinal number quiz + reference table.
 * Run: node scripts/gen-ru-numbers.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../src/data/ru')

/** @typedef {{ n: number, form: string, en: string, ko: string, ja: string }} NumRow */

/** @type {NumRow[]} */
const BASE = [
  { n: 0, form: 'ноль', en: 'nolʹ', ko: '놀', ja: 'ノリ' },
  { n: 1, form: 'один', en: 'o-din', ko: '아딘', ja: 'アヂン' },
  { n: 2, form: 'два', en: 'dva', ko: '드바', ja: 'ドヴァ' },
  { n: 3, form: 'три', en: 'tri', ko: '트리', ja: 'トリ' },
  { n: 4, form: 'четыре', en: 'che-ty-re', ko: '치티레', ja: 'チティレ' },
  { n: 5, form: 'пять', en: 'pyatʹ', ko: '퍄찌', ja: 'ピャチ' },
  { n: 6, form: 'шесть', en: 'shestʹ', ko: '셰스찌', ja: 'シェスチ' },
  { n: 7, form: 'семь', en: 'semʹ', ko: '셈', ja: 'セミ' },
  { n: 8, form: 'восемь', en: 'vo-semʹ', ko: '바셈', ja: 'ヴォセミ' },
  { n: 9, form: 'девять', en: 'de-vyatʹ', ko: '제뱌찌', ja: 'ヂェヴャチ' },
  { n: 10, form: 'десять', en: 'de-syatʹ', ko: '제샤찌', ja: 'ヂェシャチ' },
  { n: 11, form: 'одиннадцать', en: 'o-di-na-tsatʹ', ko: '아디나찻', ja: 'アヂナーツァチ' },
  { n: 12, form: 'двенадцать', en: 'dve-na-tsatʹ', ko: '드베나찻', ja: 'ドヴェナーツァチ' },
  { n: 13, form: 'тринадцать', en: 'tri-na-tsatʹ', ko: '트리나찻', ja: 'トリナーツァチ' },
  { n: 14, form: 'четырнадцать', en: 'che-tyr-na-tsatʹ', ko: '치티르나찻', ja: 'チティルナーツァチ' },
  { n: 15, form: 'пятнадцать', en: 'pyat-na-tsatʹ', ko: '퍄트나찻', ja: 'ピャトナーツァチ' },
  { n: 16, form: 'шестнадцать', en: 'shest-na-tsatʹ', ko: '셰스트나찻', ja: 'シェストナーツァチ' },
  { n: 17, form: 'семнадцать', en: 'sem-na-tsatʹ', ko: '셈나찻', ja: 'セムナーツァチ' },
  { n: 18, form: 'восемнадцать', en: 'vo-sem-na-tsatʹ', ko: '바셈나찻', ja: 'ヴォセムナーツァチ' },
  { n: 19, form: 'девятнадцать', en: 'de-vyat-na-tsatʹ', ko: '제뱌트나찻', ja: 'ヂェヴャトナーツァチ' },
  { n: 20, form: 'двадцать', en: 'dva-tsatʹ', ko: '드바찻', ja: 'ドヴァーツァチ' },
  { n: 30, form: 'тридцать', en: 'tri-tsatʹ', ko: '트리찻', ja: 'トリーツァチ' },
  { n: 40, form: 'сорок', en: 'so-rok', ko: '소록', ja: 'ソーラク' },
  { n: 50, form: 'пятьдесят', en: 'pyatʹ-de-syat', ko: '퍄찌젯샷', ja: 'ピャチヂェシャト' },
  { n: 60, form: 'шестьдесят', en: 'shestʹ-de-syat', ko: '셰스찌젯샷', ja: 'シェスチヂェシャト' },
  { n: 70, form: 'семьдесят', en: 'semʹ-de-syat', ko: '셈젯샷', ja: 'セミヂェシャト' },
  { n: 80, form: 'восемьдесят', en: 'vo-semʹ-de-syat', ko: '바셈젯샷', ja: 'ヴォセミヂェシャト' },
  { n: 90, form: 'девяносто', en: 'de-vya-no-sto', ko: '제뱌노스토', ja: 'ヂェヴャノースト' },
  { n: 100, form: 'сто', en: 'sto', ko: '스토', ja: 'スト' },
  { n: 200, form: 'двести', en: 'dve-sti', ko: '드베스티', ja: 'ドヴェスティ' },
  { n: 300, form: 'триста', en: 'tri-sta', ko: '트리스타', ja: 'トリスタ' },
  { n: 400, form: 'четыреста', en: 'che-ty-re-sta', ko: '치티레스타', ja: 'チティレスタ' },
  { n: 500, form: 'пятьсот', en: 'pyatʹ-sot', ko: '퍄찌솟', ja: 'ピャチソート' },
  { n: 600, form: 'шестьсот', en: 'shestʹ-sot', ko: '셰스찌솟', ja: 'シェスチソート' },
  { n: 700, form: 'семьсот', en: 'semʹ-sot', ko: '셈솟', ja: 'セミソート' },
  { n: 800, form: 'восемьсот', en: 'vo-semʹ-sot', ko: '바셈솟', ja: 'ヴォセミソート' },
  { n: 900, form: 'девятьсот', en: 'de-vyatʹ-sot', ko: '제뱌찌솟', ja: 'ヂェヴャチソート' },
  { n: 1000, form: 'тысяча', en: 'ty-sya-cha', ko: '티샤차', ja: 'トゥィシャーチャ' },
]

const DIGIT = (n) => ({
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
  return {
    en: row.en,
    ko: row.ko,
    ja: row.ja,
    zh: row.en,
    fr: row.en,
    es: row.en,
    de: row.en,
    ru: row.form,
  }
}

function quizEntry(row) {
  return {
    quiz_id: `ru_numbers_${row.n}`,
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
    labels: {
      en: 'Russian',
      ko: '러시아어',
      ja: 'ロシア語',
      zh: '俄语',
      fr: 'Russe',
      es: 'Ruso',
      de: 'Russisch',
      ru: 'Русский',
    },
  },
  {
    key: 'meaning',
    labels: {
      en: 'Meaning',
      ko: '의미',
      ja: '意味',
      zh: '意思',
      fr: 'Sens',
      es: 'Significado',
      de: 'Bedeutung',
      ru: 'Значение',
    },
  },
  {
    key: 'sound',
    labels: {
      en: 'Sound',
      ko: '발음',
      ja: '読み',
      zh: '发音',
      fr: 'Prononciation',
      es: 'Pronunciación',
      de: 'Aussprache',
      ru: 'Произношение',
    },
  },
]

const byRange = (min, max) => BASE.filter((r) => r.n >= min && r.n <= max)
const tens = () => BASE.filter((r) => r.n >= 20 && r.n <= 90 && r.n % 10 === 0)
const hundreds = () => BASE.filter((r) => (r.n >= 100 && r.n <= 900) || r.n === 1000)

const table = {
  table_id: 'ru_numbers_ref',
  title: {
    en: 'Cardinal numbers',
    ko: '기수사',
    ja: '基数',
    zh: '基数词',
    fr: 'Nombres cardinaux',
    es: 'Números cardinales',
    de: 'Kardinalzahlen',
    ru: 'Количественные числительные',
  },
  note: {
    en: 'Russian has many irregularities: teens, 40/90, and most hundreds must be memorized. Compounds 21–99 use a space.',
    ko: '러시아어는 11–19, 40·90, 대부분의 백 단위가 불규칙입니다. 21–99는 띄어 씁니다.',
    ja: 'ロシア語は11–19・40・90・百の多くが不規則。21–99はスペースでつなぎます。',
    zh: '俄语不规则多：11–19、40/90、多数百位需死记。21–99用空格连接。',
    fr: 'Beaucoup d’irrégularités : 11–19, 40/90, centaines. 21–99 avec un espace.',
    es: 'Muchas irregularidades: 11–19, 40/90, centenas. 21–99 con espacio.',
    de: 'Viele Unregelmäßigkeiten: 11–19, 40/90, Hunderter. 21–99 mit Leerzeichen.',
    ru: 'Много нерегулярных форм: 11–19, 40/90, сотни. 21–99 пишутся через пробел.',
  },
  rules: {
    en: [
      'Memorize 0–20, the tens (esp. сорок, девяносто), and hundreds (esp. двести, триста…).',
      '21–99 = tens + ones with a space: двадцать один, сорок пять.',
      'Gender: один/одна/одно, два/две — quiz uses masculine один / два.',
      'Quiz adds random 21–99 compounds so you practice the regular pattern.',
    ],
    ko: [
      '0–20, 십 단위(특히 сорок·девяносто), 백 단위(특히 двести·триста…)를 외우세요.',
      '21–99 = 십 + 일자리, 띄어쓰기: двадцать один, сорок пять.',
      '성 일치: один/одна/одно, два/две — 퀴즈는 남성형 один·два.',
      '퀴즈에 21–99 랜덤 조합이 나와 규칙 패턴을 연습합니다.',
    ],
    ja: [
      '0–20、十の位（とくに сорок・девяносто）、百（とくに двести・триста…）を覚える。',
      '21–99は十＋一の位をスペースで：двадцать один、сорок пять。',
      '性：один/одна/одно、два/две — クイズは男性形 один・два。',
      'クイズに21–99のランダム結合が入り、規則を練習します。',
    ],
    zh: [
      '先记 0–20、整十（尤其 сорок、девяносто）和百位（尤其 двести、триста…）。',
      '21–99 = 十位 + 个位，中间空格：двадцать один。',
      '性：один/одна/одно、два/две — 测验用阳性 один / два。',
      '测验另加随机 21–99 组合，练习规则拼法。',
    ],
    fr: [
      'Apprenez 0–20, les dizaines (surtout сорок, девяносто) et les centaines.',
      '21–99 = dizaine + unité avec espace : двадцать один.',
      'Genre : один/одна/одно, два/две — le quiz utilise один / два.',
      'Le quiz ajoute des composés 21–99 aléatoires.',
    ],
    es: [
      'Memoriza 0–20, las decenas (esp. сорок, девяносто) y las centenas.',
      '21–99 = decena + unidad con espacio: двадцать один.',
      'Género: один/одна/одно, два/две — el quiz usa один / два.',
      'El quiz añade compuestos aleatorios 21–99.',
    ],
    de: [
      '0–20, Zehner (bes. сорок, девяносто) und Hunderter auswendig lernen.',
      '21–99 = Zehner + Einer mit Leerzeichen: двадцать один.',
      'Genus: один/одна/одно, два/две — Quiz nutzt один / два.',
      'Quiz ergänzt zufällige 21–99-Verbindungen.',
    ],
    ru: [
      'Выучите 0–20, десятки (особенно сорок, девяносто) и сотни.',
      '21–99 = десятки + единицы через пробел: двадцать один.',
      'Род: один/одна/одно, два/две — в квизе мужской род один / два.',
      'В квизе — случайные сочетания 21–99 для правила.',
    ],
  },
  sections: [
    {
      title: {
        en: '0–10',
        ko: '0–10',
        ja: '0–10',
        zh: '0–10',
        fr: '0–10',
        es: '0–10',
        de: '0–10',
        ru: '0–10',
      },
      columns: FORM_COLS,
      rows: byRange(0, 10).map(tableRow),
    },
    {
      title: {
        en: 'Teens (11–19) — irregular',
        ko: '11–19 — 불규칙',
        ja: '11–19 — 不規則',
        zh: '11–19 — 不规则',
        fr: '11–19 — irréguliers',
        es: '11–19 — irregulares',
        de: '11–19 — unregelmäßig',
        ru: '11–19 — нерегулярные',
      },
      note: {
        en: 'Like English eleven/twelve: each teen is its own word ending in -надцать.',
        ko: '영어 eleven처럼 하나씩 외웁니다. 대개 -надцать로 끝납니다.',
        ja: '英語のelevenのように一つずつ覚えます。多くは -надцать。',
        zh: '像英语 eleven，需逐个记。多以 -надцать 结尾。',
        fr: 'Comme eleven : chaque forme se termine souvent par -надцать.',
        es: 'Como eleven: casi todos terminan en -надцать.',
        de: 'Wie eleven: meist auf -надцать.',
        ru: 'Каждое числительное на -надцать нужно выучить отдельно.',
      },
      columns: FORM_COLS,
      rows: byRange(11, 19).map(tableRow),
    },
    {
      title: {
        en: 'Tens',
        ko: '십 단위',
        ja: '十の位',
        zh: '整十',
        fr: 'Dizaines',
        es: 'Decenas',
        de: 'Zehner',
        ru: 'Десятки',
      },
      note: {
        en: 'Watch сорок (40) and девяносто (90) — not *четыредесят / *девятьдесят.',
        ko: 'сорок(40)·девяносто(90)에 주의 — *четыредесят / *девятьдесят가 아닙니다.',
        ja: 'сорок（40）と девяносто（90）に注意。',
        zh: '注意 сорок（40）和 девяносто（90）。',
        fr: 'Attention à сорок (40) et девяносто (90).',
        es: 'Ojo con сорок (40) y девяносто (90).',
        de: 'Achtung: сорок (40) und девяносто (90).',
        ru: 'Особо: сорок и девяносто.',
      },
      columns: FORM_COLS,
      rows: tens().map(tableRow),
    },
    {
      title: {
        en: 'Hundreds & 1000',
        ko: '백 단위와 1000',
        ja: '百と1000',
        zh: '百位与1000',
        fr: 'Centaines et 1000',
        es: 'Centenas y 1000',
        de: 'Hunderter & 1000',
        ru: 'Сотни и 1000',
      },
      note: {
        en: 'двести / триста / четыреста change stem; 500–900 keep пять… + -сот.',
        ko: 'двести·триста·четыреста는 어간이 바뀌고, 500–900은 -сот을 붙입니다.',
        ja: 'двести・триста・четырестаは語幹変化。500–900は -сот。',
        zh: 'двести / триста / четыреста 词干变化；500–900 加 -сот。',
        fr: 'двести / триста / четыреста changent de radical ; 500–900 + -сот.',
        es: 'двести / триста / четыреста cambian la raíz; 500–900 + -сот.',
        de: 'двести / триста / четыреста ändern den Stamm; 500–900 + -сот.',
        ru: 'двести, триста, четыреста — особые формы; 500–900 на -сот.',
      },
      columns: FORM_COLS,
      rows: hundreds().map(tableRow),
    },
  ],
}

const quiz = BASE.map(quizEntry)

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'numbers.json'), `${JSON.stringify(quiz, null, 2)}\n`)
fs.writeFileSync(
  path.join(outDir, 'numbers.table.json'),
  `${JSON.stringify(table, null, 2)}\n`,
)

console.log(`Wrote ${quiz.length} quiz entries + reference table → ${outDir}`)
