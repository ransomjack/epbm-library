# EPBM Library

Study notes site for library.girder.in. Built with Astro; every note is a markdown file.

## Adding notes

- Subjects and their order live in `src/data/subjects.js`.
- Each chapter is a markdown file in `src/books/<subject-slug>/`, named `NN-chapter-name.md`, with `title`, `kicker` and `order` in its frontmatter.
- The downloadable PDF for a subject goes in `public/pdf/` and is linked from `subjects.js`.

## Running

    npm install
    npm run dev      # local preview
    npm run build    # static site in dist/
