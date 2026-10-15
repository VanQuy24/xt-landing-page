# Home header and hero

Approved reference: the supplied desktop composition, with existing English and Vietnamese copy preserved. This override applies only to Home; all sections after the hero and other page headers retain their existing design.

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
