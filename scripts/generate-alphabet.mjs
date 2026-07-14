import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function writeJson(relPath, data) {
  writeFileSync(join(root, relPath), `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log('wrote', relPath, Array.isArray(data) ? `(${data.length})` : '')
}

/** Latin-script learner languages often share the same romanization */
function L(en, extras = {}) {
  return { en, zh: en, fr: en, es: en, de: en, ...extras }
}

function sounds(en, ja, ru, extras = {}) {
  return { ...L(en, extras), ja, ru }
}

// --- Korean ---
const koConsonants = [
  { char: 'ㄱ', s: sounds('g/k', 'グ/ク', 'г/к'), name: { ko: '기역', en: 'giyeok', ja: 'ギヨク', zh: 'giyeok', fr: 'giyeok', es: 'giyeok', de: 'giyeok', ru: 'кийок' }, koSound: '그/크' },
  { char: 'ㄲ', s: sounds('kk', 'ック', 'кк'), name: { ko: '쌍기역', en: 'ssanggiyeok', ja: 'サンギヨク', zh: 'ssanggiyeok', fr: 'ssanggiyeok', es: 'ssanggiyeok', de: 'ssanggiyeok', ru: 'ссангиёк' }, koSound: '끄' },
  { char: 'ㄴ', s: sounds('n', 'ン', 'н'), name: { ko: '니은', en: 'nieun', ja: 'ニウン', zh: 'nieun', fr: 'nieun', es: 'nieun', de: 'nieun', ru: 'ниын' }, koSound: '느' },
  { char: 'ㄷ', s: sounds('d/t', 'ド/ト', 'д/т'), name: { ko: '디귿', en: 'digeut', ja: 'ティグッ', zh: 'digeut', fr: 'digeut', es: 'digeut', de: 'digeut', ru: 'тигыт' }, koSound: '드/트' },
  { char: 'ㄸ', s: sounds('tt', 'ット', 'тт'), name: { ko: '쌍디귿', en: 'ssangdigeut', ja: 'サンディグッ', zh: 'ssangdigeut', fr: 'ssangdigeut', es: 'ssangdigeut', de: 'ssangdigeut', ru: 'ссандигыт' }, koSound: '뜨' },
  { char: 'ㄹ', s: sounds('r/l', 'ル', 'р/л'), name: { ko: '리을', en: 'rieul', ja: 'リウル', zh: 'rieul', fr: 'rieul', es: 'rieul', de: 'rieul', ru: 'риыль' }, koSound: '르' },
  { char: 'ㅁ', s: sounds('m', 'ム', 'м'), name: { ko: '미음', en: 'mieum', ja: 'ミウム', zh: 'mieum', fr: 'mieum', es: 'mieum', de: 'mieum', ru: 'миым' }, koSound: '므' },
  { char: 'ㅂ', s: sounds('b/p', 'ブ/プ', 'б/п'), name: { ko: '비읍', en: 'bieup', ja: 'ビウプ', zh: 'bieup', fr: 'bieup', es: 'bieup', de: 'bieup', ru: 'пиып' }, koSound: '브/프' },
  { char: 'ㅃ', s: sounds('pp', 'ップ', 'пп'), name: { ko: '쌍비읍', en: 'ssangbieup', ja: 'サンビウプ', zh: 'ssangbieup', fr: 'ssangbieup', es: 'ssangbieup', de: 'ssangbieup', ru: 'ссанбиып' }, koSound: '쁘' },
  { char: 'ㅅ', s: sounds('s', 'ス', 'с'), name: { ko: '시옷', en: 'siot', ja: 'シオト', zh: 'siot', fr: 'siot', es: 'siot', de: 'siot', ru: 'сиот' }, koSound: '스' },
  { char: 'ㅆ', s: sounds('ss', 'ッス', 'сс'), name: { ko: '쌍시옷', en: 'ssangsiot', ja: 'サンシオト', zh: 'ssangsiot', fr: 'ssangsiot', es: 'ssangsiot', de: 'ssangsiot', ru: 'ссансиот' }, koSound: '쓰' },
  { char: 'ㅇ', s: sounds('-/ng', '-/ン', '-/н'), name: { ko: '이응', en: 'ieung', ja: 'イウン', zh: 'ieung', fr: 'ieung', es: 'ieung', de: 'ieung', ru: 'иын' }, koSound: '-/응' },
  { char: 'ㅈ', s: sounds('j', 'ジ', 'дж'), name: { ko: '지읒', en: 'jieut', ja: 'ジウッ', zh: 'jieut', fr: 'jieut', es: 'jieut', de: 'jieut', ru: 'чиыт' }, koSound: '즈' },
  { char: 'ㅉ', s: sounds('jj', 'ッジ', 'дждж'), name: { ko: '쌍지읒', en: 'ssangjieut', ja: 'サンジウッ', zh: 'ssangjieut', fr: 'ssangjieut', es: 'ssangjieut', de: 'ssangjieut', ru: 'ссанчиыт' }, koSound: '쯔' },
  { char: 'ㅊ', s: sounds('ch', 'チ', 'ч'), name: { ko: '치읓', en: 'chieut', ja: 'チウッ', zh: 'chieut', fr: 'chieut', es: 'chieut', de: 'chieut', ru: 'чхиыт' }, koSound: '츠' },
  { char: 'ㅋ', s: sounds('k', 'ク', 'к'), name: { ko: '키읔', en: 'kieuk', ja: 'キウク', zh: 'kieuk', fr: 'kieuk', es: 'kieuk', de: 'kieuk', ru: 'кхиык' }, koSound: '크' },
  { char: 'ㅌ', s: sounds('t', 'ト', 'т'), name: { ko: '티읕', en: 'tieut', ja: 'ティウッ', zh: 'tieut', fr: 'tieut', es: 'tieut', de: 'tieut', ru: 'тхиыт' }, koSound: '트' },
  { char: 'ㅍ', s: sounds('p', 'プ', 'п'), name: { ko: '피읖', en: 'pieup', ja: 'ピウプ', zh: 'pieup', fr: 'pieup', es: 'pieup', de: 'pieup', ru: 'пхиып' }, koSound: '프' },
  { char: 'ㅎ', s: sounds('h', 'フ', 'х'), name: { ko: '히읗', en: 'hieut', ja: 'ヒウッ', zh: 'hieut', fr: 'hieut', es: 'hieut', de: 'hieut', ru: 'хиыт' }, koSound: '흐' },
]

const koVowels = [
  { char: 'ㅏ', s: sounds('a', 'ア', 'а'), name: { ko: '아', en: 'a', ja: 'ア', zh: 'a', fr: 'a', es: 'a', de: 'a', ru: 'а' }, koSound: '아' },
  { char: 'ㅐ', s: sounds('ae', 'エ', 'э'), name: { ko: '애', en: 'ae', ja: 'エ', zh: 'ae', fr: 'ae', es: 'ae', de: 'ae', ru: 'э' }, koSound: '애' },
  { char: 'ㅑ', s: sounds('ya', 'ヤ', 'я'), name: { ko: '야', en: 'ya', ja: 'ヤ', zh: 'ya', fr: 'ya', es: 'ya', de: 'ya', ru: 'я' }, koSound: '야' },
  { char: 'ㅒ', s: sounds('yae', 'イェ', 'йэ'), name: { ko: '얘', en: 'yae', ja: 'イェ', zh: 'yae', fr: 'yae', es: 'yae', de: 'yae', ru: 'йэ' }, koSound: '얘' },
  { char: 'ㅓ', s: sounds('eo', 'オ', 'о'), name: { ko: '어', en: 'eo', ja: 'オ', zh: 'eo', fr: 'eo', es: 'eo', de: 'eo', ru: 'о' }, koSound: '어' },
  { char: 'ㅔ', s: sounds('e', 'エ', 'е'), name: { ko: '에', en: 'e', ja: 'エ', zh: 'e', fr: 'e', es: 'e', de: 'e', ru: 'е' }, koSound: '에' },
  { char: 'ㅕ', s: sounds('yeo', 'ヨ', 'ё'), name: { ko: '여', en: 'yeo', ja: 'ヨ', zh: 'yeo', fr: 'yeo', es: 'yeo', de: 'yeo', ru: 'ё' }, koSound: '여' },
  { char: 'ㅖ', s: sounds('ye', 'イェ', 'йе'), name: { ko: '예', en: 'ye', ja: 'イェ', zh: 'ye', fr: 'ye', es: 'ye', de: 'ye', ru: 'йе' }, koSound: '예' },
  { char: 'ㅗ', s: sounds('o', 'オ', 'о'), name: { ko: '오', en: 'o', ja: 'オ', zh: 'o', fr: 'o', es: 'o', de: 'o', ru: 'о' }, koSound: '오' },
  { char: 'ㅘ', s: sounds('wa', 'ワ', 'ва'), name: { ko: '와', en: 'wa', ja: 'ワ', zh: 'wa', fr: 'wa', es: 'wa', de: 'wa', ru: 'ва' }, koSound: '와' },
  { char: 'ㅙ', s: sounds('wae', 'ウェ', 'вэ'), name: { ko: '왜', en: 'wae', ja: 'ウェ', zh: 'wae', fr: 'wae', es: 'wae', de: 'wae', ru: 'вэ' }, koSound: '왜' },
  { char: 'ㅚ', s: sounds('oe', 'ウェ', 'ве'), name: { ko: '외', en: 'oe', ja: 'ウェ', zh: 'oe', fr: 'oe', es: 'oe', de: 'oe', ru: 'ве' }, koSound: '외' },
  { char: 'ㅛ', s: sounds('yo', 'ヨ', 'ё'), name: { ko: '요', en: 'yo', ja: 'ヨ', zh: 'yo', fr: 'yo', es: 'yo', de: 'yo', ru: 'ё' }, koSound: '요' },
  { char: 'ㅜ', s: sounds('u', 'ウ', 'у'), name: { ko: '우', en: 'u', ja: 'ウ', zh: 'u', fr: 'u', es: 'u', de: 'u', ru: 'у' }, koSound: '우' },
  { char: 'ㅝ', s: sounds('wo', 'ウォ', 'во'), name: { ko: '워', en: 'wo', ja: 'ウォ', zh: 'wo', fr: 'wo', es: 'wo', de: 'wo', ru: 'во' }, koSound: '워' },
  { char: 'ㅞ', s: sounds('we', 'ウェ', 'ве'), name: { ko: '웨', en: 'we', ja: 'ウェ', zh: 'we', fr: 'we', es: 'we', de: 'we', ru: 'ве' }, koSound: '웨' },
  { char: 'ㅟ', s: sounds('wi', 'ウィ', 'ви'), name: { ko: '위', en: 'wi', ja: 'ウィ', zh: 'wi', fr: 'wi', es: 'wi', de: 'wi', ru: 'ви' }, koSound: '위' },
  { char: 'ㅠ', s: sounds('yu', 'ユ', 'ю'), name: { ko: '유', en: 'yu', ja: 'ユ', zh: 'yu', fr: 'yu', es: 'yu', de: 'yu', ru: 'ю' }, koSound: '유' },
  { char: 'ㅡ', s: sounds('eu', 'ウ', 'ы'), name: { ko: '으', en: 'eu', ja: 'ウ', zh: 'eu', fr: 'eu', es: 'eu', de: 'eu', ru: 'ы' }, koSound: '으' },
  { char: 'ㅢ', s: sounds('ui', 'ウィ', 'ый'), name: { ko: '의', en: 'ui', ja: 'ウィ', zh: 'ui', fr: 'ui', es: 'ui', de: 'ui', ru: 'ый' }, koSound: '의' },
  { char: 'ㅣ', s: sounds('i', 'イ', 'и'), name: { ko: '이', en: 'i', ja: 'イ', zh: 'i', fr: 'i', es: 'i', de: 'i', ru: 'и' }, koSound: '이' },
]

function koQuizEntry(item, kind) {
  return {
    quiz_id: `ko_alphabet_${kind}_${item.s.en.replace(/[^a-z]/gi, '_')}`,
    question_word: item.char,
    pronunciations: { ...item.s },
    translations: { ...item.s },
  }
}

const koAlphabet = [
  ...koConsonants.map((c) => koQuizEntry(c, 'cons')),
  ...koVowels.map((v) => koQuizEntry(v, 'vowel')),
]

const koTable = {
  table_id: 'ko_alphabet_ref',
  title: {
    en: 'Hangul consonants & vowels',
    ko: '한글 자음·모음',
    ja: 'ハングル子音・母音',
    zh: '韩文字母表',
    fr: 'Consonnes et voyelles hangeul',
    es: 'Consonantes y vocales hangul',
    de: 'Hangul-Konsonanten & -Vokale',
    ru: 'Согласные и гласные хангыль',
  },
  note: {
    en: 'Sound = pronunciation. Name = letter name.',
    ko: '발음 = 소리. 이름 = 자모 명칭.',
    ja: '読み＝音。名称＝字母名。',
    zh: '发音＝实际读音。名称＝字母名。',
    fr: 'Son = prononciation. Nom = nom de la lettre.',
    es: 'Sonido = pronunciación. Nombre = nombre de la letra.',
    de: 'Laut = Aussprache. Name = Buchstabenname.',
    ru: 'Звук = произношение. Имя = название буквы.',
  },
  columns: [
    {
      key: 'char',
      labels: { en: 'Letter', ko: '글자', ja: '文字', zh: '字母', fr: 'Lettre', es: 'Letra', de: 'Buchstabe', ru: 'Буква' },
    },
    {
      key: 'sound',
      labels: { en: 'Sound', ko: '발음', ja: '読み', zh: '发音', fr: 'Son', es: 'Sonido', de: 'Laut', ru: 'Звук' },
    },
    {
      key: 'name',
      labels: { en: 'Name', ko: '이름', ja: '名称', zh: '名称', fr: 'Nom', es: 'Nombre', de: 'Name', ru: 'Название' },
    },
  ],
  rows: [...koConsonants, ...koVowels].map((item) => ({
    char: item.char,
    sound: { ...item.s, ko: item.koSound },
    name: item.name,
  })),
}

writeJson('src/data/ko/alphabet.json', koAlphabet)
writeJson('src/data/ko/alphabet.table.json', koTable)

// --- Japanese ---
// [hira, kata, en, ko, ru]
const jaRows = [
  ['あ', 'ア', 'a', '아', 'а'],
  ['い', 'イ', 'i', '이', 'и'],
  ['う', 'ウ', 'u', '우', 'у'],
  ['え', 'エ', 'e', '에', 'э'],
  ['お', 'オ', 'o', '오', 'о'],
  ['か', 'カ', 'ka', '카', 'ка'],
  ['き', 'キ', 'ki', '키', 'ки'],
  ['く', 'ク', 'ku', '쿠', 'ку'],
  ['け', 'ケ', 'ke', '케', 'кэ'],
  ['こ', 'コ', 'ko', '코', 'ко'],
  ['さ', 'サ', 'sa', '사', 'са'],
  ['し', 'シ', 'shi', '시', 'си'],
  ['す', 'ス', 'su', '스', 'су'],
  ['せ', 'セ', 'se', '세', 'сэ'],
  ['そ', 'ソ', 'so', '소', 'со'],
  ['た', 'タ', 'ta', '타', 'та'],
  ['ち', 'チ', 'chi', '치', 'ти'],
  ['つ', 'ツ', 'tsu', '쓰', 'цу'],
  ['て', 'テ', 'te', '테', 'тэ'],
  ['と', 'ト', 'to', '토', 'то'],
  ['な', 'ナ', 'na', '나', 'на'],
  ['に', 'ニ', 'ni', '니', 'ни'],
  ['ぬ', 'ヌ', 'nu', '누', 'ну'],
  ['ね', 'ネ', 'ne', '네', 'нэ'],
  ['の', 'ノ', 'no', '노', 'но'],
  ['は', 'ハ', 'ha', '하', 'ха'],
  ['ひ', 'ヒ', 'hi', '히', 'хи'],
  ['ふ', 'フ', 'fu', '후', 'фу'],
  ['へ', 'ヘ', 'he', '헤', 'хэ'],
  ['ほ', 'ホ', 'ho', '호', 'хо'],
  ['ま', 'マ', 'ma', '마', 'ма'],
  ['み', 'ミ', 'mi', '미', 'ми'],
  ['む', 'ム', 'mu', '무', 'му'],
  ['め', 'メ', 'me', '메', 'мэ'],
  ['も', 'モ', 'mo', '모', 'мо'],
  ['や', 'ヤ', 'ya', '야', 'я'],
  ['ゆ', 'ユ', 'yu', '유', 'ю'],
  ['よ', 'ヨ', 'yo', '요', 'ё'],
  ['ら', 'ラ', 'ra', '라', 'ра'],
  ['り', 'リ', 'ri', '리', 'ри'],
  ['る', 'ル', 'ru', '루', 'ру'],
  ['れ', 'レ', 're', '레', 'рэ'],
  ['ろ', 'ロ', 'ro', '로', 'ро'],
  ['わ', 'ワ', 'wa', '와', 'ва'],
  ['を', 'ヲ', 'o/wo', '오/워', 'о/во'],
  ['ん', 'ン', 'n', '응', 'н'],
  ['が', 'ガ', 'ga', '가', 'га'],
  ['ぎ', 'ギ', 'gi', '기', 'ги'],
  ['ぐ', 'グ', 'gu', '구', 'гу'],
  ['げ', 'ゲ', 'ge', '게', 'гэ'],
  ['ご', 'ゴ', 'go', '고', 'го'],
  ['ざ', 'ザ', 'za', '자', 'дза'],
  ['じ', 'ジ', 'ji', '지', 'дзи'],
  ['ず', 'ズ', 'zu', '즈', 'дзу'],
  ['ぜ', 'ゼ', 'ze', '제', 'дзэ'],
  ['ぞ', 'ゾ', 'zo', '조', 'дзо'],
  ['だ', 'ダ', 'da', '다', 'да'],
  ['ぢ', 'ヂ', 'ji', '지', 'дзи'],
  ['づ', 'ヅ', 'zu', '즈', 'дзу'],
  ['で', 'デ', 'de', '데', 'дэ'],
  ['ど', 'ド', 'do', '도', 'до'],
  ['ば', 'バ', 'ba', '바', 'ба'],
  ['び', 'ビ', 'bi', '비', 'би'],
  ['ぶ', 'ブ', 'bu', '부', 'бу'],
  ['べ', 'ベ', 'be', '베', 'бэ'],
  ['ぼ', 'ボ', 'bo', '보', 'бо'],
  ['ぱ', 'パ', 'pa', '파', 'па'],
  ['ぴ', 'ピ', 'pi', '피', 'пи'],
  ['ぷ', 'プ', 'pu', '푸', 'пу'],
  ['ぺ', 'ペ', 'pe', '페', 'пэ'],
  ['ぽ', 'ポ', 'po', '포', 'по'],
]

function jaLoc(en, ko, ru) {
  return { en, ko, zh: en, fr: en, es: en, de: en, ru }
}

function jaEntries(script, tag) {
  return jaRows.map(([hira, kata, en, ko, ru]) => {
    const char = script === 'hiragana' ? hira : kata
    const loc = jaLoc(en, ko, ru)
    return {
      quiz_id: `ja_alphabet_${script}_${tag}_${en.replace(/[^a-z]/gi, '_')}_${char}`,
      question_word: char,
      pronunciations: loc,
      translations: loc,
    }
  })
}

const jaAlphabet = [
  ...jaEntries('hiragana', 'all'),
  ...jaEntries('katakana', 'all'),
]

const jaTable = {
  table_id: 'ja_alphabet_ref',
  title: {
    en: 'Hiragana & Katakana',
    ko: '히라가나·가타카나',
    ja: 'ひらがな・カタカナ',
    zh: '平假名与片假名',
    fr: 'Hiragana et katakana',
    es: 'Hiragana y katakana',
    de: 'Hiragana & Katakana',
    ru: 'Хирагана и катакана',
  },
  note: {
    en: 'Includes seion and dakuten/handakuten. Quiz covers both scripts.',
    ko: '청음 + 탁음/반탁음 포함. 퀴즈는 히라가나·가타카나 모두 출제됩니다.',
    ja: '清音＋濁音／半濁音。クイズは両方の文字を出題します。',
    zh: '含清音与浊音/半浊音。测验包含平假名和片假名。',
    fr: 'Inclut seion et dakuten/handakuten. Les deux écritures sont dans le quiz.',
    es: 'Incluye seion y dakuten/handakuten. El quiz usa ambas escrituras.',
    de: 'Mit Seion und Dakuten/Handakuten. Quiz mit beiden Schriften.',
    ru: 'Есть сэйон и дакуон/хандакуон. В тесте оба алфавита.',
  },
  columns: [
    {
      key: 'hira',
      labels: { en: 'Hiragana', ko: '히라가나', ja: 'ひらがな', zh: '平假名', fr: 'Hiragana', es: 'Hiragana', de: 'Hiragana', ru: 'Хирагана' },
    },
    {
      key: 'kata',
      labels: { en: 'Katakana', ko: '가타카나', ja: 'カタカナ', zh: '片假名', fr: 'Katakana', es: 'Katakana', de: 'Katakana', ru: 'Катакана' },
    },
    {
      key: 'sound',
      labels: { en: 'Sound', ko: '발음', ja: '読み', zh: '读音', fr: 'Son', es: 'Sonido', de: 'Laut', ru: 'Звук' },
    },
  ],
  rows: jaRows.map(([hira, kata, en, ko, ru]) => ({
    hira,
    kata,
    sound: { ...jaLoc(en, ko, ru), ja: hira },
  })),
}

writeJson('src/data/ja/alphabet.json', jaAlphabet)
writeJson('src/data/ja/alphabet.table.json', jaTable)

console.log('done. ko=', koAlphabet.length, 'ja=', jaAlphabet.length)
