<!-- bmad:context -->
<!-- Verified 2026-10-07 against fca6d37. Managed by bmad-project-context; edits inside this block are replaced on refresh. Keep anything you want preserved outside the markers. -->

## xt-landing-page

XionTechs marketing landing page. Astro 7 static output, Tailwind CSS 4, TypeScript strict, npm, locales `en` (default, no URL prefix) and `vi` (`/vi/`). Work is planned and built with BMAD skills; planning artifacts and tickets live in `_bmad-output/`. Design rules live in `design-system/xiontechs/MASTER.md`.

## Policy

- Write all documentation, comments and commit messages in English.
- Do not add a dependency without asking first; prefer Astro/Tailwind built-ins and platform features.
- Do not add React, Vue, Svelte or shadcn/ui; build `.astro` components with zero client JS. Use a `<script>` in the component when interactivity is unavoidable.
- Do not edit `.claude/skills/`, `.agents/skills/` or `_bmad/` by hand — they are installer-managed; customize BMAD with the `bmad-customize` skill.
- A task is done only when `npm run verify` passes; CI runs the same command.

## Where things are

- Page composition: `src/components/HomePage.astro`; one file per section in `src/components/sections/`, each taking a `lang` prop.
- Locale routing: `src/pages/index.astro` (en) and `src/pages/[lang]/index.astro` (other locales) both render `HomePage`.
- Locale list: `src/i18n/config.ts` — also imported by `astro.config.mjs`, so keep it free of other imports.
- Before building or changing UI, read `design-system/xiontechs/MASTER.md` and use the `ui-ux-pro-max` skill; a `design-system/xiontechs/pages/<page>.md` overrides MASTER for that page.

## Running and verifying

- Start the dev server with `npx astro dev --background`; manage it with `astro dev stop | status | logs`. A foreground `npm run dev` blocks the agent.
- `npm run verify` runs a full production build; iterate with `npx astro check` and run `verify` once before finishing.
- Node 22.12+ (`.nvmrc`). BMAD scripts need `uv`; `ui-ux-pro-max` scripts need Python 3.

## Conventions that differ from defaults

- Never hardcode user-visible text, `alt` text or meta text in components; add the key to both `src/i18n/locales/en.json` and `vi.json` and read it via `getDictionary(lang)`. `en.json` defines the type, so a key missing from `vi.json` fails `astro check`.
- Build internal links with `getRelativeLocaleUrl(lang, path)` from `astro:i18n`, never a hand-written `/vi/...` string.
- Use theme tokens only (`bg-primary`, `text-accent`, `font-display`, ...) defined in `@theme` in `src/styles/global.css`; never arbitrary hex values or font names in markup. Change a token there and in `MASTER.md` together.
- Load fonts only through the `fonts` array in `astro.config.mjs` (self-hosted); never a Google Fonts `<link>` or `@import`. Every font must ship the `vietnamese` subset.
- Use `astro:assets` `<Image>` for images in `src/assets/`; `public/` is only for files that need a fixed URL (favicon, robots.txt).

## Known pitfalls

- Poppins (the design system's original heading suggestion) has no Vietnamese subset and breaks diacritics; the heading font is Montserrat.
- Astro `<Font>` CSS variables must not share a name with a Tailwind `@theme` token (e.g. `--font-display`) — the variable resolves to itself. Astro font variables are named after the font (`--font-montserrat`).
- `eslint-plugin-jsx-a11y` does not support ESLint 10; do not add it. Check accessibility with the `MASTER.md` pre-delivery checklist.
- `npx ui-ux-pro-max-cli update` reinstalls `slides`, `banner-design`, `design` and `ui-styling` skills; delete them afterwards — `ui-styling` pushes shadcn/React.

<!-- /bmad:context -->
