/**
 * Generate Spanish question-word quiz + reference table.
 * Run: node scripts/gen-es-questions.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/es')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

function sounds(en, ko, ja, form) {
  return loc({
    en,
    ko,
    ja,
    zh: en,
    fr: en,
    es: form,
    de: en,
    ru: en,
  })
}

function pack(id, form, en, ko, ja, meaning) {
  const sound = sounds(en, ko, ja, form)
  const meaningLoc = loc(meaning)
  return {
    quiz: {
      quiz_id: `es_questions_${id}`,
      question_word: form,
      pronunciations: sound,
      translations: meaningLoc,
    },
    row: { form, meaning: meaningLoc, sound },
  }
}

const ITEMS = [
  pack('quien', 'quién', 'kyen/quién', '키엔', 'キエン', {
    en: 'who (singular)',
    ko: '누구 (단수)',
    ja: '誰（単数）',
    zh: '谁（单数）',
    fr: 'qui (singulier)',
    es: 'quién',
    de: 'wer (Singular)',
    ru: 'кто (ед.)',
  }),
  pack('quienes', 'quiénes', 'kye-nes', '키에네스', 'キエネス', {
    en: 'who (plural)',
    ko: '누구 (복수)',
    ja: '誰（複数）',
    zh: '谁（复数）',
    fr: 'qui (pluriel)',
    es: 'quiénes',
    de: 'wer (Plural)',
    ru: 'кто (мн.)',
  }),
  pack('que', 'qué', 'keh/qué', '케', 'ケ', {
    en: 'what',
    ko: '무엇',
    ja: '何',
    zh: '什么',
    fr: 'quoi / que',
    es: 'qué',
    de: 'was',
    ru: 'что',
  }),
  pack('donde', 'dónde', 'don-de', '돈데', 'ドンデ', {
    en: 'where (location)',
    ko: '어디 (장소)',
    ja: 'どこ（場所）',
    zh: '哪里（地点）',
    fr: 'où (lieu)',
    es: 'dónde',
    de: 'wo',
    ru: 'где',
  }),
  pack('adedonde', 'adónde', 'a-don-de', '아돈데', 'アドンデ', {
    en: 'where to / whither',
    ko: '어디로 (방향)',
    ja: 'どこへ（方向）',
    zh: '去哪里（方向）',
    fr: 'où (direction)',
    es: 'adónde / a dónde',
    de: 'wohin',
    ru: 'куда',
  }),
  pack('dedonde', 'de dónde', 'de don-de', '데 돈데', 'デ・ドンデ', {
    en: 'where from',
    ko: '어디서 (출발)',
    ja: 'どこから',
    zh: '从哪里',
    fr: 'd’où',
    es: 'de dónde',
    de: 'woher',
    ru: 'откуда',
  }),
  pack('cuando', 'cuándo', 'kwan-do', '쿠안도', 'クアンド', {
    en: 'when',
    ko: '언제',
    ja: 'いつ',
    zh: '什么时候',
    fr: 'quand',
    es: 'cuándo',
    de: 'wann',
    ru: 'когда',
  }),
  pack('porque', 'por qué', 'por keh', '포르 케', 'ポル・ケ', {
    en: 'why (two words; ≠ porque “because”)',
    ko: '왜 (두 단어; porque「왜냐하면」과 다름)',
    ja: 'なぜ（二語。porque「なぜなら」と別）',
    zh: '为什么（两词；≠ porque“因为”）',
    fr: 'pourquoi (≠ porque « parce que »)',
    es: 'por qué (≠ porque)',
    de: 'warum (≠ porque „weil“)',
    ru: 'почему (≠ porque «потому что»)',
  }),
  pack('como', 'cómo', 'ko-mo', '코모', 'コモ', {
    en: 'how',
    ko: '어떻게',
    ja: 'どう / どのように',
    zh: '怎么 / 如何',
    fr: 'comment',
    es: 'cómo',
    de: 'wie',
    ru: 'как',
  }),
  pack('cuanto', 'cuánto', 'kwan-to', '쿠안토', 'クアント', {
    en: 'how much (masculine singular)',
    ko: '얼마 (남성 단수)',
    ja: 'いくら（男性単数）',
    zh: '多少（阳性单数）',
    fr: 'combien (masculin)',
    es: 'cuánto',
    de: 'wie viel (mask.)',
    ru: 'сколько (м. р.)',
  }),
  pack('cuantos', 'cuántos', 'kwan-tos', '쿠안토스', 'クアントス', {
    en: 'how many (masculine plural)',
    ko: '몇 (남성 복수)',
    ja: 'いくつ（男性複数）',
    zh: '多少（阳性复数）',
    fr: 'combien (pluriel masculin)',
    es: 'cuántos',
    de: 'wie viele (mask.)',
    ru: 'сколько (м. р. мн.)',
  }),
  pack('cual', 'cuál', 'kwal/cuál', '쿠알', 'クアル', {
    en: 'which / which one (singular)',
    ko: '어느 / 어느 것 (단수)',
    ja: 'どれ／どの（単数）',
    zh: '哪个（单数）',
    fr: 'lequel / quel',
    es: 'cuál',
    de: 'welch- / welcher',
    ru: 'какой / который',
  }),
  pack('cuales', 'cuáles', 'kwa-les', '쿠알레스', 'クアレス', {
    en: 'which / which ones (plural)',
    ko: '어느 / 어느 것들 (복수)',
    ja: 'どれ／どの（複数）',
    zh: '哪些（复数）',
    fr: 'lesquels / quels',
    es: 'cuáles',
    de: 'welche',
    ru: 'какие / которые',
  }),
]

const formCols = [
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

const chartCols = [
  {
    key: 'type',
    labels: loc({
      en: 'Ask about',
      ko: '묻는 것',
      ja: '尋ねる内容',
      zh: '询问内容',
      fr: 'Demande',
      es: 'Pregunta',
      de: 'Fragt nach',
      ru: 'О чём',
    }),
  },
  {
    key: 'forms',
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
]

const table = {
  table_id: 'es_questions_ref',
  title: loc({
    en: 'Question words',
    ko: '필수 의문사',
    ja: '疑問詞',
    zh: '疑问词',
    fr: 'Mots interrogatifs',
    es: 'Palabras interrogativas',
    de: 'Fragewörter',
    ru: 'Вопросительные слова',
  }),
  note: loc({
    en: 'Interrogatives take a written accent (qué, dónde…). por qué ≠ porque.',
    ko: '의문사는 악센트(qué, dónde…). por qué ≠ porque.',
    ja: '疑問詞にはアクセント（qué, dónde…）。por qué ≠ porque。',
    zh: '疑问词带重音（qué, dónde…）。por qué ≠ porque。',
    fr: 'Accent écrit sur les interrogatifs. por qué ≠ porque.',
    es: 'Tilde en interrogativos. por qué ≠ porque.',
    de: 'Akzent auf Fragewörtern. por qué ≠ porque.',
    ru: 'Ударение на вопросительных. por qué ≠ porque.',
  }),
  rules: {
    en: [
      'por qué = why (question); porque = because (answer).',
      'dónde = location; adónde / a dónde = direction to; de dónde = from.',
      'qué ≈ “what”; cuál ≈ “which (one)” — often before ser / choices.',
      'cuánto/a/os/as agree in gender and number with the noun.',
    ],
    ko: [
      'por qué = 왜(질문); porque = 왜냐하면(대답).',
      'dónde = 장소; adónde = 가는 방향; de dónde = 출발.',
      'qué ≈ “무엇”; cuál ≈ “어느 것” — ser·선택 앞에 자주.',
      'cuánto/a/os/as는 명사 성·수에 일치.',
    ],
    ja: [
      'por qué＝なぜ（質問）、porque＝なぜなら（答え）。',
      'dónde＝場所、adónde＝行く方向、de dónde＝出発。',
      'qué≈「何」、cuál≈「どれ」— ser や選択の前に多い。',
      'cuánto などは名詞の性・数に一致。',
    ],
    zh: [
      'por qué＝为什么（问）；porque＝因为（答）。',
      'dónde＝地点；adónde＝去向；de dónde＝来处。',
      'qué≈“什么”；cuál≈“哪个” — 常在 ser／选择前。',
      'cuánto 等随后面名词性、数变化。',
    ],
    fr: [
      'por qué = pourquoi ; porque = parce que.',
      'dónde = lieu ; adónde = direction ; de dónde = provenance.',
      'qué ≈ « what » ; cuál ≈ « which ».',
      'cuánto… s’accorde en genre/nombre.',
    ],
    es: [
      'por qué = why; porque = because.',
      'dónde = lugar; adónde = dirección; de dónde = origen.',
      'qué ≈ “what”; cuál ≈ “which”.',
      'cuánto… concuerda en género/número.',
    ],
    de: [
      'por qué = warum; porque = weil.',
      'dónde = Ort; adónde = wohin; de dónde = woher.',
      'qué ≈ „was“; cuál ≈ „welch-“.',
      'cuánto… richtet sich nach Genus/Numerus.',
    ],
    ru: [
      'por qué = почему; porque = потому что.',
      'dónde = место; adónde = куда; de dónde = откуда.',
      'qué ≈ «что»; cuál ≈ «какой/который».',
      'cuánto… согласуется по роду/числу.',
    ],
    it: [
      'por qué = perché (domanda); porque = perché (causa).',
      'dónde = luogo; adónde = direzione; de dónde = provenienza.',
      'qué ≈ «che»; cuál ≈ «quale».',
      'cuánto… concorda in genere/numero.',
    ],
  },
  sections: [
    {
      title: loc({
        en: 'Meaning chart',
        ko: '의미 표',
        ja: '意味表',
        zh: '意义表',
        fr: 'Tableau des sens',
        es: 'Cuadro de sentidos',
        de: 'Bedeutungstabelle',
        ru: 'Таблица смыслов',
      }),
      note: loc({
        en: '· separates related forms (number, direction, gender).',
        ko: '· 는 관련 형태(수·방향·성)를 이은 것입니다.',
        ja: '・は関連形（数・方向・性）の区切り。',
        zh: '· 连接相关形式（数、方向、性）。',
        fr: 'Le point médian sépare les formes liées.',
        es: 'El punto medio separa formas relacionadas.',
        de: 'Mittelpunkt trennt verwandte Formen.',
        ru: 'Точка разделяет связанные формы.',
      }),
      columns: chartCols,
      rows: [
        {
          type: loc({
            en: 'who',
            ko: '누구',
            ja: '誰',
            zh: '谁',
            fr: 'qui',
            es: 'quién',
            de: 'wer',
            ru: 'кто',
          }),
          forms: 'quién · quiénes',
        },
        {
          type: loc({
            en: 'what',
            ko: '무엇',
            ja: '何',
            zh: '什么',
            fr: 'quoi / que',
            es: 'qué',
            de: 'was',
            ru: 'что',
          }),
          forms: 'qué',
        },
        {
          type: loc({
            en: 'where',
            ko: '어디',
            ja: 'どこ',
            zh: '哪里',
            fr: 'où',
            es: 'dónde',
            de: 'wo',
            ru: 'где',
          }),
          forms: 'dónde · adónde · de dónde',
        },
        {
          type: loc({
            en: 'when',
            ko: '언제',
            ja: 'いつ',
            zh: '什么时候',
            fr: 'quand',
            es: 'cuándo',
            de: 'wann',
            ru: 'когда',
          }),
          forms: 'cuándo',
        },
        {
          type: loc({
            en: 'why',
            ko: '왜',
            ja: 'なぜ',
            zh: '为什么',
            fr: 'pourquoi',
            es: 'por qué',
            de: 'warum',
            ru: 'почему',
          }),
          forms: 'por qué',
        },
        {
          type: loc({
            en: 'how',
            ko: '어떻게',
            ja: 'どう',
            zh: '怎么',
            fr: 'comment',
            es: 'cómo',
            de: 'wie',
            ru: 'как',
          }),
          forms: 'cómo',
        },
        {
          type: loc({
            en: 'how much / many',
            ko: '얼마 / 몇',
            ja: 'いくら / いくつ',
            zh: '多少',
            fr: 'combien',
            es: 'cuánto',
            de: 'wie viel',
            ru: 'сколько',
          }),
          forms: 'cuánto · cuánta · cuántos · cuántas',
        },
        {
          type: loc({
            en: 'which',
            ko: '어느',
            ja: 'どの / どれ',
            zh: '哪个',
            fr: 'quel / lequel',
            es: 'cuál',
            de: 'welch-',
            ru: 'какой',
          }),
          forms: 'cuál · cuáles',
        },
      ],
    },
    {
      title: loc({
        en: 'Forms',
        ko: '형태 목록',
        ja: '語形一覧',
        zh: '词形列表',
        fr: 'Liste des formes',
        es: 'Lista de formas',
        de: 'Formenliste',
        ru: 'Список форм',
      }),
      columns: formCols,
      rows: ITEMS.map((p) => p.row),
    },
  ],
}

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(
  join(OUT_DIR, 'questions.json'),
  `${JSON.stringify(
    ITEMS.map((p) => p.quiz),
    null,
    2,
  )}\n`,
)
writeFileSync(join(OUT_DIR, 'questions.table.json'), `${JSON.stringify(table, null, 2)}\n`)
console.log(`es questions ok — ${ITEMS.length} cards`)
