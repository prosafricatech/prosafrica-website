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

## No backend

**The site holds no data.** Every page renders from values written in the
components — the module list, the industry pages, the FAQs, the client logos.
Changing any of it means editing a file and deploying, and that is the whole
mechanism. There is no database, no content store, and nothing to provision
alongside the site.

It was not always so. An earlier revision kept the client logos and the demo
requests in SQLite through `node:sqlite`, which read well locally and failed
everywhere else: the database lived in `.data/`, which is git-ignored, so a
second clone rendered no logos at all, and a serverless host — where the
function's own directory is read-only and `/tmp` is wiped between invocations —
would have rejected every demo request outright. Twelve logos that change twice
a year did not need a database. If editable-without-deploy content is wanted
later, it needs a hosted database, not a file on the server's disk.

### The one exception

[`app/api/demo-inquiry/route.js`](app/api/demo-inquiry/route.js) is the only
server code here. It validates the demo form and sends one email, storing
nothing. It exists because SMTP credentials cannot sit in the browser, where
anyone could read them out of DevTools and send mail as the company.

**The email is the only record of a lead.** If the send fails the visitor is
told so and asked to retry, because nothing else captured it. Watch the logs:
a run of `Demo request could not be sent` means leads are being lost in real
time.

### Client logos are a customer-reference claim

The twelve logos are a `clientLogos` array in
[`components/home-experience.tsx`](components/home-experience.tsx). Publishing a
company's name and mark asserts that it is a ProsERP customer and that its mark
may be used, so each line needs permission on file — decision 1 in
[`docs/product-evidence-register.md`](docs/product-evidence-register.md).

Nothing in the code enforces that any more. The earlier `permitted` column did,
and it is gone; a line in that array ships. Deleting the line is how a logo
comes down. If the array is emptied the section falls back to the unnamed
formulation the register recommends, which also keeps `#clients-heading` alive
for the header and footer links.

## Related documents

- [`scripts/check-contrast.js`](scripts/check-contrast.js) — `npm run check:contrast`, the executable half of the contrast rules above.
- [`docs/adaptfacteno.md`](docs/adaptfacteno.md) — product and website plan, including the UI system decision.
- [`docs/product-evidence-register.md`](docs/product-evidence-register.md) — which public claims are verified, and the open decisions.
- `AGENTS.md` is generated by `next dev`; do not hand-edit it.
