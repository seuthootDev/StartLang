import { readFileSync, writeFileSync } from 'fs'

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
  en: 'Sound',
  ko: '발음',
  ja: '読み',
  zh: '发音',
  fr: 'Prononciation',
  es: 'Pronunciación',
  de: 'Aussprache',
  ru: 'Произношение',
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

const packs = {
  ko: {
    title: {
      en: 'Demonstratives & directions',
      ko: '지시대명사·방향',
      ja: '指示詞・方向',
      zh: '指示词与方向',
      fr: 'Démonstratifs & directions',
      es: 'Demostrativos y direcciones',
      de: 'Demonstrativa & Richtungen',
      ru: 'Указательные и направления',
    },
    note: {
      en: '이/그/저 distance system plus basic place words.',
      ko: '이·그·저 거리 체계와 기본 방향어.',
      ja: '이/그/저 の距離体系と基本の方向語。',
      zh: '이/그/저 距离体系与基本方位词。',
      fr: 'Systeme i/geu/jeo et directions de base.',
      es: 'Sistema i/geu/jeo y direcciones basicas.',
      de: 'i/geu/jeo-System und Grundrichtungen.',
      ru: 'Система и/гы/чо и базовые направления.',
    },
    rules: {
      en: [
        '이 = near me, 그 = near you / already known, 저 = far from both.',
        '이것/그것/저것 are the thing forms; spoken often shorten to 이거/그거/저거.',
        '여기/거기/저기 and 이쪽/그쪽/저쪽 follow the same distance pattern.',
      ],
      ko: [
        '이=화자 쪽, 그=청자·이미 알려진 것, 저=둘에서 먼 곳.',
        '이것/그것/저것은 사물형; 회화에서는 이거/그거/저거가 흔합니다.',
        '여기/거기/저기, 이쪽/그쪽/저쪽도 같은 거리 패턴입니다.',
      ],
      ja: [
        '이＝話し手寄り、그＝相手寄り・既出、저＝両者から遠い。',
        '이것/그것/저것がもの。会話では 이거/그거/저거 が多い。',
        '여기/거기/저기、이쪽/그쪽/저쪽も同じ距離パターン。',
      ],
      zh: [
        '이靠近说话人，그靠近听者/已知，저两者都远。',
        '이것/그것/저것是事物形式；口语常说 이거/그거/저거。',
        '여기/거기/저기 与 이쪽/그쪽/저쪽 同一距离模式。',
      ],
      fr: [
        '이 = pres de moi, 그 = pres de toi / connu, 저 = loin.',
        '이것/그것/저것 = objets ; oral: 이거/그거/저거.',
        '여기/거기/저기 et 이쪽/그쪽/저쪽 suivent la meme distance.',
      ],
      es: [
        '이 = cerca de mi, 그 = cerca de ti / conocido, 저 = lejos.',
        '이것/그것/저것 = cosas; oral: 이거/그거/저거.',
        '여기/거기/저기 y 이쪽/그쪽/저쪽 siguen la misma distancia.',
      ],
      de: [
        '이 = bei mir, 그 = bei dir / bekannt, 저 = weit weg.',
        '이것/그것/저것 = Dinge; mundlich oft 이거/그거/저거.',
        '여기/거기/저기 und 이쪽/그쪽/저쪽 folgen demselben Abstand.',
      ],
      ru: [
        '이 = рядом со мной, 그 = у тебя / известное, 저 = далеко.',
        '이것/그것/저것 — предметы; в речи часто 이거/그거/저거.',
        '여기/거기/저기 и 이쪽/그쪽/저쪽 — та же схема расстояния.',
      ],
    },
  },
  ja: {
    title: {
      en: 'Demonstratives & directions',
      ko: '지시대명사·방향',
      ja: '指示詞・方向',
      zh: '指示词与方向',
      fr: 'Démonstratifs & directions',
      es: 'Demostrativos y direcciones',
      de: 'Demonstrativa & Richtungen',
      ru: 'Указательные и направления',
    },
    note: {
      en: 'こ/そ/あ distance system plus basic place words.',
      ko: 'こ·そ·あ 거리 체계와 기본 방향어.',
      ja: 'こ・そ・あ の距離体系と基本の方向語。',
      zh: 'こ/そ/あ 距离体系与基本方位词。',
      fr: 'Systeme ko/so/a et directions de base.',
      es: 'Sistema ko/so/a y direcciones basicas.',
      de: 'ko/so/a-System und Grundrichtungen.',
      ru: 'Система ко/со/а и базовые направления.',
    },
    rules: {
      en: [
        'こ = near me, そ = near you / known, あ = far from both. ど- forms ask questions (どれ, どこ).',
        'これ/それ/あれ stand alone; この/その/あの need a noun after them.',
        'こちら/そちら/あちら are polite; casual こっち/そっち/あっち are common in speech.',
      ],
      ko: [
        'こ=화자 쪽, そ=청자·이미 알려진 것, あ=둘에서 먼 곳. ど-는 의문(どれ, どこ).',
        'これ/それ/あれ는 단독; この/その/あの는 뒤에 명사가 필요합니다.',
        'こちら/そちら/あちら는 공손형; 회화에서는 こっち/そっち/あっち도 흔합니다.',
      ],
      ja: [
        'こ＝話し手寄り、そ＝相手寄り・既出、あ＝遠い。ど系は疑問（どれ・どこ）。',
        'これ/それ/あれは単独。この/その/あのは後ろに名詞が必要。',
        'こちら/そちら/あちらは丁寧。会話では こっち/そっち/あっち も多い。',
      ],
      zh: [
        'こ靠近说话人，そ靠近听者/已知，あ两者都远。ど-表疑问（どれ、どこ）。',
        'これ/それ/あれ可单独用；この/その/あの后须接名词。',
        'こちら等较礼貌；口语常见 こっち/そっち/あっち。',
      ],
      fr: [
        'こ = pres de moi, そ = pres de toi / connu, あ = loin. ど- = questions.',
        'これ/それ/あれ seuls ; この/その/あの + nom.',
        'こちら... poli ; oral: こっち/そっち/あっち.',
      ],
      es: [
        'こ = cerca de mi, そ = cerca de ti / conocido, あ = lejos. ど- = preguntas.',
        'これ/それ/あれ solos; この/その/あの + sustantivo.',
        'こちら... cortes; oral: こっち/そっち/あっち.',
      ],
      de: [
        'こ = bei mir, そ = bei dir / bekannt, あ = weit. ど- = Fragen.',
        'これ/それ/あれ allein; この/その/あの + Nomen.',
        'こちら... hoflich; mundlich: こっち/そっち/あっち.',
      ],
      ru: [
        'こ = рядом со мной, そ = у тебя / известное, あ = далеко. ど- = вопросы.',
        'これ/それ/あれ сами по себе; この/その/あの + существительное.',
        'こちら... вежливо; в речи часто こっち/そっち/あっち.',
      ],
    },
  },
}

for (const target of ['ko', 'ja']) {
  const entries = JSON.parse(
    readFileSync(`src/data/${target}/demonstratives.json`, 'utf8'),
  )
  const pack = packs[target]
  const table = {
    table_id: `${target}_demonstratives_ref`,
    title: pack.title,
    note: pack.note,
    rules: pack.rules,
    columns: [
      { key: 'form', labels: formLabels(target) },
      { key: 'meaning', labels: meaningLabels },
      { key: 'sound', labels: soundLabels },
    ],
    rows: entries.map((e) => ({
      form: e.question_word,
      meaning: e.translations,
      sound: { ...e.pronunciations },
    })),
  }
  writeFileSync(
    `src/data/${target}/demonstratives.table.json`,
    `${JSON.stringify(table, null, 2)}\n`,
  )
  console.log('wrote', target, entries.length)
}
