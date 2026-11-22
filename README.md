# EPBM Library

**Live site: [library.girder.in](https://library.girder.in)**

EPBM Library holds the class notes from the Executive Programme in Business Management at IIM Calcutta (EPBM-32), turned into one free online book per subject. Each class session is a chapter. Every chapter keeps the professor's examples and the class discussion, and adds diagrams and short exercises you can try in the browser. Each subject also has a practice-question set and a downloadable PDF.

There is no sign-in, no account and no tracking. Anything the site saves (your theme and text size, your reading progress, and the name on your score card) stays in your own browser.

---

## Contents

- [What's inside](#whats-inside)
- [Features](#features)
- [How it was built](#how-it-was-built)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [How the content works](#how-the-content-works)
- [Interactive components](#interactive-components)
- [Practice questions](#practice-questions)
- [Sharing](#sharing)
- [Run it locally](#run-it-locally)
- [Deployment](#deployment)
- [Testing and checks](#testing-and-checks)
- [Adding a new subject](#adding-a-new-subject)
- [Content principles](#content-principles)
- [Editor](#editor)
- [Licence](#licence)

---

## What's inside

| Subject | Chapters | Practice questions |
|---|---:|---:|
| Global Political Economy | 4 | 96 |
| Business Decision Making | 8 | 327 |
| Market Economies & Macroeconomic Policies | 9 | 217 |
| Financial Reporting & Cost Accounting | 5 | 315 |
| Leadership and People Skills | 5 | 350 |
| Operational Excellence | 6 | 200 |
| Digital Transformation | 7 | 130 |
| **Total** | **44** | **1,635** |

That adds up to 122 interactive exercises across the seven books. Marketing Management and AI/ML and Business Analytics show as "Coming soon" and will be added after those modules.

Every book ends with a **Quick Reference** chapter: the formulas, frameworks and one-line summaries from the whole subject in one place.

## Features

**Reading**
- One book per subject, one chapter per class session, in the order it was taught.
- Each chapter opens with a short summary and closes with its key takeaways.
- Reading time and the number of exercises are shown for every chapter.
- Light, sepia and dark themes, adjustable text size and a choice of serif or sans-serif text.
- Reading progress is remembered: finished chapters are ticked, each subject shows how many chapters you've read, and the home page offers "Continue reading" with the next chapter to open.
- Search across all subjects from the home page.
- A downloadable PDF of the full notes for each subject.

**Learning by doing**
- **Decide:** a scenario from class with two or three options. Pick one and see why it's right or wrong.
- **Sort:** classify a set of items (for example, motivator or hygiene factor) and get feedback on each.
- **Calculators:** sliders for the models taught in class, such as break-even, EOQ, the newsvendor model, Little's Law, queues, confidence intervals, regression, Bayes, real interest rates, CPI and hedging.
- **Visual explainers:** decision trees, flows, value chains, quadrants, timelines, waterfalls and similar diagrams built in code, so they stay sharp on any screen.

**Practice and sharing**
- A practice-question page for every subject, split into sections, with an explanation for every answer.
- At the end, readers can add their name and share their score as an image card to WhatsApp or LinkedIn, or copy the message.
- Every subject page and chapter has its own WhatsApp, LinkedIn and copy-link buttons.
- Every subject has its own preview image, so shared links look right on WhatsApp and LinkedIn.

## How it was built

1. **Notes first.** Abhinav wrote detailed master notes for every subject during the programme. They are the single source for the site.
2. **Notes to chapters.** The master notes were restructured into chapters with Claude (Anthropic's AI assistant). The aim was easier reading, not a shorter summary: every topic taught in class is kept, with its narrative, classroom examples and worked numbers.
3. **Exercises added.** Where a concept is easier to learn by trying, a Decide, Sort or calculator exercise was added next to it.
4. **Checked against the source.** Each subject was checked against its master notes so that nothing taught in class was dropped. Worked numbers were recalculated and recent-news examples were checked against public sources. Anything that couldn't be verified was left out.
5. **Tested.** Every page was tested on phone, tablet and desktop widths before release (see [Testing and checks](#testing-and-checks)).

Most of the code and the chapter layout were written with Claude. The notes, the subject matter and the editorial decisions are Abhinav's.

## Tech stack

| Part | Choice | Why |
|---|---|---|
| Framework | [Astro 5](https://astro.build) | Builds plain static HTML, so pages are fast and there's no server to run |
| Content | [MDX](https://mdxjs.com) | Chapters are written as Markdown, with interactive components placed inline |
| Interactivity | Small inline scripts in each component | No front-end framework is needed, so very little JavaScript is shipped |
| Styling | Plain CSS with custom properties | Makes theming (light, sepia, dark) and text sizing simple |
| Fonts | Literata (reading) and Inter (interface) | Easy to read in long passages |
| Hosting | Cloudflare Pages | Free, global CDN, and deploys automatically from GitHub |
| Preview images | Python + Playwright (`scripts/make_og.py`) | Renders the 1200×630 share image for each subject |

There is no backend, no database and no analytics script.

## Project structure

```
epbm-library/
├── astro.config.mjs          Site URL and MDX integration
├── public/
│   ├── _redirects            Cloudflare redirects for renamed pages
│   ├── robots.txt
│   ├── favicon.svg
│   ├── img/                  Editor photo
│   ├── og/                   Share preview image for each subject
│   └── pdf/                  Downloadable master notes, one per subject
├── scripts/
│   └── make_og.py            Generates the preview images in public/og/
└── src/
    ├── books/<subject>/      The chapters: NN-chapter-name.mdx
    ├── components/
    │   ├── Cover.astro       Book cover shown on the home page
    │   ├── Share.astro       WhatsApp / LinkedIn / copy-link row
    │   └── d/                66 diagram, exercise and calculator components
    ├── data/
    │   ├── subjects.js       Subject list, order, colours, blurbs, PDF and image paths
    │   └── quiz/<subject>.json   Practice questions
    ├── layouts/Base.astro    Page shell: header, reading settings, footer, reading progress
    ├── lib/books.js          Loads chapters, reading time and exercise counts
    ├── pages/
    │   ├── index.astro       Home page with search and the bookshelf
    │   ├── editor.astro      About the editor
    │   ├── [subject]/index.astro     Subject page (table of contents)
    │   ├── [subject]/[chapter].astro Chapter page
    │   ├── [subject]/quiz.astro      Practice questions and score card
    │   ├── search.json.js    Builds the search index
    │   └── sitemap.xml.js
    └── styles/diagrams.css   Shared styles for the components
```

## How the content works

Each chapter is one MDX file in `src/books/<subject-slug>/`. The number in the file name sets the order, and the rest of the name becomes the URL:

```
src/books/operational-excellence/03-inventory.mdx
→ https://library.girder.in/operational-excellence/inventory/
```

Every chapter starts with frontmatter:

```yaml
---
title: Make-to-Stock, Make-to-Order and Inventory
kicker: Session 3
order: 3
source: "Session by Prof. Balram Avittathur · Operational Excellence"
description: "One or two sentences, used for search results and link previews."
takeaways:
  - "Most of what we consume is made to stock, because capital demands high utilisation."
  - "Lot size follows holding cost. Safety stock follows supply risk."
---
```

The body is ordinary Markdown with components imported where needed:

```mdx
import Decide from '../../components/d/Decide.astro';

## The bottleneck

Output is set by the slowest step...

<Decide q="A vendor offers software that speeds up every other step by 30%. Do you buy it?" options={[
  { label: 'Yes. Faster steps mean more output.', why: 'Work just piles up in front of the bottleneck.' },
  { label: 'No. Fix the approval step first.', good: true, why: 'Capacity added anywhere except the bottleneck is wasted.' },
]} />
```

A subject appears as a book on the home page as soon as its folder has at least one chapter. Until then it shows as "Coming soon".

## Interactive components

All 66 live in `src/components/d/`. The main types:

| Type | Examples | Use |
|---|---|---|
| Exercises | `Decide`, `Sort` | Apply a concept to a scenario and get instant feedback |
| Calculators | `BreakEven`, `EoqCalc`, `Newsvendor`, `LittleCalc`, `QueueCalc`, `CiCalc`, `RegCalc`, `BayesCalc`, `RealRate`, `CpiCalc`, `HedgeCalc` | Move the sliders and watch the model respond |
| Diagrams | `Fig`, `Flow`, `Steps`, `Tree`, `Quad`, `Bars`, `Timeline`, `Waterfall`, `Pyramid`, `ValueChain` | Explain structure, sequence or comparison |
| Layout | `Cards`, `Tabs` | Group related ideas without long lists |

Each component is self-contained: its own markup, styles and a few lines of script. Nothing is loaded from outside the site except the fonts.

## Practice questions

Questions live in `src/data/quiz/<subject-slug>.json`:

```json
{
  "title": "Operational Excellence",
  "sections": [
    {
      "name": "Process analysis",
      "questions": [
        {
          "tag": "Session 2",
          "q": "Where does extra capacity raise a process's output?",
          "options": ["At any step", "At the bottleneck", "At the first step", "At the last step"],
          "answer": 1,
          "why": "Output is set by the bottleneck, so only capacity added there raises it."
        }
      ]
    }
  ]
}
```

`answer` is the zero-based index of the correct option. Readers can take all the questions or one section at a time.

## Sharing

Sharing is built to help the site spread without asking anyone to sign up.

- **Subject and chapter pages:** a share row with WhatsApp, LinkedIn and Copy link, with a pre-written message.
- **Practice score:** at the end of a quiz, the reader can type their name and the site draws a score card image (1200×630) in the browser. On phones the card can be shared straight to WhatsApp or any app. On desktop it can be downloaded and attached to a LinkedIn post. The name is stored only in that browser.
- **Tracking:** shared links carry `utm_source` and `utm_medium=score-share` tags, so visits from shares can be counted later if web analytics is turned on in Cloudflare.

## Run it locally

You need Node.js 22 (see `.nvmrc`).

```bash
git clone https://github.com/ransomjack/epbm-library.git
cd epbm-library
npm install
npm run dev        # local preview at http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve the built site
```

To regenerate the share preview images after changing a subject's title or question count:

```bash
pip install playwright && playwright install chromium
python3 scripts/make_og.py
```

## Deployment

The site is hosted on **Cloudflare Pages**, connected to this repository.

- Every push to `main` triggers a build (`npm run build`), and Cloudflare publishes `dist/` worldwide in about two minutes.
- The custom domain `library.girder.in` points to the Pages project.
- Renamed or removed pages are redirected through `public/_redirects`, so old links keep working.
- `sitemap.xml` and `robots.txt` are generated so search engines can index every chapter.

## Testing and checks

Before each release the whole site was checked with a headless browser (Playwright):

- All 60 pages at five widths (360, 390, 768, 1024 and 1440 px): every page loads, nothing overflows sideways, and no script errors appear.
- Every Decide and Sort exercise is clicked through to confirm it responds.
- Every calculator slider is pushed to its limits to confirm no result breaks (no "NaN").
- Every internal link is checked.
- Every practice question is validated: it has options, a correct answer in range and an explanation.
- Worked numbers in the chapters are recalculated.

## Adding a new subject

1. Add or update the subject in `src/data/subjects.js` (slug, colour, name, blurb, PDF path, preview image path).
2. Create `src/books/<slug>/` and add chapters as `01-name.mdx`, `02-name.mdx` and so on, ending with a Quick Reference chapter.
3. Add `src/data/quiz/<slug>.json` with the practice questions.
4. Put the master-notes PDF in `public/pdf/` and generate the preview image with `scripts/make_og.py`.
5. Run `npm run build` to check it, then push to `main`.

## Content principles

- **Nothing taught in class is dropped.** The site reorganises the notes for reading; it doesn't cut them down.
- **Plain English.** Short sentences, terms explained when they first appear, examples before formulas.
- **The classroom stays in.** Professors' examples, case discussions and questions from batchmates are kept, because that is where most of the learning happened.
- **Own notes only.** The site contains Abhinav's notes and nothing else. Faculty slides, case PDFs, readings and spreadsheets are not published here.
- **Checked facts.** Recent-news examples are kept only if they can be verified from public sources.
- **No exam framing.** The books are for understanding the subject, not for spotting exam questions.

## Editor

Edited by **Abhinav Roy**, EPBM-32, IIM Calcutta. Abhinav works in OT/ICS cybersecurity and also edits [Industrial Cyber Brief](https://brief.girder.in).

More about the editor: [library.girder.in/editor](https://library.girder.in/editor/)

These are personal class notes, shared to help batchmates and anyone studying the same topics. If you spot a mistake, please get in touch through the editor page.

## Licence

The **code** (layouts, pages, components, styles, scripts and configuration) is released under the [MIT License](LICENSE), so you're welcome to reuse it for your own notes site.

The **notes content** (the chapters in `src/books/`, the practice questions in `src/data/quiz/`, the PDFs and the images) is © 2026 Abhinav Roy, all rights reserved. It's free to read and to link to, but please ask before copying or republishing it.
