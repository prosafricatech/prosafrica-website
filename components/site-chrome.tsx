"use client";

// Site header and footer, built on MUI.
//
// The mobile menu is a real MUI Drawer rather than a CSS-toggled panel, so it
// gets focus trapping, Escape handling and scroll locking for free. Colours and
// type come from components/theme.ts.

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { brand } from "./theme";

const navLinks = [
  { href: "/#platform", label: "Platform" },
  { href: "/about", label: "About" },
  { href: "/#industries", label: "Industries" },
  { href: "/#clients-heading", label: "Our clients" },
  { href: "/about#who-its-for", label: "Who it's for" },
  { href: "/product-tour", label: "Product tour" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <AppBar
      color="transparent"
      elevation={0}
      position="sticky"
      sx={{ bgcolor: brand.white, borderBottom: `1px solid ${brand.line}` }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, justifyContent: "space-between" }}>
          <Box aria-label="ProsERP home" component={Link} href="/" onClick={close} sx={{ display: "flex" }}>
            <Image alt="ProsERP" height={38} priority src="/images/logo/proserp-logo-darkgray.png" width={118} />
          </Box>

          {/* Desktop navigation */}
          <Stack
            component="nav"
            direction="row"
            spacing={0.5}
            sx={{ alignItems: "center", display: { xs: "none", md: "flex" } }}
          >
            {navLinks.map((link) => (
              <Button
                component={Link}
                href={link.href}
                key={link.href}
                sx={{ color: brand.ink, fontWeight: 600, textTransform: "none" }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              component={Link}
              href="/#request-demo"
              sx={{
                bgcolor: brand.primary,
                color: brand.white,
                fontWeight: 700,
                ml: 1,
                textTransform: "none",
                "&:hover": { bgcolor: brand.primaryDark },
              }}
              variant="contained"
            >
              Request a demo&nbsp;&rarr;
            </Button>
          </Stack>

          {/* Mobile trigger */}
          <IconButton
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <Box aria-hidden="true" sx={{ display: "grid", gap: "4px", width: 20 }}>
              <Box sx={{ bgcolor: brand.ink, height: 2 }} />
              <Box sx={{ bgcolor: brand.ink, height: 2 }} />
            </Box>
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" onClose={close} open={menuOpen}>
        <Box sx={{ width: 260 }}>
          <Typography sx={{ color: brand.muted, px: 2, py: 1.5 }} variant="caption">
            Menu
          </Typography>
          <Divider />
          <List component="nav">
            {navLinks.map((link) => (
              <ListItemButton component={Link} href={link.href} key={link.href} onClick={close}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button
              component={Link}
              fullWidth
              href="/#request-demo"
              onClick={close}
              sx={{
                bgcolor: brand.primary,
                color: brand.white,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: brand.primaryDark },
              }}
              variant="contained"
            >
              Request a demo&nbsp;&rarr;
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}

// The live site's footer has a "Useful Links" column whose entries all point at
// `#` or `/#!`. Those are placeholders, so they are not reproduced here — every
// link below resolves to a real route.
const footerPages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#industries", label: "Industries" },
  { href: "/#clients-heading", label: "Our clients" },
] as const;

const footerExplore = [
  { href: "/product-tour", label: "Product tour" },
  { href: "/#adoption", label: "How it goes in" },
  { href: "/solutions/process-approval", label: "Process approval" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/#request-demo", label: "Request a demo" },
] as const;

function FooterColumn({
  links,
  title,
}: {
  links: readonly { href: string; label: string }[];
  title: string;
}) {
  return (
    <Box>
      <Typography sx={{ color: brand.accentLight, fontWeight: 700 }} variant="caption">
        {title.toUpperCase()}
      </Typography>
      <Stack spacing={0.75} sx={{ alignItems: "flex-start", mt: 1.5 }}>
        {links.map((link) => (
          <Typography
            component={Link}
            href={link.href}
            key={link.href}
            sx={{ color: "rgba(255,255,255,0.85)", "&:hover": { color: brand.white } }}
            variant="body2"
          >
            {link.label}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

export function SiteFooter() {
  return (
    // The live site's footer is the teal band, flush against the section above
    // it — not a near-black slab separated by a white gap.
    <Box component="footer" sx={{ bgcolor: brand.surfaceDark, color: brand.white, py: 5 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 5 },
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1.4fr 1fr 1fr" },
          }}
        >
          <Stack spacing={1.5} sx={{ alignItems: "flex-start" }}>
            <Box aria-label="ProsERP home" component={Link} href="/" sx={{ display: "flex" }}>
              <Image alt="ProsERP" height={34} src="/images/logo/proserp-white.png" width={106} />
            </Box>
            <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body2">
              Simplified Management and Control
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <PhoneIcon fontSize="small" sx={{ color: brand.accentLight }} />
              <Typography component="a" href="tel:+255746917817" variant="body2">
                +255 746 917 817
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <EmailIcon fontSize="small" sx={{ color: brand.accentLight }} />
              <Typography component="a" href="mailto:info@prosafrica.co.tz" variant="body2">
                info@prosafrica.co.tz
              </Typography>
            </Stack>
            <IconButton
              aria-label="ProsERP on Instagram"
              component="a"
              href="https://www.instagram.com/pros_erp"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: brand.white, ml: -0.5, "& svg": { height: 18, width: 18 } }}
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </IconButton>
          </Stack>

          <FooterColumn links={footerPages} title="Pages" />
          <FooterColumn links={footerExplore} title="Explore" />
        </Box>

        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.15)",
            mt: 4,
            pt: 2.5,
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.7)" }} variant="caption">
            ProsAfrica &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
