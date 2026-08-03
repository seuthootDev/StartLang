/**
 * Generate French demonstratives & directions quiz + reference table.
 * Run: node scripts/gen-fr-demonstratives.mjs
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
      quiz_id: `fr_demonstratives_${id}`,
      question_word: form,
      pronunciations: sound,
      translations: meaningLoc,
    },
    row: { form, meaning: meaningLoc, sound },
  }
}

const ITEMS = [
  // —— Determiners ——
  pack('ce', 'ce', 'suh/ce', '스', 'ス', {
    en: 'this / that (masculine singular + noun, before consonant)',
    ko: '이·그 (남성 단수 + 명사, 자음 앞)',
    ja: 'この／その（男性単数＋名詞・子音の前）',
    zh: '这／那（阳性单数＋名词，辅音前）',
    fr: 'ce (+ nom masculin, devant consonne)',
    es: 'este / ese (masculino singular + sustantivo, ante consonante)',
    de: 'dieser / jener (mask. Singular + Nomen, vor Konsonant)',
    ru: 'этот / тот (+ сущ. м. р., перед согласной)',
  }),
  pack('cet', 'cet', 'set/cet', '세트', 'セ', {
    en: 'this / that (masculine singular + noun, before vowel or silent h)',
    ko: '이·그 (남성 단수 + 명사, 모음·묵음 h 앞)',
    ja: 'この／その（男性単数＋名詞・母音／無音の h の前）',
    zh: '这／那（阳性单数＋名词，元音或哑音 h 前）',
    fr: 'cet (+ nom masculin, devant voyelle / h muet)',
    es: 'este / ese (masculino singular, ante vocal / h muda)',
    de: 'dieser / jener (mask. Singular, vor Vokal / stummem h)',
    ru: 'этот / тот (+ сущ. м. р., перед гласной / немым h)',
  }),
  pack('cette', 'cette', 'set/cette', '세트', 'セト', {
    en: 'this / that (feminine singular + noun)',
    ko: '이·그 (여성 단수 + 명사)',
    ja: 'この／その（女性単数＋名詞）',
    zh: '这／那（阴性单数＋名词）',
    fr: 'cette (+ nom féminin)',
    es: 'esta / esa (femenino singular + sustantivo)',
    de: 'diese / jene (fem. Singular + Nomen)',
    ru: 'эта / та (+ сущ. ж. р.)',
  }),
  pack('ces', 'ces', 'seh/ces', '세', 'セ', {
    en: 'these / those (+ plural noun)',
    ko: '이들·그것들 (+ 복수 명사)',
    ja: 'これらの／それらの（＋複数名詞）',
    zh: '这些／那些（＋复数名词）',
    fr: 'ces (+ nom pluriel)',
    es: 'estos / esos (+ sustantivo plural)',
    de: 'diese / jene (+ Pluralnomen)',
    ru: 'эти / те (+ сущ. во мн. ч.)',
  }),

  // —— Pronouns / “this·that” ——
  pack('ca', 'ça', 'sa/ça', '사', 'サ', {
    en: 'this / that / it (everyday spoken)',
    ko: '이것·그것 (일상 구어)',
    ja: 'これ／それ（日常の口語）',
    zh: '这／那／它（口语）',
    fr: 'ça (familier)',
    es: 'esto / eso (hablado)',
    de: 'das (umgangssprachlich)',
    ru: 'это (разг.)',
  }),
  pack('ceci', 'ceci', 'suh-see', '스시', 'スシ', {
    en: 'this (thing, more formal / written)',
    ko: '이것 (격식·문어 쪽)',
    ja: 'これ（やや書き言葉）',
    zh: '这个（较正式／书面）',
    fr: 'ceci (plus soutenu)',
    es: 'esto (más formal)',
    de: 'dieses (förmlicher)',
    ru: 'это (более книжн.)',
  }),
  pack('cela', 'cela', 'suh-la', '슬라', 'スラ', {
    en: 'that (thing; often replaced by ça in speech)',
    ko: '그것 (구어에서는 흔히 ça)',
    ja: 'それ（口語ではよく ça）',
    zh: '那个（口语常说 ça）',
    fr: 'cela (souvent ça à l’oral)',
    es: 'eso (a menudo ça en habla)',
    de: 'jenes / das (mündlich oft ça)',
    ru: 'то / это (в речи часто ça)',
  }),
  pack('celui', 'celui', 'suh-lwee', '슬뤼', 'スリュイ', {
    en: 'this / that one (masculine); often + -ci / -là',
    ko: '그것·이쪽 (남성); 흔히 -ci / -là',
    ja: 'それ／あれ（男性・よく -ci／-là）',
    zh: '这个／那个（阳性；常加 -ci／-là）',
    fr: 'celui (souvent + -ci / -là)',
    es: 'éste / ése (masculino; a menudo + -ci / -là)',
    de: 'dieser / jener (mask.; oft + -ci / -là)',
    ru: 'этот / тот (м. р.; часто + -ci / -là)',
  }),
  pack('celle', 'celle', 'sel/celle', '셀', 'セル', {
    en: 'this / that one (feminine); often + -ci / -là',
    ko: '그것·이쪽 (여성); 흔히 -ci / -là',
    ja: 'それ／あれ（女性・よく -ci／-là）',
    zh: '这个／那个（阴性；常加 -ci／-là）',
    fr: 'celle (souvent + -ci / -là)',
    es: 'ésta / ésa (femenino; a menudo + -ci / -là)',
    de: 'diese / jene (fem.; oft + -ci / -là)',
    ru: 'эта / та (ж. р.; часто + -ci / -là)',
  }),
  pack('ceux', 'ceux', 'suh/ceux', '스', 'ス', {
    en: 'these / those ones (masculine plural)',
    ko: '이것들·그것들 (남성 복수)',
    ja: 'これら／それら（男性複数）',
    zh: '这些／那些（阳性复数）',
    fr: 'ceux (masculin pluriel)',
    es: 'éstos / ésos (masculino plural)',
    de: 'diese / jene (mask. Plural)',
    ru: 'эти / те (м. р. мн.)',
  }),
  pack('celles', 'celles', 'sel/celles', '셀', 'セル', {
    en: 'these / those ones (feminine plural)',
    ko: '이것들·그것들 (여성 복수)',
    ja: 'これら／それら（女性複数）',
    zh: '这些／那些（阴性复数）',
    fr: 'celles (féminin pluriel)',
    es: 'éstas / ésas (femenino plural)',
    de: 'diese / jene (fem. Plural)',
    ru: 'эти / те (ж. р. мн.)',
  }),

  // —— Place ——
  pack('ici', 'ici', 'ee-see/ici', '이시', 'イシ', {
    en: 'here',
    ko: '여기',
    ja: 'ここ',
    zh: '这里',
    fr: 'ici',
    es: 'aquí',
    de: 'hier',
    ru: 'здесь',
  }),
  pack('la', 'là', 'la/là', '라', 'ラ', {
    en: 'there / here (pointing; also “then”)',
    ko: '거기·저기 (가리키며; “그때” 뜻도)',
    ja: 'そこ／あそこ（指し示し。「そのとき」の意味も）',
    zh: '那里／这儿（指着说；也有“那时”）',
    fr: 'là (lieu / emphase)',
    es: 'ahí / allí',
    de: 'da / dort',
    ru: 'там / вот',
  }),
  pack('labas', 'là-bas', 'la-ba', '라바', 'ラバ', {
    en: 'over there',
    ko: '저기 (멀리)',
    ja: 'あそこ',
    zh: '那边',
    fr: 'là-bas',
    es: 'allá',
    de: 'dort drüben',
    ru: 'там (вдали)',
  }),

  // —— Directions ——
  pack('devant', 'devant', 'duh-von', '드방', 'ドゥヴァン', {
    en: 'in front / ahead',
    ko: '앞',
    ja: '前',
    zh: '前面',
    fr: 'devant',
    es: 'delante',
    de: 'vorne / vor',
    ru: 'впереди / перед',
  }),
  pack('derriere', 'derrière', 'de-ryer', '데리에르', 'デリエール', {
    en: 'behind / at the back',
    ko: '뒤',
    ja: '後ろ',
    zh: '后面',
    fr: 'derrière',
    es: 'detrás',
    de: 'hinten / hinter',
    ru: 'сзади / за',
  }),
  pack('enhaut', 'en haut', 'on o', '앙 오', 'アン・オ', {
    en: 'up / upstairs / above',
    ko: '위 / 위로',
    ja: '上／上へ',
    zh: '上面／向上',
    fr: 'en haut',
    es: 'arriba',
    de: 'oben / nach oben',
    ru: 'наверху / вверх',
  }),
  pack('enbas', 'en bas', 'on ba', '앙 바', 'アン・バ', {
    en: 'down / downstairs / below',
    ko: '아래 / 아래로',
    ja: '下／下へ',
    zh: '下面／向下',
    fr: 'en bas',
    es: 'abajo',
    de: 'unten / nach unten',
    ru: 'внизу / вниз',
  }),
  pack('agauche', 'à gauche', 'a gosh', '아 고슈', 'ア・ゴーシュ', {
    en: 'on the left / to the left',
    ko: '왼쪽 / 왼쪽으로',
    ja: '左／左へ',
    zh: '左边／向左',
    fr: 'à gauche',
    es: 'a la izquierda',
    de: 'links / nach links',
    ru: 'слева / налево',
  }),
  pack('adroite', 'à droite', 'a drwat', '아 드루아트', 'ア・ドロワット', {
    en: 'on the right / to the right',
    ko: '오른쪽 / 오른쪽으로',
    ja: '右／右へ',
    zh: '右边／向右',
    fr: 'à droite',
    es: 'a la derecha',
    de: 'rechts / nach rechts',
    ru: 'справа / направо',
  }),
  pack('dedans', 'dedans', 'duh-don', '드당', 'ドゥダン', {
    en: 'inside',
    ko: '안 / 안에',
    ja: '中／中に',
    zh: '里面',
    fr: 'dedans',
    es: 'dentro',
    de: 'drinnen / innen',
    ru: 'внутри',
  }),
  pack('dehors', 'dehors', 'duh-or', '드오르', 'ドゥオール', {
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
    key: 'near',
    labels: loc({
      en: 'Near / this',
      ko: '가까운 쪽·이',
      ja: '近い・これ',
      zh: '近／这',
      fr: 'Proche / ceci',
      es: 'Cerca / esto',
      de: 'Nah / dies',
      ru: 'Близко / это',
    }),
  },
  {
    key: 'far',
    labels: loc({
      en: 'Far / that',
      ko: '먼 쪽·그·저',
      ja: '遠い・それ／あれ',
      zh: '远／那',
      fr: 'Loin / cela',
      es: 'Lejos / eso',
      de: 'Fern / jenes',
      ru: 'Далеко / то',
    }),
  },
]

const table = {
  table_id: 'fr_demonstratives_ref',
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
    en: 'Determiners agree in gender/number. Distance often uses -ci / -là or ici / là / là-bas — not a Korean-style three-way 이·그·저.',
    ko: '한정사는 성·수 일치. 거리는 -ci/-là 또는 ici/là/là-bas — 한국어 이·그·저 셋이 아닙니다.',
    ja: '限定詞は性・数一致。距離は -ci／-là や ici／là／là-bas — 이・그・저 の三区分ではない。',
    zh: '限定词有性、数一致。距离多用 -ci/-là 或 ici/là/là-bas — 不是韩语的三向 이·그·저。',
    fr: 'Accord en genre/nombre. Distance : -ci/-là ou ici/là/là-bas (pas le triptyque coréen).',
    es: 'Concuerdan en género/número. Distancia: -ci/-là o ici/là/là-bas.',
    de: 'Genus-/Numerus-Kongruenz. Distanz: -ci/-là oder ici/là/là-bas.',
    ru: 'Согласование по роду/числу. Дистанция: -ci/-là или ici/là/là-bas.',
  }),
  rules: {
    en: [
      'ce → cet before a vowel or silent h (cet ami, cet homme).',
      'ça is the everyday stand-in for ceci/cela.',
      'celui/celle/ceux/celles often take -ci (near) or -là (far): celui-ci / celui-là.',
      'ici = here; là = there (also filler); là-bas = over there.',
    ],
    ko: [
      '모음·묵음 h 앞에서는 ce → cet (cet ami, cet homme).',
      '일상에서는 ceci/cela 대신 ça를 많이 씁니다.',
      'celui/celle/ceux/celles는 흔히 -ci(가까운)·-là(먼): celui-ci / celui-là.',
      'ici = 여기; là = 거기(채움말도); là-bas = 저기.',
    ],
    ja: [
      '母音・無音の h の前は ce → cet。',
      '日常は ceci/cela の代わりに ça。',
      'celui などはよく -ci（近い）／-là（遠い）。',
      'ici＝ここ、là＝そこ、là-bas＝あそこ。',
    ],
    zh: [
      '元音或哑音 h 前 ce → cet。',
      '口语常用 ça 代替 ceci/cela。',
      'celui 等常加 -ci（近）／-là（远）。',
      'ici＝这里；là＝那里；là-bas＝那边。',
    ],
    fr: [
      'ce → cet devant voyelle / h muet.',
      'ça remplace souvent ceci/cela à l’oral.',
      'celui/celle… + -ci (proche) / -là (loin).',
      'ici / là / là-bas.',
    ],
    es: [
      'ce → cet ante vocal / h muda.',
      'ça sustituye a menudo a ceci/cela.',
      'celui/celle… + -ci / -là.',
      'ici / là / là-bas.',
    ],
    de: [
      'ce → cet vor Vokal / stummem h.',
      'ça ersetzt mündlich oft ceci/cela.',
      'celui/celle… + -ci / -là.',
      'ici / là / là-bas.',
    ],
    ru: [
      'ce → cet перед гласной / немым h.',
      'ça часто вместо ceci/cela в речи.',
      'celui/celle… + -ci / -là.',
      'ici / là / là-bas.',
    ],
    it: [
      'ce → cet davanti a vocale / h muta.',
      'ça spesso al posto di ceci/cela.',
      'celui/celle… + -ci / -là.',
      'ici / là / là-bas.',
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
        en: 'Determiners (ce…) do not mark near/far alone — add -ci/-là or use ici/là.',
        ko: '한정사(ce…)만으로는 원근이 안 갈립니다 — -ci/-là 또는 ici/là를 붙입니다.',
        ja: '限定詞だけでは遠近が分かれない — -ci／-là や ici／là を使う。',
        zh: '限定词本身不分远近 — 加 -ci/-là 或用 ici/là。',
        fr: 'ce… ne marque pas la distance seul — -ci/-là ou ici/là.',
        es: 'ce… solo no marca distancia — -ci/-là o ici/là.',
        de: 'ce… allein markiert keine Distanz — -ci/-là oder ici/là.',
        ru: 'ce… само по себе не даёт дистанции — -ci/-là или ici/là.',
      }),
      columns: chartCols,
      rows: [
        {
          role: loc({
            en: 'Determiner + noun',
            ko: '한정사 + 명사',
            ja: '限定詞＋名詞',
            zh: '限定词＋名词',
            fr: 'Déterminant + nom',
            es: 'Determinante + sustantivo',
            de: 'Artikelwort + Nomen',
            ru: 'Определитель + сущ.',
          }),
          near: 'ce livre-ci · cette maison-ci',
          far: 'ce livre-là · cette maison-là',
        },
        {
          role: loc({
            en: 'Pronoun (one / ones)',
            ko: '대명사 (그것/것들)',
            ja: '代名詞（それ／それら）',
            zh: '代词（那个／那些）',
            fr: 'Pronom',
            es: 'Pronombre',
            de: 'Pronomen',
            ru: 'Местоимение',
          }),
          near: 'celui-ci · celle-ci · ceux-ci',
          far: 'celui-là · celle-là · ceux-là',
        },
        {
          role: loc({
            en: 'Thing (this/that)',
            ko: '사물 (이것/그것)',
            ja: 'もの（これ／それ）',
            zh: '事物（这／那）',
            fr: 'Chose',
            es: 'Cosa',
            de: 'Ding',
            ru: 'Предмет',
          }),
          near: 'ceci · ça',
          far: 'cela · ça',
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
          near: 'ici',
          far: 'là · là-bas',
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
console.log(`fr demonstratives ok — ${ITEMS.length} cards`)
