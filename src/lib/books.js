import { subjects } from '../data/subjects.js';

const mods = import.meta.glob('../books/*/*.md', { eager: true });

export const chapters = Object.entries(mods)
  .map(([path, m]) => {
    const [, subject, file] = path.match(/books\/([^/]+)\/([^/]+)\.md$/);
    return {
      ...m.frontmatter,
      subject,
      slug: file.replace(/^\d+-/, ''),
      Content: m.Content,
      headings: m.getHeadings().filter((h) => h.depth === 2),
    };
  })
  .sort((a, b) => a.order - b.order);

export const chaptersOf = (slug) => chapters.filter((c) => c.subject === slug);

export const library = subjects.map((s) => ({ ...s, chapters: chaptersOf(s.slug) }));
