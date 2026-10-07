# XionTechs Landing Page

Marketing site for XionTechs. Astro 7 (static output) + Tailwind CSS 4, English and Vietnamese.
Built mainly by AI coding agents following the [BMAD Method](https://docs.bmad-method.org/).

## Prerequisites

| Tool    | Version | Why                                                                                      |
| ------- | ------- | ---------------------------------------------------------------------------------------- |
| Node.js | 22.12+  | Build toolchain (`.nvmrc`)                                                               |
| Python  | 3.x     | `ui-ux-pro-max` skill search scripts (stdlib only)                                       |
| uv      | latest  | BMAD runtime scripts (`_bmad/`) — `pip install uv` or [docs](https://docs.astral.sh/uv/) |

## Getting started

```sh
npm ci
npm run dev        # http://localhost:4321  (en) and /vi/
```

Agent skills, BMAD config and agent instructions are committed — nothing else to install after cloning.

## Scripts

| Command           | What it does                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`     | Dev server                                                                                    |
| `npm run build`   | Static build to `dist/`                                                                       |
| `npm run preview` | Serve `dist/` locally                                                                         |
| `npm run format`  | Prettier (incl. Tailwind class sorting)                                                       |
| `npm run verify`  | Format check + ESLint + `astro check` + build. **CI runs this; it must pass before merging.** |

## Project layout

```text
src/
  components/
    HomePage.astro      # page composition, shared by every locale route
    sections/           # one file per page section (Header, Hero, ...)
    ui/                 # small reusable primitives (Container, ...)
  i18n/
    config.ts           # locale list (also read by astro.config.mjs)
    index.ts            # getDictionary, stripLocale, localeNames
    locales/en.json     # source of truth for all copy
    locales/vi.json     # must have exactly the keys of en.json (astro check fails otherwise)
  layouts/BaseLayout.astro  # <html lang>, SEO head, hreflang, fonts
  pages/
    index.astro         # /      (en, default locale, no prefix)
    [lang]/index.astro  # /vi/
  styles/global.css     # Tailwind entry + design tokens (@theme)
design-system/xiontechs/MASTER.md   # design rules (colors, type, components, checklist)
_bmad/                  # BMAD config + runtime scripts
_bmad-output/           # BMAD planning artifacts: brief, PRD, architecture, tickets (committed)
.claude/skills/         # agent skills for Claude Code
.agents/skills/         # same skills for Codex and other AGENTS.md-based tools
```

## Common tasks

**Add copy** — add the key to `src/i18n/locales/en.json` and `vi.json`, read it with `getDictionary(lang)`. Never hardcode visible text in components.

**Add a section** — create `src/components/sections/<Name>.astro` taking a `lang` prop, add its copy to both locale files, render it in `HomePage.astro`.

**Add a locale** — add the code to `src/i18n/config.ts`, add `locales/<code>.json`, register it in `src/i18n/index.ts` (`dictionaries`, `localeNames`). Fonts in `astro.config.mjs` must include that script's subset.

**Change design tokens** — edit `@theme` in `src/styles/global.css` and keep `design-system/xiontechs/MASTER.md` in sync.

## Working with AI agents (BMAD)

Agent instructions live in [AGENTS.md](AGENTS.md) (`CLAUDE.md` imports it). Skills are invoked by name in Claude Code (`/bmad`, `/bmad-prd`, ...) or Codex.

Typical flow for new work:

1. `bmad` — ask "what should I do next?"; it recommends the next skill from what is installed.
2. **Plan** — `bmad-product-brief` → `bmad-prd` → `bmad-ux` (use `ui-ux-pro-max` + `MASTER.md`) → `bmad-architecture`.
3. **Slice** — `bmad-ticket` breaks the initiative into epics and stories under `_bmad-output/`.
4. **Build** — `bmad-build <story>` implements one story; it must finish with `npm run verify` passing.
5. **Review** — `bmad-code-review` / `bmad-review`, then open a PR.
6. When an agent makes a repeated mistake, run `bmad-project-context` with `record` so the rule lands in `AGENTS.md`.

Commit everything BMAD writes to `_bmad-output/` — it is the shared context the next agent (and teammate) reads.

### Updating skills

- BMAD: ask the `bmad` skill to "update" (runs `npx skills update -p -y`, then refreshes `_bmad/`). Versions are pinned in `skills-lock.json`.
- ui-ux-pro-max: `npx ui-ux-pro-max-cli update`. It reinstalls bundled extras (`slides`, `banner-design`, `design`, `ui-styling`); delete those afterwards — `ui-styling` pushes shadcn/React, which this project does not use.

### Codex

Codex reads `AGENTS.md` and `.agents/skills/`. The Astro docs MCP (`.mcp.json`) is Claude Code only; for Codex add it to `~/.codex/config.toml` if wanted.

## Deployment

`npm run build` outputs a fully static site in `dist/`; deploy it to any static host. Set the production domain in `astro.config.mjs` (`site`) before launch — canonical URLs, hreflang and the sitemap depend on it.
