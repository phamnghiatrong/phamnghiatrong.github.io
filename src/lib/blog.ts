/**
 * Gom bài blog theo tên file và chọn bản đúng ngôn ngữ.
 *
 * src/content/blog/vi/abc.md        → bản gốc tiếng Việt (bắt buộc)
 * src/content/blog/en/abc.md        → bản tiếng Anh (tùy chọn)
 * src/content/blog/zh-hant/abc.md   → bản 繁中 (tùy chọn)
 *
 * Người xem /en/blog/abc/ mà chưa có bản tiếng Anh thì thấy bản tiếng Việt kèm dòng thông báo.
 */
import { readFileSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, LOCALES, isLocale, localizePath, type Locale } from '../i18n';
import { BLOG_TAGS, type BlogTag } from './schemas';

export type BlogEntry = CollectionEntry<'blog'>;

export interface Post {
  /** Tên file không đuôi, dùng làm đường dẫn: /blog/<slug>/ */
  slug: string;
  /** Bản hiển thị: bản dịch nếu có, không thì bản tiếng Việt */
  entry: BlogEntry;
  /** Ngôn ngữ của nội dung đang hiển thị */
  contentLocale: Locale;
  /** true = có bản dịch đúng ngôn ngữ đang xem */
  translated: boolean;
  /** Các ngôn ngữ đã có bản của bài này */
  available: Locale[];
  href: string;
}

interface Group {
  slug: string;
  versions: Partial<Record<Locale, BlogEntry>>;
}

let cache: Promise<Group[]> | undefined;

/** Bản nháp (draft: true) chỉ hiện khi chạy `npm run dev`. */
function isVisible(entry: BlogEntry) {
  return import.meta.env.DEV || !entry.data.draft;
}

/**
 * Bộ đọc YAML tự "cộng dồn" ngày không có thật (vd. 2026-13-45 thành 14/02/2027) mà không báo lỗi.
 * Đọc lại dòng date / updated trong file gốc và kiểm tra ngày có thật trên lịch.
 */
function checkDates(entry: BlogEntry) {
  if (!entry.filePath) return;
  const raw = readFileSync(entry.filePath, 'utf-8');
  const head = raw.split(/^---\s*$/m)[1] ?? '';
  for (const key of ['date', 'updated']) {
    const m = head.match(new RegExp(`^${key}:\\s*["']?(\\d{4})-(\\d{1,2})-(\\d{1,2})`, 'm'));
    if (!m) continue;
    const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const date = new Date(Date.UTC(y, mo - 1, d));
    if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) {
      throw new Error(
        `Bài "${entry.id}": ngày ${key}: ${m[1]}-${m[2]}-${m[3]} không có thật. Ghi dạng năm-tháng-ngày, vd. 2026-10-05.`,
      );
    }
  }
}

async function loadGroups(): Promise<Group[]> {
  const entries = await getCollection('blog', isVisible);
  const groups = new Map<string, Group>();

  for (const entry of entries) {
    checkDates(entry);
    const [lang, ...rest] = entry.id.split('/');
    if (!isLocale(lang) || rest.length === 0) {
      throw new Error(
        `Bài blog "${entry.id}" phải nằm trong thư mục ngôn ngữ: src/content/blog/vi/, en/ hoặc zh-hant/.`,
      );
    }
    const slug = rest.join('/');
    const group = groups.get(slug) ?? { slug, versions: {} };
    group.versions[lang] = entry;
    groups.set(slug, group);
  }

  for (const group of groups.values()) {
    if (!group.versions[DEFAULT_LOCALE]) {
      const has = Object.keys(group.versions).join(', ');
      throw new Error(
        `Bài "${group.slug}" có bản ${has} nhưng chưa có bản tiếng Việt. ` +
          `Hãy tạo src/content/blog/vi/${group.slug}.md trước (hoặc đặt draft: true cho bản dịch).`,
      );
    }
  }

  return [...groups.values()].sort(
    (a, b) => b.versions.vi!.data.date.getTime() - a.versions.vi!.data.date.getTime(),
  );
}

function toPost(group: Group, locale: Locale): Post {
  const own = group.versions[locale];
  const entry = own ?? group.versions[DEFAULT_LOCALE]!;
  return {
    slug: group.slug,
    entry,
    contentLocale: own ? locale : DEFAULT_LOCALE,
    translated: !!own,
    available: LOCALES.filter((l) => group.versions[l]),
    href: localizePath(locale, `/blog/${group.slug}/`),
  };
}

/** Mọi bài, mới nhất trước, theo ngôn ngữ đang xem. */
export async function getPosts(locale: Locale): Promise<Post[]> {
  cache ??= loadGroups();
  return (await cache).map((g) => toPost(g, locale));
}

/** Đếm số bài theo trụ cột. */
export function countByTag(posts: Post[]): Record<BlogTag, number> {
  const counts = Object.fromEntries(BLOG_TAGS.map((t) => [t, 0])) as Record<BlogTag, number>;
  for (const post of posts) for (const tag of post.entry.data.tags) counts[tag]++;
  return counts;
}

/** Bài liên quan: cùng trụ cột trước, thiếu thì lấy bài mới nhất. */
export function relatedPosts(current: Post, posts: Post[], limit = 3): Post[] {
  const others = posts.filter((p) => p.slug !== current.slug);
  const tags = new Set(current.entry.data.tags);
  const sameTag = others.filter((p) => p.entry.data.tags.some((t) => tags.has(t)));
  const rest = others.filter((p) => !sameTag.includes(p));
  return [...sameTag, ...rest].slice(0, limit);
}

const DATE_FORMAT: Record<Locale, Intl.DateTimeFormatOptions & { locale: string }> = {
  vi: { locale: 'vi-VN', day: '2-digit', month: '2-digit', year: 'numeric' },
  en: { locale: 'en-GB', day: 'numeric', month: 'short', year: 'numeric' },
  'zh-hant': { locale: 'zh-TW', year: 'numeric', month: 'long', day: 'numeric' },
};

/** 05/10/2026 · 5 Oct 2026 · 2026年10月5日 */
export function formatPostDate(date: Date, locale: Locale): string {
  const { locale: tag, ...options } = DATE_FORMAT[locale];
  return new Intl.DateTimeFormat(tag, { ...options, timeZone: 'UTC' }).format(date);
}

/**
 * Số phút đọc ước tính từ nội dung Markdown.
 * Chữ Hán đếm theo ký tự (~350 chữ/phút), chữ Latin/Việt đếm theo từ (~220 từ/phút).
 */
export function readingMinutes(markdown: string | undefined): number {
  if (!markdown) return 1;
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|-]/g, ' ');
  const han = (text.match(/\p{Script=Han}/gu) ?? []).length;
  const words = text.replace(/\p{Script=Han}/gu, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220 + han / 350));
}
