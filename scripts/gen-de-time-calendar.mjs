/**
 * German time & calendar: time / weekdays / months (merged under /de/time).
 * Day-of-month ordinals live in the separate Dates category (unlike FR/ES/IT).
 * Run: node scripts/gen-de-time-calendar.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/de')

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
    de: form,
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
        en: 'German',
        ko: '독일어',
        ja: 'ドイツ語',
        zh: '德语',
        fr: 'Allemand',
        es: 'Alemán',
        de: 'Deutsch',
        ru: 'Немецкий',
        it: 'Tedesco',
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
  pack('de_time', 'dawn', 'Morgendämmerung', 'mor-gen-dem-me-roong', '모르겐데머룽', 'モルゲンデメルング', {
    en: 'dawn / daybreak',
    ko: '새벽 / 동틀 녘',
    ja: '明け方',
    zh: '黎明',
    fr: 'aube',
    es: 'amanecer',
    de: 'Morgendämmerung',
    ru: 'рассвет',
    it: 'alba',
  }),
  pack('de_time', 'morning', 'Morgen', 'mor-gen', '모르겐', 'モルゲン', {
    en: 'morning (also “tomorrow”)',
    ko: '아침 (「내일」 뜻도)',
    ja: '朝（「明日」の意味も）',
    zh: '早上（也有“明天”）',
    fr: 'matin (aussi « demain »)',
    es: 'mañana',
    de: 'Morgen',
    ru: 'утро (также «завтра»)',
    it: 'mattina',
  }),
  pack('de_time', 'am', 'morgens', 'mor-gens', '모르겐스', 'モルゲンス', {
    en: 'a.m. / in the morning',
    ko: '오전 / 아침에',
    ja: '午前 / 朝に',
    zh: '上午',
    fr: 'le matin',
    es: 'por la mañana',
    de: 'morgens',
    ru: 'утром',
    it: 'di mattina',
  }),
  pack('de_time', 'noon', 'Mittag', 'mit-tahk', '미탁', 'ミッターク', {
    en: 'noon / midday',
    ko: '정오 / 낮',
    ja: '正午 / 昼',
    zh: '中午',
    fr: 'midi',
    es: 'mediodía',
    de: 'Mittag',
    ru: 'полдень',
    it: 'mezzogiorno',
  }),
  pack('de_time', 'afternoon', 'Nachmittag', 'nahkh-mit-tahk', '나흐미탁', 'ナーハミッターク', {
    en: 'afternoon',
    ko: '오후',
    ja: '午後',
    zh: '下午',
    fr: 'après-midi',
    es: 'tarde',
    de: 'Nachmittag',
    ru: 'после полудня',
    it: 'pomeriggio',
  }),
  pack('de_time', 'evening', 'Abend', 'ah-bent', '아벤트', 'アーベント', {
    en: 'evening',
    ko: '저녁',
    ja: '夕方 / 晩',
    zh: '傍晚 / 晚上',
    fr: 'soir',
    es: 'tarde / noche',
    de: 'Abend',
    ru: 'вечер',
    it: 'sera',
  }),
  pack('de_time', 'night', 'Nacht', 'nakht', '나흐트', 'ナハト', {
    en: 'night',
    ko: '밤',
    ja: '夜',
    zh: '夜晚',
    fr: 'nuit',
    es: 'noche',
    de: 'Nacht',
    ru: 'ночь',
    it: 'notte',
  }),
  pack('de_time', 'at_night', 'nachts', 'nakhts', '나흐츠', 'ナハツ', {
    en: 'at night',
    ko: '밤에',
    ja: '夜に',
    zh: '在夜里',
    fr: 'la nuit',
    es: 'por la noche',
    de: 'nachts',
    ru: 'ночью',
    it: 'di notte',
  }),
  pack('de_time', 'now', 'jetzt', 'yetst', '예츠트', 'イェッツト', {
    en: 'now',
    ko: '지금',
    ja: '今',
    zh: '现在',
    fr: 'maintenant',
    es: 'ahora',
    de: 'jetzt',
    ru: 'сейчас',
    it: 'adesso',
  }),
]

const WEEKDAYS = [
  pack('de_weekdays', 'day_before_yesterday', 'vorgestern', 'for-ges-tern', '포르게슈테른', 'フォールゲステルン', {
    en: 'the day before yesterday',
    ko: '그저께',
    ja: '一昨日',
    zh: '前天',
    fr: 'avant-hier',
    es: 'anteayer',
    de: 'vorgestern',
    ru: 'позавчера',
    it: "l'altro ieri",
  }),
  pack('de_weekdays', 'yesterday', 'gestern', 'ges-tern', '게슈테른', 'ゲステルン', {
    en: 'yesterday',
    ko: '어제',
    ja: '昨日',
    zh: '昨天',
    fr: 'hier',
    es: 'ayer',
    de: 'gestern',
    ru: 'вчера',
    it: 'ieri',
  }),
  pack('de_weekdays', 'today', 'heute', 'hoy-te', '호이테', 'ホイテ', {
    en: 'today',
    ko: '오늘',
    ja: '今日',
    zh: '今天',
    fr: 'aujourd’hui',
    es: 'hoy',
    de: 'heute',
    ru: 'сегодня',
    it: 'oggi',
  }),
  pack('de_weekdays', 'tomorrow', 'morgen', 'mor-gen', '모르겐', 'モルゲン', {
    en: 'tomorrow (also “morning”)',
    ko: '내일 (「아침」 뜻도)',
    ja: '明日（「朝」の意味も）',
    zh: '明天（也有“早上”）',
    fr: 'demain (aussi « matin »)',
    es: 'mañana',
    de: 'morgen',
    ru: 'завтра',
    it: 'domani',
  }),
  pack('de_weekdays', 'day_after_tomorrow', 'übermorgen', 'ue-ber-mor-gen', '위버모르겐', 'ユーバーモルゲン', {
    en: 'the day after tomorrow',
    ko: '모레',
    ja: '明後日',
    zh: '后天',
    fr: 'après-demain',
    es: 'pasado mañana',
    de: 'übermorgen',
    ru: 'послезавтра',
    it: 'dopodomani',
  }),
  pack('de_weekdays', 'mon', 'Montag', 'mon-tahk', '몬탁', 'モンターク', {
    en: 'Monday', ko: '월요일', ja: '月曜日', zh: '星期一', fr: 'lundi', es: 'lunes', de: 'Montag', ru: 'понедельник', it: 'lunedì',
  }),
  pack('de_weekdays', 'tue', 'Dienstag', 'deens-tahk', '딘스타크', 'ディーンスターク', {
    en: 'Tuesday', ko: '화요일', ja: '火曜日', zh: '星期二', fr: 'mardi', es: 'martes', de: 'Dienstag', ru: 'вторник', it: 'martedì',
  }),
  pack('de_weekdays', 'wed', 'Mittwoch', 'mit-vokh', '미트보흐', 'ミットヴォッホ', {
    en: 'Wednesday', ko: '수요일', ja: '水曜日', zh: '星期三', fr: 'mercredi', es: 'miércoles', de: 'Mittwoch', ru: 'среда', it: 'mercoledì',
  }),
  pack('de_weekdays', 'thu', 'Donnerstag', 'don-ners-tahk', '도너스탁', 'ドンネルスターク', {
    en: 'Thursday', ko: '목요일', ja: '木曜日', zh: '星期四', fr: 'jeudi', es: 'jueves', de: 'Donnerstag', ru: 'четверг', it: 'giovedì',
  }),
  pack('de_weekdays', 'fri', 'Freitag', 'fry-tahk', '프라이탁', 'フライターク', {
    en: 'Friday', ko: '금요일', ja: '金曜日', zh: '星期五', fr: 'vendredi', es: 'viernes', de: 'Freitag', ru: 'пятница', it: 'venerdì',
  }),
  pack('de_weekdays', 'sat', 'Samstag', 'zamss-tahk', '잠스타크', 'ザムスターク', {
    en: 'Saturday', ko: '토요일', ja: '土曜日', zh: '星期六', fr: 'samedi', es: 'sábado', de: 'Samstag', ru: 'суббота', it: 'sabato',
  }),
  pack('de_weekdays', 'sun', 'Sonntag', 'zon-tahk', '존탁', 'ゾンターク', {
    en: 'Sunday', ko: '일요일', ja: '日曜日', zh: '星期日', fr: 'dimanche', es: 'domingo', de: 'Sonntag', ru: 'воскресенье', it: 'domenica',
  }),
  pack('de_weekdays', 'this_week', 'diese Woche', 'dee-ze vo-khe', '디제 보헤', 'ディーゼ・ヴォッヘ', {
    en: 'this week', ko: '이번 주', ja: '今週', zh: '本周', fr: 'cette semaine', es: 'esta semana', de: 'diese Woche', ru: 'эта неделя', it: 'questa settimana',
  }),
  pack('de_weekdays', 'last_week', 'letzte Woche', 'letz-te vo-khe', '레츠테 보헤', 'レッツテ・ヴォッヘ', {
    en: 'last week', ko: '지난주', ja: '先週', zh: '上周', fr: 'la semaine dernière', es: 'la semana pasada', de: 'letzte Woche', ru: 'прошлая неделя', it: 'la settimana scorsa',
  }),
  pack('de_weekdays', 'next_week', 'nächste Woche', 'nekh-ste vo-khe', '넥슈테 보헤', 'ネヒステ・ヴォッヘ', {
    en: 'next week', ko: '다음 주', ja: '来週', zh: '下周', fr: 'la semaine prochaine', es: 'la semana que viene', de: 'nächste Woche', ru: 'следующая неделя', it: 'la settimana prossima',
  }),
]

const MONTHS = [
  pack('de_months', 'jan', 'Januar', 'yan-oo-ar', '야누아르', 'ヤヌアール', {
    en: 'January', ko: '1월', ja: '一月', zh: '一月', fr: 'janvier', es: 'enero', de: 'Januar', ru: 'январь', it: 'gennaio',
  }),
  pack('de_months', 'feb', 'Februar', 'fay-broo-ar', '페브루아르', 'フェブルアール', {
    en: 'February', ko: '2월', ja: '二月', zh: '二月', fr: 'février', es: 'febrero', de: 'Februar', ru: 'февраль', it: 'febbraio',
  }),
  pack('de_months', 'mar', 'März', 'merts', '메르츠', 'メルツ', {
    en: 'March', ko: '3월', ja: '三月', zh: '三月', fr: 'mars', es: 'marzo', de: 'März', ru: 'март', it: 'marzo',
  }),
  pack('de_months', 'apr', 'April', 'a-pril', '아프릴', 'アプリル', {
    en: 'April', ko: '4월', ja: '四月', zh: '四月', fr: 'avril', es: 'abril', de: 'April', ru: 'апрель', it: 'aprile',
  }),
  pack('de_months', 'may', 'Mai', 'my/mai', '마이', 'マイ', {
    en: 'May', ko: '5월', ja: '五月', zh: '五月', fr: 'mai', es: 'mayo', de: 'Mai', ru: 'май', it: 'maggio',
  }),
  pack('de_months', 'jun', 'Juni', 'yoo-nee', '유니', 'ユーニ', {
    en: 'June', ko: '6월', ja: '六月', zh: '六月', fr: 'juin', es: 'junio', de: 'Juni', ru: 'июнь', it: 'giugno',
  }),
  pack('de_months', 'jul', 'Juli', 'yoo-lee', '율리', 'ユーリ', {
    en: 'July', ko: '7월', ja: '七月', zh: '七月', fr: 'juillet', es: 'julio', de: 'Juli', ru: 'июль', it: 'luglio',
  }),
  pack('de_months', 'aug', 'August', 'ow-goost', '아우구스트', 'アウグスト', {
    en: 'August', ko: '8월', ja: '八月', zh: '八月', fr: 'août', es: 'agosto', de: 'August', ru: 'август', it: 'agosto',
  }),
  pack('de_months', 'sep', 'September', 'zep-tem-ber', '젭템버', 'セプテンバー', {
    en: 'September', ko: '9월', ja: '九月', zh: '九月', fr: 'septembre', es: 'septiembre', de: 'September', ru: 'сентябрь', it: 'settembre',
  }),
  pack('de_months', 'oct', 'Oktober', 'ok-toh-ber', '옥토버', 'オクトーバー', {
    en: 'October', ko: '10월', ja: '十月', zh: '十月', fr: 'octobre', es: 'octubre', de: 'Oktober', ru: 'октябрь', it: 'ottobre',
  }),
  pack('de_months', 'nov', 'November', 'no-vem-ber', '노벰버', 'ノヴェンバー', {
    en: 'November', ko: '11월', ja: '十一月', zh: '十一月', fr: 'novembre', es: 'noviembre', de: 'November', ru: 'ноябрь', it: 'novembre',
  }),
  pack('de_months', 'dec', 'Dezember', 'de-tsem-ber', '데쳄버', 'デツェンバー', {
    en: 'December', ko: '12월', ja: '十二月', zh: '十二月', fr: 'décembre', es: 'diciembre', de: 'Dezember', ru: 'декабрь', it: 'dicembre',
  }),
  pack('de_months', 'spring', 'Frühling', 'frue-ling', '프뤼링', 'フリューリング', {
    en: 'spring', ko: '봄', ja: '春', zh: '春天', fr: 'printemps', es: 'primavera', de: 'Frühling', ru: 'весна', it: 'primavera',
  }),
  pack('de_months', 'summer', 'Sommer', 'zom-mer', '조머', 'ゾマー', {
    en: 'summer', ko: '여름', ja: '夏', zh: '夏天', fr: 'été', es: 'verano', de: 'Sommer', ru: 'лето', it: 'estate',
  }),
  pack('de_months', 'autumn', 'Herbst', 'herpst', '헤르프스트', 'ヘルブスト', {
    en: 'autumn / fall', ko: '가을', ja: '秋', zh: '秋天', fr: 'automne', es: 'otoño', de: 'Herbst', ru: 'осень', it: 'autunno',
  }),
  pack('de_months', 'winter', 'Winter', 'vin-ter', '빈터', 'ヴィンター', {
    en: 'winter', ko: '겨울', ja: '冬', zh: '冬天', fr: 'hiver', es: 'invierno', de: 'Winter', ru: 'зима', it: 'inverno',
  }),
]

const timeTable = simpleTable(
  'de_time_ref',
  {
    en: 'Time of day',
    ko: '하루의 때',
    ja: '一日の時間帯',
    zh: '一天中的时段',
    fr: 'Moments de la journée',
    es: 'Momentos del día',
    de: 'Tageszeiten',
    ru: 'Время суток',
    it: 'Momenti della giornata',
  },
  {
    en: 'Watch Morgen/morgen: “morning” and “tomorrow”. Use morgens / nachmittags / abends / nachts.',
    ko: 'Morgen/morgen은 「아침」과 「내일」. morgens / nachmittags / abends / nachts.',
    ja: 'Morgen／morgen は「朝」と「明日」。morgens／nachmittags／abends／nachts。',
    zh: 'Morgen／morgen 既是“早上”也是“明天”。',
    fr: 'Morgen/morgen = matin et demain.',
    es: 'Morgen/morgen = morning y tomorrow.',
    de: 'Morgen/morgen = Morgen und morgen.',
    ru: 'Morgen/morgen = утро и завтра.',
    it: 'Morgen/morgen = mattina e domani.',
  },
  TIME.map((p) => p.row),
  {
    en: [
      'Mittag = noon; Abend = evening; Nacht = night.',
      'Clock: um + hour + Uhr (um drei Uhr).',
    ],
    ko: [
      'Mittag = 정오; Abend = 저녁; Nacht = 밤.',
      '시계: um + 시 + Uhr (um drei Uhr).',
    ],
    ja: ['Mittag＝正午。Abend＝夕方。Nacht＝夜。', '時刻: um ＋ 時 ＋ Uhr。'],
    zh: ['Mittag＝中午；Abend＝傍晚；Nacht＝夜里。', '报时: um + 点 + Uhr。'],
    fr: ['Mittag = midi ; Abend = soir ; Nacht = nuit.', 'Heure : um + heure + Uhr.'],
    es: ['Mittag = mediodía; Abend = evening; Nacht = night.', 'Hora: um + hora + Uhr.'],
    de: ['Mittag / Abend / Nacht.', 'Uhrzeit: um + Stunde + Uhr.'],
    ru: ['Mittag = полдень; Abend = вечер; Nacht = ночь.', 'Время: um + час + Uhr.'],
    it: ['Mittag = mezzogiorno; Abend = sera; Nacht = notte.', 'Ora: um + ora + Uhr.'],
  },
)

const weekTable = simpleTable(
  'de_weekdays_ref',
  {
    en: 'Days & relative time',
    ko: '요일과 상대적 때',
    ja: '曜日と相対的な時',
    zh: '星期与相对时间',
    fr: 'Jours & temps relatif',
    es: 'Días y tiempo relativo',
    de: 'Wochentage & relative Zeit',
    ru: 'Дни и относительное время',
    it: 'Giorni e tempo relativo',
  },
  {
    en: 'Weekday names are capitalized (Montag…). Many calendars start on Montag.',
    ko: '요일 이름은 대문자(Montag…). 달력은 종종 Montag부터 시작합니다.',
    ja: '曜日名は大文字。多くの暦は Montag 始まり。',
    zh: '星期名大写。多数日历从 Montag 开始。',
    fr: 'Jours en majuscule. Souvent semaine à partir de Montag.',
    es: 'Días con mayúscula. A menudo la semana empieza en Montag.',
    de: 'Wochentage groß. Oft Wochenbeginn Montag.',
    ru: 'Дни с заглавной. Часто неделя с Montag.',
    it: 'Giorni con maiuscola. Spesso settimana da Montag.',
  },
  WEEKDAYS.map((p) => p.row),
)

const monthsTable = simpleTable(
  'de_months_ref',
  {
    en: 'Months & seasons',
    ko: '월과 계절',
    ja: '月と季節',
    zh: '月份与季节',
    fr: 'Mois & saisons',
    es: 'Meses y estaciones',
    de: 'Monate & Jahreszeiten',
    ru: 'Месяцы и сезоны',
    it: 'Mesi e stagioni',
  },
  {
    en: 'Month names are capitalized. Day-of-month uses ordinals — see the Dates category (not here).',
    ko: '월 이름은 대문자. 일자는 서수 — Dates(날짜 표현) 카테고리를 보세요.',
    ja: '月名は大文字。日付の日は序数 — Dates カテゴリへ。',
    zh: '月份大写。日子用序数 — 见 Dates 分类。',
    fr: 'Mois en majuscule. Jour du mois = ordinaux → catégorie Dates.',
    es: 'Meses con mayúscula. Día = ordinales → categoría Dates.',
    de: 'Monate groß. Tag im Monat = Ordinalia → Kategorie Daten.',
    ru: 'Месяцы с заглавной. Число = порядковые → категория Даты.',
    it: 'Mesi con maiuscola. Giorno = ordinali → categoria Date.',
  },
  MONTHS.map((p) => p.row),
  {
    en: [
      'Unlike French/Spanish/Italian, German dates need ordinals (am fünften März) — practice in Dates.',
      'Writing: 5. März or 5.3.2024 (day.month.year).',
    ],
    ko: [
      '프랑스·스페인·이탈리아와 달리 독일어 날짜는 서수(am fünften März) — Dates에서 연습.',
      '표기: 5. März 또는 5.3.2024 (일.월.년).',
    ],
    ja: [
      '仏西伊と違い、ドイツ語の日付は序数（am fünften März）— Dates で練習。',
      '表記: 5. März または 5.3.2024。',
    ],
    zh: [
      '与法西意不同，德语日期用序数（am fünften März）— 在 Dates 练习。',
      '写法: 5. März 或 5.3.2024。',
    ],
    fr: [
      'Contrairement au FR/ES/IT : ordinaux → Dates.',
      'Écriture : 5. März / 5.3.2024.',
    ],
    es: [
      'A diferencia de FR/ES/IT: ordinales → Dates.',
      'Escritura: 5. März / 5.3.2024.',
    ],
    de: [
      'Anders als Romance: Ordinalia → Kategorie Daten.',
      'Schreibweise: 5. März / 5.3.2024.',
    ],
    ru: [
      'В отличие от романских: порядковые → Даты.',
      'На письме: 5. März / 5.3.2024.',
    ],
    it: [
      'A differenza di FR/ES/IT: ordinali → Date.',
      'Scrittura: 5. März / 5.3.2024.',
    ],
  },
)

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
  `de time ok — time(${TIME.length}) weekdays(${WEEKDAYS.length}) months(${MONTHS.length})`,
)
