"use client";

// Decorative dashboard mock for the homepage hero.
//
// It deliberately shows shapes rather than numbers — the caption says so — and
// mirrors the widget set observed on the real ProsERP dashboard (P&L trend,
// balance-sheet trend, revenue and expense composition, inventory value,
// purchases & GRNs, low stock, due invoices, quick links and quick reports).
// The interactive, labelled version of this screen lives in FinancePreview.

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

import { brand } from "./theme";

function MockCard({
  children,
  meta,
  span = 1,
  title,
}: {
  children: ReactNode;
  meta?: string;
  span?: number;
  title: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: brand.white,
        border: `1px solid ${brand.line}`,
        borderRadius: 2,
        gridColumn: { xs: "1 / -1", sm: `span ${span}` },
        p: 1.25,
      }}
      variant="outlined"
    >
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.75 }}>
        <Typography component="h2" sx={{ color: brand.ink, fontWeight: 700 }} variant="caption">
          {title}
        </Typography>
        {meta ? (
          <Typography sx={{ color: brand.muted }} variant="caption">
            {meta}
          </Typography>
        ) : null}
      </Stack>
      {children}
    </Paper>
  );
}

function LineChart({ series }: { series: { color: string; path: string }[] }) {
  return (
    <Box aria-hidden="true" sx={{ height: 56 }}>
      <svg height="100%" preserveAspectRatio="none" viewBox="0 0 280 120" width="100%">
        <path d="M0 10H280M0 35H280M0 60H280M0 85H280M0 110H280" stroke={brand.line} strokeWidth="1" />
        {series.map((item) => (
          <path d={item.path} fill="none" key={item.color} stroke={item.color} strokeWidth="3" />
        ))}
      </svg>
    </Box>
  );
}

function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 0.5 }} useFlexGap>
      {items.map((item) => (
        <Stack direction="row" key={item.label} spacing={0.5} sx={{ alignItems: "center" }}>
          <Box sx={{ bgcolor: item.color, borderRadius: "50%", height: 6, width: 6 }} />
          <Typography sx={{ color: brand.muted }} variant="caption">
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function Donut({ label, tone }: { label: string; tone: string }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        background: `conic-gradient(${tone} 0 58%, ${brand.line} 58% 100%)`,
        borderRadius: "50%",
        display: "grid",
        height: 68,
        mx: "auto",
        placeItems: "center",
        width: 68,
        "&::after": {
          bgcolor: brand.white,
          borderRadius: "50%",
          content: '""',
          height: 44,
          width: 44,
        },
      }}
    >
      <Typography sx={{ color: brand.muted, position: "absolute" }} variant="caption">
        {label}
      </Typography>
    </Box>
  );
}

function Bars({ heights, tone }: { heights: number[]; tone: string }) {
  return (
    <Stack
      aria-hidden="true"
      direction="row"
      spacing={0.5}
      sx={{ alignItems: "flex-end", height: 48 }}
    >
      {heights.map((height, index) => (
        <Box key={index} sx={{ bgcolor: tone, borderRadius: 0.5, flexGrow: 1, height: `${height}%` }} />
      ))}
    </Stack>
  );
}

function PlaceholderLines({ count }: { count: number }) {
  return (
    <Stack aria-hidden="true" spacing={0.75}>
      {Array.from({ length: count }, (_unused, index) => (
        <Box key={index} sx={{ bgcolor: brand.line, borderRadius: 1, height: 8, width: `${90 - index * 15}%` }} />
      ))}
    </Stack>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }} useFlexGap>
      {items.map((item) => (
        <Chip
          key={item}
          label={item}
          size="small"
          sx={{ bgcolor: brand.paper, color: brand.ink, fontSize: "0.625rem" }}
        />
      ))}
    </Stack>
  );
}

/**
 * The real dashboard's "Top Products" table, as column headings over shaped
 * rows. The headings are the product's own; the rows stay as bars because this
 * mock shows no figures — see the caption under the grid.
 */
function TopProducts() {
  const columns = ["Products", "Quantity", "Revenue", "CoGS", "Profit", "Margin"];
  const tint = [brand.line, brand.line, brand.accent, brand.error, brand.success, brand.success];
  const widths = [
    [92, 46, 74, 66, 58, 40],
    [78, 52, 62, 70, 44, 52],
    [86, 38, 68, 56, 62, 46],
  ];

  return (
    <Box aria-hidden="true">
      <Box
        sx={{
          display: "grid",
          gap: 0.75,
          gridTemplateColumns: "1.6fr repeat(5, 1fr)",
          pb: 0.5,
        }}
      >
        {columns.map((column) => (
          <Typography key={column} sx={{ color: brand.muted }} variant="caption">
            {column}
          </Typography>
        ))}
      </Box>
      {widths.map((row, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            borderTop: `1px solid ${brand.line}`,
            display: "grid",
            gap: 0.75,
            gridTemplateColumns: "1.6fr repeat(5, 1fr)",
            py: 0.6,
          }}
        >
          {row.map((width, cellIndex) => (
            <Box
              key={cellIndex}
              sx={{
                bgcolor: tint[cellIndex],
                borderRadius: 1,
                height: 6,
                opacity: cellIndex < 2 ? 1 : 0.75,
                width: `${width}%`,
              }}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export function HeroDashboardMock() {
  return (
    <Paper
      aria-label="Illustrative ProsERP dashboard showing finance trends and revenue composition"
      elevation={0}
      sx={{ bgcolor: brand.white, borderRadius: 3, overflow: "hidden" }}
    >
      {/* Window toolbar */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          bgcolor: brand.paper,
          borderBottom: `1px solid ${brand.line}`,
          px: 1.5,
          py: 1,
        }}
      >
        <Stack aria-hidden="true" spacing={0.4}>
          {[0, 1, 2].map((line) => (
            <Box key={line} sx={{ bgcolor: brand.muted, height: 2, width: 12 }} />
          ))}
        </Stack>
        <Typography sx={{ color: brand.ink, flexGrow: 1, fontWeight: 700 }} variant="caption">
          Dashboard
        </Typography>
        <Stack aria-hidden="true" direction="row" spacing={0.5}>
          {[0, 1, 2].map((dot) => (
            <Box key={dot} sx={{ bgcolor: brand.line, borderRadius: "50%", height: 7, width: 7 }} />
          ))}
        </Stack>
      </Stack>

      {/* Filters */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          borderBottom: `1px solid ${brand.line}`,
          color: brand.muted,
          flexWrap: "wrap",
          px: 1.5,
          py: 1,
        }}
        useFlexGap
      >
        {[
          ["From", "Start date"],
          ["To", "End date"],
          ["Cost and Profit Centers", "All centers"],
        ].map(([label, value]) => (
          <Typography key={label} variant="caption">
            {label}{" "}
            <Box component="b" sx={{ color: brand.ink }}>
              {value}
            </Box>
          </Typography>
        ))}
      </Stack>

      {/* Widget grid */}
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(4, 1fr)" },
          p: 1.5,
        }}
      >
        <MockCard meta="Daily" span={2} title="Profit & Loss Trend">
          <LineChart
            series={[
              { color: brand.primaryLight, path: "M0 75 C30 68 35 45 64 54 S95 80 123 56 S162 28 187 44 S221 63 246 30 S268 23 280 14" },
              { color: brand.highlight, path: "M0 91 C24 86 42 73 64 78 S98 57 123 68 S157 51 187 61 S222 44 246 53 S266 37 280 42" },
              { color: brand.success, path: "M0 102 C26 98 43 91 64 93 S97 79 123 87 S158 72 187 82 S220 69 246 74 S266 62 280 66" },
            ]}
          />
          <Legend
            items={[
              { color: brand.primaryLight, label: "Revenue" },
              { color: brand.highlight, label: "Expenses" },
              { color: brand.success, label: "Profit" },
            ]}
          />
        </MockCard>

        <MockCard meta="Daily" span={2} title="Balance Sheet Trend">
          <LineChart
            series={[
              { color: brand.primaryLight, path: "M0 87 C22 83 39 64 61 68 S98 53 121 57 S161 35 183 41 S220 29 242 31 S265 18 280 15" },
              { color: brand.success, path: "M0 98 C24 93 41 86 61 89 S100 75 121 78 S160 65 183 68 S220 56 242 60 S265 48 280 51" },
            ]}
          />
          <Legend
            items={[
              { color: brand.primaryLight, label: "Assets" },
              { color: brand.success, label: "Liabilities" },
            ]}
          />
        </MockCard>

        <MockCard span={1} title="Revenue Composition">
          <Donut label="Revenue" tone={brand.primaryLight} />
        </MockCard>
        <MockCard span={1} title="Operating Expenses">
          <Donut label="Expenses" tone={brand.highlight} />
        </MockCard>
        <MockCard meta="Monthly" span={2} title="Inventory Value">
          <Bars heights={[45, 62, 54, 78, 70, 88, 76, 96, 60, 72, 84, 92]} tone={brand.primary} />
        </MockCard>

        <MockCard meta="Daily" span={2} title="Purchases & GRNs">
          <Bars heights={[42, 74, 19, 55, 30, 48, 66, 38]} tone={brand.primaryLight} />
          <Legend
            items={[
              { color: brand.primaryLight, label: "Purchases" },
              { color: brand.success, label: "GRNs" },
            ]}
          />
        </MockCard>
        <MockCard span={1} title="Low Stock Alerts">
          <PlaceholderLines count={3} />
        </MockCard>
        <MockCard span={1} title="Due Invoices">
          <PlaceholderLines count={2} />
        </MockCard>

        <MockCard meta="By profit" span={4} title="Top Products">
          <TopProducts />
        </MockCard>

        <MockCard span={2} title="Quick Links">
          <TagList
            items={["Sales", "Purchases", "Transactions", "Ledgers", "Stores", "Products"]}
          />
        </MockCard>
        <MockCard span={2} title="Quick Reports">
          <TagList
            items={["Sales & Cash Summary", "Stock Report", "Item Movement", "Debtors & Creditors"]}
          />
        </MockCard>
      </Box>

      <Typography
        sx={{
          borderTop: `1px solid ${brand.line}`,
          color: brand.muted,
          display: "block",
          px: 1.5,
          py: 1,
        }}
        variant="caption"
      >
        Illustrative layout · graph shapes only · no customer data
      </Typography>
    </Paper>
  );
}
