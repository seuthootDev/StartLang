/**
 * Generate Italian personal-pronoun quiz + reference table.
 * Run: node scripts/gen-it-pronouns.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/it')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

function pack(id, form, sound, meaning) {
  const s = loc(sound)
  const m = loc(meaning)
  return {
    quiz: {
      quiz_id: `it_pronouns_${id}`,
      question_word: form,
      pronunciations: s,
      translations: m,
    },
    row: { form, meaning: m, sound: s },
  }
}

const SUBJECTS = [
  pack(
    'io',
    'io',
    { en: 'ee-o/io', ko: '이오', ja: 'イオ', zh: 'io', fr: 'io', es: 'io', de: 'io', ru: 'ио', it: 'io' },
    {
      en: 'I / me',
      ko: '나 / 저',
      ja: '私',
      zh: '我',
      fr: 'je / moi',
      es: 'yo / mí',
      de: 'ich / mich',
      ru: 'я',
      it: 'io',
    },
  ),
  pack(
    'tu',
    'tu',
    { en: 'too/tu', ko: '투', ja: 'トゥ', zh: 'tu', fr: 'tu', es: 'tú', de: 'tu', ru: 'ту', it: 'tu' },
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
    'lui',
    'lui',
    { en: 'loo-ee/lui', ko: '루이', ja: 'ルイ', zh: 'lui', fr: 'lui', es: 'lui/él', de: 'lui', ru: 'луи', it: 'lui' },
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
    'lei',
    'lei',
    { en: 'lay/lei', ko: '레이', ja: 'レイ', zh: 'lei', fr: 'lei', es: 'lei/ella', de: 'lei', ru: 'лей', it: 'lei' },
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
    'Lei',
    'Lei',
    { en: 'lay/Lei', ko: '레이', ja: 'レイ', zh: 'Lei', fr: 'Lei', es: 'usted/Lei', de: 'Sie/Lei', ru: 'Лей', it: 'Lei' },
    {
      en: 'you (singular, formal) — often capitalized; 3rd-person verbs',
      ko: '당신 (단수·존댓말) — 대문자로 쓰는 경우 많음; 3인칭 동사',
      ja: 'あなた（単数・丁寧）— 大文字が多い；三人称の動詞',
      zh: '您（单数正式）— 常大写；用第三人称动词',
      fr: 'vous (singulier formel) — souvent majuscule ; verbe à la 3e',
      es: 'usted (formal) — a menudo mayúscula ; verbo en 3.ª',
      de: 'Sie (Singular) — oft groß ; Verb in 3. Person',
      ru: 'вы (ед., вежл.) — часто с заглавной ; глагол в 3-м лице',
      it: 'Lei (formale) — spesso maiuscola ; verbo alla 3ª',
    },
  ),
  pack(
    'noi',
    'noi',
    { en: 'noy/noi', ko: '노이', ja: 'ノイ', zh: 'noi', fr: 'noi', es: 'noi/nosotros', de: 'noi', ru: 'нои', it: 'noi' },
    {
      en: 'we / us',
      ko: '우리',
      ja: '私たち',
      zh: '我们',
      fr: 'nous',
      es: 'nosotros',
      de: 'wir / uns',
      ru: 'мы',
      it: 'noi',
    },
  ),
  pack(
    'voi',
    'voi',
    { en: 'voy/voi', ko: '보이', ja: 'ヴォイ', zh: 'voi', fr: 'voi', es: 'vosotros/ustedes', de: 'voi/ihr', ru: 'вои', it: 'voi' },
    {
      en: 'you (plural; also polite plural in some regions)',
      ko: '너희·여러분 (복수; 지역에 따라 존댓말 복수도)',
      ja: '君たち／あなたたち（複数・地域で丁寧複数も）',
      zh: '你们（复数；部分地区也作礼貌复数）',
      fr: 'vous (pluriel)',
      es: 'vosotros / ustedes',
      de: 'ihr / Sie (Plural)',
      ru: 'вы (мн.)',
      it: 'voi',
    },
  ),
  pack(
    'loro',
    'loro',
    { en: 'lo-ro', ko: '로로', ja: 'ロロ', zh: 'loro', fr: 'loro', es: 'ellos/ellas', de: 'loro/sie', ru: 'лоро', it: 'loro' },
    {
      en: 'they / them (also polite plural “you” in formal writing)',
      ko: '그들 (문어·격식에서 존댓말 복수 ‘당신들’도)',
      ja: '彼ら（書き言葉の丁寧複数「あなたたち」にも）',
      zh: '他们（正式书面也作礼貌复数“你们”）',
      fr: 'ils / elles (aussi vous poli pluriel à l’écrit)',
      es: 'ellos / ellas (también ustedes formal escrito)',
      de: 'sie (auch formelles Sie Plural schriftlich)',
      ru: 'они (также вежл. мн. «вы» в письме)',
      it: 'loro',
    },
  ),
]

const TONIC = [
  { form: 'me', gloss: loc({ en: 'me (object / after prep.)', ko: '나 (목적·전치사 뒤)', ja: '私（目的・前置詞のあと）', zh: '我（宾语／介词后）', fr: 'moi', es: 'mí / me', de: 'mich / mir', ru: 'меня / мне', it: 'me' }) },
  { form: 'te', gloss: loc({ en: 'you (object / after prep., informal)', ko: '너 (목적·전치사 뒤)', ja: '君（目的・前置詞のあと）', zh: '你（宾语／介词后）', fr: 'toi', es: 'ti / te', de: 'dich / dir', ru: 'тебя / тебе', it: 'te' }) },
  { form: 'sé', gloss: loc({ en: 'oneself (reflexive, stressed)', ko: '자신 (재귀·강조)', ja: '自分（再帰・強調）', zh: '自己（反身／强调）', fr: 'soi', es: 'sí', de: 'sich', ru: 'себя', it: 'sé' }) },
  { form: 'con me', gloss: loc({ en: 'with me', ko: '나와 함께', ja: '私と一緒に', zh: '和我一起', fr: 'avec moi', es: 'conmigo', de: 'mit mir', ru: 'со мной', it: 'con me' }) },
  { form: 'con te', gloss: loc({ en: 'with you (informal)', ko: '너와 함께', ja: '君と一緒に', zh: '和你一起', fr: 'avec toi', es: 'contigo', de: 'mit dir', ru: 'с тобой', it: 'con te' }) },
  { form: 'con sé', gloss: loc({ en: 'with oneself / with him/her (refl.)', ko: '자신과·그와 함께(재귀)', ja: '自分／彼・彼女と一緒に（再帰）', zh: '和自己／他一起（反身）', fr: 'avec soi', es: 'consigo', de: 'mit sich', ru: 'с собой', it: 'con sé' }) },
]

const personCols = [
  {
    key: 'person',
    labels: loc({ en: 'Person', ko: '인칭', ja: '人称', zh: '人称', fr: 'Personne', es: 'Persona', de: 'Person', ru: 'Лицо', it: 'Persona' }),
  },
  {
    key: 'singular',
    labels: loc({ en: 'Singular', ko: '단수', ja: '単数', zh: '单数', fr: 'Singulier', es: 'Singular', de: 'Singular', ru: 'Ед. число', it: 'Singolare' }),
  },
  {
    key: 'plural',
    labels: loc({ en: 'Plural', ko: '복수', ja: '複数', zh: '复数', fr: 'Pluriel', es: 'Plural', de: 'Plural', ru: 'Мн. число', it: 'Plurale' }),
  },
]

const formCols = [
  {
    key: 'form',
    labels: loc({ en: 'Italian', ko: '이탈리아어', ja: 'イタリア語', zh: '意大利语', fr: 'Italien', es: 'Italiano', de: 'Italienisch', ru: 'Итальянский', it: 'Italiano' }),
  },
  {
    key: 'meaning',
    labels: loc({ en: 'Meaning', ko: '의미', ja: '意味', zh: '意思', fr: 'Sens', es: 'Significado', de: 'Bedeutung', ru: 'Значение', it: 'Significato' }),
  },
  {
    key: 'sound',
    labels: loc({ en: 'Sound', ko: '발음', ja: '読み', zh: '发音', fr: 'Prononciation', es: 'Pronunciación', de: 'Aussprache', ru: 'Произношение', it: 'Pronuncia' }),
  },
]

const table = {
  table_id: 'it_pronouns_ref',
  title: loc({
    en: 'Personal pronouns',
    ko: '인칭대명사',
    ja: '人称代名詞',
    zh: '人称代词',
    fr: 'Pronoms personnels',
    es: 'Pronombres personales',
    de: 'Personalpronomen',
    ru: 'Личные местоимения',
    it: 'Pronomi personali',
  }),
  note: loc({
    en: 'tu vs Lei is politeness. Spoken Italian prefers lui/lei over egli/ella; Lei (formal you) takes 3rd-person verbs.',
    ko: 'tu·Lei는 높임. 구어는 egli/ella보다 lui/lei. 존댓말 Lei는 3인칭 동사.',
    ja: 'tu と Lei は丁寧さ。口語は egli/ella より lui/lei。丁寧の Lei は三人称動詞。',
    zh: 'tu/Lei 表礼貌。口语多用 lui/lei 而非 egli/ella。敬称 Lei 接第三人称动词。',
    fr: 'tu/Lei = politesse. À l’oral : lui/lei. Lei formel + verbe à la 3e.',
    es: 'tu/Lei = cortesía. Oral: lui/lei. Lei formal + verbo en 3.ª.',
    de: 'tu/Lei = Höflichkeit. Mündlich: lui/lei. Formelles Lei + 3. Person.',
    ru: 'tu/Lei — вежливость. В речи lui/lei. Вежл. Lei — глагол в 3-м лице.',
    it: 'tu/Lei = cortesia. All’orale: lui/lei. Lei formale + verbo alla 3ª.',
  }),
  rules: {
    en: [
      'Lei (formal you) conjugates like lei (she): Lei parla.',
      'Subject pronouns are often dropped — endings show the person.',
      'egli / ella appear mainly in writing; speech uses lui / lei.',
      'After most prepositions: me, te, sé (con me, di te…) — not io, tu.',
    ],
    ko: [
      '존댓말 Lei는 lei(그녀)와 같은 동사 활용: Lei parla.',
      '주어 대명사는 자주 생략 — 어미로 인칭이 드러남.',
      'egli / ella는 주로 문어; 구어는 lui / lei.',
      '대부분 전치사 뒤: me, te, sé (con me…) — io, tu 아님.',
    ],
    ja: [
      '丁寧の Lei は lei（彼女）と同じ活用: Lei parla。',
      '主語代名詞はよく省略 — 語尾で人称が分かる。',
      'egli / ella は主に書き言葉。話し言葉は lui / lei。',
      '多くの前置詞のあと: me, te, sé — io, tu ではない。',
    ],
    zh: [
      '敬称 Lei 与 lei（她）同一变位: Lei parla。',
      '主语代词常省略 — 词尾标明人称。',
      'egli / ella 多用于书面；口语用 lui / lei。',
      '多数介词后用 me, te, sé — 不用 io, tu。',
    ],
    fr: [
      'Lei (vouvoiement) se conjugue comme lei : Lei parla.',
      'Le sujet se saute souvent — la terminaison suffit.',
      'egli / ella surtout à l’écrit ; lui / lei à l’oral.',
      'Après préposition : me, te, sé — pas io, tu.',
    ],
    es: [
      'Lei (formal) se conjuga como lei: Lei parla.',
      'El sujeto a menudo se omite.',
      'egli / ella sobre todo escrito; lui / lei oral.',
      'Tras preposición: me, te, sé — no io, tu.',
    ],
    de: [
      'Lei (höflich) konjugiert wie lei: Lei parla.',
      'Subjekt oft weggelassen.',
      'egli / ella eher schriftlich; lui / lei mündlich.',
      'Nach Präposition: me, te, sé — nicht io, tu.',
    ],
    ru: [
      'Вежл. Lei спрягается как lei: Lei parla.',
      'Подлежащее часто опускают.',
      'egli / ella чаще на письме; lui / lei в речи.',
      'После предлога: me, te, sé — не io, tu.',
    ],
    it: [
      'Lei formale si conjuga come lei: Lei parla.',
      'Il soggetto spesso si omette.',
      'egli / ella soprattutto nello scritto; lui / lei all’orale.',
      'Dopo preposizione: me, te, sé — non io, tu.',
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
        it: 'Tabella delle persone (soggetto)',
      }),
      columns: personCols,
      rows: [
        {
          person: loc({ en: '1st', ko: '1인칭', ja: '一人称', zh: '第一人称', fr: '1re', es: '1.ª', de: '1.', ru: '1-е', it: '1ª' }),
          singular: 'io',
          plural: 'noi',
        },
        {
          person: loc({ en: '2nd informal', ko: '2인칭 반말', ja: '二人称（くだけた）', zh: '第二人称（随便）', fr: '2e familier', es: '2.ª informal', de: '2. locker', ru: '2-е неформ.', it: '2ª informale' }),
          singular: 'tu',
          plural: 'voi',
        },
        {
          person: loc({ en: '2nd formal', ko: '2인칭 존댓말', ja: '二人称（丁寧）', zh: '第二人称（正式）', fr: '2e poli', es: '2.ª formal', de: '2. höflich', ru: '2-е вежл.', it: '2ª formale' }),
          singular: 'Lei',
          plural: 'voi / Loro',
        },
        {
          person: loc({ en: '3rd', ko: '3인칭', ja: '三人称', zh: '第三人称', fr: '3e', es: '3.ª', de: '3.', ru: '3-е', it: '3ª' }),
          singular: 'lui / lei',
          plural: 'loro',
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
        it: 'Forme soggetto',
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
        it: 'Forme toniche',
      }),
      note: loc({
        en: 'Reference only — not in the quiz deck. Clitic object pronouns (mi, ti, lo…) come later.',
        ko: '참고용(퀴즈 미포함). 접어 목적격(mi, ti, lo…)은 나중에.',
        ja: '参考のみ。接語の目的格（mi, ti, lo…）は後で。',
        zh: '仅供参考。附接宾语（mi, ti, lo…）以后再学。',
        fr: 'Référence seule. Pronoms clitiques (mi, ti, lo…) plus tard.',
        es: 'Solo referencia. Clíticos (mi, ti, lo…) después.',
        de: 'Nur Nachschlagewerk. Klitika (mi, ti, lo…) später.',
        ru: 'Только справка. Клитики (mi, ti, lo…) позже.',
        it: 'Solo riferimento. Clitici (mi, ti, lo…) più avanti.',
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
console.log(`it pronouns ok — ${SUBJECTS.length} cards`)
