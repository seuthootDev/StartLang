/**
 * Generate German date-expression quiz + reference table.
 * Days use ordinals after am (Dativ): am ersten, am zweiten…
 * Run: node scripts/gen-de-dates.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '../src/data/de')

function loc(map) {
  return { ...map, it: map.it ?? map.en }
}

function dayMeaning(n) {
  return loc({
    en: `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} (of the month)`,
    ko: `${n}일`,
    ja: `${n}日`,
    zh: `${n}号`,
    fr: `le ${n}`,
    es: `día ${n}`,
    de: `${n}.`,
    ru: `${n}`,
    it: `${n}`,
  })
}

/** @type {Array<{ n: number, form: string, en: string, ko: string, ja: string }>} */
const DAYS = [
  { n: 1, form: 'am ersten', en: 'am ers-ten', ko: '암 에르스텐', ja: 'アム・エアステン' },
  { n: 2, form: 'am zweiten', en: 'am tsvai-ten', ko: '암 츠바이텐', ja: 'アム・ツヴァイテン' },
  { n: 3, form: 'am dritten', en: 'am drit-ten', ko: '암 드리텐', ja: 'アム・ドリッテン' },
  { n: 4, form: 'am vierten', en: 'am feer-ten', ko: '암 피어텐', ja: 'アム・フィーアテン' },
  { n: 5, form: 'am fünften', en: 'am fuenf-ten', ko: '암 픈프텐', ja: 'アム・フンフテン' },
  { n: 6, form: 'am sechsten', en: 'am zex-ten', ko: '암 젝스텐', ja: 'アム・ゼクステン' },
  { n: 7, form: 'am siebten', en: 'am zeep-ten', ko: '암 집텐', ja: 'アム・ジープテン' },
  { n: 8, form: 'am achten', en: 'am akh-ten', ko: '암 아흐텐', ja: 'アム・アハテン' },
  { n: 9, form: 'am neunten', en: 'am noyn-ten', ko: '암 노인텐', ja: 'アム・ノインテン' },
  { n: 10, form: 'am zehnten', en: 'am tsayn-ten', ko: '암 체인텐', ja: 'アム・ツェーンテン' },
  { n: 11, form: 'am elften', en: 'am elf-ten', ko: '암 엘프텐', ja: 'アム・エルフテン' },
  { n: 12, form: 'am zwölften', en: 'am tsvuhlf-ten', ko: '암 츠뵐프텐', ja: 'アム・ツヴェルフテン' },
  { n: 13, form: 'am dreizehnten', en: 'am dry-tsayn-ten', ko: '암 드라이체인텐', ja: 'アム・ドライツェーンテン' },
  { n: 14, form: 'am vierzehnten', en: 'am feer-tsayn-ten', ko: '암 피어체인텐', ja: 'アム・フィーアツェーンテン' },
  { n: 15, form: 'am fünfzehnten', en: 'am fuenf-tsayn-ten', ko: '암 픈프체인텐', ja: 'アム・フンフツェーンテン' },
  { n: 16, form: 'am sechzehnten', en: 'am zekh-tsayn-ten', ko: '암 제흐체인텐', ja: 'アム・ゼヒツェーンテン' },
  { n: 17, form: 'am siebzehnten', en: 'am zeep-tsayn-ten', ko: '암 집체인텐', ja: 'アム・ジープツェーンテン' },
  { n: 18, form: 'am achtzehnten', en: 'am akht-tsayn-ten', ko: '암 아흐트체인텐', ja: 'アム・アハツェーンテン' },
  { n: 19, form: 'am neunzehnten', en: 'am noyn-tsayn-ten', ko: '암 노인체인텐', ja: 'アム・ノインツェーンテン' },
  { n: 20, form: 'am zwanzigsten', en: 'am tsvun-tsikh-sten', ko: '암 츠반치히스텐', ja: 'アム・ツヴァンツィヒステン' },
  { n: 21, form: 'am einundzwanzigsten', en: 'am ain-oont-tsvun-tsikh-sten', ko: '암 아인운트츠반치히스텐', ja: 'アム・アインウントツヴァンツィヒステン' },
  { n: 22, form: 'am zweiundzwanzigsten', en: 'am tsvai-oont-tsvun-tsikh-sten', ko: '암 츠바이운트츠반치히스텐', ja: 'アム・ツヴァイウントツヴァンツィヒステン' },
  { n: 23, form: 'am dreiundzwanzigsten', en: 'am dry-oont-tsvun-tsikh-sten', ko: '암 드라이운트츠반치히스텐', ja: 'アム・ドライウントツヴァンツィヒステン' },
  { n: 24, form: 'am vierundzwanzigsten', en: 'am feer-oont-tsvun-tsikh-sten', ko: '암 피어운트츠반치히스텐', ja: 'アム・フィーアウントツヴァンツィヒステン' },
  { n: 25, form: 'am fünfundzwanzigsten', en: 'am fuenf-oont-tsvun-tsikh-sten', ko: '암 픈프운트츠반치히스텐', ja: 'アム・フンフウントツヴァンツィヒステン' },
  { n: 26, form: 'am sechsundzwanzigsten', en: 'am zex-oont-tsvun-tsikh-sten', ko: '암 젝스운트츠반치히스텐', ja: 'アム・ゼクスウントツヴァンツィヒステン' },
  { n: 27, form: 'am siebenundzwanzigsten', en: 'am zee-ben-oont-tsvun-tsikh-sten', ko: '암 지벤운트츠반치히스텐', ja: 'アム・ジーベンウントツヴァンツィヒステン' },
  { n: 28, form: 'am achtundzwanzigsten', en: 'am akht-oont-tsvun-tsikh-sten', ko: '암 아흐트운트츠반치히스텐', ja: 'アム・アハトウントツヴァンツィヒステン' },
  { n: 29, form: 'am neunundzwanzigsten', en: 'am noyn-oont-tsvun-tsikh-sten', ko: '암 노인운트츠반치히스텐', ja: 'アム・ノインウントツヴァンツィヒステン' },
  { n: 30, form: 'am dreißigsten', en: 'am dry-sikh-sten', ko: '암 드라이시히스텐', ja: 'アム・ドライシヒステン' },
  { n: 31, form: 'am einunddreißigsten', en: 'am ain-oont-dry-sikh-sten', ko: '암 아인운트드라이시히스텐', ja: 'アム・アインウントドライシヒステン' },
]

function sounds(row) {
  return loc({
    en: row.en,
    ko: row.ko,
    ja: row.ja,
    zh: row.en,
    fr: row.en,
    es: row.en,
    de: row.form,
    ru: row.en,
  })
}

function quizEntry(row) {
  return {
    quiz_id: `de_dates_day_${row.n}`,
    question_word: row.form,
    pronunciations: sounds(row),
    translations: dayMeaning(row.n),
  }
}

function tableRow(row) {
  return {
    form: row.form,
    meaning: dayMeaning(row.n),
    sound: sounds(row),
  }
}

const formCols = [
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

const quiz = DAYS.map(quizEntry)

const table = {
  table_id: 'de_dates_ref',
  title: loc({
    en: 'Dates',
    ko: '날짜 표현',
    ja: '日付の表現',
    zh: '日期表达',
    fr: 'Dates',
    es: 'Fechas',
    de: 'Daten',
    ru: 'Даты',
    it: 'Date',
  }),
  note: loc({
    en: 'German days of the month use ordinals — not cardinals like FR/ES/IT. Spoken: am + Dativ (am fünften März).',
    ko: '독일어 일자는 서수 — FR/ES/IT처럼 기수가 아닙니다. 구어: am + 여격 (am fünften März).',
    ja: 'ドイツ語の日付の日は序数。口語: am ＋ 与格（am fünften März）。',
    zh: '德语日子用序数——不是法西意的基数。口语: am + 与格。',
    fr: 'Jours = ordinaux (pas cardinaux). Oral : am + datif.',
    es: 'Días = ordinales (no cardinales). Oral: am + dativo.',
    de: 'Tage = Ordinalia. Mündlich: am + Dativ.',
    ru: 'Числа = порядковые. Устно: am + дательный.',
    it: 'Giorni = ordinali (non cardinali). Orale: am + dativo.',
  }),
  rules: {
    en: [
      'Pattern: am + ordinal (Dativ) + month — am dritten April.',
      'Writing often uses digits: 3. April / 3.4.2024 (day.month.year).',
      'Irregular stems: erste, dritte, siebte (also siebente); 20+ use -ste (zwanzigste).',
      'Quiz prompts use the spoken am … forms; month names stay nominative.',
    ],
    ko: [
      '패턴: am + 서수(여격) + 월 — am dritten April.',
      '글에서는 숫자: 3. April / 3.4.2024 (일.월.년).',
      '불규칙 어간: erste, dritte, siebte(또는 siebente); 20+는 -ste.',
      '퀴즈는 구어 am … 형태; 월 이름은 주격 유지.',
    ],
    ja: [
      '型: am ＋ 序数（与格）＋ 月。',
      '書き: 3. April / 3.4.2024。',
      '不規則: erste, dritte, siebte。20以降は -ste。',
      'クイズは am … 形。月は主格。',
    ],
    zh: [
      '格式: am + 序数（与格）+ 月。',
      '书写: 3. April / 3.4.2024。',
      '不规则: erste、dritte、siebte；20+ 用 -ste。',
      '测验用 am …；月份保持主格。',
    ],
    fr: [
      'Schéma : am + ordinal (datif) + mois.',
      'Écrit : 3. April / 3.4.2024.',
      'Irréguliers : erste, dritte, siebte ; dès 20 : -ste.',
      'Quiz = formes am … ; mois au nominatif.',
    ],
    es: [
      'Patrón: am + ordinal (dativo) + mes.',
      'Escrito: 3. April / 3.4.2024.',
      'Irregulares: erste, dritte, siebte; desde 20: -ste.',
      'Quiz = formas am … ; mes en nominativo.',
    ],
    de: [
      'Muster: am + Ordinal (Dativ) + Monat.',
      'Schrift: 3. April / 3.4.2024.',
      'Unregelmäßig: erste, dritte, siebte; ab 20: -ste.',
      'Quiz = am … ; Monat im Nominativ.',
    ],
    ru: [
      'Схема: am + порядковое (дат.) + месяц.',
      'Письмо: 3. April / 3.4.2024.',
      'Нерегулярные: erste, dritte, siebte; с 20: -ste.',
      'Квиз = am … ; месяц в именительном.',
    ],
    it: [
      'Schema: am + ordinale (dativo) + mese.',
      'Scritto: 3. April / 3.4.2024.',
      'Irregolari: erste, dritte, siebte; da 20: -ste.',
      'Quiz = forme am … ; mese al nominativo.',
    ],
  },
  sections: [
    {
      title: loc({
        en: 'Day of month (am + ordinal)',
        ko: '일자 (am + 서수)',
        ja: '日付の日（am ＋ 序数）',
        zh: '日子（am + 序数）',
        fr: 'Jour du mois (am + ordinal)',
        es: 'Día del mes (am + ordinal)',
        de: 'Tag im Monat (am + Ordinal)',
        ru: 'Число месяца (am + порядковое)',
        it: 'Giorno del mese (am + ordinale)',
      }),
      note: loc({
        en: 'These are the quiz cards. Combine with a month in speech: am ersten Januar.',
        ko: '퀴즈 카드입니다. 말할 때 월과 결합: am ersten Januar.',
        ja: 'クイズ用。話すときは月と結合: am ersten Januar。',
        zh: '测验卡片。口语加月份: am ersten Januar。',
        fr: 'Cartes du quiz. À l’oral + mois.',
        es: 'Tarjetas del quiz. Oral + mes.',
        de: 'Quizkarten. Mündlich + Monat.',
        ru: 'Карточки квиза. Устно + месяц.',
        it: 'Carte del quiz. All’orale + mese.',
      }),
      columns: formCols,
      rows: DAYS.map(tableRow),
    },
  ],
}

mkdirSync(OUT_DIR, { recursive: true })
writeFileSync(join(OUT_DIR, 'dates.json'), `${JSON.stringify(quiz, null, 2)}\n`)
writeFileSync(join(OUT_DIR, 'dates.table.json'), `${JSON.stringify(table, null, 2)}\n`)
console.log(`de dates ok — ${quiz.length} day cards`)
