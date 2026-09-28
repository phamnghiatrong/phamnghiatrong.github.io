import { z } from 'astro/zod';

/**
 * Chuỗi hiển thị theo ngôn ngữ.
 * Ghi một chuỗi thường nếu 3 ngôn ngữ giống nhau (vd. "Python"),
 * hoặc { "vi": "...", "en": "...", "zh-hant": "..." } nếu khác nhau.
 */
export const localized = z.union([
  z.string(),
  z.object({
    vi: z.string(),
    en: z.string(),
    'zh-hant': z.string(),
  }),
]);
export type Localized = z.infer<typeof localized>;

/** Trạng thái project: đang làm / dự kiến / xong. */
export const projectStatus = z.enum(['dang-lam', 'du-kien', 'xong']);
export type ProjectStatus = z.infer<typeof projectStatus>;

/** Trạng thái chứng chỉ: đang ôn / đã đạt / kế hoạch. */
export const goalStatus = z.enum(['dang-on', 'dat', 'ke-hoach']);
export type GoalStatus = z.infer<typeof goalStatus>;

/** Năm trụ cột blog (tag cố định). Thêm trụ cột mới: thêm vào đây và vào src/i18n/*.json (blog.tags). */
export const BLOG_TAGS = ['lab', 'automation', 'optimization', 'language', 'journey'] as const;
export const blogTag = z.enum(BLOG_TAGS);
export type BlogTag = z.infer<typeof blogTag>;
