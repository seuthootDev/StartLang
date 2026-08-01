/**
 * Russian demonstratives & directions (+ upgrade ko/ja tables to chart sections).
 * Run: node scripts/gen-demonstratives.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '../src/data')

const TITLE = {
  en: 'Demonstratives & directions',
  ko: '지시대명사·방향',
  ja: '指示詞・方向',
  zh: '指示词与方向',
  fr: 'Démonstratifs & directions',
  es: 'Demostrativos y direcciones',
  de: 'Demonstrativa & Richtungen',
  ru: 'Указательные и направления',
}

function writeJson(rel, data) {
  const full = path.join(dataDir, rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, `${JSON.stringify(data, null, 2)}\n`)
}

function sounds(en, ko, ja, form) {
  return { en, ko, ja, zh: en, fr: en, es: en, de: en, ru: form }
}

function entry(quizId, form, meaning, en, ko, ja) {
  return {
    quiz_id: quizId,
    question_word: form,
    pronunciations: sounds(en, ko, ja, form),
    translations: meaning,
  }
}

function formCols(langKey) {
  const names = {
    ko: {
      en: 'Korean',
      ko: '한국어',
      ja: '韓国語',
      zh: '韩语',
      fr: 'Coréen',
      es: 'Coreano',
      de: 'Koreanisch',
      ru: 'Корейский',
    },
    ja: {
      en: 'Japanese',
      ko: '일본어',
      ja: '日本語',
      zh: '日语',
      fr: 'Japonais',
      es: 'Japonés',
      de: 'Japanisch',
      ru: 'Японский',
    },
    ru: {
      en: 'Russian',
      ko: '러시아어',
      ja: 'ロシア語',
      zh: '俄语',
      fr: 'Russe',
      es: 'Ruso',
      de: 'Russisch',
      ru: 'Русский',
    },
  }
  return [
    { key: 'form', labels: names[langKey] },
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
}

function quizToRows(quiz) {
  return quiz.map((e) => ({
    form: e.question_word,
    meaning: e.translations,
    sound: e.pronunciations,
  }))
}

const CHART_TITLE = {
  en: 'Distance chart',
  ko: '거리 표',
  ja: '距離表',
  zh: '距离表',
  fr: 'Tableau de distance',
  es: 'Cuadro de distancia',
  de: 'Abstandstabelle',
  ru: 'Таблица расстояния',
}

const PLACE_TITLE = {
  en: 'Place & way',
  ko: '장소·방향',
  ja: '場所・方向',
  zh: '地点与方向',
  fr: 'Lieu & direction',
  es: 'Lugar y dirección',
  de: 'Ort & Richtung',
  ru: 'Место и направление',
}

const SPACE_TITLE = {
  en: 'Spatial words',
  ko: '공간·방향어',
  ja: '空間・方向語',
  zh: '方位词',
  fr: 'Mots spatiaux',
  es: 'Palabras espaciales',
  de: 'Raumwörter',
  ru: 'Пространственные слова',
}

const FORMS_TITLE = {
  en: 'Forms & sounds',
  ko: '형태와 발음',
  ja: '語形と読み',
  zh: '词形与读音',
  fr: 'Formes et sons',
  es: 'Formas y sonidos',
  de: 'Formen & Laute',
  ru: 'Формы и звучание',
}

const DIST_COLS = [
  {
    key: 'role',
    labels: {
      en: 'Role',
      ko: '역할',
      ja: '役割',
      zh: '角色',
      fr: 'Rôle',
      es: 'Rol',
      de: 'Rolle',
      ru: 'Роль',
    },
  },
  {
    key: 'near',
    labels: {
      en: 'Near me / this',
      ko: '가까운 쪽 (이)',
      ja: '近い（こ）',
      zh: '近（这）',
      fr: 'Près / ceci',
      es: 'Cerca / esto',
      de: 'Nah / dies',
      ru: 'Близко / это',
    },
  },
  {
    key: 'mid',
    labels: {
      en: 'Near you / known',
      ko: '그쪽·알려진 (그)',
      ja: 'そちら・既出（そ）',
      zh: '那边·已知',
      fr: 'Chez toi / connu',
      es: 'Cerca de ti / conocido',
      de: 'Bei dir / bekannt',
      ru: 'У тебя / известное',
    },
  },
  {
    key: 'far',
    labels: {
      en: 'Far / over there',
      ko: '먼 쪽 (저)',
      ja: '遠い（あ）',
      zh: '远（那）',
      fr: 'Loin',
      es: 'Lejos',
      de: 'Fern',
      ru: 'Далеко',
    },
  },
]

const RU_DIST_COLS = [
  {
    key: 'role',
    labels: DIST_COLS[0].labels,
  },
  {
    key: 'this',
    labels: {
      en: 'This / here',
      ko: '이·여기',
      ja: 'これ・ここ',
      zh: '这 / 这里',
      fr: 'Ceci / ici',
      es: 'Esto / aquí',
      de: 'Dies / hier',
      ru: 'Этот / здесь',
    },
  },
  {
    key: 'that',
    labels: {
      en: 'That / there',
      ko: '그·저 / 거기',
      ja: 'それ・あれ / そこ',
      zh: '那 / 那里',
      fr: 'Cela / là',
      es: 'Eso / allí',
      de: 'Jenes / dort',
      ru: 'Тот / там',
    },
  },
]

function role(labels) {
  return labels
}

// —— Russian quiz ——
const ruQuiz = [
  entry(
    'ru_demonstratives_etot',
    'этот',
    {
      en: 'this (masculine)',
      ko: '이 (남성)',
      ja: 'この / これ（男性）',
      zh: '这个（阳性）',
      fr: 'ce / cet (masculin)',
      es: 'este (masculino)',
      de: 'dieser (maskulin)',
      ru: 'этот',
    },
    'e-tot',
    '에토트',
    'エートト',
  ),
  entry(
    'ru_demonstratives_eta',
    'эта',
    {
      en: 'this (feminine)',
      ko: '이 (여성)',
      ja: 'この / これ（女性）',
      zh: '这个（阴性）',
      fr: 'cette (féminin)',
      es: 'esta (femenino)',
      de: 'diese (feminin)',
      ru: 'эта',
    },
    'e-ta',
    '에타',
    'エータ',
  ),
  entry(
    'ru_demonstratives_eto',
    'это',
    {
      en: 'this / it (neuter); “this is…”',
      ko: '이것 / 중성; “이것은…”',
      ja: 'これ / 中性；「これは…」',
      zh: '这个 / 中性；“这是…”',
      fr: 'ceci / ce (neutre)',
      es: 'esto / eso (neutro)',
      de: 'dies / es (Neutrum)',
      ru: 'это',
    },
    'e-to',
    '에토',
    'エート',
  ),
  entry(
    'ru_demonstratives_tot',
    'тот',
    {
      en: 'that (masculine)',
      ko: '그 / 저 (남성)',
      ja: 'その / あの（男性）',
      zh: '那个（阳性）',
      fr: 'ce / cet …-là (masculin)',
      es: 'aquel / ese (masculino)',
      de: 'jener (maskulin)',
      ru: 'тот',
    },
    'tot',
    '토트',
    'トト',
  ),
  entry(
    'ru_demonstratives_ta',
    'та',
    {
      en: 'that (feminine)',
      ko: '그 / 저 (여성)',
      ja: 'その / あの（女性）',
      zh: '那个（阴性）',
      fr: 'cette …-là (féminin)',
      es: 'aquella / esa (femenino)',
      de: 'jene (feminin)',
      ru: 'та',
    },
    'ta',
    '타',
    'タ',
  ),
  entry(
    'ru_demonstratives_to',
    'то',
    {
      en: 'that (neuter)',
      ko: '그것 / 저것 (중성)',
      ja: 'それ / あれ（中性）',
      zh: '那个（中性）',
      fr: 'cela (neutre)',
      es: 'aquello / eso (neutro)',
      de: 'jenes (Neutrum)',
      ru: 'то',
    },
    'to',
    '토',
    'ト',
  ),
  entry(
    'ru_demonstratives_eti',
    'эти',
    {
      en: 'these',
      ko: '이들 / 이것들',
      ja: 'これら',
      zh: '这些',
      fr: 'ces (pluriel, proches)',
      es: 'estos / estas',
      de: 'diese (Plural)',
      ru: 'эти',
    },
    'e-ti',
    '에티',
    'エーチ',
  ),
  entry(
    'ru_demonstratives_te',
    'те',
    {
      en: 'those',
      ko: '그들 / 저것들',
      ja: 'それら / あれら',
      zh: '那些',
      fr: 'ces …-là (pluriel)',
      es: 'aquellos / esos',
      de: 'jene (Plural)',
      ru: 'те',
    },
    'te',
    '테',
    'テ',
  ),
  entry(
    'ru_demonstratives_zdes',
    'здесь',
    {
      en: 'here (location)',
      ko: '여기 (장소)',
      ja: 'ここ（場所）',
      zh: '这里（地点）',
      fr: 'ici (lieu)',
      es: 'aquí (lugar)',
      de: 'hier (Ort)',
      ru: 'здесь',
    },
    'zdesʹ',
    '즈제스',
    'ズジェシ',
  ),
  entry(
    'ru_demonstratives_tam',
    'там',
    {
      en: 'there (location)',
      ko: '거기 / 저기 (장소)',
      ja: 'そこ / あそこ（場所）',
      zh: '那里（地点）',
      fr: 'là (lieu)',
      es: 'allí (lugar)',
      de: 'dort (Ort)',
      ru: 'там',
    },
    'tam',
    '탐',
    'タム',
  ),
  entry(
    'ru_demonstratives_syuda',
    'сюда',
    {
      en: 'to here / hither',
      ko: '이리로 (오는·가는 방향)',
      ja: 'ここへ',
      zh: '到这里（方向）',
      fr: 'ici (direction)',
      es: 'hacia aquí',
      de: 'hierher',
      ru: 'сюда',
    },
    'syu-da',
    '슈다',
    'スダー',
  ),
  entry(
    'ru_demonstratives_tuda',
    'туда',
    {
      en: 'to there / thither',
      ko: '그리로 / 저기로',
      ja: 'そこへ / あそこへ',
      zh: '到那里（方向）',
      fr: 'là-bas (direction)',
      es: 'hacia allí',
      de: 'dorthin',
      ru: 'туда',
    },
    'tu-da',
    '투다',
    'トゥダー',
  ),
  entry(
    'ru_demonstratives_vperedi',
    'впереди',
    {
      en: 'in front / ahead',
      ko: '앞',
      ja: '前',
      zh: '前面',
      fr: 'devant',
      es: 'delante',
      de: 'vorn / voraus',
      ru: 'впереди',
    },
    'vpe-re-di',
    '프페레디',
    'フピレジェーヂ',
  ),
  entry(
    'ru_demonstratives_szadi',
    'сзади',
    {
      en: 'behind / at the back',
      ko: '뒤',
      ja: '後ろ',
      zh: '后面',
      fr: 'derrière',
      es: 'detrás',
      de: 'hinten',
      ru: 'сзади',
    },
    'sza-di',
    '스자디',
    'スザーヂ',
  ),
  entry(
    'ru_demonstratives_sverkhu',
    'сверху',
    {
      en: 'above / from above',
      ko: '위',
      ja: '上',
      zh: '上面',
      fr: 'au-dessus',
      es: 'arriba',
      de: 'oben',
      ru: 'сверху',
    },
    'sver-khu',
    '스베르후',
    'スヴェルフー',
  ),
  entry(
    'ru_demonstratives_snizu',
    'снизу',
    {
      en: 'below / from below',
      ko: '아래',
      ja: '下',
      zh: '下面',
      fr: 'en bas',
      es: 'abajo',
      de: 'unten',
      ru: 'снизу',
    },
    'sni-zu',
    '스니주',
    'スニズー',
  ),
  entry(
    'ru_demonstratives_sleva',
    'слева',
    {
      en: 'on the left',
      ko: '왼쪽',
      ja: '左',
      zh: '左边',
      fr: 'à gauche',
      es: 'a la izquierda',
      de: 'links',
      ru: 'слева',
    },
    'sle-va',
    '슬레바',
    'スリェーヴァ',
  ),
  entry(
    'ru_demonstratives_sprava',
    'справа',
    {
      en: 'on the right',
      ko: '오른쪽',
      ja: '右',
      zh: '右边',
      fr: 'à droite',
      es: 'a la derecha',
      de: 'rechts',
      ru: 'справа',
    },
    'spra-va',
    '스프라바',
    'スプラーヴァ',
  ),
  entry(
    'ru_demonstratives_vnutri',
    'внутри',
    {
      en: 'inside',
      ko: '안',
      ja: '中',
      zh: '里面',
      fr: 'à l’intérieur',
      es: 'dentro',
      de: 'innen',
      ru: 'внутри',
    },
    'vnu-tri',
    '브누트리',
    'ヴヌトリー',
  ),
  entry(
    'ru_demonstratives_snaruzhi',
    'снаружи',
    {
      en: 'outside',
      ko: '밖',
      ja: '外',
      zh: '外面',
      fr: 'à l’extérieur',
      es: 'fuera',
      de: 'außen',
      ru: 'снаружи',
    },
    'sna-ru-zhi',
    '스나루지',
    'スナルージ',
  ),
]

const ruTable = {
  table_id: 'ru_demonstratives_ref',
  title: TITLE,
  note: {
    en: 'Russian uses a two-way this/that system with gender, plus здесь/там and сюда/туда (like где/куда).',
    ko: '러시아어는 이/그/저 셋이 아니라 этот/тот 둘 + 성 일치, 그리고 здесь/там·сюда/туда(где/куда와 같음)입니다.',
    ja: 'ロシア語はこ・そ・あの三つではなく этот/тот の二つ＋性。здесь/там と сюда/туда（где/куда型）。',
    zh: '俄语不是三向距离，而是 этот/тот 双向+性，以及 здесь/там、сюда/туда。',
    fr: 'Système à deux pôles (этот/тот) + genre ; здесь/там et сюда/туда.',
    es: 'Sistema de dos polos (этот/тот) + género; здесь/там y сюда/туда.',
    de: 'Zwei-Wege-System (этот/тот) + Genus; здесь/там und сюда/туда.',
    ru: 'Два полюса (этот/тот) + род; здесь/там и сюда/туда (как где/куда).',
  },
  rules: {
    en: [
      'этот/эта/это = this; тот/та/то = that — agree with the noun’s gender.',
      'эти / те = these / those (plural).',
      'здесь / там = location; сюда / туда = direction (to).',
      'это is also the everyday “this is…” / “it” in many sentences.',
    ],
    ko: [
      'этот/эта/это = 이; тот/та/то = 그·저 — 명사 성에 맞춥니다.',
      'эти / те = 이들 / 그들(저것들).',
      'здесь / там = 장소; сюда / туда = 방향(로).',
      'это는 “이것은…” / “그것”으로도 아주 자주 씁니다.',
    ],
    ja: [
      'этот/эта/это＝近い；тот/та/то＝遠い — 名詞の性に一致。',
      'эти / те＝これら / それら。',
      'здесь / там＝場所；сюда / туда＝方向。',
      'этоは「これは…」でもよく使う。',
    ],
    zh: [
      'этот/эта/это＝这；тот/та/то＝那 — 随名词性变化。',
      'эти / те＝这些 / 那些。',
      'здесь / там＝地点；сюда / туда＝方向。',
      'это也常作“这是…” / “它”。',
    ],
    fr: [
      'этот/эта/это = ceci ; тот/та/то = cela — accord en genre.',
      'эти / те = ceux-ci / ceux-là.',
      'здесь / там = lieu ; сюда / туда = direction.',
      'это sert aussi pour « c’est… ».',
    ],
    es: [
      'этот/эта/это = esto; тот/та/то = eso — concuerdan en género.',
      'эти / те = estos / aquellos.',
      'здесь / там = lugar; сюда / туда = dirección.',
      'это también = « esto es… ».',
    ],
    de: [
      'этот/эта/это = dies; тот/та/то = jenes — Genuskongruenz.',
      'эти / те = diese / jene.',
      'здесь / там = Ort; сюда / туда = Richtung.',
      'это oft auch « das ist… ».',
    ],
    ru: [
      'этот/эта/это — близко; тот/та/то — далеко; согласование по роду.',
      'эти / те — множественное число.',
      'здесь / там — место; сюда / туда — направление.',
      'это также в конструкциях «это…».',
    ],
  },
  sections: [
    {
      title: CHART_TITLE,
      note: {
        en: 'Unlike Korean/Japanese, Russian has two distance poles, but gender splits “this/that”.',
        ko: '한·일과 달리 거리 축은 둘이나, 성에 따라 형태가 갈립니다.',
        ja: '距離は二つだが、性で形が分かれる。',
        zh: '距离两级，但按性分形。',
        fr: 'Deux distances, formes selon le genre.',
        es: 'Dos distancias; formas según género.',
        de: 'Zwei Abstände; Formen nach Genus.',
        ru: 'Два расстояния; формы по роду.',
      },
      columns: RU_DIST_COLS,
      rows: [
        {
          role: role({
            en: 'Masc. (+ noun)',
            ko: '남성 (+명사)',
            ja: '男性（＋名詞）',
            zh: '阳性（＋名词）',
            fr: 'Masculin',
            es: 'Masculino',
            de: 'Maskulin',
            ru: 'Мужской',
          }),
          this: 'этот',
          that: 'тот',
        },
        {
          role: role({
            en: 'Fem. (+ noun)',
            ko: '여성 (+명사)',
            ja: '女性（＋名詞）',
            zh: '阴性（＋名词）',
            fr: 'Féminin',
            es: 'Femenino',
            de: 'Feminin',
            ru: 'Женский',
          }),
          this: 'эта',
          that: 'та',
        },
        {
          role: role({
            en: 'Neuter / “this is”',
            ko: '중성 / “이것은”',
            ja: '中性 / 「これは」',
            zh: '中性 / “这是”',
            fr: 'Neutre / « c’est »',
            es: 'Neutro / « esto es »',
            de: 'Neutrum / « das ist »',
            ru: 'Средний / «это…»',
          }),
          this: 'это',
          that: 'то',
        },
        {
          role: role({
            en: 'Plural',
            ko: '복수',
            ja: '複数',
            zh: '复数',
            fr: 'Pluriel',
            es: 'Plural',
            de: 'Plural',
            ru: 'Мн. число',
          }),
          this: 'эти',
          that: 'те',
        },
      ],
    },
    {
      title: PLACE_TITLE,
      note: {
        en: 'Location vs direction — same idea as где / куда.',
        ko: '장소 vs 방향 — где / куда와 같은 구분입니다.',
        ja: '場所と方向 — где / куда と同じ発想。',
        zh: '地点 vs 方向 — 同 где / куда。',
        fr: 'Lieu vs direction — comme где / куда.',
        es: 'Lugar vs dirección — como где / куда.',
        de: 'Ort vs Richtung — wie где / куда.',
        ru: 'Место и направление — как где / куда.',
      },
      columns: RU_DIST_COLS,
      rows: [
        {
          role: role({
            en: 'Location',
            ko: '장소',
            ja: '場所',
            zh: '地点',
            fr: 'Lieu',
            es: 'Lugar',
            de: 'Ort',
            ru: 'Место',
          }),
          this: 'здесь',
          that: 'там',
        },
        {
          role: role({
            en: 'Direction (to)',
            ko: '방향 (…로)',
            ja: '方向（へ）',
            zh: '方向（去）',
            fr: 'Direction',
            es: 'Dirección',
            de: 'Richtung',
            ru: 'Направление',
          }),
          this: 'сюда',
          that: 'туда',
        },
      ],
    },
    {
      title: SPACE_TITLE,
      columns: [
        {
          key: 'pair',
          labels: {
            en: 'Pair',
            ko: '짝',
            ja: '対',
            zh: '成对',
            fr: 'Paire',
            es: 'Par',
            de: 'Paar',
            ru: 'Пара',
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
      ],
      rows: [
        {
          pair: role({
            en: 'Front / back',
            ko: '앞 / 뒤',
            ja: '前 / 後ろ',
            zh: '前 / 后',
            fr: 'Devant / derrière',
            es: 'Delante / detrás',
            de: 'Vorne / hinten',
            ru: 'Спереди / сзади',
          }),
          forms: 'впереди · сзади',
        },
        {
          pair: role({
            en: 'Above / below',
            ko: '위 / 아래',
            ja: '上 / 下',
            zh: '上 / 下',
            fr: 'Haut / bas',
            es: 'Arriba / abajo',
            de: 'Oben / unten',
            ru: 'Сверху / снизу',
          }),
          forms: 'сверху · снизу',
        },
        {
          pair: role({
            en: 'Left / right',
            ko: '왼쪽 / 오른쪽',
            ja: '左 / 右',
            zh: '左 / 右',
            fr: 'Gauche / droite',
            es: 'Izquierda / derecha',
            de: 'Links / rechts',
            ru: 'Слева / справа',
          }),
          forms: 'слева · справа',
        },
        {
          pair: role({
            en: 'Inside / outside',
            ko: '안 / 밖',
            ja: '中 / 外',
            zh: '里 / 外',
            fr: 'Dedans / dehors',
            es: 'Dentro / fuera',
            de: 'Innen / außen',
            ru: 'Внутри / снаружи',
          }),
          forms: 'внутри · снаружи',
        },
      ],
    },
    {
      title: FORMS_TITLE,
      columns: formCols('ru'),
      rows: quizToRows(ruQuiz),
    },
  ],
}

writeJson('ru/demonstratives.json', ruQuiz)
writeJson('ru/demonstratives.table.json', ruTable)

// —— Upgrade ko/ja tables to sections ——
function upgradeKoJa(langKey, quizPath, tablePath, tableId, note, rules, distRows, placeRows, spaceRows) {
  const quiz = JSON.parse(fs.readFileSync(path.join(dataDir, quizPath), 'utf8'))
  const table = {
    table_id: tableId,
    title: TITLE,
    note,
    rules,
    sections: [
      {
        title: CHART_TITLE,
        note: {
          en: '· separates variants in the form list below.',
          ko: '아래 목록의 변이형은 · 로 이어져 있습니다.',
          ja: '下の一覧の変異形は・でつなぎます。',
          zh: '下方列表变体用 · 连接。',
          fr: 'Les variantes sont séparées par · ci-dessous.',
          es: 'Las variantes se separan con · abajo.',
          de: 'Varianten unten mit · getrennt.',
          ru: 'Варианты ниже через ·.',
        },
        columns: DIST_COLS,
        rows: distRows,
      },
      {
        title: PLACE_TITLE,
        columns: DIST_COLS,
        rows: placeRows,
      },
      {
        title: SPACE_TITLE,
        columns: [
          {
            key: 'pair',
            labels: {
              en: 'Pair',
              ko: '짝',
              ja: '対',
              zh: '成对',
              fr: 'Paire',
              es: 'Par',
              de: 'Paar',
              ru: 'Пара',
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
        ],
        rows: spaceRows,
      },
      {
        title: FORMS_TITLE,
        columns: formCols(langKey),
        rows: quizToRows(quiz),
      },
    ],
  }
  writeJson(tablePath, table)
}

const roleL = (en, ko, ja, zh, fr, es, de, ru) =>
  role({ en, ko, ja, zh, fr, es, de, ru })

upgradeKoJa(
  'ko',
  'ko/demonstratives.json',
  'ko/demonstratives.table.json',
  'ko_demonstratives_ref',
  {
    en: '이/그/저 distance system plus basic place words. Chart first, then forms.',
    ko: '이·그·저 거리 체계와 기본 방향어. 먼저 표를 보고 형태 목록을 외우세요.',
    ja: '이/그/저 の距離体系と基本の方向語。先に表、次に一覧。',
    zh: '이/그/저 距离体系与基本方位。先表后词形。',
    fr: 'Système i/geu/jeo et directions. Tableau puis formes.',
    es: 'Sistema i/geu/jeo y direcciones. Cuadro y luego formas.',
    de: 'i/geu/jeo-System und Richtungen. Tabelle, dann Formen.',
    ru: 'Система и/гы/чо и направления. Сначала таблица, затем формы.',
  },
  {
    en: [
      '이 = near me, 그 = near you / already known, 저 = far from both.',
      '이것/그것/저것 are the thing forms; spoken often shorten to 이거/그거/저거.',
      '여기/거기/저기 and 이쪽/그쪽/저쪽 follow the same distance pattern.',
    ],
    ko: [
      '이=화자 쪽, 그=청자·이미 알려진 것, 저=둘에서 먼 곳.',
      '이것/그것/저것은 사물형; 회화에서는 이거/그거/저거가 흔합니다.',
      '여기/거기/저기, 이쪽/그쪽/저쪽도 같은 거리 패턴입니다.',
    ],
    ja: [
      '이＝話し手寄り、그＝相手寄り・既出、저＝遠い。',
      '이것/그것/저것がもの。会話では 이거/그거/저거 が多い。',
      '여기/거기/저기、이쪽/그쪽/저쪽も同じ距離パターン。',
    ],
    zh: [
      '이靠近说话人，그靠近听者/已知，저两者都远。',
      '이것/그것/저것是事物形式；口语常说 이거/그거/저거。',
      '여기/거기/저기 与 이쪽/그쪽/저쪽 同一距离模式。',
    ],
    fr: [
      '이 = près de moi, 그 = près de toi / connu, 저 = loin.',
      '이것/그것/저것 = objets ; oral: 이거/그거/저거.',
      '여기/거기/저기 et 이쪽/그쪽/저쪽 suivent la même distance.',
    ],
    es: [
      '이 = cerca de mí, 그 = cerca de ti / conocido, 저 = lejos.',
      '이것/그것/저것 = cosas; oral: 이거/그거/저거.',
      '여기/거기/저기 y 이쪽/그쪽/저쪽 siguen la misma distancia.',
    ],
    de: [
      '이 = bei mir, 그 = bei dir / bekannt, 저 = weit weg.',
      '이것/그것/저것 = Dinge; mündlich oft 이거/그거/저거.',
      '여기/거기/저기 und 이쪽/그쪽/저쪽 folgen demselben Abstand.',
    ],
    ru: [
      '이 = рядом со мной, 그 = у тебя / известное, 저 = далеко.',
      '이것/그것/저것 — предметы; в речи часто 이거/그거/저거.',
      '여기/거기/저기 и 이쪽/그쪽/저쪽 — та же схема расстояния.',
    ],
  },
  [
    {
      role: roleL('Before noun', '명사 앞', '名詞の前', '名词前', 'Devant nom', 'Ante sustantivo', 'Vor Nomen', 'Перед сущ.'),
      near: '이',
      mid: '그',
      far: '저',
    },
    {
      role: roleL('Thing', '사물', 'もの', '事物', 'Chose', 'Cosa', 'Ding', 'Предмет'),
      near: '이것',
      mid: '그것',
      far: '저것',
    },
  ],
  [
    {
      role: roleL('Place', '장소', '場所', '地点', 'Lieu', 'Lugar', 'Ort', 'Место'),
      near: '여기',
      mid: '거기',
      far: '저기',
    },
    {
      role: roleL('Side / way', '쪽·방향', '側・方向', '边 / 方向', 'Côté', 'Lado', 'Seite', 'Сторона'),
      near: '이쪽',
      mid: '그쪽',
      far: '저쪽',
    },
  ],
  [
    { pair: roleL('Front / back', '앞 / 뒤', '前 / 後ろ', '前 / 后', 'Devant / derrière', 'Delante / detrás', 'Vorne / hinten', 'Перед / сзади'), forms: '앞 · 뒤' },
    { pair: roleL('Above / below', '위 / 아래', '上 / 下', '上 / 下', 'Haut / bas', 'Arriba / abajo', 'Oben / unten', 'Верх / низ'), forms: '위 · 아래' },
    { pair: roleL('Left / right', '왼쪽 / 오른쪽', '左 / 右', '左 / 右', 'Gauche / droite', 'Izquierda / derecha', 'Links / rechts', 'Лево / право'), forms: '왼쪽 · 오른쪽' },
    { pair: roleL('Inside / outside', '안 / 밖', '中 / 外', '里 / 外', 'Dedans / dehors', 'Dentro / fuera', 'Innen / außen', 'Внутри / снаружи'), forms: '안 · 밖' },
  ],
)

upgradeKoJa(
  'ja',
  'ja/demonstratives.json',
  'ja/demonstratives.table.json',
  'ja_demonstratives_ref',
  {
    en: 'こ/そ/あ distance system plus basic place words. Chart first, then forms.',
    ko: 'こ·そ·あ 거리 체계와 기본 방향어. 먼저 표를 보고 형태 목록을 외우세요.',
    ja: 'こ・そ・あ の距離体系と基本の方向語。先に表、次に一覧。',
    zh: 'こ/そ/あ 距离体系与基本方位。先表后词形。',
    fr: 'Système ko/so/a et directions. Tableau puis formes.',
    es: 'Sistema ko/so/a y direcciones. Cuadro y luego formas.',
    de: 'ko/so/a-System und Richtungen. Tabelle, dann Formen.',
    ru: 'Система ко/со/а и направления. Сначала таблица, затем формы.',
  },
  {
    en: [
      'こ = near me, そ = near you / known, あ = far from both. ど- forms ask questions (どれ, どこ).',
      'これ/それ/あれ stand alone; この/その/あの need a noun after them.',
      'こちら/そちら/あちら are polite; casual こっち/そっち/あっち are common in speech.',
    ],
    ko: [
      'こ=화자 쪽, そ=청자·이미 알려진 것, あ=둘에서 먼 곳. ど-는 의문(どれ, どこ).',
      'これ/それ/あれ는 단독; この/その/あの는 뒤에 명사가 필요합니다.',
      'こちら/そちら/あちら는 공손형; 회화에서는 こっち/そっち/あっち도 흔합니다.',
    ],
    ja: [
      'こ＝話し手寄り、そ＝相手寄り・既出、あ＝遠い。ど系は疑問（どれ・どこ）。',
      'これ/それ/あれは単独。この/その/あのは後ろに名詞が必要。',
      'こちら/そちら/あちらは丁寧。会話では こっち/そっち/あっち も多い。',
    ],
    zh: [
      'こ靠近说话人，そ靠近听者/已知，あ两者都远。ど-表疑问。',
      'これ/それ/あれ可单独用；この/その/あの后须接名词。',
      'こちら等较礼貌；口语常见 こっち/そっち/あっち。',
    ],
    fr: [
      'こ = près de moi, そ = près de toi / connu, あ = loin. ど- = questions.',
      'これ/それ/あれ seuls ; この/その/あの + nom.',
      'こちら… poli ; oral: こっち/そっち/あっち.',
    ],
    es: [
      'こ = cerca de mí, そ = cerca de ti / conocido, あ = lejos. ど- = preguntas.',
      'これ/それ/あれ solos; この/その/あの + sustantivo.',
      'こちら… cortés; oral: こっち/そっち/あっち.',
    ],
    de: [
      'こ = bei mir, そ = bei dir / bekannt, あ = weit. ど- = Fragen.',
      'これ/それ/あれ allein; この/その/あの + Nomen.',
      'こちら… höflich; mündlich: こっち/そっち/あっち.',
    ],
    ru: [
      'こ = рядом со мной, そ = у тебя / известное, あ = далеко. ど- = вопросы.',
      'これ/それ/あれ сами по себе; この/その/あの + существительное.',
      'こちら… вежливо; в речи часто こっち/そっち/あっち.',
    ],
  },
  [
    {
      role: roleL('Thing (alone)', '사물 (단독)', 'もの（単独）', '事物（单独）', 'Chose', 'Cosa', 'Ding', 'Предмет'),
      near: 'これ',
      mid: 'それ',
      far: 'あれ',
    },
    {
      role: roleL('Before noun', '명사 앞', '名詞の前', '名词前', 'Devant nom', 'Ante sustantivo', 'Vor Nomen', 'Перед сущ.'),
      near: 'この',
      mid: 'その',
      far: 'あの',
    },
  ],
  [
    {
      role: roleL('Place', '장소', '場所', '地点', 'Lieu', 'Lugar', 'Ort', 'Место'),
      near: 'ここ',
      mid: 'そこ',
      far: 'あそこ',
    },
    {
      role: roleL('Side / way (polite)', '쪽·방향 (공손)', '側・方向（丁寧）', '边 / 方向（礼貌）', 'Côté (poli)', 'Lado (cortés)', 'Seite (höflich)', 'Сторона (вежл.)'),
      near: 'こちら',
      mid: 'そちら',
      far: 'あちら',
    },
  ],
  [
    { pair: roleL('Front / back', '앞 / 뒤', '前 / 後ろ', '前 / 后', 'Devant / derrière', 'Delante / detrás', 'Vorne / hinten', 'Перед / сзади'), forms: '前 · 後ろ' },
    { pair: roleL('Above / below', '위 / 아래', '上 / 下', '上 / 下', 'Haut / bas', 'Arriba / abajo', 'Oben / unten', 'Верх / низ'), forms: '上 · 下' },
    { pair: roleL('Left / right', '왼쪽 / 오른쪽', '左 / 右', '左 / 右', 'Gauche / droite', 'Izquierda / derecha', 'Links / rechts', 'Лево / право'), forms: '左 · 右' },
    { pair: roleL('Inside / outside', '안 / 밖', '中 / 外', '里 / 外', 'Dedans / dehors', 'Dentro / fuera', 'Innen / außen', 'Внутри / снаружи'), forms: '中 · 外' },
  ],
)

console.log(`Wrote ru demonstratives (${ruQuiz.length}); upgraded ko/ja tables.`)
