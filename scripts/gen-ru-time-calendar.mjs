/**
 * Russian time & calendar: time / weekdays / months (nominative) + dates (genitive months + day ordinals).
 * Run: node scripts/gen-ru-time-calendar.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../src/data/ru')

const LANGS = ['en', 'ko', 'ja', 'zh', 'fr', 'es', 'de', 'ru']

function digitMeaning(n) {
  const s = String(n)
  return Object.fromEntries(LANGS.map((l) => [l, s]))
}

function sounds(en, ko, ja, form) {
  return {
    en,
    ko,
    ja,
    zh: en,
    fr: en,
    es: en,
    de: en,
    ru: form,
  }
}

function entry(quizId, form, meaning, sound) {
  return {
    quiz_id: quizId,
    question_word: form,
    pronunciations: sound,
    translations: meaning,
  }
}

function tableRow(form, meaning, sound) {
  return { form, meaning, sound }
}

function formCols(langLabel) {
  return [
    {
      key: 'form',
      labels: {
        en: 'Russian',
        ko: '러시아어',
        ja: 'ロシア語',
        zh: '俄语',
        fr: 'Russe',
        es: 'Ruso',
        de: 'Russisch',
        ru: 'Русский',
        ...langLabel,
      },
    },
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

function simpleTable(tableId, title, note, rows, rules) {
  return {
    table_id: tableId,
    title,
    ...(note ? { note } : {}),
    ...(rules ? { rules } : {}),
    columns: formCols(),
    rows,
  }
}

// —— Time of day ——
const TIME = [
  {
    id: 'dawn',
    form: 'рассвет',
    en: 'ras-svet',
    ko: '라스베트',
    ja: 'ラススヴェト',
    meaning: {
      en: 'dawn / early morning',
      ko: '새벽',
      ja: '明け方',
      zh: '黎明',
      fr: 'aube',
      es: 'madrugada',
      de: 'Morgendämmerung',
      ru: 'рассвет',
    },
  },
  {
    id: 'morning',
    form: 'утро',
    en: 'u-tro',
    ko: '우트로',
    ja: 'ウトロ',
    meaning: {
      en: 'morning',
      ko: '아침',
      ja: '朝',
      zh: '早上',
      fr: 'matin',
      es: 'mañana',
      de: 'Morgen',
      ru: 'утро',
    },
  },
  {
    id: 'am',
    form: 'до полудня',
    en: 'do po-lu-dnya',
    ko: '도 팔루드냐',
    ja: 'ド・ポルドニャ',
    meaning: {
      en: 'a.m. / morning (before noon)',
      ko: '오전',
      ja: '午前',
      zh: '上午',
      fr: 'matin (avant midi)',
      es: 'a. m.',
      de: 'Vormittag',
      ru: 'до полудня',
    },
  },
  {
    id: 'day',
    form: 'день',
    en: 'denʹ',
    ko: '젠',
    ja: 'ヂェニ',
    meaning: {
      en: 'daytime / day',
      ko: '낮 / 하루',
      ja: '昼 / 日',
      zh: '白天 / 日',
      fr: 'journée / jour',
      es: 'día',
      de: 'Tag / Tageszeit',
      ru: 'день',
    },
  },
  {
    id: 'pm',
    form: 'после полудня',
    en: 'pos-le po-lu-dnya',
    ko: '포슬레 팔루드냐',
    ja: 'ポーズレ・ポルドニャ',
    meaning: {
      en: 'p.m. / afternoon',
      ko: '오후',
      ja: '午後',
      zh: '下午',
      fr: 'après-midi',
      es: 'tarde',
      de: 'Nachmittag',
      ru: 'после полудня',
    },
  },
  {
    id: 'evening',
    form: 'вечер',
    en: 've-cher',
    ko: '베체르',
    ja: 'ヴェーチェル',
    meaning: {
      en: 'evening',
      ko: '저녁',
      ja: '夕方 / 晩',
      zh: '傍晚 / 晚上',
      fr: 'soir',
      es: 'tarde / noche',
      de: 'Abend',
      ru: 'вечер',
    },
  },
  {
    id: 'night',
    form: 'ночь',
    en: 'nochʹ',
    ko: '노치',
    ja: 'ノーチ',
    meaning: {
      en: 'night',
      ko: '밤',
      ja: '夜',
      zh: '夜晚',
      fr: 'nuit',
      es: 'noche',
      de: 'Nacht',
      ru: 'ночь',
    },
  },
  {
    id: 'now',
    form: 'сейчас',
    en: 'sey-chas',
    ko: '세이차스',
    ja: 'セイチャス',
    meaning: {
      en: 'now',
      ko: '지금',
      ja: '今',
      zh: '现在',
      fr: 'maintenant',
      es: 'ahora',
      de: 'jetzt',
      ru: 'сейчас',
    },
  },
]

// —— Relative days + weekdays + week ——
const WEEKDAYS = [
  {
    id: 'day_before_yesterday',
    form: 'позавчера',
    en: 'po-za-vche-ra',
    ko: '파자브체라',
    ja: 'パザフチェラ',
    meaning: {
      en: 'the day before yesterday',
      ko: '그저께',
      ja: '一昨日',
      zh: '前天',
      fr: 'avant-hier',
      es: 'anteayer',
      de: 'vorgestern',
      ru: 'позавчера',
    },
  },
  {
    id: 'yesterday',
    form: 'вчера',
    en: 'vche-ra',
    ko: '브체라',
    ja: 'フチェラ',
    meaning: {
      en: 'yesterday',
      ko: '어제',
      ja: '昨日',
      zh: '昨天',
      fr: 'hier',
      es: 'ayer',
      de: 'gestern',
      ru: 'вчера',
    },
  },
  {
    id: 'today',
    form: 'сегодня',
    en: 'se-vod-nya',
    ko: '세보드냐',
    ja: 'セヴォードニャ',
    meaning: {
      en: 'today',
      ko: '오늘',
      ja: '今日',
      zh: '今天',
      fr: 'aujourd’hui',
      es: 'hoy',
      de: 'heute',
      ru: 'сегодня',
    },
  },
  {
    id: 'tomorrow',
    form: 'завтра',
    en: 'zav-tra',
    ko: '자프트라',
    ja: 'ザーフトラ',
    meaning: {
      en: 'tomorrow',
      ko: '내일',
      ja: '明日',
      zh: '明天',
      fr: 'demain',
      es: 'mañana',
      de: 'morgen',
      ru: 'завтра',
    },
  },
  {
    id: 'day_after_tomorrow',
    form: 'послезавтра',
    en: 'pos-le-zav-tra',
    ko: '포슬레자프트라',
    ja: 'ポーズレザーフトラ',
    meaning: {
      en: 'the day after tomorrow',
      ko: '모레',
      ja: '明後日',
      zh: '后天',
      fr: 'après-demain',
      es: 'pasado mañana',
      de: 'übermorgen',
      ru: 'послезавтра',
    },
  },
  {
    id: 'mon',
    form: 'понедельник',
    en: 'po-ne-delʹ-nik',
    ko: '파녜델니크',
    ja: 'パニヂェーリニク',
    meaning: {
      en: 'Monday',
      ko: '월요일',
      ja: '月曜日',
      zh: '星期一',
      fr: 'lundi',
      es: 'lunes',
      de: 'Montag',
      ru: 'понедельник',
    },
  },
  {
    id: 'tue',
    form: 'вторник',
    en: 'vtor-nik',
    ko: '프토르니크',
    ja: 'フトールニク',
    meaning: {
      en: 'Tuesday',
      ko: '화요일',
      ja: '火曜日',
      zh: '星期二',
      fr: 'mardi',
      es: 'martes',
      de: 'Dienstag',
      ru: 'вторник',
    },
  },
  {
    id: 'wed',
    form: 'среда',
    en: 'sre-da',
    ko: '스레다',
    ja: 'スリダー',
    meaning: {
      en: 'Wednesday',
      ko: '수요일',
      ja: '水曜日',
      zh: '星期三',
      fr: 'mercredi',
      es: 'miércoles',
      de: 'Mittwoch',
      ru: 'среда',
    },
  },
  {
    id: 'thu',
    form: 'четверг',
    en: 'chet-verg',
    ko: '치트베르크',
    ja: 'チトヴェールグ',
    meaning: {
      en: 'Thursday',
      ko: '목요일',
      ja: '木曜日',
      zh: '星期四',
      fr: 'jeudi',
      es: 'jueves',
      de: 'Donnerstag',
      ru: 'четверг',
    },
  },
  {
    id: 'fri',
    form: 'пятница',
    en: 'pyat-ni-tsa',
    ko: '퍄트니차',
    ja: 'ピャートニツァ',
    meaning: {
      en: 'Friday',
      ko: '금요일',
      ja: '金曜日',
      zh: '星期五',
      fr: 'vendredi',
      es: 'viernes',
      de: 'Freitag',
      ru: 'пятница',
    },
  },
  {
    id: 'sat',
    form: 'суббота',
    en: 'sub-bo-ta',
    ko: '수보타',
    ja: 'スボータ',
    meaning: {
      en: 'Saturday',
      ko: '토요일',
      ja: '土曜日',
      zh: '星期六',
      fr: 'samedi',
      es: 'sábado',
      de: 'Samstag',
      ru: 'суббота',
    },
  },
  {
    id: 'sun',
    form: 'воскресенье',
    en: 'vos-kre-senʹ-ye',
    ko: '보스크레세녜',
    ja: 'ヴァスクリセーニエ',
    meaning: {
      en: 'Sunday',
      ko: '일요일',
      ja: '日曜日',
      zh: '星期日',
      fr: 'dimanche',
      es: 'domingo',
      de: 'Sonntag',
      ru: 'воскресенье',
    },
  },
  {
    id: 'this_week',
    form: 'эта неделя',
    en: 'e-ta ne-de-lya',
    ko: '에타 녜델랴',
    ja: 'エータ・ニヂェーリャ',
    meaning: {
      en: 'this week',
      ko: '이번 주',
      ja: '今週',
      zh: '本周',
      fr: 'cette semaine',
      es: 'esta semana',
      de: 'diese Woche',
      ru: 'эта неделя',
    },
  },
  {
    id: 'last_week',
    form: 'прошлая неделя',
    en: 'prosh-la-ya ne-de-lya',
    ko: '프로슐라야 녜델랴',
    ja: 'プローシラーヤ・ニヂェーリャ',
    meaning: {
      en: 'last week',
      ko: '지난주',
      ja: '先週',
      zh: '上周',
      fr: 'la semaine dernière',
      es: 'la semana pasada',
      de: 'letzte Woche',
      ru: 'прошлая неделя',
    },
  },
  {
    id: 'next_week',
    form: 'следующая неделя',
    en: 'sle-du-yu-shcha-ya ne-de-lya',
    ko: '슬레두유샤야 녜델랴',
    ja: 'スリェドューシチャヤ・ニヂェーリャ',
    meaning: {
      en: 'next week',
      ko: '다음 주',
      ja: '来週',
      zh: '下周',
      fr: 'la semaine prochaine',
      es: 'la próxima semana',
      de: 'nächste Woche',
      ru: 'следующая неделя',
    },
  },
]

// —— Months (nominative) ——
const MONTHS_NOM = [
  { id: 'jan', n: 1, form: 'январь', en: 'yan-varʹ', ko: '얀바리', ja: 'ヤンヴァーリ', enName: 'January', koName: '1월', jaName: '一月', zhName: '一月', frName: 'janvier', esName: 'enero', deName: 'Januar' },
  { id: 'feb', n: 2, form: 'февраль', en: 'fev-ralʹ', ko: '페브랄', ja: 'フィヴラーリ', enName: 'February', koName: '2월', jaName: '二月', zhName: '二月', frName: 'février', esName: 'febrero', deName: 'Februar' },
  { id: 'mar', n: 3, form: 'март', en: 'mart', ko: '마트', ja: 'マルト', enName: 'March', koName: '3월', jaName: '三月', zhName: '三月', frName: 'mars', esName: 'marzo', deName: 'März' },
  { id: 'apr', n: 4, form: 'апрель', en: 'a-prelʹ', ko: '아프레리', ja: 'アプレーリ', enName: 'April', koName: '4월', jaName: '四月', zhName: '四月', frName: 'avril', esName: 'abril', deName: 'April' },
  { id: 'may', n: 5, form: 'май', en: 'may', ko: '마이', ja: 'マイ', enName: 'May', koName: '5월', jaName: '五月', zhName: '五月', frName: 'mai', esName: 'mayo', deName: 'Mai' },
  { id: 'jun', n: 6, form: 'июнь', en: 'i-yunʹ', ko: '이윤', ja: 'イユーニ', enName: 'June', koName: '6월', jaName: '六月', zhName: '六月', frName: 'juin', esName: 'junio', deName: 'Juni' },
  { id: 'jul', n: 7, form: 'июль', en: 'i-yulʹ', ko: '이율', ja: 'イユーリ', enName: 'July', koName: '7월', jaName: '七月', zhName: '七月', frName: 'juillet', esName: 'julio', deName: 'Juli' },
  { id: 'aug', n: 8, form: 'август', en: 'av-gust', ko: '아브구스트', ja: 'アーヴグスト', enName: 'August', koName: '8월', jaName: '八月', zhName: '八月', frName: 'août', esName: 'agosto', deName: 'August' },
  { id: 'sep', n: 9, form: 'сентябрь', en: 'sen-tyabrʹ', ko: '센탸브리', ja: 'センチャーブリ', enName: 'September', koName: '9월', jaName: '九月', zhName: '九月', frName: 'septembre', esName: 'septiembre', deName: 'September' },
  { id: 'oct', n: 10, form: 'октябрь', en: 'ok-tyabrʹ', ko: '옥탸브리', ja: 'オクチャーブリ', enName: 'October', koName: '10월', jaName: '十月', zhName: '十月', frName: 'octobre', esName: 'octubre', deName: 'Oktober' },
  { id: 'nov', n: 11, form: 'ноябрь', en: 'no-yabrʹ', ko: '나야브리', ja: 'ナヤーブリ', enName: 'November', koName: '11월', jaName: '十一月', zhName: '十一月', frName: 'novembre', esName: 'noviembre', deName: 'November' },
  { id: 'dec', n: 12, form: 'декабрь', en: 'de-kabrʹ', ko: '디카브리', ja: 'ヂィカブリー', enName: 'December', koName: '12월', jaName: '十二月', zhName: '十二月', frName: 'décembre', esName: 'diciembre', deName: 'Dezember' },
]

function monthMeaning(m) {
  return {
    en: m.enName,
    ko: m.koName,
    ja: m.jaName,
    zh: m.zhName,
    fr: m.frName,
    es: m.esName,
    de: m.deName,
    ru: m.form,
  }
}

// —— Dates: genitive months + neuter ordinals ——
const MONTHS_GEN = [
  { id: 'jan', n: 1, form: 'января', en: 'yan-va-rya', ko: '얀바랴', ja: 'ヤンヴァーリャ', base: MONTHS_NOM[0] },
  { id: 'feb', n: 2, form: 'февраля', en: 'fev-ra-lya', ko: '페브랄랴', ja: 'フィヴラーリャ', base: MONTHS_NOM[1] },
  { id: 'mar', n: 3, form: 'марта', en: 'mar-ta', ko: '마르타', ja: 'マルタ', base: MONTHS_NOM[2] },
  { id: 'apr', n: 4, form: 'апреля', en: 'a-pre-lya', ko: '아프레랴', ja: 'アプレーリャ', base: MONTHS_NOM[3] },
  { id: 'may', n: 5, form: 'мая', en: 'ma-ya', ko: '마야', ja: 'マーヤ', base: MONTHS_NOM[4] },
  { id: 'jun', n: 6, form: 'июня', en: 'i-yu-nya', ko: '이유냐', ja: 'イユーニャ', base: MONTHS_NOM[5] },
  { id: 'jul', n: 7, form: 'июля', en: 'i-yu-lya', ko: '이율랴', ja: 'イユーリャ', base: MONTHS_NOM[6] },
  { id: 'aug', n: 8, form: 'августа', en: 'av-gu-sta', ko: '아브구스타', ja: 'アーヴグスタ', base: MONTHS_NOM[7] },
  { id: 'sep', n: 9, form: 'сентября', en: 'sen-tyab-rya', ko: '센탸브랴', ja: 'センチャーブリャ', base: MONTHS_NOM[8] },
  { id: 'oct', n: 10, form: 'октября', en: 'ok-tyab-rya', ko: '옥탸브랴', ja: 'オクチャーブリャ', base: MONTHS_NOM[9] },
  { id: 'nov', n: 11, form: 'ноября', en: 'no-yab-rya', ko: '나야브랴', ja: 'ナヤーブリャ', base: MONTHS_NOM[10] },
  { id: 'dec', n: 12, form: 'декабря', en: 'de-kab-rya', ko: '디카브랴', ja: 'ヂィカブリーャ', base: MONTHS_NOM[11] },
]

function genMonthMeaning(m) {
  return {
    en: `${m.base.enName} (in dates)`,
    ko: `${m.base.koName} (날짜·생격)`,
    ja: `${m.base.jaName}（日付・生格）`,
    zh: `${m.base.zhName}（日期用生格）`,
    fr: `${m.base.frName} (dans les dates)`,
    es: `${m.base.esName} (en fechas)`,
    de: `${m.base.deName} (in Daten)`,
    ru: m.form,
  }
}

/** Neuter nominative ordinals for «какое число?» */
const DAY_ORDINALS = [
  { n: 1, form: 'первое', en: 'per-vo-ye', ko: '페르바예', ja: 'ペールヴァイェ' },
  { n: 2, form: 'второе', en: 'vto-ro-ye', ko: '프토라예', ja: 'フトーライェ' },
  { n: 3, form: 'третье', en: 'tretʹ-ye', ko: '트레티예', ja: 'トリェーチイェ' },
  { n: 4, form: 'четвёртое', en: 'chet-vyor-to-ye', ko: '치트뵤르타예', ja: 'チトヴョールタイェ' },
  { n: 5, form: 'пятое', en: 'pya-to-ye', ko: '퍄타예', ja: 'ピャータイェ' },
  { n: 6, form: 'шестое', en: 'she-sto-ye', ko: '셰스타예', ja: 'シェスターイェ' },
  { n: 7, form: 'седьмое', en: 'sedʹ-mo-ye', ko: '세드마예', ja: 'セーヂマイェ' },
  { n: 8, form: 'восьмое', en: 'vosʹ-mo-ye', ko: '보스마예', ja: 'ヴォースマイェ' },
  { n: 9, form: 'девятое', en: 'de-vya-to-ye', ko: '제뱌타예', ja: 'ヂェヴャータイェ' },
  { n: 10, form: 'десятое', en: 'de-sya-to-ye', ko: '제샤타예', ja: 'ヂェシャータイェ' },
  { n: 11, form: 'одиннадцатое', en: 'o-di-nna-tsa-to-ye', ko: '아딘나차타예', ja: 'アヂンナーツァタイェ' },
  { n: 12, form: 'двенадцатое', en: 'dve-na-tsa-to-ye', ko: '드베나차타예', ja: 'ドヴェナーツァタイェ' },
  { n: 13, form: 'тринадцатое', en: 'tri-na-tsa-to-ye', ko: '트리나차타예', ja: 'トリナーツァタイェ' },
  { n: 14, form: 'четырнадцатое', en: 'che-tyr-na-tsa-to-ye', ko: '치티르나차타예', ja: 'チティルナーツァタイェ' },
  { n: 15, form: 'пятнадцатое', en: 'pyat-na-tsa-to-ye', ko: '퍄트나차타예', ja: 'ピャトナーツァタイェ' },
  { n: 16, form: 'шестнадцатое', en: 'shest-na-tsa-to-ye', ko: '셰스트나차타예', ja: 'シェストナーツァタイェ' },
  { n: 17, form: 'семнадцатое', en: 'sem-na-tsa-to-ye', ko: '셈나차타예', ja: 'セムナーツァタイェ' },
  { n: 18, form: 'восемнадцатое', en: 'vo-sem-na-tsa-to-ye', ko: '바셈나차타예', ja: 'ヴォセムナーツァタイェ' },
  { n: 19, form: 'девятнадцатое', en: 'de-vyat-na-tsa-to-ye', ko: '제뱌트나차타예', ja: 'ヂェヴャトナーツァタイェ' },
  { n: 20, form: 'двадцатое', en: 'dva-tsa-to-ye', ko: '드바차타예', ja: 'ドヴァツァータイェ' },
  { n: 21, form: 'двадцать первое', en: 'dva-tsatʹ per-vo-ye', ko: '드바찻 페르바예', ja: 'ドヴァーツァチ・ペールヴァイェ' },
  { n: 22, form: 'двадцать второе', en: 'dva-tsatʹ vto-ro-ye', ko: '드바찻 프토라예', ja: 'ドヴァーツァチ・フトーライェ' },
  { n: 23, form: 'двадцать третье', en: 'dva-tsatʹ tretʹ-ye', ko: '드바찻 트레티예', ja: 'ドヴァーツァチ・トリェーチイェ' },
  { n: 24, form: 'двадцать четвёртое', en: 'dva-tsatʹ chet-vyor-to-ye', ko: '드바찻 치트뵤르타예', ja: 'ドヴァーツァチ・チトヴョールタイェ' },
  { n: 25, form: 'двадцать пятое', en: 'dva-tsatʹ pya-to-ye', ko: '드바찻 퍄타예', ja: 'ドヴァーツァチ・ピャータイェ' },
  { n: 26, form: 'двадцать шестое', en: 'dva-tsatʹ she-sto-ye', ko: '드바찻 셰스타예', ja: 'ドヴァーツァチ・シェスターイェ' },
  { n: 27, form: 'двадцать седьмое', en: 'dva-tsatʹ sedʹ-mo-ye', ko: '드바찻 세드마예', ja: 'ドヴァーツァチ・セーヂマイェ' },
  { n: 28, form: 'двадцать восьмое', en: 'dva-tsatʹ vosʹ-mo-ye', ko: '드바찻 보스마예', ja: 'ドヴァーツァチ・ヴォースマイェ' },
  { n: 29, form: 'двадцать девятое', en: 'dva-tsatʹ de-vya-to-ye', ko: '드바찻 제뱌타예', ja: 'ドヴァーツァチ・ヂェヴャータイェ' },
  { n: 30, form: 'тридцатое', en: 'tri-tsa-to-ye', ko: '트리차타예', ja: 'トリツァータイェ' },
  { n: 31, form: 'тридцать первое', en: 'tri-tsatʹ per-vo-ye', ko: '트리찻 페르바예', ja: 'トリーツァチ・ペールヴァイェ' },
]

function dayMeaning(n) {
  const ord = {
    en: `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} (of the month)`,
    ko: `${n}일`,
    ja: `${n}日`,
    zh: `${n}号`,
    fr: `le ${n}`,
    es: `día ${n}`,
    de: `${n}.`,
    ru: String(n),
  }
  return ord
}

function packList(prefix, items) {
  return items.map((item) => {
    const sound = sounds(item.en, item.ko, item.ja, item.form)
    return {
      quiz: entry(`${prefix}_${item.id ?? item.n}`, item.form, item.meaning ?? dayMeaning(item.n), sound),
      row: tableRow(item.form, item.meaning ?? dayMeaning(item.n), sound),
    }
  })
}

// Build outputs
const timePack = packList(
  'ru_time',
  TIME.map((t) => ({ ...t, meaning: t.meaning })),
)
const weekPack = packList(
  'ru_weekdays',
  WEEKDAYS.map((t) => ({ ...t, meaning: t.meaning })),
)
const monthPack = MONTHS_NOM.map((m) => {
  const sound = sounds(m.en, m.ko, m.ja, m.form)
  const meaning = monthMeaning(m)
  return {
    quiz: entry(`ru_months_${m.id}`, m.form, meaning, sound),
    row: tableRow(m.form, meaning, sound),
  }
})

const genPack = MONTHS_GEN.map((m) => {
  const sound = sounds(m.en, m.ko, m.ja, m.form)
  const meaning = genMonthMeaning(m)
  return {
    quiz: entry(`ru_dates_month_${m.n}`, m.form, meaning, sound),
    row: tableRow(m.form, meaning, sound),
  }
})

const dayPack = DAY_ORDINALS.map((d) => {
  const sound = sounds(d.en, d.ko, d.ja, d.form)
  const meaning = dayMeaning(d.n)
  return {
    quiz: entry(`ru_dates_day_${d.n}`, d.form, meaning, sound),
    row: tableRow(d.form, meaning, sound),
  }
})

const timeTable = simpleTable(
  'ru_time_ref',
  {
    en: 'Time of day',
    ko: '하루 안의 때',
    ja: '一日の中の時',
    zh: '一天中的时段',
    fr: 'Moments de la journée',
    es: 'Momentos del día',
    de: 'Tageszeiten',
    ru: 'Время суток',
  },
  null,
  timePack.map((p) => p.row),
)

const weekTable = simpleTable(
  'ru_weekdays_ref',
  {
    en: 'Days & relative time',
    ko: '요일과 상대적 때',
    ja: '曜日と相対的な時',
    zh: '星期与相对时间',
    fr: 'Jours & temps relatif',
    es: 'Días y tiempo relativo',
    de: 'Wochentage & relative Zeit',
    ru: 'Дни и относительное время',
  },
  null,
  weekPack.map((p) => p.row),
)

const monthsTable = simpleTable(
  'ru_months_ref',
  {
    en: 'Months (nominative)',
    ko: '월 이름 (주격)',
    ja: '月名（主格）',
    zh: '月份（主格）',
    fr: 'Mois (nominatif)',
    es: 'Meses (nominativo)',
    de: 'Monate (Nominativ)',
    ru: 'Месяцы (именительный)',
  },
  {
    en: 'Use nominative when naming the month alone. In dates you need the genitive (see Dates).',
    ko: '월 이름만 말할 때는 주격. 날짜에서는 생격이 필요합니다(날짜 단원).',
    ja: '月名だけのときは主格。日付では生格（「日付」カテゴリ）。',
    zh: '单独说月份用主格；写日期要用生格（见“日期”）。',
    fr: 'Nominatif pour le nom seul ; génitif dans les dates.',
    es: 'Nominativo solo; genitivo en fechas.',
    de: 'Nominativ allein; Genitiv in Daten.',
    ru: 'Именительный — название месяца; в датах — родительный.',
  },
  monthPack.map((p) => p.row),
)

const datesTable = {
  table_id: 'ru_dates_ref',
  title: {
    en: 'Dates',
    ko: '날짜 표현',
    ja: '日付の表現',
    zh: '日期表达',
    fr: 'Dates',
    es: 'Fechas',
    de: 'Daten',
    ru: 'Даты',
  },
  note: {
    en: 'Unlike Korean, Russian dates need ordinals + genitive months: пятое января / 5 января.',
    ko: '한국어와 달리 러시아어 날짜는 서수(중성)+월 생격이 필요합니다: пятое января.',
    ja: '韓国語と違い、ロシア語の日付は序数（中性）＋月の生格：пятое января。',
    zh: '与韩语不同，俄语日期要用序数（中性）+月份生格：пятое января。',
    fr: 'Contrairement au coréen : ordinaux + mois au génitif.',
    es: 'A diferencia del coreano: ordinales + mes en genitivo.',
    de: 'Anders als Koreanisch: Ordinalia + Monat im Genitiv.',
    ru: 'Нужны порядковые (ср. р.) и месяцы в родительном: пятое января.',
  },
  rules: {
    en: [
      'Spoken date: neuter ordinal + genitive month (первое мая).',
      'Writing often uses Arabic numerals: 1 мая, 23 февраля.',
      '21–31 = tens + ordinal ones (двадцать первое), like number compounds.',
    ],
    ko: [
      '말할 때: 중성 서수 + 월 생격 (первое мая).',
      '글에서는 숫자도 흔함: 1 мая, 23 февраля.',
      '21–31 = 십 단위 + 서수 일자리 (двадцать первое).',
    ],
    ja: [
      '話し言葉：中性の序数＋月の生格（первое мая）。',
      '書き言葉は数字も多い：1 мая。',
      '21–31は十＋序数（двадцать первое）。',
    ],
    zh: [
      '口语：中性序数 + 月份生格（первое мая）。',
      '书写常用阿拉伯数字：1 мая。',
      '21–31 = 整十 + 序数个位。',
    ],
    fr: [
      'À l’oral : ordinal neutre + mois au génitif.',
      'À l’écrit : souvent 1 мая.',
      '21–31 = dizaine + ordinal.',
    ],
    es: [
      'Oral: ordinal neutro + mes en genitivo.',
      'Escrito: a menudo 1 мая.',
      '21–31 = decena + ordinal.',
    ],
    de: [
      'Mündlich: Neutrum-Ordinal + Monat Genitiv.',
      'Schriftlich oft 1 мая.',
      '21–31 = Zehner + Ordinal.',
    ],
    ru: [
      'Устно: порядковое ср. р. + месяц в род. п.',
      'Письменно часто: 1 мая.',
      '21–31 = десятки + порядковое.',
    ],
  },
  sections: [
    {
      title: {
        en: 'Months in dates (genitive)',
        ko: '날짜용 월 (생격)',
        ja: '日付の月（生格）',
        zh: '日期用月份（生格）',
        fr: 'Mois dans les dates (génitif)',
        es: 'Meses en fechas (genitivo)',
        de: 'Monate in Daten (Genitiv)',
        ru: 'Месяцы в датах (родительный)',
      },
      columns: formCols(),
      rows: genPack.map((p) => p.row),
    },
    {
      title: {
        en: 'Day of month (neuter ordinal)',
        ko: '일자 (중성 서수)',
        ja: '日（中性の序数）',
        zh: '几号（中性序数）',
        fr: 'Jour du mois (ordinal neutre)',
        es: 'Día del mes (ordinal neutro)',
        de: 'Tag im Monat (Neutrum)',
        ru: 'Число (порядковое ср. р.)',
      },
      columns: formCols(),
      rows: dayPack.map((p) => p.row),
    },
  ],
}

fs.mkdirSync(outDir, { recursive: true })

const files = [
  ['time.json', timePack.map((p) => p.quiz)],
  ['time.table.json', timeTable],
  ['weekdays.json', weekPack.map((p) => p.quiz)],
  ['weekdays.table.json', weekTable],
  ['months.json', monthPack.map((p) => p.quiz)],
  ['months.table.json', monthsTable],
  ['dates.json', [...genPack, ...dayPack].map((p) => p.quiz)],
  ['dates.table.json', datesTable],
]

for (const [name, data] of files) {
  fs.writeFileSync(path.join(outDir, name), `${JSON.stringify(data, null, 2)}\n`)
}

console.log(
  `Wrote time(${timePack.length}) weekdays(${weekPack.length}) months(${monthPack.length}) dates(${genPack.length + dayPack.length}) → ${outDir}`,
)
