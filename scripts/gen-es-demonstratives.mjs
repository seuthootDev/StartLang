/**
 * Generate Spanish demonstratives & directions quiz + reference table.
 * Three-way este / ese / aquel (closer to Korean 이·그·저 than French).
 * Run: node scripts/gen-es-demonstratives.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/es')

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
    es: form,
    de: en,
    ru: en,
  })
}

function pack(id, form, en, ko, ja, meaning) {
  const sound = sounds(en, ko, ja, form)
  const meaningLoc = loc(meaning)
  return {
    quiz: {
      quiz_id: `es_demonstratives_${id}`,
      question_word: form,
      pronunciations: sound,
      translations: meaningLoc,
    },
    row: { form, meaning: meaningLoc, sound },
  }
}

const ITEMS = [
  // —— este (near me) ——
  pack('este', 'este', 'es-te', '에스테', 'エステ', {
    en: 'this (masculine singular + noun, near me)',
    ko: '이 (남성 단수 + 명사, 화자 쪽)',
    ja: 'この（男性単数＋名詞・話し手寄り）',
    zh: '这（阳性单数＋名词，靠近说话人）',
    fr: 'ce / cet (près de moi)',
    es: 'este',
    de: 'dieser (bei mir)',
    ru: 'этот (рядом со мной)',
  }),
  pack('esta', 'esta', 'es-ta', '에스타', 'エスタ', {
    en: 'this (feminine singular + noun, near me)',
    ko: '이 (여성 단수 + 명사, 화자 쪽)',
    ja: 'この（女性単数＋名詞・話し手寄り）',
    zh: '这（阴性单数＋名词，靠近说话人）',
    fr: 'cette (près de moi)',
    es: 'esta',
    de: 'diese (bei mir)',
    ru: 'эта (рядом со мной)',
  }),
  pack('estos', 'estos', 'es-tos', '에스토스', 'エストス', {
    en: 'these (masculine plural, near me)',
    ko: '이들 (남성 복수, 화자 쪽)',
    ja: 'これらの（男性複数・話し手寄り）',
    zh: '这些（阳性复数，靠近说话人）',
    fr: 'ces (près de moi)',
    es: 'estos',
    de: 'diese (bei mir, mask.)',
    ru: 'эти (рядом со мной)',
  }),
  pack('esto', 'esto', 'es-to', '에스토', 'エスト', {
    en: 'this (neuter thing / situation, near me)',
    ko: '이것 (중성·상황, 화자 쪽)',
    ja: 'これ（中性・状況・話し手寄り）',
    zh: '这个（中性／情况，靠近说话人）',
    fr: 'ceci / ça (près de moi)',
    es: 'esto',
    de: 'dies (Neutrum, bei mir)',
    ru: 'это (рядом со мной)',
  }),

  // —— ese (near you / known) ——
  pack('ese', 'ese', 'e-se', '에세', 'エセ', {
    en: 'that (masculine singular + noun, near you / known)',
    ko: '그 (남성 단수 + 명사, 청자·이미 알려진)',
    ja: 'その（男性単数＋名詞・相手寄り／既出）',
    zh: '那（阳性单数＋名词，靠近听者／已知）',
    fr: 'ce / cet (près de toi / connu)',
    es: 'ese',
    de: 'jener / der (bei dir / bekannt)',
    ru: 'тот (у тебя / известное)',
  }),
  pack('esa', 'esa', 'e-sa', '에사', 'エサ', {
    en: 'that (feminine singular + noun, near you / known)',
    ko: '그 (여성 단수 + 명사, 청자·이미 알려진)',
    ja: 'その（女性単数＋名詞・相手寄り／既出）',
    zh: '那（阴性单数＋名词，靠近听者／已知）',
    fr: 'cette (près de toi / connu)',
    es: 'esa',
    de: 'jene / die (bei dir / bekannt)',
    ru: 'та (у тебя / известное)',
  }),
  pack('esos', 'esos', 'e-sos', '에소스', 'エソス', {
    en: 'those (masculine plural, near you / known)',
    ko: '그들 (남성 복수, 청자·알려진)',
    ja: 'それらの（男性複数・相手寄り／既出）',
    zh: '那些（阳性复数，靠近听者／已知）',
    fr: 'ces (près de toi / connu)',
    es: 'esos',
    de: 'jene (bei dir, mask.)',
    ru: 'те (у тебя / известное)',
  }),
  pack('eso', 'eso', 'e-so', '에소', 'エソ', {
    en: 'that (neuter thing / situation, near you / known)',
    ko: '그것 (중성·상황, 청자·알려진)',
    ja: 'それ（中性・状況・相手寄り／既出）',
    zh: '那个（中性／情况，靠近听者／已知）',
    fr: 'cela / ça',
    es: 'eso',
    de: 'das (Neutrum)',
    ru: 'то / это',
  }),

  // —— aquel (far) ——
  pack('aquel', 'aquel', 'a-kel', '아켈', 'アケル', {
    en: 'that (masculine singular + noun, over there / far)',
    ko: '저 (남성 단수 + 명사, 멀리)',
    ja: 'あの（男性単数＋名詞・遠い）',
    zh: '那（阳性单数＋名词，远处）',
    fr: 'ce / cet (loin)',
    es: 'aquel',
    de: 'jener (dort drüben)',
    ru: 'тот (там вдали)',
  }),
  pack('aquella', 'aquella', 'a-ke-ya', '아케야', 'アケジャ', {
    en: 'that (feminine singular + noun, over there / far)',
    ko: '저 (여성 단수 + 명사, 멀리)',
    ja: 'あの（女性単数＋名詞・遠い）',
    zh: '那（阴性单数＋名词，远处）',
    fr: 'cette (loin)',
    es: 'aquella',
    de: 'jene (dort drüben)',
    ru: 'та (там вдали)',
  }),
  pack('aquellos', 'aquellos', 'a-ke-yos', '아케요스', 'アケジョス', {
    en: 'those (masculine plural, over there / far)',
    ko: '저것들 (남성 복수, 멀리)',
    ja: 'あれら（男性複数・遠い）',
    zh: '那些（阳性复数，远处）',
    fr: 'ces (loin)',
    es: 'aquellos',
    de: 'jene (dort, mask.)',
    ru: 'те (там вдали)',
  }),
  pack('aquello', 'aquello', 'a-ke-yo', '아케요', 'アケジョ', {
    en: 'that (neuter thing / situation, far / abstract)',
    ko: '저것 (중성·상황, 멀리·추상)',
    ja: 'あれ（中性・状況・遠い／抽象）',
    zh: '那个（中性／情况，远处／抽象）',
    fr: 'cela (loin / abstrait)',
    es: 'aquello',
    de: 'jenes (Neutrum, fern)',
    ru: 'то (там / абстрактно)',
  }),

  // —— Place ——
  pack('aqui', 'aquí', 'a-kee', '아키', 'アキ', {
    en: 'here (near me)',
    ko: '여기',
    ja: 'ここ',
    zh: '这里',
    fr: 'ici',
    es: 'aquí',
    de: 'hier',
    ru: 'здесь',
  }),
  pack('ahi', 'ahí', 'a-ee/ahí', '아이', 'アイ', {
    en: 'there (near you / known place)',
    ko: '거기 (청자·알려진 곳)',
    ja: 'そこ（相手寄り／既知の場所）',
    zh: '那里（靠近听者／已知处）',
    fr: 'là (près de toi)',
    es: 'ahí',
    de: 'da (bei dir)',
    ru: 'там (у тебя / известное)',
  }),
  pack('alli', 'allí', 'a-yee/allí', '아지', 'アジ', {
    en: 'over there (farther)',
    ko: '저기 (더 멀리)',
    ja: 'あそこ（より遠い）',
    zh: '那边（更远）',
    fr: 'là-bas',
    es: 'allí',
    de: 'dort',
    ru: 'там (дальше)',
  }),
  pack('alla', 'allá', 'a-ya/allá', '아야', 'アジャ', {
    en: 'over there / that way (often more vague / distant)',
    ko: '저기·저쪽 (더 막연·멀리)',
    ja: 'あそこ／あちら（やや漠然・遠い）',
    zh: '那边／那边儿（较含糊／远）',
    fr: 'là-bas / par là',
    es: 'allá',
    de: 'dort hin / da drüben',
    ru: 'туда / там',
  }),

  // —— Directions ——
  pack('delante', 'delante', 'de-lan-te', '델란테', 'デランテ', {
    en: 'in front / ahead',
    ko: '앞',
    ja: '前',
    zh: '前面',
    fr: 'devant',
    es: 'delante',
    de: 'vorne / vor',
    ru: 'впереди / перед',
  }),
  pack('detras', 'detrás', 'de-tras', '데트라스', 'デトラス', {
    en: 'behind / at the back',
    ko: '뒤',
    ja: '後ろ',
    zh: '后面',
    fr: 'derrière',
    es: 'detrás',
    de: 'hinten / hinter',
    ru: 'сзади / за',
  }),
  pack('arriba', 'arriba', 'a-ree-ba', '아리바', 'アリバ', {
    en: 'up / above / upstairs',
    ko: '위 / 위로',
    ja: '上／上へ',
    zh: '上面／向上',
    fr: 'en haut',
    es: 'arriba',
    de: 'oben / nach oben',
    ru: 'наверху / вверх',
  }),
  pack('abajo', 'abajo', 'a-ba-ho', '아바호', 'アバホ', {
    en: 'down / below / downstairs',
    ko: '아래 / 아래로',
    ja: '下／下へ',
    zh: '下面／向下',
    fr: 'en bas',
    es: 'abajo',
    de: 'unten / nach unten',
    ru: 'внизу / вниз',
  }),
  pack('izquierda', 'a la izquierda', 'a la eeth-kyer-da', '아 라 이스키에르다', 'ア・ラ・イスキエルダ', {
    en: 'on the left / to the left',
    ko: '왼쪽 / 왼쪽으로',
    ja: '左／左へ',
    zh: '左边／向左',
    fr: 'à gauche',
    es: 'a la izquierda',
    de: 'links / nach links',
    ru: 'слева / налево',
  }),
  pack('derecha', 'a la derecha', 'a la de-re-cha', '아 라 데레차', 'ア・ラ・デレチャ', {
    en: 'on the right / to the right',
    ko: '오른쪽 / 오른쪽으로',
    ja: '右／右へ',
    zh: '右边／向右',
    fr: 'à droite',
    es: 'a la derecha',
    de: 'rechts / nach rechts',
    ru: 'справа / направо',
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
  }),
  pack('fuera', 'fuera', 'fwe-ra', '후에라', 'フエラ', {
    en: 'outside',
    ko: '밖 / 밖에',
    ja: '外／外に',
    zh: '外面',
    fr: 'dehors',
    es: 'fuera',
    de: 'draußen / außen',
    ru: 'снаружи',
  }),
]

const formCols = [
  {
    key: 'form',
    labels: loc({
      en: 'Spanish',
      ko: '스페인어',
      ja: 'スペイン語',
      zh: '西班牙语',
      fr: 'Espagnol',
      es: 'Español',
      de: 'Spanisch',
      ru: 'Испанский',
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
    }),
  },
  {
    key: 'near_me',
    labels: loc({
      en: 'Near me (이)',
      ko: '화자 쪽 (이)',
      ja: '話し手寄り（이）',
      zh: '靠近我（이）',
      fr: 'Près de moi',
      es: 'Cerca de mí',
      de: 'Bei mir',
      ru: 'Рядом со мной',
    }),
  },
  {
    key: 'near_you',
    labels: loc({
      en: 'Near you (그)',
      ko: '청자·알려진 (그)',
      ja: '相手寄り／既出（그）',
      zh: '靠近你／已知（그）',
      fr: 'Près de toi / connu',
      es: 'Cerca de ti / conocido',
      de: 'Bei dir / bekannt',
      ru: 'У тебя / известное',
    }),
  },
  {
    key: 'far',
    labels: loc({
      en: 'Far (저)',
      ko: '멀리 (저)',
      ja: '遠い（저）',
      zh: '远处（저）',
      fr: 'Loin',
      es: 'Lejos',
      de: 'Weit weg',
      ru: 'Далеко',
    }),
  },
]

const table = {
  table_id: 'es_demonstratives_ref',
  title: loc({
    en: 'Demonstratives & directions',
    ko: '지시대명사·방향',
    ja: '指示詞・方向',
    zh: '指示词与方向',
    fr: 'Démonstratifs & directions',
    es: 'Demostrativos y direcciones',
    de: 'Demonstrativa & Richtungen',
    ru: 'Указательные и направления',
  }),
  note: loc({
    en: 'Spanish has a three-way system like Korean 이·그·저: este / ese / aquel. Agree in gender and number.',
    ko: '스페인어는 이·그·저처럼 셋: este / ese / aquel. 성·수 일치.',
    ja: 'スペイン語は 이・그・저 型の三つ: este / ese / aquel。性・数一致。',
    zh: '西班牙语是三向体系（像이·그·저）: este / ese / aquel。性、数一致。',
    fr: 'Système à trois pôles (comme 이·그·저) : este / ese / aquel.',
    es: 'Sistema de tres distancias: este / ese / aquel. Concuerdan en género/número.',
    de: 'Drei-Wege-System (wie 이·그·저): este / ese / aquel.',
    ru: 'Три полюса (как 이·그·저): este / ese / aquel.',
  }),
  rules: {
    en: [
      'este ≈ near me; ese ≈ near you / already mentioned; aquel ≈ far from both.',
      'esto / eso / aquello are neuter (things or situations), not + noun.',
      'aquí / ahí / allí follow the same three distances; allá is often vaguer or farther.',
      'estas / esas / aquellas = feminine plural (same pattern as estos…).',
    ],
    ko: [
      'este ≈ 화자 쪽; ese ≈ 청자·이미 언급; aquel ≈ 둘에서 먼 곳.',
      'esto / eso / aquello는 중성(사물·상황), 명사 앞에 안 씀.',
      'aquí / ahí / allí도 같은 세 거리; allá는 더 막연하거나 멀리.',
      'estas / esas / aquellas = 여성 복수 (estos와 같은 패턴).',
    ],
    ja: [
      'este＝話し手寄り、ese＝相手寄り／既出、aquel＝遠い。',
      'esto／eso／aquello は中性（もの・状況）で名詞の前に置かない。',
      'aquí／ahí／allí も同じ三距離。allá はより漠然・遠い。',
      'estas／esas／aquellas＝女性複数。',
    ],
    zh: [
      'este≈靠近我；ese≈靠近你／已提及；aquel≈两者都远。',
      'esto／eso／aquello 为中性（事物／情况），不加名词。',
      'aquí／ahí／allí 同一三距离；allá 更含糊或更远。',
      'estas／esas／aquellas＝阴性复数。',
    ],
    fr: [
      'este ≈ près de moi ; ese ≈ près de toi / déjà dit ; aquel ≈ loin.',
      'esto / eso / aquello = neutres (pas + nom).',
      'aquí / ahí / allí = mêmes distances ; allá plus vague.',
      'estas / esas / aquellas = féminin pluriel.',
    ],
    es: [
      'este ≈ cerca de mí; ese ≈ cerca de ti / mencionado; aquel ≈ lejos.',
      'esto / eso / aquello = neutros (no + sustantivo).',
      'aquí / ahí / allí = mismas distancias; allá más vago.',
      'estas / esas / aquellas = femenino plural.',
    ],
    de: [
      'este ≈ bei mir; ese ≈ bei dir / erwähnt; aquel ≈ weit weg.',
      'esto / eso / aquello = Neutrum (nicht + Nomen).',
      'aquí / ahí / allí = dieselben Distanzen; allá unschärfer.',
      'estas / esas / aquellas = Feminin Plural.',
    ],
    ru: [
      'este ≈ рядом со мной; ese ≈ у тебя / уже сказано; aquel ≈ далеко.',
      'esto / eso / aquello — средний род (не + сущ.).',
      'aquí / ahí / allí — те же дистанции; allá более размыто.',
      'estas / esas / aquellas — ж. р. мн.',
    ],
    it: [
      'este ≈ vicino a me; ese ≈ vicino a te / già detto; aquel ≈ lontano.',
      'esto / eso / aquello = neutri (non + nome).',
      'aquí / ahí / allí = stesse distanze; allá più vago.',
      'estas / esas / aquellas = femminile plurale.',
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
      }),
      note: loc({
        en: 'Like Korean 이·그·저 — three columns, not French-style two.',
        ko: '한국어 이·그·저처럼 세 칸 — 프랑스어식 둘이 아닙니다.',
        ja: '한국어 이・그・저 型の三列 — フランス語の二区分ではない。',
        zh: '像韩语이·그·저三列 — 不是法语的两向。',
        fr: 'Comme 이·그·저 — trois colonnes, pas le bipolaire français.',
        es: 'Como 이·그·저 — tres columnas, no el sistema francés de dos.',
        de: 'Wie 이·그·저 — drei Spalten, nicht das französische Zwei-System.',
        ru: 'Как 이·그·저 — три колонки, не французская двойка.',
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
          }),
          near_me: 'este',
          near_you: 'ese',
          far: 'aquel',
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
          }),
          near_me: 'esta',
          near_you: 'esa',
          far: 'aquella',
        },
        {
          role: loc({
            en: 'Neuter (thing)',
            ko: '중성 (사물)',
            ja: '中性（もの）',
            zh: '中性（事物）',
            fr: 'Neutre',
            es: 'Neutro',
            de: 'Neutrum',
            ru: 'Средний род',
          }),
          near_me: 'esto',
          near_you: 'eso',
          far: 'aquello',
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
          }),
          near_me: 'aquí',
          near_you: 'ahí',
          far: 'allí · allá',
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
console.log(`es demonstratives ok — ${ITEMS.length} cards`)
