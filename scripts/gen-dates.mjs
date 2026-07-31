/**
 * Generate ko/ja dates quiz + reference tables.
 * JA: every irregular day reading is a quiz card; table lists 1–31.
 * KO: compact pattern drill (calendar days are regular).
 */
import { readFileSync, writeFileSync } from 'fs'

const LANGS = ['en', 'ko', 'ja', 'zh', 'fr', 'es', 'de', 'ru']

const meaningLabels = {
  en: 'Meaning',
  ko: '의미',
  ja: '意味',
  zh: '意思',
  fr: 'Sens',
  es: 'Significado',
  de: 'Bedeutung',
  ru: 'Значение',
}
const soundLabels = {
  en: 'Reading',
  ko: '읽기',
  ja: '読み',
  zh: '读法',
  fr: 'Lecture',
  es: 'Lectura',
  de: 'Lesung',
  ru: 'Чтение',
}

function formLabels(target) {
  if (target === 'ko') {
    return {
      en: 'Korean',
      ko: '한국어',
      ja: '韓国語',
      zh: '韩语',
      fr: 'Coréen',
      es: 'Coreano',
      de: 'Koreanisch',
      ru: 'Корейский',
    }
  }
  return {
    en: 'Japanese',
    ko: '일본어',
    ja: '日本語',
    zh: '日语',
    fr: 'Japonais',
    es: 'Japonés',
    de: 'Japanisch',
    ru: 'Японский',
  }
}

function mapAll(value) {
  return Object.fromEntries(LANGS.map((l) => [l, value]))
}

function readingMap({ ja, en, ko, ru }) {
  return {
    en,
    ko,
    ja,
    zh: en,
    fr: en,
    es: en,
    de: en,
    ru: ru ?? en,
  }
}

/** Irregular Japanese calendar-day readings (must all appear in the quiz). */
const JA_IRREGULAR = [
  {
    day: 1,
    kanji: '一日',
    reading: readingMap({
      ja: 'ついたち',
      en: 'tsuitachi',
      ko: '츠이타치',
      ru: 'цуитати',
    }),
  },
  {
    day: 2,
    kanji: '二日',
    reading: readingMap({
      ja: 'ふつか',
      en: 'futsuka',
      ko: '후츠카',
      ru: 'фуцука',
    }),
  },
  {
    day: 3,
    kanji: '三日',
    reading: readingMap({
      ja: 'みっか',
      en: 'mikka',
      ko: '밋카',
      ru: 'микка',
    }),
  },
  {
    day: 4,
    kanji: '四日',
    reading: readingMap({
      ja: 'よっか',
      en: 'yokka',
      ko: '욕카',
      ru: 'ёкка',
    }),
  },
  {
    day: 5,
    kanji: '五日',
    reading: readingMap({
      ja: 'いつか',
      en: 'itsuka',
      ko: '이츠카',
      ru: 'ицука',
    }),
  },
  {
    day: 6,
    kanji: '六日',
    reading: readingMap({
      ja: 'むいか',
      en: 'muika',
      ko: '무이카',
      ru: 'муика',
    }),
  },
  {
    day: 7,
    kanji: '七日',
    reading: readingMap({
      ja: 'なのか',
      en: 'nanoka',
      ko: '나노카',
      ru: 'нанока',
    }),
  },
  {
    day: 8,
    kanji: '八日',
    reading: readingMap({
      ja: 'ようか',
      en: 'youka',
      ko: '요오카',
      ru: 'ё:ка',
    }),
  },
  {
    day: 9,
    kanji: '九日',
    reading: readingMap({
      ja: 'ここのか',
      en: 'kokonoka',
      ko: '코코노카',
      ru: 'коконока',
    }),
  },
  {
    day: 10,
    kanji: '十日',
    reading: readingMap({
      ja: 'とおか',
      en: 'tooka',
      ko: '토오카',
      ru: 'то:ка',
    }),
  },
  {
    day: 14,
    kanji: '十四日',
    reading: readingMap({
      ja: 'じゅうよっか',
      en: 'juu-yokka',
      ko: '주우욕카',
      ru: 'дзю:-ёкка',
    }),
  },
  {
    day: 20,
    kanji: '二十日',
    reading: readingMap({
      ja: 'はつか',
      en: 'hatsuka',
      ko: '하츠카',
      ru: 'хацука',
    }),
  },
  {
    day: 24,
    kanji: '二十四日',
    reading: readingMap({
      ja: 'にじゅうよっか',
      en: 'nijuuyokka',
      ko: '니주우욕카',
      ru: 'нидзю:-ёкка',
    }),
  },
]

const JA_SINO = {
  1: { ja: 'いち', en: 'ichi', ko: '이치', ru: 'ити' },
  2: { ja: 'に', en: 'ni', ko: '니', ru: 'ни' },
  3: { ja: 'さん', en: 'san', ko: '산', ru: 'сан' },
  4: { ja: 'よん', en: 'yon', ko: '욘', ru: 'ён' },
  5: { ja: 'ご', en: 'go', ko: '고', ru: 'го' },
  6: { ja: 'ろく', en: 'roku', ko: '로쿠', ru: 'року' },
  7: { ja: 'なな', en: 'nana', ko: '나나', ru: 'нана' },
  8: { ja: 'はち', en: 'hachi', ko: '하치', ru: 'хати' },
  9: { ja: 'きゅう', en: 'kyuu', ko: '큐우', ru: 'кю:' },
  10: { ja: 'じゅう', en: 'juu', ko: '주우', ru: 'дзю:' },
  11: { ja: 'じゅういち', en: 'juuichi', ko: '주우이치', ru: 'дзю:ити' },
  12: { ja: 'じゅうに', en: 'juuni', ko: '주우니', ru: 'дзю:ни' },
  13: { ja: 'じゅうさん', en: 'juusan', ko: '주우산', ru: 'дзю:сан' },
  15: { ja: 'じゅうご', en: 'juugo', ko: '주우고', ru: 'дзю:го' },
  16: { ja: 'じゅうろく', en: 'juuroku', ko: '주우로쿠', ru: 'дзю:року' },
  17: { ja: 'じゅうなな', en: 'juunana', ko: '주우나나', ru: 'дзю:нана' },
  18: { ja: 'じゅうはち', en: 'juuhachi', ko: '주우하치', ru: 'дзю:хати' },
  19: { ja: 'じゅうきゅう', en: 'juukyuu', ko: '주우큐우', ru: 'дзю:кю:' },
  21: { ja: 'にじゅういち', en: 'nijuichi', ko: '니주우이치', ru: 'нидзю:ити' },
  22: { ja: 'にじゅうに', en: 'nijuni', ko: '니주우니', ru: 'нидзю:ни' },
  23: { ja: 'にじゅうさん', en: 'nijusan', ko: '니주우산', ru: 'нидзю:сан' },
  25: { ja: 'にじゅうご', en: 'nijugo', ko: '니주우고', ru: 'нидзю:го' },
  26: { ja: 'にじゅうろく', en: 'nijuroku', ko: '니주우로쿠', ru: 'нидзю:року' },
  27: { ja: 'にじゅうなな', en: 'nijunana', ko: '니주우나나', ru: 'нидзю:нана' },
  28: { ja: 'にじゅうはち', en: 'nijuhachi', ko: '니주우하치', ru: 'нидзю:хати' },
  29: { ja: 'にじゅうきゅう', en: 'nijukyuu', ko: '니주우큐우', ru: 'нидзю:кю:' },
  30: { ja: 'さんじゅう', en: 'sanjuu', ko: '산주우', ru: 'сандзю:' },
  31: { ja: 'さんじゅういち', en: 'sanjuichi', ko: '산주우이치', ru: 'сандзю:ити' },
}

const JA_KANJI = {
  1: '一日',
  2: '二日',
  3: '三日',
  4: '四日',
  5: '五日',
  6: '六日',
  7: '七日',
  8: '八日',
  9: '九日',
  10: '十日',
  11: '十一日',
  12: '十二日',
  13: '十三日',
  14: '十四日',
  15: '十五日',
  16: '十六日',
  17: '十七日',
  18: '十八日',
  19: '十九日',
  20: '二十日',
  21: '二十一日',
  22: '二十二日',
  23: '二十三日',
  24: '二十四日',
  25: '二十五日',
  26: '二十六日',
  27: '二十七日',
  28: '二十八日',
  29: '二十九日',
  30: '三十日',
  31: '三十一日',
}

function dayMeaning(day) {
  const ord = {
    en: `${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} (of the month)`,
    ko: `${day}일`,
    ja: `${day}日`,
    zh: `${day}号 / ${day}日`,
    fr: `le ${day} (du mois)`,
    es: `el día ${day}`,
    de: `${day}. (des Monats)`,
    ru: `${day}-е (число)`,
  }
  return ord
}

function jaRegularReading(day) {
  const s = JA_SINO[day]
  return readingMap({
    ja: `${s.ja}にち`,
    en: `${s.en}-nichi`,
    ko: `${s.ko}니치`,
    ru: `${s.ru}-нити`,
  })
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`)
}

function koDayCard(day) {
  const hangulNum = {
    1: '일',
    2: '이',
    3: '삼',
    5: '오',
    10: '십',
    15: '십오',
    20: '이십',
    31: '삼십일',
  }[day]
  const romaji = {
    1: 'il-il',
    2: 'i-il',
    3: 'sam-il',
    5: 'o-il',
    10: 'sip-il',
    15: 'sip-o-il',
    20: 'i-sip-il',
    31: 'sam-sip-il',
  }[day]
  const kata = {
    1: 'イルイル',
    2: 'イイル',
    3: 'サミル',
    5: 'オイル',
    10: 'シピル',
    15: 'シポイル',
    20: 'イシピル',
    31: 'サムシピル',
  }[day]
  return {
    quiz_id: `ko_calendar_day_${day}`,
    question_word: `${day}일`,
    pronunciations: {
      en: romaji,
      ja: kata,
      zh: romaji,
      fr: romaji,
      es: romaji,
      de: romaji,
      ru: romaji,
      ko: `${hangulNum}일`,
    },
    translations: dayMeaning(day),
  }
}

// --- Korean: date units + day samples all live under Time & calendar ---
const koDateUnits = [
  {
    quiz_id: 'ko_calendar_nyeon',
    question_word: '년',
    pronunciations: {
      en: 'nyeon / yeon',
      ja: 'ニョン',
      zh: 'nyeon',
      fr: 'nyeon',
      es: 'nyeon',
      de: 'nyeon',
      ru: 'нён',
      ko: '년 / 연',
    },
    translations: {
      en: 'year (년/연 after a number)',
      zh: '年（년/연，接在数字后）',
      fr: 'année (년/연 après un nombre)',
      es: 'año (년/연 después de un número)',
      de: 'Jahr (년/연 nach einer Zahl)',
      ru: 'год (년/연 после числа)',
      ko: '년 / 연',
      ja: '年（년／연・数字のあと）',
    },
  },
  {
    quiz_id: 'ko_calendar_wol',
    question_word: '월',
    pronunciations: {
      en: 'wol',
      ja: 'ウォル',
      zh: 'wol',
      fr: 'wol',
      es: 'wol',
      de: 'wol',
      ru: 'воль',
      ko: '월',
    },
    translations: {
      en: 'month (after a number)',
      zh: '月（接在数字后）',
      fr: 'mois (après un nombre)',
      es: 'mes (después de un número)',
      de: 'Monat (nach einer Zahl)',
      ru: 'месяц (после числа)',
      ko: '월',
      ja: '月（数字のあと）',
    },
  },
  {
    quiz_id: 'ko_calendar_il',
    question_word: '일',
    pronunciations: {
      en: 'il',
      ja: 'イル',
      zh: 'il',
      fr: 'il',
      es: 'il',
      de: 'il',
      ru: 'иль',
      ko: '일',
    },
    translations: {
      en: 'day of the month (after a number)',
      zh: '日 / 号（接在数字后）',
      fr: 'jour du mois (après un nombre)',
      es: 'día del mes (después de un número)',
      de: 'Tag im Monat (nach einer Zahl)',
      ru: 'число месяца (после числа)',
      ko: '일',
      ja: '日（数字のあと・日付）',
    },
  },
]

const koDayOfMonth = [
  ...koDateUnits,
  {
    quiz_id: 'ko_calendar_myeochil',
    question_word: '며칠',
    pronunciations: {
      en: 'myeo-chil',
      ja: 'ミョチル',
      zh: 'myeo-chil',
      fr: 'myeo-chil',
      es: 'myeo-chil',
      de: 'myeo-chil',
      ru: 'мё-чиль',
      ko: '며칠',
    },
    translations: {
      en: 'what day (of the month)',
      zh: '几号',
      fr: 'quel jour (du mois)',
      es: 'qué día (del mes)',
      de: 'welcher Tag (im Monat)',
      ru: 'какое число',
      ko: '며칠',
      ja: '何日',
    },
  },
  ...[1, 5, 10, 20].map(koDayCard),
]

const koDayOfMonthTable = {
  table_id: 'ko_day_of_month_ref',
  title: {
    en: 'Date units & day of month',
    ko: '날짜 단위·일자',
    ja: '日付の単位・日',
    zh: '日期单位与日子',
    fr: 'Unites de date & jour',
    es: 'Unidades de fecha y dia',
    de: 'Datumseinheiten & Tag',
    ru: 'Единицы даты и число',
  },
  note: {
    en: 'Quiz day cards get a random month (3월 5일). Order: 년 → 월 → 일.',
    ko: '일자 문항에는 랜덤 월이 붙습니다(3월 5일). 순서: 년 → 월 → 일.',
    ja: '日の問題にはランダムな月が付く（3월 5일）。順：년→월→일。',
    zh: '日子题会随机加月份（3월 5일）。顺序：년→월→일。',
    fr: 'Les jours recoivent un mois aleatoire (3월 5일). Ordre: 년→월→일.',
    es: 'Los dias reciben un mes aleatorio (3월 5일). Orden: 년→월→일.',
    de: 'Tage bekommen einen Zufallsmonat (3월 5일). Reihenfolge: 년→월→일.',
    ru: 'К числам случайный месяц (3월 5일). Порядок: 년→월→일.',
  },
  rules: {
    en: [
      'Full date: 2024년 3월 5일 (year → month → day).',
      '년 is also heard as 연 in some words; as a counter after numbers both appear (2024년).',
      'Day cards in the quiz add a random 1–12월. 며칠 asks the date; 하루/이틀 are duration.',
    ],
    ko: [
      '전체 날짜: 2024년 3월 5일 (년 → 월 → 일).',
      '년은 단어에 따라 연으로도 읽힙니다. 숫자 뒤 단위로는 년이 기본입니다.',
      '퀴즈의 일자에는 1–12월이 랜덤으로 붙습니다. 며칠=날짜 물음, 하루/이틀=기간.',
    ],
    ja: [
      '日付全体：2024년 3월 5일（년→월→일）。',
      '년は語によって 연 とも。数字のあとの単位は主に 년。',
      'クイズの日には 1〜12월 がランダム付与。며칠＝日付、하루/이틀＝期間。',
    ],
    zh: [
      '完整日期：2024년 3월 5일（年→月→日）。',
      '년有时也读 연；数字后作量词多用 년。',
      '测验日子会随机加 1–12월。며칠问日期；하루/이틀表期间。',
    ],
    fr: [
      'Date complete: 2024년 3월 5일 (년→월→일).',
      '년 peut aussi se lire 연; apres un nombre on ecrit surtout 년.',
      'Les jours du quiz ajoutent 1–12월 au hasard. 며칠=date; 하루/이틀=duree.',
    ],
    es: [
      'Fecha completa: 2024년 3월 5일 (년→월→일).',
      '년 a veces se oye 연; tras numero suele ser 년.',
      'Los dias del quiz anaden 1–12월 al azar. 며칠=fecha; 하루/이틀=duracion.',
    ],
    de: [
      'Vollstandiges Datum: 2024년 3월 5일 (년→월→일).',
      '년 kann auch 연 klingen; nach Zahlen meist 년.',
      'Quiz-Tage bekommen zufallig 1–12월. 며칠=Datum; 하루/이틀=Dauer.',
    ],
    ru: [
      'Полная дата: 2024년 3월 5일 (년→월→일).',
      '년 иногда звучит как 연; после числа обычно 년.',
      'В квизе к числам случайно 1–12월. 며칠=дата; 하루/이틀=длительность.',
    ],
  },
  columns: [
    { key: 'form', labels: formLabels('ko') },
    { key: 'meaning', labels: meaningLabels },
    { key: 'sound', labels: soundLabels },
  ],
  rows: [
    ...koDayOfMonth.map((e) => ({
      form: e.question_word,
      meaning: e.translations,
      sound: e.pronunciations,
    })),
    {
      form: '2024년 3월 5일',
      meaning: {
        en: 'March 5, 2024',
        ko: '2024년 3월 5일',
        ja: '2024年3月5日',
        zh: '2024年3月5日',
        fr: '5 mars 2024',
        es: '5 de marzo de 2024',
        de: '5. März 2024',
        ru: '5 марта 2024 г.',
      },
      sound: {
        en: 'i-cheon-i-sip-sa-nyeon sam-wol o-il',
        ko: '이천이십사 년 삼 월 오 일',
        ja: 'イチョニシプサ ニョン サム ウォル オ イル',
        zh: 'i-cheon-i-sip-sa-nyeon sam-wol o-il',
        fr: 'i-cheon-i-sip-sa-nyeon sam-wol o-il',
        es: 'i-cheon-i-sip-sa-nyeon sam-wol o-il',
        de: 'i-cheon-i-sip-sa-nyeon sam-wol o-il',
        ru: 'ичхон-исипса нён сам воль о иль',
      },
    },
    {
      form: '하루 / 이틀',
      meaning: {
        en: 'one day / two days (duration)',
        ko: '하루 / 이틀 (기간)',
        ja: '一日・二日（期間）',
        zh: '一天 / 两天（期间）',
        fr: 'un jour / deux jours (duree)',
        es: 'un dia / dos dias (duracion)',
        de: 'einen Tag / zwei Tage (Dauer)',
        ru: 'один день / два дня (длительность)',
      },
      sound: {
        en: 'ha-ru / i-teul',
        ko: '하루 / 이틀',
        ja: 'ハル / イティル',
        zh: 'ha-ru / i-teul',
        fr: 'ha-ru / i-teul',
        es: 'ha-ru / i-teul',
        de: 'ha-ru / i-teul',
        ru: 'ха-ру / и-тыль',
      },
    },
  ],
}

writeJson('src/data/ko/dayOfMonth.json', koDayOfMonth)
writeJson('src/data/ko/dayOfMonth.table.json', koDayOfMonthTable)
// Korean no longer has a separate Dates category.
writeJson('src/data/ko/dates.json', [])
writeJson('src/data/ko/dates.table.json', {
  table_id: 'ko_dates_ref',
  title: { en: 'Dates', ko: '날짜 표현' },
  note: {
    en: 'Moved into Time & calendar basics.',
    ko: '「시간과 달력 기초」로 옮겼습니다.',
  },
  columns: [
    { key: 'form', labels: formLabels('ko') },
    { key: 'meaning', labels: meaningLabels },
  ],
  rows: [],
})

// --- Japanese ---
const irregularDays = new Set(JA_IRREGULAR.map((d) => d.day))

const jaQuiz = [
  ...JA_IRREGULAR.map((d) => ({
    quiz_id: `ja_dates_day_${d.day}`,
    question_word: d.kanji,
    // No tip: the answer is the reading itself.
    pronunciations: {},
    translations: d.reading,
  })),
  // One regular contrast card
  {
    quiz_id: 'ja_dates_day_15',
    question_word: '十五日',
    pronunciations: {},
    translations: jaRegularReading(15),
  },
  {
    quiz_id: 'ja_dates_nannichi',
    question_word: '何日',
    pronunciations: readingMap({
      ja: 'なんにち',
      en: 'nannichi',
      ko: '난니치',
      ru: 'наннити',
    }),
    translations: {
      en: 'what day (of the month) / how many days',
      zh: '几号 / 几天',
      fr: 'quel jour / combien de jours',
      es: 'qué día / cuántos días',
      de: 'welcher Tag / wie viele Tage',
      ru: 'какое число / сколько дней',
      ko: '며칠 / 며칠(기간)',
      ja: '何日',
    },
  },
]

const jaTableRows = []

const jaMonthRows = [
  ['一月', 'いちがつ', 'ichi-gatsu', '이치가쓰', 'ити-гацу'],
  ['二月', 'にがつ', 'ni-gatsu', '니가쓰', 'ни-гацу'],
  ['三月', 'さんがつ', 'san-gatsu', '산가쓰', 'сан-гацу'],
  ['四月', 'しがつ', 'shi-gatsu', '시가쓰', 'си-гацу'],
  ['五月', 'ごがつ', 'go-gatsu', '고가쓰', 'го-гацу'],
  ['六月', 'ろくがつ', 'roku-gatsu', '로쿠가쓰', 'року-гацу'],
  ['七月', 'しちがつ', 'shichi-gatsu', '시치가쓰', 'сити-гацу'],
  ['八月', 'はちがつ', 'hachi-gatsu', '하치가쓰', 'хати-гацу'],
  ['九月', 'くがつ', 'ku-gatsu', '쿠가쓰', 'ку-гацу'],
  ['十月', 'じゅうがつ', 'juu-gatsu', '주우가쓰', 'дзю:-гацу'],
  ['十一月', 'じゅういちがつ', 'juuichi-gatsu', '주우이치가쓰', 'дзю:ити-гацу'],
  ['十二月', 'じゅうにがつ', 'juuni-gatsu', '주우니가쓰', 'дзю:ни-гацу'],
]
for (const [kanji, ja, en, ko, ru] of jaMonthRows) {
  const irr = kanji === '四月' || kanji === '七月' || kanji === '九月'
  jaTableRows.push({
    form: kanji,
    meaning: {
      en: irr ? `${en} ★ month` : `${en} (month)`,
      ko: irr ? `${ko} ★ 월` : `${ko} (월)`,
      ja: irr ? `${ja} ★ 月` : `${ja}（月）`,
      zh: irr ? `${en} ★ 月` : `${en}（月）`,
      fr: irr ? `${en} ★ mois` : `${en} (mois)`,
      es: irr ? `${en} ★ mes` : `${en} (mes)`,
      de: irr ? `${en} ★ Monat` : `${en} (Monat)`,
      ru: irr ? `${ru} ★ месяц` : `${ru} (месяц)`,
    },
    sound: readingMap({ ja, en, ko, ru }),
  })
}

for (let day = 1; day <= 31; day++) {
  const irreg = JA_IRREGULAR.find((d) => d.day === day)
  const reading = irreg ? irreg.reading : jaRegularReading(day)
  const tag = irreg
    ? {
        en: `${dayMeaning(day).en} ★ irregular`,
        ko: `${day}일 ★ 불규칙`,
        ja: `${day}日 ★ 不規則`,
        zh: `${day}日 ★ 不规则`,
        fr: `${dayMeaning(day).fr} ★ irregulier`,
        es: `${dayMeaning(day).es} ★ irregular`,
        de: `${dayMeaning(day).de} ★ unregelmassig`,
        ru: `${dayMeaning(day).ru} ★ нерегулярно`,
      }
    : dayMeaning(day)
  jaTableRows.push({
    form: JA_KANJI[day],
    meaning: tag,
    sound: reading,
  })
}
jaTableRows.push({
  form: '何日',
  meaning: {
    en: 'what day (of the month) / how many days',
    zh: '几号 / 几天',
    fr: 'quel jour / combien de jours',
    es: 'qué día / cuántos días',
    de: 'welcher Tag / wie viele Tage',
    ru: 'какое число / сколько дней',
    ko: '며칠 / 며칠(기간)',
    ja: '何日',
  },
  sound: readingMap({
    ja: 'なんにち',
    en: 'nannichi',
    ko: '난니치',
    ru: 'наннити',
  }),
})

const jaTable = {
  table_id: 'ja_dates_ref',
  title: {
    en: 'Dates (day of month)',
    ko: '날짜 표현 (일자)',
    ja: '日付の表現（日）',
    zh: '日期表达（日）',
    fr: 'Dates (jour du mois)',
    es: 'Fechas (día del mes)',
    de: 'Daten (Tag im Monat)',
    ru: 'Даты (число месяца)',
  },
  note: {
    en: '★ = irregular day. Quiz adds a random month (〜がつ) to each prompt.',
    ko: '★ = 불규칙 일자. 퀴즈마다 랜덤 월(〜がつ)이 붙습니다.',
    ja: '★＝不規則の日。クイズでは毎回ランダムな月（〜がつ）が付く。',
    zh: '★=不规则日。测验每次随机加上月份（〜がつ）。',
    fr: '★ = jour irregulier. Le quiz ajoute un mois aleatoire (〜がつ).',
    es: '★ = dia irregular. El quiz anade un mes aleatorio (〜がつ).',
    de: '★ = unregelmassiger Tag. Quiz hangt einen Zufallsmonat (〜がつ) an.',
    ru: '★ = нерегулярный день. В квизе к каждому вопросу — случайный месяц (〜がつ).',
  },
  rules: {
    en: [
      'Memorize irregulars: 1–10日, plus 14日 (juu-yokka), 20日 (hatsuka), 24日 (nijuuyokka).',
      'Other days are mostly number + にち (十五日 = juugo-nichi). Not にじゅうにち for the 20th.',
      'Quiz prompts look like 三月十五日; answers include the month reading too (san-gatsu juugo-nichi).',
      'Month counter is 〜がつ. Watch April しがつ, July しちがつ, September くがつ.',
    ],
    ko: [
      '불규칙: 1–10일, 그리고 14일(じゅうよっか), 20일(はつか), 24일(にじゅうよっか)을 외우세요.',
      '나머지는 대체로 숫자+にち (十五日=じゅうごにち). 20일은 にじゅうにち가 아니라 はつか.',
      '퀴즈는 三月十五日처럼 나오고, 답에도 월 읽기가 들어갑니다 (さんがつ じゅうごにち).',
      '월은 〜がつ. 4월 しがつ, 7월 しちがつ, 9월 くがつ에 주의.',
    ],
    ja: [
      '不規則は 1〜10日、さらに 14日（じゅうよっか）・20日（はつか）・24日（にじゅうよっか）。',
      '他はだいたい数字＋にち（十五日＝じゅうごにち）。20日は「にじゅうにち」ではない。',
      'クイズは「三月十五日」のように出題。答えにも月の読み（さんがつ じゅうごにち）。',
      '月は〜がつ。四月＝しがつ、七月＝しちがつ、九月＝くがつに注意。',
    ],
    zh: [
      '不规则：1–10日，以及14日、20日、24日。',
      '其余多为数字＋にち；20日读はつか，不是にじゅうにち。',
      '测验会出「三月十五日」这类题，选项也含月份读法。',
      '月用〜がつ。注意四月しがつ、七月しちがつ、九月くがつ。',
    ],
    fr: [
      'Irreguliers: 1–10日, plus 14·20·24日.',
      'Sinon: nombre + にち. 20日 = hatsuka (pas nijuu-nichi).',
      'Le quiz affiche p.ex. 三月十五日; les choix incluent aussi 〜がつ.',
      'Mois = 〜がつ. Attention: しがつ, しちがつ, くがつ.',
    ],
    es: [
      'Irregulares: 1–10日, mas 14·20·24日.',
      'Otros: numero + にち. 20日 = hatsuka (no nijuu-nichi).',
      'El quiz muestra p.ej. 三月十五日; las opciones incluyen 〜がつ.',
      'Mes = 〜がつ. Cuidado: しがつ, しちがつ, くがつ.',
    ],
    de: [
      'Unregelmassig: 1–10日, dazu 14·20·24日.',
      'Sonst: Zahl + にち. 20日 = hatsuka (nicht nijuu-nichi).',
      'Quiz zeigt z.B. 三月十五日; Optionen inkl. 〜がつ.',
      'Monat = 〜がつ. Achtung: しがつ, しちがつ, くがつ.',
    ],
    ru: [
      'Нерегулярные: 1–10日, плюс 14·20·24日.',
      'Остальные: число + にち. 20日 = хацука (не нидзю:-нити).',
      'В квизе будет вроде 三月十五日; в вариантах тоже 〜がつ.',
      'Месяц = 〜がつ. Осторожно: しがつ, しちがつ, くがつ.',
    ],
  },
  columns: [
    { key: 'form', labels: formLabels('ja') },
    { key: 'meaning', labels: meaningLabels },
    { key: 'sound', labels: soundLabels },
  ],
  rows: jaTableRows,
}

writeJson('src/data/ja/dates.json', jaQuiz)
writeJson('src/data/ja/dates.table.json', jaTable)

console.log(
  'dates ok — ko calendar',
  koDayOfMonth.length,
  '/ ja',
  jaQuiz.length,
  'quiz,',
  jaTableRows.length,
  'table rows; irregulars',
  [...irregularDays].sort((a, b) => a - b).join(','),
)
