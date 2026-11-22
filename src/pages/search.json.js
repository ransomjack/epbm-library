import { library, chapters } from '../lib/books.js';

export function GET() {
  const index = chapters.map((c) => {
    const s = library.find((x) => x.slug === c.subject);
    return {
      title: c.title, kicker: c.kicker, subject: s.name, url: `/${c.subject}/${c.slug}/`,
      text: [c.title, c.kicker, s.name, c.description || '', ...(c.takeaways || []), c.terms].join(' ').toLowerCase(),
      heads: c.headings.map((h) => ({ t: h.text, id: h.slug })),
    };
  });
  for (const s of library) if (s.quiz) index.push({ title: `${s.questions} practice questions`, kicker: 'Practice', subject: s.name, url: `/${s.slug}/quiz/`, text: `practice mcqs quiz questions ${s.name}`.toLowerCase(), heads: [] });
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
}
