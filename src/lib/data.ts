/**
 * Đọc và kiểm tra dữ liệu CV trong src/data/*.json.
 * Nếu một file ghi sai (thiếu mục, sai kiểu, email sai...), build dừng lại và báo rõ file nào, dòng nào sai.
 */
import { z } from 'astro/zod';
import type { Locale } from '../i18n';
import { goalStatus, localized, type Localized } from './schemas';

import profileJson from '../data/profile.json';
import careerJson from '../data/career.json';
import skillsJson from '../data/skills.json';
import educationJson from '../data/education.json';
import goalsJson from '../data/goals.json';
import siteJson from '../data/site.json';

/** Để trống hoặc ghi "ẨN" thì mục đó không hiện trên website. */
const optionalText = z.string().default('');

const profileSchema = z.object({
  name: z.string().min(1),
  role: localized,
  summary: localized,
  /** Ngày sinh dạng YYYY-MM-DD, hoặc chỉ năm YYYY. */
  birthDate: z.union([z.string().regex(/^\d{4}(-\d{2}-\d{2})?$/, 'Ghi dạng YYYY-MM-DD hoặc YYYY'), z.literal(''), z.literal('ẨN')]),
  phone: optionalText,
  email: optionalText,
  area: localized,
  githubUsername: z.string().min(1),
  /** Chỉ lấy repo GitHub có topic này (mặc định "portfolio") */
  githubTopic: z.string().default('portfolio'),
  social: z.object({
    github: optionalText,
    linkedin: optionalText,
    youtube: optionalText,
    tiktok: optionalText,
    instagram: optionalText,
    facebook: optionalText,
  }),
});

const careerSchema = z.object({
  stages: z.array(
    z.object({
      term: localized,
      when: localized,
      role: localized,
      description: localized.default(''),
    }),
  ),
  desiredPosition: localized,
  availableFrom: z.string(),
});

const skillsSchema = z.object({
  groups: z.array(z.object({ name: localized, items: z.array(localized) })),
  soft: z.array(localized),
  languages: z.array(z.object({ name: localized, level: localized })),
});

const educationSchema = z.object({
  schools: z.array(
  z.object({
    school: localized,
    start: z.string(),
    end: z.string(),
    /** true = năm kết thúc là năm tốt nghiệp dự kiến. */
    endExpected: z.boolean().default(false),
    major: localized.default(''),
    courses: localized.default(''),
  }),
  ),
});

const goalsSchema = z.object({
  goals: z.array(
  z.object({
    name: localized,
    status: goalStatus,
    /** Chữ trạng thái riêng (vd. "Đang luyện"); bỏ trống thì dùng chữ mặc định theo trạng thái. */
    label: localized.optional(),
    /** Tháng/năm, vd. "04/2027". */
    month: z.string(),
  }),
  ),
});

const siteSchema = z.object({
  /** Địa chỉ website, vd. "https://phamnghiatrong.github.io" hoặc tên miền riêng "https://phamnghiatrong.com" */
  url: z.string().url('Ghi đầy đủ dạng https://...'),
  /**
   * Mã GoatCounter (phần đầu của địa chỉ https://<mã>.goatcounter.com), vd. "phamnghiatrong".
   * Để trống thì không đếm và không hiện lượt xem.
   */
  goatcounter: z
    .string()
    .regex(/^[a-z0-9-]*$/, 'Chỉ ghi phần mã (chữ thường, số, gạch ngang), không ghi cả địa chỉ https://...')
    .default(''),
});

function load<T extends z.ZodType>(file: string, schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    // Số thứ tự đếm từ 1 cho dễ đọc: "mục 4 › status" thay vì "3.status"
    const where = (path: PropertyKey[]) =>
      path.map((key) => (typeof key === 'number' ? `mục ${key + 1}` : String(key))).join(' › ') || '(toàn file)';
    const lines = result.error.issues.map((i) => `  - ${where(i.path)}: ${i.message}`);
    throw new Error(`Dữ liệu sai trong src/data/${file}:\n${lines.join('\n')}`);
  }
  return result.data;
}

export const profile = load('profile.json', profileSchema, profileJson);
export const career = load('career.json', careerSchema, careerJson);
export const skills = load('skills.json', skillsSchema, skillsJson);
export const education = load('education.json', educationSchema, educationJson).schools;
export const goals = load('goals.json', goalsSchema, goalsJson).goals;
export const site = load('site.json', siteSchema, siteJson);

/** Lấy chuỗi đúng ngôn ngữ; thiếu bản dịch thì dùng tiếng Việt. */
export function pick(value: Localized | undefined, locale: Locale): string {
  if (value === undefined) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.vi;
}

/** Mục để trống hoặc ghi "ẨN" thì ẩn khỏi website. */
export function isShown(value: string | undefined): value is string {
  return !!value && value.trim() !== '' && value.trim().toUpperCase() !== 'ẨN';
}

const DATE_LOCALE: Record<Locale, string> = { vi: 'vi-VN', en: 'en-GB', 'zh-hant': 'zh-TW' };

/** "2002-12-14" → 14/12/2002 (vi, en) hoặc 2002/12/14 (繁中); "2002" giữ nguyên. */
export function formatBirthDate(value: string, locale: Locale): string {
  if (/^\d{4}$/.test(value)) return value;
  const date = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat(DATE_LOCALE[locale], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Số Việt Nam "0399 1412 00" → href "tel:+84399141200". */
export function phoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  return 'tel:' + (digits.startsWith('0') ? '+84' + digits.slice(1) : digits);
}

/** Người xem tiếng Anh / tiếng Trung thấy số có mã quốc gia: "+84 399 1412 00". */
export function formatPhone(phone: string, locale: Locale): string {
  const trimmed = phone.trim();
  if (locale === 'vi' || !trimmed.startsWith('0')) return trimmed;
  return '+84 ' + trimmed.slice(1);
}
