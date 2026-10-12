# AI-tell audit

Date: 2026-10-12. Mode: detect only. Nothing in `src/`, `MASTER.md` or the content files was changed.

## What was audited

The live site at https://xt-landing-page.pages.dev/ is built from **`origin/develop`** at `7418dd6`, merge of PR #13. That branch has the full site: 51 files in `src/` and `MASTER.md` v1.1, whose fonts and colors match the live page.

This audit was run from the branch `docs/content-vi-sync-open-data`. That branch is behind `develop`. Its `src/` is the first scaffold, with Header and Hero only, and its `MASTER.md` is the older generated file. Neither is what ships, so every file path below means **`origin/develop`** unless it says otherwise. To read them, run `git checkout develop`, or merge `develop` into this branch first.

| Target                                                                                        | How it was checked                                                                                  |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Live** page                                                                                 | Screenshots at 1440px and 390px, a silhouette render, DOM checks in the browser                     |
| **Code**, `origin/develop:src/`                                                               | Scanner `detect.mjs` on an exported copy, plus the built HTML and CSS downloaded from the live site |
| **Copy**, `src/i18n/locales/en.json` on develop and `design-system/xiontechs/content/en/*.md` | Read in full, cross-checked against each other and against the live page                            |

### How to read the findings

`MASTER.md` v1.1 is the team's design contract. Its status line says "team sign-off pending". Many of the tells below are things MASTER asks for, so the Builder followed the rules correctly. Changing those means changing MASTER. Each finding says which kind it is:

- **MASTER rule**: built as MASTER says. The tell sits in the rule itself. Since sign-off is still pending, now is the cheap moment to change it.
- **Build**: the page differs from MASTER, or MASTER says nothing about it.
- **Copy**: the words, in `en.json` and the content files.

What each fix needs:

- **Design decision**: the team has to choose how it should look.
- **Company data**: someone at XionTechs has to supply or confirm a fact.
- **Ready**: the Builder or Content lead can do it now with what is already in the repo.

Evidence: **Code** means found in source, **Rendered** means seen in the screenshots or measured in the browser, **Judged** means a call made by eye.

## Screenshots

| File                                             | What                                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| [desktop-1440.png](desktop-1440.png)             | Live page, full length, 1440px wide                                                   |
| [mobile-390.png](mobile-390.png)                 | Live page, full length, 390px wide                                                    |
| [silhouette-full.png](silhouette-full.png)       | Live page with text and images turned into black blocks, to judge the structure alone |
| [crop-hero-stats.png](crop-hero-stats.png)       | Hero and number strip                                                                 |
| [crop-why-choose-us.png](crop-why-choose-us.png) | "Why choose us" cards                                                                 |
| [crop-clients-mock.png](crop-clients-mock.png)   | Clients section with the parent-app mock                                              |
| [crop-process.png](crop-process.png)             | 4-D process with the dot animation                                                    |
| [crop-footer.png](crop-footer.png)               | Contact and footer                                                                    |
| [photo-ai-training.webp](photo-ai-training.webp) | The full-size "Hands-on AI training" photo from `src/assets/`                         |

The live photos and product mocks load only when you scroll to them. A plain full-page capture shows empty boxes, so these screenshots were taken after scrolling the whole page.

## Summary

| Priority | Who notices                                                              | Count |
| -------- | ------------------------------------------------------------------------ | ----- |
| P0       | Anyone. A visitor would say "this looks generated" or "this isn't true." | 4     |
| P1       | A designer or developer would spot it.                                   | 11    |
| P2       | Polish.                                                                  | 9     |

The colors and type are not the problem. The palette is sampled from the logo, the fonts were chosen with written reasons, and MASTER already bans gradients and glow. What reads as AI falls into three groups:

1. **One photo is visibly AI-made** and shows another company's logo.
2. **The copy** uses headlines that could sit on any IT company's page.
3. **The template chrome** puts a small all-caps label over every section, an icon chip on every card, and number tiles that count list items. MASTER asks for most of this.

---

## P0

### P0-1. One team photo has AI-invented text and a fake logo

- **Where:** "Who we are" photos. `src/assets/ai-training.webp`, captioned "Hands-on AI training". See [photo-ai-training.webp](photo-ai-training.webp).
- **Evidence:** Rendered. Commit `6830ecb` says so too: "in ai-training.webp the AI rewrote the banner logo as 'ATS' and the right banner title as nonsense text; to be replaced."
- **Source:** Build. `MASTER.md` §4.2 calls all four "Who we are" photos "AI-enhanced versions of the old low-res crops" and stand-ins until originals arrive.
- **Why it reads as AI:** Melted lettering on signs is the image tell most people know. Both roll-up banners carry an "ATS" logo instead of the XionTechs mark. The right banner reads "CLIENTSERS OUR PRIDE" over rows of smeared fake text. MASTER principle P7 says "Real photos are only of XionTech". This photo shows another brand's logo on XionTechs' own page. The other three photos have no visible text errors, but they are AI-enhanced as well.
- **Suggested fix:** Remove `ai-training.webp` now and show three photos. The page displays them at 300px, so the original low-res crops would work in the meantime. Swap in real originals when they arrive.
- **Needs:** Ready to remove. Company data for the originals, `MASTER.md` §4.2 "Originals needed".

### P0-2. Client work is on the page before the client has approved it

- **Where:** "Who we build for" ([crop](crop-clients-mock.png)). `en.json` `clients.names`, `clients.work`, `clients.window`. Content: `content/open-data.md` rows 6 and 7.
- **Evidence:** Rendered.
- **Source:** Build. `MASTER.md` §6.2 says the key numbers must be "real and approved".
- **Catalog ID:** L4 family, unconfirmed trust signals.
- **Why it reads as AI:** The page shows a "Client work · Education" card for Varkey Education, with a parent-app mock that pays "$1,250". `open-data.md` row 6 says Varkey's OK to describe their apps is still missing. CyberHive is named in large type with no work behind it, and row 7 is also open. A named client with nothing under it is the classic generated logo wall. It also breaks the project rule to never invent clients or claims.
- **Suggested fix:** Hide the Varkey card and the CyberHive name until both approvals arrive. Keep the domains line, which comes from the live FAQ.
- **Needs:** Company data. Sales owns rows 6 and 7.

### P0-3. Headlines that could front any IT company

- **Where:** Copy, `en.json`:
  - `hero.title`: "Crafting secure and innovative IT solutions"
  - `services.heading`: "Technology solutions that transform your business"
  - `why.heading`: "Our priority, our commitment, our solutions"
  - `about.heading`: "We deliver consumer-centric tech solutions"
- **Evidence:** Code, since the scanner flags "transform your" as CP1 in the live HTML. Also Judged.
- **Catalog ID:** CP1, a vague aspirational headline. CP4, a three-part slogan.
- **Why it reads as AI:** None of these say what XionTechs builds or for whom. Swap in another company's name and they still work. The same words repeat across `content/en/home.md`: "solutions" 26 times, "AI-powered" 9, forms of "transform" 7, "AI-driven" 5. A visitor stops reading after the third "solutions".
- **Suggested fix:** Each heading names a concrete thing, using facts the page can already show without waiting on anyone. The hero could name the school products and custom software, built by engineers in Ho Chi Minh City with an office in Plano. Section headings can describe the section: "What you can hire us for", "Software we built for schools", "How a project runs". Leave Varkey's work out of the hero until P0-2 is cleared. The team decided on 2026-10-11 to keep live copy word for word, so this means reversing that decision for headlines.
- **Needs:** Team agreement to rewrite headlines. After that it is Ready for the Content lead, with no new facts needed.

### P0-4. "Why choose us" is the three-identical-cards template

- **Where:** Live ([crop](crop-why-choose-us.png)). `en.json` `why`.
- **Evidence:** Rendered.
- **Source:** MASTER rule. §5.8 gives service and why-us cards the same anatomy: icon on top, `h3`, short body.
- **Catalog ID:** L2, three identical icon-topped feature cards.
- **Why it reads as AI:** Three equal cards, each with an icon in a tinted square, a heading and two lines. The claims inside can't be checked: "exceptional experiences", "the highest ethical standards", "exceeding industry standards". Layout and copy are both the default.
- **Suggested fix:** Cut the section, or replace it with one or two things a buyer can check: the reply time ("we reply by email within 24 business hours"), the office hours, the named 4-D process. The careers values already cover integrity and quality.
- **Needs:** Design decision. Company data for any new proof point.

---

## P1

### P1-1. A small all-caps label above every section

- **Where:** Live, 9 sections plus the hero: "GET IT DONE", "OUR SERVICES", "PRODUCTS FOR SCHOOLS", "CLIENTS AND DOMAINS", "4-D PROCESS", "WHY CHOOSE US", "WHO WE ARE", "FAQ", "WORK WITH US". Smaller ones too: "OTHER WAYS TO REACH US", "OFFICES", "FEATURES", "DOMAINS". The live HTML has 26 `uppercase` classes.
- **Evidence:** Code and Rendered.
- **Source:** MASTER rule. §5.5 makes the uppercase `label` kicker part of every section header, and §2 allows ALL CAPS only for `label`.
- **Catalog ID:** SD4 and T5, template chrome. Designers call this label an eyebrow.
- **Why it reads as AI:** Most of these repeat the heading under them. "PRODUCTS FOR SCHOOLS" sits over "Our products for schools", "FAQ" over "Frequently asked questions". A label that adds no information is decoration, and generated pages put one on every section.
- **Suggested fix:** Change §5.5 so the kicker is optional and used only when it says something the heading doesn't. Set the survivors in sentence case. "4-D process" over "How we get IT done" earns its place, since it names the method.
- **Needs:** Design decision.

### P1-2. An icon in a tinted square on every card

- **Where:** Live. 8 service cards, 3 "why choose us" cards, the timetabling card, 5 careers perks. `en.json` sets `"icon": "spark"` on "AI-powered solutions" and on the careers perk "Innovative environment".
- **Evidence:** Rendered.
- **Source:** MASTER rule. §4.3 picks Lucide icons and §5.8 puts an "icon or number" on top of each card.
- **Catalog ID:** K6, icon in a tinted rounded-square chip. I3, the stock icon set: the sparkle for "AI", a lightning bolt, a shield, a check mark.
- **Why it reads as AI:** It's the stock feature-card treatment. A sparkle for "AI" is the most overused icon on the web. On a phone the 8 service cards stack into one long column of identical boxes, and the mobile page runs 13,008px tall.
- **Suggested fix:** Drop the chips on the service cards. Eight services read better as a two-column list on desktop and a plain list on mobile. If icons stay, choose them for meaning and retire the sparkle.
- **Needs:** Design decision.

### P1-3. Number tiles that only count the list next to them

- **Where:** Live. "10 Platform features" and "2 School products" in Products. "2 Audiences" and "3 Assistant tasks" in Clients. `en.json` `products.numbers`, `clients.work.numbers`.
- **Evidence:** Rendered.
- **Source:** MASTER rule. §6.2 says that when no real number exists, use "a capability count that is true".
- **Catalog ID:** L4, the number strip. Big numbers with small labels, added for weight rather than proof.
- **Why it reads as AI:** The 10 sits next to a list of ten features, and the 3 next to three chips. A tile that counts its neighbor tells the reader nothing new. "2 School products" also contradicts `content/en/home.md` §4, which lists three products: the platform, timetabling and Buddy360.
- **Suggested fix:** In §6.2, drop the capability-count fallback and keep the rule's last line: "If none is true, drop the row". Then remove the four tiles. Fix the product count once Buddy360's description arrives.
- **Needs:** Design decision. Company data for Buddy360, `open-data.md` row 4.

### P1-4. The headline numbers need backing

- **Where:** Hero strip ([crop](crop-hero-stats.png)). `en.json` `numbers.items`. Content: `home.md` §2.
- **Evidence:** Rendered and Copy.
- **Source:** Build and Copy. MASTER §5.6 provides a context line "if true". The live page shows one only under the office count, though `home.md` §2 has detail lines for all three numbers.
- **Catalog ID:** L4, and M5 for the count-up. MASTER §5.6 asks the numbers to count up from 0 as they scroll into view, which draws attention to numbers that can't hold it.
- **Why it reads as AI:** Round numbers with nothing behind them.
  - "25+ Years of leadership experience": is that one founder's career, or several people's added together? With no detail line, a visitor reads it as company age.
  - "20+ Tech stack expertise" is not a sentence, and it doesn't say what the 20 are.
  - "3 Office locations" sits above a line naming two places, "Plano (USA) · Ho Chi Minh City (Vietnam)". `home.md` §2 says one office is moving.
  - The headcount is still a placeholder, `open-data.md` row 2.
- **Suggested fix:** Show each number with its detail line, or cut it. Write "2 cities" instead of "3 offices" until the move settles. A confirmed headcount would be the strongest of the four.
- **Needs:** Company data from HR and the Director.

### P1-5. Every surface is the same rounded card with a thin grey border

- **Where:** Live. Service cards, "why choose us", the timetabling card, office cards, both product windows.
- **Evidence:** Rendered.
- **Source:** MASTER rule. §3.3 makes a 1px `line` border with `radius-lg` the default card, and §5.13 puts offices in small cards.
- **Catalog ID:** K2, the same rounded corners and border on everything.
- **Why it reads as AI:** When every box looks the same, nothing looks more important than anything else.
- **Suggested fix:** Keep cards only for things that are separate objects, like the product windows. Let services and offices sit flat on the page as lists.
- **Needs:** Design decision.

### P1-6. The section order is the stock order

- **Where:** Whole page ([silhouette](silhouette-full.png)).
- **Evidence:** Rendered silhouette, Judged.
- **Source:** MASTER rule and Copy. MASTER principle P1 says every section opens with a number, picture or visual. `home.md` sets the order.
- **Catalog ID:** L9, the standard section waterfall: hero, numbers, feature grid, product, clients, how it works, why us, about, FAQ, contact.
- **Why it reads as AI:** In the silhouette every section has the same shape: a short dash, a heading block on the left, then a grid. Next to five other IT-services sites you could not pick out XionTechs.
- **Suggested fix:** Order sections by what a buyer needs to decide, and give the page one structural idea. The strongest real material is the school products, the Varkey work once approved, and the team photos. Leading with proof instead of an eight-card service grid would set the page apart. Cutting "Why choose us" already helps.
- **Needs:** Design decision.

### P1-7. The 4-D animation claims the company deploys IoT

- **Where:** Process ([crop](crop-process.png)). `en.json` `process.ship`: "Apps", "AI robotics", "IoT", "Smart platform", under `process.shipLabel`: "What we deploy".
- **Evidence:** Rendered and Code.
- **Source:** MASTER rule. §6.1 stage 4 names these four icons, carried over from a demo.
- **Why it reads as AI:** The labels came from the demo, not from the company. "IoT" appears nowhere in the content files, and "Smart platform" is not a service either. The four labels also sit right above four step names they don't match, so a reader tries to pair them up.
- **Suggested fix:** Use labels from the services list, or drop the labels and let the shapes stay abstract. If IoT is a real service, add it to Services.
- **Needs:** Company data on IoT. Design decision on the labels.

### P1-8. The default four-column footer

- **Where:** Live ([crop](crop-footer.png)). Brand, Contact, Company, Social.
- **Evidence:** Rendered.
- **Source:** MASTER rule. §5.14 takes the footer content from `content/sitemap.md`.
- **Catalog ID:** L8, the four equal footer columns.
- **Why it reads as AI:** Mild here, since every link is real and there is no newsletter box. The phones and email repeat the contact section right above it.
- **Suggested fix:** A shorter footer with the legal line, legal links and socials.
- **Needs:** Design decision.

### P1-9. Facts that contradict each other

| #   | Contradiction                                                                                                                                                                                                                                                                                                                                                 | Where                                                                                                        | Needs                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| a   | The FAQ answer lists 4 services and adds private equity as an industry. Services lists 8, and Domains lists only EdTech, healthcare and logistics. The FAQ also says "digital insights and analytics" where Services says "AI-driven analytics".                                                                                                              | `en.json` `faq.items[0]` vs `services`, `clients.domains`                                                    | Company data: is private equity a real sector?                                                 |
| b   | The hero promises "secure" software. The FAQ "How do you ensure data security?" answers with "an integrity mindset" and "ethical standards", which is not a security answer. The privacy policy lists encryption, penetration testing, and ISO 27001 and SOC 2 under "designed to comply". The page must not read as a certification claim unless one exists. | `en.json` `hero`, `faq.items[1]` vs `content/en/privacy.md` "Security Measures" and "Compliance Information" | Company data: which security practices and certifications are real                             |
| c   | The heading says "consumer-centric" on a page selling to schools and businesses. The values call the same idea "client centricity".                                                                                                                                                                                                                           | `en.json` `about.heading` vs `careers.values`                                                                | Ready                                                                                          |
| d   | Home writes the phone as "+84 908 107 552". The privacy policy and terms write "+084-908-107552", which nobody can dial.                                                                                                                                                                                                                                      | `en.json` / `home.md` §11 vs `privacy.md`, `terms.md` "Company Information"                                  | Company data. Legal text is copied word for word, so the company has to fix it                 |
| e   | `home.md` §11 still specifies a form with a "Send brief" button and five form messages. MASTER §5.13 and the live page use an "Email your brief" mail link until a form service exists.                                                                                                                                                                       | `home.md` §11 vs MASTER §5.13                                                                                | Ready: mark the form in `home.md` as "later". Company data for the inbox, `open-data.md` row 3 |
| f   | Careers lists "startup spirit" and "a mature engineering environment" side by side, and promises impact "worldwide" from a team in two cities.                                                                                                                                                                                                                | `en.json` `careers.perks`                                                                                    | Ready, Content lead                                                                            |

### P1-10. Service descriptions are filler

- **Where:** `en.json` `services.items`, `home.md` §3.
- **Evidence:** Code, since the scanner flags "seamless", "seamlessly" and "cutting-edge" in the live HTML. Also Judged.
- **Catalog ID:** CP2, generic superlatives.
- **Why it reads as AI:** Seven of eight descriptions open with "Transform", "Accelerate", "Develop" or "Harness". "Seamless" appears 3 times. The one that reads human is Low-code, because it names real tools: Power Platform, Make, n8n, Retool, Bubble. That's the model for the rest.
- **Suggested fix:** One sentence per service that names a real tool, platform or deliverable. Cloud already names Azure, AWS and GCP, so the rest of its sentence can go. `home.md` §3 already marks this for the Content lead.
- **Needs:** Ready for the cuts. Company data for any new tool names.

### P1-11. The school platform's ten features are generic nouns

- **Where:** `en.json` `products.platform.features`.
- **Evidence:** Judged.
- **Catalog ID:** CP2.
- **Why it reads as AI:** "Smart communication", "Data-driven insights", "Integration and scalability", "Intelligent scheduling". Ten labels with no detail, most of which could describe any product. The dashboard mock beside them shows real tasks, "Wellbeing note", "Attendance", "Timetable", so the picture says more than the list.
- **Suggested fix:** Keep the 3 to 5 features that ship today and say in a few words what each does. Or show only the platform description, which `home.md` §4 already allows.
- **Needs:** Company data: which features are live.

---

## P2

| #   | Finding                                                                                                                                                                   | Where                                                           | Source                                                                                                    | Catalog ID                                         | Suggested fix                                                                                                           | Needs               |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------- |
| 1   | Fake browser windows with three grey dots on both product mocks                                                                                                           | Products and Clients windows                                    | MASTER rule §6.2, which allows "three `line` dots or a generic label"                                     | SD7, fake window chrome                            | Use the generic-label option MASTER already offers. The drawn screens themselves are product-specific and worth keeping | Design decision     |
| 2   | Labels joined with middle dots: "Our product · Education", "Client work · Education", "School platform · Dashboard", "Parent app · AI assistant"                          | `en.json` `products.tag`, `clients.work.tag`, both `window.bar` | Copy                                                                                                      | SD4d                                               | Plain words, or drop the label                                                                                          | Ready               |
| 3   | Pill tags above the product titles                                                                                                                                        | Products and Clients                                            | MASTER rule §5.9 brand tag                                                                                | K5, a pill badge above the title                   | Remove; the section heading already says it                                                                             | Design decision     |
| 4   | Dashed "& more" chip after the three domains                                                                                                                              | Clients                                                         | MASTER rule §5.9, §5.10                                                                                   | none                                               | Remove. The sentence below says the knowledge "runs deepest" in three domains, which is clearer                         | Design decision     |
| 5   | Arrow icon on the hero "Get in touch" button                                                                                                                              | `src/components/sections/Hero.astro:30`                         | Build. MASTER's button table gives the primary button no arrow and allows one only in the "Text link" row | Close to CP3; this is an SVG icon, not a typed "→" | Drop the icon                                                                                                           | Ready               |
| 6   | Process step "Design" says "Custom solutions built on our integrated engineering platform". What platform?                                                                | `en.json` `process.steps[1]`                                    | Copy                                                                                                      | CP2                                                | Name the platform or cut the clause                                                                                     | Company data        |
| 7   | "Who we are" paragraph and bullets: "thrive in today's digital landscape", "cutting-edge technical expertise", "Identify growth opportunities and expand market presence" | `en.json` `about.body`, `about.bullets`                         | Copy                                                                                                      | CP2                                                | Keep the name line and the place line, which are specific and true. `home.md` §9 already flags the paragraph            | Ready, Content lead |
| 8   | FAQ "How do you measure and demonstrate value?" answers with "speed, quality, product impact, and team autonomy" and "validating ROI", with no example                    | `en.json` `faq.items[3]`                                        | Copy                                                                                                      | CP2                                                | One real metric from a past project, or cut the question                                                                | Company data        |
| 9   | Two values both claim to come first: "Quality first" and "Integrity first"                                                                                                | `en.json` `careers.values`                                      | Copy                                                                                                      | none                                               | These are the company's published values, so the company decides                                                        | Company data        |

---

## Already fine

Keep these. They are decisions, not defaults.

- **Navy and gold come from the logo.** `global.css` clears Tailwind's default palette, and MASTER §1 records the logo sampling and contrast checks.
- **The fonts were chosen for this site.** MASTER §2 picks Manrope for numbers and headings and Inter for body text, and explains why Poppins and Figtree were rejected: no Vietnamese subset. Inter is a common default, but here it is paired, scaled and argued for, so it doesn't count as the P0 version of that tell.
- **No gradients, glow or glass.** MASTER principle P2 rules them out and the page follows it.
- **01 to 04 in the 4-D process** number a real sequence. The scanner's SD6 hit is a false positive.
- **Reduced motion works.** With the system setting on, the process animation starts paused and its button reads "Play". Everyone else gets a Pause button.
- **Keyboard focus works.** `global.css:126` gives every focusable element a 2px `blue-600` outline, and the browser confirms it on the logo link and the nav. The scanner's six K7 hits on develop are false positives, because it can't see that global rule.
- **Skip-to-content link** is the first thing keyboard users reach.
- **The hero is left-aligned**, not the centered template.
- **The product windows** draw the product's own screens, a marking queue and a fee payment, with an "Illustrative" caption. That is the honest version of a mockup.
- **The legal footer line** uses real numbers: business license 0318883639, D-U-N-S 665533815.
- **No sideways scrolling at 390px.** The page measures exactly 390px wide on a phone.
- **The cut list** at the bottom of `home.md` already removed the worst template content from the old site: theme-demo testimonials, team and blog posts, the "24/7" claims.

## Scanner output

`origin/develop:src/`, 42 files:

```text
CareersPage.astro, LanguageSwitcher.astro, sections/Brief.astro,
sections/Header.astro, sections/Process.astro, ui/Button.astro
                         P1 K7   No visible keyboard focus   (false positive: global :focus-visible in global.css:126)
ui/ProjectShowcase.astro P1 CP3  Arrow glyph on a CTA  L4    (false positive: the arrows are in a code comment)
```

Live build, `index.html` and `BaseLayout.BG4MM3o2.css`:

```text
index.html  P1 CP1  Vague aspirational headline · transform your
            P1 SD6  Decorative 01 / 02 / 03 markers      (false positive: 4-D is a real sequence)
            P2 CP2  Beige superlatives · seamlessly · seamless · cutting-edge
            P2 SD4d Meta strings joined with middle dots
*.css       P2 M4   Bounce / elastic easing               (Tailwind's built-in @keyframes bounce; nothing on the page uses it)
```

This branch's scaffold `src/`, for completeness: one K7 on `Header.astro`. That file is replaced on `develop`.

The scanner only catches what shows up in code. The eyebrows, icon chips, cards, number tiles, section order and the AI photo come from the screenshots.

## Who needs to answer what

**Company data**, grouped by who likely knows, matching `content/open-data.md`:

- **Sales:** Varkey approval and a CyberHive line (P0-2), Buddy360 (P1-3), which platform features are live (P1-11), a real value metric (P2-8).
- **HR:** headcount (P1-4).
- **Director:** original team photos (P0-1); what "25+ years" counts and the office count after the move (P1-4); IoT (P1-7); private equity (P1-9a); security practices and certifications (P1-9b); the "+084" phone format in the legal pages (P1-9d); the form inbox (P1-9e); the "integrated engineering platform" (P2-6); the two "first" values (P2-9).

**Design decisions**, all of them edits to `MASTER.md` before sign-off, in the order I'd take them:

1. Cut or replace "Why choose us" (P0-4), and rethink the section order (P1-6).
2. Make the section kicker optional (P1-1), drop the card icons on services (P1-2), drop capability-count tiles (P1-3).
3. Cards only for separate objects (P1-5), the process labels (P1-7), the footer (P1-8).
4. The P2 chrome: window dots, pill tags, "& more".

**Ready now**, with no one to ask: remove `ai-training.webp` (P0-1), drop the hero arrow icon (P2-5), the middle-dot labels (P2-2), "consumer-centric" (P1-9c), mark the form as "later" in `home.md` (P1-9e), and the copy already marked `[CONTENT-LEAD: tighten]`.
