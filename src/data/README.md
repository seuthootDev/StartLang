# Quiz datasets

Each learning language owns its drills. Shared “Basic” curriculum steps appear
in the sidebar for every language; fill JSON when ready.

```
data/
  ko/
    alphabet.json
    pronouns.json
    numbers.json
    time.json
    weekdays.json
    questions.json
    demonstratives.json
    ordinals.json
    months.json
    dates.json
  ja/
    ...
  es/                  # later language-specific extras
    gender.json
```

## Level groups

Sidebar groups (collapsible):

1. **Basic** — shared 10-step beginner TOC  
2. **Intermediate** — Japanese common kanji words (JMdict), more later  
3. **Advanced** — coming soon  

## Basic curriculum (shared TOC)

1. alphabet — Alphabet & Phonetics  
2. pronouns — Personal Pronouns  
3. numbers — Cardinal Numbers  
4. time — Time & Calendar Basics (day parts + relative days + months; weekdays/months JSON merged in)  
5. questions — Question Words  
6. demonstratives — Demonstratives & Directions  
7. dates — Dates (Japanese only: month 〜がつ readings + irregular day readings, separate cards)  
   Korean 년/월/일 and day samples are merged into `time`  
8. ordinals — Ordinal Numbers (JSON kept; not in sidebar yet — move into Numbers later)  
9. months / weekdays — merged into `time` (hidden routes redirect)  

## Reference tables

Optional chart popup for any category:

```
data/{lang}/{category}.table.json
```

Example (`ja/alphabet.table.json`):

```json
{
  "table_id": "ja_alphabet_ref",
  "title": { "en": "Hiragana reference", "ko": "히라가나 참고표" },
  "note": { "en": "Character → sound", "ko": "문자 → 발음" },
  "columns": [
    { "key": "char", "labels": { "en": "Character", "ko": "문자" } },
    { "key": "sound", "labels": { "en": "Sound", "ko": "발음" } }
  ],
  "rows": [
    { "char": "あ", "sound": { "en": "a", "ko": "아" } }
  ]
}
```

Cell values may be a plain string (same for every learner) or a
`{ "en": "...", "ko": "..." }` map resolved by the learner language.

Optional `rules` — localized bullet tips above the grid (composition,
irregulars like English *eleven* / *twelve*):

```json
"rules": {
  "en": ["11–99 = tens + ones (regular).", "Quiz adds 5 random compounds."],
  "ko": ["11–99는 십+일자리로 규칙적으로 만듭니다.", "퀴즈에 랜덤 조합 5문항."]
}
```

Register the file in `src/data/index.ts` (`TABLES`) to show the quiz **Table** button.

## Meaning quiz shape

```json
{
  "quiz_id": "ja_time_morning",
  "question_word": "朝",
  "pronunciations": {
    "en": "asa",
    "ko": "아사"
  },
  "translations": {
    "en": "morning",
    "ko": "아침"
  }
}
```

- `question_word` — always in the learning language (folder name)
- `pronunciations[learnerLang]` — how it sounds, written for the learner
- `translations[learnerLang]` — correct choice for meaning quizzes

## Japanese vocab (JLPT / OpenJLPT)

`scripts/gen-jlpt-vocab.mjs` reads `scripts/openjlpt/{n5..n1}.json`
([OpenJLPT](https://github.com/evanclan/OpenJLPT)) and writes
`ja/vocab.n5.json` … `vocab.n1.json` (+ tables, `vocab.manifest.json`).

- Levels N5→N1; each level split into **Day** chunks of **20 words**
- Readings in hiragana; meaning quiz uses learner-language glosses
- Routes: `/ja/vocab/:level/:day` (e.g. `/ja/vocab/n5/1`)
- After generate: `node scripts/translate-vocab-meanings.mjs`

Acknowledge: OpenJLPT dataset authors / upstream JLPT list sources.

## Gender quiz shape (language-specific, later)

```json
{
  "quiz_id": "gender_es_01",
  "question_word": "mesa",
  "pronunciations": { "en": "meh-sah", "ko": "메사" },
  "correct_gender": "feminine",
  "gender_options": ["masculine", "feminine"]
}
```
