"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { DemoRequestForm } from "./demo-request-form";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { brand } from "./theme";

// Deliberately no response time or meeting length: both are commitments
// ProsAfrica has not confirmed (see docs/product-evidence-register.md).
const nextSteps = [
  {
    title: "We read your request",
    detail: "Someone from the ProsERP team goes through what you told us you want to manage better.",
  },
  {
    title: "We get in touch to agree a time",
    detail: "By phone or email, using the details you gave.",
  },
  {
    title: "The walkthrough follows your work",
    detail: "We show the modules you asked about, set against the way your operations run.",
  },
];

export function RequestDemoView() {
  return (
    <>
      <SiteHeader />
      <Box component="main" sx={{ py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gap: { xs: 4, md: 6 },
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              alignItems: "start",
            }}
          >
            <Stack spacing={2}>
              <Button
                component={Link}
                href="/"
                startIcon={<ArrowBackIcon />}
                sx={{ alignSelf: "flex-start", color: brand.muted, textTransform: "none" }}
              >
                Back to ProsERP
              </Button>
              <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
                A CLOSER LOOK AT PROSERP
              </Typography>
              <Typography component="h1" variant="h3">
                Let&apos;s make the demo about your business.
              </Typography>
              <Typography sx={{ color: brand.muted }} variant="body1">
                Share a few details and our team will get in touch to arrange a walkthrough around
                the way your operations work.
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: brand.paper,
                  border: `1px solid ${brand.line}`,
                  borderRadius: 3,
                  p: 2.5,
                }}
                variant="outlined"
              >
                <Stack direction="row" spacing={1.5}>
                  <Box
                    aria-hidden="true"
                    sx={{
                      alignItems: "center",
                      bgcolor: brand.primary,
                      borderRadius: "50%",
                      color: brand.white,
                      display: "flex",
                      flexShrink: 0,
                      fontWeight: 700,
                      height: 28,
                      justifyContent: "center",
                      width: 28,
                    }}
                  >
                    +
                  </Box>
                  <Typography variant="body2">
                    Projects, process approval, purchasing, stock, production, fuel operations and
                    financial reporting — see how the pieces connect.
                  </Typography>
                </Stack>
              </Paper>
              <Typography component="h2" sx={{ pt: 1 }} variant="h6">
                What happens next
              </Typography>
              <Stack component="ol" spacing={1.5} sx={{ m: 0, p: 0 }}>
                {nextSteps.map((step, index) => (
                  <Stack component="li" direction="row" key={step.title} spacing={1.5}>
                    <Typography
                      aria-hidden="true"
                      sx={{ color: brand.muted, flexShrink: 0, fontWeight: 700 }}
                      variant="body2"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Box>
                      <Typography component="h3" variant="subtitle2">
                        {step.title}
                      </Typography>
                      <Typography sx={{ color: brand.muted }} variant="body2">
                        {step.detail}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
              <Typography sx={{ color: brand.muted }} variant="body2">
                No obligation. We start by understanding how your business works.
              </Typography>
            </Stack>
            <DemoRequestForm />
          </Box>
        </Container>
      </Box>
      <SiteFooter />
    </>
  );
}
