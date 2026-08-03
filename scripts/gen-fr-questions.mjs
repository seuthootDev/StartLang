/**
 * Generate French question-word quiz + reference table.
 * Run: node scripts/gen-fr-questions.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/fr')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

function sounds(en, ko, ja, form) {
  return loc({
    en,
    ko,
    ja,
    zh: en,
    fr: form,
    es: en,
    de: en,
    ru: en,
  })
}

function pack(id, form, en, ko, ja, meaning) {
  const sound = sounds(en, ko, ja, form)
  const meaningLoc = loc(meaning)
  return {
    quiz: {
      quiz_id: `fr_questions_${id}`,
      question_word: form,
      pronunciations: sound,
      translations: meaningLoc,
    },
    row: { form, meaning: meaningLoc, sound },
  }
}

const ITEMS = [
  pack('qui', 'qui', 'kee/qui', '키', 'キ', {
    en: 'who',
    ko: '누구',
    ja: '誰',
    zh: '谁',
    fr: 'qui',
    es: 'quién',
    de: 'wer',
    ru: 'кто',
  }),
  pack('que', 'que', 'kuh/que', '크', 'ク', {
    en: 'what (object; becomes qu’ before a vowel)',
    ko: '무엇 (목적어; 모음 앞 qu’)',
    ja: '何（目的語・母音の前は qu’）',
    zh: '什么（作宾语；元音前写 qu’）',
    fr: 'que / qu’ (objet)',
    es: 'qué (objeto; qu’ delante de vocal)',
    de: 'was (Objekt; qu’ vor Vokal)',
    ru: 'что (дополнение; qu’ перед гласной)',
  }),
  pack('quoi', 'quoi', 'kwah/quoi', '쿠아', 'クワ', {
    en: 'what (after a preposition / alone)',
    ko: '무엇 (전치사 뒤·단독)',
    ja: '何（前置詞のあと・単独）',
    zh: '什么（介词后/单独）',
    fr: 'quoi (après préposition / seul)',
    es: 'qué (tras preposición / solo)',
    de: 'was (nach Präposition / allein)',
    ru: 'что (после предлога / отдельно)',
  }),
  pack('ou', 'où', 'oo/où', '우', 'ウ', {
    en: 'where',
    ko: '어디',
    ja: 'どこ',
    zh: '哪里',
    fr: 'où',
    es: 'dónde',
    de: 'wo / wohin',
    ru: 'где / куда',
  }),
  pack('dou', "d'où", 'doo/d’où', '두', 'ドゥ', {
    en: 'where from',
    ko: '어디서 (출발)',
    ja: 'どこから',
    zh: '从哪里',
    fr: 'd’où',
    es: 'de dónde',
    de: 'woher',
    ru: 'откуда',
  }),
  pack('quand', 'quand', 'kon/quand', '캉', 'カン', {
    en: 'when',
    ko: '언제',
    ja: 'いつ',
    zh: '什么时候',
    fr: 'quand',
    es: 'cuándo',
    de: 'wann',
    ru: 'когда',
  }),
  pack('pourquoi', 'pourquoi', 'poor-kwah', '푸르쿠아', 'プルクワ', {
    en: 'why',
    ko: '왜',
    ja: 'なぜ',
    zh: '为什么',
    fr: 'pourquoi',
    es: 'por qué',
    de: 'warum',
    ru: 'почему / зачем',
  }),
  pack('comment', 'comment', 'ko-mon/comment', '코멍', 'コモン', {
    en: 'how',
    ko: '어떻게',
    ja: 'どう / どのように',
    zh: '怎么 / 如何',
    fr: 'comment',
    es: 'cómo',
    de: 'wie',
    ru: 'как',
  }),
  pack('combien', 'combien', 'kom-byan', '콩비앙', 'コンビアン', {
    en: 'how much / how many',
    ko: '얼마 / 몇',
    ja: 'いくら / いくつ',
    zh: '多少',
    fr: 'combien',
    es: 'cuánto / cuántos',
    de: 'wie viel / wie viele',
    ru: 'сколько',
  }),
  pack('quel', 'quel', 'kel/quel', '켈', 'ケル', {
    en: 'which / what (masculine singular + noun)',
    ko: '어떤·어느 (남성 단수 + 명사)',
    ja: 'どの／どんな（男性単数＋名詞）',
    zh: '哪个／什么（阳性单数＋名词）',
    fr: 'quel (+ nom masculin)',
    es: 'qué / cuál (masculino singular + sustantivo)',
    de: 'welch- (mask. Singular + Nomen)',
    ru: 'какой (+ сущ. м. р.)',
  }),
  pack('quelle', 'quelle', 'kel/quelle', '켈', 'ケル', {
    en: 'which / what (feminine singular + noun)',
    ko: '어떤·어느 (여성 단수 + 명사)',
    ja: 'どの／どんな（女性単数＋名詞）',
    zh: '哪个／什么（阴性单数＋名词）',
    fr: 'quelle (+ nom féminin)',
    es: 'qué / cuál (femenino singular + sustantivo)',
    de: 'welch- (fem. Singular + Nomen)',
    ru: 'какая (+ сущ. ж. р.)',
  }),
  pack('questceque', "qu'est-ce que", 'kes-kuh', '케스커', 'ケスク', {
    en: 'what (common spoken; + subject + verb)',
    ko: '무엇 (구어 기본; + 주어 + 동사)',
    ja: '何（口語の基本・主語＋動詞）',
    zh: '什么（口语常用；+主语+动词）',
    fr: 'qu’est-ce que (+ sujet + verbe)',
    es: 'qué (hablado; + sujeto + verbo)',
    de: 'was (gesprochen; + Subjekt + Verb)',
    ru: 'что (разг.; + подлежащее + глагол)',
  }),
  pack('questcequi', "qu'est-ce qui", 'kes-kee', '케스키', 'ケスキ', {
    en: 'what (as subject of the verb)',
    ko: '무엇이 (주어 역할)',
    ja: '何が（主語）',
    zh: '什么（作主语）',
    fr: 'qu’est-ce qui (sujet)',
    es: 'qué (como sujeto)',
    de: 'was (als Subjekt)',
    ru: 'что (как подлежащее)',
  }),
  pack('quiestceque', 'qui est-ce que', 'kee es-kuh', '키 에스커', 'キ・エスク', {
    en: 'who (object / “who is it that…”)',
    ko: '누구를·누구를요 (목적어 / “누가 …하는가”)',
    ja: '誰を／誰が…か（目的語寄り）',
    zh: '谁（作宾语／“是谁…”）',
    fr: 'qui est-ce que (objet)',
    es: 'quién (objeto / “quién es el que…”)',
    de: 'wen / wer (Objekt)',
    ru: 'кого / кто (дополнение)',
  }),
]

const formCols = [
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
]

const table = {
  table_id: 'fr_questions_ref',
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
    en: 'Learn the meaning chart first. que/quoi and qu’est-ce que… are the French “what” traps.',
    ko: '먼저 의미 표. que·quoi와 qu’est-ce que…가 프랑스어 “무엇”의 함정입니다.',
    ja: '先に意味表。que／quoi と qu’est-ce que… が「何」の落とし穴。',
    zh: '先看意义表。que/quoi 与 qu’est-ce que… 是法语“什么”的易错点。',
    fr: 'D’abord le tableau. que/quoi et qu’est-ce que… = pièges de « what ».',
    es: 'Primero el cuadro. que/quoi y qu’est-ce que… = trampas de «qué».',
    de: 'Zuerst die Tabelle. que/quoi und qu’est-ce que… = „was“-Fallen.',
    ru: 'Сначала таблица. que/quoi и qu’est-ce que… — ловушки «что».',
  }),
  rules: {
    en: [
      'que (→ qu’) before a verb phrase; quoi after a preposition or alone (avec quoi ?).',
      'qu’est-ce que + subject + verb is the everyday “what …?” pattern.',
      'qu’est-ce qui when “what” is the subject (Qu’est-ce qui se passe ?).',
      'quel / quelle (/ quels / quelles) agree with the following noun.',
      'combien de + noun for “how many/much of …” (combien de livres ?).',
    ],
    ko: [
      '동사구 앞은 que(→ qu’), 전치사 뒤·단독은 quoi (avec quoi ?).',
      '일상 “뭐 …?”는 qu’est-ce que + 주어 + 동사.',
      '“무엇이”가 주어면 qu’est-ce qui (Qu’est-ce qui se passe ?).',
      'quel / quelle (/ quels / quelles)는 뒤 명사에 성·수 일치.',
      '“몇/얼마의 …”는 combien de + 명사.',
    ],
    ja: [
      '動詞句の前は que（→ qu’）、前置詞のあと・単独は quoi。',
      '日常の「何…？」は qu’est-ce que ＋主語＋動詞。',
      '「何が」主語なら qu’est-ce qui。',
      'quel / quelle（／quels / quelles）は後ろの名詞に一致。',
      '「いくつの…」は combien de ＋名詞。',
    ],
    zh: [
      '动词短语前用 que（→ qu’）；介词后或单独用 quoi。',
      '口语“什么…？”常用 qu’est-ce que + 主语 + 动词。',
      '“什么”作主语时用 qu’est-ce qui。',
      'quel / quelle（／quels / quelles）随后面名词性、数变化。',
      '“多少…”用 combien de + 名词。',
    ],
    fr: [
      'que (→ qu’) devant un verbe ; quoi après préposition ou seul.',
      'qu’est-ce que + sujet + verbe = « what … ? » courant.',
      'qu’est-ce qui si « what » est sujet.',
      'quel / quelle (/ quels / quelles) s’accordent avec le nom.',
      'combien de + nom.',
    ],
    es: [
      'que (→ qu’) ante verbo; quoi tras preposición o solo.',
      'qu’est-ce que + sujeto + verbo = «qué…?» cotidiano.',
      'qu’est-ce qui si «qué» es sujeto.',
      'quel / quelle concuerdan con el sustantivo.',
      'combien de + sustantivo.',
    ],
    de: [
      'que (→ qu’) vor Verb; quoi nach Präposition oder allein.',
      'qu’est-ce que + Subjekt + Verb = alltägliches „was …?“.',
      'qu’est-ce qui, wenn „was“ Subjekt ist.',
      'quel / quelle richten sich nach dem Nomen.',
      'combien de + Nomen.',
    ],
    ru: [
      'que (→ qu’) перед глаголом; quoi после предлога или отдельно.',
      'qu’est-ce que + подлежащее + глагол — обычное «что…?».',
      'qu’est-ce qui, если «что» — подлежащее.',
      'quel / quelle согласуются с существительным.',
      'combien de + сущ.',
    ],
    it: [
      'que (→ qu’) prima del verbo; quoi dopo preposizione o da solo.',
      'qu’est-ce que + soggetto + verbo = «che…?» quotidiano.',
      'qu’est-ce qui se «che» è soggetto.',
      'quel / quelle concordano col nome.',
      'combien de + nome.',
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
        en: '· separates related forms (que/quoi, quel/quelle, est-ce patterns).',
        ko: '· 는 관련 형태(que/quoi, quel/quelle, est-ce 패턴)를 이은 것입니다.',
        ja: '・は関連形（que/quoi、quel/quelle、est-ce）の区切り。',
        zh: '· 连接相关形式（que/quoi、quel/quelle、est-ce）。',
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
          forms: 'qui · qui est-ce que',
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
          forms: 'que · quoi · qu’est-ce que · qu’est-ce qui',
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
          forms: 'où · d’où',
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
          forms: 'quand',
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
          forms: 'pourquoi',
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
          forms: 'comment',
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
          forms: 'combien · combien de …',
        },
        {
          type: loc({
            en: 'which / what kind',
            ko: '어느 / 어떤',
            ja: 'どの / どんな',
            zh: '哪个 / 什么样的',
            fr: 'quel',
            es: 'cuál / qué',
            de: 'welch-',
            ru: 'какой',
          }),
          forms: 'quel · quelle · quels · quelles',
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
console.log(`fr questions ok — ${ITEMS.length} cards`)
