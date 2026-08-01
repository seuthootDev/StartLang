# LangStart

When you start a language, some things are not “hard grammar” — they are just **annoying to memorize**.

English month names for many Asian learners. Irregular day readings in Japanese. Gendered demonstratives in Russian. You can often get by without drilling them… until you cannot. Textbooks assume you somehow already know them. LangStart collects that pile and turns it into **short quizzes you can finish**.

**Drill the must-know basics until they stick.**

---

## Contents

1. [Why this exists](#why-this-exists)
2. [How the quizzes work](#how-the-quizzes-work)
3. [Preview](#preview)
4. [What you can practice now](#what-you-can-practice-now)
5. [Where we want to go](#where-we-want-to-go)
6. [Run locally](#run-locally)
7. [Contributing](#contributing)
8. [Updates](#updates)

---

## Why this exists

Learning a language is full of small facts that are:

- **Irregular or opaque** (no neat rule to derive them)
- **High-frequency** once you need them
- **Easy to postpone** because they rarely block a whole conversation *today*

Example: English *January … December*. For many learners they are just twelve words to grind — not the core of communication, but worth the time *when* you finally sit down to memorize them. Same idea for alphabets, pronouns, numbers, question words, and the rest of the “basic pack.”

LangStart is a place that **gathers those items** and asks you to recall them in **your language**, so the loop stays short and honest.

---

## How the quizzes work

1. Choose the **language you are learning**.
2. Pick a **basic category** (alphabet, pronouns, numbers, time, …).
3. Answer in **your learner language** (meaning, sound, or typed input depending on the drill).
4. Misses are collected. You **retry only what you missed** — again and again — until the set is clean.

That retry loop is the point: if you stay until everything is correct, you have usually **almost memorized** the list.

Reference **tables** sit next to many categories (person charts, case sketches, distance grids, …) so you can peek at the system, then go back to drilling.

---

## Preview

<!-- Drop a short screen recording here when you have one. -->

![LangStart demo](docs/demo.gif)

_Placeholder — add `docs/demo.gif` (or replace the path) when a demo clip is ready._

---

## What you can practice now

**Learning languages (targets):** Korean, Japanese, Russian (more planned).

**Shared basic track** (availability depends on the language):

| Step | Category | Idea |
|------|----------|------|
| 1 | Alphabet & phonetics | Letters / kana / Cyrillic → sounds |
| 2 | Personal pronouns | Forms (+ language-specific charts) |
| 3 | Cardinal numbers | Bases + compounds / irregularities |
| 4 | Time & calendar basics | Time of day, weekdays, months |
| — | Dates | Where the calendar is *irregular* (e.g. JA / RU) |
| 5 | Question words | Who / what / where … |
| 6 | Demonstratives & directions | This / that / here / left–right … |

Japanese also has **JLPT vocabulary** (intermediate group) as a larger drill set.

Content lives in plain JSON under [`src/data/`](src/data/).

---

## Where we want to go

### Design per language

Each learning shell should feel like **that country’s world**, not a generic app skin.

Today that means **full-bleed illustrations** behind frosted header / sidebar / content panels, with a small **per-language color palette**. Later we want something more characteristic — motion, motifs, layout quirks — but the concrete ideas are still open. Contributions and experiments are welcome.

### Content depth

**Intermediate** and **advanced** tracks exist as groups in the sidebar, but **what belongs there is not settled yet**. Language-specific grammar (gender, full case systems, …) will likely grow as separate packs when we know how to scope them.

### More languages

Many targets are not implemented yet. The curriculum shape is shared; each language needs its own data (and, ideally, its own theme).

---

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Stack: Vite + React + TypeScript.

---

## Contributing

Almost everything you practice is **JSON** in `src/data/{lang}/`.

If you spot a wrong sound, translation, or table cell — a typo, a bad approximation, a missing learner language — please fix it or open an issue. Native speakers and careful proofreaders are especially welcome; datasets grow one correction at a time.

Theme art lives under `public/assets/{lang}/`.

Thank you for helping learners start stronger.

---

## Updates

Newest first. Add a dated entry whenever something meaningful ships.

### 2026-08-02

- Russian basics wired through demonstratives (alphabet → pronouns → numbers → time/calendar → dates → questions → demonstratives).
- Learn-shell themes: background illustrations + frosted UI for **ko / ja / ru**, with per-language accent colors.
- Question-word and demonstrative reference tables reshaped (meaning charts + form lists), aligned with pronoun-style tables.

### Template for the next entry

```markdown
### YYYY-MM-DD

- …
```
