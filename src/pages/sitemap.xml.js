import { library } from '../lib/books.js';

export function GET({ site }) {
  const paths = ['/', '/editor/'];
  for (const s of library) {
    if (!s.chapters.length) continue;
    paths.push(`/${s.slug}/`, ...s.chapters.map((c) => `/${s.slug}/${c.slug}/`));
    if (s.quiz) paths.push(`/${s.slug}/quiz/`);
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
