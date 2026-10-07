import { defaultLocale, locales, type Locale } from './config';
import en from './locales/en.json';
import vi from './locales/vi.json';

export { defaultLocale, locales, type Locale };

// `en.json` is the source of truth: any other locale missing a key fails `astro check`.
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, vi };

// Endonyms: each language names itself, so these are intentionally not translated.
export const localeNames: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
};

export function isLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? '');
}

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

/** `/vi/about/` -> `/about/`. Pair with `getRelativeLocaleUrl(otherLang, path)` to switch locale on the same page. */
export function stripLocale(pathname: string, lang: Locale): string {
  if (lang === defaultLocale) return pathname;
  return pathname.replace(new RegExp(`^/${lang}(?=/|$)`), '') || '/';
}
