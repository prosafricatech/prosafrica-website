"use client";

// MUI runtime for the App Router.
//
// AppRouterCacheProvider collects emotion's styles during SSR so they are
// injected before any markup that uses them (emotion has no full RSC support
// yet, which is why this is a client component).
//
// CssBaseline is the project's only global reset — app/globals.css is gone, so
// MUI owns normalisation as well as component styling.
//
// `enableCssLayer` is not set, and is not needed: no plain CSS competes with MUI
// any more, so the normal cascade is enough. See CLAUDE.md for the no-CSS rule.

import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

import { theme } from "./theme";

export function MuiProviders({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
