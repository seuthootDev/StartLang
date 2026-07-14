# Quiz datasets

Each learning language owns its drills. Shared “Basic” curriculum steps appear
in the sidebar for every language; fill JSON when ready.

```
data/
  ko/
    alphabet.json
    pronouns.json      # planned
    numbers.json       # planned
    time.json
    weekdays.json      # planned
    questions.json     # planned
    demonstratives.json # planned
    ordinals.json
    months.json
    dates.json         # planned
  ja/
    ...
  es/                  # later language-specific extras
    gender.json
```

## Level groups

Sidebar groups (collapsible):

1. **Basic** — shared 10-step beginner TOC  
2. **Intermediate** — coming soon  
3. **Advanced** — coming soon  

## Basic curriculum (shared TOC)

1. alphabet — Alphabet & Phonetics  
2. pronouns — Personal Pronouns  
3. numbers — Cardinal Numbers  
4. time — Time  
5. weekdays — Days & Time Frames  
6. questions — Question Words  
7. demonstratives — Demonstratives & Directions  
8. ordinals — Ordinal Numbers  
9. months — Months & Seasons  
10. dates — Dates  

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
