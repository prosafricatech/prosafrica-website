"use client";

// Site header and footer, built on MUI.
//
// The mobile menu is a real MUI Drawer rather than a CSS-toggled panel, so it
// gets focus trapping, Escape handling and scroll locking for free. Colours and
// type come from components/theme.ts.

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ConstructionIcon from "@mui/icons-material/Construction";
import EmailIcon from "@mui/icons-material/Email";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import FactoryIcon from "@mui/icons-material/Factory";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneIcon from "@mui/icons-material/Phone";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Collapse from "@mui/material/Collapse";
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

// The header's menus. Platform and Industries open a panel, Odoo-style, so the
// whole product is visible from any page; each module links to its own tab of
// the product tour (`?module=` is read by TourModuleSync in home-experience).
// The groups match the homepage's module groups — change both together.
const platformMenu = [
  {
    icon: <AccountBalanceIcon fontSize="small" />,
    title: "Money & control",
    items: [
      { detail: "Transactions, budgets and reconciliations", label: "Finance", module: "finance" },
      { detail: "Operational and financial views", label: "Reporting", module: "reporting" },
      { detail: "Assets, locations, status and value", label: "Asset Register", module: "asset-register" },
    ],
  },
  {
    icon: <Inventory2Icon fontSize="small" />,
    title: "Buying, stock & selling",
    items: [
      { detail: "Purchase orders and goods received", label: "Procurement", module: "procurement" },
      { detail: "Stock movement and low-stock alerts", label: "Inventory", module: "inventory" },
      { detail: "Counters, outlets and proformas", label: "Sales & POS", module: "sales" },
    ],
  },
  {
    icon: <EngineeringIcon fontSize="small" />,
    title: "Operations",
    items: [
      { detail: "Execution, budget and certificates", label: "Projects", module: "projects" },
      { detail: "Bills of materials and batches", label: "Manufacturing", module: "manufacturing" },
      { detail: "Shifts, dippings and fuel stock", label: "Fuel stations", module: "fuel" },
      { detail: "Batches, feeding, mortality and harvest", label: "Bio production", module: "bio-production" },
    ],
  },
  {
    icon: <FactCheckIcon fontSize="small" />,
    title: "People & approvals",
    items: [
      { detail: "Route and review business requests", label: "Process approval", module: "process-approval" },
      { detail: "Leave, loans and payroll approval", label: "Human resources", module: "human-resources" },
    ],
  },
] as const;

const industryMenu = [
  {
    detail: "Budgets, claims, stores and execution",
    href: "/industries/projects-construction",
    icon: <ConstructionIcon fontSize="small" />,
    label: "Projects & construction",
  },
  {
    detail: "Shifts, tank readings and station reports",
    href: "/industries/fuel-stations",
    icon: <LocalGasStationIcon fontSize="small" />,
    label: "Fuel stations",
  },
  {
    detail: "Materials, batches, output and costing",
    href: "/industries/manufacturing",
    icon: <FactoryIcon fontSize="small" />,
    label: "Manufacturing",
  },
  {
    detail: "Purchasing, inventory and sales",
    href: "/industries/trading-distribution",
    icon: <LocalShippingIcon fontSize="small" />,
    label: "Trading & distribution",
  },
  {
    detail: "Fish, poultry and livestock batches",
    href: "/industries/agriculture-aquaculture",
    icon: <AgricultureIcon fontSize="small" />,
    label: "Agriculture & aquaculture",
  },
] as const;

const plainLinks = [
  { href: "/product-tour", label: "Product tour" },
  { href: "/about", label: "About" },
] as const;

type MenuKey = "platform" | "industries";

const menuLabels: Record<MenuKey, string> = { platform: "Platform", industries: "Industries" };

const tourHref = (module: string) => `/product-tour?module=${module}`;

/** One link in a dropdown panel: label over a one-line description. */
function MenuLink({
  detail,
  href,
  icon,
  label,
  onClick,
}: {
  detail: string;
  href: string;
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Box
      component={Link}
      href={href}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        color: brand.ink,
        display: "flex",
        gap: 1.5,
        mx: -1.5,
        px: 1.5,
        py: 1,
        textDecoration: "none",
        "&:hover, &:focus-visible": { bgcolor: brand.tintAccent },
      }}
    >
      {icon ? (
        <Box
          aria-hidden="true"
          sx={{
            alignItems: "center",
            bgcolor: brand.tintAccent,
            borderRadius: 1.5,
            color: brand.primary,
            display: "flex",
            flexShrink: 0,
            height: 36,
            justifyContent: "center",
            width: 36,
          }}
        >
          {icon}
        </Box>
      ) : null}
      <Box>
        <Typography sx={{ fontWeight: 600 }} variant="body2">
          {label}
        </Typography>
        <Typography sx={{ color: brand.muted, fontSize: "0.8125rem", lineHeight: 1.4 }} variant="body2">
          {detail}
        </Typography>
      </Box>
    </Box>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<MenuKey | null>(null);
  const [drawerSection, setDrawerSection] = useState<MenuKey | null>(null);
  const close = () => {
    setMenuOpen(false);
    setOpenPanel(null);
  };
  const togglePanel = (key: MenuKey) => setOpenPanel(openPanel === key ? null : key);

  return (
    <ClickAwayListener onClickAway={() => setOpenPanel(null)}>
    <AppBar
      color="transparent"
      elevation={0}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpenPanel(null);
      }}
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
            {(Object.keys(menuLabels) as MenuKey[]).map((key) => (
              <Button
                aria-controls={`menu-${key}`}
                aria-expanded={openPanel === key}
                endIcon={
                  <ExpandMoreIcon
                    sx={{ transform: openPanel === key ? "rotate(180deg)" : "none", transition: "transform 160ms" }}
                  />
                }
                key={key}
                onClick={() => togglePanel(key)}
                sx={{
                  color: openPanel === key ? brand.primary : brand.ink,
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                {menuLabels[key]}
              </Button>
            ))}
            {plainLinks.map((link) => (
              <Button
                component={Link}
                href={link.href}
                key={link.href}
                onClick={close}
                sx={{ color: brand.ink, fontWeight: 600, textTransform: "none" }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              component={Link}
              href="/#request-demo"
              onClick={close}
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

      {/* Desktop dropdown panels, full width under the bar */}
      <Collapse
        in={openPanel !== null}
        sx={{
          bgcolor: brand.white,
          borderTop: openPanel ? `1px solid ${brand.line}` : "none",
          boxShadow: openPanel ? `0 24px 48px ${brand.tintPrimary}` : "none",
          display: { xs: "none", md: "block" },
          left: 0,
          position: "absolute",
          right: 0,
          top: "100%",
        }}
        unmountOnExit
      >
        <Container id={`menu-${openPanel}`} maxWidth="lg" sx={{ py: 4 }}>
          {openPanel === "platform" ? (
            <>
              <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: "repeat(4, 1fr)" }}>
                {platformMenu.map((group) => (
                  <Box key={group.title}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "center",
                        borderBottom: `2px solid ${brand.accent}`,
                        color: brand.primary,
                        mb: 1.5,
                        pb: 1,
                      }}
                    >
                      {group.icon}
                      <Typography sx={{ fontWeight: 700 }} variant="subtitle2">
                        {group.title}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.25}>
                      {group.items.map((item) => (
                        <MenuLink
                          detail={item.detail}
                          href={tourHref(item.module)}
                          key={item.module}
                          label={item.label}
                          onClick={close}
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" spacing={4}>
                <MenuFooterLink href="/#platform" onClick={close}>
                  How the modules connect
                </MenuFooterLink>
                <MenuFooterLink href="/product-tour" onClick={close}>
                  Take the full product tour
                </MenuFooterLink>
              </Stack>
            </>
          ) : null}
          {openPanel === "industries" ? (
            <>
              <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(5, 1fr)" }}>
                {industryMenu.map((industry) => (
                  <MenuLink
                    detail={industry.detail}
                    href={industry.href}
                    icon={industry.icon}
                    key={industry.href}
                    label={industry.label}
                    onClick={close}
                  />
                ))}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" spacing={4}>
                <MenuFooterLink href="/#industries" onClick={close}>
                  All industries
                </MenuFooterLink>
                <MenuFooterLink href="/solutions/process-approval" onClick={close}>
                  Process approval across every industry
                </MenuFooterLink>
              </Stack>
            </>
          ) : null}
        </Container>
      </Collapse>

      <Drawer anchor="right" onClose={close} open={menuOpen}>
        <Box sx={{ width: 300 }}>
          <Typography sx={{ color: brand.muted, px: 2, py: 1.5 }} variant="caption">
            Menu
          </Typography>
          <Divider />
          <List component="nav">
            {(Object.keys(menuLabels) as MenuKey[]).map((key) => (
              <Box key={key}>
                <ListItemButton
                  aria-expanded={drawerSection === key}
                  onClick={() => setDrawerSection(drawerSection === key ? null : key)}
                >
                  <ListItemText primary={menuLabels[key]} />
                  <ExpandMoreIcon
                    sx={{ transform: drawerSection === key ? "rotate(180deg)" : "none", transition: "transform 160ms" }}
                  />
                </ListItemButton>
                <Collapse in={drawerSection === key} unmountOnExit>
                  <Box sx={{ bgcolor: brand.paper, px: 3, py: 1.5 }}>
                    {key === "platform"
                      ? platformMenu.map((group) => (
                          <Box key={group.title} sx={{ mb: 1.5 }}>
                            <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
                              {group.title.toUpperCase()}
                            </Typography>
                            {group.items.map((item) => (
                              <MenuLink
                                detail={item.detail}
                                href={tourHref(item.module)}
                                key={item.module}
                                label={item.label}
                                onClick={close}
                              />
                            ))}
                          </Box>
                        ))
                      : industryMenu.map((industry) => (
                          <MenuLink
                            detail={industry.detail}
                            href={industry.href}
                            icon={industry.icon}
                            key={industry.href}
                            label={industry.label}
                            onClick={close}
                          />
                        ))}
                  </Box>
                </Collapse>
              </Box>
            ))}
            {plainLinks.map((link) => (
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
    </ClickAwayListener>
  );
}

/** Arrow link along the bottom edge of a dropdown panel. */
function MenuFooterLink({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  onClick: () => void;
}) {
  return (
    <Button
      component={Link}
      endIcon={<ArrowForwardIcon />}
      href={href}
      onClick={onClick}
      sx={{ color: brand.primary, fontWeight: 600, ml: -1, textTransform: "none" }}
    >
      {children}
    </Button>
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
  { href: "/about#who-its-for", label: "Who it's for" },
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
