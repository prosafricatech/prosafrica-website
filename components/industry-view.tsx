"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CallMadeIcon from "@mui/icons-material/CallMade";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { SiteFooter, SiteHeader } from "./site-chrome";
import { brand } from "./theme";
import { WorkflowDiagram, type WorkflowStep } from "./workflow-diagram";

export type IndustryContent = {
  accent: string;
  description: string;
  eyebrow: string;
  flow: readonly string[];
  measure: string;
  measureLabel: string;
  name: string;
  related: readonly (readonly [string, string])[];
  steps: readonly WorkflowStep[];
  summary: string;
  title: string;
};

export function IndustryView({ industry }: { industry: IndustryContent }) {
  return (
    <>
      <SiteHeader />
      <Box component="main">
        {/* Hero */}
        <Box sx={{ bgcolor: brand.surfaceDark, color: brand.white, py: { xs: 6, md: 9 } }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                alignItems: "center",
                display: "grid",
                gap: { xs: 4, md: 6 },
                gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
              }}
            >
              <Stack spacing={2}>
                <Button
                  component={Link}
                  href="/#industries"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    alignSelf: "flex-start",
                    color: "rgba(255,255,255,0.75)",
                    textTransform: "none",
                  }}
                >
                  All industries
                </Button>
                <Typography sx={{ color: brand.accentLight, fontWeight: 700 }} variant="caption">
                  {industry.eyebrow.toUpperCase()}
                </Typography>
                <Typography component="h1" variant="h3">
                  {industry.title}
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body1">
                  {industry.description}
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
                  <Button
                    component={Link}
                    endIcon={<ArrowForwardIcon />}
                    href="/#request-demo"
                    sx={{
                      bgcolor: brand.primary,
                      color: brand.white,
                      fontWeight: 700,
                      textTransform: "none",
                      "&:hover": { bgcolor: brand.primaryDark },
                    }}
                    variant="contained"
                  >
                    Request a demo
                  </Button>
                  <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    href="#workflow"
                    sx={{ color: brand.white, textTransform: "none" }}
                  >
                    Explore workflow
                  </Button>
                </Stack>
              </Stack>

              {/* Illustrative workflow preview */}
              <Paper
                aria-label={`Illustrative ${industry.name} workflow`}
                elevation={0}
                sx={{ bgcolor: brand.white, borderRadius: 3, overflow: "hidden" }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    bgcolor: brand.paper,
                    borderBottom: `1px solid ${brand.line}`,
                    px: 2,
                    py: 1.25,
                  }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      alignItems: "center",
                      bgcolor: brand.primary,
                      borderRadius: 1,
                      color: brand.accentLight,
                      display: "flex",
                      fontWeight: 700,
                      height: 22,
                      justifyContent: "center",
                      width: 22,
                    }}
                  >
                    P
                  </Box>
                  <Typography sx={{ color: brand.muted, flexGrow: 1 }} variant="caption">
                    PROSERP / {industry.accent.toUpperCase()}
                  </Typography>
                  <Chip
                    label="SAMPLE VIEW"
                    size="small"
                    sx={{ bgcolor: brand.primary, color: brand.white, fontWeight: 700 }}
                  />
                </Stack>
                <Box sx={{ p: 2.5 }}>
                  <Typography sx={{ color: brand.muted }} variant="caption">
                    {industry.summary.toUpperCase()}
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "baseline", mb: 2, mt: 0.5 }}>
                    <Typography component="strong" sx={{ color: brand.ink }} variant="h4">
                      {industry.measure}
                    </Typography>
                    <Typography sx={{ color: brand.muted }} variant="caption">
                      {industry.measureLabel}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.75}>
                    {industry.flow.map((item, index) => (
                      <Stack
                        direction="row"
                        key={item}
                        spacing={1.5}
                        sx={{
                          alignItems: "center",
                          bgcolor: brand.paper,
                          border: `1px solid ${brand.line}`,
                          borderRadius: 2,
                          px: 1.5,
                          py: 1,
                        }}
                      >
                        <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
                          {String(index + 1).padStart(2, "0")}
                        </Typography>
                        <Typography component="strong" variant="body2">
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 2 }}>
                    <Box
                      aria-hidden="true"
                      sx={{ bgcolor: brand.accentLight, borderRadius: "50%", height: 8, width: 8 }}
                    />
                    <Typography sx={{ color: brand.muted }} variant="caption">
                      Illustrative workflow preview
                    </Typography>
                  </Stack>
                </Box>
              </Paper>
            </Box>
          </Container>
        </Box>

        <WorkflowDiagram name={industry.name} steps={industry.steps} />

        {/* Connections */}
        <Box sx={{ bgcolor: brand.surfaceDark, color: brand.white, py: { xs: 6, md: 9 } }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "grid",
                gap: { xs: 4, md: 6 },
                gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
              }}
            >
              <Stack spacing={1.5}>
                <Typography sx={{ color: brand.accentLight, fontWeight: 700 }} variant="caption">
                  CONNECTED BEYOND ONE TEAM
                </Typography>
                <Typography component="h2" variant="h4">
                  Operations do not happen in silos.
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body1">
                  ProsERP connects {industry.name.toLowerCase()} with the work around it, helping
                  teams keep a consistent view across the business.
                </Typography>
              </Stack>
              <Stack spacing={1.5}>
                {industry.related.map(([title, detail]) => (
                  <Stack
                    direction="row"
                    key={title}
                    spacing={1.5}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <CallMadeIcon fontSize="small" sx={{ color: brand.accentLight, mt: 0.25 }} />
                    <Box>
                      <Typography component="strong" variant="subtitle2">
                        {title}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.75)" }} variant="body2">
                        {detail}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Container>
        </Box>

        {/* Closing CTA */}
        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}
          >
            <Box>
              <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
                TAKE A CLOSER LOOK
              </Typography>
              <Typography component="h2" variant="h5">
                See ProsERP in the context of your business.
              </Typography>
            </Box>
            <Button
              component={Link}
              endIcon={<ArrowForwardIcon />}
              href="/#request-demo"
              size="large"
              sx={{
                bgcolor: brand.primary,
                color: brand.white,
                flexShrink: 0,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: brand.primaryDark },
              }}
              variant="contained"
            >
              Request a demo
            </Button>
          </Stack>
        </Container>
      </Box>
      <SiteFooter />
    </>
  );
}
