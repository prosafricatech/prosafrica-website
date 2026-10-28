"use client";

// Shared ProsERP screen-preview primitives, built on MUI (Phase 1 of
// docs/adaptfacteno.md).
//
// Every preview on the site repeated the same shapes — a context heading with
// an "illustrative" chip, a filter row, a grid of selectable rows, and an
// aria-live detail panel — each previously hand-styled with its own class names.
// These primitives render real MUI components themed from components/theme.ts,
// so the data screens look like an ERP application and the six parallel class
// vocabularies collapsed into one component vocabulary.
//
// The optional `className` props are a pass-through for callers that need a hook
// (tests, scroll targets). Nothing in this project styles through them — see
// CLAUDE.md for the no-CSS rule.

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

import { brand } from "./theme";

/** Context label + title, with an optional right-hand chip. */
export function ScreenHeading({
  chip,
  className,
  contextLabel,
  title,
}: {
  chip?: ReactNode;
  className?: string;
  contextLabel: string;
  title: ReactNode;
}) {
  return (
    <Stack
      className={className}
      direction={{ xs: "column", sm: "row" }}
      spacing={1}
      sx={{
        alignItems: { xs: "flex-start", sm: "center" },
        borderBottom: `1px solid ${brand.line}`,
        justifyContent: "space-between",
        mb: 1.5,
        pb: 1.5,
      }}
    >
      <Box>
        <Typography component="span" sx={{ color: brand.muted, display: "block" }} variant="caption">
          {contextLabel}
        </Typography>
        <Typography component="strong" sx={{ fontWeight: 700 }} variant="body1">
          {title}
        </Typography>
      </Box>
      {chip === undefined ? null : (
        <Chip label={chip} size="small" sx={{ bgcolor: brand.primary, color: brand.white }} />
      )}
    </Stack>
  );
}

/** Summary tiles: a label over a value. */
export function ScreenMetrics({
  className,
  items,
}: {
  className?: string;
  items: { label: string; value: ReactNode }[];
}) {
  return (
    <Box
      className={className}
      sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns: { xs: "1fr", sm: `repeat(${Math.min(items.length, 2)}, 1fr)`, md: `repeat(${items.length}, 1fr)` },
        my: 1.5,
      }}
    >
      {items.map((item) => (
        <Box
          key={item.label}
          sx={{ bgcolor: brand.paper, border: `1px solid ${brand.line}`, borderRadius: 2, p: 1.25 }}
        >
          <Typography component="span" sx={{ color: brand.muted, display: "block" }} variant="caption">
            {item.label}
          </Typography>
          <Typography component="strong" sx={{ fontWeight: 700 }} variant="body2">
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

/** Wrapper for a row of filter controls. */
export function ScreenFilters({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Stack
      className={className}
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ alignItems: { xs: "stretch", sm: "flex-end" }, flexWrap: "wrap", my: 1.5 }}
      useFlexGap
    >
      {children}
    </Stack>
  );
}

/** Labelled select filter. */
export function ScreenSelect({
  ariaLabel,
  label,
  onChange,
  options,
  value,
}: {
  ariaLabel: string;
  label: string;
  onChange: (value: string) => void;
  options: readonly string[];
  value: string;
}) {
  return (
    <Box>
      <Typography component="label" sx={{ color: brand.muted, display: "block", mb: 0.25 }} variant="caption">
        {label}
      </Typography>
      <Select
        inputProps={{ "aria-label": ariaLabel }}
        onChange={(event) => onChange(String(event.target.value))}
        size="small"
        sx={{ minWidth: 160 }}
        value={value}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

/**
 * Data table. `columns` entries may be null to omit a column.
 *
 * Rows are supplied as children (ScreenRow) so each screen keeps control of its
 * own cell content and selection state.
 */
export function ScreenTable({
  ariaLabel,
  children,
  className,
  columns,
}: {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  columns: (ReactNode | null)[];
}) {
  return (
    <TableContainer className={className} sx={{ border: `1px solid ${brand.line}`, borderRadius: 2 }}>
      <Table aria-label={ariaLabel}>
        <TableHead>
          <TableRow>
            {columns.map((column, index) =>
              column === null ? null : <TableCell key={index}>{column}</TableCell>,
            )}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * Selectable table row.
 *
 * `ariaPressed` stays separate from `selected` because some screens derive the
 * two from different state (see AssetRegisterPreview, where a filtered-out
 * selection highlights the fallback row visually but presses nothing) — a real
 * bug, preserved here rather than silently changed.
 */
export function ScreenRow({
  ariaPressed,
  children,
  onSelect,
  selected,
}: {
  ariaPressed: boolean;
  children: ReactNode;
  onSelect: () => void;
  selected: boolean;
}) {
  return (
    <TableRow
      aria-pressed={ariaPressed}
      hover
      onClick={onSelect}
      selected={selected}
      sx={{ cursor: "pointer" }}
    >
      {children}
    </TableRow>
  );
}

/** Non-interactive table row, for screens that display records rather than select them. */
export function ScreenStaticRow({ children }: { children: ReactNode }) {
  return <TableRow>{children}</TableRow>;
}

/** Full-width label row that separates groups of rows inside a table body. */
export function ScreenGroupRow({ children, colSpan }: { children: ReactNode; colSpan: number }) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        sx={{
          bgcolor: brand.paper,
          color: brand.muted,
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </TableCell>
    </TableRow>
  );
}

/** Table cell. `primary`/`secondary` renders the stacked two-line cell these screens use. */
export function ScreenCell({
  align,
  children,
  primary,
  secondary,
}: {
  align?: "left" | "right" | "center";
  children?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
}) {
  if (primary !== undefined || secondary !== undefined) {
    return (
      <TableCell align={align}>
        <Typography component="b" sx={{ display: "block", fontWeight: 700 }} variant="body2">
          {primary}
        </Typography>
        <Typography component="small" sx={{ color: brand.muted }} variant="caption">
          {secondary}
        </Typography>
      </TableCell>
    );
  }
  return <TableCell align={align}>{children}</TableCell>;
}

/** Status pill. Use this outside tables (lists, cards). */
export function StatusChip({ children, tone }: { children: ReactNode; tone?: StatusTone }) {
  const palette = tonePalette(tone ?? "neutral");
  return (
    <Chip label={children} size="small" sx={{ bgcolor: palette.bg, color: palette.fg, fontWeight: 600 }} />
  );
}

/** Status pill wrapped in a table cell. */
export function StatusBadge({ children, tone }: { children: ReactNode; tone?: StatusTone }) {
  return (
    <TableCell>
      <StatusChip tone={tone}>{children}</StatusChip>
    </TableCell>
  );
}

export type StatusTone = "complete" | "progress" | "review" | "neutral";

function tonePalette(tone: StatusTone) {
  switch (tone) {
    case "complete":
      return { bg: brand.tintSuccess, fg: brand.ink };
    case "progress":
      return { bg: brand.tintPrimary, fg: brand.primary };
    case "review":
      return { bg: brand.tintMuted, fg: brand.ink };
    default:
      return { bg: brand.paper, fg: brand.muted };
  }
}

/** Maps a free-text status label onto one of the four tones. */
export function toneForStatus(status: string): StatusTone {
  const value = status.toLowerCase();
  if (/(complete|completed|approved|received|recorded|issued|ready|closed|fulfilled|active|paid)/.test(value)) {
    return "complete";
  }
  if (/(progress|partial|partially|in transit|ordered|pending|awaiting|draft|not started)/.test(value)) {
    return "progress";
  }
  if (/(review|in review|under review)/.test(value)) {
    return "review";
  }
  return "neutral";
}

/** Group of toggle buttons for a small set of mutually exclusive options. */
export function ScreenToggleGroup<T extends string>({
  active,
  ariaLabel,
  className,
  onChange,
  options,
}: {
  active: T;
  ariaLabel: string;
  className?: string;
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  return (
    <ToggleButtonGroup
      aria-label={ariaLabel}
      className={className}
      exclusive
      onChange={(_event, value) => {
        if (value !== null) {
          onChange(value as T);
        }
      }}
      size="small"
      value={active}
    >
      {options.map((option) => (
        <ToggleButton key={option} value={option}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

/** Strip of views. */
export function ScreenTabs<T extends string>({
  active,
  ariaLabel,
  className,
  onChange,
  tabs,
}: {
  active: T;
  ariaLabel: string;
  className?: string;
  onChange: (value: T) => void;
  /** Either plain values, or {value,label} where the visible label differs. */
  tabs: readonly (T | { label: string; value: T })[];
}) {
  return (
    <Tabs
      aria-label={ariaLabel}
      className={className}
      onChange={(_event, value) => onChange(value as T)}
      scrollButtons="auto"
      sx={{ borderBottom: `1px solid ${brand.line}`, minHeight: 40 }}
      value={active}
      variant="scrollable"
    >
      {tabs.map((tab) => {
        const value = typeof tab === "string" ? (tab as T) : tab.value;
        const label = typeof tab === "string" ? tab : tab.label;
        return <Tab key={value} label={label} value={value} />;
      })}
    </Tabs>
  );
}

/** Two-part caption line above a table. */
export function ScreenCaption({
  className,
  left,
  right,
}: {
  className?: string;
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <Stack
      className={className}
      direction={{ xs: "column", sm: "row" }}
      spacing={0.5}
      sx={{ color: brand.muted, justifyContent: "space-between", my: 1 }}
    >
      <Typography component="span" variant="caption">
        {left}
      </Typography>
      <Typography component="span" variant="caption">
        {right}
      </Typography>
    </Stack>
  );
}

/** aria-live detail panel describing the selected record. */
export function RecordDetail({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Box
      aria-live="polite"
      className={className}
      sx={{
        bgcolor: brand.paper,
        border: `1px solid ${brand.line}`,
        borderRadius: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        mt: 1.5,
        p: 1.5,
      }}
    >
      {children}
    </Box>
  );
}
