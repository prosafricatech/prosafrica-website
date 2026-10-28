"use client";

// ProsERP MUI theme.
//
// The palette is the one ProsERP runs in public today, read from the live site's
// own stylesheet:
//
//   https://proserp.co.tz/css/style.css
//
// Those are Bootstrap utility classes, so each colour arrives with its role
// already stated (`.bg-primary`, `.text-secondary`, `.bg-success`, …). The
// mapping below keeps those roles.
//
// This file is the single source of truth for ProsERP's colours on the website.
// Do not copy a hex code into a component — add or reuse a token here.

import { createTheme } from "@mui/material/styles";

/**
 * The live site's palette, verbatim, with the selector each value comes from.
 *
 * There is no pink and no indigo here: this is the whole brand as it ships.
 */
export const liveSite = {
  /** `.bg-primary` / `.btn-primary` / `.text-primary` — the dark teal. */
  teal: "#073341",
  /** The hero's gradient end, `linear-gradient(to right, #073341, #021116)`. */
  tealDeepest: "#021116",
  /** `.bg-success` / `.btn-success`, and the `.section-title-border` rule. */
  blue: "#2196f3",
  /** `.bg-info` — the light blue that reads cleanly on the teal bands. */
  blueLight: "#8cb0df",
  /** `.bg-warning` — gold. */
  gold: "#e4ab00",
  /** `.bg-danger` — red. */
  red: "#dc3545",
  /** `.bg-light` / `.text-light` — the page shell. */
  shell: "#f5fdff",
  /** `.bg-dark` / `.text-dark` — headings. */
  nearBlack: "#141822",
  /** The `p` rule's colour — body copy. */
  bodyGrey: "#8797a7",
  /** `.text-secondary`. */
  grey: "#959797",
  /** Form and card borders. */
  line: "#ced4da",
  /** `body { font-family: ... }`, loaded through next/font in app/layout.tsx. */
  font: "Public Sans",
} as const;

/**
 * The one colour the website needs that the live site does not define.
 *
 * `.bg-success` there is the blue above, so there is no green left to mark a
 * finished record with — the stylesheet still carries the green it replaced,
 * commented out, as `#81d86f`. The status chips need a green that is distinct
 * from "in progress", so this is the product theme's success instead.
 */
const statusGreen = "#0f8507";

// The hero's dashboard mock renders light, matching what a new client sees on
// first opening ProsERP — the application loads `themes/main/default` in its
// own `config/index.ts`. Its dark palette lives in that project's
// `src/themes/main/dark.ts` if the mock is ever switched over.

/**
 * Website token vocabulary, resolved against the live palette above.
 *
 * The names describe the *role* a colour plays on the page.
 */
export const brand = {
  // Text. `ink` is the heading colour, `muted` the body-copy grey.
  //
  // `muted` is the live site's `#8797a7` darkened along the same blue-grey hue
  // until it passes AA: the original measures 2.90:1 on `paper`, which the
  // live site gets away with at its 17px body size but which turns the smaller
  // card and caption text here unreadable. This is the lightest value that
  // clears 4.5:1 on both `white` (5.02:1) and `paper` (4.87:1).
  ink: liveSite.nearBlack,
  muted: "#607183",

  // Surfaces.
  white: "#ffffff",
  paper: liveSite.shell,
  line: liveSite.line,

  // Dark bands — hero, CTA, footer — and the gradient they fade into.
  surfaceDark: liveSite.teal,
  surfaceDarkest: liveSite.tealDeepest,

  // Primary — anything solid that carries text: buttons, chips, badges.
  // Teal holds white at 13.47:1; the bright blue manages only 3.12:1.
  primary: liveSite.teal,
  primaryLight: liveSite.blue,
  primaryDark: liveSite.tealDeepest,

  // Accent — decorative marks that carry no text: rules, dots, bars, tab
  // indicators. `accentLight` is for accent-coloured *text* on a dark band,
  // where it measures 6.02:1 against `surfaceDark`.
  accent: liveSite.blue,
  accentLight: liveSite.blueLight,

  // Gold, for the third chart series and the occasional highlight. Reads at
  // 6.49:1 on a teal band.
  highlight: liveSite.gold,

  // Semantic.
  success: statusGreen,
  info: liveSite.blueLight,
  warning: liveSite.gold,
  error: liveSite.red,

  // Translucent tints. `tintAccent*` marks a selected row, tab or step;
  // `tintSuccess` marks something finished.
  tintAccent: "rgba(33, 150, 243, 0.14)",
  tintAccentStrong: "rgba(33, 150, 243, 0.22)",
  tintSuccess: "rgba(15, 133, 7, 0.14)",
  tintPrimary: "rgba(7, 51, 65, 0.08)",
  tintMuted: "rgba(135, 151, 167, 0.16)",

  // Public Sans is the live site's typeface; next/font loads it in
  // app/layout.tsx and sets --font-public-sans.
  fontBody: 'var(--font-public-sans), "Public Sans", sans-serif',
  fontDisplay: 'var(--font-public-sans), "Public Sans", sans-serif',
} as const;

/** The MUI palette, in live-site terms. */
const websitePalette = {
  primary: { main: liveSite.teal, light: liveSite.blue, dark: liveSite.tealDeepest, contrastText: "#ffffff" },
  secondary: { main: liveSite.blue, light: liveSite.blueLight, dark: liveSite.teal },
  error: { main: liveSite.red, contrastText: "#ffffff" },
  warning: { main: liveSite.gold, contrastText: liveSite.nearBlack },
  info: { main: liveSite.blueLight, contrastText: liveSite.nearBlack },
  success: { main: statusGreen, contrastText: "#ffffff" },
  text: { primary: liveSite.nearBlack, secondary: brand.muted, disabled: liveSite.grey },
  divider: liveSite.line,
  background: { paper: "#ffffff", default: liveSite.shell },
};

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: "data-theme" },
  defaultColorScheme: "light",
  colorSchemes: {
    // The live site has no dark mode, so only `light` is defined. MUI's
    // ThemeProvider defaults to `defaultMode: "light"` either way.
    light: { palette: websitePalette },
  },
  typography: {
    fontFamily: brand.fontBody,
    // The live site sets every heading to weight 400.
    h1: { fontFamily: brand.fontDisplay, fontWeight: 400 },
    h2: { fontFamily: brand.fontDisplay, fontWeight: 400 },
    h3: { fontFamily: brand.fontDisplay, fontWeight: 400 },
    h4: { fontFamily: brand.fontDisplay, fontWeight: 400 },
    h5: { fontFamily: brand.fontDisplay, fontWeight: 400 },
    // `p { font-size: 17px }` on the live site.
    body1: { fontSize: "1.0625rem" },
    // Dense, data-screen scale — the previews stand in for an ERP UI.
    body2: { fontSize: "0.8125rem" },
    caption: { fontSize: "0.6875rem", letterSpacing: "0.08em" },
  },
  // `.btn { border-radius: 3px }` on the live site.
  shape: { borderRadius: 3 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // The live site's `a { text-decoration: none }`. Without this, any
        // component rendered as a link — a whole card wrapped in next/link,
        // for example — picks up the browser's default underline on every
        // line of its text.
        a: { color: "inherit", textDecoration: "none" },
      },
    },
    MuiTable: {
      defaultProps: { size: "small" },
    },
    MuiButton: {
      styleOverrides: {
        // `.btn { padding: 10px 28px; font-size: 15px; font-weight: 400 }`.
        root: {
          fontSize: "0.9375rem",
          fontWeight: 400,
          padding: "10px 28px",
          textTransform: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottomColor: brand.line,
          paddingBlock: 8,
        },
        head: {
          color: brand.muted,
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          backgroundColor: brand.paper,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "rgba(33, 150, 243, 0.14)",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "rgba(33, 150, 243, 0.2)",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 40,
          textTransform: "none",
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: brand.muted,
          "&.Mui-selected": { color: brand.primary },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        // The live site's `.section-title-border` is this blue.
        indicator: { backgroundColor: brand.accent, height: 3 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontSize: "0.6875rem", fontWeight: 600 },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.75rem",
          paddingBlock: 4,
          borderColor: brand.line,
          color: brand.muted,
          // A selected toggle carries a label, so it takes `primary` rather
          // than the bright accent, which cannot hold white text at AA.
          "&.Mui-selected": {
            backgroundColor: brand.primary,
            color: brand.white,
            "&:hover": { backgroundColor: brand.primaryDark },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { fontSize: "0.8125rem", backgroundColor: brand.white },
        notchedOutline: { borderColor: brand.line },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: "0.8125rem", color: brand.muted },
      },
    },
  },
});

export default theme;
