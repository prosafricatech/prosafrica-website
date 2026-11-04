"use client";

// Shared marketing-page primitives, built on MUI.
//
// These cover the shapes that repeat across the homepage, industry pages and
// solution pages: an eyebrow label, a two-column section heading, numbered
// cards, a text link and the closing call-to-action bar. Styling comes from
// components/theme.ts — see CLAUDE.md for the no-CSS standard.

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CallMadeIcon from "@mui/icons-material/CallMade";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { ReactNode } from "react";

import { brand } from "./theme";

/** Small uppercase label that sits above a heading. */
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <Typography
      sx={{ color: light ? brand.accent : brand.muted, display: "block", fontWeight: 700 }}
      variant="caption"
    >
      {children}
    </Typography>
  );
}

/** Eyebrow + title on the left, supporting paragraph on the right. */
export function SectionHeading({
  eyebrow,
  intro,
  light = false,
  title,
  titleId,
}: {
  eyebrow: string;
  intro?: ReactNode;
  light?: boolean;
  title: ReactNode;
  /** Anchor target, set on the heading element itself so links land on the h2. */
  titleId?: string;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 2, md: 4 },
        gridTemplateColumns: { xs: "1fr", md: intro ? "1fr 1fr" : "1fr" },
        mb: 4,
      }}
    >
      <Box>
        <Eyebrow light={light}>{eyebrow.toUpperCase()}</Eyebrow>
        <Typography component="h2" id={titleId} sx={{ mt: 0.5 }} variant="h4">
          {title}
        </Typography>
      </Box>
      {intro ? (
        <Typography sx={{ color: light ? "rgba(255,255,255,0.8)" : brand.muted }} variant="body1">
          {intro}
        </Typography>
      ) : null}
    </Box>
  );
}

/**
 * Card used for capabilities, industries and workflow lists. Pass `number`
 * only when the cards are a sequence the reader follows in order; otherwise
 * pass an `icon`, so a numbered grid never reads as steps when it is not.
 */
export function NumberedCard({
  detail,
  href,
  icon,
  id,
  number,
  showArrow = false,
  title,
}: {
  detail: string;
  href?: string;
  icon?: ReactNode;
  id?: string;
  number?: string;
  /** Ignored without `href`: an arrow on a card that goes nowhere is a false promise. */
  showArrow?: boolean;
  title: string;
}) {
  return (
    <Paper
      component="article"
      elevation={0}
      id={id}
      sx={{
        border: `1px solid ${brand.line}`,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2.5,
        position: "relative",
        transition: "border-color 160ms, box-shadow 160ms",
        ...(href
          ? {
              "&:hover": { borderColor: brand.primary, boxShadow: `0 6px 20px ${brand.tintPrimary}` },
            }
          : null),
      }}
      variant="outlined"
      {...(href ? { component: Link as never, href } : null)}
    >
      <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
        {icon ? (
          <Box
            aria-hidden="true"
            sx={{
              alignItems: "center",
              bgcolor: brand.tintAccent,
              borderRadius: 2,
              color: brand.primary,
              display: "flex",
              height: 40,
              justifyContent: "center",
              mb: 1,
              width: 40,
            }}
          >
            {icon}
          </Box>
        ) : (
          <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
            {number}
          </Typography>
        )}
        {showArrow && href ? <CallMadeIcon fontSize="small" sx={{ color: brand.muted }} /> : null}
      </Stack>
      <Typography component="h3" sx={{ mb: 0.75, mt: 0.5 }} variant="subtitle1">
        {title}
      </Typography>
      <Typography sx={{ color: brand.muted }} variant="body2">
        {detail}
      </Typography>
    </Paper>
  );
}

/** Responsive grid wrapper for NumberedCard sets. */
export function CardGrid({ children, columns = 4 }: { children: ReactNode; columns?: 2 | 3 | 4 | 5 }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          lg: `repeat(${columns}, 1fr)`,
        },
      }}
    >
      {children}
    </Box>
  );
}

/** Inline arrow link. */
export function TextLink({
  children,
  href,
  light = false,
}: {
  children: ReactNode;
  href: string;
  light?: boolean;
}) {
  const external = href.startsWith("#");
  return (
    <Button
      endIcon={<ArrowForwardIcon />}
      sx={{
        color: light ? brand.white : brand.primary,
        fontWeight: 600,
        textTransform: "none",
        whiteSpace: "nowrap",
      }}
      {...(external ? { href } : { component: Link, href })}
    >
      {children}
    </Button>
  );
}

/** Primary filled call-to-action button. */
export function PrimaryAction({
  children,
  href,
  tone = "default",
}: {
  children: ReactNode;
  href: string;
  /**
   * `default` is the live site's "Get Started" button — teal on a light
   * section. `onDark` inverts it for the dark bands, where a teal button
   * would disappear into the background.
   */
  tone?: "default" | "onDark";
}) {
  const onDark = tone === "onDark";
  return (
    <Button
      component={Link}
      endIcon={<ArrowForwardIcon />}
      href={href}
      size="large"
      sx={{
        bgcolor: onDark ? brand.white : brand.primary,
        color: onDark ? brand.primary : brand.white,
        flexShrink: 0,
        textTransform: "none",
        "&:hover": { bgcolor: onDark ? brand.paper : brand.primaryDark },
      }}
      variant="contained"
    >
      {children}
    </Button>
  );
}

/** Closing call-to-action row: copy on the left, button on the right. */
export function CtaBar({
  actionHref,
  actionLabel,
  eyebrow,
  title,
}: {
  actionHref: string;
  actionLabel: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}
      >
        <Box>
          <Eyebrow>{eyebrow.toUpperCase()}</Eyebrow>
          <Typography component="h2" sx={{ mt: 0.5 }} variant="h5">
            {title}
          </Typography>
        </Box>
        <PrimaryAction href={actionHref}>{actionLabel}</PrimaryAction>
      </Stack>
    </Container>
  );
}
