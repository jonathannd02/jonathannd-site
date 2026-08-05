# Repository Guidelines

## Project Overview

**Jonathan Núñez Dhondt · De Atlas** is a small, static personal field atlas for software, security, systems, and practical web work. The site copy and document language are Dutch (`lang="nl"`). It is an Astro static site with a blog homepage and generated note pages, not a server application: there are no API routes, persistence, database, or framework state layer.

`DESIGN_BRIEF.md` is the living design/technical brief for the **implemented** site. Keep it aligned with the code: one-shot full-screen intro video, monochrome treatment with a local original-color pointer reveal from a single-video Canvas frame, a plain editorial blog index, static note articles, and progressive enhancement. Do not reintroduce removed portfolio sections or an SVG-route/map layer unless the brief and markup are intentionally updated together.

## Architecture & Data Flow

- `src/pages/index.astro` is the `/` route. Its frontmatter owns the local draft records and reads published `notes` from the Astro content collection. It renders the temporary intro and the plain blog index.
- `src/layouts/SiteLayout.astro` is the reusable document shell. It imports the global stylesheet, accepts typed optional `title`/`description` props, emits metadata and the skip link, and renders page content through `<slot />`.
- `src/styles/global.css` is the presentation/state sink: design tokens, layout, responsive rules, focus states, component styles, and state selectors all live here. CSS custom properties and classes such as `is-visible`, `is-active`, `has-dither`, and `has-restoration` carry client state.
- `src/scripts/site.ts` is the only client behavior. After Astro renders static HTML, it handles intro video completion/fallback, click-to-skip behavior, the synchronized original-color pointer reveal, reduced-motion behavior, and the temporary intro scroll lock.
- `public/` assets are referenced by root URLs and copied into the static output. Astro/Vite builds the page into static directory-formatted output under `dist/`.
- Client behavior is progressive enhancement. Keep the H1, navigation, CTA, project information, and meaningful links in semantic HTML so the page remains useful without JavaScript, canvas effects, or media playback.

## Key Directories

- `src/pages/` — route entrypoints: `index.astro` and `notities/[slug].astro`.
- `src/layouts/` — reusable Astro document/layout components.
- `src/scripts/` — browser-only TypeScript enhancements.
- `src/styles/` — the global CSS/design system.
- `public/media/` — intro video/poster (`atlas.mp4`, `atlas-poster.jpg`) and retained static media assets.
- `src/content/notities/` — published Dutch field notes rendered through the `notes` collection.
- `public/fonts/` — self-hosted woff2 webfonts (`grenze-var`, `grenze-var-italic`, `grenze-gotisch-var`, `ibm-plex-mono-400/500`); latin subsets only, declared with `@font-face` at the top of `global.css`. These are build inputs and are committed. All three families are SIL OFL 1.1; `OFL.txt` must stay next to them, and any font added or replaced here needs its copyright notice appended to that file.
- `public/` — static assets such as `og-image.svg` and `favicon.svg`.
- `.astro/` and `dist/` — generated output; both are ignored and should not be edited or committed.

## Development Commands

Run commands from the repository root with npm:

```bash
npm install
npm run dev                 # Start the Astro dev server
npm run check               # Astro template/TypeScript check
npm run build               # Build static production output
npm run preview             # Serve the built output locally
```

The documented production sequence is `npm run check`, `npm run build`, then `npm run preview`. `preview` requires a completed build.

## Code Conventions & Common Patterns

- Match the existing style: two-space indentation, single-quoted JS/TS strings, semicolons, trailing commas in multiline literals/calls, and explicit return types for small TypeScript helpers.
- Use PascalCase for Astro components (`SiteLayout`), lower camelCase for data/functions (`selectedWork`, `completeHero`), and descriptive BEM-like kebab CSS classes (`hero__video`, `section-label--dark`).
- Keep page content data-driven but local to the page unless reuse is clear. Use typed Astro props and slots for shared layout concerns rather than introducing a framework or global store.
- DOM code uses typed element queries, optional chaining/nullish fallbacks, small named helpers, and DOM classes/data attributes instead of dependency injection, a state-management library, fetch calls, or persistence.
- Preserve the existing async/fallback patterns: one-shot video `ended`/`error` listeners; `void video.play().catch(revealBlog)` for rejected autoplay; passive pointer events; Canvas dither loops canceled after the intro and under `prefers-reduced-motion`.
- Treat accessibility as part of the implementation: semantic landmarks, real hash/external links, skip link, `aria-label`/`aria-hidden` where appropriate, keyboard-focusable interactive rows, and `:focus-visible` styles.
- Keep the site’s visual approach native and restrained: CSS, small client JavaScript, and optional Canvas 2D enhancement first; responsive CSS media queries; no scroll hijacking or enhancement that owns core content. Preserve poster fallback and `prefers-reduced-motion` behavior (including disabling dither overlays).
- External links use `target="_blank"` with `rel="noreferrer"`. Only add verified project links, statuses, and outcomes; do not present planned work as completed work.

## Important Files

- `package.json` — project identity, ESM mode, dependencies, and all supported commands.
- `package-lock.json` — npm lockfile and resolved dependency versions; keep it synchronized with manifest changes.
- `astro.config.mjs` — static output, compressed HTML, directory build format, and Vite dev-server host configuration.
- `tsconfig.json` — Astro strict preset with `allowJs`, `checkJs`, and `skipLibCheck`.
- `src/pages/index.astro` — intro, published-note index, local draft records, semantic markup, and client-script mount.
- `src/pages/notities/[slug].astro` — statically generated published-note route.
- `src/content.config.ts` — schema and loader for the `notes` content collection.
- `src/layouts/NoteLayout.astro` — article cover, prose and note pagination layout.
- `src/layouts/SiteLayout.astro` — document metadata, favicon, global CSS import, and page slot.
- `src/scripts/site.ts` — intro media, click-to-skip, dither overlay, and reduced-motion behavior.
- `src/styles/global.css` — all design tokens, layout, responsive breakpoints, focus styling, and motion overrides.
- `README.md` — local workflow, asset details, and pre-publish checklist.
- `DESIGN_BRIEF.md` — living design/technical constraints and required browser verification for the implemented site.

## Runtime/Tooling Preferences

- Use the npm workflow and the checked-in `package-lock.json`; no alternate package-manager lockfile or project `packageManager` field exists.
- The project is private ESM (`"type": "module"`) and pins Astro `7.1.6`, `@astrojs/check` `0.9.10`, and TypeScript `6.0.3`.
- Use a Node version compatible with the installed Astro dependency (the lock metadata declares Node `>=22.12.0`; the project itself does not declare an `engines` field).
- Astro is configured for `output: 'static'`, compressed HTML, and directory-formatted builds. There is no adapter, SSR target, deployment config, environment file, path alias, or custom formatter/linter configuration.
- `tsconfig.json` extends Astro’s strict config; preserve ESM, ESNext/bundler-oriented resolution, and no-emit checking when adding TypeScript.
- `.gitignore` excludes dependencies, `dist/`, `.astro/`, macOS metadata, and `.env*` (while allowing a future `.env.example`). Do not commit generated output or secrets.
- Preserve the configured Vite `allowedHosts` entry unless a deliberate local-network configuration change is intended.

## Testing & QA

- No automated unit, integration, E2E, browser, or coverage framework is configured. There are no test directories, test scripts, fixtures, snapshots, CI workflows, or coverage thresholds to follow.
- `npm run check` is the repository’s only static validation command; it is Astro’s checker, not a test runner. At minimum, run it and `npm run build` after source/config changes.
- Manual browser QA is required by the project brief: run the site, inspect desktop and mobile widths, check the browser console, test `prefers-reduced-motion`, verify keyboard focus and real landmarks/links, and verify the responsive video crop on actual target devices.
- Exercise the progressive-enhancement paths when relevant: poster fallback, video `ended`/`error`/rejected-play handling, click-to-skip, reduced-motion immediate completion and dither disable, published-note routing, and keyboard focus on the real links.
- Report what was actually verified; do not claim coverage or browser support that is not observed.
