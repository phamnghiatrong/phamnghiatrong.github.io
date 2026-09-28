import vi from './vi.json';
import en from './en.json';
import zhHant from './zh-hant.json';

export const LOCALES = ['vi', 'en', 'zh-hant'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'vi';

export type Dict = typeof vi;
const DICTS: Record<Locale, Dict> = { vi, en, 'zh-hant': zhHant };

/** Giá trị cho <html lang> và hreflang (chuẩn BCP 47). */
export const HTML_LANG: Record<Locale, string> = {
  vi: 'vi',
  en: 'en',
  'zh-hant': 'zh-Hant',
};

export function useT(locale: Locale): Dict {
  return DICTS[locale];
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Ngôn ngữ kế tiếp theo vòng VI → EN → 中文 → VI. */
export function nextLocale(locale: Locale): Locale {
  return LOCALES[(LOCALES.indexOf(locale) + 1) % LOCALES.length];
}

/**
 * getStaticPaths cho trang có đủ 3 ngôn ngữ, đặt trong src/pages/[...lang]/.
 * Tiếng Việt không có tiền tố (`/`), hai ngôn ngữ còn lại là `/en/`, `/zh-hant/`.
 */
export function localeStaticPaths() {
  return LOCALES.map((locale) => ({
    params: { lang: locale === DEFAULT_LOCALE ? undefined : locale },
  }));
}

/** Đọc ngôn ngữ từ tham số `lang` của route `[...lang]`. */
export function localeFromParam(lang: string | undefined): Locale {
  return isLocale(lang) ? lang : DEFAULT_LOCALE;
}

/** "/en/blog/abc/" → "/blog/abc/" */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return '/' + rest.join('/');
  }
  return pathname;
}

/** ("en", "/blog/") → "/en/blog/"; ("vi", "/blog/") → "/blog/" */
export function localizePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : '/' + path;
  return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean}`;
}
