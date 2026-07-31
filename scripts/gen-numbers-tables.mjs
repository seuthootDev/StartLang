import fs from 'node:fs'

const KO_RULES = {
  en: [
    'Sino-Korean (일, 이…): regular. 11–99 = tens + ones (십일, 이십삼). 20 = 이십, not a special word.',
    'Native (하나, 둘…): learn 1–10 and the tens (스물, 서른…). 23 = 스물셋 (tens + ones).',
    'Quiz adds 5 random compounds (11–99) so you practice the pattern, not only the base list.',
  ],
  ko: [
    '한자어(일·이…): 규칙적. 11–99는 십+일자리 (십일, 이십삼). 20은 이십.',
    '셈수(하나·둘…): 1–10과 십 단위(스물·서른…)를 외운 뒤, 23=스물셋처럼 붙입니다.',
    '퀴즈에 11–99 랜덤 조합 5문항이 나와 규칙을 연습합니다.',
  ],
  ja: [
    '漢数（イル…）は規則的。11–99は十＋一の位（십일、이십삼）。20は이십。',
    '固有語（ハナ…）は1–10と十の位（스물…）を覚え、23は스물셋のように足す。',
    'クイズに11–99のランダム結合が5問入り、規則を練習します。',
  ],
  zh: [
    '汉字音（일、이…）规则：11–99=十位+个位（십일、이십삼）。20=이십。',
    '固有语（하나、둘…）：先记1–10和二十、三十…，23=스물셋。',
    '测验另加5道11–99随机组合，用来练规则。',
  ],
  fr: [
    'Sino-coreen (일…) : regulier. 11–99 = dizaines + unites (십일, 이십삼).',
    'Natif (하나…) : 1–10 + dizaines (스물…). 23 = 스물셋.',
    'Le quiz ajoute 5 composes aleatoires (11–99) pour pratiquer la regle.',
  ],
  es: [
    'Sino-coreano (일…): regular. 11–99 = decenas + unidades (십일, 이십삼).',
    'Nativo (하나…): 1–10 y decenas (스물…). 23 = 스물셋.',
    'El quiz anade 5 compuestos aleatorios (11–99) para practicar la regla.',
  ],
  de: [
    'Sino-koreanisch (일…): regelmaessig. 11–99 = Zehner + Einer (십일, 이십삼).',
    'Nativ (하나…): 1–10 und Zehner (스물…). 23 = 스물셋.',
    'Das Quiz ergaenzt 5 Zufallskombinationen (11–99) zum Ueben der Regel.',
  ],
  ru: [
    'Сино-корейские (일…): регулярны. 11–99 = десятки + единицы (십일, 이십삼).',
    'Собственные (하나…): 1–10 и десятки (스물…). 23 = 스물셋.',
    'В квизе +5 случайных сочетаний (11–99), чтобы закрепить правило.',
  ],
}

const JA_RULES = {
  en: [
    'Sino (一, 二…): mostly regular. 11–99 = 十 + ones / tens+十+ones (十一, 二十三). 4/7/9 often よん・なな・きゅう.',
    'Native counters (一つ…とお): used for counting things; usually stop at 10 — no 23-style compounds.',
    'Sino quizzes add 5 random compounds (11–99). Later languages may list irregularities here (like English eleven, twelve).',
  ],
  ko: [
    '한자음(一·二…): 대체로 규칙적. 11–99는 十+일자리 / 십자리+十+일자리 (十一, 二十三). 4·7·9는 보통 よん·なな·きゅう.',
    '개수(一つ…とお): 물건을 셀 때. 보통 10(とお)까지 — 23 같은 합성은 없음.',
    '한자음 퀴즈에 11–99 랜덤 조합 5문항. (영어 eleven/twelve처럼 불규칙은 해당 언어 표의 규칙란에 적습니다.)',
  ],
  ja: [
    '漢数（一・二…）はほぼ規則的。11–99は十＋一の位／何十＋十＋一の位（十一、二十三）。四・七・九はよん・なな・きゅうが多い。',
    '和数（一つ…とお）は物を数える用。だいたい10までで、23のような合成はしない。',
    '漢数クイズに11–99のランダム結合が5問。（英語のeleven/twelveのような不規則は、その言語の表の規則欄に書きます。）',
  ],
  zh: [
    '汉字音（一、二…）大体规则：11–99=十+个位 / 几十+十+个位（十一、二十三）。4/7/9常读よん・なな・きゅう。',
    '和语数（一つ…とお）用于数东西，通常到10为止，没有23这类组合。',
    '汉字音测验另加5道11–99随机组合。（英语eleven/twelve等不规则会写在该语言表的规则里。）',
  ],
  fr: [
    'Sino (一…) : surtout regulier. 11–99 = 十 + unites (十一, 二十三). 4/7/9 souvent よん・なな・きゅう.',
    'Compteurs natifs (一つ…とお) : pour compter des objets ; en general jusqu a 10.',
    'Quiz sino : +5 composes aleatoires (11–99). Les irregularites (ex. anglais eleven) iront dans les regles de chaque langue.',
  ],
  es: [
    'Sino (一…): casi regular. 11–99 = 十 + unidades (十一, 二十三). 4/7/9 suelen ser よん・なな・きゅう.',
    'Contadores nativos (一つ…とお): para cosas; suelen llegar hasta 10.',
    'Quiz sino: +5 compuestos aleatorios (11–99). Irregularidades (p. ej. eleven) iran en las reglas de cada lengua.',
  ],
  de: [
    'Sino (一…): weitgehend regelmaessig. 11–99 = 十 + Einer (十一, 二十三). 4/7/9 oft よん・なな・きゅう.',
    'Native Zaehler (一つ…とお): fuer Dinge; meist bis 10.',
    'Sino-Quiz: +5 Zufallskombinationen (11–99). Unregelmaessigkeiten (z. B. eleven) stehen spaeter in den Regeln der Sprache.',
  ],
  ru: [
    'Сино (一…): в основном регулярны. 11–99 = 十 + единицы (十一, 二十三). 4/7/9 часто よん・なな・きゅう.',
    'Собственные счётные (一つ…とお): для предметов; обычно до 10.',
    'В сино-квизе +5 случайных сочетаний (11–99). Нерегулярности (как eleven) будут в правилах соответствующего языка.',
  ],
}

function make(lang) {
  const quiz = JSON.parse(fs.readFileSync(`src/data/${lang}/numbers.json`, 'utf8'))
  const formLabel =
    lang === 'ko'
      ? {
          en: 'Korean',
          ko: '한국어',
          ja: '韓国語',
          zh: '韩语',
          fr: 'Coréen',
          es: 'Coreano',
          de: 'Koreanisch',
          ru: 'Корейский',
        }
      : {
          en: 'Japanese',
          ko: '일본어',
          ja: '日本語',
          zh: '日语',
          fr: 'Japonais',
          es: 'Japonés',
          de: 'Japanisch',
          ru: 'Японский',
        }

  const table = {
    table_id: `${lang}_numbers_ref`,
    title: {
      en: 'Cardinal numbers',
      ko: '기수사',
      ja: '基数',
      zh: '基数词',
      fr: 'Nombres cardinaux',
      es: 'Números cardinales',
      de: 'Kardinalzahlen',
      ru: 'Количественные числительные',
    },
    note:
      lang === 'ko'
        ? {
            en: 'Two systems + composition rules below.',
            ko: '숫자 체계 두 가지와 아래 조합 규칙.',
            ja: '二つの体系と、下の組み合わせ規則。',
            zh: '两套数字体系及下方组合规则。',
            fr: 'Deux systemes et regles de composition.',
            es: 'Dos sistemas y reglas de composicion.',
            de: 'Zwei Systeme und Bildungsregeln.',
            ru: 'Две системы и правила сложения.',
          }
        : {
            en: 'Two systems + composition rules below.',
            ko: '숫자 체계 두 가지와 아래 조합 규칙.',
            ja: '二つの体系と、下の組み合わせ規則。',
            zh: '两套数字体系及下方组合规则。',
            fr: 'Deux systemes et regles de composition.',
            es: 'Dos sistemas y reglas de composicion.',
            de: 'Zwei Systeme und Bildungsregeln.',
            ru: 'Две системы и правила сложения.',
          },
    rules: lang === 'ko' ? KO_RULES : JA_RULES,
    columns: [
      { key: 'form', labels: formLabel },
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
    ],
    rows: quiz.map((q) => ({
      form: q.question_word,
      meaning: q.translations,
      sound: {
        ...q.pronunciations,
        [lang]: q.pronunciations[lang] || q.question_word,
      },
    })),
  }

  fs.writeFileSync(
    `src/data/${lang}/numbers.table.json`,
    `${JSON.stringify(table, null, 2)}\n`,
  )
}

make('ko')
make('ja')
console.log('numbers tables with rules ok')
