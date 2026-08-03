/**
 * Spanish time & calendar: time / weekdays / months (merged under /es/time).
 * No separate dates category — day ≈ cardinal + de + month.
 * Run: node scripts/gen-es-time-calendar.mjs
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
}

function simpleTable(tableId, title, note, rows, rules) {
  return {
    table_id: tableId,
    title: loc(title),
    ...(note ? { note: loc(note) } : {}),
    ...(rules ? { rules } : {}),
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

const TIME = [
  pack('es_time', 'dawn', 'amanecer', 'a-ma-ne-ser', '아마네세르', 'アマネセル', {
    en: 'dawn / daybreak',
    ko: '새벽 / 동틀 녘',
    ja: '明け方',
    zh: '黎明',
    fr: 'aube',
    es: 'amanecer',
    de: 'Morgendämmerung',
    ru: 'рассвет',
  }),
  pack('es_time', 'morning', 'mañana', 'ma-nya-na', '마냐나', 'マニャーナ', {
    en: 'morning (also “tomorrow”)',
    ko: '아침 (「내일」 뜻도)',
    ja: '朝（「明日」の意味も）',
    zh: '早上（也有“明天”）',
    fr: 'matin (aussi « demain »)',
    es: 'mañana',
    de: 'Morgen (auch „morgen“)',
    ru: 'утро (также «завтра»)',
  }),
  pack('es_time', 'am', 'por la mañana', 'por la ma-nya-na', '포르 라 마냐나', 'ポル・ラ・マニャーナ', {
    en: 'a.m. / in the morning',
    ko: '오전 / 아침에',
    ja: '午前 / 朝に',
    zh: '上午',
    fr: 'le matin',
    es: 'por la mañana',
    de: 'morgens',
    ru: 'утром',
  }),
  pack('es_time', 'noon', 'mediodía', 'me-dyo-dee-a', '메디오디아', 'メディオディーア', {
    en: 'noon / midday',
    ko: '정오 / 낮',
    ja: '正午 / 昼',
    zh: '中午',
    fr: 'midi',
    es: 'mediodía',
    de: 'Mittag',
    ru: 'полдень',
  }),
  pack('es_time', 'pm', 'tarde', 'tar-de', '타르데', 'タルデ', {
    en: 'afternoon / evening (early)',
    ko: '오후 / 저녁(이른)',
    ja: '午後 / 夕方',
    zh: '下午 / 傍晚',
    fr: 'après-midi / début de soirée',
    es: 'tarde',
    de: 'Nachmittag / früher Abend',
    ru: 'после полудня / вечер',
  }),
  pack('es_time', 'evening', 'noche', 'no-che', '노체', 'ノチェ', {
    en: 'night / evening',
    ko: '밤 / 저녁',
    ja: '夜 / 晩',
    zh: '晚上 / 夜晚',
    fr: 'soir / nuit',
    es: 'noche',
    de: 'Abend / Nacht',
    ru: 'вечер / ночь',
  }),
  pack('es_time', 'night', 'por la noche', 'por la no-che', '포르 라 노체', 'ポル・ラ・ノチェ', {
    en: 'at night / in the evening',
    ko: '밤에',
    ja: '夜に',
    zh: '在晚上',
    fr: 'le soir / la nuit',
    es: 'por la noche',
    de: 'nachts / abends',
    ru: 'вечером / ночью',
  }),
  pack('es_time', 'now', 'ahora', 'a-o-ra', '아오라', 'アオラ', {
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

const WEEKDAYS = [
  pack('es_weekdays', 'day_before_yesterday', 'anteayer', 'an-te-a-yer', '안테아예르', 'アンテアージェル', {
    en: 'the day before yesterday',
    ko: '그저께',
    ja: '一昨日',
    zh: '前天',
    fr: 'avant-hier',
    es: 'anteayer',
    de: 'vorgestern',
    ru: 'позавчера',
  }),
  pack('es_weekdays', 'yesterday', 'ayer', 'a-yer', '아예르', 'アージェル', {
    en: 'yesterday',
    ko: '어제',
    ja: '昨日',
    zh: '昨天',
    fr: 'hier',
    es: 'ayer',
    de: 'gestern',
    ru: 'вчера',
  }),
  pack('es_weekdays', 'today', 'hoy', 'oy/hoy', '오이', 'オイ', {
    en: 'today',
    ko: '오늘',
    ja: '今日',
    zh: '今天',
    fr: 'aujourd’hui',
    es: 'hoy',
    de: 'heute',
    ru: 'сегодня',
  }),
  pack('es_weekdays', 'tomorrow', 'mañana', 'ma-nya-na', '마냐나', 'マニャーナ', {
    en: 'tomorrow (also “morning”)',
    ko: '내일 (「아침」 뜻도)',
    ja: '明日（「朝」の意味も）',
    zh: '明天（也有“早上”）',
    fr: 'demain (aussi « matin »)',
    es: 'mañana',
    de: 'morgen (auch „Morgen“)',
    ru: 'завтра (также «утро»)',
  }),
  pack('es_weekdays', 'day_after_tomorrow', 'pasado mañana', 'pa-sa-do ma-nya-na', '파사도 마냐나', 'パサド・マニャーナ', {
    en: 'the day after tomorrow',
    ko: '모레',
    ja: '明後日',
    zh: '后天',
    fr: 'après-demain',
    es: 'pasado mañana',
    de: 'übermorgen',
    ru: 'послезавтра',
  }),
  pack('es_weekdays', 'mon', 'lunes', 'loo-nes', '루네스', 'ルネス', {
    en: 'Monday',
    ko: '월요일',
    ja: '月曜日',
    zh: '星期一',
    fr: 'lundi',
    es: 'lunes',
    de: 'Montag',
    ru: 'понедельник',
  }),
  pack('es_weekdays', 'tue', 'martes', 'mar-tes', '마르테스', 'マルテス', {
    en: 'Tuesday',
    ko: '화요일',
    ja: '火曜日',
    zh: '星期二',
    fr: 'mardi',
    es: 'martes',
    de: 'Dienstag',
    ru: 'вторник',
  }),
  pack('es_weekdays', 'wed', 'miércoles', 'myer-ko-les', '미에르콜레스', 'ミエルコレス', {
    en: 'Wednesday',
    ko: '수요일',
    ja: '水曜日',
    zh: '星期三',
    fr: 'mercredi',
    es: 'miércoles',
    de: 'Mittwoch',
    ru: 'среда',
  }),
  pack('es_weekdays', 'thu', 'jueves', 'hwe-ves', '후에베스', 'フエベス', {
    en: 'Thursday',
    ko: '목요일',
    ja: '木曜日',
    zh: '星期四',
    fr: 'jeudi',
    es: 'jueves',
    de: 'Donnerstag',
    ru: 'четверг',
  }),
  pack('es_weekdays', 'fri', 'viernes', 'vyer-nes', '비에르네스', 'ビエルネス', {
    en: 'Friday',
    ko: '금요일',
    ja: '金曜日',
    zh: '星期五',
    fr: 'vendredi',
    es: 'viernes',
    de: 'Freitag',
    ru: 'пятница',
  }),
  pack('es_weekdays', 'sat', 'sábado', 'sa-ba-do', '사바도', 'サバド', {
    en: 'Saturday',
    ko: '토요일',
    ja: '土曜日',
    zh: '星期六',
    fr: 'samedi',
    es: 'sábado',
    de: 'Samstag',
    ru: 'суббота',
  }),
  pack('es_weekdays', 'sun', 'domingo', 'do-meen-go', '도밍고', 'ドミンゴ', {
    en: 'Sunday',
    ko: '일요일',
    ja: '日曜日',
    zh: '星期日',
    fr: 'dimanche',
    es: 'domingo',
    de: 'Sonntag',
    ru: 'воскресенье',
  }),
  pack('es_weekdays', 'this_week', 'esta semana', 'es-ta se-ma-na', '에스타 세마나', 'エスタ・セマナ', {
    en: 'this week',
    ko: '이번 주',
    ja: '今週',
    zh: '本周',
    fr: 'cette semaine',
    es: 'esta semana',
    de: 'diese Woche',
    ru: 'эта неделя',
  }),
  pack('es_weekdays', 'last_week', 'la semana pasada', 'la se-ma-na pa-sa-da', '라 세마나 파사다', 'ラ・セマナ・パサダ', {
    en: 'last week',
    ko: '지난주',
    ja: '先週',
    zh: '上周',
    fr: 'la semaine dernière',
    es: 'la semana pasada',
    de: 'letzte Woche',
    ru: 'прошлая неделя',
  }),
  pack('es_weekdays', 'next_week', 'la semana que viene', 'la se-ma-na ke bye-ne', '라 세마나 케 비에네', 'ラ・セマナ・ケ・ビエネ', {
    en: 'next week',
    ko: '다음 주',
    ja: '来週',
    zh: '下周',
    fr: 'la semaine prochaine',
    es: 'la semana que viene / próxima',
    de: 'nächste Woche',
    ru: 'следующая неделя',
  }),
]

const MONTHS = [
  pack('es_months', 'jan', 'enero', 'e-ne-ro', '에네로', 'エネロ', {
    en: 'January', ko: '1월', ja: '一月', zh: '一月', fr: 'janvier', es: 'enero', de: 'Januar', ru: 'январь',
  }),
  pack('es_months', 'feb', 'febrero', 'fe-bre-ro', '페브레로', 'フェブレロ', {
    en: 'February', ko: '2월', ja: '二月', zh: '二月', fr: 'février', es: 'febrero', de: 'Februar', ru: 'февраль',
  }),
  pack('es_months', 'mar', 'marzo', 'mar-so', '마르소', 'マルソ', {
    en: 'March', ko: '3월', ja: '三月', zh: '三月', fr: 'mars', es: 'marzo', de: 'März', ru: 'март',
  }),
  pack('es_months', 'apr', 'abril', 'a-breel', '아브릴', 'アブリル', {
    en: 'April', ko: '4월', ja: '四月', zh: '四月', fr: 'avril', es: 'abril', de: 'April', ru: 'апрель',
  }),
  pack('es_months', 'may', 'mayo', 'ma-yo', '마요', 'マジョ', {
    en: 'May', ko: '5월', ja: '五月', zh: '五月', fr: 'mai', es: 'mayo', de: 'Mai', ru: 'май',
  }),
  pack('es_months', 'jun', 'junio', 'hoo-nyo', '후니오', 'フニオ', {
    en: 'June', ko: '6월', ja: '六月', zh: '六月', fr: 'juin', es: 'junio', de: 'Juni', ru: 'июнь',
  }),
  pack('es_months', 'jul', 'julio', 'hoo-lyo', '훌리오', 'フリオ', {
    en: 'July', ko: '7월', ja: '七月', zh: '七月', fr: 'juillet', es: 'julio', de: 'Juli', ru: 'июль',
  }),
  pack('es_months', 'aug', 'agosto', 'a-gos-to', '아고스토', 'アゴスト', {
    en: 'August', ko: '8월', ja: '八月', zh: '八月', fr: 'août', es: 'agosto', de: 'August', ru: 'август',
  }),
  pack('es_months', 'sep', 'septiembre', 'sep-tyem-bre', '셉티엠브레', 'セプティエンブレ', {
    en: 'September', ko: '9월', ja: '九月', zh: '九月', fr: 'septembre', es: 'septiembre', de: 'September', ru: 'сентябрь',
  }),
  pack('es_months', 'oct', 'octubre', 'ok-too-bre', '옥투브레', 'オクトゥブレ', {
    en: 'October', ko: '10월', ja: '十月', zh: '十月', fr: 'octobre', es: 'octubre', de: 'Oktober', ru: 'октябрь',
  }),
  pack('es_months', 'nov', 'noviembre', 'no-vyem-bre', '노비엠브레', 'ノビエンブレ', {
    en: 'November', ko: '11월', ja: '十一月', zh: '十一月', fr: 'novembre', es: 'noviembre', de: 'November', ru: 'ноябрь',
  }),
  pack('es_months', 'dec', 'diciembre', 'dee-syem-bre', '디시엠브레', 'ディシエンブレ', {
    en: 'December', ko: '12월', ja: '十二月', zh: '十二月', fr: 'décembre', es: 'diciembre', de: 'Dezember', ru: 'декабрь',
  }),
  pack('es_months', 'spring', 'primavera', 'pree-ma-ve-ra', '프리마베라', 'プリマベラ', {
    en: 'spring', ko: '봄', ja: '春', zh: '春天', fr: 'printemps', es: 'primavera', de: 'Frühling', ru: 'весна',
  }),
  pack('es_months', 'summer', 'verano', 've-ra-no', '베라노', 'ベラノ', {
    en: 'summer', ko: '여름', ja: '夏', zh: '夏天', fr: 'été', es: 'verano', de: 'Sommer', ru: 'лето',
  }),
  pack('es_months', 'autumn', 'otoño', 'o-to-nyo', '오토뇨', 'オトニョ', {
    en: 'autumn / fall', ko: '가을', ja: '秋', zh: '秋天', fr: 'automne', es: 'otoño', de: 'Herbst', ru: 'осень',
  }),
  pack('es_months', 'winter', 'invierno', 'een-vyer-no', '인비에르노', 'インビエルノ', {
    en: 'winter', ko: '겨울', ja: '冬', zh: '冬天', fr: 'hiver', es: 'invierno', de: 'Winter', ru: 'зима',
  }),
]

const DATE_WRITING = [
  {
    form: 'el 1.º de enero / el primero de enero',
    meaning: loc({
      en: 'January 1st (only day that uses an ordinal)',
      ko: '1월 1일 (유일하게 서수)',
      ja: '1月1日（序数を使う唯一の日）',
      zh: '1月1日（唯一用序数）',
      fr: 'le 1er janvier (seul jour en ordinal)',
      es: 'el 1.º de enero (único día con ordinal)',
      de: '1. Januar (einziger Ordinal-Tag)',
      ru: '1 января (единственный день с порядковым)',
    }),
    sound: loc({
      en: 'primero = 1st (ordinal)',
      ko: 'primero = 1일 (서수)',
      ja: 'primero＝1日（序数）',
      zh: 'primero＝1日（序数）',
      fr: 'primero = 1er',
      es: 'primero = 1.º',
      de: 'primero = 1.',
      ru: 'primero = 1-е',
    }),
  },
  {
    form: 'el 2 de enero',
    meaning: loc({
      en: 'January 2nd (cardinal: dos)',
      ko: '1월 2일 (기수: dos)',
      ja: '1月2日（基数 dos）',
      zh: '1月2日（基数 dos）',
      fr: 'le 2 janvier (cardinal : dos)',
      es: 'el 2 de enero (cardinal: dos)',
      de: '2. Januar (Kardinal: dos)',
      ru: '2 января (количественное: dos)',
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
    form: 'el 5 de marzo',
    meaning: loc({
      en: 'March 5th (cardinal: cinco)',
      ko: '3월 5일 (기수: cinco)',
      ja: '3月5日（基数 cinco）',
      zh: '3月5日（基数 cinco）',
      fr: 'le 5 mars (cardinal : cinco)',
      es: 'el 5 de marzo (cardinal: cinco)',
      de: '5. März (Kardinal: cinco)',
      ru: '5 марта (количественное: cinco)',
    }),
    sound: loc({
      en: 'el + number + de + month',
      ko: 'el + 숫자 + de + 월',
      ja: 'el ＋ 数字 ＋ de ＋ 月',
      zh: 'el + 数字 + de + 月',
      fr: 'el + nombre + de + mois',
      es: 'el + número + de + mes',
      de: 'el + Zahl + de + Monat',
      ru: 'el + число + de + месяц',
    }),
  },
  {
    form: 'el 21 de julio',
    meaning: loc({
      en: 'July 21st (cardinal: veintiuno)',
      ko: '7월 21일 (기수: veintiuno)',
      ja: '7月21日（基数 veintiuno）',
      zh: '7月21日（基数 veintiuno）',
      fr: 'le 21 juillet (veintiuno)',
      es: 'el 21 de julio (veintiuno)',
      de: '21. Juli (veintiuno)',
      ru: '21 июля (veintiuno)',
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
    form: 'el 31 de diciembre',
    meaning: loc({
      en: 'December 31st (cardinal: treinta y uno)',
      ko: '12월 31일 (기수: treinta y uno)',
      ja: '12月31日（基数 treinta y uno）',
      zh: '12月31日（基数 treinta y uno）',
      fr: 'le 31 décembre (trente et un → treinta y uno)',
      es: 'el 31 de diciembre (treinta y uno)',
      de: '31. Dezember (treinta y uno)',
      ru: '31 декабря (treinta y uno)',
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

const timeTable = simpleTable(
  'es_time_ref',
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
    en: 'Watch mañana: “morning” and “tomorrow”. Use por la mañana / por la tarde / por la noche.',
    ko: 'mañana는 「아침」과 「내일」. por la mañana / tarde / noche를 씁니다.',
    ja: 'mañana は「朝」と「明日」。por la mañana／tarde／noche。',
    zh: 'mañana 既是“早上”也是“明天”。用 por la mañana／tarde／noche。',
    fr: 'mañana = matin et demain. por la mañana / tarde / noche.',
    es: 'mañana = morning y tomorrow. por la mañana / tarde / noche.',
    de: 'mañana = Morgen und morgen. por la mañana / tarde / noche.',
    ru: 'mañana = утро и завтра. por la mañana / tarde / noche.',
  },
  TIME.map((p) => p.row),
  {
    en: [
      'mediodía = noon; tarde covers afternoon into early evening.',
      'Clock talk often uses de la mañana / de la tarde / de la noche.',
    ],
    ko: [
      'mediodía = 정오; tarde는 오후~이른 저녁.',
      '시계 표현에 de la mañana / de la tarde / de la noche.',
    ],
    ja: [
      'mediodía＝正午。tarde は午後〜早い晩。',
      '時刻では de la mañana／tarde／noche。',
    ],
    zh: [
      'mediodía＝中午；tarde 含下午到傍晚。',
      '报时常用 de la mañana／tarde／noche。',
    ],
    fr: [
      'mediodía = midi ; tarde = après-midi / début de soirée.',
      'À l’heure : de la mañana / tarde / noche.',
    ],
    es: [
      'mediodía = noon; tarde = afternoon / early evening.',
      'En la hora: de la mañana / tarde / noche.',
    ],
    de: [
      'mediodía = Mittag; tarde = Nachmittag / früher Abend.',
      'Bei der Uhrzeit: de la mañana / tarde / noche.',
    ],
    ru: [
      'mediodía = полдень; tarde = после полудня / ранний вечер.',
      'Во времени: de la mañana / tarde / noche.',
    ],
    it: [
      'mediodía = mezzogiorno; tarde = pomeriggio / inizio sera.',
      'Nell’ora: de la mañana / tarde / noche.',
    ],
  },
)

const weekTable = simpleTable(
  'es_weekdays_ref',
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
    en: 'Weekdays are lowercase. Many calendars start the week on lunes.',
    ko: '요일은 소문자. 달력은 종종 lunes부터 시작합니다.',
    ja: '曜日は小文字。多くの暦は lunes 始まり。',
    zh: '星期小写。多数日历从 lunes 开始。',
    fr: 'Jours en minuscules. Souvent semaine à partir de lunes.',
    es: 'Días en minúscula. A menudo la semana empieza en lunes.',
    de: 'Wochentage klein. Oft Wochenbeginn lunes.',
    ru: 'Дни с маленькой буквы. Часто неделя с lunes.',
  },
  WEEKDAYS.map((p) => p.row),
)

const monthsTable = {
  table_id: 'es_months_ref',
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
    ko: '월 이름은 소문자. 일자 쓰기는 아래 — 대부분 기수사입니다.',
    ja: '月名は小文字。日付の書き方は下 — 多くは基数。',
    zh: '月份小写。日期写法见下 — 多为基数。',
    fr: 'Mois en minuscules. Dates ci-dessous — surtout des cardinaux.',
    es: 'Meses en minúscula. Fechas abajo — sobre todo cardinales.',
    de: 'Monate klein. Datumsform unten — meist Kardinalzahlen.',
    ru: 'Месяцы с маленькой буквы. Даты ниже — в основном количественные.',
  }),
  rules: {
    en: [
      'Pattern: el + day + de + month (el 5 de enero).',
      'Only the 1st uses an ordinal: el 1.º / el primero. From the 2nd onward, use cardinals (Numbers quiz).',
      'No separate Dates quiz — learn months here and days in Numbers.',
    ],
    ko: [
      '패턴: el + 일자 + de + 월 (el 5 de enero).',
      '1일만 서수: el 1.º / el primero. 2일부터는 기수사.',
      '날짜 전용 퀴즈 없음 — 월은 여기, 일자는 기수사에서.',
    ],
    ja: [
      '型: el ＋ 日 ＋ de ＋ 月（el 5 de enero）。',
      '1日だけ序数: el 1.º / el primero。2日以降は基数。',
      '日付専用クイズなし。',
    ],
    zh: [
      '格式: el + 日 + de + 月（el 5 de enero）。',
      '仅1日用序数；从2日起用基数。',
      '无单独日期测验。',
    ],
    fr: [
      'Schéma : el + jour + de + mois.',
      'Seul le 1er est ordinal ; dès le 2, cardinaux.',
      'Pas de quiz Dates séparé.',
    ],
    es: [
      'Patrón: el + día + de + mes.',
      'Solo el 1 usa ordinal; desde el 2, cardinales.',
      'Sin quiz Dates aparte.',
    ],
    de: [
      'Muster: el + Tag + de + Monat.',
      'Nur der 1. ist Ordinal; ab 2 Kardinal.',
      'Kein separates Dates-Quiz.',
    ],
    ru: [
      'Схема: el + день + de + месяц.',
      'Только 1-е — порядковое; со 2-го — количественные.',
      'Отдельного квиза Dates нет.',
    ],
    it: [
      'Schema: el + giorno + de + mese.',
      'Solo l’1 è ordinale; dal 2, cardinali.',
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
        zh: '仅供参考。日子复用基数 — 仅1日例外。',
        fr: 'Référence seule. Le jour = cardinal, sauf le 1er.',
        es: 'Solo referencia. El día = cardinal, excepto el 1.',
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
  `es time ok — time(${TIME.length}) weekdays(${WEEKDAYS.length}) months(${MONTHS.length})`,
)
