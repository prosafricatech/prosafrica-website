"use client";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useState } from "react";

import { brand } from "./theme";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const industries = [
  "Construction and projects",
  "Fuel station operations",
  "Manufacturing",
  "Process approval",
  "Trading and distribution",
  "Other",
] as const;

export function DemoRequestForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/demo-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "We could not send your request.");
        setState("error");
        return;
      }

      form.reset();
      setState("success");
    } catch {
      setErrorMessage("A network error stopped your request. Please try again.");
      setState("error");
    }
  }

  return (
    <Paper
      component="form"
      elevation={0}
      onSubmit={handleSubmit}
      sx={{ border: `1px solid ${brand.line}`, borderRadius: 3, p: { xs: 2.5, md: 4 } }}
      variant="outlined"
    >
      <Stack spacing={0.75} sx={{ mb: 3 }}>
        <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
          REQUEST A DEMO
        </Typography>
        <Typography component="h2" variant="h5">
          Tell us where to start
        </Typography>
        <Typography sx={{ color: brand.muted }} variant="body2">
          We use these details to tailor the walkthrough to your needs.
        </Typography>
      </Stack>

      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
        <TextField autoComplete="name" fullWidth label="Full name" name="full_name" required />
        <TextField autoComplete="email" fullWidth label="Work email" name="email" required type="email" />
        <TextField autoComplete="tel" fullWidth label="Phone number" name="phone" required type="tel" />
        <TextField
          autoComplete="organization"
          fullWidth
          label="Organization"
          name="organization_name"
          required
        />
        <TextField
          defaultValue=""
          fullWidth
          label="Industry"
          name="industry"
          required
          select
          sx={{ gridColumn: { sm: "1 / -1" } }}
        >
          {industries.map((industry) => (
            <MenuItem key={industry} value={industry}>
              {industry}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="What would you like to manage better?"
          multiline
          name="description"
          required
          rows={4}
          slotProps={{ htmlInput: { maxLength: 2000 } }}
          sx={{ gridColumn: { sm: "1 / -1" } }}
        />
      </Box>

      {state === "success" ? (
        <Alert aria-live="polite" role="status" severity="success" sx={{ mt: 2.5 }}>
          Thank you. Your demo request has been sent.
        </Alert>
      ) : null}
      {state === "error" ? (
        <Alert aria-live="polite" role="alert" severity="error" sx={{ mt: 2.5 }}>
          {errorMessage}
        </Alert>
      ) : null}

      <Button
        disabled={state === "submitting"}
        endIcon={<ArrowForwardIcon />}
        fullWidth
        size="large"
        sx={{
          bgcolor: brand.primary,
          color: brand.white,
          fontWeight: 700,
          mt: 3,
          textTransform: "none",
          "&:hover": { bgcolor: brand.primaryDark },
        }}
        type="submit"
        variant="contained"
      >
        {state === "submitting" ? "Sending request..." : "Request my demo"}
      </Button>
      <Typography sx={{ color: brand.muted, display: "block", mt: 1.5 }} variant="caption">
        Your information is only used to respond to this request.
      </Typography>
    </Paper>
  );
}
