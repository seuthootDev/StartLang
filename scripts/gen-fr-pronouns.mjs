/**
 * Generate French personal-pronoun quiz + reference table.
 * Run: node scripts/gen-fr-pronouns.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/fr')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

/** Subject pronouns (nominative) — core quiz cards. */
const SUBJECTS = [
  {
    id: 'je',
    form: 'je',
    sound: loc({
      en: 'zhuh/je',
      ko: '주/즈',
      ja: 'ジュ',
      zh: 'zhuh/je',
      fr: 'je',
      es: 'zhuh/je',
      de: 'schö/je',
      ru: 'жё',
    }),
    meaning: loc({
      en: 'I / me',
      ko: '나 / 저',
      ja: '私',
      zh: '我',
      fr: 'je / moi',
      es: 'yo / mí',
      de: 'ich / mich',
      ru: 'я',
      it: 'io / me',
    }),
  },
  {
    id: 'tu',
    form: 'tu',
    sound: loc({
      en: 'tü/tu',
      ko: '튀/튀',
      ja: 'テュ',
      zh: 'tü/tu',
      fr: 'tu',
      es: 'tü/tu',
      de: 'tü/tu',
      ru: 'тю',
    }),
    meaning: loc({
      en: 'you (singular, informal)',
      ko: '너 (단수·반말)',
      ja: '君・お前（単数・くだけた）',
      zh: '你（单数、随便）',
      fr: 'tu (familier)',
      es: 'tú (informal)',
      de: 'du (locker)',
      ru: 'ты',
      it: 'tu (informale)',
    }),
  },
  {
    id: 'il',
    form: 'il',
    sound: loc({
      en: 'eel/il',
      ko: '일',
      ja: 'イル',
      zh: 'il',
      fr: 'il',
      es: 'il',
      de: 'il',
      ru: 'иль',
    }),
    meaning: loc({
      en: 'he / it (masculine)',
      ko: '그 (남성) / 그것(남)',
      ja: '彼 / それ（男性）',
      zh: '他 / 它（阳性）',
      fr: 'il (masculin)',
      es: 'él (masculino)',
      de: 'er (maskulin)',
      ru: 'он',
      it: 'lui / esso (maschile)',
    }),
  },
  {
    id: 'elle',
    form: 'elle',
    sound: loc({
      en: 'el/elle',
      ko: '엘',
      ja: 'エル',
      zh: 'elle',
      fr: 'elle',
      es: 'elle',
      de: 'ell/elle',
      ru: 'эль',
    }),
    meaning: loc({
      en: 'she / it (feminine)',
      ko: '그녀 / 그것(여)',
      ja: '彼女 / それ（女性）',
      zh: '她 / 它（阴性）',
      fr: 'elle (féminin)',
      es: 'ella (femenino)',
      de: 'sie (feminin)',
      ru: 'она',
      it: 'lei / essa (femminile)',
    }),
  },
  {
    id: 'on',
    form: 'on',
    sound: loc({
      en: 'on/õ',
      ko: '옹',
      ja: 'オン',
      zh: 'on',
      fr: 'on',
      es: 'on',
      de: 'on',
      ru: 'он',
    }),
    meaning: loc({
      en: 'one / we (informal) / people',
      ko: '사람들 / 우리(구어) / 일반인',
      ja: '人々・私たち（口語）・一般の人',
      zh: '人们 / 我们（口语） / 一般人',
      fr: 'on (indéfini / nous familier)',
      es: 'uno / nosotros (informal)',
      de: 'man / wir (umgangssprachlich)',
      ru: 'люди / мы (разг.)',
      it: 'si / noi (informale)',
    }),
  },
  {
    id: 'nous',
    form: 'nous',
    sound: loc({
      en: 'noo/nous',
      ko: '누',
      ja: 'ヌ',
      zh: 'nous',
      fr: 'nous',
      es: 'nous',
      de: 'nu/nous',
      ru: 'ну',
    }),
    meaning: loc({
      en: 'we / us',
      ko: '우리',
      ja: '私たち',
      zh: '我们',
      fr: 'nous',
      es: 'nosotros',
      de: 'wir / uns',
      ru: 'мы',
      it: 'noi / ci',
    }),
  },
  {
    id: 'vous',
    form: 'vous',
    sound: loc({
      en: 'voo/vous',
      ko: '부',
      ja: 'ヴ',
      zh: 'vous',
      fr: 'vous',
      es: 'vous',
      de: 'wu/vous',
      ru: 'ву',
    }),
    meaning: loc({
      en: 'you (plural / polite singular)',
      ko: '당신·여러분 (복수 / 존댓말 단수)',
      ja: 'あなたたち / あなた（丁寧の単数）',
      zh: '你们 / 您（礼貌单数）',
      fr: 'vous (pluriel / poli)',
      es: 'ustedes / usted',
      de: 'ihr / Sie',
      ru: 'вы',
      it: 'voi / Lei (cortesia)',
    }),
  },
  {
    id: 'ils',
    form: 'ils',
    sound: loc({
      en: 'eel/ils',
      ko: '일',
      ja: 'イル',
      zh: 'ils',
      fr: 'ils',
      es: 'ils',
      de: 'il/ils',
      ru: 'иль',
    }),
    meaning: loc({
      en: 'they (masculine or mixed)',
      ko: '그들 (남성·혼성)',
      ja: '彼ら（男性・混成）',
      zh: '他们（阳性或混合）',
      fr: 'ils (masculin / mixte)',
      es: 'ellos (masculino / mixto)',
      de: 'sie (maskulin / gemischt)',
      ru: 'они (муж. / смешанные)',
      it: 'loro (maschile / misto)',
    }),
  },
  {
    id: 'elles',
    form: 'elles',
    sound: loc({
      en: 'el/elles',
      ko: '엘',
      ja: 'エル',
      zh: 'elles',
      fr: 'elles',
      es: 'elles',
      de: 'ell/elles',
      ru: 'эль',
    }),
    meaning: loc({
      en: 'they (feminine)',
      ko: '그들 (여성)',
      ja: '彼女たち（女性）',
      zh: '她们（阴性）',
      fr: 'elles (féminin)',
      es: 'ellas (femenino)',
      de: 'sie (feminin)',
      ru: 'они (жен.)',
      it: 'loro (femminile)',
    }),
  },
]

const TONIC = [
  { form: 'moi', gloss: loc({ en: 'me (stressed)', ko: '나 (강조)', ja: '私（強調）', zh: '我（强调）', fr: 'moi (tonique)', es: 'mí (tónico)', de: 'mich (betont)', ru: 'я (ударн.)', it: 'me (tonico)' }) },
  { form: 'toi', gloss: loc({ en: 'you (stressed)', ko: '너 (강조)', ja: '君（強調）', zh: '你（强调）', fr: 'toi (tonique)', es: 'ti (tónico)', de: 'dich (betont)', ru: 'ты (ударн.)', it: 'te (tonico)' }) },
  { form: 'lui', gloss: loc({ en: 'him (stressed)', ko: '그 (강조)', ja: '彼（強調）', zh: '他（强调）', fr: 'lui (tonique)', es: 'él (tónico)', de: 'ihm (betont)', ru: 'он (ударн.)', it: 'lui (tonico)' }) },
  { form: 'elle', gloss: loc({ en: 'her (stressed)', ko: '그녀 (강조)', ja: '彼女（強調）', zh: '她（强调）', fr: 'elle (tonique)', es: 'ella (tónico)', de: 'ihr (betont)', ru: 'она (ударн.)', it: 'lei (tonico)' }) },
  { form: 'soi', gloss: loc({ en: 'oneself (stressed)', ko: '자신 (강조)', ja: '自分（強調）', zh: '自己（强调）', fr: 'soi (tonique)', es: 'sí (tónico)', de: 'sich (betont)', ru: 'себя (ударн.)', it: 'sé (tonico)' }) },
  { form: 'nous', gloss: loc({ en: 'us (stressed)', ko: '우리 (강조)', ja: '私たち（強調）', zh: '我们（强调）', fr: 'nous (tonique)', es: 'nosotros (tónico)', de: 'uns (betont)', ru: 'мы (ударн.)', it: 'noi (tonico)' }) },
  { form: 'vous', gloss: loc({ en: 'you (stressed)', ko: '당신들 (강조)', ja: 'あなた（強調）', zh: '你们/您（强调）', fr: 'vous (tonique)', es: 'ustedes (tónico)', de: 'euch/Sie (betont)', ru: 'вы (ударн.)', it: 'voi (tonico)' }) },
  { form: 'eux', gloss: loc({ en: 'them (masc., stressed)', ko: '그들 (남·강조)', ja: '彼ら（強調）', zh: '他们（强调）', fr: 'eux (tonique)', es: 'ellos (tónico)', de: 'ihnen (mask., betont)', ru: 'они (муж., ударн.)', it: 'loro (m., tonico)' }) },
  { form: 'elles', gloss: loc({ en: 'them (fem., stressed)', ko: '그들 (여·강조)', ja: '彼女たち（強調）', zh: '她们（强调）', fr: 'elles (tonique)', es: 'ellas (tónico)', de: 'ihnen (fem., betont)', ru: 'они (жен., ударн.)', it: 'loro (f., tonico)' }) },
]

mkdirSync(OUT_DIR, { recursive: true })

const quiz = SUBJECTS.map((p) => ({
  quiz_id: `fr_pronouns_${p.id}`,
  question_word: p.form,
  pronunciations: { ...p.sound },
  translations: { ...p.meaning },
}))

const personCols = [
  {
    key: 'person',
    labels: loc({
      en: 'Person',
      ko: '인칭',
      ja: '人称',
      zh: '人称',
      fr: 'Personne',
      es: 'Persona',
      de: 'Person',
      ru: 'Лицо',
    }),
  },
  {
    key: 'singular',
    labels: loc({
      en: 'Singular',
      ko: '단수',
      ja: '単数',
      zh: '单数',
      fr: 'Singulier',
      es: 'Singular',
      de: 'Singular',
      ru: 'Ед. число',
    }),
  },
  {
    key: 'plural',
    labels: loc({
      en: 'Plural',
      ko: '복수',
      ja: '複数',
      zh: '复数',
      fr: 'Pluriel',
      es: 'Plural',
      de: 'Plural',
      ru: 'Мн. число',
    }),
  },
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

const table = {
  table_id: 'fr_pronouns_ref',
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
    en: 'Start with subject pronouns. tu vs vous is politeness; on often means “we” in speech.',
    ko: '주어 대명사부터. tu·vous는 높임, on은 구어에서 ‘우리’로 자주 씁니다.',
    ja: 'まず主語代名詞。tu と vous は丁寧さ、on は口語で「私たち」によく使います。',
    zh: '先学主格代词。tu/vous 表礼貌；口语里 on 常表示“我们”。',
    fr: 'Commencez par les sujets. tu/vous = politesse ; on = souvent « nous » à l’oral.',
    es: 'Empieza por los sujetos. tu/vous = cortesía; on suele ser “nosotros” en habla.',
    de: 'Zuerst Subjektpronomen. tu/vous = Höflichkeit; on oft „wir“ in der Rede.',
    ru: 'Сначала субъектные. tu/vous — вежливость; on часто = «мы» в речи.',
  }),
  rules: {
    en: [
      'vous = plural you and polite singular you.',
      'il / elle also mean “it” for masculine / feminine nouns.',
      'on takes 3rd-person singular verbs (on parle).',
      'Stressed forms (moi, toi…) after prepositions and for emphasis.',
    ],
    ko: [
      'vous = 복수 ‘여러분’이자 존댓말 단수 ‘당신’.',
      'il / elle 는 사람뿐 아니라 명사의 성에 맞춘 ‘그것’이기도 합니다.',
      'on 은 3인칭 단수 동사를 씁니다 (on parle).',
      '강조형(moi, toi…)은 전치사 뒤·강조에 씁니다.',
    ],
    ja: [
      'vous は複数の「あなたたち」と丁寧な単数の「あなた」。',
      'il / elle は人だけでなく名詞の性に合わせた「それ」でもある。',
      'on は三人称単数の動詞を取る（on parle）。',
      '強調形（moi, toi…）は前置詞のあとや強調で使う。',
    ],
    zh: [
      'vous = 复数“你们”，也作礼貌单数“您”。',
      'il / elle 也可指阳性/阴性名词的“它”。',
      'on 接第三人称单数动词（on parle）。',
      '强调式（moi, toi…）用于介词后或强调。',
    ],
    fr: [
      'vous = pluriel et politesse au singulier.',
      'il / elle = aussi « ça » selon le genre du nom.',
      'on + verbe à la 3e personne du singulier (on parle).',
      'Formes toniques (moi, toi…) après préposition / pour l’emphase.',
    ],
    es: [
      'vous = plural y usted (cortesía).',
      'il / elle también = “eso” según el género del nombre.',
      'on lleva verbo de 3.ª singular (on parle).',
      'Formas tónicas (moi, toi…) tras preposición / énfasis.',
    ],
    de: [
      'vous = Plural und höfliches Sie (Singular).',
      'il / elle auch „es“ je nach Genus des Nomens.',
      'on + Verb in der 3. Person Singular (on parle).',
      'Betonte Formen (moi, toi…) nach Präposition / zur Betonung.',
    ],
    ru: [
      'vous — и множественное число, и вежливое обращение к одному.',
      'il / elle также «это» по роду существительного.',
      'on + глагол в 3-м лице ед. ч. (on parle).',
      'Ударные формы (moi, toi…) после предлога / для акцента.',
    ],
    it: [
      'vous = voi e Lei di cortesia.',
      'il / elle = anche “esso/essa” secondo il genere del nome.',
      'on prende il verbo alla 3ª persona singolare (on parle).',
      'Forme toniche (moi, toi…) dopo preposizione / per enfasi.',
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
      note: loc({
        en: '3rd person splits by gender; on is an extra informal “we/people”.',
        ko: '3인칭은 성으로 갈라지고, on은 구어 ‘우리/사람들’ 추가형입니다.',
        ja: '三人称は性で分かれ、on は口語の「私たち／人々」の追加形です。',
        zh: '第三人称分性别；on 是口语“我们/人们”的额外形式。',
        fr: 'La 3e personne se divise par genre ; on = « nous/gens » familier.',
        es: 'La 3.ª se divide por género; on = “nosotros/gente” informal.',
        de: '3. Person nach Genus; on = umgangssprachliches „wir/Leute“.',
        ru: '3-е лицо по роду; on — разговорное «мы/люди».',
      }),
      columns: personCols,
      rows: [
        {
          person: loc({
            en: '1st',
            ko: '1인칭',
            ja: '一人称',
            zh: '第一人称',
            fr: '1re',
            es: '1.ª',
            de: '1.',
            ru: '1-е',
          }),
          singular: 'je',
          plural: 'nous',
        },
        {
          person: loc({
            en: '2nd',
            ko: '2인칭',
            ja: '二人称',
            zh: '第二人称',
            fr: '2e',
            es: '2.ª',
            de: '2.',
            ru: '2-е',
          }),
          singular: 'tu',
          plural: 'vous',
        },
        {
          person: loc({
            en: '3rd',
            ko: '3인칭',
            ja: '三人称',
            zh: '第三人称',
            fr: '3e',
            es: '3.ª',
            de: '3.',
            ru: '3-е',
          }),
          singular: 'il / elle / on',
          plural: 'ils / elles',
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
      rows: SUBJECTS.map((p) => ({
        form: p.form,
        meaning: { ...p.meaning },
        sound: { ...p.sound },
      })),
    },
    {
      title: loc({
        en: 'Stressed (tonic) forms',
        ko: '강조형 (강세형)',
        ja: '強調形（強勢形）',
        zh: '强调式',
        fr: 'Formes toniques',
        es: 'Formas tónicas',
        de: 'Betonte Formen',
        ru: 'Ударные формы',
      }),
      note: loc({
        en: 'Reference only — not in the quiz deck. Used after à/de/avec… and for emphasis (Moi, je…).',
        ko: '참고용(퀴즈 미포함). à/de/avec 뒤·강조(Moi, je…)에 씁니다.',
        ja: '参考のみ（クイズ外）。à/de/avec のあとや強調（Moi, je…）で使う。',
        zh: '仅供参考（不在测验中）。用于介词后或强调（Moi, je…）。',
        fr: 'Référence seule (hors quiz). Après à/de/avec… et emphase (Moi, je…).',
        es: 'Solo referencia (fuera del quiz). Tras à/de/avec… y énfasis.',
        de: 'Nur Nachschlagewerk (nicht im Quiz). Nach à/de/avec… und Betonung.',
        ru: 'Только справка (не в квизе). После à/de/avec… и для акцента.',
      }),
      columns: [
        formCols[0],
        {
          key: 'meaning',
          labels: formCols[1].labels,
        },
      ],
      rows: TONIC.map((t) => ({
        form: t.form,
        meaning: { ...t.gloss },
      })),
    },
  ],
}

writeFileSync(join(OUT_DIR, 'pronouns.json'), `${JSON.stringify(quiz, null, 2)}\n`)
writeFileSync(join(OUT_DIR, 'pronouns.table.json'), `${JSON.stringify(table, null, 2)}\n`)
console.log(`fr pronouns ok — ${quiz.length} cards`)
