---
title: XionTech Design System — Global Rules
version: 1.1
date: 2026-10-11
status: v1.1, reconciled with the page content of 2026-10-11; team sign-off pending
scope: All pages of the XionTech website (en / vi). Copy lives in `content/`; this file defines only how everything looks and behaves.
---

# XionTech Design System — Global Rules

> **LOGIC:** When building a specific page, first check `design-system/xiontechs/pages/<page>.md`.
> If that file exists, its rules **override** this file. If not, follow the rules below.
>
> **Related files:** `content/` holds the page copy (en / vi), `content/sitemap.md` the pages and navigation,
> `preview/index.html` the visual board (open it in a browser, no server needed).
> Tokens are implemented in `@theme` in `src/styles/global.css`; change a token there and here together.

**Team decision (2026-10-07):** minimal design · **white** is the main theme · accent colors come **only from the logo** (navy blue + gold yellow) · images are optimized and used deliberately · the design leads with **numbers and images**, because people scan those first and read text last.

Every rule below is checked against that decision. Where a choice was verified with a tool, the result is quoted.

---

## 0. Design principles (apply to every screen)

| #   | Principle                              | What it means in practice                                                                                                                                                                   |
| --- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1  | **Number or image first**              | Every section opens with a **big number, a picture or a visual** before any paragraph. No section is text-only.                                                                             |
| P2  | **White space is the design**          | White background, few borders, no decorative gradients, no glow. Hierarchy comes from size, weight and spacing, not effects.                                                                |
| P3  | **Two brand colors, used with intent** | **Navy** = trust and structure (headings, primary actions, dark bands). **Gold** = attention (highlights, the "now" state, key numbers' accents). Never both fighting in one small element. |
| P4  | **Gold is never text on white**        | Logo gold has **1.66:1** contrast on white. It is a fill and accent color only (see §1.3).                                                                                                  |
| P5  | **Short text, scannable**              | Headlines ≤ 8 words, leads ≤ 2 lines (~160 characters), cards ≤ 3 lines of body. Lists over paragraphs.                                                                                     |
| P6  | **Show, don't describe**               | Products are shown as built UI mockups (Project Visualization, §6.2), never as long descriptions or stock photos.                                                                           |
| P7  | **Real or clearly illustrative**       | Real photos are only of XionTech. Mockups use fictional data and say so ("Illustrative").                                                                                                   |
| P8  | **Same rules in both languages**       | Every component works in English and Vietnamese without redesign. Vietnamese runs 15–30% longer: no fixed widths on text containers; buttons and chips wrap gracefully.                     |

---

## 1. Color

### 1.1 Source colors (sampled from the logo)

| Token        | Hex         | Where it comes from                                       |
| ------------ | ----------- | --------------------------------------------------------- |
| `brand-navy` | **#173762** | Logo "XT" letters and wordmark (dominant pixels averaged) |
| `brand-gold` | **#FCC00A** | Logo swoosh / check mark                                  |

### 1.2 Blue scale (built on the logo navy's hue, OKLCH ≈ 214°)

| Token                         | Hex         | Contrast on white | Use                                                                           |
| ----------------------------- | ----------- | ----------------- | ----------------------------------------------------------------------------- |
| `blue-50`                     | #E9F6FF     | —                 | Tinted section background, selected row                                       |
| `blue-100`                    | #DBE9FC     | —                 | Chip / badge background, hover tint                                           |
| `blue-200`                    | #B8D3F9     | —                 | Borders on blue surfaces, chart grid accents                                  |
| `blue-300`                    | #81B3F9     | 2.15              | Decorative only (illustrations, mockup chrome)                                |
| `blue-400`                    | #5D8ED1     | 3.36              | Large icons, mockup accents (≥ 24px only)                                     |
| `blue-500`                    | #406FB0     | 5.10              | Secondary links, chart series alt                                             |
| **`blue-600`**                | **#295896** | **7.17** ✅       | **Primary action**: buttons, links, focus ring, active states, chart series 1 |
| `blue-700`                    | #154481     | 9.65              | Hover / pressed state of primary                                              |
| **`blue-900` = `brand-navy`** | **#173762** | **11.94** ✅      | **Headings accent, dark bands (footer, CTA band), logo**                      |
| `blue-950`                    | #0F2440     | —                 | Deepest dark surface (rare)                                                   |

### 1.3 Gold scale (built on the logo gold's hue, OKLCH ≈ 86°)

| Token                         | Hex         | On white         | Navy text on it | Use                                                                         |
| ----------------------------- | ----------- | ---------------- | --------------- | --------------------------------------------------------------------------- |
| `gold-50`                     | #FFF8D4     | —                | 11.16 ✅        | Highlight background (e.g. "now" step, featured tag)                        |
| `gold-100`                    | #FFF0CC     | —                | 10.57 ✅        | Badge background                                                            |
| `gold-200`                    | #FFE08D     | —                | 9.26 ✅         | Marker / highlighter underline behind words                                 |
| `gold-300`                    | #FFCC4F     | 1.50             | 7.96 ✅         | Decorative fills                                                            |
| **`gold-400` = `brand-gold`** | **#FCC00A** | **1.66** ❌ text | **7.21** ✅     | **Accent bars, active dot, highlight chip (with navy text), progress fill** |
| `gold-500`                    | #D5A20A     | 2.33             | 5.12            | Chart series 2 (always with direct labels)                                  |
| `gold-600`                    | #AE7D00     | 3.66             | —               | Gold-tinted **large** text/icons ≥ 24px bold (e.g. "+" on big numbers)      |
| `gold-700`                    | #8F5F00     | 5.52 ✅          | —               | The only gold allowed for **small text** on white                           |

**Gold rules:**

1. Gold on white is **never** used for text below 24px, and never below `gold-700` for body-size text.
2. The pairing **navy text on gold** (7.21:1) is the signature highlight: "Now", key number chips, the one Highlight button.
3. Max **one gold element per viewport-height** of content. Gold must keep its "look here" meaning.

### 1.4 Neutrals (cool slate, tuned to sit with navy)

| Token     | Hex     | On white | Use                                                             |
| --------- | ------- | -------- | --------------------------------------------------------------- |
| `white`   | #FFFFFF | —        | **Page background (default)**                                   |
| `surface` | #F7F9FC | —        | Alternate section background, cards on white                    |
| `line`    | #E3E8EF | 1.23     | Borders, dividers (1px)                                         |
| `ink-400` | #8A94A6 | 3.06     | **Non-text only**: disabled controls, decorative dots (4-D)     |
| `ink-500` | #5B6676 | 5.82 ✅  | Secondary text, captions, labels, placeholders, inactive states |
| `ink-700` | #334155 | 10.35 ✅ | Body text                                                       |
| `ink-900` | #0F1B2D | 17.28 ✅ | Headings, big numbers                                           |

`ink-400` fails 4.5:1, so it is never used for readable text. Inactive and secondary text uses `ink-500` (5.52:1 even on `surface`).

### 1.5 Semantic colors

| Token     | Hex                             | Contrast | Use                                             |
| --------- | ------------------------------- | -------- | ----------------------------------------------- |
| `success` | #15803D                         | 5.02 ✅  | Done states, "Ready" chips (always with ✓ icon) |
| `warning` | `gold-700` #8F5F00 on `gold-50` | 5.16 ✅  | Attention notes (with icon)                     |
| `danger`  | #B91C1C                         | 6.47 ✅  | Errors (with icon + text)                       |
| `info`    | `blue-600`                      | 7.17 ✅  | Info notes                                      |

Status colors are never the only signal: they always come with an icon and a word (WCAG 1.4.1).

### 1.6 Color usage proportions

| Share | Color                                        | Where                                                             |
| ----- | -------------------------------------------- | ----------------------------------------------------------------- |
| ~70%  | White + `surface`                            | Backgrounds                                                       |
| ~20%  | Ink scale                                    | Text, lines                                                       |
| ~8%   | Blue scale (mainly `blue-600`, `brand-navy`) | Actions, heading accents, the dark bands (CTA band + footer only) |
| ~2%   | Gold                                         | Highlights only                                                   |

### 1.7 Chart & data-viz colors (validated)

Verified with the dataviz palette validator (light mode):

| Series            | Hex                | Result                                                                      |
| ----------------- | ------------------ | --------------------------------------------------------------------------- |
| Series 1          | `blue-600` #295896 | ✅ lightness band, chroma, CVD separation ΔE 33.7, normal-vision ΔE 38.3    |
| Series 2          | `gold-500` #D5A20A | ✅ — ⚠ contrast 2.33:1 vs white → **every value must be directly labelled** |
| Context / "other" | `ink-400` #8A94A6  | Non-categorical (background bars, targets, axes)                            |

Rules: **max 2 colored series per chart**; more series → small multiples. One axis only. Values labelled directly on marks. The logo navy and logo gold themselves **fail** as chart colors (too dark / too light); use the tokens above.

---

## 2. Typography

### 2.1 Typefaces (both ship the Vietnamese subset)

| Role                  | Font                           | Why                                                                                   |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| **Display & numbers** | **Manrope** (variable 200–800) | Geometric, bold numerals that echo the logo's wide letters; tabular figures for stats |
| **Body & UI**         | **Inter** (variable)           | Highest on-screen legibility at small sizes; tabular figures                          |

Self-hosted through the `fonts` array in `astro.config.mjs` with the `vietnamese` subset. Never a Google Fonts `<link>` or `@import` in the site (the preview board may use one; it is not shipped).

Rejected: **Poppins** and **Figtree**: no Vietnamese subset, diacritics break. Exo + Roboto Mono and Lexend + Source Sans 3 read either sci-fi or government. No monospace font is needed. Fewer fonts means a faster page.

### 2.2 Type scale (desktop → mobile, fluid with `clamp()`)

| Token      | Font / weight | Size desktop / mobile | Line height | Tracking          | Use                              |
| ---------- | ------------- | --------------------- | ----------- | ----------------- | -------------------------------- |
| `num-hero` | Manrope 800   | 96 / 56 px            | 1.0         | -0.03em           | One headline number per page max |
| `num-xl`   | Manrope 800   | 64 / 44               | 1.0         | -0.02em           | Stat tiles                       |
| `num-lg`   | Manrope 800   | 44 / 32               | 1.05        | -0.02em           | Card metrics                     |
| `num-md`   | Manrope 700   | 28 / 24               | 1.1         | -0.01em           | Inline KPIs, mockup numbers      |
| `display`  | Manrope 800   | 64 / 40               | 1.1         | -0.03em           | Hero headline                    |
| `h1`       | Manrope 800   | 48 / 34               | 1.15        | -0.025em          | Page title                       |
| `h2`       | Manrope 700   | 38 / 28               | 1.2         | -0.02em           | Section title                    |
| `h3`       | Manrope 700   | 24 / 20               | 1.3         | -0.01em           | Card title                       |
| `h4`       | Inter 600     | 18 / 17               | 1.35        | 0                 | Small headings                   |
| `lead`     | Inter 400     | 20 / 18               | 1.55        | 0                 | Section intro (≤ 2 lines)        |
| `body`     | Inter 400     | 17 / 16               | 1.65        | 0                 | Paragraphs (min 16px on mobile)  |
| `small`    | Inter 400     | 15 / 14               | 1.55        | 0                 | Card body, captions              |
| `label`    | Inter 600     | 13 / 12               | 1.3         | 0.06em, UPPERCASE | Kickers, stat labels             |

Display and heading line heights already include the +0.05 Vietnamese allowance, so stacked marks (ế, ỗ) are not clipped.

### 2.3 Number rules (the heart of the "numbers first" decision)

1. Numbers use **Manrope 800 with `font-variant-numeric: tabular-nums lining-nums`**, so digits don't jump in count-up animations.
2. **Anatomy of a stat:** `number` (ink-900) + `suffix/unit` (`+`, `%`, `x`) in **gold-600** at the same size + `label` (`label` style, ink-500) **under** the number + optional **context line** (`small`, ink-500, which must be true).
3. A short bar (4×32px) sits above a stat number. It is `blue-600` when several stats or the gold hero button share the screen (gold rule 3); `gold-400` only for a lone hero number.
4. Every number must be **true**. A number marked `[DUMMY]` in `content/` is not shipped; the tile is omitted until it is confirmed.
5. Round for readability: "25+", "3", "20+". No false precision.

### 2.4 Text rules

- Max line length **68 characters** for body; leads max 2 lines.
- Headings: sentence case. No ALL CAPS except `label`.

### 2.5 Prose (legal pages, long text)

For `/privacy-policy` and `/terms-of-service`:

- Single column, max width 68ch, `body` size, `ink-700`.
- `h2` for numbered sections, `h3` for sub-sections; 48px above `h2`, 24px above `h3`, 16px between paragraphs.
- Lists: 8px between items, markers in `ink-500`.
- Links: `blue-600`, always underlined (they sit inside running text).
- A "Last updated" line in `small`, `ink-500`, under the page title.
- On `/vi/`, the English text is shown with a short Vietnamese note above it (`gold-50` note with icon) until a professional translation exists. The note's `lang="vi"`, the legal text's `lang="en"`.

---

## 3. Layout, spacing & shape

### 3.1 Grid & breakpoints

| Token               | Value                                                               |
| ------------------- | ------------------------------------------------------------------- |
| Container max width | **1200px** content (1280px including 40px gutters)                  |
| Grid                | 12 columns, 24px gutter (desktop) · 4 columns, 16px gutter (mobile) |
| Breakpoints         | `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 (Tailwind defaults)     |
| Test widths         | 375 · 768 · 1024 · 1440 (no horizontal scroll at any)               |

### 3.2 Spacing scale (4px base, Tailwind defaults)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

| Use                       | Value                                   |
| ------------------------- | --------------------------------------- |
| Section vertical padding  | 96px desktop / 64px mobile              |
| Section heading → content | 48px / 32px                             |
| Card padding              | 32px / 24px                             |
| Grid gaps                 | 24px (cards), 16px (chips, small items) |

### 3.3 Radius, borders, elevation (minimal = flat)

| Token         | Value                          | Use                                        |
| ------------- | ------------------------------ | ------------------------------------------ |
| `radius-sm`   | 8px                            | Chips, inputs, small buttons               |
| `radius-md`   | 12px                           | Buttons, image frames                      |
| `radius-lg`   | 20px                           | Cards, mockup frames                       |
| `radius-full` | 999px                          | Pills, avatars, timeline dots              |
| Border        | 1px `line`                     | Default card edge (preferred over shadows) |
| `shadow-1`    | 0 1px 2px rgb(15 27 45 / 6%)   | Resting cards (optional)                   |
| `shadow-2`    | 0 12px 32px rgb(15 27 45 / 8%) | Hover / floating mockups only              |

**No** glassmorphism, glow, neon or gradient borders.

### 3.4 Z-index scale

`0 base · 10 sticky elements · 40 dropdowns · 50 nav · 60 dialogs / mobile nav sheet · 70 skip link / toasts`

---

## 4. Imagery

### 4.1 What images are for

| Image type              | Source                                             | Where                                       |
| ----------------------- | -------------------------------------------------- | ------------------------------------------- |
| **Product mockups**     | Built in HTML/SVG (crisp, translatable, light)     | Home §4 and §5 (Project Visualization §6.2) |
| **Real company photos** | XionTech's own (team, office, events, robots)      | Home, Careers                               |
| **Icons**               | One outline set (Lucide), 24px grid, 1.75px stroke | Everywhere                                  |
| Stock photos            | **Avoid.** Never as "our team / office / clients"  | Rare                                        |

### 4.2 Image optimization rules

| Rule                 | Spec                                                                                                                                                                        |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pipeline**         | Images live in `src/assets/` and render through `astro:assets` `<Image>` / `<Picture>` (AVIF first, WebP fallback). SVG for icons and logos. `public/` only for fixed URLs. |
| **Responsive sizes** | Every image declares `widths` + `sizes` and is served at 1×/2× of its rendered width. No image larger than 2× its display size.                                             |
| **Weight budget**    | Hero/primary image ≤ **180 KB** · content photo ≤ **120 KB** · thumbnail ≤ **40 KB** · **total images per page ≤ 1 MB** on first load.                                      |
| **Never upscale**    | Display at or below native resolution. The current photos in `preview/assets/` are low-res crops (~320–680px): keep them ≤ 300px wide until originals arrive.               |
| **Aspect ratios**    | Fixed set: **16:9**, **4:3**, **1:1**, **3:4**. `<Image>` writes width/height, so space is reserved (CLS < 0.1).                                                            |
| **Loading**          | Above-the-fold image: `loading="eager"` + `fetchpriority="high"`. Everything else: lazy (the `<Image>` default). No blur placeholders.                                      |
| **Treatment**        | Natural color, no filters, no duotone. Rounded `radius-md`. Optional 1px `line` border on white backgrounds so light photos don't float.                                    |
| **Alt text**         | Every meaningful image gets alt text in both languages via the i18n dictionaries. Decorative images use `alt=""`.                                                           |
| **Originals needed** | High-resolution originals (≥ 1600px long edge) of the company photos.                                                                                                       |

### 4.3 Iconography

Lucide outline icons, copied as **inline SVG** into `src/components/ui/Icon.astro` (ISC license; no icon package). 24px grid · 1.75px stroke · round caps/joins · `currentColor`, default `ink-700`, interactive `blue-600`, `navy` on gold. Decorative icons get `aria-hidden="true"`. **No emoji as icons.**

---

## 5. Core components

> States for every interactive component: default · hover · focus-visible · active · disabled (and loading where relevant). Touch targets ≥ **44×44px**. Transitions 150–250ms ease-out. `cursor: pointer` on everything clickable.

### 5.1 Buttons

| Variant                        | Spec                                                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary**                    | bg `blue-600`, text white, Inter 600 16px, height 48px, padding 0 24px, `radius-md`. Hover `blue-700`. Focus ring 2px `blue-600` + 2px offset. |
| **Secondary**                  | bg white, 1.5px border `blue-600`, text `blue-600`. Hover bg `blue-50`.                                                                        |
| **Highlight** (max 1 per page) | bg `gold-400`, text `brand-navy`. Used for the hero **"Get in touch"** only.                                                                   |
| **Text link**                  | `blue-600`, underline on hover, arrow icon optional.                                                                                           |
| On dark band                   | Primary becomes white bg + navy text; secondary becomes white border + white text.                                                             |

### 5.2 Navigation bar

White, sticky, 72px tall, bottom border 1px `line` (appears after 8px of scroll). Logo left, links center (Inter 500 15px, `ink-700`, active = `blue-600` with a 2px gold underline), language switcher + primary CTA **"Get in touch"** right. Links per `content/sitemap.md`: Services · Products · Clients · Process · FAQ (anchors to Home sections) · Careers. From other pages the anchors go to Home first.

**Mobile (< `lg`):** logo + language switcher + menu button (44px, `aria-expanded`, `aria-controls`). The menu opens a full-width sheet under the bar (z 60), 56px rows, CTA as a full-width primary button at the bottom. Escape and a link click close it; focus returns to the menu button. Body scroll is locked while open.

### 5.3 Language switcher

Two short labels **EN / VI** (the full endonym "English" / "Tiếng Việt" as `aria-label`/`title`), each link with `lang` and `hreflang`. Current = `ink-900` + `aria-current="page"`; other = `ink-500`, hover `blue-600`. It links to the same page in the other language (`getRelativeLocaleUrl`). Separated by a 1px `line` divider.

### 5.4 Skip link

First focusable element on every page: "Skip to content", visually hidden until focused, then shown top-left as a primary button (z 70). Targets `<main id="main">`.

### 5.5 Section header

`label` (kicker, `blue-600`) → `h2` (ink-900) → `lead` (ink-500, ≤ 2 lines). Optional **number badge** left of the kicker (e.g. "01"). Left-aligned by default; centered only for short, symmetric sections. Every Home section has an `id` matching the nav anchors.

### 5.6 ⭐ Stat / KPI tile (numbers-first core)

```
┌─────────────────────────┐
│ ▬ (bar 4×32, blue-600)   │
│ 25+                      │  ← num-xl, ink-900; "+" gold-600
│ YEARS OF LEADERSHIP      │  ← label, ink-500
│ [context, if true]       │  ← small, ink-500 (optional context)
└─────────────────────────┘
```

- Variants: **strip** (tiles in one row, separated by 1px `line` vertical dividers, no card), **card** (white card in a grid), **hero** (single `num-hero`).
- Count-up animation from 0 when the tile scrolls into view (1.2s, ease-out). The final value is server-rendered (SEO, no-JS) and shown instantly under reduced motion.

### 5.7 Image frame / media card

Image (fixed aspect, `radius-md`) + caption (`small`, ink-500) + optional overlay **number chip** (gold-400 bg, navy text). Hover: image scale 1.02 inside the frame (no layout shift).

### 5.8 Cards (service / why-us)

White, 1px `line`, `radius-lg`, padding 32px. Anatomy: **icon or number** (top) → `h3` → `small` body (≤ 3 lines) → optional link. Hover: border `blue-200` + `shadow-2`. Whole card clickable when it links (stretched link).

### 5.9 Chips & badges

| Type          | Spec                                                                        |
| ------------- | --------------------------------------------------------------------------- |
| Tag (neutral) | bg `surface`, text `ink-700`, `radius-sm`, 13px Inter 600                   |
| Tag (brand)   | bg `blue-100`, text `blue-700`                                              |
| Highlight     | bg `gold-400`, text `brand-navy`. Reserved for "featured / now"             |
| Status        | success/warning/danger color + icon + word                                  |
| "& more"      | dashed 1px `ink-500` border, text ink-500. Signals lists are not exhaustive |

### 5.10 Client & domain strip

Home §5. Client names as text wordmarks in `h4` style, `ink-700`, in a row separated by 1px `line` dividers (no logos until approved files exist). Under it, the domains as neutral tag chips (§5.9) plus an "& more" chip. Client work descriptions stay general (no client product names), each as a Project Visualization (§6.2) or a card.

### 5.11 Testimonial (conditional)

Only rendered when an approved quote exists (`content/en/home.md` §6). Quote in `lead`, `ink-900`, with a 4×32px gold bar above; person's name (`h4`) and role + company (`small`, ink-500) below. Max 2 quotes, side by side on desktop, stacked on mobile. No photos unless supplied with the quote. If no quote is approved, the whole section is removed (no empty state).

### 5.12 Tabs, accordion (FAQ)

- **Tabs:** underline style; active = `blue-600` text + 2px `gold-400` underline; arrow-key navigation.
- **Accordion:** native `<details>` / `<summary>` (no JS). Row 56px min, `h4` question, plus icon rotates 45°, 1px `line` dividers.

### 5.13 Contact block ("Send a brief", Home §11)

Until a form service is chosen, the brief is sent by email:

- Section header (§5.5) → one **primary button** "Email your brief" → `mailto:contact@xiontechs.com` with a prefilled subject (from i18n).
- Beside it (desktop) / below (mobile): a contact list with icons: USA phone, Vietnam phone, WhatsApp, email (`tel:` / `mailto:` / `https://wa.me/` links, kept left-to-right), office hours, reply time.
- Offices as two or three small cards: city (`h4`) + address (`small`, `<address>`).
- When a form service is added later: inputs 48px, 1.5px border `line` → focus `blue-600` + 4px `blue-100` ring; label above (Inter 600 14px); error text below in `danger` with icon; space for the error is reserved so the layout doesn't shift.

### 5.14 Footer & dark band

The only dark surfaces: **CTA band** and **footer**, both `brand-navy` bg, white text, gold used once (for example the slogan "Get IT Done" or a gold bar). Footer content per `content/sitemap.md`: contact, offices, links (Careers · Privacy policy · Terms of service), social, legal line in `small` at ≥ 4.5:1 (white at 80% opacity minimum).

### 5.15 404 page

Same header and footer. Centered block: `num-hero` "404" (ink-900, gold bar above) → `h1` + one `lead` line from `content/{en,vi}/404.md` → primary button back to Home + text link to the brief. No illustration.

---

## 6. Signature components

### 6.1 ⭐ 4-D Process

**Source of truth for the behavior:** `preview/variants.html` → `#vb-process` (`data-fourd`), to be committed by the team. The demo is on a dark background; this spec **adapts it to the white theme and brand colors** and keeps the story. Copy: `content/{en,vi}/home.md` §7.

**Story:** a dot field that turns into what we ship, told as a machine-learning run:

| Stage          | Visual state (canvas)                                                                          | Meaning                                      |
| -------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 01 Discovery   | ~720 points scattered: noise, clumps, streaks, outliers; mixed markers (dots, crosses, rings)  | Raw, messy input: the client's problem space |
| 02 Design      | Points cleaned into **4 tidy dot columns**                                                     | Structured: the solution is designed         |
| 03 Development | Points pull toward 4 icon shapes, noise shrinks; a small **loss curve** drops (top end corner) | Building, with visible progress              |
| 04 Deployment  | Points fit 4 solid icons: **Apps · AI robotics · IoT · Smart platform** (labelled)             | Delivered result                             |

**White-theme color mapping:**

| Element                  | Demo (dark)            | **Spec (white)**                                                                    |
| ------------------------ | ---------------------- | ----------------------------------------------------------------------------------- |
| Background               | #121826                | `white` (section may sit on `surface`)                                              |
| Raw / in-progress points | gray rgba(201,207,218) | `ink-400` at 25–70% opacity (decorative, not text)                                  |
| Fitted icons (stage 4)   | #3E66F3                | **`blue-600`**                                                                      |
| Loss curve               | light gray             | `blue-600` line on `line` axes, label `ink-500`                                     |
| Timeline track           | dark gray              | `line`, 2px                                                                         |
| Timeline fill (progress) | #3E66F3                | `blue-600`                                                                          |
| **Current stage dot**    | blue ring              | **`gold-400` dot with `brand-navy` 2px ring**. The one gold element in the section. |
| Stage number "01–04"     | blue                   | `blue-600`, `label` style                                                           |
| Stage name               | white / gray           | Active `ink-900` (h3); inactive **`ink-500`**                                       |
| Stage description        | gray                   | Active `ink-700` (`small`); inactive hidden on mobile, **`ink-500`** on desktop     |
| Note under the steps     | —                      | `small`, `ink-500`: the content's note line (no method chips)                       |
| Play/Pause               | dark pill              | Secondary button, small (40px height, still a 44px target)                          |

**Behavior (keep from demo):**

- Auto-plays through 4 stages while on screen: **hold 4.2s, morph 1.3s**. Pauses when off-screen or the tab is hidden.
- Clicking a stage takes manual control (auto-play stops). The Pause/Play toggle is always visible.
- `aria-live` announces the stage name. Stage buttons use `aria-current="step"`.
- **Reduced motion:** starts paused, no morphing; switching stages swaps states instantly.
- Canvas: devicePixelRatio ≤ 2, batched paths (~10 per frame), 720 points desktop / **360 points mobile**.
- Canvas height 360px desktop / 240px mobile; the canvas is `aria-hidden`; icon labels sit **below** the canvas as real text (translated, readable by screen readers).
- No JS: the four stages render as a static list with all descriptions visible.

### 6.2 ⭐ Project Visualization (product showcase pattern)

**Purpose:** show what we built as **visual proof with numbers**, not text. One consistent pattern, two "window" types. Used in Home §4 (our products for schools) and §5 (client work). **Client product names are never shown**: client work is described in general terms, per `content/en/home.md` §5.

**Anatomy:**

```
┌──────────────────────────────────────────────────────────────────┐
│ [TAG: Education · Client work]   (brand chip)                    │
│ Title (h2/h3, ≤ 8 words)                                         │
│ ┌───────────────┬───────────────┐                                │
│ │ 2             │ 3             │  ← KEY NUMBERS (num-lg)        │
│ │ platforms     │ languages     │                                │
│ └───────────────┴───────────────┘                                │
│ ┌──────────────────────────────────────────────┐                 │
│ │        PRODUCT WINDOW (mockup, see types)     │  ← THE IMAGE    │
│ └──────────────────────────────────────────────┘                 │
│ Feature chips: Fees · Notifications · Profile updates · & more   │
│ Caption: "Illustrative — fictional data"                         │
└──────────────────────────────────────────────────────────────────┘
```

Rules:

- **Key numbers row:** 2–3 numbers max, real and approved. If no real number exists, use a **capability count** that is true. If none is true, drop the row (don't invent).
- **Product window = built UI** in HTML/CSS with fictional data and generic names, never a client screenshot. Labelled "Illustrative". Decorative parts `aria-hidden`; the meaning is in the title, numbers and chips.
- Window chrome: white, 1px `line`, `radius-lg`, `shadow-2`, a 36px top bar (three `line` dots or a generic label). Inside, the UI uses the same tokens.
- Layout: desktop = text + numbers at the start (5/12 columns), window at the end (7/12); alternate sides between projects. Mobile = stacked (numbers → window → chips).
- Motion: the window's content **animates once** when scrolled into view (cards slide in, the chat reply streams). It never loops. Off under reduced motion.

**Window types:**

| Type                                    | Shows                                                                        | Used for                                            |
| --------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------- |
| **App window** (desktop + phone frames) | Dashboard/list UI with real-looking fictional numbers                        | Products for schools; multi-school apps (§5)        |
| **Agent chat window**                   | User asks → AI assistant replies with an **interactive card** (UI, not text) | Parent assistant: fees, details, notifications (§5) |

---

## 7. Motion

| Token         | Value                    | Use                         |
| ------------- | ------------------------ | --------------------------- |
| `dur-fast`    | 150ms                    | Hover, focus, color changes |
| `dur-base`    | 250ms                    | Dropdowns, accordions, tabs |
| `dur-slow`    | 600ms                    | Section reveal              |
| `ease-out`    | cubic-bezier(.2,.8,.2,1) | Entrances                   |
| `ease-in-out` | cubic-bezier(.4,0,.2,1)  | Morphs (4-D)                |

Rules:

- Minimal: **fade + 16px rise** on reveal (no blur, no glow, no shimmer).
- Allowed always-on motion: only the 4-D canvas (pausable) and count-ups (run once).
- Animate only `transform` and `opacity`.
- **`prefers-reduced-motion`:** everything static, final states shown.
- Content is visible without JS; reveal animations only enhance.

---

## 8. Internationalization

- Locales: `en` (source, no URL prefix) and `vi` (`/vi/`). Arabic is out of scope.
- All visible text, `alt` text and meta text comes from `src/i18n/locales/{en,vi}.json` (`en.json` defines the type).
- Numbers use Western digits (0–9) in both languages. Phones, emails and addresses are not translated.
- Text expansion: Vietnamese can run 15–30% longer; see P8.

---

## 9. Accessibility (non-negotiable)

- Text contrast ≥ 4.5:1 (large text ≥ 3:1). All pairs in §1 are verified; `ink-400` is never text.
- Focus visible on every interactive element (2px `blue-600` ring + offset; white ring on dark bands).
- Keyboard: tab order = visual order; skip link first; tabs, accordion, mobile menu and the 4-D timeline operable by keyboard.
- Color is never the only signal (status = icon + word; charts = direct labels).
- Images: alt text in both languages; mockups' decorative parts `aria-hidden`, with their meaning given in text.
- One `h1` per page; headings in order.

---

## 10. Performance budget

| Metric                       | Target                                                                |
| ---------------------------- | --------------------------------------------------------------------- |
| LCP                          | < 2.5s (4G mobile)                                                    |
| CLS                          | < 0.1                                                                 |
| INP                          | < 200ms                                                               |
| Images per page (first load) | ≤ 1 MB                                                                |
| Fonts                        | 2 families, subset, `display: swap`, self-hosted                      |
| JS                           | Only the 4-D canvas, count-ups and the mobile menu; paused off-screen |

---

## 11. Build plan

| Phase                    | Output                                                                                                                                             | Review gate                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| **0. Approve this file** | Team signs off on v1.1                                                                                                                             | Team                       |
| **1. Tokens**            | `@theme` in `src/styles/global.css`, fonts in `astro.config.mjs`                                                                                   | `preview/index.html` match |
| **2. Core components**   | Button, nav (+ mobile sheet), skip link, language switcher, section header, stat tile, image frame, cards, chips, accordion, contact block, footer | Reviewed on the real pages |
| **3. Signature**         | 4-D Process (ported from `preview/variants.html`), Project Visualization (2 window types)                                                          | Demo with the team         |
| **4. Pages**             | Home → Careers → Privacy policy → Terms of service → 404 (en + vi), per `content/sitemap.md`                                                       | Page-by-page review        |
| **5. QA**                | 2 languages × 4 widths, accessibility audit, Lighthouse (§10), image weight check                                                                  | Release checklist          |

## 12. Decisions

| #   | Question                         | Decision (2026-10-11)                                                             |
| --- | -------------------------------- | --------------------------------------------------------------------------------- |
| 1   | Codebase                         | This repository (Astro 7, Tailwind 4).                                            |
| 2   | Stage numbers in the 4-D Process | None. The content's note line replaces them.                                      |
| 3   | Project numbers                  | Only true, approved numbers; client product names are not shown.                  |
| 4   | Highlight (gold) button          | Hero "Get in touch".                                                              |
| 5   | Photo originals                  | Open: tracked with the open data in `content/open-data.md`.                       |
| 6   | AI chat assistant on the site    | Dropped.                                                                          |
| 7   | Hosting                          | Cloudflare Pages (`public/_redirects` for the redirects in `content/sitemap.md`). |
| 8   | Brief delivery                   | `mailto:` for now (§5.13); a form service later.                                  |

---

## Anti-patterns (do not use)

- ❌ Emojis as icons — use the inline Lucide SVGs
- ❌ Missing `cursor: pointer` on clickable elements
- ❌ Layout-shifting hovers
- ❌ Low-contrast text (`ink-400` or gold below `gold-700` as text)
- ❌ Instant state changes — always transition (150–300ms)
- ❌ Invisible focus states
- ❌ Dark mode by default, glassmorphism, glow, gradients
- ❌ Shipping `[DUMMY]` content or unconfirmed numbers

## Pre-delivery checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons; all icons from `Icon.astro`
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150–300ms)
- [ ] Text contrast 4.5:1 minimum; no gold or `ink-400` text on white
- [ ] Max one gold element per viewport height
- [ ] Focus states visible for keyboard navigation; skip link works
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px; no horizontal scroll
- [ ] Vietnamese diacritics not clipped; long Vietnamese strings wrap
- [ ] No content hidden behind the sticky nav (anchor targets have `scroll-margin-top`)
- [ ] All text, `alt` and meta from the i18n dictionaries
- [ ] Images via `<Image>` within the §4.2 budget
