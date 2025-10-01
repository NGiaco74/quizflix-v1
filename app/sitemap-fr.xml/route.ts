import { getAllQuizzes } from '@/lib/quiz';

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const quizzes = getAllQuizzes('fr');

  const urls = [
    { loc: `${baseUrl}/fr`, priority: '1.0' },
    { loc: `${baseUrl}/fr/jeux-video`, priority: '0.8' },
    { loc: `${baseUrl}/fr/legal/privacy`, priority: '0.3' },
    { loc: `${baseUrl}/fr/legal/cookies`, priority: '0.3' },
    ...quizzes.map((quiz) => ({
      loc: `${baseUrl}/fr/quiz/${quiz.slug}`,
      priority: '0.7',
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="en" href="${loc.replace('/fr/', '/en/')}" />
    <priority>${priority}</priority>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}


