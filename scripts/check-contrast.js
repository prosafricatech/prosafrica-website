// Contrast check for the website palette.
//
//   node scripts/check-contrast.js     (or: npm run check:contrast)
//
// CLAUDE.md states which token pairs the design relies on and at what ratio.
// This asserts those pairs against the real values in components/theme.ts, so
// the rules there stay true rather than aspirational. It reads the theme as
// text rather than importing it — the theme is a "use client" TypeScript
// module, and duplicating its hex codes here would defeat the point of having
// a single source of truth.

const fs = require("node:fs");
const path = require("node:path");

const THEME = path.join(__dirname, "..", "components", "theme.ts");

/** Pull `name: "#rrggbb"` pairs out of an object literal in the source. */
function readTokens(source, objectName) {
  const start = source.indexOf(`export const ${objectName} = {`);
  if (start < 0) throw new Error(`${objectName} not found in theme.ts`);
  const body = source.slice(start, source.indexOf("\n} as const;", start));
  const tokens = {};
  for (const [, key, value] of body.matchAll(/^\s{2}(\w+):\s*(.+?),\s*$/gm)) {
    tokens[key] = value.replace(/^["']|["']$/g, "");
  }
  return tokens;
}

const source = fs.readFileSync(THEME, "utf8");
const liveSite = readTokens(source, "liveSite");
const rawBrand = readTokens(source, "brand");

// `statusGreen` is a plain const, not part of either exported object.
const statusGreen = (source.match(/const statusGreen = "(#[0-9a-f]{6})"/i) || [])[1];

/** brand values are either a literal hex, `liveSite.x`, or `statusGreen`. */
const brand = {};
for (const [key, value] of Object.entries(rawBrand)) {
  if (value.startsWith("#")) brand[key] = value;
  else if (value.startsWith("liveSite.")) brand[key] = liveSite[value.slice(9)];
  else if (value === "statusGreen") brand[key] = statusGreen;
  else if (value.startsWith("rgba(")) brand[key] = value;
}

const channels = (hex) =>
  [0, 2, 4].map((i) => parseInt(hex.replace("#", "").slice(i, i + 2), 16) / 255);

const luminance = (hex) => {
  const [r, g, b] = channels(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Composite an `rgba(...)` token onto an opaque backdrop. */
const flatten = (value, backdrop) => {
  if (!value.startsWith("rgba(")) return value;
  const [r, g, b, a] = value.slice(5, -1).split(",").map(Number);
  const back = channels(backdrop);
  const mix = [r / 255, g / 255, b / 255].map((c, i) => c * a + back[i] * (1 - a));
  return "#" + mix.map((c) => Math.round(c * 255).toString(16).padStart(2, "0")).join("");
};

const ratio = (fg, bg) => {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
};

// [text token, background token, minimum, what the rule protects]
// Minimums are AA: 4.5 for small text, 3.0 for large text and UI marks.
const RULES = [
  ["white", "primary", 4.5, "solid brand fills carrying text"],
  ["white", "primaryDark", 4.5, "brand fill, hover state"],
  ["white", "surfaceDark", 4.5, "hero, CTA and footer bands"],
  ["white", "surfaceDarkest", 4.5, "gradient end of the dark bands"],
  ["accentLight", "surfaceDark", 4.5, "accent-coloured text on a dark band"],
  ["accentLight", "surfaceDarkest", 4.5, "accent text, gradient end"],
  ["highlight", "surfaceDark", 4.5, "gold highlight on a dark band"],
  ["ink", "white", 4.5, "body copy"],
  ["ink", "paper", 4.5, "body copy on the page shell"],
  ["muted", "white", 4.5, "secondary copy — the reason muted is darkened"],
  ["muted", "paper", 4.5, "secondary copy on the page shell"],
  ["white", "success", 4.5, "solid success fill"],
  ["white", "error", 4.5, "solid error fill"],
  ["ink", "warning", 4.5, "warning takes ink, never white"],
  ["ink", "info", 4.5, "info takes ink, never white"],
  ["ink", "tintAccent", 4.5, "status chip on a selection tint"],
  ["ink", "tintAccentStrong", 4.5, "status chip, strong tint"],
  ["ink", "tintSuccess", 4.5, "completion chip"],
  ["ink", "tintPrimary", 4.5, "selected row"],
  ["ink", "tintMuted", 4.5, "neutral chip"],
];

// Pairs that must stay *below* a ratio: these record why a colour is banned
// behind text, so that nobody "fixes" the ban by trying it again.
const BANS = [
  ["white", "accent", 4.5, "accent is decorative only — it cannot hold white text"],
];

let failed = 0;

for (const [fg, bg, min, why] of RULES) {
  const back = flatten(brand[bg], brand.white);
  const value = ratio(flatten(brand[fg], back), back);
  const ok = value >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? "ok  " : "FAIL"} ${value.toFixed(2).padStart(6)}:1  (min ${min})  ` +
      `${fg} on ${bg} — ${why}`,
  );
}

for (const [fg, bg, min, why] of BANS) {
  const value = ratio(brand[fg], brand[bg]);
  const ok = value < min;
  if (!ok) failed++;
  console.log(
    `${ok ? "ok  " : "FAIL"} ${value.toFixed(2).padStart(6)}:1  (stays below ${min})  ` +
      `${fg} on ${bg} — ${why}`,
  );
}

console.log(
  failed === 0
    ? `\nAll ${RULES.length + BANS.length} contrast rules hold.`
    : `\n${failed} contrast rule(s) broken.`,
);
process.exit(failed === 0 ? 0 : 1);
