# ProsERP website — code standard

## The rule

**No CSS files. No hand-written CSS classes. Styling and icons come from MUI and FontAwesome.**

This is a Next.js **App Router** project. All styling is expressed through MUI's system — `sx`, `styled()`, and the shared theme — never through a `.css` file or a bespoke class name.

## What that means in practice

| Need | Use | Not |
|---|---|---|
| Layout | `Box`, `Stack`, `Grid`, `Container` with `sx` | `className="hero-grid"` + CSS |
| Text | `Typography` with `variant` | `<h2 className="section-title">` |
| Colour, spacing, radius | tokens from [`components/theme.ts`](components/theme.ts) | hex codes inline, CSS variables |
| Data screens | the primitives in [`components/erp-screen.tsx`](components/erp-screen.tsx) | hand-built tables |
| Buttons, tabs, inputs, chips, dialogs | MUI components | styled `<button>`/`<div>` |
| Icons | `@mui/icons-material`, or `@fortawesome/react-fontawesome` | icon fonts via CSS classes |
| Brand icons (Instagram, …) | `@fortawesome/free-brands-svg-icons` | inline SVG paths |
| Images | `next/image` | raw `<img>` |
| Navigation | MUI `AppBar`/`Drawer`/`ListItemButton` with `component={Link}` | CSS-toggled menus |

## Theme is the single source of truth

[`components/theme.ts`](components/theme.ts) holds the brand, and it has **one** reference: the
palette ProsERP runs in public today, read from `https://proserp.co.tz/css/style.css`. Those are
Bootstrap utility classes, so every colour arrives with its role already stated — `.bg-primary`,
`.text-secondary`, `.bg-success` — and `liveSite` records each one next to the selector it came
from. The website's surfaces therefore match what already ships.

The product theme (`proserp-frontend-v2/src/themes/main/default.ts`) is **not** imported. Exactly
one value is borrowed from it: `statusGreen` (`#0f8507`), because the live site reassigned
`.bg-success` to blue and left no green to mark a finished record with.

`brand` is the website's role-named vocabulary resolved from `liveSite`.

| Role | Token | Value | From |
|---|---|---|---|
| Primary — solid fills, buttons, chips, badges | `brand.primary` / `primaryLight` / `primaryDark` | `#073341` / `#2196f3` / `#021116` | `.bg-primary`, `.bg-success`, hero gradient |
| Accent — decorative only | `brand.accent` / `accentLight` | `#2196f3` / `#8cb0df` | `.bg-success`, `.bg-info` |
| Highlight — third chart series | `brand.highlight` | `#e4ab00` | `.bg-warning` |
| Heading / body text | `brand.ink` / `brand.muted` | `#141822` / `#607183` | `.text-dark`; body grey, darkened (below) |
| Surfaces | `brand.white` / `paper` / `line` | `#ffffff` / `#f5fdff` / `#ced4da` | `.bg-light`, form borders |
| Dark bands — hero, CTA, footer | `brand.surfaceDark` / `surfaceDarkest` | `#073341` / `#021116` | `.bg-primary`, gradient end |
| Semantic | `brand.success` / `info` / `warning` / `error` | `#0f8507` / `#8cb0df` / `#e4ab00` / `#dc3545` | product green; rest live site |
| Selection + completion tints | `brand.tintAccent` / `tintAccentStrong` / `tintSuccess` / `tintPrimary` / `tintMuted` | the above at low alpha | — |

Import `brand` for raw values, or reach for theme-aware shorthands (`color: "text.secondary"`,
`bgcolor: "background.paper"`). Do not reintroduce a colour as a hex or `rgba()` literal in a
component — add a token here instead.

`brand.muted` is the only token that is not verbatim. The live site's body grey is `#8797a7`, which
measures **2.99:1** on white — it gets away with that at its 17px body size, but this site sets card
and caption text far smaller. `#607183` is the same blue-grey hue darkened until it clears AA on
both surfaces (**5.02:1** on white, **4.87:1** on paper).

### No pink

ProsERP's product theme has a pink `secondary` (`#e44a77`). **The website does not use it, and does
not import it.** This is worth stating because of how it failed once: while the product palette was
still in this file, `cssVariables` emitted `--mui-palette-secondary-*` as pink into every page's
stylesheet even though no component referenced it. Removing the palette removed the leak; the
website's `secondary` is the live site's blue. If the product palette is ever reintroduced here,
override `secondary` in every `colorSchemes` entry or the pink comes back on its own.

### Contrast rules

Which blue you pick depends on whether text sits on it. Measured, against this theme's values:

- **A brand background carrying text** → `brand.primary` + `brand.white` (**13.47:1**), hover
  `primaryDark` (**19.19:1**). The bright accent manages only **3.12:1** with white, so it must
  never be a background behind text — that includes buttons, chips and numbered badges.
- **Accent as text on a dark band** → `brand.accentLight` (**6.02:1** on `surfaceDark`, **8.58:1**
  on `surfaceDarkest`). `brand.accent` itself is **4.31:1** there, which only clears AA-large.
- **Decorative accent with no text on it** (dots, rules, bars, tab indicators) → `brand.accent`
  freely.
- **Dark bands** take `brand.white` text (**13.47:1** and **19.19:1**); `brand.highlight` reaches
  **6.49:1** on `surfaceDark`.
- **Status chips** keep `brand.ink` text on a semantic tint, where it reaches **14–15:1**. The tint
  carries the meaning, not the text colour — `accent` as text on white is only 3.12:1.
- **Solid semantic fills** carrying white text are the tight ones: `success` **4.80:1** and `error`
  **4.53:1** both clear AA, but neither has room to be lightened. `warning` and `info` take
  `brand.ink`, not white.

These are asserted, not just described. `npm run check:contrast` reads the tokens straight out of
`theme.ts` and checks all 21 pairs — including one deliberate *ban*, that white on `brand.accent`
stays **below** 4.5:1, so nobody "fixes" the rule by trying the bright blue behind text again. Run
it after touching the palette; it exits non-zero on a break.

### Dark mode

There is none, deliberately. The live site has no dark mode, so `colorSchemes` defines `light`
only and MUI's `ThemeProvider` defaults to `defaultMode: "light"` anyway. The hero's dashboard mock
also renders light, matching what a new client sees on first opening ProsERP — the application
loads `themes/main/default` in its own `config/index.ts`.

Adding dark mode is not a flag flip. It needs a `dark` entry in `colorSchemes`, `defaultMode="system"`
in [`components/mui-providers.tsx`](components/mui-providers.tsx), **and** a pass over the
components, which name light-scheme tokens (`brand.ink`, `brand.paper`, …) directly rather than
theme-aware shorthands. Without that pass the dark surfaces land under light-mode text colours. The
product's own dark palette lives in `proserp-frontend-v2/src/themes/main/dark.ts` if it is wanted.

## MUI setup, and why it is set up this way

[`components/mui-providers.tsx`](components/mui-providers.tsx) wraps the app in `AppRouterCacheProvider` (the `v16-appRouter` adapter, matching Next 16) plus `ThemeProvider`, so emotion's styles are injected during SSR.

- `CssBaseline` **is** the reset for this project now that `globals.css` is gone.
- `enableCssLayer` is not needed once no plain CSS competes with MUI.

Emotion has no full React Server Component support, so any file using MUI components needs `"use client"`.

### FontAwesome

All four packages resolve as of 28 October 2026. `free-solid-svg-icons` had been installed
half-written — 322 `.d.ts` files, no `package.json`, no JavaScript, so every import from it threw at
runtime — and was reinstalled. If solid icons start failing again, check that first:

```sh
node -e "console.log(require('@fortawesome/free-solid-svg-icons/package.json').version)"
```

Prefer `@mui/icons-material` for ordinary UI icons; it is already a dependency and needs no icon
registration. Reach for FontAwesome where MUI has no equivalent — brand marks especially, which is
what the footer's Instagram icon uses.

`FontAwesomeIcon` takes no `sx`, and this project does not import FontAwesome's core stylesheet, so
size it from the parent: `sx={{ "& svg": { height: 18, width: 18 } }}`.

## The one exception

`next/image` does not accept `sx`, so the client-logo grid in
[`components/home-experience.tsx`](components/home-experience.tsx) sets `objectFit` through a plain
`style` prop. That is the only inline `style` in the project; everything else goes through `sx`.

Semantic landmarks and anchor targets ride on MUI components rather than bare tags — use
`<Box component="main">` and put an `id` on the `Typography` itself (see `SectionHeading`'s
`titleId`), not on a wrapper `<span>`.

## Conventions

- MUI imports are per-component (`import Box from "@mui/material/Box"`), not barrel imports, to keep bundles lean.
- Props are written in alphabetical order, matching the existing files.
- Responsive values use MUI breakpoint objects: `sx={{ display: { xs: "none", md: "flex" } }}`.
- Sample data in product previews stays visibly fictional (`SAMPLE-001`, "Sample project") and labelled illustrative — see [`docs/product-evidence-register.md`](docs/product-evidence-register.md).

## Data and the backend

Editable data lives in SQLite through `node:sqlite`, Node's built-in driver — **no dependency and no
database server**. `engines.node` is therefore `>=22.5.0`; on an older runtime the module does not
exist and the API route fails at request time.

| File | Holds |
|---|---|
| [`services/db.js`](services/db.js) | connection, `DATA_DIR`, schema migrations |
| [`services/leadStore.js`](services/leadStore.js) | demo requests and their notification state |
| [`services/contentStore.js`](services/contentStore.js) | the client logo grid and its permissions |

Route handlers and pages talk to the stores, never to `db.js` directly, so moving to Postgres means
rewriting three files rather than hunting SQL through the app.

Three things that will bite otherwise:

- **`node:sqlite` cannot be imported normally.** Turbopack fails with "Unsupported external type Url
  for commonjs reference", so `db.js` resolves it through `createRequire` at runtime. Keep it that
  way.
- **Rows have a null prototype.** React refuses to pass them from a Server to a Client Component
  ("Only plain objects … can be passed"), so every store spreads rows into plain objects before
  returning them.
- **`DATA_DIR` must be persistent.** It defaults to `.data/` (git-ignored). On a serverless host the
  filesystem is ephemeral and rows will not survive — move to a hosted database before deploying
  there. This fails *silently*: the write succeeds, returns an id, and the row is gone by the next
  request, while demo notifications keep arriving by email. `db.js` therefore logs a warning when it
  sees `VERCEL`, `AWS_LAMBDA_FUNCTION_NAME` or `NETLIFY` set. Treat that line as a blocker, not a
  nag — the legacy `gulpfile.js` still carries a "Dummy build task for Vercel" comment.

Pages that read content set `export const revalidate` rather than rendering dynamically, so content
is editable without a deploy while every request is still served from cache.

### Client logos are permission-gated

`client_logos.permitted` defaults to **0**, and [`app/page.tsx`](app/page.tsx) passes only permitted
rows to the page. With none cleared, the section renders the unnamed formulation that
[`docs/product-evidence-register.md`](docs/product-evidence-register.md) recommends instead of named
logos — which also keeps `#clients-heading` alive for the header and footer links. Set `permitted`
only when written permission is actually on file, and record where in `permission_note`:

```sh
node scripts/logo-permissions.js                                      # list
node scripts/logo-permissions.js allow "Transpower" "Email, 28 Oct"   # clear one
node scripts/logo-permissions.js deny  "Transpower"                   # withdraw
```

**The permission record does not travel with the repository.** It lives in `.data/`, which is
git-ignored, so every fresh clone — another laptop, a CI runner, the Amplify SSR function — seeds
all twelve logos *unpermitted* and shows the unnamed formulation instead of the grid. That is the
gate working as designed, but it means the decision has to be recorded again wherever the site runs,
and in production it has to be recorded against a database that survives a restart. If the logos
should simply be published everywhere, the record belongs in the repository rather than in each
machine's database — that is a deliberate change to the gate, not a bug fix.

## Related documents

- [`scripts/check-contrast.js`](scripts/check-contrast.js) — `npm run check:contrast`, the executable half of the contrast rules above.
- [`docs/adaptfacteno.md`](docs/adaptfacteno.md) — product and website plan, including the UI system decision.
- [`docs/product-evidence-register.md`](docs/product-evidence-register.md) — which public claims are verified, and the open decisions.
- `AGENTS.md` is generated by `next dev`; do not hand-edit it.
