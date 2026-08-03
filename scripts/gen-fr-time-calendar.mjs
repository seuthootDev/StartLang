/**
 * French time & calendar: time / weekdays / months (merged under /fr/time).
 * No separate dates category — French dates are mostly regular.
 * Run: node scripts/gen-fr-time-calendar.mjs
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

function entry(quizId, form, meaning, sound) {
  return {
    quiz_id: quizId,
    question_word: form,
    pronunciations: sound,
    translations: loc(meaning),
  }
}

function tableRow(form, meaning, sound) {
  return { form, meaning: loc(meaning), sound }
}

function formCols() {
  return [
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
}

function simpleTable(tableId, title, note, rows, rules) {
  return {
    table_id: tableId,
    title: loc(title),
    ...(note ? { note: loc(note) } : {}),
    ...(rules
      ? {
          rules: Object.fromEntries(
            Object.entries(rules).map(([k, v]) => [k, v]),
          ),
        }
      : {}),
    columns: formCols(),
    rows,
  }
}

function pack(prefix, id, form, en, ko, ja, meaning) {
  const sound = sounds(en, ko, ja, form)
  return {
    quiz: entry(`${prefix}_${id}`, form, meaning, sound),
    row: tableRow(form, meaning, sound),
  }
}

// —— Time of day ——
const TIME = [
  pack('fr_time', 'dawn', 'aube', 'ob/aube', '오브', 'オブ', {
    en: 'dawn / early morning',
    ko: '새벽',
    ja: '明け方',
    zh: '黎明',
    fr: 'aube',
    es: 'madrugada / alba',
    de: 'Morgendämmerung',
    ru: 'рассвет',
  }),
  pack('fr_time', 'morning', 'matin', 'ma-tan/matin', '마탱', 'マタン', {
    en: 'morning',
    ko: '아침',
    ja: '朝',
    zh: '早上',
    fr: 'matin',
    es: 'mañana',
    de: 'Morgen',
    ru: 'утро',
  }),
  pack('fr_time', 'am', 'du matin', 'dü ma-tan', '뒤 마탱', 'デュ・マタン', {
    en: 'a.m. / in the morning',
    ko: '오전 / 아침에',
    ja: '午前 / 朝に',
    zh: '上午',
    fr: 'du matin',
    es: 'a. m. / por la mañana',
    de: 'Vormittag / morgens',
    ru: 'утром / до полудня',
  }),
  pack('fr_time', 'noon', 'midi', 'mee-dee/midi', '미디', 'ミディ', {
    en: 'noon / midday',
    ko: '정오 / 낮',
    ja: '正午 / 昼',
    zh: '中午',
    fr: 'midi',
    es: 'mediodía',
    de: 'Mittag',
    ru: 'полдень',
  }),
  pack('fr_time', 'pm', 'après-midi', 'a-pre-mee-dee', '아프레미디', 'アプレミディ', {
    en: 'afternoon / p.m.',
    ko: '오후',
    ja: '午後',
    zh: '下午',
    fr: 'après-midi',
    es: 'tarde',
    de: 'Nachmittag',
    ru: 'после полудня',
  }),
  pack('fr_time', 'evening', 'soir', 'swar/soir', '수아르', 'ソワール', {
    en: 'evening',
    ko: '저녁',
    ja: '夕方 / 晩',
    zh: '傍晚 / 晚上',
    fr: 'soir',
    es: 'tarde / noche',
    de: 'Abend',
    ru: 'вечер',
  }),
  pack('fr_time', 'night', 'nuit', 'nwee/nuit', '뉘', 'ニュイ', {
    en: 'night',
    ko: '밤',
    ja: '夜',
    zh: '夜晚',
    fr: 'nuit',
    es: 'noche',
    de: 'Nacht',
    ru: 'ночь',
  }),
  pack('fr_time', 'now', 'maintenant', 'man-tuh-non', '맹트낭', 'マントナン', {
    en: 'now',
    ko: '지금',
    ja: '今',
    zh: '现在',
    fr: 'maintenant',
    es: 'ahora',
    de: 'jetzt',
    ru: 'сейчас',
  }),
]

// —— Relative days + weekdays + week ——
const WEEKDAYS = [
  pack(
    'fr_weekdays',
    'day_before_yesterday',
    'avant-hier',
    'a-van-yer',
    '아방이에르',
    'アヴァンイエール',
    {
      en: 'the day before yesterday',
      ko: '그저께',
      ja: '一昨日',
      zh: '前天',
      fr: 'avant-hier',
      es: 'anteayer',
      de: 'vorgestern',
      ru: 'позавчера',
    },
  ),
  pack('fr_weekdays', 'yesterday', 'hier', 'yer/hier', '이에르', 'イエール', {
    en: 'yesterday',
    ko: '어제',
    ja: '昨日',
    zh: '昨天',
    fr: 'hier',
    es: 'ayer',
    de: 'gestern',
    ru: 'вчера',
  }),
  pack(
    'fr_weekdays',
    'today',
    "aujourd'hui",
    'o-zhoor-dwee',
    '오주르뒤',
    'オジュルディ',
    {
      en: 'today',
      ko: '오늘',
      ja: '今日',
      zh: '今天',
      fr: "aujourd'hui",
      es: 'hoy',
      de: 'heute',
      ru: 'сегодня',
    },
  ),
  pack('fr_weekdays', 'tomorrow', 'demain', 'duh-man/demain', '드맹', 'ドゥマン', {
    en: 'tomorrow',
    ko: '내일',
    ja: '明日',
    zh: '明天',
    fr: 'demain',
    es: 'mañana (día siguiente)',
    de: 'morgen (Tag)',
    ru: 'завтра',
  }),
  pack(
    'fr_weekdays',
    'day_after_tomorrow',
    'après-demain',
    'a-pre-duh-man',
    '아프레드맹',
    'アプレドゥマン',
    {
      en: 'the day after tomorrow',
      ko: '모레',
      ja: '明後日',
      zh: '后天',
      fr: 'après-demain',
      es: 'pasado mañana',
      de: 'übermorgen',
      ru: 'послезавтра',
    },
  ),
  pack('fr_weekdays', 'mon', 'lundi', 'lun-dee/lundi', '렁디', 'ランディ', {
    en: 'Monday',
    ko: '월요일',
    ja: '月曜日',
    zh: '星期一',
    fr: 'lundi',
    es: 'lunes',
    de: 'Montag',
    ru: 'понедельник',
  }),
  pack('fr_weekdays', 'tue', 'mardi', 'mar-dee/mardi', '마르디', 'マルディ', {
    en: 'Tuesday',
    ko: '화요일',
    ja: '火曜日',
    zh: '星期二',
    fr: 'mardi',
    es: 'martes',
    de: 'Dienstag',
    ru: 'вторник',
  }),
  pack('fr_weekdays', 'wed', 'mercredi', 'mer-kruh-dee', '메르크뢰디', 'メルクルディ', {
    en: 'Wednesday',
    ko: '수요일',
    ja: '水曜日',
    zh: '星期三',
    fr: 'mercredi',
    es: 'miércoles',
    de: 'Mittwoch',
    ru: 'среда',
  }),
  pack('fr_weekdays', 'thu', 'jeudi', 'zhuh-dee/jeudi', '죄디', 'ジュディ', {
    en: 'Thursday',
    ko: '목요일',
    ja: '木曜日',
    zh: '星期四',
    fr: 'jeudi',
    es: 'jueves',
    de: 'Donnerstag',
    ru: 'четверг',
  }),
  pack('fr_weekdays', 'fri', 'vendredi', 'von-druh-dee', '방드뢰디', 'ヴァンドルディ', {
    en: 'Friday',
    ko: '금요일',
    ja: '金曜日',
    zh: '星期五',
    fr: 'vendredi',
    es: 'viernes',
    de: 'Freitag',
    ru: 'пятница',
  }),
  pack('fr_weekdays', 'sat', 'samedi', 'sam-dee/samedi', '삼디', 'サムディ', {
    en: 'Saturday',
    ko: '토요일',
    ja: '土曜日',
    zh: '星期六',
    fr: 'samedi',
    es: 'sábado',
    de: 'Samstag',
    ru: 'суббота',
  }),
  pack('fr_weekdays', 'sun', 'dimanche', 'dee-monsh', '디망슈', 'ディマンシュ', {
    en: 'Sunday',
    ko: '일요일',
    ja: '日曜日',
    zh: '星期日',
    fr: 'dimanche',
    es: 'domingo',
    de: 'Sonntag',
    ru: 'воскресенье',
  }),
  pack(
    'fr_weekdays',
    'this_week',
    'cette semaine',
    'set suh-men',
    '세트 스멘',
    'セット・スムヌ',
    {
      en: 'this week',
      ko: '이번 주',
      ja: '今週',
      zh: '本周',
      fr: 'cette semaine',
      es: 'esta semana',
      de: 'diese Woche',
      ru: 'эта неделя',
    },
  ),
  pack(
    'fr_weekdays',
    'last_week',
    'la semaine dernière',
    'la suh-men der-nyer',
    '라 스멘 데르니에르',
    'ラ・スムヌ・デルニエール',
    {
      en: 'last week',
      ko: '지난주',
      ja: '先週',
      zh: '上周',
      fr: 'la semaine dernière',
      es: 'la semana pasada',
      de: 'letzte Woche',
      ru: 'прошлая неделя',
    },
  ),
  pack(
    'fr_weekdays',
    'next_week',
    'la semaine prochaine',
    'la suh-men pro-shen',
    '라 스멘 프로셴',
    'ラ・スムヌ・プロシェヌ',
    {
      en: 'next week',
      ko: '다음 주',
      ja: '来週',
      zh: '下周',
      fr: 'la semaine prochaine',
      es: 'la próxima semana',
      de: 'nächste Woche',
      ru: 'следующая неделя',
    },
  ),
]

// —— Months ——
const MONTHS = [
  pack('fr_months', 'jan', 'janvier', 'zhan-vyay', '장비에', 'ジャンヴィエ', {
    en: 'January',
    ko: '1월',
    ja: '一月',
    zh: '一月',
    fr: 'janvier',
    es: 'enero',
    de: 'Januar',
    ru: 'январь',
  }),
  pack('fr_months', 'feb', 'février', 'fay-vree-ay', '페브리에', 'フェヴリエ', {
    en: 'February',
    ko: '2월',
    ja: '二月',
    zh: '二月',
    fr: 'février',
    es: 'febrero',
    de: 'Februar',
    ru: 'февраль',
  }),
  pack('fr_months', 'mar', 'mars', 'mars', '마르스', 'マルス', {
    en: 'March',
    ko: '3월',
    ja: '三月',
    zh: '三月',
    fr: 'mars',
    es: 'marzo',
    de: 'März',
    ru: 'март',
  }),
  pack('fr_months', 'apr', 'avril', 'a-vreel/avril', '아브릴', 'アヴリル', {
    en: 'April',
    ko: '4월',
    ja: '四月',
    zh: '四月',
    fr: 'avril',
    es: 'abril',
    de: 'April',
    ru: 'апрель',
  }),
  pack('fr_months', 'may', 'mai', 'me/mai', '메', 'メ', {
    en: 'May',
    ko: '5월',
    ja: '五月',
    zh: '五月',
    fr: 'mai',
    es: 'mayo',
    de: 'Mai',
    ru: 'май',
  }),
  pack('fr_months', 'jun', 'juin', 'zhwan/juin', '쥐앵', 'ジュアン', {
    en: 'June',
    ko: '6월',
    ja: '六月',
    zh: '六月',
    fr: 'juin',
    es: 'junio',
    de: 'Juni',
    ru: 'июнь',
  }),
  pack('fr_months', 'jul', 'juillet', 'zhwee-ye/juillet', '쥐예', 'ジュイエ', {
    en: 'July',
    ko: '7월',
    ja: '七月',
    zh: '七月',
    fr: 'juillet',
    es: 'julio',
    de: 'Juli',
    ru: 'июль',
  }),
  pack('fr_months', 'aug', 'août', 'oot/août', '우', 'ウ', {
    en: 'August',
    ko: '8월',
    ja: '八月',
    zh: '八月',
    fr: 'août',
    es: 'agosto',
    de: 'August',
    ru: 'август',
  }),
  pack('fr_months', 'sep', 'septembre', 'sep-tombr', '셉통브르', 'セプトンブル', {
    en: 'September',
    ko: '9월',
    ja: '九月',
    zh: '九月',
    fr: 'septembre',
    es: 'septiembre',
    de: 'September',
    ru: 'сентябрь',
  }),
  pack('fr_months', 'oct', 'octobre', 'ok-tobr/octobre', '옥토브르', 'オクトブル', {
    en: 'October',
    ko: '10월',
    ja: '十月',
    zh: '十月',
    fr: 'octobre',
    es: 'octubre',
    de: 'Oktober',
    ru: 'октябрь',
  }),
  pack('fr_months', 'nov', 'novembre', 'no-vombr', '노봉브르', 'ノヴォンブル', {
    en: 'November',
    ko: '11월',
    ja: '十一月',
    zh: '十一月',
    fr: 'novembre',
    es: 'noviembre',
    de: 'November',
    ru: 'ноябрь',
  }),
  pack('fr_months', 'dec', 'décembre', 'day-sombr', '데솜브르', 'デソンブル', {
    en: 'December',
    ko: '12월',
    ja: '十二月',
    zh: '十二月',
    fr: 'décembre',
    es: 'diciembre',
    de: 'Dezember',
    ru: 'декабрь',
  }),
  pack('fr_months', 'spring', 'printemps', 'pran-ton', '프랑통', 'プランタン', {
    en: 'spring',
    ko: '봄',
    ja: '春',
    zh: '春天',
    fr: 'printemps',
    es: 'primavera',
    de: 'Frühling',
    ru: 'весна',
  }),
  pack('fr_months', 'summer', 'été', 'ay-tay/été', '에테', 'エテ', {
    en: 'summer',
    ko: '여름',
    ja: '夏',
    zh: '夏天',
    fr: 'été',
    es: 'verano',
    de: 'Sommer',
    ru: 'лето',
  }),
  pack('fr_months', 'autumn', 'automne', 'o-ton/automne', '오토른', 'オトンヌ', {
    en: 'autumn / fall',
    ko: '가을',
    ja: '秋',
    zh: '秋天',
    fr: 'automne',
    es: 'otoño',
    de: 'Herbst',
    ru: 'осень',
  }),
  pack('fr_months', 'winter', 'hiver', 'ee-ver/hiver', '이베르', 'イヴェール', {
    en: 'winter',
    ko: '겨울',
    ja: '冬',
    zh: '冬天',
    fr: 'hiver',
    es: 'invierno',
    de: 'Winter',
    ru: 'зима',
  }),
]

const timeTable = simpleTable(
  'fr_time_ref',
  {
    en: 'Time of day',
    ko: '하루의 때',
    ja: '一日の時間帯',
    zh: '一天中的时段',
    fr: 'Moments de la journée',
    es: 'Momentos del día',
    de: 'Tageszeiten',
    ru: 'Время суток',
  },
  {
    en: 'Use le matin / l’après-midi / le soir for “in the morning/afternoon/evening”.',
    ko: '「아침에/오후에/저녁에」는 le matin / l’après-midi / le soir를 씁니다.',
    ja: '「朝に／午後に／夕方に」は le matin / l’après-midi / le soir。',
    zh: '“在早上/下午/晚上”用 le matin / l’après-midi / le soir。',
    fr: 'le matin / l’après-midi / le soir = « in the morning/afternoon/evening ».',
    es: 'le matin / l’après-midi / le soir = « por la mañana/tarde/noche ».',
    de: 'le matin / l’après-midi / le soir = „morgens/nachmittags/abends“.',
    ru: 'le matin / l’après-midi / le soir = «утром/днём/вечером».',
  },
  TIME.map((p) => p.row),
  {
    en: [
      'midi = noon; après-midi = afternoon (often written with or without accent).',
      'du matin / de l’après-midi appear in clock talk (8 h du matin).',
    ],
    ko: [
      'midi = 정오, après-midi = 오후.',
      '시계 표현에 du matin / de l’après-midi (8 h du matin).',
    ],
    ja: [
      'midi = 正午、après-midi = 午後。',
      '時刻では du matin / de l’après-midi（8 h du matin）。',
    ],
    zh: [
      'midi = 中午；après-midi = 下午。',
      '报时常用 du matin / de l’après-midi（8 h du matin）。',
    ],
    fr: [
      'midi = noon ; après-midi = afternoon.',
      'À l’heure : 8 h du matin, 3 h de l’après-midi.',
    ],
    es: [
      'midi = mediodía; après-midi = tarde.',
      'En la hora: 8 h du matin.',
    ],
    de: [
      'midi = Mittag; après-midi = Nachmittag.',
      'Bei der Uhrzeit: 8 h du matin.',
    ],
    ru: [
      'midi = полдень; après-midi = после полудня.',
      'Во времени: 8 h du matin.',
    ],
    it: [
      'midi = mezzogiorno; après-midi = pomeriggio.',
      'Nell’ora: 8 h du matin.',
    ],
  },
)

const weekTable = simpleTable(
  'fr_weekdays_ref',
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
  {
    en: 'Weekdays are not capitalized in French. lundi is the first day of the week in most calendars.',
    ko: '프랑스어 요일은 소문자로 씁니다. 달력에서는 보통 lundi가 한 주의 시작입니다.',
    ja: 'フランス語の曜日は小文字。多くの暦では lundi が週の始まり。',
    zh: '法语星期不大写。多数日历以 lundi 为一周之始。',
    fr: 'Les jours ne prennent pas de majuscule. lundi commence souvent la semaine.',
    es: 'Los días no llevan mayúscula. lundi suele iniciar la semana.',
    de: 'Wochentage klein. lundi oft Wochenbeginn.',
    ru: 'Дни недели с маленькой буквы. Часто неделя с lundi.',
  },
  WEEKDAYS.map((p) => p.row),
)

/** Date-writing examples (reference only — day ≈ cardinal from Numbers). */
const DATE_WRITING = [
  {
    form: 'le 1er janvier / le premier janvier',
    meaning: loc({
      en: 'January 1st (only day that uses an ordinal)',
      ko: '1월 1일 (유일하게 서수)',
      ja: '1月1日（序数を使う唯一の日）',
      zh: '1月1日（唯一用序数）',
      fr: 'le 1er janvier (seul jour en ordinal)',
      es: '1 de enero (único día con ordinal)',
      de: '1. Januar (einziger Ordinal-Tag)',
      ru: '1 января (единственный день с порядковым)',
    }),
    sound: loc({
      en: '1er = premier (ordinal)',
      ko: '1er = premier (서수)',
      ja: '1er = premier（序数）',
      zh: '1er = premier（序数）',
      fr: '1er = premier',
      es: '1er = premier',
      de: '1er = premier',
      ru: '1er = premier',
    }),
  },
  {
    form: 'le 2 janvier',
    meaning: loc({
      en: 'January 2nd (cardinal: deux)',
      ko: '1월 2일 (기수: deux)',
      ja: '1月2日（基数 deux）',
      zh: '1月2日（基数 deux）',
      fr: 'le 2 janvier (cardinal : deux)',
      es: '2 de enero (cardinal: deux)',
      de: '2. Januar (Kardinal: deux)',
      ru: '2 января (количественное: deux)',
    }),
    sound: loc({
      en: '2+ = cardinal (Numbers quiz)',
      ko: '2일~ = 기수사 퀴즈',
      ja: '2日〜＝基数クイズ',
      zh: '2日起＝基数测验',
      fr: 'à partir de 2 = cardinal',
      es: 'desde el 2 = cardinal',
      de: 'ab 2 = Kardinal',
      ru: 'со 2-го = количественное',
    }),
  },
  {
    form: 'le 5 mars',
    meaning: loc({
      en: 'March 5th (cardinal: cinq)',
      ko: '3월 5일 (기수: cinq)',
      ja: '3月5日（基数 cinq）',
      zh: '3月5日（基数 cinq）',
      fr: 'le 5 mars (cardinal : cinq)',
      es: '5 de marzo (cardinal: cinq)',
      de: '5. März (Kardinal: cinq)',
      ru: '5 марта (количественное: cinq)',
    }),
    sound: loc({
      en: 'le + number + month',
      ko: 'le + 숫자 + 월',
      ja: 'le ＋ 数字 ＋ 月',
      zh: 'le + 数字 + 月',
      fr: 'le + nombre + mois',
      es: 'le + número + mes',
      de: 'le + Zahl + Monat',
      ru: 'le + число + месяц',
    }),
  },
  {
    form: 'le 21 juillet',
    meaning: loc({
      en: 'July 21st (cardinal compound: vingt et un)',
      ko: '7월 21일 (기수 합성: vingt et un)',
      ja: '7月21日（基数合成 vingt et un）',
      zh: '7月21日（基数组合 vingt et un）',
      fr: 'le 21 juillet (vingt et un)',
      es: '21 de julio (vingt et un)',
      de: '21. Juli (vingt et un)',
      ru: '21 июля (vingt et un)',
    }),
    sound: loc({
      en: 'same compounds as Numbers',
      ko: '기수사와 같은 합성',
      ja: '基数と同じ合成',
      zh: '与基数相同的合成',
      fr: 'mêmes composés que les nombres',
      es: 'mismos compuestos que los números',
      de: 'gleiche Verbindungen wie Zahlen',
      ru: 'те же составные, что у чисел',
    }),
  },
  {
    form: 'le 31 décembre',
    meaning: loc({
      en: 'December 31st (cardinal: trente et un)',
      ko: '12월 31일 (기수: trente et un)',
      ja: '12月31日（基数 trente et un）',
      zh: '12月31日（基数 trente et un）',
      fr: 'le 31 décembre (trente et un)',
      es: '31 de diciembre (trente et un)',
      de: '31. Dezember (trente et un)',
      ru: '31 декабря (trente et un)',
    }),
    sound: loc({
      en: 'still a cardinal, not an ordinal',
      ko: '서수가 아니라 기수',
      ja: '序数ではなく基数',
      zh: '仍是基数，不是序数',
      fr: 'cardinal, pas ordinal',
      es: 'cardinal, no ordinal',
      de: 'Kardinal, kein Ordinal',
      ru: 'количественное, не порядковое',
    }),
  },
]

const monthsTable = {
  table_id: 'fr_months_ref',
  title: loc({
    en: 'Months & seasons',
    ko: '월과 계절',
    ja: '月と季節',
    zh: '月份与季节',
    fr: 'Mois & saisons',
    es: 'Meses y estaciones',
    de: 'Monate & Jahreszeiten',
    ru: 'Месяцы и сезоны',
  }),
  note: loc({
    en: 'Months are lowercase. Day-of-month writing is below — mostly cardinals from Numbers.',
    ko: '월 이름은 소문자. 일자 쓰기는 아래 — 대부분 기수사(기수 퀴즈)입니다.',
    ja: '月名は小文字。日付の書き方は下 — 多くは基数クイズの基数。',
    zh: '月份小写。日期写法见下 — 多为基数测验中的基数。',
    fr: 'Mois en minuscules. Écriture des dates ci-dessous — surtout des cardinaux.',
    es: 'Meses en minúscula. Escritura de fechas abajo — sobre todo cardinales.',
    de: 'Monate klein. Datumsform unten — meist Kardinalzahlen.',
    ru: 'Месяцы с маленькой буквы. Запись дат ниже — в основном количественные.',
  }),
  rules: {
    en: [
      'Pattern: le + day + month (le 5 janvier).',
      'Only the 1st uses an ordinal: le 1er / le premier. From the 2nd onward, use cardinals (Numbers quiz).',
      'No separate Dates quiz — learn months here and days in Numbers.',
    ],
    ko: [
      '패턴: le + 일자 + 월 (le 5 janvier).',
      '1일만 서수: le 1er / le premier. 2일부터는 기수사(기수 퀴즈).',
      '날짜 전용 퀴즈 없음 — 월은 여기, 일자는 기수사에서.',
    ],
    ja: [
      '型: le ＋ 日 ＋ 月（le 5 janvier）。',
      '1日だけ序数: le 1er / le premier。2日以降は基数（基数クイズ）。',
      '日付専用クイズなし — 月はここ、日は基数で。',
    ],
    zh: [
      '格式: le + 日 + 月（le 5 janvier）。',
      '仅1日用序数: le 1er / le premier。从2日起用基数（基数测验）。',
      '无单独日期测验 — 月份在此，日子在基数。',
    ],
    fr: [
      'Schéma : le + jour + mois (le 5 janvier).',
      'Seul le 1er est ordinal ; à partir du 2, cardinaux (quiz Nombres).',
      'Pas de quiz Dates séparé.',
    ],
    es: [
      'Patrón: le + día + mes (le 5 janvier).',
      'Solo el 1 usa ordinal; desde el 2, cardinales (quiz Números).',
      'Sin quiz Dates aparte.',
    ],
    de: [
      'Muster: le + Tag + Monat (le 5 janvier).',
      'Nur der 1. ist Ordinal; ab 2 Kardinal (Zahlen-Quiz).',
      'Kein separates Dates-Quiz.',
    ],
    ru: [
      'Схема: le + день + месяц (le 5 janvier).',
      'Только 1-е — порядковое; со 2-го — количественные (квиз Числа).',
      'Отдельного квиза Dates нет.',
    ],
    it: [
      'Schema: le + giorno + mese (le 5 janvier).',
      'Solo l’1 è ordinale; dal 2 in poi, cardinali (quiz Numeri).',
      'Niente quiz Dates separato.',
    ],
  },
  sections: [
    {
      title: loc({
        en: 'Months & seasons',
        ko: '월과 계절',
        ja: '月と季節',
        zh: '月份与季节',
        fr: 'Mois & saisons',
        es: 'Meses y estaciones',
        de: 'Monate & Jahreszeiten',
        ru: 'Месяцы и сезоны',
      }),
      columns: formCols(),
      rows: MONTHS.map((p) => p.row),
    },
    {
      title: loc({
        en: 'Writing dates',
        ko: '날짜 쓰기',
        ja: '日付の書き方',
        zh: '日期写法',
        fr: 'Écrire une date',
        es: 'Escribir fechas',
        de: 'Daten schreiben',
        ru: 'Запись дат',
      }),
      note: loc({
        en: 'Reference only (not a quiz deck). Day numbers reuse Cardinal Numbers — except the 1st.',
        ko: '참고용(퀴즈 카드 아님). 일자는 기수사 재사용 — 1일만 예외.',
        ja: '参考のみ（クイズ外）。日は基数を再利用 — 1日だけ例外。',
        zh: '仅供参考（不在测验中）。日子复用基数 — 仅1日例外。',
        fr: 'Référence seule (hors quiz). Le jour = cardinal, sauf le 1er.',
        es: 'Solo referencia (fuera del quiz). El día = cardinal, excepto el 1.',
        de: 'Nur Nachschlagewerk. Tag = Kardinal, außer dem 1.',
        ru: 'Только справка. День = количественное, кроме 1-го.',
      }),
      columns: formCols(),
      rows: DATE_WRITING,
    },
  ],
}

mkdirSync(OUT_DIR, { recursive: true })

const files = [
  ['time.json', TIME.map((p) => p.quiz)],
  ['time.table.json', timeTable],
  ['weekdays.json', WEEKDAYS.map((p) => p.quiz)],
  ['weekdays.table.json', weekTable],
  ['months.json', MONTHS.map((p) => p.quiz)],
  ['months.table.json', monthsTable],
]

for (const [name, data] of files) {
  writeFileSync(join(OUT_DIR, name), `${JSON.stringify(data, null, 2)}\n`)
}

console.log(
  `fr time ok — time(${TIME.length}) weekdays(${WEEKDAYS.length}) months(${MONTHS.length})`,
)
