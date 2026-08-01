/**
 * Question-word quizzes + pronoun-style reference tables (chart + forms).
 * Upgrades ko/ja tables; creates ru quiz + table.
 * Run: node scripts/gen-questions-tables.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '../src/data')

const TITLE = {
  en: 'Question words',
  ko: '필수 의문사',
  ja: '疑問詞',
  zh: '疑问词',
  fr: 'Mots interrogatifs',
  es: 'Palabras interrogativas',
  de: 'Fragewörter',
  ru: 'Вопросительные слова',
}

const TYPE_LABELS = {
  who: {
    en: 'Who',
    ko: '누구',
    ja: '誰',
    zh: '谁',
    fr: 'Qui',
    es: 'Quién',
    de: 'Wer',
    ru: 'Кто',
  },
  what: {
    en: 'What',
    ko: '무엇',
    ja: '何',
    zh: '什么',
    fr: 'Quoi',
    es: 'Qué',
    de: 'Was',
    ru: 'Что',
  },
  where: {
    en: 'Where',
    ko: '어디',
    ja: 'どこ',
    zh: '哪里',
    fr: 'Où',
    es: 'Dónde',
    de: 'Wo',
    ru: 'Где',
  },
  when: {
    en: 'When',
    ko: '언제',
    ja: 'いつ',
    zh: '何时',
    fr: 'Quand',
    es: 'Cuándo',
    de: 'Wann',
    ru: 'Когда',
  },
  why: {
    en: 'Why',
    ko: '왜',
    ja: 'なぜ',
    zh: '为什么',
    fr: 'Pourquoi',
    es: 'Por qué',
    de: 'Warum',
    ru: 'Почему',
  },
  how: {
    en: 'How',
    ko: '어떻게',
    ja: 'どう',
    zh: '怎么',
    fr: 'Comment',
    es: 'Cómo',
    de: 'Wie',
    ru: 'Как',
  },
  amount: {
    en: 'How much / many',
    ko: '얼마·몇',
    ja: 'いくら・いくつ',
    zh: '多少',
    fr: 'Combien',
    es: 'Cuánto',
    de: 'Wie viel',
    ru: 'Сколько',
  },
  which: {
    en: 'Which / what kind',
    ko: '어느·무슨·어떤',
    ja: 'どれ・どの・どんな',
    zh: '哪个 / 什么样',
    fr: 'Lequel / quel',
    es: 'Cuál / qué tipo',
    de: 'Welch- / was für',
    ru: 'Какой',
  },
  whose: {
    en: 'Whose',
    ko: '누구의',
    ja: '誰の',
    zh: '谁的',
    fr: 'À qui',
    es: 'De quién',
    de: 'Wessen',
    ru: 'Чей',
  },
}

const CHART_COLS = [
  {
    key: 'type',
    labels: {
      en: 'Ask about',
      ko: '묻는 것',
      ja: '尋ねる内容',
      zh: '询问内容',
      fr: 'Demande',
      es: 'Pregunta',
      de: 'Fragt nach',
      ru: 'О чём',
    },
  },
  {
    key: 'forms',
    labels: {
      en: 'Forms',
      ko: '형태',
      ja: '形',
      zh: '形式',
      fr: 'Formes',
      es: 'Formas',
      de: 'Formen',
      ru: 'Формы',
    },
  },
]

const FORM_COLS = (langKey) => [
  {
    key: 'form',
    labels: {
      en: langKey === 'ko' ? 'Korean' : langKey === 'ja' ? 'Japanese' : 'Russian',
      ko: langKey === 'ko' ? '한국어' : langKey === 'ja' ? '일본어' : '러시아어',
      ja: langKey === 'ko' ? '韓国語' : langKey === 'ja' ? '日本語' : 'ロシア語',
      zh: langKey === 'ko' ? '韩语' : langKey === 'ja' ? '日语' : '俄语',
      fr: langKey === 'ko' ? 'Coréen' : langKey === 'ja' ? 'Japonais' : 'Russe',
      es: langKey === 'ko' ? 'Coreano' : langKey === 'ja' ? 'Japonés' : 'Ruso',
      de: langKey === 'ko' ? 'Koreanisch' : langKey === 'ja' ? 'Japanisch' : 'Russisch',
      ru: langKey === 'ko' ? 'Корейский' : langKey === 'ja' ? 'Японский' : 'Русский',
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

function formsTitle() {
  return {
    en: 'Forms & sounds',
    ko: '형태와 발음',
    ja: '語形と読み',
    zh: '词形与读音',
    fr: 'Formes et sons',
    es: 'Formas y sonidos',
    de: 'Formen & Laute',
    ru: 'Формы и звучание',
  }
}

function chartTitle() {
  return {
    en: 'Meaning chart',
    ko: '의미 표',
    ja: '意味表',
    zh: '意义表',
    fr: 'Tableau des sens',
    es: 'Cuadro de sentidos',
    de: 'Bedeutungstabelle',
    ru: 'Таблица смыслов',
  }
}

function quizToRows(quiz) {
  return quiz.map((e) => ({
    form: e.question_word,
    meaning: e.translations,
    sound: e.pronunciations,
  }))
}

function buildTable({ tableId, note, rules, chartNote, chartRows, quiz, langKey }) {
  return {
    table_id: tableId,
    title: TITLE,
    note,
    rules,
    sections: [
      {
        title: chartTitle(),
        note: chartNote,
        columns: CHART_COLS,
        rows: chartRows.map(([typeKey, forms]) => ({
          type: TYPE_LABELS[typeKey],
          forms,
        })),
      },
      {
        title: formsTitle(),
        columns: FORM_COLS(langKey),
        rows: quizToRows(quiz),
      },
    ],
  }
}

function writeJson(rel, data) {
  const full = path.join(dataDir, rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, `${JSON.stringify(data, null, 2)}\n`)
}

// —— Korean / Japanese: upgrade tables from existing quizzes ——
const koQuiz = JSON.parse(fs.readFileSync(path.join(dataDir, 'ko/questions.json'), 'utf8'))
const jaQuiz = JSON.parse(fs.readFileSync(path.join(dataDir, 'ja/questions.json'), 'utf8'))

writeJson(
  'ko/questions.table.json',
  buildTable({
    tableId: 'ko_questions_ref',
    langKey: 'ko',
    note: {
      en: 'Learn the meaning chart first, then the form list — like the pronoun tables.',
      ko: '인칭대명사 표처럼 먼저 의미 표를 보고, 이어서 형태·발음 목록을 외우세요.',
      ja: '人称代名詞の表と同じく、先に意味表、次に語形一覧です。',
      zh: '先看意义表，再记词形列表（与人称代词表相同）。',
      fr: 'D’abord le tableau des sens, puis la liste des formes.',
      es: 'Primero el cuadro de sentidos, luego la lista de formas.',
      de: 'Zuerst die Bedeutungstabelle, dann die Formenliste.',
      ru: 'Сначала таблица смыслов, затем список форм — как у местоимений.',
    },
    rules: {
      en: [
        '무엇 is the full form; 뭐 is the everyday casual form of “what”.',
        '몇 comes before counters/nouns (몇 명, 몇 시). 얼마 asks about price.',
        '무슨 / 어떤 modify a noun (“what kind of …”); 어느 is closer to “which”.',
      ],
      ko: [
        '무엇은 기본형, 뭐는 일상 회화형입니다.',
        '몇은 명사·단위 앞에 붙습니다(몇 명, 몇 시). 얼마는 주로 가격.',
        '무슨·어떤은 명사를 꾸미고, 어느는 “어느 쪽/어느 것”에 가깝습니다.',
      ],
      ja: [
        '「무엇」が基本形、「뭐」が日常の「何」。',
        '「몇」は名詞・助数詞の前。「얼마」は値段。',
        '「무슨・어떤」は名詞を修飾。「어느」は「どの／どちら」寄り。',
      ],
      zh: [
        '무엇是完整形式，뭐是口语“什么”。',
        '몇放在量词/名词前；얼마多问价格。',
        '무슨/어떤修饰名词；어느更接近“哪”。',
      ],
      fr: [
        '무엇 = forme pleine ; 뭐 = « quoi » familier.',
        '몇 devant un nom/compteur ; 얼마 pour le prix.',
        '무슨 / 어떤 + nom ; 어느 ≈ « lequel ».',
      ],
      es: [
        '무엇 es la forma completa; 뭐 es el «qué» cotidiano.',
        '몇 delante de sustantivos/contadores; 얼마 es el precio.',
        '무슨 / 어떤 + sustantivo; 어느 ≈ «cuál».',
      ],
      de: [
        '무엇 = Vollform; 뭐 = umgangssprachliches «was».',
        '몇 vor Nomen/Zähleinheiten; 얼마 für den Preis.',
        '무슨 / 어떤 + Nomen; 어느 ≈ «welch-».',
      ],
      ru: [
        '무엇 — полная форма; 뭐 — разговорное «что».',
        '몇 перед существительным/счётным словом; 얼마 — цена.',
        '무슨 / 어떤 + сущ.; 어느 ≈ «какой/который».',
      ],
    },
    chartNote: {
      en: '· separates everyday variants.',
      ko: '· 로 이은 것은 변이형입니다.',
      ja: '・は変異形の区切りです。',
      zh: '· 分隔变体。',
      fr: 'Le point médian sépare les variantes.',
      es: 'El punto medio separa variantes.',
      de: 'Mittelpunkt trennt Varianten.',
      ru: 'Точка разделяет варианты.',
    },
    chartRows: [
      ['who', '누구'],
      ['what', '무엇 · 뭐'],
      ['where', '어디'],
      ['when', '언제'],
      ['why', '왜'],
      ['how', '어떻게'],
      ['amount', '얼마 · 몇'],
      ['which', '어느 · 무슨 · 어떤'],
    ],
    quiz: koQuiz,
  }),
)

writeJson(
  'ja/questions.table.json',
  buildTable({
    tableId: 'ja_questions_ref',
    langKey: 'ja',
    note: {
      en: 'Learn the meaning chart first, then the form list — like the pronoun tables.',
      ko: '인칭대명사 표처럼 먼저 의미 표를 보고, 이어서 형태·발음 목록을 외우세요.',
      ja: '人称代名詞の表と同じく、先に意味表、次に語形一覧です。',
      zh: '先看意义表，再记词形列表（与人称代词表相同）。',
      fr: 'D’abord le tableau des sens, puis la liste des formes.',
      es: 'Primero el cuadro de sentidos, luego la lista de formas.',
      de: 'Zuerst die Bedeutungstabelle, dann die Formenliste.',
      ru: 'Сначала таблица смыслов, затем список форм — как у местоимений.',
    },
    rules: {
      en: [
        '何 is nani or nan — nan before many counters (何人, 何時).',
        'なぜ and どうして both mean “why”; どうして is common in speech.',
        'どれ = which (things); どの + noun; どちら = which of two / polite where.',
      ],
      ko: [
        '何은 なに 또는 난 — 조수사 앞에서는 난이 많습니다(何人, 何時).',
        'なぜ와 どうして 모두 “왜”; 회화에서는 どうして도 흔합니다.',
        'どれ는 어느 것; どの+명사; どちら는 둘 중 / 공손한 “어디”.',
      ],
      ja: [
        '「何」は「なに／なん」。助数詞の前は「なん」が多い。',
        '「なぜ」も「どうして」も理由。「どうして」は会話でよく使う。',
        '「どれ」は物事、「どの＋名詞」、「どちら」は二者・丁寧な場所。',
      ],
      zh: [
        '何读 nani 或 nan；量词前多为 nan。',
        'なぜ与どうして都是“为什么”；口语常见どうして。',
        'どれ=哪个；どの+名词；どちら=两者之一/礼貌的哪里。',
      ],
      fr: [
        '何 = nani / nan (nan devant beaucoup de compteurs).',
        'なぜ et どうして = pourquoi ; どうして est courant à l’oral.',
        'どれ = lequel ; どの + nom ; どちら = des deux / où poli.',
      ],
      es: [
        '何 = nani / nan (nan delante de muchos contadores).',
        'なぜ y どうして = por qué; どうして es frecuente al hablar.',
        'どれ = cuál; どの + sustantivo; どちら = de dos / dónde cortés.',
      ],
      de: [
        '何 = nani / nan (nan vor vielen Zahlwörtern).',
        'なぜ und どうして = warum; どうして ist mündlich häufig.',
        'どれ = welches; どの + Nomen; どちら = von zweien / höflich wo.',
      ],
      ru: [
        '何 = нани / нан (нан перед многими счётными словами).',
        'なぜ и どうして = почему; どうして часто в речи.',
        'どれ = который; どの + сущ.; どちら = из двух / вежливое «где».',
      ],
    },
    chartNote: {
      en: '· separates everyday variants.',
      ko: '· 로 이은 것은 변이형입니다.',
      ja: '・は変異形の区切りです。',
      zh: '· 分隔变体。',
      fr: 'Le point médian sépare les variantes.',
      es: 'El punto medio separa variantes.',
      de: 'Mittelpunkt trennt Varianten.',
      ru: 'Точка разделяет варианты.',
    },
    chartRows: [
      ['who', '誰'],
      ['what', '何'],
      ['where', 'どこ'],
      ['when', 'いつ'],
      ['why', 'なぜ · どうして'],
      ['how', 'どう'],
      ['amount', 'いくら · いくつ'],
      ['which', 'どれ · どの · どちら · どんな'],
    ],
    quiz: jaQuiz,
  }),
)

// —— Russian quiz + table ——
function sounds(en, ko, ja, form) {
  return { en, ko, ja, zh: en, fr: en, es: en, de: en, ru: form }
}

function q(id, form, meaning, en, ko, ja) {
  return {
    quiz_id: `ru_questions_${id}`,
    question_word: form,
    pronunciations: sounds(en, ko, ja, form),
    translations: meaning,
  }
}

const ruQuiz = [
  q(
    'kto',
    'кто',
    {
      en: 'who',
      ko: '누구',
      ja: '誰',
      zh: '谁',
      fr: 'qui',
      es: 'quién',
      de: 'wer',
      ru: 'кто',
    },
    'kto',
    '크토',
    'クト',
  ),
  q(
    'chto',
    'что',
    {
      en: 'what',
      ko: '무엇 / 뭐',
      ja: '何',
      zh: '什么',
      fr: 'quoi / que',
      es: 'qué',
      de: 'was',
      ru: 'что',
    },
    'chto',
    '쉬토',
    'シト',
  ),
  q(
    'gde',
    'где',
    {
      en: 'where (location)',
      ko: '어디 (장소)',
      ja: 'どこ（場所）',
      zh: '哪里（地点）',
      fr: 'où (lieu)',
      es: 'dónde (lugar)',
      de: 'wo (Ort)',
      ru: 'где',
    },
    'gde',
    '그제',
    'グジェ',
  ),
  q(
    'kuda',
    'куда',
    {
      en: 'where to / whither',
      ko: '어디로 (방향)',
      ja: 'どこへ（方向）',
      zh: '去哪里（方向）',
      fr: 'où (direction)',
      es: 'adónde',
      de: 'wohin',
      ru: 'куда',
    },
    'ku-da',
    '쿠다',
    'クダー',
  ),
  q(
    'otkuda',
    'откуда',
    {
      en: 'where from',
      ko: '어디에서 (출발)',
      ja: 'どこから',
      zh: '从哪里',
      fr: 'd’où',
      es: 'de dónde',
      de: 'woher',
      ru: 'откуда',
    },
    'ot-ku-da',
    '아트쿠다',
    'アトクダー',
  ),
  q(
    'kogda',
    'когда',
    {
      en: 'when',
      ko: '언제',
      ja: 'いつ',
      zh: '什么时候',
      fr: 'quand',
      es: 'cuándo',
      de: 'wann',
      ru: 'когда',
    },
    'kog-da',
    '칵다',
    'カグダー',
  ),
  q(
    'pochemu',
    'почему',
    {
      en: 'why (reason)',
      ko: '왜 (이유)',
      ja: 'なぜ（理由）',
      zh: '为什么（原因）',
      fr: 'pourquoi (raison)',
      es: 'por qué (razón)',
      de: 'warum (Grund)',
      ru: 'почему',
    },
    'po-che-mu',
    '파치무',
    'パチムー',
  ),
  q(
    'zachem',
    'зачем',
    {
      en: 'why / what for (purpose)',
      ko: '왜 / 무엇 하러 (목적)',
      ja: '何のために（目的）',
      zh: '为什么 / 为了什么（目的）',
      fr: 'pourquoi (but)',
      es: 'para qué',
      de: 'wozu (Zweck)',
      ru: 'зачем',
    },
    'za-chem',
    '자쳄',
    'ザーチェム',
  ),
  q(
    'kak',
    'как',
    {
      en: 'how',
      ko: '어떻게',
      ja: 'どう',
      zh: '怎么',
      fr: 'comment',
      es: 'cómo',
      de: 'wie',
      ru: 'как',
    },
    'kak',
    '칵',
    'カーク',
  ),
  q(
    'skolko',
    'сколько',
    {
      en: 'how much / how many',
      ko: '얼마 / 몇',
      ja: 'いくら / いくつ',
      zh: '多少',
      fr: 'combien',
      es: 'cuánto',
      de: 'wie viel',
      ru: 'сколько',
    },
    'skolʹ-ko',
    '스콜카',
    'スコーリカ',
  ),
  q(
    'kakoy',
    'какой',
    {
      en: 'which / what kind (masculine)',
      ko: '어떤 / 무슨 (남성)',
      ja: 'どんな / どの（男性）',
      zh: '哪个 / 什么样的（阳性）',
      fr: 'quel (masculin)',
      es: 'qué / cuál (masculino)',
      de: 'welch- (maskulin)',
      ru: 'какой',
    },
    'ka-koy',
    '카코이',
    'カコーイ',
  ),
  q(
    'kakaya',
    'какая',
    {
      en: 'which / what kind (feminine)',
      ko: '어떤 / 무슨 (여성)',
      ja: 'どんな / どの（女性）',
      zh: '哪个 / 什么样的（阴性）',
      fr: 'quelle (féminin)',
      es: 'qué / cuál (femenino)',
      de: 'welch- (feminin)',
      ru: 'какая',
    },
    'ka-ka-ya',
    '카카야',
    'カカーヤ',
  ),
  q(
    'chey',
    'чей',
    {
      en: 'whose (masculine)',
      ko: '누구의 (남성)',
      ja: '誰の（男性）',
      zh: '谁的（阳性）',
      fr: 'à qui (masculin)',
      es: 'de quién (masculino)',
      de: 'wessen (maskulin)',
      ru: 'чей',
    },
    'chey',
    '체이',
    'チェーイ',
  ),
]

writeJson('ru/questions.json', ruQuiz)

writeJson(
  'ru/questions.table.json',
  buildTable({
    tableId: 'ru_questions_ref',
    langKey: 'ru',
    note: {
      en: 'Russian splits “where” and “why”, and какой declines by gender. Chart first, then forms.',
      ko: '러시아어는 “어디/왜”가 갈라지고, какой는 성에 따라 변합니다. 의미 표 → 형태 목록.',
      ja: '「どこ／なぜ」が分かれ、какойは性で変化。先に意味表、次に語形。',
      zh: '俄语的“哪里/为什么”会细分，какой随性变化。先意义表，后词形。',
      fr: '« Où » et « pourquoi » se dédoublent ; какой s’accorde en genre.',
      es: '“Dónde” y “por qué” se dividen; какой cambia de género.',
      de: '„Wo“ und „warum“ sind gespalten; какой richtet sich nach dem Genus.',
      ru: 'Где/куда/откуда и почему/зачем различаются; какой согласуется по роду.',
    },
    rules: {
      en: [
        'где = at/in a place; куда = direction to; откуда = direction from.',
        'почему = reason; зачем = purpose (“what for”).',
        'какой / какая (and какое / какие) agree with the noun’s gender/number.',
        'кто and что also decline by case (кого, чего…) — later with cases.',
      ],
      ko: [
        'где = 장소; куда = 가는 방향; откуда = 오는 방향.',
        'почему = 이유; зачем = 목적(“무엇 하러”).',
        'какой / какая (и какое / какие)는 명사의 성·수에 맞춥니다.',
        'кто·что도 격변화(кого, чего…) — 격 단원에서 이어집니다.',
      ],
      ja: [
        'где＝場所、куда＝行く方向、откуда＝来る方向。',
        'почему＝理由、зачем＝目的。',
        'какой / какая（・какое / какие）は名詞の性・数に一致。',
        'кто・чтоも格変化（кого, чего…）— 格の単元で。',
      ],
      zh: [
        'где＝地点；куда＝去向；откуда＝来处。',
        'почему＝原因；зачем＝目的。',
        'какой / какая（及 какое / какие）随名词性、数变化。',
        'кто / что也有格变化（кого, чего…）— 见格单元。',
      ],
      fr: [
        'где = lieu ; куда = direction ; откуда = provenance.',
        'почему = cause ; зачем = but.',
        'какой / какая s’accordent en genre/nombre.',
        'кто / что déclinent aussi (кого, чего…) — avec les cas.',
      ],
      es: [
        'где = lugar; куда = hacia; откуда = desde.',
        'почему = causa; зачем = propósito.',
        'какой / какая concuerdan en género/número.',
        'кто / что también declinan (кого, чего…).',
      ],
      de: [
        'где = Ort; куда = wohin; откуда = woher.',
        'почему = Grund; зачем = Zweck.',
        'какой / какая richten sich nach Genus/Numerus.',
        'кто / что deklinieren auch (кого, чего…).',
      ],
      ru: [
        'где — место; куда — направление; откуда — исходная точка.',
        'почему — причина; зачем — цель.',
        'какой / какая согласуются с родом и числом.',
        'кто и что тоже склоняются (кого, чего…) — в теме падежей.',
      ],
    },
    chartNote: {
      en: '· separates related forms (direction, gender, purpose).',
      ko: '· 는 관련 형태(방향·성·목적)를 이은 것입니다.',
      ja: '・は関連形（方向・性・目的）の区切りです。',
      zh: '· 连接相关形式（方向、性、目的）。',
      fr: 'Le point médian sépare les formes liées.',
      es: 'El punto medio separa formas relacionadas.',
      de: 'Mittelpunkt trennt verwandte Formen.',
      ru: 'Точка разделяет связанные формы.',
    },
    chartRows: [
      ['who', 'кто'],
      ['what', 'что'],
      ['where', 'где · куда · откуда'],
      ['when', 'когда'],
      ['why', 'почему · зачем'],
      ['how', 'как'],
      ['amount', 'сколько'],
      ['which', 'какой · какая'],
      ['whose', 'чей'],
    ],
    quiz: ruQuiz,
  }),
)

console.log(
  `Updated ko/ja question tables; wrote ru questions (${ruQuiz.length}) + table.`,
)
