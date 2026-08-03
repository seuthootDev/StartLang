/**
 * Generate Spanish personal-pronoun quiz + reference table.
 * Run: node scripts/gen-es-pronouns.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/es')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

function pack(id, form, sound, meaning) {
  const s = loc(sound)
  const m = loc(meaning)
  return {
    quiz: {
      quiz_id: `es_pronouns_${id}`,
      question_word: form,
      pronunciations: s,
      translations: m,
    },
    row: { form, meaning: m, sound: s },
  }
}

const SUBJECTS = [
  pack(
    'yo',
    'yo',
    { en: 'yo', ko: '요', ja: 'ヨ', zh: 'yo', fr: 'yo', es: 'yo', de: 'jo/yo', ru: 'йо' },
    {
      en: 'I / me',
      ko: '나 / 저',
      ja: '私',
      zh: '我',
      fr: 'je / moi',
      es: 'yo',
      de: 'ich / mich',
      ru: 'я',
      it: 'io / me',
    },
  ),
  pack(
    'tu',
    'tú',
    { en: 'too/tú', ko: '투', ja: 'トゥ', zh: 'tú', fr: 'tou/tú', es: 'tú', de: 'tu', ru: 'ту' },
    {
      en: 'you (singular, informal)',
      ko: '너 (단수·반말)',
      ja: '君・お前（単数・くだけた）',
      zh: '你（单数、随便）',
      fr: 'tu (familier)',
      es: 'tú (informal)',
      de: 'du (locker)',
      ru: 'ты',
      it: 'tu (informale)',
    },
  ),
  pack(
    'el',
    'él',
    { en: 'el/él', ko: '엘', ja: 'エル', zh: 'él', fr: 'él', es: 'él', de: 'el', ru: 'эль' },
    {
      en: 'he / him',
      ko: '그 (남성)',
      ja: '彼',
      zh: '他',
      fr: 'il / lui',
      es: 'él',
      de: 'er / ihn',
      ru: 'он',
      it: 'lui',
    },
  ),
  pack(
    'ella',
    'ella',
    { en: 'e-ya/ella', ko: '에야', ja: 'エジャ', zh: 'ella', fr: 'ella', es: 'ella', de: 'eja/ella', ru: 'элья' },
    {
      en: 'she / her',
      ko: '그녀',
      ja: '彼女',
      zh: '她',
      fr: 'elle',
      es: 'ella',
      de: 'sie / ihr',
      ru: 'она',
      it: 'lei',
    },
  ),
  pack(
    'usted',
    'usted',
    { en: 'oos-ted/usted', ko: '우스테드', ja: 'ウステッド', zh: 'usted', fr: 'ousted/usted', es: 'usted', de: 'usted', ru: 'устед' },
    {
      en: 'you (singular, formal) — takes 3rd-person verbs',
      ko: '당신 (단수·존댓말) — 3인칭 동사',
      ja: 'あなた（単数・丁寧）— 三人称の動詞',
      zh: '您（单数正式）— 用第三人称动词',
      fr: 'vous (singulier formel) — verbe à la 3e',
      es: 'usted (formal) — verbo en 3.ª',
      de: 'Sie (Singular) — 3. Person Verb',
      ru: 'вы (ед., вежл.) — глагол в 3-м лице',
      it: 'Lei (formale) — verbo alla 3ª',
    },
  ),
  pack(
    'nosotros',
    'nosotros',
    { en: 'no-so-tros', ko: '노소트로스', ja: 'ノソトロス', zh: 'nosotros', fr: 'nosotros', es: 'nosotros', de: 'nosotros', ru: 'носотрос' },
    {
      en: 'we / us (masculine or mixed)',
      ko: '우리 (남성·혼성)',
      ja: '私たち（男性・混成）',
      zh: '我们（阳性或混合）',
      fr: 'nous (masculin / mixte)',
      es: 'nosotros',
      de: 'wir (maskulin / gemischt)',
      ru: 'мы (муж. / смешанные)',
      it: 'noi (maschile / misto)',
    },
  ),
  pack(
    'nosotras',
    'nosotras',
    { en: 'no-so-tras', ko: '노소트라스', ja: 'ノソトラス', zh: 'nosotras', fr: 'nosotras', es: 'nosotras', de: 'nosotras', ru: 'носотрас' },
    {
      en: 'we / us (feminine)',
      ko: '우리 (여성)',
      ja: '私たち（女性）',
      zh: '我们（阴性）',
      fr: 'nous (féminin)',
      es: 'nosotras',
      de: 'wir (feminin)',
      ru: 'мы (жен.)',
      it: 'noi (femminile)',
    },
  ),
  pack(
    'vosotros',
    'vosotros',
    { en: 'bo-so-tros', ko: '보소트로스', ja: 'ボソトロス', zh: 'vosotros', fr: 'vosotros', es: 'vosotros', de: 'vosotros', ru: 'босотрос' },
    {
      en: 'you (plural, informal — mainly Spain)',
      ko: '너희 (복수·반말 — 주로 스페인)',
      ja: '君たち（複数・くだけた・主にスペイン）',
      zh: '你们（复数随便 — 主要用于西班牙）',
      fr: 'vous (pluriel familier — surtout Espagne)',
      es: 'vosotros (informal, España)',
      de: 'ihr (v. a. Spanien)',
      ru: 'вы (мн., неформ. — в основном Испания)',
      it: 'voi (informale — soprattutto Spagna)',
    },
  ),
  pack(
    'vosotras',
    'vosotras',
    { en: 'bo-so-tras', ko: '보소트라스', ja: 'ボソトラス', zh: 'vosotras', fr: 'vosotras', es: 'vosotras', de: 'vosotras', ru: 'босотрас' },
    {
      en: 'you (plural, informal, feminine — mainly Spain)',
      ko: '너희 (복수·여성·반말 — 주로 스페인)',
      ja: '君たち（女性・主にスペイン）',
      zh: '你们（阴性复数随便 — 西班牙）',
      fr: 'vous (fém. familier — Espagne)',
      es: 'vosotras (informal, España)',
      de: 'ihr (fem., Spanien)',
      ru: 'вы (жен., неформ. — Испания)',
      it: 'voi (f., informale — Spagna)',
    },
  ),
  pack(
    'ustedes',
    'ustedes',
    { en: 'oos-te-des', ko: '우스테데스', ja: 'ウステデス', zh: 'ustedes', fr: 'oustedès/ustedes', es: 'ustedes', de: 'ustedes', ru: 'устедес' },
    {
      en: 'you (plural formal; also informal plural in LatAm)',
      ko: '여러분 (복수 존댓말; 중남미에서는 일상 복수 you)',
      ja: 'あなたたち（丁寧複数・中南米では日常の複数 you）',
      zh: '你们／您们（正式复数；拉美也作日常复数）',
      fr: 'vous (pluriel formel ; LatAm aussi familier)',
      es: 'ustedes (formal; LatAm también informal)',
      de: 'Sie (Plural; LatAm auch locker)',
      ru: 'вы (мн. вежл.; в LatAm и неформ.)',
      it: 'voi/Loro (formale; LatAm anche informale)',
    },
  ),
  pack(
    'ellos',
    'ellos',
    { en: 'e-yos/ellos', ko: '에요스', ja: 'エジョス', zh: 'ellos', fr: 'ellos', es: 'ellos', de: 'ejos/ellos', ru: 'эльос' },
    {
      en: 'they / them (masculine or mixed)',
      ko: '그들 (남성·혼성)',
      ja: '彼ら（男性・混成）',
      zh: '他们（阳性或混合）',
      fr: 'ils / eux (masculin / mixte)',
      es: 'ellos',
      de: 'sie (maskulin / gemischt)',
      ru: 'они (муж. / смешанные)',
      it: 'loro (maschile / misto)',
    },
  ),
  pack(
    'ellas',
    'ellas',
    { en: 'e-yas/ellas', ko: '에야스', ja: 'エジャス', zh: 'ellas', fr: 'ellas', es: 'ellas', de: 'ejas/ellas', ru: 'эльяс' },
    {
      en: 'they / them (feminine)',
      ko: '그들 (여성)',
      ja: '彼女たち（女性）',
      zh: '她们（阴性）',
      fr: 'elles',
      es: 'ellas',
      de: 'sie (feminin)',
      ru: 'они (жен.)',
      it: 'loro (femminile)',
    },
  ),
]

const TONIC = [
  { form: 'mí', gloss: loc({ en: 'me (stressed / after prep.)', ko: '나 (강조·전치사 뒤)', ja: '私（強調・前置詞のあと）', zh: '我（强调／介词后）', fr: 'moi (tonique)', es: 'mí', de: 'mich (betont)', ru: 'меня (ударн.)', it: 'me (tonico)' }) },
  { form: 'ti', gloss: loc({ en: 'you (stressed / after prep.)', ko: '너 (강조·전치사 뒤)', ja: '君（強調・前置詞のあと）', zh: '你（强调／介词后）', fr: 'toi (tonique)', es: 'ti', de: 'dich (betont)', ru: 'тебя (ударн.)', it: 'te (tonico)' }) },
  { form: 'sí', gloss: loc({ en: 'oneself (stressed, reflexive)', ko: '자신 (강조·재귀)', ja: '自分（強調・再帰）', zh: '自己（强调／反身）', fr: 'soi (tonique)', es: 'sí', de: 'sich (betont)', ru: 'себя (ударн.)', it: 'sé (tonico)' }) },
  { form: 'conmigo', gloss: loc({ en: 'with me', ko: '나와 함께', ja: '私と一緒に', zh: '和我一起', fr: 'avec moi', es: 'conmigo', de: 'mit mir', ru: 'со мной', it: 'con me' }) },
  { form: 'contigo', gloss: loc({ en: 'with you (informal)', ko: '너와 함께', ja: '君と一緒に', zh: '和你一起', fr: 'avec toi', es: 'contigo', de: 'mit dir', ru: 'с тобой', it: 'con te' }) },
  { form: 'consigo', gloss: loc({ en: 'with him/her/you(formal)/them', ko: '그와·당신과 함께', ja: '彼／あなたと一緒に', zh: '和他／您一起', fr: 'avec lui/elle/vous', es: 'consigo', de: 'mit ihm/Sie', ru: 'с ним / с вами', it: 'con sé' }) },
]

const personCols = [
  {
    key: 'person',
    labels: loc({ en: 'Person', ko: '인칭', ja: '人称', zh: '人称', fr: 'Personne', es: 'Persona', de: 'Person', ru: 'Лицо' }),
  },
  {
    key: 'singular',
    labels: loc({ en: 'Singular', ko: '단수', ja: '単数', zh: '单数', fr: 'Singulier', es: 'Singular', de: 'Singular', ru: 'Ед. число' }),
  },
  {
    key: 'plural',
    labels: loc({ en: 'Plural', ko: '복수', ja: '複数', zh: '复数', fr: 'Pluriel', es: 'Plural', de: 'Plural', ru: 'Мн. число' }),
  },
]

const formCols = [
  {
    key: 'form',
    labels: loc({ en: 'Spanish', ko: '스페인어', ja: 'スペイン語', zh: '西班牙语', fr: 'Espagnol', es: 'Español', de: 'Spanisch', ru: 'Испанский' }),
  },
  {
    key: 'meaning',
    labels: loc({ en: 'Meaning', ko: '의미', ja: '意味', zh: '意思', fr: 'Sens', es: 'Significado', de: 'Bedeutung', ru: 'Значение' }),
  },
  {
    key: 'sound',
    labels: loc({ en: 'Sound', ko: '발음', ja: '読み', zh: '发音', fr: 'Prononciation', es: 'Pronunciación', de: 'Aussprache', ru: 'Произношение' }),
  },
]

const table = {
  table_id: 'es_pronouns_ref',
  title: loc({
    en: 'Personal pronouns',
    ko: '인칭대명사',
    ja: '人称代名詞',
    zh: '人称代词',
    fr: 'Pronoms personnels',
    es: 'Pronombres personales',
    de: 'Personalpronomen',
    ru: 'Личные местоимения',
  }),
  note: loc({
    en: 'tú vs usted is politeness. vosotros is mainly Spain; LatAm uses ustedes for plural “you”.',
    ko: 'tú·usted는 높임. vosotros는 주로 스페인, 중남미 복수 you는 ustedes.',
    ja: 'tú と usted は丁寧さ。vosotros は主にスペイン、中南米の複数 you は ustedes。',
    zh: 'tú/usted 表礼貌。vosotros 主用于西班牙；拉美复数“你们”用 ustedes。',
    fr: 'tú/usted = politesse. vosotros surtout Espagne ; LatAm = ustedes.',
    es: 'tú/usted = cortesía. vosotros sobre todo España; LatAm = ustedes.',
    de: 'tú/usted = Höflichkeit. vosotros v. a. Spanien; LatAm = ustedes.',
    ru: 'tú/usted — вежливость. vosotros — в основном Испания; LatAm — ustedes.',
  }),
  rules: {
    en: [
      'usted / ustedes take 3rd-person verb forms (usted habla, ustedes hablan).',
      'nosotros/as and vosotros/as mark gender of the group.',
      'After most prepositions use mí, ti, sí (not yo, tú) — except conmigo, contigo, consigo.',
    ],
    ko: [
      'usted / ustedes는 3인칭 동사 (usted habla).',
      'nosotros/as, vosotros/as는 집단의 성을 표시.',
      '대부분 전치사 뒤는 mí, ti, sí (yo, tú 아님) — conmigo, contigo, consigo 예외.',
    ],
    ja: [
      'usted / ustedes は三人称の動詞。',
      'nosotros/as・vosotros/as はグループの性。',
      '多くの前置詞のあとみ mí, ti, sí — conmigo などは例外。',
    ],
    zh: [
      'usted / ustedes 接第三人称动词。',
      'nosotros/as、vosotros/as 标明群体性别。',
      '多数介词后用 mí, ti, sí — conmigo 等例外。',
    ],
    fr: [
      'usted / ustedes + verbe à la 3e personne.',
      'nosotros/as et vosotros/as marquent le genre du groupe.',
      'Après préposition : mí, ti, sí — sauf conmigo, contigo, consigo.',
    ],
    es: [
      'usted / ustedes llevan verbo en 3.ª persona.',
      'nosotros/as y vosotros/as marcan el género del grupo.',
      'Tras preposición: mí, ti, sí — excepto conmigo, contigo, consigo.',
    ],
    de: [
      'usted / ustedes mit Verb in der 3. Person.',
      'nosotros/as und vosotros/as zeigen das Genus der Gruppe.',
      'Nach Präposition: mí, ti, sí — außer conmigo, contigo, consigo.',
    ],
    ru: [
      'usted / ustedes — глагол в 3-м лице.',
      'nosotros/as и vosotros/as показывают род группы.',
      'После предлога: mí, ti, sí — кроме conmigo, contigo, consigo.',
    ],
    it: [
      'usted / ustedes prendono il verbo alla 3ª persona.',
      'nosotros/as e vosotros/as segnano il genere del gruppo.',
      'Dopo preposizione: mí, ti, sí — tranne conmigo, contigo, consigo.',
    ],
  },
  sections: [
    {
      title: loc({
        en: 'Person chart (subject)',
        ko: '인칭 표 (주어)',
        ja: '人称表（主語）',
        zh: '人称表（主格）',
        fr: 'Tableau des personnes (sujet)',
        es: 'Cuadro de persona (sujeto)',
        de: 'Personentabelle (Subjekt)',
        ru: 'Таблица лиц (субъект)',
      }),
      columns: personCols,
      rows: [
        {
          person: loc({ en: '1st', ko: '1인칭', ja: '一人称', zh: '第一人称', fr: '1re', es: '1.ª', de: '1.', ru: '1-е' }),
          singular: 'yo',
          plural: 'nosotros / nosotras',
        },
        {
          person: loc({ en: '2nd informal', ko: '2인칭 반말', ja: '二人称（くだけた）', zh: '第二人称（随便）', fr: '2e familier', es: '2.ª informal', de: '2. locker', ru: '2-е неформ.' }),
          singular: 'tú',
          plural: 'vosotros / vosotras',
        },
        {
          person: loc({ en: '2nd formal', ko: '2인칭 존댓말', ja: '二人称（丁寧）', zh: '第二人称（正式）', fr: '2e poli', es: '2.ª formal', de: '2. höflich', ru: '2-е вежл.' }),
          singular: 'usted',
          plural: 'ustedes',
        },
        {
          person: loc({ en: '3rd', ko: '3인칭', ja: '三人称', zh: '第三人称', fr: '3e', es: '3.ª', de: '3.', ru: '3-е' }),
          singular: 'él / ella',
          plural: 'ellos / ellas',
        },
      ],
    },
    {
      title: loc({
        en: 'Subject forms',
        ko: '주어형',
        ja: '主語形',
        zh: '主格形式',
        fr: 'Formes sujet',
        es: 'Formas sujeto',
        de: 'Subjektformen',
        ru: 'Субъектные формы',
      }),
      columns: formCols,
      rows: SUBJECTS.map((p) => p.row),
    },
    {
      title: loc({
        en: 'Stressed / prep. forms',
        ko: '강조·전치사형',
        ja: '強調・前置詞形',
        zh: '强调／介词形式',
        fr: 'Formes toniques',
        es: 'Formas tónicas',
        de: 'Betonte Formen',
        ru: 'Ударные формы',
      }),
      note: loc({
        en: 'Reference only — not in the quiz deck.',
        ko: '참고용(퀴즈 미포함).',
        ja: '参考のみ（クイズ外）。',
        zh: '仅供参考（不在测验中）。',
        fr: 'Référence seule (hors quiz).',
        es: 'Solo referencia (fuera del quiz).',
        de: 'Nur Nachschlagewerk (nicht im Quiz).',
        ru: 'Только справка (не в квизе).',
      }),
      columns: [formCols[0], formCols[1]],
      rows: TONIC.map((t) => ({ form: t.form, meaning: { ...t.gloss } })),
    },
  ],
}

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(
  join(OUT_DIR, 'pronouns.json'),
  `${JSON.stringify(
    SUBJECTS.map((p) => p.quiz),
    null,
    2,
  )}\n`,
)
writeFileSync(join(OUT_DIR, 'pronouns.table.json'), `${JSON.stringify(table, null, 2)}\n`)
console.log(`es pronouns ok — ${SUBJECTS.length} cards`)
