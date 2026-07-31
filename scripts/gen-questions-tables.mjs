import { readFileSync, writeFileSync } from 'fs'

const meaningLabels = {
  en: 'Meaning',
  ko: '의미',
  ja: '意味',
  zh: '意思',
  fr: 'Sens',
  es: 'Significado',
  de: 'Bedeutung',
  ru: 'Значение',
}
const soundLabels = {
  en: 'Sound',
  ko: '발음',
  ja: '読み',
  zh: '发音',
  fr: 'Prononciation',
  es: 'Pronunciación',
  de: 'Aussprache',
  ru: 'Произношение',
}

function formLabels(target) {
  if (target === 'ko') {
    return {
      en: 'Korean',
      ko: '한국어',
      ja: '韓国語',
      zh: '韩语',
      fr: 'Coréen',
      es: 'Coreano',
      de: 'Koreanisch',
      ru: 'Корейский',
    }
  }
  return {
    en: 'Japanese',
    ko: '일본어',
    ja: '日本語',
    zh: '日语',
    fr: 'Japonais',
    es: 'Japonés',
    de: 'Japanisch',
    ru: 'Японский',
  }
}

const packs = {
  ko: {
    title: {
      en: 'Question words',
      ko: '필수 의문사',
      ja: '疑問詞',
      zh: '疑问词',
      fr: 'Mots interrogatifs',
      es: 'Palabras interrogativas',
      de: 'Fragewörter',
      ru: 'Вопросительные слова',
    },
    note: {
      en: 'Core question words for beginners.',
      ko: '초급에서 자주 쓰는 의문사.',
      ja: '初級でよく使う疑問詞。',
      zh: '初学者常用疑问词。',
      fr: 'Mots interrogatifs de base.',
      es: 'Palabras interrogativas básicas.',
      de: 'Wichtige Fragewörter für Anfänger.',
      ru: 'Базовые вопросительные слова.',
    },
    rules: {
      en: [
        '무엇 is the full form; 뭐 is the everyday casual form of "what".',
        '몇 comes before counters/nouns (몇 명, 몇 시). 얼마 asks about price.',
        '무슨 / 어떤 modify a noun ("what kind of …"); 어느 is closer to "which".',
      ],
      ko: [
        '무엇은 기본형, 뭐는 일상 회화형입니다.',
        '몇은 명사·단위 앞에 붙습니다(몇 명, 몇 시). 얼마는 주로 가격.',
        '무슨·어떤은 명사를 꾸미고, 어느는 "어느 쪽/어느 것"에 가깝습니다.',
      ],
      ja: [
        '「무엇」が基本形、「뭐」が日常の「何」。',
        '「몇」は名詞・助数詞の前（몇 명、몇 시）。「얼마」は値段。',
        '「무슨・어떤」は名詞を修飾。「어느」は「どの／どちら」寄り。',
      ],
      zh: [
        '무엇是完整形式，뭐是口语“什么”。',
        '몇放在量词/名词前；얼마多问价格。',
        '무슨/어떤修饰名词；어느更接近“哪”。',
      ],
      fr: [
        '무엇 = forme pleine ; 뭐 = "quoi" familier.',
        '몇 devant un nom/compteur ; 얼마 pour le prix.',
        '무슨 / 어떤 + nom ; 어느 approx. "lequel".',
      ],
      es: [
        '무엇 es la forma completa; 뭐 es el "qué" cotidiano.',
        '몇 va delante de sustantivos/contadores; 얼마 es el precio.',
        '무슨 / 어떤 + sustantivo; 어느 approx. "cuál".',
      ],
      de: [
        '무엇 = Vollform; 뭐 = umgangssprachliches "was".',
        '몇 vor Nomen/Zähleinheiten; 얼마 für den Preis.',
        '무슨 / 어떤 + Nomen; 어느 approx. "welch-".',
      ],
      ru: [
        '무엇 — полная форма; 뭐 — разговорное «что».',
        '몇 перед существительным/счётным словом; 얼마 — цена.',
        '무슨 / 어떤 + сущ.; 어느 ≈ «какой/который».',
      ],
    },
  },
  ja: {
    title: {
      en: 'Question words',
      ko: '필수 의문사',
      ja: '疑問詞',
      zh: '疑问词',
      fr: 'Mots interrogatifs',
      es: 'Palabras interrogativas',
      de: 'Fragewörter',
      ru: 'Вопросительные слова',
    },
    note: {
      en: 'Core question words for beginners.',
      ko: '초급에서 자주 쓰는 의문사.',
      ja: '初級でよく使う疑問詞。',
      zh: '初学者常用疑问词。',
      fr: 'Mots interrogatifs de base.',
      es: 'Palabras interrogativas básicas.',
      de: 'Wichtige Fragewörter für Anfänger.',
      ru: 'Базовые вопросительные слова.',
    },
    rules: {
      en: [
        '何 is nani or nan — nan before many counters (何人, 何時).',
        'なぜ and どうして both mean "why"; どうして is common in speech.',
        'どれ = which (things); どの + noun; どちら = which of two / polite where.',
      ],
      ko: [
        '何은 なに 또는 난 — 조수사 앞에서는 난이 많습니다(何人, 何時).',
        'なぜ와 どうして 모두 "왜"; 회화에서는 どうして도 흔합니다.',
        'どれ는 어느 것; どの+명사; どちら는 둘 중 / 공손한 "어디".',
      ],
      ja: [
        '「何」は「なに／なん」。助数詞の前は「なん」が多い（何人・何時）。',
        '「なぜ」も「どうして」も理由。「どうして」は会話でよく使う。',
        '「どれ」は物事のどれ、「どの＋名詞」、「どちら」は二者択一・丁寧な場所。',
      ],
      zh: [
        '何读 nani 或 nan；量词前多为 nan（何人、何時）。',
        'なぜ与どうして都是“为什么”；口语常见どうして。',
        'どれ=哪个；どの+名词；どちら=两者之一/礼貌的哪里。',
      ],
      fr: [
        '何 = nani / nan (nan devant beaucoup de compteurs).',
        'なぜ et どうして = pourquoi ; どうして est courant a l oral.',
        'どれ = lequel ; どの + nom ; どちら = lequel des deux / ou poli.',
      ],
      es: [
        '何 = nani / nan (nan delante de muchos contadores).',
        'なぜ y どうして = por que; どうして es frecuente al hablar.',
        'どれ = cual; どの + sustantivo; どちら = de dos / donde cortes.',
      ],
      de: [
        '何 = nani / nan (nan vor vielen Zahlwortern).',
        'なぜ und どうして = warum; どうして ist mundlich haufig.',
        'どれ = welches; どの + Nomen; どちら = welches von zweien / hoflich wo.',
      ],
      ru: [
        '何 = нани / нан (нан перед многими счётными словами).',
        'なぜ и どうして = почему; どうして часто в речи.',
        'どれ = который; どの + сущ.; どちら = из двух / вежливое «где».',
      ],
    },
  },
}

for (const target of ['ko', 'ja']) {
  const entries = JSON.parse(
    readFileSync(`src/data/${target}/questions.json`, 'utf8'),
  )
  const pack = packs[target]
  const table = {
    table_id: `${target}_questions_ref`,
    title: pack.title,
    note: pack.note,
    rules: pack.rules,
    columns: [
      { key: 'form', labels: formLabels(target) },
      { key: 'meaning', labels: meaningLabels },
      { key: 'sound', labels: soundLabels },
    ],
    rows: entries.map((e) => ({
      form: e.question_word,
      meaning: e.translations,
      sound: { ...e.pronunciations },
    })),
  }
  writeFileSync(
    `src/data/${target}/questions.table.json`,
    `${JSON.stringify(table, null, 2)}\n`,
  )
  console.log('wrote', target, entries.length)
}
