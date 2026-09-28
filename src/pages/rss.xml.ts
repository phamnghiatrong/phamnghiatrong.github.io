/** RSS blog (tiếng Việt): /rss.xml */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { useT } from '../i18n';
import { getPosts } from '../lib/blog';
import { profile } from '../lib/data';

export async function GET(context: APIContext) {
  const t = useT('vi');
  const posts = await getPosts('vi');

  return rss({
    title: t.blog.rssTitle.replace('{name}', profile.name),
    description: t.blog.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.entry.data.title,
      description: post.entry.data.description,
      pubDate: post.entry.data.date,
      link: `/blog/${post.slug}/`,
      categories: post.entry.data.tags.map((tag) => t.blog.tags[tag]),
    })),
    customData: '<language>vi</language>',
  });
}
