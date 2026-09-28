/**
 * Sitemap cho Google: chỉ liệt kê trang thật (canonical), kèm các bản ngôn ngữ (hreflang).
 * Bài blog chưa dịch sang EN / 繁中 thì không liệt kê bản đó (bản đó chỉ là bản tiếng Việt kèm thông báo).
 */
import type { APIContext } from 'astro';
import { DEFAULT_LOCALE, HTML_LANG, LOCALES, localizePath, type Locale } from '../i18n';
import { getPosts } from '../lib/blog';
import { getProjects } from '../lib/projects';
import { BLOG_TAGS } from '../lib/schemas';

interface Entry {
  /** Đường dẫn không có tiền tố ngôn ngữ, vd. "/blog/" */
  path: string;
  /** Các ngôn ngữ có trang này */
  locales: readonly Locale[];
  lastmod?: Date;
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET({ site }: APIContext) {
  const url = (locale: Locale, path: string) => escape(new URL(localizePath(locale, path), site).href);

  const entries: Entry[] = [
    { path: '/', locales: LOCALES },
    { path: '/projects/', locales: LOCALES },
    { path: '/blog/', locales: LOCALES },
    ...BLOG_TAGS.map((tag) => ({ path: `/blog/tag/${tag}/`, locales: LOCALES })),
    ...(await getProjects()).map((p) => ({
      path: `/projects/${p.slug}/`,
      locales: LOCALES,
      lastmod: p.github ? new Date(p.github.updatedAt) : undefined,
    })),
    ...(await getPosts(DEFAULT_LOCALE)).map((p) => ({
      path: `/blog/${p.slug}/`,
      locales: p.available,
      lastmod: p.entry.data.updated ?? p.entry.data.date,
    })),
  ];

  const urls = entries.flatMap((entry) =>
    entry.locales.map((locale) => {
      const alternates = [
        ...entry.locales.map(
          (l) => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[l]}" href="${url(l, entry.path)}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(DEFAULT_LOCALE, entry.path)}"/>`,
      ];
      return [
        '  <url>',
        `    <loc>${url(locale, entry.path)}</loc>`,
        entry.lastmod ? `    <lastmod>${entry.lastmod.toISOString().slice(0, 10)}</lastmod>` : '',
        ...alternates,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
