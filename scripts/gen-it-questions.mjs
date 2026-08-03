/**
 * Generate Italian question-word quiz + reference table.
 * Run: node scripts/gen-it-questions.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/it')

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
    es: en,
    de: en,
    ru: en,
    it: form,
  })
}

function pack(id, form, en, ko, ja, meaning) {
  const sound = sounds(en, ko, ja, form)
  const meaningLoc = loc(meaning)
  return {
    quiz: {
      quiz_id: `it_questions_${id}`,
      question_word: form,
      pronunciations: sound,
      translations: meaningLoc,
    },
    row: { form, meaning: meaningLoc, sound },
  }
}

const ITEMS = [
  pack('chi', 'chi', 'kee/chi', '키', 'キ', {
    en: 'who',
    ko: '누구',
    ja: '誰',
    zh: '谁',
    fr: 'qui',
    es: 'quién',
    de: 'wer',
    ru: 'кто',
    it: 'chi',
  }),
  pack('che', 'che', 'keh/che', '케', 'ケ', {
    en: 'what / which (often + noun; also relative “that”)',
    ko: '무엇·어떤 (+ 명사; 관계절 “~하는”도)',
    ja: '何／どの（＋名詞。関係詞「〜する」も）',
    zh: '什么／哪个（+名词；也作关系词）',
    fr: 'que / quel (souvent + nom)',
    es: 'qué / que',
    de: 'was / welch-',
    ru: 'что / какой',
    it: 'che',
  }),
  pack('cosa', 'cosa', 'ko-za', '코자', 'コザ', {
    en: 'what (thing; often che cosa / cosa)',
    ko: '무엇 (사물; che cosa / cosa)',
    ja: '何（もの・che cosa／cosa）',
    zh: '什么（事物；常说 che cosa／cosa）',
    fr: 'quoi / que',
    es: 'qué',
    de: 'was',
    ru: 'что',
    it: 'cosa',
  }),
  pack('checosa', 'che cosa', 'keh ko-za', '케 코자', 'ケ・コザ', {
    en: 'what (full form; very common)',
    ko: '무엇 (풀 형태·매우 흔함)',
    ja: '何（完全形・とても多い）',
    zh: '什么（完整形式，极常用）',
    fr: 'qu’est-ce que / quoi',
    es: 'qué',
    de: 'was',
    ru: 'что',
    it: 'che cosa',
  }),
  pack('dove', 'dove', 'do-ve', '도베', 'ドヴェ', {
    en: 'where (location / often also “where to”)',
    ko: '어디 (장소; 방향에도 자주 씀)',
    ja: 'どこ（場所・行く方向にも）',
    zh: '哪里（地点；也常表去向）',
    fr: 'où',
    es: 'dónde / adónde',
    de: 'wo / wohin',
    ru: 'где / куда',
    it: 'dove',
  }),
  pack('dadove', 'da dove', 'da do-ve', '다 도베', 'ダ・ドヴェ', {
    en: 'where from',
    ko: '어디서 (출발)',
    ja: 'どこから',
    zh: '从哪里',
    fr: 'd’où',
    es: 'de dónde',
    de: 'woher',
    ru: 'откуда',
    it: 'da dove',
  }),
  pack('quando', 'quando', 'kwan-do', '콴도', 'クアンド', {
    en: 'when',
    ko: '언제',
    ja: 'いつ',
    zh: '什么时候',
    fr: 'quand',
    es: 'cuándo',
    de: 'wann',
    ru: 'когда',
    it: 'quando',
  }),
  pack('perche', 'perché', 'per-keh', '페르케', 'ペルケ', {
    en: 'why (same spelling as “because”)',
    ko: '왜 (「왜냐하면」과 철자 동일)',
    ja: 'なぜ（「なぜなら」と同じつづり）',
    zh: '为什么（与“因为”同形）',
    fr: 'pourquoi (même orthographe que « parce que » en italien)',
    es: 'por qué (= porque en italiano: perché)',
    de: 'warum (gleiche Schreibweise wie „weil“: perché)',
    ru: 'почему (то же написание, что «потому что»: perché)',
    it: 'perché (anche = perché «perché»)',
  }),
  pack('come', 'come', 'ko-me', '코메', 'コメ', {
    en: 'how',
    ko: '어떻게',
    ja: 'どう / どのように',
    zh: '怎么 / 如何',
    fr: 'comment',
    es: 'cómo',
    de: 'wie',
    ru: 'как',
    it: 'come',
  }),
  pack('quanto', 'quanto', 'kwan-to', '콴토', 'クアント', {
    en: 'how much (masculine singular)',
    ko: '얼마 (남성 단수)',
    ja: 'いくら（男性単数）',
    zh: '多少（阳性单数）',
    fr: 'combien (masculin)',
    es: 'cuánto',
    de: 'wie viel (mask.)',
    ru: 'сколько (м. р.)',
    it: 'quanto',
  }),
  pack('quanti', 'quanti', 'kwan-tee', '콴티', 'クアンティ', {
    en: 'how many (masculine plural)',
    ko: '몇 (남성 복수)',
    ja: 'いくつ（男性複数）',
    zh: '多少（阳性复数）',
    fr: 'combien (pluriel masculin)',
    es: 'cuántos',
    de: 'wie viele (mask.)',
    ru: 'сколько (м. р. мн.)',
    it: 'quanti',
  }),
  pack('quale', 'quale', 'kwa-le', '콸레', 'クアーレ', {
    en: 'which / which one (singular)',
    ko: '어느 / 어느 것 (단수)',
    ja: 'どれ／どの（単数）',
    zh: '哪个（单数）',
    fr: 'quel / lequel',
    es: 'cuál',
    de: 'welch- / welcher',
    ru: 'какой / который',
    it: 'quale',
  }),
  pack('quali', 'quali', 'kwa-lee', '콸리', 'クアーリ', {
    en: 'which / which ones (plural)',
    ko: '어느 / 어느 것들 (복수)',
    ja: 'どれ／どの（複数）',
    zh: '哪些（复数）',
    fr: 'quels / lesquels',
    es: 'cuáles',
    de: 'welche',
    ru: 'какие / которые',
    it: 'quali',
  }),
]

const formCols = [
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
      it: 'Chiede',
    }),
  },
  {
    key: 'forms',
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
]

const table = {
  table_id: 'it_questions_ref',
  title: loc({
    en: 'Question words',
    ko: '필수 의문사',
    ja: '疑問詞',
    zh: '疑问词',
    fr: 'Mots interrogatifs',
    es: 'Palabras interrogativas',
    de: 'Fragewörter',
    ru: 'Вопросительные слова',
    it: 'Parole interrogative',
  }),
  note: loc({
    en: 'perché means both “why?” and “because”. che cosa / cosa / che all ask “what”.',
    ko: 'perché는 「왜?」와 「왜냐하면」 둘 다. che cosa / cosa / che는 모두 「무엇」.',
    ja: 'perché は「なぜ？」と「なぜなら」。che cosa／cosa／che はどれも「何」。',
    zh: 'perché 既是“为什么？”也是“因为”。che cosa／cosa／che 都表“什么”。',
    fr: 'perché = pourquoi et parce que. che cosa / cosa / che = « what ».',
    es: 'perché = por qué y porque. che cosa / cosa / che = « qué ».',
    de: 'perché = warum und weil. che cosa / cosa / che = „was“.',
    ru: 'perché = почему и потому что. che cosa / cosa / che = «что».',
    it: 'perché = «perché?» e «perché». che cosa / cosa / che = «che cosa».',
  }),
  rules: {
    en: [
      'perché? = why; perché… = because (same word — context decides).',
      'dove covers location and often direction; da dove = from where.',
      'che cosa / cosa / che ≈ “what”; quale ≈ “which (one)” among options.',
      'quanto/a/i/e agree in gender and number with the noun.',
    ],
    ko: [
      'perché? = 왜; perché… = 왜냐하면 (같은 단어 — 문맥).',
      'dove는 장소·방향 모두; da dove = 출발.',
      'che cosa / cosa / che ≈ “무엇”; quale ≈ “어느 것”.',
      'quanto/a/i/e는 명사 성·수에 일치.',
    ],
    ja: [
      'perché?＝なぜ、perché…＝なぜなら（同じ語・文脈）。',
      'dove は場所・方向。da dove＝出発。',
      'che cosa／cosa／che≈「何」、quale≈「どれ」。',
      'quanto などは名詞の性・数に一致。',
    ],
    zh: [
      'perché?＝为什么；perché…＝因为（同形，看语境）。',
      'dove 表地点，也常表去向；da dove＝从哪里。',
      'che cosa／cosa／che≈“什么”；quale≈“哪个”。',
      'quanto 等随后面名词性、数变化。',
    ],
    fr: [
      'perché ? = pourquoi ; perché… = parce que.',
      'dove = lieu (souvent direction) ; da dove = provenance.',
      'che cosa / cosa / che ≈ « what » ; quale ≈ « which ».',
      'quanto… s’accorde en genre/nombre.',
    ],
    es: [
      'perché? = por qué; perché… = porque.',
      'dove = lugar (a menudo dirección); da dove = origen.',
      'che cosa / cosa / che ≈ “qué”; quale ≈ “cuál”.',
      'quanto… concuerda en género/número.',
    ],
    de: [
      'perché? = warum; perché… = weil.',
      'dove = Ort (oft auch wohin); da dove = woher.',
      'che cosa / cosa / che ≈ „was“; quale ≈ „welch-“.',
      'quanto… richtet sich nach Genus/Numerus.',
    ],
    ru: [
      'perché? = почему; perché… = потому что.',
      'dove = место (часто и куда); da dove = откуда.',
      'che cosa / cosa / che ≈ «что»; quale ≈ «какой».',
      'quanto… согласуется по роду/числу.',
    ],
    it: [
      'perché? = perché; perché… = perché (stessa parola).',
      'dove = luogo (spesso anche direzione); da dove = provenienza.',
      'che cosa / cosa / che ≈ «che cosa»; quale ≈ «quale».',
      'quanto… concorda in genere/numero.',
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
        it: 'Tabella dei sensi',
      }),
      note: loc({
        en: '· separates related forms (number, gender, variants).',
        ko: '· 는 관련 형태(수·성·이형태)를 이은 것입니다.',
        ja: '・は関連形（数・性・異形）の区切り。',
        zh: '· 连接相关形式（数、性、变体）。',
        fr: 'Le point médian sépare les formes liées.',
        es: 'El punto medio separa formas relacionadas.',
        de: 'Mittelpunkt trennt verwandte Formen.',
        ru: 'Точка разделяет связанные формы.',
        it: 'Il punto medio separa forme collegate.',
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
            it: 'chi',
          }),
          forms: 'chi',
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
            it: 'che cosa',
          }),
          forms: 'che cosa · cosa · che',
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
            it: 'dove',
          }),
          forms: 'dove · da dove',
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
            it: 'quando',
          }),
          forms: 'quando',
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
            it: 'perché',
          }),
          forms: 'perché',
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
            it: 'come',
          }),
          forms: 'come',
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
            it: 'quanto',
          }),
          forms: 'quanto · quanta · quanti · quante',
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
            it: 'quale',
          }),
          forms: 'quale · quali',
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
        it: 'Elenco delle forme',
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
console.log(`it questions ok — ${ITEMS.length} cards`)
