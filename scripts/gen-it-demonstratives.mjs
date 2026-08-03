/**
 * Generate Italian demonstratives & directions quiz + reference table.
 * Modern Italian is mostly two-way (questo / quello), like French — not Spanish three-way.
 * Run: node scripts/gen-it-demonstratives.mjs
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
      quiz_id: `it_demonstratives_${id}`,
      question_word: form,
      pronunciations: sound,
      translations: meaningLoc,
    },
    row: { form, meaning: meaningLoc, sound },
  }
}

const ITEMS = [
  // —— questo (near) ——
  pack('questo', 'questo', 'kwes-to', '퀘스토', 'クエスト', {
    en: 'this (masculine singular + noun, near me)',
    ko: '이 (남성 단수 + 명사, 화자 쪽)',
    ja: 'この（男性単数＋名詞・話し手寄り）',
    zh: '这（阳性单数＋名词，靠近说话人）',
    fr: 'ce / cet (près de moi)',
    es: 'este',
    de: 'dieser (bei mir)',
    ru: 'этот (рядом со мной)',
    it: 'questo',
  }),
  pack('questa', 'questa', 'kwes-ta', '퀘스타', 'クエスタ', {
    en: 'this (feminine singular + noun, near me)',
    ko: '이 (여성 단수 + 명사, 화자 쪽)',
    ja: 'この（女性単数＋名詞・話し手寄り）',
    zh: '这（阴性单数＋名词，靠近说话人）',
    fr: 'cette (près de moi)',
    es: 'esta',
    de: 'diese (bei mir)',
    ru: 'эта (рядом со мной)',
    it: 'questa',
  }),
  pack('questi', 'questi', 'kwes-tee', '퀘스티', 'クエスティ', {
    en: 'these (masculine plural, near me)',
    ko: '이들 (남성 복수, 화자 쪽)',
    ja: 'これらの（男性複数・話し手寄り）',
    zh: '这些（阳性复数，靠近说话人）',
    fr: 'ces (près de moi)',
    es: 'estos',
    de: 'diese (bei mir, mask.)',
    ru: 'эти (рядом со мной)',
    it: 'questi',
  }),
  pack('queste', 'queste', 'kwes-te', '퀘스테', 'クエステ', {
    en: 'these (feminine plural, near me)',
    ko: '이들 (여성 복수, 화자 쪽)',
    ja: 'これらの（女性複数・話し手寄り）',
    zh: '这些（阴性复数，靠近说话人）',
    fr: 'ces (près de moi, fém.)',
    es: 'estas',
    de: 'diese (bei mir, fem.)',
    ru: 'эти (ж. р., рядом)',
    it: 'queste',
  }),

  // —— quello (far / not near me) ——
  pack('quello', 'quello', 'kwel-lo', '퀠로', 'クエッロ', {
    en: 'that (masculine singular; often quel / quell’ before a noun)',
    ko: '그·저 (남성 단수; 명사 앞 흔히 quel / quell’)',
    ja: 'その／あの（男性単数・名詞の前はよく quel／quell’）',
    zh: '那（阳性单数；名词前常作 quel／quell’）',
    fr: 'ce / cet (loin) ; formes courtes devant nom',
    es: 'ese / aquel',
    de: 'jener / der (fern; Kurzformen vor Nomen)',
    ru: 'тот (перед сущ. часто quel / quell’)',
    it: 'quello (spesso quel / quell’ + nome)',
  }),
  pack('quella', 'quella', 'kwel-la', '퀠라', 'クエッラ', {
    en: 'that (feminine singular + noun)',
    ko: '그·저 (여성 단수 + 명사)',
    ja: 'その／あの（女性単数＋名詞）',
    zh: '那（阴性单数＋名词）',
    fr: 'cette (loin)',
    es: 'esa / aquella',
    de: 'jene / die (fern)',
    ru: 'та',
    it: 'quella',
  }),
  pack('quelli', 'quelli', 'kwel-lee', '퀠리', 'クエッリ', {
    en: 'those (masculine plural; often quei / quegli before a noun)',
    ko: '그들 (남성 복수; 명사 앞 흔히 quei / quegli)',
    ja: 'それら／あれら（男性複数・名詞の前はよく quei／quegli）',
    zh: '那些（阳性复数；名词前常作 quei／quegli）',
    fr: 'ces (loin)',
    es: 'esos / aquellos',
    de: 'jene (mask. Plural)',
    ru: 'те (м. р. мн.)',
    it: 'quelli (spesso quei / quegli + nome)',
  }),
  pack('quelle', 'quelle', 'kwel-le', '퀠레', 'クエッレ', {
    en: 'those (feminine plural)',
    ko: '그들 (여성 복수)',
    ja: 'それら／あれら（女性複数）',
    zh: '那些（阴性复数）',
    fr: 'ces (loin, fém.)',
    es: 'esas / aquellas',
    de: 'jene (fem. Plural)',
    ru: 'те (ж. р. мн.)',
    it: 'quelle',
  }),

  // —— Pronouns / “this·that” ——
  pack('cio', 'ciò', 'cho/ciò', '초', 'チョ', {
    en: 'this / that (neuter situation / abstract)',
    ko: '이것·그것 (중성·상황·추상)',
    ja: 'これ／それ（中性・状況・抽象）',
    zh: '这／那（中性／情况／抽象）',
    fr: 'cela / ça',
    es: 'esto / eso',
    de: 'das / dies',
    ru: 'это / то',
    it: 'ciò',
  }),

  // —— Place ——
  pack('qui', 'qui', 'kwee/qui', '퀴', 'クィ', {
    en: 'here (near me; also qua)',
    ko: '여기 (화자 쪽; qua도)',
    ja: 'ここ（話し手寄り・qua も）',
    zh: '这里（靠近我；也用 qua）',
    fr: 'ici',
    es: 'aquí',
    de: 'hier',
    ru: 'здесь',
    it: 'qui',
  }),
  pack('qua', 'qua', 'kwa/qua', '콰', 'クァ', {
    en: 'here (near me; often interchangeable with qui)',
    ko: '여기 (화자 쪽; qui와 자주 통용)',
    ja: 'ここ（qui とほぼ同じ）',
    zh: '这里（常与 qui 通用）',
    fr: 'ici (souvent = qui)',
    es: 'aquí (a menudo = qui)',
    de: 'hier (oft = qui)',
    ru: 'здесь (часто = qui)',
    it: 'qua',
  }),
  pack('li', 'lì', 'lee/lì', '리', 'リー', {
    en: 'there (pointing / farther)',
    ko: '거기·저기 (가리키며)',
    ja: 'そこ／あそこ（指し示し）',
    zh: '那里（指着说）',
    fr: 'là',
    es: 'ahí / allí',
    de: 'da / dort',
    ru: 'там',
    it: 'lì',
  }),
  pack('la', 'là', 'la/là', '라', 'ラ', {
    en: 'there / over there (often more vague than lì)',
    ko: '저기 (lì보다 막연한 경우 많음)',
    ja: 'あそこ（lì より漠然なことも）',
    zh: '那边（常比 lì 更含糊）',
    fr: 'là / là-bas',
    es: 'allá / allí',
    de: 'dort / da drüben',
    ru: 'там / туда',
    it: 'là',
  }),

  // —— Directions ——
  pack('davanti', 'davanti', 'da-van-tee', '다반티', 'ダヴァンティ', {
    en: 'in front / ahead',
    ko: '앞',
    ja: '前',
    zh: '前面',
    fr: 'devant',
    es: 'delante',
    de: 'vorne / vor',
    ru: 'впереди / перед',
    it: 'davanti',
  }),
  pack('dietro', 'dietro', 'dye-tro', '디에트로', 'ディエトロ', {
    en: 'behind / at the back',
    ko: '뒤',
    ja: '後ろ',
    zh: '后面',
    fr: 'derrière',
    es: 'detrás',
    de: 'hinten / hinter',
    ru: 'сзади / за',
    it: 'dietro',
  }),
  pack('sopra', 'sopra', 'so-pra', '소프라', 'ソプラ', {
    en: 'up / above / on top',
    ko: '위 / 위에',
    ja: '上／上に',
    zh: '上面／在上',
    fr: 'en haut / sur',
    es: 'arriba / encima',
    de: 'oben / auf',
    ru: 'наверху / сверху',
    it: 'sopra',
  }),
  pack('sotto', 'sotto', 'sot-to', '소토', 'ソット', {
    en: 'down / below / under',
    ko: '아래 / 아래에',
    ja: '下／下に',
    zh: '下面／在下',
    fr: 'en bas / sous',
    es: 'abajo / debajo',
    de: 'unten / unter',
    ru: 'внизу / под',
    it: 'sotto',
  }),
  pack('sinistra', 'a sinistra', 'a see-nees-tra', '아 시니스트라', 'ア・シニストラ', {
    en: 'on the left / to the left',
    ko: '왼쪽 / 왼쪽으로',
    ja: '左／左へ',
    zh: '左边／向左',
    fr: 'à gauche',
    es: 'a la izquierda',
    de: 'links / nach links',
    ru: 'слева / налево',
    it: 'a sinistra',
  }),
  pack('destra', 'a destra', 'a des-tra', '아 데스트라', 'ア・デストラ', {
    en: 'on the right / to the right',
    ko: '오른쪽 / 오른쪽으로',
    ja: '右／右へ',
    zh: '右边／向右',
    fr: 'à droite',
    es: 'a la derecha',
    de: 'rechts / nach rechts',
    ru: 'справа / направо',
    it: 'a destra',
  }),
  pack('dentro', 'dentro', 'den-tro', '덴트로', 'デントロ', {
    en: 'inside',
    ko: '안 / 안에',
    ja: '中／中に',
    zh: '里面',
    fr: 'dedans',
    es: 'dentro',
    de: 'drinnen / innen',
    ru: 'внутри',
    it: 'dentro',
  }),
  pack('fuori', 'fuori', 'fwo-ree', '푸오리', 'フオーリ', {
    en: 'outside',
    ko: '밖 / 밖에',
    ja: '外／外に',
    zh: '外面',
    fr: 'dehors',
    es: 'fuera',
    de: 'draußen / außen',
    ru: 'снаружи',
    it: 'fuori',
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
    key: 'role',
    labels: loc({
      en: 'Role',
      ko: '역할',
      ja: '役割',
      zh: '角色',
      fr: 'Rôle',
      es: 'Rol',
      de: 'Rolle',
      ru: 'Роль',
      it: 'Ruolo',
    }),
  },
  {
    key: 'near',
    labels: loc({
      en: 'Near me (이)',
      ko: '화자 쪽 (이)',
      ja: '話し手寄り（이）',
      zh: '靠近我（이）',
      fr: 'Près de moi',
      es: 'Cerca de mí',
      de: 'Bei mir',
      ru: 'Рядом со мной',
      it: 'Vicino a me',
    }),
  },
  {
    key: 'far',
    labels: loc({
      en: 'Farther / not near me (그·저)',
      ko: '멀거나 화자 쪽 아님 (그·저)',
      ja: '遠い／話し手寄りでない（그・저）',
      zh: '较远／不靠近我（그·저）',
      fr: 'Plus loin / pas près de moi',
      es: 'Más lejos / no cerca de mí',
      de: 'Weiter / nicht bei mir',
      ru: 'Дальше / не рядом',
      it: 'Più lontano / non vicino a me',
    }),
  },
]

const table = {
  table_id: 'it_demonstratives_ref',
  title: loc({
    en: 'Demonstratives & directions',
    ko: '지시대명사·방향',
    ja: '指示詞・方向',
    zh: '指示词与方向',
    fr: 'Démonstratifs & directions',
    es: 'Demostrativos y direcciones',
    de: 'Demonstrativa & Richtungen',
    ru: 'Указательные и направления',
    it: 'Dimostrativi e direzioni',
  }),
  note: loc({
    en: 'Modern Italian is mostly two-way: questo (near) vs quello (farther) — closer to French than to Spanish este/ese/aquel. Agree in gender and number.',
    ko: '현대 이탈리아어는 대체로 이원: questo(가까움) vs quello(멀음) — 스페인어 삼원보다 프랑스어에 가깝습니다. 성·수 일치.',
    ja: '現代イタリア語はほぼ二区分: questo（近い）／quello（遠い）— スペイン語の三区分よりフランス語寄り。性・数一致。',
    zh: '现代意大利语多为双向: questo（近）vs quello（远）— 更接近法语而非西语三向。性、数一致。',
    fr: 'Surtout bipolaire : questo / quello (comme le français).',
    es: 'Sobre todo bipolar: questo / quello (más francés que español).',
    de: 'Meist bipolar: questo / quello (eher französisch).',
    ru: 'В основном два полюса: questo / quello (ближе к французскому).',
    it: 'Soprattutto bipolare: questo / quello. Concorda in genere/numero.',
  }),
  rules: {
    en: [
      'questo ≈ near me; quello ≈ farther / already known (not a separate “near you” like Spanish ese).',
      'Before nouns: quel libro, quell’amico, quei libri, quegli studenti (shortened quello).',
      'qui / qua = here; lì / là = there. (codesto ≈ near you is rare / regional — not in the quiz.)',
      'ciò is neuter for situations; questo/quello can also stand alone as pronouns.',
    ],
    ko: [
      'questo ≈ 화자 쪽; quello ≈ 멀거나 이미 알려진 것 (스페인어 ese 같은 별도 「청자 쪽」은 약함).',
      '명사 앞: quel libro, quell’amico, quei libri, quegli studenti (quello 축약).',
      'qui / qua = 여기; lì / là = 저기. (codesto ≈ 청자 쪽은 드묾 — 퀴즈 제외.)',
      'ciò는 상황용 중성; questo/quello도 대명사로 단독 사용.',
    ],
    ja: [
      'questo＝話し手寄り、quello＝遠い／既知（スペイン語 ese のような相手専用は弱い）。',
      '名詞の前: quel／quell’／quei／quegli。',
      'qui／qua＝ここ、lì／là＝あそこ。codesto は稀（クイズ外）。',
      'ciò は状況の中性。questo／quello は代名詞にも。',
    ],
    zh: [
      'questo≈靠近我；quello≈较远／已知（不像西语 ese 单独表“靠近你”）。',
      '名词前: quel／quell’／quei／quegli。',
      'qui／qua＝这里；lì／là＝那里。codesto 少见（不进测验）。',
      'ciò 表情况；questo／quello 也可作代词。',
    ],
    fr: [
      'questo ≈ près de moi ; quello ≈ plus loin / connu.',
      'Devant nom : quel / quell’ / quei / quegli.',
      'qui / qua = ici ; lì / là = là. codesto rare.',
      'ciò = neutre ; questo / quello aussi pronoms.',
    ],
    es: [
      'questo ≈ cerca de mí; quello ≈ más lejos / conocido.',
      'Ante nombre: quel / quell’ / quei / quegli.',
      'qui / qua = aquí; lì / là = allí. codesto raro.',
      'ciò = neutro; questo / quello también pronombres.',
    ],
    de: [
      'questo ≈ bei mir; quello ≈ weiter / bekannt.',
      'Vor Nomen: quel / quell’ / quei / quegli.',
      'qui / qua = hier; lì / là = dort. codesto selten.',
      'ciò = Neutrum; questo / quello auch Pronomen.',
    ],
    ru: [
      'questo ≈ рядом со мной; quello ≈ дальше / известное.',
      'Перед сущ.: quel / quell’ / quei / quegli.',
      'qui / qua = здесь; lì / là = там. codesto редко.',
      'ciò — средний род; questo / quello и как местоимения.',
    ],
    it: [
      'questo ≈ vicino a me; quello ≈ più lontano / già noto.',
      'Davanti al nome: quel / quell’ / quei / quegli.',
      'qui / qua = qui; lì / là = lì. codesto raro.',
      'ciò = neutro; questo / quello anche pronomi.',
    ],
  },
  sections: [
    {
      title: loc({
        en: 'Distance chart',
        ko: '거리 표',
        ja: '距離表',
        zh: '距离表',
        fr: 'Tableau de distance',
        es: 'Cuadro de distancia',
        de: 'Abstandstabelle',
        ru: 'Таблица расстояния',
        it: 'Tabella della distanza',
      }),
      note: loc({
        en: 'Two columns (like French) — not Spanish este / ese / aquel.',
        ko: '두 칸(프랑스어식) — 스페인어 este / ese / aquel이 아닙니다.',
        ja: '二列（フランス語型）— スペイン語の三区分ではない。',
        zh: '两列（法语型）— 不是西语 este／ese／aquel。',
        fr: 'Deux colonnes (comme le français).',
        es: 'Dos columnas (como el francés).',
        de: 'Zwei Spalten (wie Französisch).',
        ru: 'Две колонки (как во французском).',
        it: 'Due colonne (come il francese).',
      }),
      columns: chartCols,
      rows: [
        {
          role: loc({
            en: 'Determiner (m.sg)',
            ko: '한정사 (남·단)',
            ja: '限定詞（男・単）',
            zh: '限定词（阳单）',
            fr: 'Déterminant (m.sg)',
            es: 'Determinante (m.sg)',
            de: 'Artikelwort (m.Sg.)',
            ru: 'Определитель (м. ед.)',
            it: 'Determinante (m.sg)',
          }),
          near: 'questo',
          far: 'quello / quel / quell’',
        },
        {
          role: loc({
            en: 'Determiner (f.sg)',
            ko: '한정사 (여·단)',
            ja: '限定詞（女・単）',
            zh: '限定词（阴单）',
            fr: 'Déterminant (f.sg)',
            es: 'Determinante (f.sg)',
            de: 'Artikelwort (f.Sg.)',
            ru: 'Определитель (ж. ед.)',
            it: 'Determinante (f.sg)',
          }),
          near: 'questa',
          far: 'quella',
        },
        {
          role: loc({
            en: 'Neuter / abstract',
            ko: '중성·추상',
            ja: '中性・抽象',
            zh: '中性／抽象',
            fr: 'Neutre / abstrait',
            es: 'Neutro / abstracto',
            de: 'Neutrum / abstrakt',
            ru: 'Средний / абстракт',
            it: 'Neutro / astratto',
          }),
          near: 'questo · ciò',
          far: 'quello · ciò',
        },
        {
          role: loc({
            en: 'Place',
            ko: '장소',
            ja: '場所',
            zh: '地点',
            fr: 'Lieu',
            es: 'Lugar',
            de: 'Ort',
            ru: 'Место',
            it: 'Luogo',
          }),
          near: 'qui · qua',
          far: 'lì · là',
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
  join(OUT_DIR, 'demonstratives.json'),
  `${JSON.stringify(
    ITEMS.map((p) => p.quiz),
    null,
    2,
  )}\n`,
)
writeFileSync(
  join(OUT_DIR, 'demonstratives.table.json'),
  `${JSON.stringify(table, null, 2)}\n`,
)
console.log(`it demonstratives ok — ${ITEMS.length} cards`)
