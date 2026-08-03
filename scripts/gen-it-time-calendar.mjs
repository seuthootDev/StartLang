/**
 * Italian time & calendar: time / weekdays / months (merged under /it/time).
 * No separate dates category — day ≈ cardinal + month (il 5 marzo).
 * Run: node scripts/gen-it-time-calendar.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/it')

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
    de: en,
    ru: en,
    it: form,
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
        en: 'Italian',
        ko: '이탈리아어',
        ja: 'イタリア語',
        zh: '意大利语',
        fr: 'Italien',
        es: 'Italiano',
        de: 'Italienisch',
        ru: 'Итальянский',
        it: 'Italiano',
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
  pack('it_time', 'dawn', 'alba', 'al-ba', '알바', 'アルバ', {
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
  pack('it_time', 'morning', 'mattina', 'mat-tee-na', '마티나', 'マッティナ', {
    en: 'morning',
    ko: '아침',
    ja: '朝',
    zh: '早上',
    fr: 'matin',
    es: 'mañana',
    de: 'Morgen',
    ru: 'утро',
    it: 'mattina',
  }),
  pack('it_time', 'am', 'di mattina', 'dee mat-tee-na', '디 마티나', 'ディ・マッティナ', {
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
  pack('it_time', 'noon', 'mezzogiorno', 'med-dzo-jor-no', '메조조르노', 'メッゾジョルノ', {
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
  pack('it_time', 'pm', 'pomeriggio', 'po-me-ree-jo', '포메리조', 'ポメリッジョ', {
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
  pack('it_time', 'evening', 'sera', 'se-ra', '세라', 'セラ', {
    en: 'evening',
    ko: '저녁',
    ja: '夕方 / 晩',
    zh: '傍晚 / 晚上',
    fr: 'soir',
    es: 'noche (tarde→noche)',
    de: 'Abend',
    ru: 'вечер',
    it: 'sera',
  }),
  pack('it_time', 'night', 'notte', 'not-te', '노테', 'ノッテ', {
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
  pack('it_time', 'at_night', 'di notte', 'dee not-te', '디 노테', 'ディ・ノッテ', {
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
  pack('it_time', 'now', 'adesso', 'a-des-so', '아데소', 'アデッソ', {
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
  pack('it_weekdays', 'day_before_yesterday', "l'altro ieri", 'lal-tro ye-ree', '랄트로 이에리', 'ラルトロ・イエーリ', {
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
  pack('it_weekdays', 'yesterday', 'ieri', 'ye-ree', '이에리', 'イエーリ', {
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
  pack('it_weekdays', 'today', 'oggi', 'oj-jee', '오지', 'オッジ', {
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
  pack('it_weekdays', 'tomorrow', 'domani', 'do-ma-nee', '도마니', 'ドマーニ', {
    en: 'tomorrow',
    ko: '내일',
    ja: '明日',
    zh: '明天',
    fr: 'demain',
    es: 'mañana',
    de: 'morgen',
    ru: 'завтра',
    it: 'domani',
  }),
  pack('it_weekdays', 'day_after_tomorrow', 'dopodomani', 'do-po-do-ma-nee', '도포도마니', 'ドポドマーニ', {
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
  pack('it_weekdays', 'mon', 'lunedì', 'loo-ne-dee', '루네디', 'ルネディー', {
    en: 'Monday',
    ko: '월요일',
    ja: '月曜日',
    zh: '星期一',
    fr: 'lundi',
    es: 'lunes',
    de: 'Montag',
    ru: 'понедельник',
    it: 'lunedì',
  }),
  pack('it_weekdays', 'tue', 'martedì', 'mar-te-dee', '마르테디', 'マルテディー', {
    en: 'Tuesday',
    ko: '화요일',
    ja: '火曜日',
    zh: '星期二',
    fr: 'mardi',
    es: 'martes',
    de: 'Dienstag',
    ru: 'вторник',
    it: 'martedì',
  }),
  pack('it_weekdays', 'wed', 'mercoledì', 'mer-ko-le-dee', '메르콜레디', 'メルコレディー', {
    en: 'Wednesday',
    ko: '수요일',
    ja: '水曜日',
    zh: '星期三',
    fr: 'mercredi',
    es: 'miércoles',
    de: 'Mittwoch',
    ru: 'среда',
    it: 'mercoledì',
  }),
  pack('it_weekdays', 'thu', 'giovedì', 'jo-ve-dee', '조베디', 'ジョヴェディー', {
    en: 'Thursday',
    ko: '목요일',
    ja: '木曜日',
    zh: '星期四',
    fr: 'jeudi',
    es: 'jueves',
    de: 'Donnerstag',
    ru: 'четверг',
    it: 'giovedì',
  }),
  pack('it_weekdays', 'fri', 'venerdì', 've-ner-dee', '베네르디', 'ヴェネルディー', {
    en: 'Friday',
    ko: '금요일',
    ja: '金曜日',
    zh: '星期五',
    fr: 'vendredi',
    es: 'viernes',
    de: 'Freitag',
    ru: 'пятница',
    it: 'venerdì',
  }),
  pack('it_weekdays', 'sat', 'sabato', 'sa-ba-to', '사바토', 'サバト', {
    en: 'Saturday',
    ko: '토요일',
    ja: '土曜日',
    zh: '星期六',
    fr: 'samedi',
    es: 'sábado',
    de: 'Samstag',
    ru: 'суббота',
    it: 'sabato',
  }),
  pack('it_weekdays', 'sun', 'domenica', 'do-me-nee-ka', '도메니카', 'ドメニカ', {
    en: 'Sunday',
    ko: '일요일',
    ja: '日曜日',
    zh: '星期日',
    fr: 'dimanche',
    es: 'domingo',
    de: 'Sonntag',
    ru: 'воскресенье',
    it: 'domenica',
  }),
  pack('it_weekdays', 'this_week', 'questa settimana', 'kwes-ta set-tee-ma-na', '퀘스타 세티마나', 'クエスタ・セッティマナ', {
    en: 'this week',
    ko: '이번 주',
    ja: '今週',
    zh: '本周',
    fr: 'cette semaine',
    es: 'esta semana',
    de: 'diese Woche',
    ru: 'эта неделя',
    it: 'questa settimana',
  }),
  pack('it_weekdays', 'last_week', 'la settimana scorsa', 'la set-tee-ma-na skor-sa', '라 세티마나 스코르사', 'ラ・セッティマナ・スコルサ', {
    en: 'last week',
    ko: '지난주',
    ja: '先週',
    zh: '上周',
    fr: 'la semaine dernière',
    es: 'la semana pasada',
    de: 'letzte Woche',
    ru: 'прошлая неделя',
    it: 'la settimana scorsa',
  }),
  pack('it_weekdays', 'next_week', 'la settimana prossima', 'la set-tee-ma-na pros-see-ma', '라 세티마나 프로시마', 'ラ・セッティマナ・プロッシマ', {
    en: 'next week',
    ko: '다음 주',
    ja: '来週',
    zh: '下周',
    fr: 'la semaine prochaine',
    es: 'la semana que viene',
    de: 'nächste Woche',
    ru: 'следующая неделя',
    it: 'la settimana prossima',
  }),
]

const MONTHS = [
  pack('it_months', 'jan', 'gennaio', 'jen-na-yo', '젠나요', 'ジェンナーヨ', {
    en: 'January', ko: '1월', ja: '一月', zh: '一月', fr: 'janvier', es: 'enero', de: 'Januar', ru: 'январь', it: 'gennaio',
  }),
  pack('it_months', 'feb', 'febbraio', 'feb-bra-yo', '페브래요', 'フェッブラーヨ', {
    en: 'February', ko: '2월', ja: '二月', zh: '二月', fr: 'février', es: 'febrero', de: 'Februar', ru: 'февраль', it: 'febbraio',
  }),
  pack('it_months', 'mar', 'marzo', 'mar-tso', '마르초', 'マルツォ', {
    en: 'March', ko: '3월', ja: '三月', zh: '三月', fr: 'mars', es: 'marzo', de: 'März', ru: 'март', it: 'marzo',
  }),
  pack('it_months', 'apr', 'aprile', 'a-pree-le', '아프릴레', 'アプリーレ', {
    en: 'April', ko: '4월', ja: '四月', zh: '四月', fr: 'avril', es: 'abril', de: 'April', ru: 'апрель', it: 'aprile',
  }),
  pack('it_months', 'may', 'maggio', 'maj-jo', '마조', 'マッジョ', {
    en: 'May', ko: '5월', ja: '五月', zh: '五月', fr: 'mai', es: 'mayo', de: 'Mai', ru: 'май', it: 'maggio',
  }),
  pack('it_months', 'jun', 'giugno', 'joo-nyo', '주뇨', 'ジュニョ', {
    en: 'June', ko: '6월', ja: '六月', zh: '六月', fr: 'juin', es: 'junio', de: 'Juni', ru: 'июнь', it: 'giugno',
  }),
  pack('it_months', 'jul', 'luglio', 'loo-lyo', '룰료', 'ルッリオ', {
    en: 'July', ko: '7월', ja: '七月', zh: '七月', fr: 'juillet', es: 'julio', de: 'Juli', ru: 'июль', it: 'luglio',
  }),
  pack('it_months', 'aug', 'agosto', 'a-gos-to', '아고스토', 'アゴスト', {
    en: 'August', ko: '8월', ja: '八月', zh: '八月', fr: 'août', es: 'agosto', de: 'August', ru: 'август', it: 'agosto',
  }),
  pack('it_months', 'sep', 'settembre', 'set-tem-bre', '세템브레', 'セッテンブレ', {
    en: 'September', ko: '9월', ja: '九月', zh: '九月', fr: 'septembre', es: 'septiembre', de: 'September', ru: 'сентябрь', it: 'settembre',
  }),
  pack('it_months', 'oct', 'ottobre', 'ot-to-bre', '오토브레', 'オットーブレ', {
    en: 'October', ko: '10월', ja: '十月', zh: '十月', fr: 'octobre', es: 'octubre', de: 'Oktober', ru: 'октябрь', it: 'ottobre',
  }),
  pack('it_months', 'nov', 'novembre', 'no-vem-bre', '노벰브레', 'ノヴェンブレ', {
    en: 'November', ko: '11월', ja: '十一月', zh: '十一月', fr: 'novembre', es: 'noviembre', de: 'November', ru: 'ноябрь', it: 'novembre',
  }),
  pack('it_months', 'dec', 'dicembre', 'dee-chem-bre', '디쳄브레', 'ディチェンブレ', {
    en: 'December', ko: '12월', ja: '十二月', zh: '十二月', fr: 'décembre', es: 'diciembre', de: 'Dezember', ru: 'декабрь', it: 'dicembre',
  }),
  pack('it_months', 'spring', 'primavera', 'pree-ma-ve-ra', '프리마베라', 'プリマヴェラ', {
    en: 'spring', ko: '봄', ja: '春', zh: '春天', fr: 'printemps', es: 'primavera', de: 'Frühling', ru: 'весна', it: 'primavera',
  }),
  pack('it_months', 'summer', 'estate', 'e-sta-te', '에스타테', 'エスターテ', {
    en: 'summer', ko: '여름', ja: '夏', zh: '夏天', fr: 'été', es: 'verano', de: 'Sommer', ru: 'лето', it: 'estate',
  }),
  pack('it_months', 'autumn', 'autunno', 'aw-toon-no', '아우툰노', 'アウトゥンノ', {
    en: 'autumn / fall', ko: '가을', ja: '秋', zh: '秋天', fr: 'automne', es: 'otoño', de: 'Herbst', ru: 'осень', it: 'autunno',
  }),
  pack('it_months', 'winter', 'inverno', 'een-ver-no', '인베르노', 'インヴェルノ', {
    en: 'winter', ko: '겨울', ja: '冬', zh: '冬天', fr: 'hiver', es: 'invierno', de: 'Winter', ru: 'зима', it: 'inverno',
  }),
]

const DATE_WRITING = [
  {
    form: 'il 1º gennaio / il primo gennaio',
    meaning: loc({
      en: 'January 1st (only day that uses an ordinal)',
      ko: '1월 1일 (유일하게 서수)',
      ja: '1月1日（序数を使う唯一の日）',
      zh: '1月1日（唯一用序数）',
      fr: 'le 1er janvier (seul jour en ordinal)',
      es: 'el 1.º de enero (único día con ordinal)',
      de: '1. Januar (einziger Ordinal-Tag)',
      ru: '1 января (единственный день с порядковым)',
      it: 'il 1º gennaio (unico giorno con ordinale)',
    }),
    sound: loc({
      en: 'primo = 1st (ordinal)',
      ko: 'primo = 1일 (서수)',
      ja: 'primo＝1日（序数）',
      zh: 'primo＝1日（序数）',
      fr: 'primo = 1er',
      es: 'primo = 1.º',
      de: 'primo = 1.',
      ru: 'primo = 1-е',
      it: 'primo = 1º',
    }),
  },
  {
    form: 'il 2 gennaio',
    meaning: loc({
      en: 'January 2nd (cardinal: due)',
      ko: '1월 2일 (기수: due)',
      ja: '1月2日（基数 due）',
      zh: '1月2日（基数 due）',
      fr: 'le 2 janvier (cardinal : due)',
      es: 'el 2 de enero (cardinal: due)',
      de: '2. Januar (Kardinal: due)',
      ru: '2 января (количественное: due)',
      it: 'il 2 gennaio (cardinale: due)',
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
      it: 'dal 2 = cardinale',
    }),
  },
  {
    form: 'il 5 marzo',
    meaning: loc({
      en: 'March 5th (cardinal: cinque)',
      ko: '3월 5일 (기수: cinque)',
      ja: '3月5日（基数 cinque）',
      zh: '3月5日（基数 cinque）',
      fr: 'le 5 mars (cardinal : cinque)',
      es: 'el 5 de marzo (cardinal: cinco)',
      de: '5. März (Kardinal: cinque)',
      ru: '5 марта (количественное: cinque)',
      it: 'il 5 marzo (cardinale: cinque)',
    }),
    sound: loc({
      en: 'il + number + month (no di)',
      ko: 'il + 숫자 + 월 (di 없음)',
      ja: 'il ＋ 数字 ＋ 月（di なし）',
      zh: 'il + 数字 + 月（无 di）',
      fr: 'il + nombre + mois (pas de di)',
      es: 'il + número + mes (sin di)',
      de: 'il + Zahl + Monat (kein di)',
      ru: 'il + число + месяц (без di)',
      it: 'il + numero + mese (senza di)',
    }),
  },
  {
    form: 'il 21 luglio',
    meaning: loc({
      en: 'July 21st (cardinal: ventuno)',
      ko: '7월 21일 (기수: ventuno)',
      ja: '7月21日（基数 ventuno）',
      zh: '7月21日（基数 ventuno）',
      fr: 'le 21 juillet (ventuno)',
      es: 'el 21 de julio (ventuno)',
      de: '21. Juli (ventuno)',
      ru: '21 июля (ventuno)',
      it: 'il 21 luglio (ventuno)',
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
      it: 'stessi composti dei numeri',
    }),
  },
  {
    form: 'il 31 dicembre',
    meaning: loc({
      en: 'December 31st (cardinal: trentuno)',
      ko: '12월 31일 (기수: trentuno)',
      ja: '12月31日（基数 trentuno）',
      zh: '12月31日（基数 trentuno）',
      fr: 'le 31 décembre (trentuno)',
      es: 'el 31 de diciembre (trentuno)',
      de: '31. Dezember (trentuno)',
      ru: '31 декабря (trentuno)',
      it: 'il 31 dicembre (trentuno)',
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
      it: 'cardinale, non ordinale',
    }),
  },
]

const timeTable = simpleTable(
  'it_time_ref',
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
    en: 'Use di mattina / di pomeriggio / di sera / di notte. mezzogiorno = noon.',
    ko: 'di mattina / pomeriggio / sera / notte. mezzogiorno = 정오.',
    ja: 'di mattina／pomeriggio／sera／notte。mezzogiorno＝正午。',
    zh: '用 di mattina／pomeriggio／sera／notte。mezzogiorno＝中午。',
    fr: 'di mattina / pomeriggio / sera / notte. mezzogiorno = midi.',
    es: 'di mattina / pomeriggio / sera / notte. mezzogiorno = mediodía.',
    de: 'di mattina / pomeriggio / sera / notte. mezzogiorno = Mittag.',
    ru: 'di mattina / pomeriggio / sera / notte. mezzogiorno = полдень.',
    it: 'di mattina / pomeriggio / sera / notte. mezzogiorno = mezzogiorno.',
  },
  TIME.map((p) => p.row),
  {
    en: [
      'sera = evening; notte = night.',
      'Clock talk: alle + hour + di mattina / del pomeriggio / di sera.',
    ],
    ko: [
      'sera = 저녁; notte = 밤.',
      '시계: alle + 시 + di mattina / del pomeriggio / di sera.',
    ],
    ja: [
      'sera＝夕方、notte＝夜。',
      '時刻: alle ＋ 時 ＋ di mattina／del pomeriggio／di sera。',
    ],
    zh: [
      'sera＝傍晚；notte＝夜里。',
      '报时: alle + 点 + di mattina／del pomeriggio／di sera。',
    ],
    fr: [
      'sera = soir ; notte = nuit.',
      'À l’heure : alle + heure + di mattina / del pomeriggio / di sera.',
    ],
    es: [
      'sera = evening; notte = night.',
      'En la hora: alle + hora + di mattina / del pomeriggio / di sera.',
    ],
    de: [
      'sera = Abend; notte = Nacht.',
      'Uhrzeit: alle + Stunde + di mattina / del pomeriggio / di sera.',
    ],
    ru: [
      'sera = вечер; notte = ночь.',
      'Во времени: alle + час + di mattina / del pomeriggio / di sera.',
    ],
    it: [
      'sera = sera; notte = notte.',
      'Nell’ora: alle + ora + di mattina / del pomeriggio / di sera.',
    ],
  },
)

const weekTable = simpleTable(
  'it_weekdays_ref',
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
    en: 'Weekdays are lowercase. Many calendars start the week on lunedì.',
    ko: '요일은 소문자. 달력은 종종 lunedì부터 시작합니다.',
    ja: '曜日は小文字。多くの暦は lunedì 始まり。',
    zh: '星期小写。多数日历从 lunedì 开始。',
    fr: 'Jours en minuscules. Souvent semaine à partir de lunedì.',
    es: 'Días en minúscula. A menudo la semana empieza en lunedì.',
    de: 'Wochentage klein. Oft Wochenbeginn lunedì.',
    ru: 'Дни с маленькой буквы. Часто неделя с lunedì.',
    it: 'I giorni sono in minuscolo. Spesso la settimana inizia da lunedì.',
  },
  WEEKDAYS.map((p) => p.row),
)

const monthsTable = {
  table_id: 'it_months_ref',
  title: loc({
    en: 'Months & seasons',
    ko: '월과 계절',
    ja: '月と季節',
    zh: '月份与季节',
    fr: 'Mois & saisons',
    es: 'Meses y estaciones',
    de: 'Monate & Jahreszeiten',
    ru: 'Месяцы и сезоны',
    it: 'Mesi e stagioni',
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
    it: 'Mesi in minuscolo. Scrittura delle date sotto — soprattutto cardinali.',
  }),
  rules: {
    en: [
      'Pattern: il + day + month (il 5 marzo) — no di between day and month.',
      'Only the 1st uses an ordinal: il 1º / il primo. From the 2nd onward, use cardinals (Numbers quiz).',
      'No separate Dates quiz — learn months here and days in Numbers.',
    ],
    ko: [
      '패턴: il + 일자 + 월 (il 5 marzo) — 일자와 월 사이에 di 없음.',
      '1일만 서수: il 1º / il primo. 2일부터는 기수사.',
      '날짜 전용 퀴즈 없음 — 월은 여기, 일자는 기수사에서.',
    ],
    ja: [
      '型: il ＋ 日 ＋ 月（il 5 marzo）— di なし。',
      '1日だけ序数: il 1º / il primo。2日以降は基数。',
      '日付専用クイズなし。',
    ],
    zh: [
      '格式: il + 日 + 月（il 5 marzo）— 中间无 di。',
      '仅1日用序数；从2日起用基数。',
      '无单独日期测验。',
    ],
    fr: [
      'Schéma : il + jour + mois (pas de di).',
      'Seul le 1er est ordinal ; dès le 2, cardinaux.',
      'Pas de quiz Dates séparé.',
    ],
    es: [
      'Patrón: il + día + mes (sin di).',
      'Solo el 1 usa ordinal; desde el 2, cardinales.',
      'Sin quiz Dates aparte.',
    ],
    de: [
      'Muster: il + Tag + Monat (kein di).',
      'Nur der 1. ist Ordinal; ab 2 Kardinal.',
      'Kein separates Dates-Quiz.',
    ],
    ru: [
      'Схема: il + день + месяц (без di).',
      'Только 1-е — порядковое; со 2-го — количественные.',
      'Отдельного квиза Dates нет.',
    ],
    it: [
      'Schema: il + giorno + mese (senza di).',
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
        it: 'Mesi e stagioni',
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
        it: 'Scrivere le date',
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
        it: 'Solo riferimento. Il giorno = cardinale, eccetto l’1.',
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
  `it time ok — time(${TIME.length}) weekdays(${WEEKDAYS.length}) months(${MONTHS.length})`,
)
