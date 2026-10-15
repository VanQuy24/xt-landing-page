# Home

Approved references: the supplied desktop hero composition and the two Services examples. This override applies to Home's header, hero and Services. Other sections and other page headers retain their existing design.

## Header

- White, sticky, 72px content height. Original brand mark and wordmark at the left, seven existing links in the center, EN/VI and a gold contact CTA at the right.
- Inline navigation begins at 1280px. Below this, use the existing mobile sheet. Desktop resize closes the sheet, unlocks scrolling, clears inert content and moves focus to the logo if necessary.
- Home uses a wider container and fluid wordmark size. Other pages keep the default header variant.

## Hero

- Keep all current title, subtitle, CTA, slogan, numbers, labels and office context. Highlight the final phrase of the title using a dictionary key. New Texas/Vietnam location labels are localized.
- Center the white title, blue-200 subtitle and two CTAs above the city scene. Main CTA is gold; secondary is transparent with a pale border. Both have decorative arrow icons and white focus rings.
- The slogan is a rounded navy pill with a gold border, centered on the existing golden arc. Location labels and pins are positioned relative to the image frame.
- Numbers appear on the dark lower edge: white values and suffixes, blue-200 labels and context, vertical dividers on desktop and horizontal dividers on mobile. Preserve count-up behavior and no-JS final values.
- Exceptions to MASTER: the hero is dark, more than one gold accent is intentional, scenery retains its native aspect ratio, and the numbers are part of the hero rather than a separate white section.

## Images and responsive layout

- User-supplied assets: `src/assets/hero-texas-vietnam.png` and `src/assets/hero-texas-vietnam-mobile.png`. These replace the former scenic stock image; do not describe the composite as a real company office photograph.
- One native picture, generated AVIF/WebP sources through Astro assets. Mobile below 768px; desktop at 768px and above. Eager, high-priority, decorative empty alt, explicit dimensions and responsive source sizes. No separate preload that could download the wrong art direction.
- Preserve both skylines without stretching. Position the scene in document flow with a negative overlap of its empty sky, so extra text pushes the scene down rather than colliding with it. Blend the empty sky and bottom into the hero-navy surface.
- Fluid typography and spacing between breakpoints. Mobile CTAs and metrics stack; tablet retains the landscape scene and collapsed navigation. Content may grow vertically, including at 200% zoom.
- Between 430px and 767px, progressively crop excess sky and water from the portrait frame without scaling its proportions or losing either skyline. Recalculate the label and slogan offsets from the same crop amount. A navy fade behind the metric strip protects contrast.
- No JS for positioning or decorative motion. Retain Manrope/Inter and the existing menu/count-up scripts. Respect reduced motion.

## Acceptance

- Compare desktop at 1536×1024 to the reference, allowing different line lengths from the preserved copy and the existing official logo/navigation.
- Check EN/VI at 320, 375, 390, 430, 640, 768, 820, 1024, 1280, 1440 and 1536px, phone landscape, and either side of 768/1024/1280px.
- Sweep widths down and up; check overflow, accidental overlaps, source selection, menu resize, keyboard, focus, zoom, reduced motion, no-JS content and console/network failures.
- Iterate screenshots with Chrome DevTools MCP. Selected hero image target ≤180 KB, no layout shift from image loading. Run `npm run verify` before delivery.

## Services

- Combine the centered heading of the first reference with the accordion/detail layout of the second. Preserve the eight service names and order, edit descriptions for brevity, and keep every claim grounded in the existing content. Dictionaries and `content/{en,vi}/home.md` contain the final copy.
- Use existing navy/blue tokens, Manrope/Inter, a surface section, white rows, blue-50 selected rows, thin borders and 20px radii. No new palette. Content width up to 1380px plus gutters.
- Initially no service is selected and no illustration is requested. Show eight horizontal cards with icon, title, a two-line description preview and right chevron: four columns from 1280px, two columns from 640px, one column below 640px. The help card spans the full width below the grid.
- Selecting any card changes to detail mode. From 1024px: left list/right panel at approximately 46/54, rows numbered 01–08, exactly one open. The selected row shows its short description and contact CTA. The right panel shows the service identity, benefit headline, up to three capability chips and its illustration. A help/contact card sits below it. A localized All services button above the list returns to the grid, clears selection and restores focus to the previously selected card.
- Below 1024px: one column; move the same visual DOM into the open row before its CTA. Selection and focus survive resize. There is no duplicated visible or screen-reader content, no tabs, and no autoplay.
- After a mobile card selection or returning to the grid, bring its summary into view only if it ended up outside the viewport. Keep keyboard focus on the same summary. Use instant scrolling for reduced motion.
- Use native details/summary with named grouping as the no-JS fallback. Enhancement supplies aria-expanded/aria-controls and one-open behavior. Contact links target the existing section; there are no service-detail routes.
- Image sources: eight generated originals in `src/assets/services/`, created with the built-in image_gen tool. The full reproducible prompt set is `services-image-prompts.json`. Images are decorative (empty alt), text-free, white/blue isometric technology scenes, not real product screenshots.
- Optimize through Astro to AVIF/WebP at 480/800/1200px, never upscale. Reserve image space and target ≤120 KB per served variant. Inert templates prevent unselected image requests; native noscript pictures preserve the image fallback. Load only after a user selects a service and keep only the selected responsive picture live. Last selection wins while decoding; an image error leaves all text/CTAs usable. Returning to the grid cancels pending selections.
- The user-requested grid/list transition uses 360ms FLIP transforms with ease-out and counter-scaled summaries, plus a 240ms panel entrance after a 100ms delay. Card clipping prevents transformed content causing horizontal overflow; summary focus rings sit inside that boundary. The following visible page sections move with the reflow. Scroll anchoring is temporarily suppressed during the transition and restored afterward. Interruptions rebase the animation; resize cancels obsolete transforms. Reduced motion switches instantly with no keyframe animations. Native keyboard disclosure interaction, ≥44px targets and visible focus are required.
- Review EN/VI with Chrome DevTools MCP at 320/375/390/430/640/768/820/1023/1024/1025/1280/1440/1536px and landscape. Check all services, rapid selection, resizing, slow/failed images, no-JS fallback, contrast, network and console. Capture desktop/tablet/mobile evidence and pass `npm run verify`.
