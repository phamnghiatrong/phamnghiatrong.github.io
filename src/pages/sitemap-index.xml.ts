/** /sitemap-index.xml — trỏ tới sitemap chính (/sitemap-0.xml). */
import type { APIContext } from 'astro';

export function GET({ site }: APIContext) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${new URL('/sitemap-0.xml', site).href}</loc></sitemap>
</sitemapindex>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
