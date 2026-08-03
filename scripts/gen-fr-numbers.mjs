/**
 * Generate French cardinal number quiz + reference table.
 * Run: node scripts/gen-fr-numbers.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/fr')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

/** @typedef {{ n: number, form: string, en: string, ko: string, ja: string }} NumRow */

/** @type {NumRow[]} */
const BASE = [
  { n: 0, form: 'zéro', en: 'zay-ro', ko: '제로', ja: 'ゼロ' },
  { n: 1, form: 'un', en: 'uhn/un', ko: '앙/운', ja: 'アン' },
  { n: 2, form: 'deux', en: 'duh/deux', ko: '되', ja: 'ドゥ' },
  { n: 3, form: 'trois', en: 'trwah/trois', ko: '트와', ja: 'トロワ' },
  { n: 4, form: 'quatre', en: 'katr/quatre', ko: '카트르', ja: 'キャトル' },
  { n: 5, form: 'cinq', en: 'sank/cinq', ko: '생크', ja: 'サンク' },
  { n: 6, form: 'six', en: 'sees/six', ko: '시스', ja: 'シス' },
  { n: 7, form: 'sept', en: 'set/sept', ko: '세트', ja: 'セット' },
  { n: 8, form: 'huit', en: 'weet/huit', ko: '위트', ja: 'ユイット' },
  { n: 9, form: 'neuf', en: 'nuhf/neuf', ko: '뇌프', ja: 'ヌフ' },
  { n: 10, form: 'dix', en: 'dees/dix', ko: '디스', ja: 'ディス' },
  { n: 11, form: 'onze', en: 'onz/onze', ko: '온즈', ja: 'オンズ' },
  { n: 12, form: 'douze', en: 'dooz/douze', ko: '두즈', ja: 'ドゥーズ' },
  { n: 13, form: 'treize', en: 'trez/treize', ko: '트레즈', ja: 'トレーズ' },
  { n: 14, form: 'quatorze', en: 'ka-torz/quatorze', ko: '카토르즈', ja: 'カトルズ' },
  { n: 15, form: 'quinze', en: 'kanz/quinze', ko: '캥즈', ja: 'キャンズ' },
  { n: 16, form: 'seize', en: 'sez/seize', ko: '세즈', ja: 'セーズ' },
  { n: 17, form: 'dix-sept', en: 'dees-set', ko: '디스세트', ja: 'ディスセット' },
  { n: 18, form: 'dix-huit', en: 'deez-weet', ko: '디즈위트', ja: 'ディズユイット' },
  { n: 19, form: 'dix-neuf', en: 'deez-nuhf', ko: '디즈뇌프', ja: 'ディズヌフ' },
  { n: 20, form: 'vingt', en: 'van/vingt', ko: '뱅', ja: 'ヴァン' },
  { n: 30, form: 'trente', en: 'tront/trente', ko: '트랑트', ja: 'トラント' },
  { n: 40, form: 'quarante', en: 'ka-ront/quarante', ko: '카랑트', ja: 'キャラント' },
  { n: 50, form: 'cinquante', en: 'san-kont/cinquante', ko: '생캉트', ja: 'サンカント' },
  { n: 60, form: 'soixante', en: 'swa-sont/soixante', ko: '수아상트', ja: 'ソワサント' },
  { n: 70, form: 'soixante-dix', en: 'swa-sont-dees', ko: '수아상트디스', ja: 'ソワサントディス' },
  { n: 80, form: 'quatre-vingts', en: 'katr-van', ko: '카트르뱅', ja: 'キャトルヴァン' },
  { n: 90, form: 'quatre-vingt-dix', en: 'katr-van-dees', ko: '카트르뱅디스', ja: 'キャトルヴァンディス' },
  { n: 100, form: 'cent', en: 'son/cent', ko: '상', ja: 'サン' },
  { n: 200, form: 'deux cents', en: 'duh son', ko: '되 상', ja: 'ドゥ・サン' },
  { n: 300, form: 'trois cents', en: 'trwah son', ko: '트와 상', ja: 'トロワ・サン' },
  { n: 400, form: 'quatre cents', en: 'katr son', ko: '카트르 상', ja: 'キャトル・サン' },
  { n: 500, form: 'cinq cents', en: 'sank son', ko: '생크 상', ja: 'サンク・サン' },
  { n: 600, form: 'six cents', en: 'see son', ko: '시 상', ja: 'シ・サン' },
  { n: 700, form: 'sept cents', en: 'set son', ko: '세트 상', ja: 'セット・サン' },
  { n: 800, form: 'huit cents', en: 'weet son', ko: '위트 상', ja: 'ユイット・サン' },
  { n: 900, form: 'neuf cents', en: 'nuhf son', ko: '뇌프 상', ja: 'ヌフ・サン' },
  { n: 1000, form: 'mille', en: 'meel/mille', ko: '밀', ja: 'ミル' },
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
    fr: row.form,
    es: row.en,
    de: row.en,
    ru: row.en,
  })
}

function quizEntry(row) {
  return {
    quiz_id: `fr_numbers_${row.n}`,
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
      en: 'French',
      ko: '프랑스어',
      ja: 'フランス語',
      zh: '法语',
      fr: 'Français',
      es: 'Francés',
      de: 'Französisch',
      ru: 'Французский',
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
  table_id: 'fr_numbers_ref',
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
    en: '0–16 are unique; 70/80/90 use 60+ and 4×20. Compounds use hyphens; 21/31… use et before un/onze.',
    ko: '0–16은 고유형. 70·80·90은 60+·4×20 패턴. 합성은 하이픈, 21·31…은 un/onze 앞에 et.',
    ja: '0–16は固有。70・80・90は60+と4×20。合成はハイフン、21・31…は un/onze の前に et。',
    zh: '0–16 各有专名；70/80/90 用 60+ 与 4×20。合成用连字符；21/31…在 un/onze 前加 et。',
    fr: '0–16 uniques ; 70/80/90 = 60+ et 4×20. Traits d’union ; et devant un/onze (21, 31…).',
    es: '0–16 propios; 70/80/90 = 60+ y 4×20. Guiones; et ante un/onze (21, 31…).',
    de: '0–16 eigen; 70/80/90 = 60+ und 4×20. Bindestriche; et vor un/onze (21, 31…).',
    ru: '0–16 особые; 70/80/90 = 60+ и 4×20. Дефисы; et перед un/onze (21, 31…).',
  }),
  rules: {
    en: [
      'Memorize 0–20, then tens — especially soixante-dix, quatre-vingts, quatre-vingt-dix.',
      '21–69: tens + ones with hyphen; use et before un (vingt et un).',
      '70–79 = soixante + (10–19); 71 = soixante et onze.',
      '80–99 = quatre-vingt(s) + … ; no et (quatre-vingt-un). Drop -s on quatre-vingts in compounds.',
      'Quiz adds random 21–99 compounds so you practice the pattern.',
    ],
    ko: [
      '0–20과 십 단위를 외우세요 — 특히 soixante-dix, quatre-vingts, quatre-vingt-dix.',
      '21–69: 십+일자리 하이픈; un 앞에는 et (vingt et un).',
      '70–79 = soixante + (10–19); 71 = soixante et onze.',
      '80–99 = quatre-vingt(s)+… ; et 없음 (quatre-vingt-un). 합성에선 quatre-vingts의 -s 탈락.',
      '퀴즈에 21–99 랜덤 조합이 나와 규칙을 연습합니다.',
    ],
    ja: [
      '0–20と十の位を覚える — とくに soixante-dix, quatre-vingts, quatre-vingt-dix。',
      '21–69は十＋一をハイフン。un の前は et（vingt et un）。',
      '70–79 = soixante +（10–19）。71 = soixante et onze。',
      '80–99 = quatre-vingt(s)+…。et なし。合成では quatre-vingts の -s が落ちる。',
      'クイズに21–99のランダム結合が入り、規則を練習します。',
    ],
    zh: [
      '先记 0–20 与整十，尤其 soixante-dix、quatre-vingts、quatre-vingt-dix。',
      '21–69：十位+个位用连字符；un 前加 et（vingt et un）。',
      '70–79 = soixante +（10–19）；71 = soixante et onze。',
      '80–99 = quatre-vingt(s)+…；不加 et。合成时 quatre-vingts 去掉 -s。',
      '测验另加随机 21–99 组合练习规则。',
    ],
    fr: [
      'Apprenez 0–20 et les dizaines — surtout 70/80/90.',
      '21–69 : trait d’union ; et devant un (vingt et un).',
      '70–79 = soixante + (10–19) ; 71 = soixante et onze.',
      '80–99 = quatre-vingt(s)+… ; pas de et. -s de quatre-vingts tombe en composition.',
      'Le quiz ajoute des composés 21–99 aléatoires.',
    ],
    es: [
      'Memoriza 0–20 y las decenas — sobre todo 70/80/90.',
      '21–69: guion; et ante un (vingt et un).',
      '70–79 = soixante + (10–19); 71 = soixante et onze.',
      '80–99 = quatre-vingt(s)+…; sin et. La -s de quatre-vingts cae en compuestos.',
      'El quiz añade compuestos aleatorios 21–99.',
    ],
    de: [
      '0–20 und Zehner lernen — besonders 70/80/90.',
      '21–69: Bindestrich; et vor un (vingt et un).',
      '70–79 = soixante + (10–19); 71 = soixante et onze.',
      '80–99 = quatre-vingt(s)+…; kein et. -s von quatre-vingts fällt in Verbindungen.',
      'Quiz ergänzt zufällige 21–99-Verbindungen.',
    ],
    ru: [
      'Выучите 0–20 и десятки — особенно 70/80/90.',
      '21–69: дефис; et перед un (vingt et un).',
      '70–79 = soixante + (10–19); 71 = soixante et onze.',
      '80–99 = quatre-vingt(s)+…; без et. -s у quatre-vingts в составе пропадает.',
      'В квизе — случайные сочетания 21–99.',
    ],
    it: [
      'Impara 0–20 e le decine — soprattutto 70/80/90.',
      '21–69: trattino; et davanti a un (vingt et un).',
      '70–79 = soixante + (10–19); 71 = soixante et onze.',
      '80–99 = quatre-vingt(s)+…; niente et. La -s di quatre-vingts cade nei composti.',
      'Il quiz aggiunge composti casuali 21–99.',
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
      }),
      note: loc({
        en: '11–16 are unique words; 17–19 = dix + 7–9.',
        ko: '11–16은 고유어, 17–19는 dix + 7–9.',
        ja: '11–16は固有、17–19は dix + 7–9。',
        zh: '11–16 专名；17–19 = dix + 7–9。',
        fr: '11–16 uniques ; 17–19 = dix + 7–9.',
        es: '11–16 propios; 17–19 = dix + 7–9.',
        de: '11–16 eigen; 17–19 = dix + 7–9.',
        ru: '11–16 особые; 17–19 = dix + 7–9.',
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
      note: loc({
        en: 'Watch 70/80/90 — soixante-dix, quatre-vingts, quatre-vingt-dix (Belgium/Switzerland often use septante…).',
        ko: '70·80·90 주의 — soixante-dix, quatre-vingts, quatre-vingt-dix (벨기에·스위스는 septante 등 사용).',
        ja: '70・80・90に注意。ベルギー・スイスでは septante なども。',
        zh: '注意 70/80/90。比利时/瑞士常用 septante 等。',
        fr: 'Attention à 70/80/90. Belgique/Suisse : souvent septante…',
        es: 'Ojo con 70/80/90. Bélgica/Suiza: a menudo septante…',
        de: 'Achtung 70/80/90. BE/CH oft septante…',
        ru: 'Смотрите 70/80/90. В BE/CH часто septante…',
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
        en: 'cent takes -s in round hundreds (deux cents) but not before another number (deux cent un).',
        ko: '딱 떨어지는 백에는 -s (deux cents), 뒤에 수가 오면 없음 (deux cent un).',
        ja: 'きりの百は -s（deux cents）、そのあとに数が続けばなし（deux cent un）。',
        zh: '整百加 -s（deux cents），后面还有数则不加（deux cent un）。',
        fr: 'cent prend -s aux centaines rondes, pas devant un autre nombre.',
        es: 'cent lleva -s en centenas redondas, no ante otro número.',
        de: 'cent mit -s bei runden Hundertern, nicht vor weiterer Zahl.',
        ru: 'cent с -s на круглых сотнях, без -s перед другим числом.',
      }),
      columns: FORM_COLS,
      rows: hundreds().map(tableRow),
    },
  ],
}

writeFileSync(join(OUT_DIR, 'numbers.json'), `${JSON.stringify(quiz, null, 2)}\n`)
writeFileSync(join(OUT_DIR, 'numbers.table.json'), `${JSON.stringify(table, null, 2)}\n`)
console.log(`fr numbers ok — ${quiz.length} cards`)
