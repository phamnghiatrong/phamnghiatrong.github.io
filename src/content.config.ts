import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { blogTag, localized, projectStatus } from './lib/schemas';

/**
 * Project hiện trên trang Hồ sơ và ghi chú thêm cho trang chi tiết project.
 * Mỗi file src/content/projects/<repo>.md là một project; phần thân (dưới dấu ---) là ghi chú, có thể bỏ trống.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    repo: z.string(),
    /** Thứ tự trên trang Hồ sơ (số nhỏ đứng trước). */
    order: z.number().default(99),
    /** true = hiện trên trang Hồ sơ. */
    featured: z.boolean().default(false),
    /** Thời gian, vd. "10 – 12/2026". */
    period: z.string(),
    status: projectStatus,
    stack: z.array(z.string()).default([]),
    title: localized,
    description: localized,
  }),
});

/**
 * Bài blog: src/content/blog/<ngôn ngữ>/<tên-bài>.md
 * Viết bản tiếng Việt (vi/) trước; bản dịch đặt cùng tên file trong en/ hoặc zh-hant/.
 */
/** Ô tuỳ chọn mà trang quản trị lưu thành chuỗi rỗng → coi như không có */
const emptyToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1, 'Thiếu tiêu đề (title)'),
      description: z.string().min(1, 'Thiếu câu tóm tắt (description)'),
      /** Ngày đăng, dạng 2026-10-05 */
      date: z.coerce.date(),
      /** Ngày sửa lớn gần nhất (tùy chọn) */
      updated: z.preprocess(emptyToUndefined, z.coerce.date().optional()),
      /** Một hoặc nhiều trụ cột: lab, automation, optimization, language, journey */
      tags: z.array(blogTag).min(1, 'Cần ít nhất một trụ cột trong tags'),
      /** Ảnh bìa, đường dẫn tương đối tới file .md, vd. ./images/vlan.png (tùy chọn) */
      cover: z.preprocess(emptyToUndefined, image().optional()),
      /** Mô tả ảnh bìa cho người dùng trình đọc màn hình (nên có nếu có ảnh bìa) */
      coverAlt: z.preprocess(emptyToUndefined, z.string().optional()),
      /** Kênh đăng gốc, vd. "LinkedIn", "YouTube" (tùy chọn) */
      channel: z.preprocess(emptyToUndefined, z.string().optional()),
      /** true = bản nháp: chỉ hiện khi chạy thử trên máy (npm run dev), không lên website */
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, blog };
