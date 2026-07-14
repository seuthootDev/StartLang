/**
 * Fills learner-language fields for months / time / ordinals quizzes & tables.
 * Run: node scripts/fill-learner-langs.mjs
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function writeJson(relPath, data) {
  writeFileSync(join(root, relPath), `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log('wrote', relPath)
}

const uiMonth = {
  jan: {
    en: 'January', zh: '一月', fr: 'janvier', es: 'enero', de: 'Januar', ru: 'январь',
    ko: '1월', ja: '1月',
  },
  feb: {
    en: 'February', zh: '二月', fr: 'février', es: 'febrero', de: 'Februar', ru: 'февраль',
    ko: '2월', ja: '2月',
  },
}

const uiTime = {
  morning: {
    en: 'morning', zh: '早上', fr: 'matin', es: 'mañana', de: 'Morgen', ru: 'утро',
    ko: '아침', ja: '朝',
  },
  night: {
    en: 'night', zh: '晚上', fr: 'nuit', es: 'noche', de: 'Nacht', ru: 'ночь',
    ko: '밤', ja: '夜',
  },
}

const uiOrdinal = {
  first: {
    en: 'first', zh: '第一', fr: 'premier', es: 'primero', de: 'erste', ru: 'первый',
    ko: '첫 번째', ja: '第一',
  },
  second: {
    en: 'second', zh: '第二', fr: 'deuxième', es: 'segundo', de: 'zweite', ru: 'второй',
    ko: '두 번째', ja: '第二',
  },
}

const labels = {
  formKo: { en: 'Korean', ko: '한국어', ja: '韓国語', zh: '韩语', fr: 'Coréen', es: 'Coreano', de: 'Koreanisch', ru: 'Корейский' },
  formJa: { en: 'Japanese', ko: '일본어', ja: '日本語', zh: '日语', fr: 'Japonais', es: 'Japonés', de: 'Japanisch', ru: 'Японский' },
  meaning: { en: 'Meaning', ko: '의미', ja: '意味', zh: '意思', fr: 'Sens', es: 'Significado', de: 'Bedeutung', ru: 'Значение' },
  sound: { en: 'Sound', ko: '발음', ja: '読み', zh: '发音', fr: 'Prononciation', es: 'Pronunciación', de: 'Aussprache', ru: 'Произношение' },
}

// --- Korean months ---
writeJson('src/data/ko/months.json', [
  {
    quiz_id: 'ko_months_jan',
    question_word: '1월',
    pronunciations: {
      en: 'il-wol', ja: 'イルウォル', zh: 'il-wol', fr: 'il-wol', es: 'il-wol', de: 'il-wol', ru: 'иль-воль',
    },
    translations: { ...uiMonth.jan },
  },
  {
    quiz_id: 'ko_months_feb',
    question_word: '2월',
    pronunciations: {
      en: 'i-wol', ja: 'イウォル', zh: 'i-wol', fr: 'i-wol', es: 'i-wol', de: 'i-wol', ru: 'и-воль',
    },
    translations: { ...uiMonth.feb },
  },
])

writeJson('src/data/ko/months.table.json', {
  table_id: 'ko_months_ref',
  title: {
    en: 'Months', ko: '월', ja: '月', zh: '月份', fr: 'Mois', es: 'Meses', de: 'Monate', ru: 'Месяцы',
  },
  note: {
    en: 'Korean months use Sino-Korean number + 월.',
    ko: '한국어 월은 한자음 숫자 + 월로 만듭니다.',
    ja: '漢数字の音＋월で作ります。',
    zh: '韩语月份 = 汉字音数字 + 월。',
    fr: 'Nombre sino-coréen + 월.',
    es: 'Número sino-coreano + 월.',
    de: 'Sino-koreanische Zahl + 월.',
    ru: 'Сино-корейское число + 월.',
  },
  columns: [
    { key: 'form', labels: labels.formKo },
    { key: 'meaning', labels: labels.meaning },
    { key: 'sound', labels: labels.sound },
  ],
  rows: [
    {
      form: '1월',
      meaning: { ...uiMonth.jan },
      sound: {
        en: 'il-wol', ko: '일월', ja: 'イルウォル', zh: 'il-wol', fr: 'il-wol', es: 'il-wol', de: 'il-wol', ru: 'иль-воль',
      },
    },
    {
      form: '2월',
      meaning: { ...uiMonth.feb },
      sound: {
        en: 'i-wol', ko: '이월', ja: 'イウォル', zh: 'i-wol', fr: 'i-wol', es: 'i-wol', de: 'i-wol', ru: 'и-воль',
      },
    },
  ],
})

// --- Japanese months ---
writeJson('src/data/ja/months.json', [
  {
    quiz_id: 'ja_months_jan',
    question_word: '1月',
    pronunciations: {
      en: 'ichi-gatsu', ko: '이치가쓰', zh: 'ichi-gatsu', fr: 'ichi-gatsu', es: 'ichi-gatsu', de: 'ichi-gatsu', ru: 'ити-гацу',
    },
    translations: { ...uiMonth.jan },
  },
  {
    quiz_id: 'ja_months_feb',
    question_word: '2月',
    pronunciations: {
      en: 'ni-gatsu', ko: '니가쓰', zh: 'ni-gatsu', fr: 'ni-gatsu', es: 'ni-gatsu', de: 'ni-gatsu', ru: 'ни-гацу',
    },
    translations: { ...uiMonth.feb },
  },
])

writeJson('src/data/ja/months.table.json', {
  table_id: 'ja_months_ref',
  title: {
    en: 'Months', ko: '월', ja: '月', zh: '月份', fr: 'Mois', es: 'Meses', de: 'Monate', ru: 'Месяцы',
  },
  note: {
    en: 'Japanese months use number + 月 (gatsu).',
    ko: '일본어 월은 숫자 + 月(가쓰)로 만듭니다.',
    ja: '数字＋月（がつ）で作ります。',
    zh: '日语月份 = 数字 + 月（gatsu）。',
    fr: 'Nombre + 月 (gatsu).',
    es: 'Número + 月 (gatsu).',
    de: 'Zahl + 月 (gatsu).',
    ru: 'Число + 月 (гацу).',
  },
  columns: [
    { key: 'form', labels: labels.formJa },
    { key: 'meaning', labels: labels.meaning },
    { key: 'sound', labels: labels.sound },
  ],
  rows: [
    {
      form: '1月',
      meaning: { ...uiMonth.jan },
      sound: {
        en: 'ichi-gatsu', ko: '이치가쓰', ja: 'いちがつ', zh: 'ichi-gatsu', fr: 'ichi-gatsu', es: 'ichi-gatsu', de: 'ichi-gatsu', ru: 'ити-гацу',
      },
    },
    {
      form: '2月',
      meaning: { ...uiMonth.feb },
      sound: {
        en: 'ni-gatsu', ko: '니가쓰', ja: 'にがつ', zh: 'ni-gatsu', fr: 'ni-gatsu', es: 'ni-gatsu', de: 'ni-gatsu', ru: 'ни-гацу',
      },
    },
  ],
})

// --- time ---
writeJson('src/data/ko/time.json', [
  {
    quiz_id: 'ko_time_morning',
    question_word: '아침',
    pronunciations: {
      en: 'a-chim', ja: 'アチム', zh: 'a-chim', fr: 'a-chim', es: 'a-chim', de: 'a-chim', ru: 'а-чим',
    },
    translations: { ...uiTime.morning },
  },
  {
    quiz_id: 'ko_time_night',
    question_word: '밤',
    pronunciations: {
      en: 'bam', ja: 'パム', zh: 'bam', fr: 'bam', es: 'bam', de: 'bam', ru: 'пам',
    },
    translations: { ...uiTime.night },
  },
])

writeJson('src/data/ko/time.table.json', {
  table_id: 'ko_time_ref',
  title: {
    en: 'Time words', ko: '시간 표현', ja: '時間の表現', zh: '时间词', fr: 'Mots de temps', es: 'Palabras de tiempo', de: 'Zeitwörter', ru: 'Слова о времени',
  },
  columns: [
    { key: 'form', labels: labels.formKo },
    { key: 'meaning', labels: labels.meaning },
    { key: 'sound', labels: labels.sound },
  ],
  rows: [
    {
      form: '아침',
      meaning: { ...uiTime.morning },
      sound: {
        en: 'a-chim', ko: '아침', ja: 'アチム', zh: 'a-chim', fr: 'a-chim', es: 'a-chim', de: 'a-chim', ru: 'а-чим',
      },
    },
    {
      form: '밤',
      meaning: { ...uiTime.night },
      sound: {
        en: 'bam', ko: '밤', ja: 'パム', zh: 'bam', fr: 'bam', es: 'bam', de: 'bam', ru: 'пам',
      },
    },
  ],
})

writeJson('src/data/ja/time.json', [
  {
    quiz_id: 'ja_time_morning',
    question_word: '朝',
    pronunciations: {
      en: 'asa', ko: '아사', zh: 'asa', fr: 'asa', es: 'asa', de: 'asa', ru: 'аса',
    },
    translations: { ...uiTime.morning },
  },
  {
    quiz_id: 'ja_time_night',
    question_word: '夜',
    pronunciations: {
      en: 'yoru', ko: '요루', zh: 'yoru', fr: 'yoru', es: 'yoru', de: 'yoru', ru: 'ёру',
    },
    translations: { ...uiTime.night },
  },
])

writeJson('src/data/ja/time.table.json', {
  table_id: 'ja_time_ref',
  title: {
    en: 'Time words', ko: '시간 표현', ja: '時間の表現', zh: '时间词', fr: 'Mots de temps', es: 'Palabras de tiempo', de: 'Zeitwörter', ru: 'Слова о времени',
  },
  columns: [
    { key: 'form', labels: labels.formJa },
    { key: 'meaning', labels: labels.meaning },
    { key: 'sound', labels: labels.sound },
  ],
  rows: [
    {
      form: '朝',
      meaning: { ...uiTime.morning },
      sound: {
        en: 'asa', ko: '아사', ja: 'あさ', zh: 'asa', fr: 'asa', es: 'asa', de: 'asa', ru: 'аса',
      },
    },
    {
      form: '夜',
      meaning: { ...uiTime.night },
      sound: {
        en: 'yoru', ko: '요루', ja: 'よる', zh: 'yoru', fr: 'yoru', es: 'yoru', de: 'yoru', ru: 'ёру',
      },
    },
  ],
})

// --- ordinals ---
writeJson('src/data/ko/ordinals.json', [
  {
    quiz_id: 'ko_ordinals_first',
    question_word: '첫 번째',
    pronunciations: {
      en: 'cheot beon-jjae', ja: 'チョッ ボンジェ', zh: 'cheot beon-jjae', fr: 'cheot beon-jjae', es: 'cheot beon-jjae', de: 'cheot beon-jjae', ru: 'чот пон-ччэ',
    },
    translations: { ...uiOrdinal.first },
  },
  {
    quiz_id: 'ko_ordinals_second',
    question_word: '두 번째',
    pronunciations: {
      en: 'du beon-jjae', ja: 'ドゥ ボンジェ', zh: 'du beon-jjae', fr: 'du beon-jjae', es: 'du beon-jjae', de: 'du beon-jjae', ru: 'ту пон-ччэ',
    },
    translations: { ...uiOrdinal.second },
  },
])

writeJson('src/data/ko/ordinals.table.json', {
  table_id: 'ko_ordinals_ref',
  title: {
    en: 'Ordinal numbers', ko: '서수사', ja: '序数', zh: '序数词', fr: 'Nombres ordinaux', es: 'Números ordinales', de: 'Ordinalzahlen', ru: 'Порядковые числительные',
  },
  note: {
    en: 'Native Korean number + 번째.',
    ko: '고유어 수 + 번째 형태입니다.',
    ja: '固有語の数＋번째の形です。',
    zh: '固有语数字 + 번째。',
    fr: 'Nombre natif + 번째.',
    es: 'Número nativo + 번째.',
    de: 'Native Zahl + 번째.',
    ru: 'Собственное число + 번째.',
  },
  columns: [
    { key: 'form', labels: labels.formKo },
    { key: 'meaning', labels: labels.meaning },
    { key: 'sound', labels: labels.sound },
  ],
  rows: [
    {
      form: '첫 번째',
      meaning: { ...uiOrdinal.first },
      sound: {
        en: 'cheot beon-jjae', ko: '첫 번째', ja: 'チョッ ボンジェ', zh: 'cheot beon-jjae', fr: 'cheot beon-jjae', es: 'cheot beon-jjae', de: 'cheot beon-jjae', ru: 'чот пон-ччэ',
      },
    },
    {
      form: '두 번째',
      meaning: { ...uiOrdinal.second },
      sound: {
        en: 'du beon-jjae', ko: '두 번째', ja: 'ドゥ ボンジェ', zh: 'du beon-jjae', fr: 'du beon-jjae', es: 'du beon-jjae', de: 'du beon-jjae', ru: 'ту пон-ччэ',
      },
    },
  ],
})

writeJson('src/data/ja/ordinals.json', [
  {
    quiz_id: 'ja_ordinals_first',
    question_word: '第一',
    pronunciations: {
      en: 'dai-ichi', ko: '다이이치', zh: 'dai-ichi', fr: 'dai-ichi', es: 'dai-ichi', de: 'dai-ichi', ru: 'дай-ити',
    },
    translations: { ...uiOrdinal.first },
  },
  {
    quiz_id: 'ja_ordinals_second',
    question_word: '第二',
    pronunciations: {
      en: 'dai-ni', ko: '다이니', zh: 'dai-ni', fr: 'dai-ni', es: 'dai-ni', de: 'dai-ni', ru: 'дай-ни',
    },
    translations: { ...uiOrdinal.second },
  },
])

writeJson('src/data/ja/ordinals.table.json', {
  table_id: 'ja_ordinals_ref',
  title: {
    en: 'Ordinal numbers', ko: '서수사', ja: '序数', zh: '序数词', fr: 'Nombres ordinaux', es: 'Números ordinales', de: 'Ordinalzahlen', ru: 'Порядковые числительные',
  },
  note: {
    en: 'Often 第 + number (dai-).',
    ko: '보통 第 + 숫자(다이-) 형태입니다.',
    ja: '多くは「第＋数」の形です。',
    zh: '多为 第 + 数字（dai-）。',
    fr: 'Souvent 第 + nombre (dai-).',
    es: 'A menudo 第 + número (dai-).',
    de: 'Oft 第 + Zahl (dai-).',
    ru: 'Часто 第 + число (дай-).',
  },
  columns: [
    { key: 'form', labels: labels.formJa },
    { key: 'meaning', labels: labels.meaning },
    { key: 'sound', labels: labels.sound },
  ],
  rows: [
    {
      form: '第一',
      meaning: { ...uiOrdinal.first },
      sound: {
        en: 'dai-ichi', ko: '다이이치', ja: 'だいいち', zh: 'dai-ichi', fr: 'dai-ichi', es: 'dai-ichi', de: 'dai-ichi', ru: 'дай-ити',
      },
    },
    {
      form: '第二',
      meaning: { ...uiOrdinal.second },
      sound: {
        en: 'dai-ni', ko: '다이니', ja: 'だいに', zh: 'dai-ni', fr: 'dai-ni', es: 'dai-ni', de: 'dai-ni', ru: 'дай-ни',
      },
    },
  ],
})

console.log('learner langs filled for months/time/ordinals')
