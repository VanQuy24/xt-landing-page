---
title: 'Hero image and News section on Home'
type: 'feature'
created: '2026-10-12'
status: 'done'
baseline_commit: '7418dd6f3c097e44777ec1a757423f189fefd3fd'
review_loop_iteration: 0
context:
  - '{project-root}/design-system/xiontechs/MASTER.md'
  - '{project-root}/AGENTS.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The Home hero is text-only and its right half is empty white. Home also has no company news, so visitors don't see recent proof that the team is active (client visits, workshops, the new office).

**Approach:** Fill the hero's right column with an abstract free-licensed stock image (circuit board, navy + gold). Add a News section after "Who we are" with four items: new office (featured, "Latest"), Agentic Workflow workshop, Client Visit Spotlight, Project Kickoff. Images come from newxion.com/newsroom and the team's own photos.

## Boundaries & Constraints

**Always:**

- Hero image: abstract stock image only, no people. Free Unsplash License, by Brecht Corbeel. Rounded `radius-lg` frame, white page stays white.
- Images go in `src/assets/` and render through `astro:assets` (AVIF/WebP). They must be pre-cropped to MASTER aspect ratios (1:1, 4:3, 3:4, 16:9) and never served above 2× display size.
- Weight: hero ≤ 180 KB, content photos ≤ 120 KB, thumbnails ≤ 40 KB.
- Hero image loads eager with `fetchpriority="high"`; news images load lazy.
- All visible text, alt text and dates come from `en.json` and `vi.json` and from `content/{en,vi}/home.md`. Theme tokens only.
- Copy from newxion.com is kept word for word. The only change is "XionTech" → "XionTechs" for this site's brand.
- Kickoff text keeps "Besco Delivery Center".
- Dates render as `<time datetime>`, formatted per locale. The new-office item shows a "Latest" chip instead of a date.
- `npm run verify` passes.

**Ask First:**

- Adding a nav link to News, or any new dependency.
- Writing the new office's street address (unknown; only "7th floor, Ho Chi Minh City" is confirmed).

**Never:**

- People, offices or "our team" shown in stock images.
- Full-bleed or dark hero background, overlays or gradients.
- Links on news cards.
- Using the unused newsroom posts (Town Hall, Lunar New Year, AI in Action).
- Committing the scratch/original downloads.

## I/O & Edge-Case Matrix

| Scenario      | Input / State | Expected Output / Behavior                                                                        | Error Handling                       |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Desktop hero  | ≥1024px       | Text left (7 cols), image right (5 cols), 1:1                                                     | N/A                                  |
| Mobile hero   | <1024px       | Image stacks under the CTAs at 16:9; no horizontal scroll                                         | N/A                                  |
| Vietnamese    | `/vi/`        | All news titles, bodies, alts and dates in Vietnamese; dates as `31 thg 7, 2026` style via `Intl` | Missing `vi` key fails `astro check` |
| Featured item | new office    | Building photo (3:4) plus 3 office thumbnails (4:3) and "7th floor, Ho Chi Minh City" pin line    | N/A                                  |

</frozen-after-approval>

## Code Map

- `src/components/sections/Hero.astro` -- hero markup; becomes a 12-col grid with the image
- `src/components/sections/About.astro` -- pattern for `<Image>` widths/sizes, `Icon name="pin"`
- `src/components/HomePage.astro` -- section order; insert `<News>` between About and Faq
- `src/components/ui/{Section,SectionHeader,Chip}.astro` -- section shell, header, "Latest" chip
- `src/i18n/locales/{en,vi}.json` -- dictionaries (`en` defines the type)
- `design-system/xiontechs/content/{en,vi}/home.md` -- page copy source of truth
- `design-system/xiontechs/MASTER.md` -- §4.1 image table, §5.7 media card

## Tasks & Acceptance

**Execution:**

- [x] `src/assets/hero-circuit.jpg`, `src/assets/news/*.jpg` -- add pre-cropped images. Hero: 1:1, about 1600 px. Kickoff: team photo from the collage, 4:3. Client visit: meeting room panel, 4:3. Agentic: workshop panel, 4:3. Office 1–3: 4:3. Building: move `office-locate-at.webp` to `news/office-building.webp`. Long edge ≤ 1600 px. -- clean single-photo cards, small repo
- [x] `src/assets/new-office-{1,2,3}.jpg`, `src/assets/office-locate-at.webp` -- replace with the cropped `news/` versions -- one image location
- [x] `src/components/sections/Hero.astro` -- `lg:grid-cols-12`: text `lg:col-span-7`, `<Image>` `lg:col-span-5`, `aspect-video lg:aspect-square`, `rounded-lg object-cover`, eager + high priority, `alt` from i18n (descriptive, it sets the tone) -- fills the empty half
- [x] `src/components/sections/News.astro` -- new section `id="news"` with a top `border-line` so it doesn't merge with About. SectionHeader first. Then the featured block: building 3:4 left (`lg:col-span-4`); right side has the chip, h3, body, pin line and a 3-col row of office thumbnails. Then a 3-col grid of cards: 4:3 image, date, h3, ≤3-line body. -- the news list
- [x] `src/components/HomePage.astro` -- render `<News lang>` after `<About>` -- placement
- [x] `src/i18n/locales/en.json`, `vi.json` -- add `hero.image.alt` and a `news` block: label, heading, latest, featured {title, body, place, alts}, items[] {date ISO, title, body, alt} -- text in dictionaries
- [x] `design-system/xiontechs/content/{en,vi}/home.md` -- add "## 9a. News" with Must communicate, Source and copy; add the hero image line under §1 with the photo credit and link -- copy stays the source of truth
- [x] `design-system/xiontechs/MASTER.md` -- §4.1: add the row "Abstract stock (no people) | Home hero only". Add the News section to §5 -- rules match the code

**Acceptance Criteria:**

- Given Home at 1440 px, when it loads, then the hero shows the circuit image beside the text and no empty white half.
- Given Home, when scrolled past "Who we are", then News shows the featured new-office block and 3 cards, ordered Agentic (31 Jul 2026), Client visit (10 Oct 2025), Kickoff (8 Apr 2025).
- Given the production build, when images are inspected, then each served file is within budget and none is wider than 2× its displayed size.
- Given 390 px width, when the page is scrolled, then `scrollWidth` equals the viewport width.

## Design Notes

- New-office title: "New Home, New Heights: Our 7th-Floor Office". Body: "Our Ho Chi Minh City team has set up in a new office on the 7th floor, from unpacking day to the first full day at our desks." Every claim in it is visible in the photos.
- Agentic card: title "Work Smart, Play Sharp". Body: "On July 31, we organized the "Thực Chiến AI với Agentic Workflow" workshop, where team members shared practical experiences and demonstrated how they leverage AI tools in their daily work." (live copy, sentence 1 of paragraph 2).
- Date formatting: `new Intl.DateTimeFormat(lang, { dateStyle: 'medium' })` with `timeZone: 'UTC'`.

## Verification

**Commands:**

- `npm run verify` -- expected: prettier, eslint, astro check, build all pass

**Manual checks (if no CLI):**

- Screenshot `/` and `/vi/` at 1440 and 390 px. Check the hero, the News layout, no overflow and Vietnamese text.

## Suggested Review Order

**News section**

- Entry point: images and dates keyed by item `id`, sorted newest first.
  [`News.astro:27`](../../src/components/sections/News.astro#L27)

- Lookup fails loudly if a dictionary id has no image or date.
  [`News.astro:55`](../../src/components/sections/News.astro#L55)

- Featured new-office block: building 3:4 plus three office thumbnails.
  [`News.astro:63`](../../src/components/sections/News.astro#L63)

- Dated cards; workshop name wrapped in `lang="vi"` for screen readers.
  [`News.astro:110`](../../src/components/sections/News.astro#L110)

- Placed after About.
  [`HomePage.astro:33`](../../src/components/HomePage.astro#L33)

**Hero image**

- 7/5 grid; decorative abstract image, eager and high priority.
  [`Hero.astro:21`](../../src/components/sections/Hero.astro#L21)
  [`Hero.astro:42`](../../src/components/sections/Hero.astro#L42)

**Copy and rules**

- News strings per locale; ids link to images.
  [`en.json:298`](../../src/i18n/locales/en.json#L298)
  [`vi.json:298`](../../src/i18n/locales/vi.json#L298)

- Copy source of truth: hero credit and §9a News.
  [`home.md:41`](../../design-system/xiontechs/content/en/home.md#L41)
  [`home.md:233`](../../design-system/xiontechs/content/en/home.md#L233)

- Design rules: abstract-stock row, treatment exception, §5.16 News + hero layout.
  [`MASTER.md:241`](../../design-system/xiontechs/MASTER.md#L241)
  [`MASTER.md:357`](../../design-system/xiontechs/MASTER.md#L357)
