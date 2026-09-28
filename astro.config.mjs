// @ts-check
import { readFileSync, writeFileSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';

/**
 * Địa chỉ website lấy từ src/data/site.json → "url" (một chỗ duy nhất).
 * Mua tên miền riêng: sửa "url" thành https://ten-mien.com — file CNAME cho GitHub Pages sẽ tự được tạo.
 */
const { url: SITE_URL } = JSON.parse(readFileSync(new URL('./src/data/site.json', import.meta.url), 'utf-8'));
const host = new URL(SITE_URL).hostname;

/** Tên miền riêng (không phải *.github.io) thì ghi dist/CNAME để GitHub Pages dùng tên miền đó */
const cname = {
  name: 'cname',
  hooks: {
    /** @param {{ dir: URL }} options */
    'astro:build:done': ({ dir }) => {
      if (!host.endsWith('.github.io')) writeFileSync(new URL('CNAME', dir), `${host}\n`);
    },
  },
};

export default defineConfig({
  site: SITE_URL,
  integrations: [cname],

  i18n: {
    locales: ['vi', 'en', 'zh-hant'],
    defaultLocale: 'vi',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  markdown: {
    // Khối code trong bài blog: nền tối cho hợp giao diện kính tối
    shikiConfig: { theme: 'github-dark' },
  },

  // Tự tải font về lúc build và phục vụ từ chính site (không gọi Google khi người xem mở trang)
  fonts: [
    {
      name: 'Roboto',
      cssVariable: '--font-roboto',
      provider: fontProviders.google(),
      weights: [400],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext', 'vietnamese'],
      // Không chèn font dự phòng chung (sans-serif) sau Roboto, để chữ Hán
      // rơi xuống Noto Sans TC thay vì font hệ thống.
      fallbacks: [],
    },
    {
      name: 'Noto Sans TC',
      cssVariable: '--font-noto-tc',
      provider: fontProviders.google(),
      weights: [400],
      styles: ['normal'],
    },
  ],
});
