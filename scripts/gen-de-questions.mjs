/**
 * Generate German question-word quiz + reference table.
 * Run: node scripts/gen-de-questions.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/de')

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
    de: form,
    ru: en,
  })
}

function pack(id, form, en, ko, ja, meaning) {
  const sound = sounds(en, ko, ja, form)
  const meaningLoc = loc(meaning)
  return {
    quiz: {
      quiz_id: `de_questions_${id}`,
      question_word: form,
      pronunciations: sound,
      translations: meaningLoc,
    },
    row: { form, meaning: meaningLoc, sound },
  }
}

const ITEMS = [
  pack('wer', 'wer', 'vair/wer', '베어', 'ヴェーア', {
    en: 'who (Nominativ)',
    ko: '누구 (주격)',
    ja: '誰（主格）',
    zh: '谁（主格）',
    fr: 'qui (nominatif)',
    es: 'quién (nominativo)',
    de: 'wer (Nominativ)',
    ru: 'кто (имен.)',
    it: 'chi (nominativo)',
  }),
  pack('wen', 'wen', 'vain/wen', '벤', 'ヴェーン', {
    en: 'whom (Akkusativ)',
    ko: '누구를 (목적격)',
    ja: '誰を（対格）',
    zh: '谁（宾格）',
    fr: 'qui (accusatif)',
    es: 'a quién (acusativo)',
    de: 'wen (Akkusativ)',
    ru: 'кого (вин.)',
    it: 'chi (accusativo)',
  }),
  pack('wem', 'wem', 'vaim/wem', '벰', 'ヴェーム', {
    en: 'to whom (Dativ)',
    ko: '누구에게 (여격)',
    ja: '誰に（与格）',
    zh: '谁（与格）',
    fr: 'à qui (datif)',
    es: 'a quién (dativo)',
    de: 'wem (Dativ)',
    ru: 'кому (дат.)',
    it: 'a chi (dativo)',
  }),
  pack('was', 'was', 'vas/was', '바스', 'ヴァス', {
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
  pack('wo', 'wo', 'vo/wo', '보', 'ヴォー', {
    en: 'where (location)',
    ko: '어디 (장소)',
    ja: 'どこ（場所）',
    zh: '哪里（地点）',
    fr: 'où (lieu)',
    es: 'dónde',
    de: 'wo',
    ru: 'где',
    it: 'dove',
  }),
  pack('wohin', 'wohin', 'vo-hin', '보힌', 'ヴォーヒン', {
    en: 'where to / whither',
    ko: '어디로 (방향)',
    ja: 'どこへ（方向）',
    zh: '去哪里（方向）',
    fr: 'où (direction)',
    es: 'adónde',
    de: 'wohin',
    ru: 'куда',
    it: 'dove (direzione)',
  }),
  pack('woher', 'woher', 'vo-hair', '보헤어', 'ヴォーヘア', {
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
  pack('wann', 'wann', 'van/wann', '반', 'ヴァン', {
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
  pack('warum', 'warum', 'va-room', '바룸', 'ヴァルム', {
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
  pack('wie', 'wie', 'vee/wie', '비', 'ヴィー', {
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
  pack('wieviel', 'wie viel', 'vee feel', '비 필', 'ヴィー・フィール', {
    en: 'how much (uncountable / amount)',
    ko: '얼마 (셀 수 없는·양)',
    ja: 'いくら（量）',
    zh: '多少（不可数／量）',
    fr: 'combien (quantité)',
    es: 'cuánto',
    de: 'wie viel',
    ru: 'сколько (кол-во)',
    it: 'quanto',
  }),
  pack('wieviele', 'wie viele', 'vee fee-le', '비 필레', 'ヴィー・フィーレ', {
    en: 'how many (countable plural)',
    ko: '몇 (셀 수 있는 복수)',
    ja: 'いくつ（数えられる複数）',
    zh: '多少（可数复数）',
    fr: 'combien (pluriel)',
    es: 'cuántos',
    de: 'wie viele',
    ru: 'сколько (мн.)',
    it: 'quanti',
  }),
  pack('welcher', 'welcher', 'vel-kher', '벨허', 'ヴェルヒャー', {
    en: 'which (masculine Nominativ)',
    ko: '어느 (남성 주격)',
    ja: 'どの（男性主格）',
    zh: '哪个（阳性主格）',
    fr: 'quel (masculin)',
    es: 'cuál / qué (masculino)',
    de: 'welcher (m., Nom.)',
    ru: 'какой (м. р., имен.)',
    it: 'quale (maschile)',
  }),
  pack('welche', 'welche', 'vel-khe', '벨헤', 'ヴェルヒェ', {
    en: 'which (feminine / plural)',
    ko: '어느 (여성·복수)',
    ja: 'どの（女性・複数）',
    zh: '哪个／哪些（阴性／复数）',
    fr: 'quelle / quels',
    es: 'cuál / cuáles',
    de: 'welche (f. / Pl.)',
    ru: 'какая / какие',
    it: 'quale / quali',
  }),
  pack('welches', 'welches', 'vel-khes', '벨헤스', 'ヴェルヒェス', {
    en: 'which (neuter Nominativ/Akkusativ)',
    ko: '어느 (중성 주·목적격)',
    ja: 'どの（中性主・対格）',
    zh: '哪个（中性主／宾格）',
    fr: 'quel (neutre)',
    es: 'cuál (neutro)',
    de: 'welches (n., Nom./Akk.)',
    ru: 'какое (ср. р.)',
    it: 'quale (neutro)',
  }),
]

const formCols = [
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
]

const table = {
  table_id: 'de_questions_ref',
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
    en: 'German splits “where”: wo (place) / wohin (to) / woher (from). Who declines: wer / wen / wem.',
    ko: '독일어 「어디」는 분리: wo(장소) / wohin(방향) / woher(출발). 「누구」도 격변화: wer / wen / wem.',
    ja: '「どこ」は wo／wohin／woher。「誰」は wer／wen／wem。',
    zh: '“哪里”分 wo／wohin／woher。“谁”变格 wer／wen／wem。',
    fr: 'où → wo / wohin / woher. qui → wer / wen / wem.',
    es: 'dónde → wo / wohin / woher. quién → wer / wen / wem.',
    de: 'wo / wohin / woher. wer / wen / wem.',
    ru: 'где → wo / wohin / woher. кто → wer / wen / wem.',
    it: 'dove → wo / wohin / woher. chi → wer / wen / wem.',
  }),
  rules: {
    en: [
      'wo = location; wohin = direction to; woher = origin — Romance often collapses these.',
      'wer (Nom) / wen (Akk) / wem (Dat); wessen (Gen) is rarer in speech.',
      'wie viel ≈ amount; wie viele ≈ countable how many.',
      'welcher/welche/welches agree in gender, number, and case with the noun.',
    ],
    ko: [
      'wo = 장소; wohin = 가는 방향; woher = 출발 — 로망스어는 종종 하나로 합침.',
      'wer(주) / wen(목적) / wem(여); wessen(소유)는 구어에서 드묾.',
      'wie viel ≈ 양; wie viele ≈ 셀 수 있는 「몇」.',
      'welcher/welche/welches는 명사 성·수·격에 일치.',
    ],
    ja: [
      'wo＝場所、wohin＝行く方向、woher＝出発。',
      'wer／wen／wem。wessen は口語では稀。',
      'wie viel＝量、wie viele＝数えられる「いくつ」。',
      'welcher などは性・数・格に一致。',
    ],
    zh: [
      'wo＝地点；wohin＝去向；woher＝来处。',
      'wer／wen／wem；wessen 口语少见。',
      'wie viel≈量；wie viele≈可数“多少”。',
      'welcher 等随后面名词性、数、格变化。',
    ],
    fr: [
      'wo = lieu ; wohin = direction ; woher = provenance.',
      'wer / wen / wem ; wessen rare à l’oral.',
      'wie viel / wie viele.',
      'welcher… s’accorde en genre/nombre/cas.',
    ],
    es: [
      'wo = lugar; wohin = dirección; woher = origen.',
      'wer / wen / wem; wessen raro en habla.',
      'wie viel / wie viele.',
      'welcher… concuerda en género/número/caso.',
    ],
    de: [
      'wo = Ort; wohin = Richtung; woher = Herkunft.',
      'wer / wen / wem; wessen seltener mündlich.',
      'wie viel / wie viele.',
      'welcher… richtet sich nach Genus/Numerus/Kasus.',
    ],
    ru: [
      'wo = место; wohin = куда; woher = откуда.',
      'wer / wen / wem; wessen реже в речи.',
      'wie viel / wie viele.',
      'welcher… согласуется по роду/числу/падежу.',
    ],
    it: [
      'wo = luogo; wohin = direzione; woher = provenienza.',
      'wer / wen / wem; wessen raro all’orale.',
      'wie viel / wie viele.',
      'welcher… concorda in genere/numero/caso.',
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
          forms: 'wer · wen · wem',
        },
        {
          type: loc({
            en: 'what',
            ko: '무엇',
            ja: '何',
            zh: '什么',
            fr: 'quoi',
            es: 'qué',
            de: 'was',
            ru: 'что',
            it: 'che cosa',
          }),
          forms: 'was',
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
          forms: 'wo · wohin · woher',
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
          forms: 'wann',
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
          forms: 'warum (wieso / weshalb)',
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
          forms: 'wie',
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
          forms: 'wie viel · wie viele',
        },
        {
          type: loc({
            en: 'which',
            ko: '어느',
            ja: 'どの / どれ',
            zh: '哪个',
            fr: 'quel',
            es: 'cuál',
            de: 'welch-',
            ru: 'какой',
            it: 'quale',
          }),
          forms: 'welcher · welche · welches',
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
console.log(`de questions ok — ${ITEMS.length} cards`)
