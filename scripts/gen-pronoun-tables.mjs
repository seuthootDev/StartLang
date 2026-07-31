import fs from 'node:fs'
import path from 'node:path'

function makeTable(lang, category, title, note, formLabel) {
  const quiz = JSON.parse(
    fs.readFileSync(path.join('src/data', lang, `${category}.json`), 'utf8'),
  )
  const jaReadings = {
    私: 'わたし',
    僕: 'ぼく',
    俺: 'おれ',
    あなた: 'あなた',
    君: 'きみ',
    彼: 'かれ',
    彼女: 'かのじょ',
    私たち: 'わたしたち',
    あなたたち: 'あなたたち',
    彼ら: 'かれら',
  }
  const table = {
    table_id: `${lang}_${category}_ref`,
    title,
    note,
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
        [lang]:
          lang === 'ja'
            ? jaReadings[q.question_word] || q.question_word
            : q.question_word,
      },
    })),
  }
  fs.writeFileSync(
    path.join('src/data', lang, `${category}.table.json`),
    `${JSON.stringify(table, null, 2)}\n`,
  )
}

const title = {
  en: 'Personal pronouns',
  ko: '인칭대명사',
  ja: '人称代名詞',
  zh: '人称代词',
  fr: 'Pronoms personnels',
  es: 'Pronombres personales',
  de: 'Personalpronomen',
  ru: 'Личные местоимения',
}

makeTable(
  'ko',
  'pronouns',
  title,
  {
    en: 'Korean pronouns change a lot with politeness.',
    ko: '높임/낮춤에 따라 나·저, 우리·저희처럼 갈라집니다.',
    ja: '丁寧さで「나/저」「우리/저희」などが分かれます。',
    zh: '韩语代词常因敬语程度而不同。',
    fr: 'Les pronoms coréens changent selon la politesse.',
    es: 'Los pronombres coreanos cambian con la cortesía.',
    de: 'Koreanische Pronomen hängen stark von Höflichkeit ab.',
    ru: 'Корейские местоимения сильно зависят от вежливости.',
  },
  {
    en: 'Korean',
    ko: '한국어',
    ja: '韓国語',
    zh: '韩语',
    fr: 'Coréen',
    es: 'Coreano',
    de: 'Koreanisch',
    ru: 'Корейский',
  },
)

makeTable(
  'ja',
  'pronouns',
  title,
  {
    en: 'Japanese has several I and you forms by gender and casualness.',
    ko: '일본어 나/너는 성별·친소에 따라 私·僕·俺·君 등으로 갈립니다.',
    ja: '「私・僕・俺」「あなた・君」など、性別や砕け方で形が分かれます。',
    zh: '日语的“我/你”常因性别和随意程度而不同。',
    fr: 'Le japonais a plusieurs formes de je et tu.',
    es: 'El japonés tiene varias formas de yo y tú.',
    de: 'Japanisch hat mehrere Ich-/Du-Formen.',
    ru: 'В японском несколько форм я и ты.',
  },
  {
    en: 'Japanese',
    ko: '일본어',
    ja: '日本語',
    zh: '日语',
    fr: 'Japonais',
    es: 'Japonés',
    de: 'Japanisch',
    ru: 'Японский',
  },
)

console.log('pronoun tables ok')
