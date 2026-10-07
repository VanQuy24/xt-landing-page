// Locale list shared by astro.config.mjs and runtime code. Keep this file dependency-free.
export const locales = ['en', 'vi'] as const;
export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];
