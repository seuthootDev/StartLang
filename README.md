# LangStart

When you start a language, some things are not “hard grammar” — they are just **annoying to memorize**.

English month names for many Asian learners. Irregular day readings in Japanese. Gendered demonstratives in Russian. You can often get by without drilling them… until you cannot. Textbooks assume you somehow already know them. LangStart collects that pile and turns it into **short quizzes you can finish**.

**Drill the must-know basics until they stick.**

**Live:** [https://start-lang-liart.vercel.app/](https://start-lang-liart.vercel.app/)

---

## Contents

1. [Why this exists](#why-this-exists)
2. [How the quizzes work](#how-the-quizzes-work)
3. [Preview](#preview)
4. [What you can practice now](#what-you-can-practice-now)
5. [Where we want to go](#where-we-want-to-go)
6. [Run locally](#run-locally)
7. [Search / indexing](#search--indexing)
8. [Contributing](#contributing)
9. [License](#license)
10. [Updates](#updates)

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

Japanese also has a separate **JLPT vocabulary** hub (N5–N1, ~20 words per day) — a larger drill track, not part of the short basics pack.

Content lives in plain JSON under [`src/data/`](src/data/).

---

## Where we want to go

### Design per language

Each learning shell should feel like **that country’s world**, not a generic app skin.

Today that means **full-bleed illustrations** behind frosted header / sidebar / content panels, with a small **per-language color palette**. Later we want something more characteristic — motion, motifs, layout quirks — but the concrete ideas are still open. Contributions and experiments are welcome.

### Content depth

**Intermediate** and **advanced** tracks exist as groups in the sidebar, but **what belongs there is not settled yet**. Language-specific “annoying but must-memorize” packs (gender, full case systems, …) will likely grow there when we know how to scope them. Large exam-style vocab sets stay on **separate hubs** (like Japanese JLPT) so the basics sidebar stays short.

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

## Search / indexing

Temporary production host (custom domain later):
[https://start-lang-liart.vercel.app/](https://start-lang-liart.vercel.app/)

Already in the repo for crawlers:

- [`public/robots.txt`](public/robots.txt)
- [`public/sitemap.xml`](public/sitemap.xml)
- Open Graph + canonical tags in [`index.html`](index.html)

**Next step for you:** [Google Search Console](https://search.google.com/search-console) → add URL prefix `https://start-lang-liart.vercel.app/` → verify → submit `https://start-lang-liart.vercel.app/sitemap.xml`.

This is a client-rendered SPA, so rankings will be modest until pages are prerendered or a custom domain is locked in. Indexing the home and language hubs is still worth doing now.

---

## Contributing

Almost everything you practice is **JSON** in `src/data/{lang}/`.

If you spot a wrong sound, translation, or table cell — a typo, a bad approximation, a missing learner language — please fix it or open an issue. Native speakers and careful proofreaders are especially welcome; datasets grow one correction at a time.

Theme art lives under `public/assets/{lang}/`.

Thank you for helping learners start stronger.

---

## License

LangStart is open source under the [MIT License](LICENSE).

The project is meant to stay free to use — no ads planned. Support, if you want to give it, is welcome through donations later (for example GitHub Sponsors). Code, quizzes, and corrections from learners and developers are the main way the project grows.

Some vocabulary datasets credit upstream sources (for example OpenJLPT / EDRDG materials) in their generators or notes; those upstream terms still apply to the original data where required.

---

## Updates

Newest first. Add a dated entry whenever something meaningful ships.

### 2026-08-03 (FR / ES / IT / DE basics)

- French, Spanish, Italian, and German basics wired through demonstratives (alphabet → pronouns → numbers → time/calendar → questions → demonstratives).
- German also gets a separate **Dates** quiz (`am ersten` … ordinals); FR/ES/IT keep date writing as a months-table reference instead.
- Hub backgrounds for **fr / es / it / de**; JA/KO asset names normalized to `bg_ja` / `bg_ko`.
- Number/date combo rules extended for Romance + German compounds (no JA fallthrough for unknown langs).

### 2026-08-02 (JLPT hub)

- Japanese JLPT vocabulary moved out of the sidebar tree onto `/ja/vocab` (level + day hub).
- Quiz day navigation lives on the quiz page; basics sidebar stays short.

### 2026-08-02 (SEO scaffold)

- `robots.txt`, `sitemap.xml`, stronger meta/OG/canonical for the Vercel host.
- SPA rewrite via `vercel.json`.
- Russian learn-shell paper shifted to ivory to match the illustration.

### 2026-08-02

- Russian basics wired through demonstratives (alphabet → pronouns → numbers → time/calendar → dates → questions → demonstratives).
- Learn-shell themes: background illustrations + frosted UI for **ko / ja / ru**, with per-language accent colors.
- Question-word and demonstrative reference tables reshaped (meaning charts + form lists), aligned with pronoun-style tables.

### Template for the next entry

```markdown
### YYYY-MM-DD

- …
```
