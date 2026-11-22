import { subjects } from '../data/subjects.js';

const mods = import.meta.glob('../books/*/*.{md,mdx}', { eager: true });
const raws = import.meta.glob('../books/*/*.{md,mdx}', { eager: true, query: '?raw', import: 'default' });
const TOOL = /<(Decide|Sort|\w+Calc|ProcessSim|Newsvendor|IsCircuit|Radar|Tabs|ValueChain|FactorialWall|SixFriends)\b/g;
const stats = (raw = '') => {
  const body = raw.replace(/^---[\s\S]*?---/, '').replace(/^import .*$/gm, '');
  const words = body.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  const tools = (body.match(TOOL) || []).length;
  const terms = [...new Set(body.replace(/<[^>]*>|[{}]/g, ' ').toLowerCase().match(/[a-z][a-z0-9&'’-]{2,}/g) || [])].join(' ');
  return { terms, minutes: Math.max(3, Math.round(words / 190 + tools * 0.7)), tools };
};
const quizzes = import.meta.glob('../data/quiz/*.json', { eager: true, import: 'default' });
const quizOf = (slug) => quizzes[`../data/quiz/${slug}.json`];

export const chapters = Object.entries(mods)
  .map(([path, m]) => {
    const [, subject, file] = path.match(/books\/([^/]+)\/([^/]+)\.mdx?$/);
    return {
      ...m.frontmatter,
      ...stats(raws[path]),
      subject,
      slug: file.replace(/^\d+-/, ''),
      Content: m.Content,
      headings: m.getHeadings().filter((h) => h.depth === 2),
    };
  })
  .sort((a, b) => a.order - b.order);

export const chaptersOf = (slug) => chapters.filter((c) => c.subject === slug);

export const library = subjects.map((s) => {
  const ch = chaptersOf(s.slug), quiz = quizOf(s.slug);
  return {
    ...s, chapters: ch, quiz,
    minutes: ch.reduce((n, c) => n + c.minutes, 0),
    tools: ch.reduce((n, c) => n + c.tools, 0),
    questions: quiz ? quiz.sections.reduce((n, x) => n + x.questions.length, 0) : 0,
  };
});
