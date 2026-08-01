/**
 * Generate Russian Cyrillic alphabet quiz + reference table.
 * Run: node scripts/gen-ru-alphabet.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/ru')

/**
 * sound: what learners type (slash = accepted alternatives)
 * name: letter name shown in the reference table
 */
const LETTERS = [
  { ch: 'А', id: 'a', sound: { en: 'a', ko: '아', ja: 'ア', zh: 'a', fr: 'a', es: 'a', de: 'a', ru: 'а' }, name: { en: 'a', ko: '아', ja: 'アー', zh: 'a', fr: 'a', es: 'a', de: 'a', ru: 'а' } },
  { ch: 'Б', id: 'b', sound: { en: 'b', ko: '브/베', ja: 'ベ/ブ', zh: 'b', fr: 'b', es: 'b', de: 'b', ru: 'бэ' }, name: { en: 'be', ko: '베', ja: 'ベー', zh: 'be', fr: 'bé', es: 'be', de: 'be', ru: 'бэ' } },
  { ch: 'В', id: 'v', sound: { en: 'v', ko: '브/베', ja: 'ヴェ/ブ', zh: 'v', fr: 'v', es: 'v', de: 'w/v', ru: 'вэ' }, name: { en: 've', ko: '베', ja: 'ヴェー', zh: 've', fr: 'vé', es: 've', de: 'we', ru: 'вэ' } },
  { ch: 'Г', id: 'g', sound: { en: 'g', ko: '그', ja: 'ゲ/グ', zh: 'g', fr: 'g', es: 'g', de: 'g', ru: 'гэ' }, name: { en: 'ge', ko: '게', ja: 'ゲー', zh: 'ge', fr: 'gué', es: 'gue', de: 'ge', ru: 'гэ' } },
  { ch: 'Д', id: 'd', sound: { en: 'd', ko: '드', ja: 'デ/ド', zh: 'd', fr: 'd', es: 'd', de: 'd', ru: 'дэ' }, name: { en: 'de', ko: '데', ja: 'デー', zh: 'de', fr: 'dé', es: 'de', de: 'de', ru: 'дэ' } },
  { ch: 'Е', id: 'ye', sound: { en: 'ye/e', ko: '예/에', ja: 'イェ/エ', zh: 'ye/e', fr: 'ye/e', es: 'ye/e', de: 'je/e', ru: 'е' }, name: { en: 'ye', ko: '예', ja: 'イェー', zh: 'ye', fr: 'ié', es: 'ye', de: 'je', ru: 'е' } },
  { ch: 'Ё', id: 'yo', sound: { en: 'yo', ko: '요', ja: 'ヨ', zh: 'yo', fr: 'yo', es: 'yo', de: 'jo', ru: 'ё' }, name: { en: 'yo', ko: '요', ja: 'ヨー', zh: 'yo', fr: 'io', es: 'yo', de: 'jo', ru: 'ё' } },
  { ch: 'Ж', id: 'zh', sound: { en: 'zh', ko: '주/즈', ja: 'ジュ/ジ', zh: 'zh', fr: 'j', es: 'zh/y', de: 'sch', ru: 'жэ' }, name: { en: 'zhe', ko: '제', ja: 'ジェー', zh: 'zhe', fr: 'jé', es: 'zhe', de: 'sche', ru: 'жэ' } },
  { ch: 'З', id: 'z', sound: { en: 'z', ko: '즈', ja: 'ゼ/ズ', zh: 'z', fr: 'z', es: 'z', de: 's/z', ru: 'зэ' }, name: { en: 'ze', ko: '제', ja: 'ゼー', zh: 'ze', fr: 'zé', es: 'ze', de: 'se', ru: 'зэ' } },
  { ch: 'И', id: 'i', sound: { en: 'i', ko: '이', ja: 'イ', zh: 'i', fr: 'i', es: 'i', de: 'i', ru: 'и' }, name: { en: 'i', ko: '이', ja: 'イー', zh: 'i', fr: 'i', es: 'i', de: 'i', ru: 'и' } },
  { ch: 'Й', id: 'y', sound: { en: 'y/j', ko: '이', ja: 'イ/イ短', zh: 'y', fr: 'y/ï', es: 'y/i', de: 'j', ru: 'и краткое' }, name: { en: 'short i', ko: '이 짧은소리', ja: 'イー・クラトコネ', zh: 'short i', fr: 'i court', es: 'i breve', de: 'kurzes i', ru: 'и краткое' } },
  { ch: 'К', id: 'k', sound: { en: 'k', ko: '크', ja: 'カ/ク', zh: 'k', fr: 'k', es: 'k', de: 'k', ru: 'ка' }, name: { en: 'ka', ko: '카', ja: 'カー', zh: 'ka', fr: 'ka', es: 'ka', de: 'ka', ru: 'ка' } },
  { ch: 'Л', id: 'l', sound: { en: 'l', ko: '엘/을', ja: 'エル/ル', zh: 'l', fr: 'l', es: 'l', de: 'l', ru: 'эль' }, name: { en: 'el', ko: '엘', ja: 'エーリ', zh: 'el', fr: 'èle', es: 'el', de: 'el', ru: 'эль' } },
  { ch: 'М', id: 'm', sound: { en: 'm', ko: '엠/음', ja: 'エム/ム', zh: 'm', fr: 'm', es: 'm', de: 'm', ru: 'эм' }, name: { en: 'em', ko: '엠', ja: 'エーム', zh: 'em', fr: 'ème', es: 'em', de: 'em', ru: 'эм' } },
  { ch: 'Н', id: 'n', sound: { en: 'n', ko: '엔/은', ja: 'エン/ン', zh: 'n', fr: 'n', es: 'n', de: 'n', ru: 'эн' }, name: { en: 'en', ko: '엔', ja: 'エーン', zh: 'en', fr: 'ène', es: 'en', de: 'en', ru: 'эн' } },
  { ch: 'О', id: 'o', sound: { en: 'o', ko: '오', ja: 'オ', zh: 'o', fr: 'o', es: 'o', de: 'o', ru: 'о' }, name: { en: 'o', ko: '오', ja: 'オー', zh: 'o', fr: 'o', es: 'o', de: 'o', ru: 'о' } },
  { ch: 'П', id: 'p', sound: { en: 'p', ko: '프/페', ja: 'ペ/プ', zh: 'p', fr: 'p', es: 'p', de: 'p', ru: 'пэ' }, name: { en: 'pe', ko: '페', ja: 'ペー', zh: 'pe', fr: 'pé', es: 'pe', de: 'pe', ru: 'пэ' } },
  { ch: 'Р', id: 'r', sound: { en: 'r', ko: '르/에르', ja: 'エル/ル', zh: 'r', fr: 'r', es: 'r', de: 'r', ru: 'эр' }, name: { en: 'er', ko: '에르', ja: 'エール', zh: 'er', fr: 'ère', es: 'er', de: 'er', ru: 'эр' } },
  { ch: 'С', id: 's', sound: { en: 's', ko: '스', ja: 'エス/ス', zh: 's', fr: 's', es: 's', de: 's', ru: 'эс' }, name: { en: 'es', ko: '에스', ja: 'エース', zh: 'es', fr: 'èsse', es: 'es', de: 'es', ru: 'эс' } },
  { ch: 'Т', id: 't', sound: { en: 't', ko: '트', ja: 'テ/ト', zh: 't', fr: 't', es: 't', de: 't', ru: 'тэ' }, name: { en: 'te', ko: '테', ja: 'テー', zh: 'te', fr: 'té', es: 'te', de: 'te', ru: 'тэ' } },
  { ch: 'У', id: 'u', sound: { en: 'u', ko: '우', ja: 'ウ', zh: 'u', fr: 'ou/u', es: 'u', de: 'u', ru: 'у' }, name: { en: 'u', ko: '우', ja: 'ウー', zh: 'u', fr: 'ou', es: 'u', de: 'u', ru: 'у' } },
  { ch: 'Ф', id: 'f', sound: { en: 'f', ko: '프/에프', ja: 'エフ/フ', zh: 'f', fr: 'f', es: 'f', de: 'f', ru: 'эф' }, name: { en: 'ef', ko: '에프', ja: 'エーフ', zh: 'ef', fr: 'èffe', es: 'efe', de: 'ef', ru: 'эф' } },
  { ch: 'Х', id: 'kh', sound: { en: 'kh/h', ko: '흐/하', ja: 'ハ/フ', zh: 'kh/h', fr: 'kh/h', es: 'j/kh', de: 'ch/h', ru: 'ха' }, name: { en: 'kha', ko: '하', ja: 'ハー', zh: 'ha', fr: 'kha', es: 'ja', de: 'cha', ru: 'ха' } },
  { ch: 'Ц', id: 'ts', sound: { en: 'ts', ko: '츠', ja: 'ツ', zh: 'c/ts', fr: 'ts', es: 'ts', de: 'z/ts', ru: 'цэ' }, name: { en: 'tse', ko: '체', ja: 'ツェー', zh: 'ce', fr: 'tsé', es: 'tse', de: 'ze', ru: 'цэ' } },
  { ch: 'Ч', id: 'ch', sound: { en: 'ch', ko: '치/체', ja: 'チ/チェ', zh: 'ch', fr: 'tch/ch', es: 'ch', de: 'tsch/ch', ru: 'че' }, name: { en: 'che', ko: '체', ja: 'チェー', zh: 'che', fr: 'tché', es: 'che', de: 'tsche', ru: 'че' } },
  { ch: 'Ш', id: 'sh', sound: { en: 'sh', ko: '슈/샤', ja: 'シュ/シャ', zh: 'sh', fr: 'ch/sh', es: 'sh', de: 'sch', ru: 'ша' }, name: { en: 'sha', ko: '샤', ja: 'シャー', zh: 'sha', fr: 'cha', es: 'sha', de: 'scha', ru: 'ша' } },
  { ch: 'Щ', id: 'shch', sound: { en: 'shch/sch', ko: '시/샤', ja: 'シチ/シャ', zh: 'shch', fr: 'chtch/sch', es: 'shch', de: 'schtsch', ru: 'ща' }, name: { en: 'shcha', ko: '샤', ja: 'シチャー', zh: 'shcha', fr: 'chtcha', es: 'shcha', de: 'schtscha', ru: 'ща' } },
  { ch: 'Ъ', id: 'hard', sound: { en: '" / hard sign / ъ', ko: '경음부호 / ъ', ja: '硬音符 / ъ', zh: 'hard sign / ъ', fr: 'signe dur / ъ', es: 'signo duro / ъ', de: 'hartes Zeichen / ъ', ru: 'твёрдый знак / ъ' }, name: { en: 'hard sign', ko: '경음부호', ja: '硬音符', zh: 'hard sign', fr: 'signe dur', es: 'signo duro', de: 'hartes Zeichen', ru: 'твёрдый знак' } },
  { ch: 'Ы', id: 'yery', sound: { en: 'y', ko: '위/이', ja: 'イ/ウィ', zh: 'y', fr: 'y', es: 'y', de: 'y', ru: 'ы' }, name: { en: 'y', ko: '이(ы)', ja: 'ウィー', zh: 'y', fr: 'y', es: 'y', de: 'y', ru: 'ы' } },
  { ch: 'Ь', id: 'soft', sound: { en: "' / soft sign / ь", ko: '연음부호 / ь', ja: '軟音符 / ь', zh: 'soft sign / ь', fr: 'signe mou / ь', es: 'signo blando / ь', de: 'weiches Zeichen / ь', ru: 'мягкий знак / ь' }, name: { en: 'soft sign', ko: '연음부호', ja: '軟音符', zh: 'soft sign', fr: 'signe mou', es: 'signo blando', de: 'weiches Zeichen', ru: 'мягкий знак' } },
  { ch: 'Э', id: 'e', sound: { en: 'e', ko: '에', ja: 'エ', zh: 'e', fr: 'é/e', es: 'e', de: 'e', ru: 'э' }, name: { en: 'e', ko: '에', ja: 'エー', zh: 'e', fr: 'é', es: 'e', de: 'e', ru: 'э' } },
  { ch: 'Ю', id: 'yu', sound: { en: 'yu', ko: '유', ja: 'ユ', zh: 'yu', fr: 'iou/yu', es: 'yu', de: 'ju', ru: 'ю' }, name: { en: 'yu', ko: '유', ja: 'ユー', zh: 'yu', fr: 'iou', es: 'yu', de: 'ju', ru: 'ю' } },
  { ch: 'Я', id: 'ya', sound: { en: 'ya', ko: '야', ja: 'ヤ', zh: 'ya', fr: 'ia/ya', es: 'ya', de: 'ja', ru: 'я' }, name: { en: 'ya', ko: '야', ja: 'ヤー', zh: 'ya', fr: 'ia', es: 'ya', de: 'ja', ru: 'я' } },
]

mkdirSync(OUT_DIR, { recursive: true })

const quiz = LETTERS.map((letter) => ({
  quiz_id: `ru_alphabet_${letter.id}`,
  question_word: letter.ch,
  pronunciations: { ...letter.sound },
  translations: { ...letter.sound },
}))

const table = {
  table_id: 'ru_alphabet_ref',
  title: {
    en: 'Cyrillic alphabet',
    ko: '키릴 문자',
    ja: 'キリル文字',
    zh: '西里尔字母',
    fr: 'Alphabet cyrillique',
    es: 'Alfabeto cirílico',
    de: 'Kyrillisches Alphabet',
    ru: 'Кириллица',
  },
  note: {
    en: '33 letters. Type the sound (slash answers accept either side). Ъ/Ь are signs, not full vowels.',
    ko: '33글자. 소리를 입력하세요 (/ 는 양쪽 모두 정답). Ъ·Ь는 부호입니다.',
    ja: '33文字。読みを入力（/ はどちらでも可）。Ъ・Ьは符号です。',
    zh: '共33个字母。输入读音（斜杠两侧均可）。Ъ/Ь是符号。',
    fr: '33 lettres. Tapez le son (/ = les deux côtés). Ъ/Ь sont des signes.',
    es: '33 letras. Escribe el sonido (/ acepta ambos lados). Ъ/Ь son signos.',
    de: '33 Buchstaben. Laut tippen (/ = beide Seiten). Ъ/Ь sind Zeichen.',
    ru: '33 буквы. Введите звук или название. Ъ и Ь — знаки.',
  },
  columns: [
    {
      key: 'char',
      labels: {
        en: 'Letter',
        ko: '글자',
        ja: '文字',
        zh: '字母',
        fr: 'Lettre',
        es: 'Letra',
        de: 'Buchstabe',
        ru: 'Буква',
      },
    },
    {
      key: 'sound',
      labels: {
        en: 'Sound',
        ko: '발음',
        ja: '読み',
        zh: '发音',
        fr: 'Son',
        es: 'Sonido',
        de: 'Laut',
        ru: 'Звук',
      },
    },
    {
      key: 'name',
      labels: {
        en: 'Name',
        ko: '이름',
        ja: '名称',
        zh: '名称',
        fr: 'Nom',
        es: 'Nombre',
        de: 'Name',
        ru: 'Название',
      },
    },
  ],
  rows: LETTERS.map((letter) => ({
    char: letter.ch,
    sound: { ...letter.sound },
    name: { ...letter.name },
  })),
}

writeFileSync(join(OUT_DIR, 'alphabet.json'), `${JSON.stringify(quiz, null, 2)}\n`)
writeFileSync(join(OUT_DIR, 'alphabet.table.json'), `${JSON.stringify(table, null, 2)}\n`)
console.log(`ru alphabet ok — ${quiz.length} letters`)
