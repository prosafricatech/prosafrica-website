"use client";

// The industry pages' workflow diagram: four steps joined by arrows, each with
// a small drawn preview of the screen it happens on, all feeding one ledger
// band underneath. Everything is drawn with MUI boxes against theme tokens —
// no image files — so it stays sharp, light and on-brand. The previews are
// shapes only: no figures, names or customer data.

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FactoryIcon from "@mui/icons-material/Factory";
import InsightsIcon from "@mui/icons-material/Insights";
import InventoryIcon from "@mui/icons-material/Inventory";
import LayersIcon from "@mui/icons-material/Layers";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { brand } from "./theme";

const stepIcons = {
  batch: <LayersIcon />,
  factory: <FactoryIcon />,
  insights: <InsightsIcon />,
  order: <ShoppingCartIcon />,
  plan: <EventNoteIcon />,
  pos: <PointOfSaleIcon />,
  receipt: <MoveToInboxIcon />,
  recipe: <ListAltIcon />,
  report: <AssessmentIcon />,
  shift: <ScheduleIcon />,
  station: <LocalGasStationIcon />,
  stores: <InventoryIcon />,
  tank: <WaterDropIcon />,
  tree: <AccountTreeIcon />,
  warehouse: <WarehouseIcon />,
} as const;

export type WorkflowStep = {
  detail: string;
  icon: keyof typeof stepIcons;
  title: string;
  visual: "bars" | "list" | "locations" | "progress" | "tank" | "timeline" | "tree";
};

const previewHeight = 96;

/** A rounded placeholder bar, the basic unit of every preview. */
function Bar({ color = brand.tintMuted, width }: { color?: string; width: string | number }) {
  return <Box sx={{ bgcolor: color, borderRadius: 1, height: 8, width }} />;
}

function TimelinePreview() {
  const rows = [
    { start: "0%", width: "45%", color: brand.primary },
    { start: "20%", width: "40%", color: brand.accent },
    { start: "45%", width: "35%", color: brand.accent },
    { start: "60%", width: "38%", color: brand.tintAccentStrong },
  ];
  return (
    <Stack spacing={1.25} sx={{ position: "relative" }}>
      {rows.map((row) => (
        <Box key={row.start} sx={{ height: 10, position: "relative" }}>
          <Box
            sx={{
              bgcolor: row.color,
              borderRadius: 1,
              height: "100%",
              left: row.start,
              position: "absolute",
              width: row.width,
            }}
          />
        </Box>
      ))}
      <Box
        sx={{
          borderLeft: `2px dashed ${brand.highlight}`,
          bottom: -4,
          left: "55%",
          position: "absolute",
          top: -4,
        }}
      />
    </Stack>
  );
}

function BarsPreview() {
  const heights = [40, 62, 48, 78, 58, 90, 72];
  return (
    <Stack direction="row" spacing={0.75} sx={{ alignItems: "flex-end", height: "100%" }}>
      {heights.map((height, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: index === heights.length - 1 ? brand.accent : brand.primary,
            borderRadius: "3px 3px 0 0",
            flex: 1,
            height: `${height}%`,
          }}
        />
      ))}
    </Stack>
  );
}

function ListPreview() {
  const rows = [
    { line: "70%", status: brand.tintSuccess },
    { line: "55%", status: brand.tintAccentStrong },
    { line: "62%", status: brand.tintMuted },
  ];
  return (
    <Stack spacing={1.25} sx={{ justifyContent: "center", height: "100%" }}>
      {rows.map((row) => (
        <Stack
          direction="row"
          key={row.line}
          spacing={1}
          sx={{
            alignItems: "center",
            bgcolor: brand.white,
            border: `1px solid ${brand.line}`,
            borderRadius: 1,
            px: 1,
            py: 0.75,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Bar width={row.line} />
          </Box>
          <Box sx={{ bgcolor: row.status, borderRadius: 4, height: 10, width: 32 }} />
        </Stack>
      ))}
    </Stack>
  );
}

function ProgressPreview() {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center", height: "100%" }}>
      <Box sx={{ display: "inline-flex", flexShrink: 0, position: "relative" }}>
        <CircularProgress
          size={64}
          sx={{ color: brand.tintMuted, position: "absolute" }}
          thickness={5}
          value={100}
          variant="determinate"
        />
        <CircularProgress
          size={64}
          sx={{ color: brand.accent }}
          thickness={5}
          value={66}
          variant="determinate"
        />
      </Box>
      <Stack spacing={1} sx={{ flexGrow: 1 }}>
        <Bar color={brand.primary} width="80%" />
        <Bar width="60%" />
        <Bar color={brand.tintSuccess} width="70%" />
      </Stack>
    </Stack>
  );
}

function LocationsPreview() {
  return (
    <Box
      sx={{
        alignContent: "center",
        display: "grid",
        gap: 1.25,
        gridTemplateColumns: "repeat(5, 1fr)",
        height: "100%",
        justifyItems: "center",
      }}
    >
      {Array.from({ length: 10 }, (_, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: index === 6 ? brand.primary : brand.tintAccentStrong,
            borderRadius: "50%",
            boxShadow: index === 6 ? `0 0 0 6px ${brand.tintAccent}` : "none",
            height: index === 6 ? 18 : 14,
            width: index === 6 ? 18 : 14,
          }}
        />
      ))}
    </Box>
  );
}

function TankPreview() {
  const tanks = [
    { fill: "68%", color: brand.accent },
    { fill: "40%", color: brand.primary },
    { fill: "82%", color: brand.accent },
  ];
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-end", height: "100%", justifyContent: "center" }}>
      {tanks.map((tank) => (
        <Box
          key={tank.fill}
          sx={{
            bgcolor: brand.white,
            border: `2px solid ${brand.line}`,
            borderRadius: "10px 10px 6px 6px",
            height: "92%",
            overflow: "hidden",
            position: "relative",
            width: 40,
          }}
        >
          <Box
            sx={{
              bgcolor: tank.color,
              bottom: 0,
              height: tank.fill,
              left: 0,
              opacity: 0.85,
              position: "absolute",
              right: 0,
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}

function TreePreview() {
  return (
    <Stack sx={{ alignItems: "center", height: "100%", justifyContent: "center" }}>
      <Box sx={{ bgcolor: brand.primary, borderRadius: 1, height: 14, width: "40%" }} />
      <Box sx={{ bgcolor: brand.line, height: 12, width: 2 }} />
      <Box sx={{ borderTop: `2px solid ${brand.line}`, width: "70%" }} />
      <Stack direction="row" sx={{ justifyContent: "space-between", width: "70%" }}>
        {[0, 1, 2].map((child) => (
          <Stack key={child} sx={{ alignItems: "center", width: 0 }}>
            <Box sx={{ bgcolor: brand.line, height: 12, width: 2 }} />
            <Box sx={{ bgcolor: brand.tintAccentStrong, borderRadius: 1, flexShrink: 0, height: 14, width: 44 }} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

const previews: Record<WorkflowStep["visual"], () => ReactNode> = {
  bars: BarsPreview,
  list: ListPreview,
  locations: LocationsPreview,
  progress: ProgressPreview,
  tank: TankPreview,
  timeline: TimelinePreview,
  tree: TreePreview,
};

function StepCard({ index, step }: { index: number; step: WorkflowStep }) {
  const Preview = previews[step.visual];
  return (
    <Paper
      elevation={0}
      role="listitem"
      sx={{
        bgcolor: brand.white,
        border: `1px solid ${brand.line}`,
        borderRadius: 3,
        boxShadow: `0 10px 30px ${brand.tintPrimary}`,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        height: "100%",
        p: 2.5,
      }}
      variant="outlined"
    >
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box
          aria-hidden="true"
          sx={{
            alignItems: "center",
            bgcolor: brand.primary,
            borderRadius: 2,
            color: brand.white,
            display: "flex",
            height: 44,
            justifyContent: "center",
            width: 44,
          }}
        >
          {stepIcons[step.icon]}
        </Box>
        <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
          STEP {String(index + 1).padStart(2, "0")}
        </Typography>
      </Stack>
      <Box>
        <Typography component="h3" variant="subtitle1">
          {step.title}
        </Typography>
        <Typography sx={{ color: brand.muted }} variant="body2">
          {step.detail}
        </Typography>
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          bgcolor: brand.paper,
          border: `1px solid ${brand.line}`,
          borderRadius: 2,
          height: previewHeight,
          mt: "auto",
          p: 1.5,
        }}
      >
        <Preview />
      </Box>
    </Paper>
  );
}

function Connector() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        py: { xs: 0.5, md: 0 },
        position: "relative",
      }}
    >
      <Box
        sx={{
          bgcolor: brand.accent,
          height: { xs: "100%", md: 2 },
          left: { md: 0 },
          position: "absolute",
          right: { md: 0 },
          width: { xs: 2, md: "auto" },
        }}
      />
      <Box
        sx={{
          alignItems: "center",
          bgcolor: brand.white,
          border: `2px solid ${brand.accent}`,
          borderRadius: "50%",
          color: brand.primary,
          display: "flex",
          height: 32,
          justifyContent: "center",
          position: "relative",
          width: 32,
          "& svg": { fontSize: 18 },
        }}
      >
        <ArrowForwardIcon sx={{ display: { xs: "none", md: "block" } }} />
        <ArrowDownwardIcon sx={{ display: { xs: "block", md: "none" } }} />
      </Box>
    </Box>
  );
}

const desktopColumns = "1fr 40px 1fr 40px 1fr 40px 1fr";

export function WorkflowDiagram({ name, steps }: { name: string; steps: readonly WorkflowStep[] }) {
  return (
    <Box
      aria-labelledby="workflow-heading"
      component="section"
      id="workflow"
      sx={{ bgcolor: brand.paper, py: { xs: 6, md: 9 }, scrollMarginTop: 72 }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            mb: { xs: 4, md: 5 },
          }}
        >
          <Box>
            <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
              HOW THE WORK FLOWS
            </Typography>
            <Typography component="h2" id="workflow-heading" variant="h4">
              From {steps[0].title.toLowerCase()} to {steps[steps.length - 1].title.toLowerCase()}, in
              one system.
            </Typography>
          </Box>
          <Typography sx={{ color: brand.muted }} variant="body1">
            Each step in {name.toLowerCase()} is recorded where it happens and handed to the next,
            so nobody re-keys it and the numbers behind it stay the same all the way through.
          </Typography>
        </Box>

        <Box
          role="list"
          sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: desktopColumns } }}
        >
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <StepCard index={index} step={step} />
              {index < steps.length - 1 ? (
                <Box sx={{ display: "flex", height: { xs: 48, md: "auto" }, justifyContent: "center" }}>
                  <Connector />
                </Box>
              ) : null}
            </Fragment>
          ))}
        </Box>

        {/* Every step drops into the same ledger */}
        <Box
          aria-hidden="true"
          sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: desktopColumns, height: 40 }}
        >
          {steps.map((step, index) => (
            <Fragment key={step.title}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box sx={{ borderLeft: `2px dashed ${brand.accent}`, height: "100%" }} />
              </Box>
              {index < steps.length - 1 ? <Box /> : null}
            </Fragment>
          ))}
        </Box>
        <Box aria-hidden="true" sx={{ display: { xs: "flex", md: "none" }, height: 32, justifyContent: "center" }}>
          <Box sx={{ borderLeft: `2px dashed ${brand.accent}`, height: "100%" }} />
        </Box>

        <Paper
          elevation={0}
          sx={{
            alignItems: { md: "center" },
            bgcolor: brand.surfaceDark,
            borderRadius: 3,
            color: brand.white,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2.5,
            p: { xs: 2.5, md: 3 },
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              alignItems: "center",
              bgcolor: brand.surfaceDarkest,
              borderRadius: 2,
              color: brand.accentLight,
              display: "flex",
              flexShrink: 0,
              height: 52,
              justifyContent: "center",
              width: 52,
            }}
          >
            <AccountBalanceIcon />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography component="h3" variant="subtitle1">
              Finance &amp; reporting
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body2">
              Every step lands in the same ledger and reports, so management sees the operation and
              the money from one set of records.
            </Typography>
          </Box>
          <Button
            component={Link}
            endIcon={<ArrowForwardIcon />}
            href="/#request-demo"
            sx={{
              bgcolor: brand.white,
              color: brand.primary,
              flexShrink: 0,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: brand.paper },
            }}
            variant="contained"
          >
            See this flow in a demo
          </Button>
        </Paper>
        <Typography sx={{ color: brand.muted, display: "block", mt: 1.5 }} variant="caption">
          Illustrative diagram · shapes only, no customer data
        </Typography>
      </Container>
    </Box>
  );
}
