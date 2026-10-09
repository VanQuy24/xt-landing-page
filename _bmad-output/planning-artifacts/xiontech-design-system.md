---
title: XionTech Design System — Global Rules (v1, plan)
author: khoi with Claude (ui-ux-pro-max design skill)
date: 2026-10-07
status: PLAN — for team review before any code is written
scope: All pages of the XionTech website (en / vi / ar). Page content and copy are owned by the content/concept owner; this file defines only how everything looks and behaves.
---

# XionTech Design System — Global Rules

**Team decision (2026-10-07):** minimal design · **white** is the main theme · accent colors come **only from the logo** (navy blue + gold yellow) · images are optimized and used deliberately · the design leads with **numbers and images**, because people scan those first and read text last.

Every rule below is checked against that decision. Where a choice was verified with a tool, the result is quoted.

---

## 0. Design principles (apply to every screen)

| # | Principle | What it means in practice |
|---|---|---|
| P1 | **Number or image first** | Every section opens with a **big number, a picture or a visual** before any paragraph. No section is text-only. |
| P2 | **White space is the design** | White background, few borders, no decorative gradients, no glow. Hierarchy comes from size, weight and spacing, not effects. |
| P3 | **Two brand colors, used with intent** | **Navy** = trust and structure (headings, primary actions, dark bands). **Gold** = attention (highlights, the "now" state, key numbers' accents). Never both fighting in one small element. |
| P4 | **Gold is never text on white** | Logo gold has **1.66:1** contrast on white. It is a fill and accent color only (see §1.3). |
| P5 | **Short text, scannable** | Headlines ≤ 8 words, leads ≤ 2 lines (~160 characters), cards ≤ 3 lines of body. Lists over paragraphs. |
| P6 | **Show, don't describe** | Products are shown as built UI mockups (Project Visualization, §6.2), never as long descriptions or stock photos. |
| P7 | **Real or clearly illustrative** | Real photos are only of XionTech. Mockups use fictional data and say so ("Illustrative"). |
| P8 | **Same rules in 3 languages** | Every component works in English, Vietnamese and Arabic (right-to-left) without redesign. |

---

## 1. Color

### 1.1 Source colors (sampled from `xt-logo.png`)

| Token | Hex | Where it comes from |
|---|---|---|
| `brand-navy` | **#173762** | Logo "XT" letters and wordmark (dominant pixels averaged) |
| `brand-gold` | **#FCC00A** | Logo swoosh / check mark |

### 1.2 Blue scale (built on the logo navy's hue, OKLCH ≈ 214°)

| Token | Hex | Contrast on white | Use |
|---|---|---|---|
| `blue-50` | #E9F6FF | — | Tinted section background, selected row |
| `blue-100` | #DBE9FC | — | Chip / badge background, hover tint |
| `blue-200` | #B8D3F9 | — | Borders on blue surfaces, chart grid accents |
| `blue-300` | #81B3F9 | 2.15 | Decorative only (illustrations, mockup chrome) |
| `blue-400` | #5D8ED1 | 3.36 | Large icons, mockup accents (≥ 24px only) |
| `blue-500` | #406FB0 | 5.10 | Secondary links, chart series alt |
| **`blue-600`** | **#295896** | **7.17** ✅ | **Primary action**: buttons, links, focus ring, active states, chart series 1 |
| `blue-700` | #154481 | 9.65 | Hover / pressed state of primary |
| **`blue-900` = `brand-navy`** | **#173762** | **11.94** ✅ | **Headings accent, dark bands (footer, CTA band), logo** |
| `blue-950` | #0F2440 | — | Deepest dark surface (rare) |

### 1.3 Gold scale (built on the logo gold's hue, OKLCH ≈ 86°)

| Token | Hex | On white | Navy text on it | Use |
|---|---|---|---|---|
| `gold-50` | #FFF8D4 | — | 11.16 ✅ | Highlight background (e.g. "now" step, featured tag) |
| `gold-100` | #FFF0CC | — | 10.57 ✅ | Badge background |
| `gold-200` | #FFE08D | — | 9.26 ✅ | Marker / highlighter underline behind words |
| `gold-300` | #FFCC4F | 1.50 | 7.96 ✅ | Decorative fills |
| **`gold-400` = `brand-gold`** | **#FCC00A** | **1.66** ❌ text | **7.21** ✅ | **Accent bars, active dot, highlight chip (with navy text), progress fill accents** |
| `gold-500` | #D5A20A | 2.33 | 5.12 | Chart series 2 (always with direct labels) |
| `gold-600` | #AE7D00 | 3.66 | — | Gold-tinted **large** text/icons ≥ 24px bold (e.g. "+" on big numbers) |
| `gold-700` | #8F5F00 | 5.52 ✅ | — | The only gold allowed for **small text** on white |

**Gold rules:**
1. Gold on white is **never** used for text below 24px, and never below `gold-700` for body-size text.
2. The pairing **navy text on gold** (7.21:1) is the signature highlight: "Most popular", "Now", key number chips.
3. Max **one gold element per viewport-height** of content. Gold must keep its "look here" meaning.

### 1.4 Neutrals (cool slate, tuned to sit with navy)

| Token | Hex | On white | Use |
|---|---|---|---|
| `white` | #FFFFFF | — | **Page background (default)** |
| `surface` | #F7F9FC | — | Alternate section background, cards on white |
| `line` | #E3E8EF | 1.23 | Borders, dividers (1px) |
| `ink-400` | #8A94A6 | 3.06 | Disabled text, placeholder, decorative dots (4-D Process) |
| `ink-500` | #5B6676 | 5.82 ✅ | Secondary text, captions, labels |
| `ink-700` | #334155 | 10.35 ✅ | Body text |
| `ink-900` | #0F1B2D | 17.28 ✅ | Headings, big numbers |

### 1.5 Semantic colors

| Token | Hex | On white | Use |
|---|---|---|---|
| `success` | #15803D | 5.02 ✅ | Done states, "Ready" chips (always with ✓ icon) |
| `warning` | `gold-700` #8F5F00 on `gold-50` | 5.52 ✅ | Attention notes (with icon) |
| `danger` | #B91C1C | 6.47 ✅ | Form errors (with icon + text) |
| `info` | `blue-600` | 7.17 ✅ | Info notes |

Status colors are never the only signal: they always come with an icon and a word (WCAG 1.4.1).

### 1.6 Color usage proportions (60-30-10)

| Share | Color | Where |
|---|---|---|
| ~70% | White + `surface` | Backgrounds |
| ~20% | Ink scale | Text, lines |
| ~8% | Blue scale (mainly `blue-600`, `brand-navy`) | Actions, headings accents, one dark band per page max (footer + CTA) |
| ~2% | Gold | Highlights only |

### 1.7 Chart & data-viz colors (validated)

Verified with the dataviz palette validator (light mode):

| Series | Hex | Result |
|---|---|---|
| Series 1 | `blue-600` #295896 | ✅ lightness band, chroma, CVD separation ΔE 33.7, normal-vision ΔE 38.3 |
| Series 2 | `gold-500` #D5A20A | ✅ — ⚠ contrast 2.27:1 vs white → **every value must be directly labelled** |
| Context / "other" | `ink-400` #8A94A6 | Non-categorical (background bars, targets, axes) |

Rules: **max 2 colored series per chart**; more series → small multiples. One axis only. Values labelled directly on marks (it's a numbers-first site anyway). The logo navy and logo gold themselves **fail** as chart colors (too dark / too light) — use the tokens above.

---

## 2. Typography

### 2.1 Typefaces (all checked for Vietnamese support in Google Fonts data)

| Role | Font | Why | Languages |
|---|---|---|---|
| **Display & numbers** | **Manrope** (variable 200–800) | Geometric, bold numerals that echo the logo's wide letters; excellent tabular figures for stats | latin, latin-ext, **vietnamese** ✅ |
| **Body & UI** | **Inter** (variable, optical size 14–32) | Highest on-screen legibility at small sizes; tabular figures | latin, latin-ext, **vietnamese** ✅ |
| Arabic display | **Noto Kufi Arabic** (100–900) | Geometric Kufi matches Manrope's tone | arabic ✅ |
| Arabic body | **Noto Sans Arabic** (variable) | Pairs with Inter's proportions | arabic ✅ |

Rejected: **Figtree** (used in the 4-D demo `variants.html`): **no Vietnamese**. The design database's suggestions (Exo + Roboto Mono, Lexend + Source Sans 3) read either sci-fi or government; Manrope + Inter fits "minimal + trustworthy + numbers" better. No monospace font is needed. Fewer fonts means a faster page.

### 2.2 Type scale (desktop → mobile, fluid with `clamp()`)

| Token | Font / weight | Size desktop / mobile | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `num-hero` | Manrope 800 | 96 / 56 px | 1.0 | -0.03em | One headline number per page max |
| `num-xl` | Manrope 800 | 64 / 44 | 1.0 | -0.02em | Stat tiles |
| `num-lg` | Manrope 800 | 44 / 32 | 1.05 | -0.02em | Card metrics |
| `num-md` | Manrope 700 | 28 / 24 | 1.1 | -0.01em | Inline KPIs, mockup numbers |
| `display` | Manrope 800 | 64 / 40 | 1.05 | -0.03em | Hero headline |
| `h1` | Manrope 800 | 48 / 34 | 1.1 | -0.025em | Page title |
| `h2` | Manrope 700 | 38 / 28 | 1.15 | -0.02em | Section title |
| `h3` | Manrope 700 | 24 / 20 | 1.25 | -0.01em | Card title |
| `h4` | Inter 600 | 18 / 17 | 1.35 | 0 | Small headings |
| `lead` | Inter 400 | 20 / 18 | 1.55 | 0 | Section intro (≤ 2 lines) |
| `body` | Inter 400 | 17 / 16 | 1.65 | 0 | Paragraphs (min 16px on mobile) |
| `small` | Inter 400 | 15 / 14 | 1.55 | 0 | Card body, captions |
| `label` | Inter 600 | 13 / 12 | 1.3 | 0.06em, UPPERCASE | Kickers, stat labels (not uppercased in Arabic) |

### 2.3 Number rules (the heart of the "numbers first" decision)

1. Numbers use **Manrope 800 with `font-variant-numeric: tabular-nums lining-nums`**, so digits don't jump in count-up animations.
2. **Anatomy of a stat:** `number` (ink-900) + `suffix/unit` (`+`, `%`, `x`) in **gold-600** at the same size + `label` (`label` style, ink-500) **under** the number + optional **context line** (`small`, ink-500, e.g. a scope or date, which must be true).
3. A **gold bar** (4×32px, `gold-400`) may sit above or beside a hero number as the brand accent.
4. Always **Western digits (0–9)** in all three languages, including Arabic.
5. Numbers keep left-to-right direction inside RTL text.
6. Every number must be **true**. Unconfirmed numbers are placeholders until approved.
7. Round for readability: "25+", "3", "20+", "15 agents". No false precision.

### 2.4 Text rules

- Max line length **68 characters** for body; leads max 2 lines.
- Headings: sentence case. No ALL CAPS except `label`.
- Arabic: no letter-spacing, no uppercase, slightly larger line height (+0.1).
- Vietnamese: Manrope/Inter handle diacritics. Allow +0.05 line height on display sizes so stacked marks (ế, ỗ) aren't clipped.

---

## 3. Layout, spacing & shape

### 3.1 Grid & breakpoints

| Token | Value |
|---|---|
| Container max width | **1200px** content (1280px including 40px gutters) |
| Grid | 12 columns, 24px gutter (desktop) · 4 columns, 16px gutter (mobile) |
| Breakpoints | `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280 |
| Test widths | 375 · 768 · 1024 · 1440 (no horizontal scroll at any) |

### 3.2 Spacing scale (4px base)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

| Use | Value |
|---|---|
| Section vertical padding | 96px desktop / 64px mobile |
| Section heading → content | 48px / 32px |
| Card padding | 32px / 24px |
| Grid gaps | 24px (cards), 16px (chips, small items) |

### 3.3 Radius, borders, elevation (minimal = flat)

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 8px | Chips, inputs, small buttons |
| `radius-md` | 12px | Buttons, image frames |
| `radius-lg` | 20px | Cards, mockup frames |
| `radius-full` | 999px | Pills, avatars, timeline dots |
| Border | 1px `line` | Default card edge (preferred over shadows) |
| `shadow-1` | 0 1px 2px rgb(15 27 45 / 6%) | Resting cards (optional) |
| `shadow-2` | 0 12px 32px rgb(15 27 45 / 8%) | Hover / floating mockups only |

**No** glassmorphism, glow, neon or gradient borders. That was Design 1's AI look, which the team moved away from.

### 3.4 Z-index scale

`0 base · 10 sticky elements · 40 dropdowns · 50 nav · 60 dialogs/assistant · 70 skip-link/toasts`

---

## 4. Imagery

### 4.1 What images are for (decision: numbers + images over text)

| Image type | Source | Where |
|---|---|---|
| **Product mockups** | Built in HTML/SVG (crisp, translatable, light) | Our Work, Home (Project Visualization §6.2) |
| **Real company photos** | XionTech's own (team, office, events, robot) | About, Careers, "Inside XionTech" |
| **Diagrams** | XionTech architecture (XT Smart Platform) | /work — shown unaltered and readable |
| **Icons** | One outline set (Lucide), 24px grid, 1.75px stroke | Everywhere |
| Stock photos | **Avoid.** Only for topics (city, industry), never as "our team/office/clients" | Rare |

### 4.2 Image optimization rules (team decision)

| Rule | Spec |
|---|---|
| **Formats** | AVIF first, WebP fallback (served automatically through `next/image`). SVG for icons, logos and diagrams where possible. Never PNG/JPG for photos in production. |
| **Responsive sizes** | Every image declares `sizes` and is served at 1×/2× of its rendered width. No image larger than 2× its display size. |
| **Weight budget** | Hero/primary image ≤ **180 KB** · content photo ≤ **120 KB** · thumbnail ≤ **40 KB** · **total images per page ≤ 1 MB** on first load. |
| **Never upscale** | Display at or below native resolution. Current collage crops (~320–680px) stay ≤ 300px wide until originals arrive. |
| **Aspect ratios** | Fixed set: **16:9** (wide media), **4:3** (cards, gallery), **1:1** (avatars, robot), **3:4** (portrait people). Space is reserved to prevent layout shift (CLS < 0.1). |
| **Loading** | Above-the-fold image: `priority` / eager. Everything else: lazy. Low-quality blur placeholder (LQIP) on photos. |
| **Treatment** | Natural color, no filters, no duotone. Rounded `radius-md`. Optional 1px `line` border on white backgrounds so light photos don't float. |
| **Alt text** | Every meaningful image gets descriptive alt text in all three languages. Decorative images use `alt=""`. |
| **Originals needed** | Request high-resolution originals (≥ 1600px long edge) of the 10 company photos. |

### 4.3 Iconography

Lucide-style outline icons · 24px grid · 1.75px stroke · round caps/joins · color `ink-700` default, `blue-600` interactive, `navy` on gold. Directional icons (arrows) mirror in RTL. **No emoji as icons.**

---

## 5. Core components

> States for every interactive component: default · hover · focus-visible · active · disabled (and loading where relevant). Touch targets ≥ **44×44px**. Transitions 150–250ms ease-out.

### 5.1 Buttons

| Variant | Spec |
|---|---|
| **Primary** | bg `blue-600`, text white, Inter 600 16px, height 48px, padding 0 24px, `radius-md`. Hover `blue-700`. Focus ring 2px `blue-600` + 2px offset. |
| **Secondary** | bg white, 1.5px border `blue-600`, text `blue-600`. Hover bg `blue-50`. |
| **Highlight** (max 1 per page) | bg `gold-400`, text `brand-navy`, for the single most important CTA (e.g. "Start a conversation" in the hero). |
| **Text link** | `blue-600`, underline on hover, arrow icon optional. |
| On dark band | Primary becomes white bg + navy text; secondary becomes white border + white text. |

### 5.2 Navigation bar

White, sticky, 72px tall, bottom border 1px `line` (appears after 8px of scroll). Logo left (start), links center (Inter 500 15px, `ink-700`, active = `blue-600` with a 2px gold underline), language switcher + primary CTA right (end). Mobile: full-width sheet, 56px row height.

### 5.3 Section header

`label` (kicker, `blue-600`) → `h2` (ink-900) → `lead` (ink-500, ≤ 2 lines). Optional **number badge** left of the kicker (e.g. "01"). Left-aligned by default; centered only for short, symmetric sections.

### 5.4 ⭐ Stat / KPI tile (numbers-first core)

```
┌─────────────────────────┐
│ ▬ (gold bar 4×32)        │
│ 25+                      │  ← num-xl, ink-900; "+" gold-600
│ YEARS OF LEADERSHIP      │  ← label, ink-500
│ [context, if true]       │  ← small, ink-500 (optional context)
└─────────────────────────┘
```

- Variants: **strip** (4 tiles in one row, separated by 1px `line` vertical dividers, no card), **card** (white card in a grid), **hero** (single `num-hero`).
- Count-up animation from 0 when the tile scrolls into view (1.2s, ease-out). The final value is shown instantly under reduced motion and server-rendered (SEO).

### 5.5 Image frame / media card

Image (fixed aspect, `radius-md`) + caption (`small`, ink-500) + optional overlay **number chip** (gold-400 bg, navy text, e.g. "15 agents"). Hover: image scale 1.02 inside the frame (no layout shift).

### 5.6 Cards (service / industry / why-us)

White, 1px `line`, `radius-lg`, padding 32px. Anatomy: **icon or number** (top) → `h3` → `small` body (≤ 3 lines) → optional link. Hover: border `blue-200` + `shadow-2`. Whole card clickable when it links (stretched link).

### 5.7 Chips & badges

| Type | Spec |
|---|---|
| Tag (neutral) | bg `surface`, text `ink-700`, `radius-sm`, 13px Inter 600 |
| Tag (brand) | bg `blue-100`, text `blue-700` |
| Highlight | bg `gold-400`, text `brand-navy`. Reserved for "featured / now / most popular" |
| Status | success/warning/danger color + icon + word |
| "& more" | dashed 1px `line` border, ink-500. Signals lists are not exhaustive |

### 5.8 Tabs, accordion (FAQ), forms

- **Tabs:** underline style; active = `blue-600` text + 2px `gold-400` underline; arrow-key navigation (mirrored in RTL).
- **Accordion:** row 56px min, `h4` question, plus icon rotates 45°, 1px `line` dividers.
- **Inputs:** 48px height, 1.5px border `line` → focus `blue-600` + 4px `blue-100` ring; label above (Inter 600 14px); error text below in `danger` with icon; space for the error message is reserved so the layout doesn't shift.

### 5.9 Footer & dark band

The only dark surfaces: **CTA band** and **footer**, both `brand-navy` bg, white text, gold used once (for example the slogan "Get IT Done" or a gold bar).

---

## 6. Signature components (from the team demo)

### 6.1 ⭐ 4-D Process Transformation

**Source of truth for the behavior:** `xiontech-landingpage/variants.html` → `#vb-process` (`data-fourd`). The demo is on a dark background; this spec **adapts it to the white theme and brand colors** and keeps the story.

**Story:** a dot field that turns into what we ship, told as a machine-learning run:

| Stage | Visual state (canvas) | Meaning |
|---|---|---|
| 01 Discovery | ~720 points scattered: noise, clumps, streaks, outliers; mixed markers (dots, crosses, rings) | Raw, messy input: the client's problem space |
| 02 Design | Points cleaned into **4 tidy dot columns** | Structured, preprocessed: the solution is designed |
| 03 Development | Points pull toward 4 icon shapes, noise shrinks; a small **loss curve** drops (top end corner) | Training / building, with visible progress |
| 04 Deployment | Points fit 4 solid icons: **Apps · AI robotics · IoT · Smart platform** (labelled) | Delivered result |

**White-theme color mapping:**

| Element | Demo (dark) | **Spec (white)** |
|---|---|---|
| Background | #121826 | `white` (section may sit on `surface`) |
| Raw / in-progress points | gray rgba(201,207,218,.25–.7) | `ink-400` #8A94A6 at 25–70% opacity |
| Fitted icons (stage 4) | #3E66F3 | **`blue-600` #295896** |
| Loss curve | light gray | `blue-600` line on `line` axes, label `ink-500` |
| Timeline track | dark gray | `line` #E3E8EF, 2px |
| Timeline fill (progress) | #3E66F3 | `blue-600` |
| **Current stage dot** | blue ring | **`gold-400` dot with `brand-navy` 2px ring**. The one gold element in the section. |
| Stage number "01–04" | blue | `blue-600`, `label` style |
| Stage name | white / gray | Active `ink-900` (h3); inactive `ink-400` |
| Stage description | gray | Active `ink-700` (`small`); inactive hidden on mobile, `ink-400` on desktop |
| Method chips (Agile · BMAD-METHOD · V-Model · Metric-driven) | outline pills | Neutral tag chips (§5.7) |
| Play/Pause | dark pill | Secondary button, small (40px height, still a 44px target) |

**Behavior (keep from demo):**
- Auto-plays through 4 stages while on screen: **hold 4.2s, morph 1.3s**. Pauses when off-screen or the tab is hidden.
- Clicking a stage takes manual control (auto-play stops). The Pause/Play toggle is always visible.
- `aria-live` announces the stage name. Stage buttons use `aria-current="step"`.
- **Reduced motion:** starts paused, no morphing; switching stages swaps states instantly.
- Canvas: devicePixelRatio ≤ 2, batched paths (~10 per frame), 720 points desktop / **360 points mobile** (performance).
- Canvas height 360px desktop / 240px mobile; icon labels sit **below** the canvas as real text (translatable, readable by screen readers).

**Numbers-first addition (new):** each stage may show **one key number** next to its name, style `num-md` in `blue-600`. These are placeholders until the team confirms real values: Discovery "[n] weeks" · Design "[n] options / prototypes" · Development "[n]-week sprints" · Deployment "[n] releases / SLA". Never imply round-the-clock engineering.

**Content:** stage texts are supplied by the content owner and are translated en/vi/ar. The ship labels (Apps · AI robotics · IoT · Smart platform) are translated. Icons are shapes, not text.

**RTL:** the timeline runs right→left; canvas columns mirror (stage 1 at the right).

### 6.2 ⭐ Project Visualization (product showcase pattern)

**Purpose:** show what we built (ParentXP, StaffXP, AI agents, A2UI, IoT, XT Smart Platform) as **visual proof with numbers**, not text. One consistent pattern, several "window" types.

**Anatomy (same for every project):**

```
┌──────────────────────────────────────────────────────────────────┐
│ [TAG: Case study · Education · Pro-code]   (brand chip)          │
│ Title (h2/h3, ≤ 8 words)                                         │
│ ┌───────────────┬───────────────┬───────────────┐                │
│ │ 2             │ 15            │ 100%          │  ← KEY NUMBERS │
│ │ platforms     │ agent skills  │ feature parity│    (num-lg)    │
│ └───────────────┴───────────────┴───────────────┘                │
│ ┌──────────────────────────────────────────────┐                 │
│ │        PRODUCT WINDOW (mockup, see types)     │  ← THE IMAGE    │
│ └──────────────────────────────────────────────┘                 │
│ Feature chips: Leave requests · Progress · Attendance · & more   │
│ Caption: "Illustrative — fictional data"                         │
└──────────────────────────────────────────────────────────────────┘
```

Rules:
- **Key numbers row:** 2–3 numbers max, real and approved. If no real number exists yet, use a **capability count** that is true, such as "2 platforms", "15 agents", "3 languages", "4 trigger types".
- **Product window = built UI** in HTML/SVG with fictional data, never a client screenshot. Labelled "Illustrative".
- Window chrome: white, 1px `line`, `radius-lg`, `shadow-2`, a 36px top bar (three `line` dots or a product name). Inside, the product's UI uses the same tokens (navy, blue-600, gold highlights).
- Layout: desktop = text + numbers at the start (5/12 columns), window at the end (7/12); alternate sides between projects. Mobile = stacked (numbers → window → chips).
- Motion: the window's content **animates once** when scrolled into view (cards slide in, the chat reply streams, a chart draws). It never loops endlessly. Off under reduced motion.

**Window types:**

| Type | Shows | Used for |
|---|---|---|
| **App window** (desktop + phone frames) | Dashboard/list UI with real-looking numbers | ParentXP (phone), StaffXP (desktop) |
| **Agent chat window** | User asks → agent replies with an **interactive card** (UI, not text) | PXP/SXP agents, Teams HR agents (Adaptive-Card style) |
| **A2UI canvas window** | Chat on one side drives a canvas (chart / checklist / table) on the other; tabbed flows | A2UI (generic, multi-industry flows, R11) |
| **Automation flow window** | Trigger → steps → ✓ outcome, three cards | Autonomous agents |
| **IoT window** | Camera frame with detection boxes + 2 sensor tiles (sparklines) | AI + IoT (illustrative, no real footage) |
| **Architecture window** | Layered diagram (users/apps → agents/services → infra/data) built in HTML like `variants.html` `.arch`, or the supplied diagram image | XT Smart Platform |

**Project list & number candidates (team to confirm):**

| Project | Window | Number candidates (must be true) |
|---|---|---|
| ParentXP & StaffXP | App + Agent chat | 2 platforms · 6+ staff modules · 3 languages · full feature parity via agent |
| 15 HR agents (D365 + Copilot Studio) | Agent chat (Adaptive Card) | 15 agents · 1 ERP integrated · Teams-native |
| A2UI | A2UI canvas | 3 example flows · "UI, not text" |
| Autonomous agents | Automation flow | 3 trigger types |
| AI + IoT | IoT window | 3 capabilities · live sensors |
| XT Smart Platform | Architecture | 7 layers · 6 apps · 5 device types |

---

## 7. Motion

| Token | Value | Use |
|---|---|---|
| `dur-fast` | 150ms | Hover, focus, color changes |
| `dur-base` | 250ms | Dropdowns, accordions, tabs |
| `dur-slow` | 600ms | Section reveal |
| `ease-out` | cubic-bezier(.2,.8,.2,1) | Entrances |
| `ease-in-out` | cubic-bezier(.4,0,.2,1) | Morphs (4-D) |

Rules:
- Minimal: **fade + 16px rise** on reveal (no blur, no glow, no shimmer).
- Allowed always-on motion: only the 4-D canvas (pausable) and count-ups (run once).
- Animate only `transform` and `opacity`.
- **`prefers-reduced-motion`:** everything static, final states shown.

---

## 8. Internationalization & RTL

- Locales: en (source), vi, ar. Fonts per §2.1, swapped by `lang`.
- RTL: use logical spacing (start/end), mirror layouts, timelines, tabs and arrows. Keep logos, numbers, emails, phones and code left-to-right.
- Text expansion: Vietnamese and Arabic can run 15–30% longer. Buttons and chips must wrap gracefully, with no fixed widths on text containers.

---

## 9. Accessibility (non-negotiable)

- Text contrast ≥ 4.5:1 (large text ≥ 3:1). All pairs in §1 are verified.
- Focus visible on every interactive element (2px `blue-600` ring + offset).
- Keyboard: tab order = visual order; tabs, accordion and the 4-D timeline operable by keyboard.
- Color is never the only signal (status = icon + word; charts = direct labels).
- Images: alt text in 3 languages; mockups' decorative parts `aria-hidden`, with their meaning given in text.
- Forms: visible labels, inline errors, no layout shift.

---

## 10. Performance budget

| Metric | Target |
|---|---|
| LCP | < 2.5s (4G mobile) |
| CLS | < 0.1 |
| INP | < 200ms |
| Images per page (first load) | ≤ 1 MB |
| Fonts | 2 families (+ 2 for Arabic only on `/ar`), subset, `display: swap` |
| JS animation | Only the 4-D canvas + count-ups; paused off-screen |

---

## 11. Plan — how we get from this document to code (no code yet)

| Phase | Output | Review gate |
|---|---|---|
| **0. Approve this doc** | Team signs off on colors, fonts, the 4-D adaptation and the Project Visualization pattern; open decisions (§12) answered | ✅ Team |
| **1. Tokens** | Color, type, spacing, radius, motion tokens as CSS variables / Tailwind theme (one source file) | Visual token sheet (1 page) |
| **2. Core components** | Button, nav, section header, **stat tile**, image frame, cards, chips, tabs, accordion, inputs, footer, all states | Component gallery page (en + ar) |
| **3. Signature components** | **4-D Process** (white theme, ported from `variants.html`), **Project Visualization** (6 window types) | Demo with the team |
| **4. Pages** | Home → Our Work → Services → About → Careers → Contact → FAQ → legal pages, built only from components | Page-by-page review |
| **5. QA** | 3 languages × 4 widths, accessibility audit, Lighthouse (performance budget §10), image weight check | Release checklist |

## 12. Open decisions for the team

1. **Codebase:** build the minimal design as a new variant (Design 4) or restyle an existing one? The content, i18n and pages can be reused from any of the three.
2. **Stage numbers in the 4-D Process:** which true numbers per stage (§6.1)?
3. **Project numbers:** confirm the number candidates in §6.2 (only true ones go live).
4. **Highlight button (gold):** which single CTA gets it: hero "Start a conversation", or "Book a call"?
5. **Photos:** when can we get high-resolution originals of the company photos (≥ 1600px)?
6. **AI chat assistant** (from Design 1): keep it in the minimal design (restyled white/navy) or drop it?
