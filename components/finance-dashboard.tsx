"use client";

// Finance dashboard view for FinancePreview, built on MUI.
//
// Values respond to the date range and cost-centre filters so the screen reads
// as a working dashboard, but every figure is scaled sample data — the panel is
// labelled illustrative and nothing is written back.

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

import { brand } from "./theme";

const SERIES = {
  assets: brand.primaryLight,
  equity: brand.highlight,
  expenses: brand.success,
  grns: brand.success,
  liabilities: brand.success,
  profit: brand.highlight,
  purchases: brand.primaryLight,
  revenue: brand.primaryLight,
} as const;

function Card({
  children,
  meta,
  span = 1,
  title,
}: {
  children: ReactNode;
  meta?: ReactNode;
  span?: number;
  title: string;
}) {
  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        border: `1px solid ${brand.line}`,
        borderRadius: 2,
        gridColumn: { xs: "1 / -1", md: `span ${span}` },
        p: 1.5,
      }}
      variant="outlined"
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
      >
        <Typography component="strong" sx={{ fontWeight: 700 }} variant="body2">
          {title}
        </Typography>
        {meta}
      </Stack>
      {children}
    </Paper>
  );
}

function ChartLegend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", mt: 1 }} useFlexGap>
      {items.map((item) => (
        <Stack direction="row" key={item.label} spacing={0.5} sx={{ alignItems: "center" }}>
          <Box sx={{ bgcolor: item.color, borderRadius: "50%", height: 8, width: 8 }} />
          <Typography sx={{ color: brand.muted }} variant="caption">
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function TrendChart({
  axis,
  label,
  polylines,
}: {
  axis: string[];
  label: string;
  polylines: { color: string; points: string }[];
}) {
  return (
    <Stack aria-label={label} direction="row" spacing={1}>
      <Stack sx={{ justifyContent: "space-between", minWidth: 40 }}>
        {axis.map((tick) => (
          <Typography key={tick} sx={{ color: brand.muted }} variant="caption">
            {tick}
          </Typography>
        ))}
      </Stack>
      <Box sx={{ flexGrow: 1, height: 110 }}>
        <svg aria-hidden="true" height="100%" preserveAspectRatio="none" viewBox="0 0 240 100" width="100%">
          {[15, 38, 61, 84].map((y) => (
            <line key={y} stroke={brand.line} strokeWidth="1" x1="0" x2="240" y1={y} y2={y} />
          ))}
          {polylines.map((line) => (
            <polyline
              fill="none"
              key={line.color}
              points={line.points}
              stroke={line.color}
              strokeWidth="2.5"
            />
          ))}
        </svg>
      </Box>
    </Stack>
  );
}

function DonutCard({
  items,
  label,
  title,
  tone,
}: {
  items: { label: string; value: string }[];
  label: string;
  title: string;
  tone: string;
}) {
  return (
    <Card span={1} title={title}>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Box
          aria-label={label}
          sx={{
            background: `conic-gradient(${tone} 0 58%, ${brand.line} 58% 100%)`,
            borderRadius: "50%",
            display: "grid",
            flexShrink: 0,
            height: 72,
            placeItems: "center",
            width: 72,
            "&::after": {
              bgcolor: brand.white,
              borderRadius: "50%",
              content: '""',
              height: 46,
              width: 46,
            },
          }}
        />
        <Stack spacing={0.25}>
          {items.map((item) => (
            <Typography key={item.label} sx={{ color: brand.muted }} variant="caption">
              {item.label}{" "}
              <Box component="b" sx={{ color: brand.ink }}>
                {item.value}
              </Box>
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}

export function FinanceDashboard({
  costCenter,
  dateRangeValid,
  expenses,
  financeScale,
  formatCompact,
  fromDate,
  graphValues,
  interval,
  onCostCenterChange,
  onFromDateChange,
  onIntervalChange,
  onQuickReport,
  onToDateChange,
  onViewChange,
  revenue,
  toDate,
}: {
  costCenter: string;
  dateRangeValid: boolean;
  expenses: number;
  financeScale: number;
  formatCompact: (value: number) => string;
  fromDate: string;
  graphValues: Record<string, number[]>;
  interval: string;
  onCostCenterChange: (value: string) => void;
  onFromDateChange: (value: string) => void;
  onIntervalChange: (value: string) => void;
  onQuickReport: (report: string) => void;
  onToDateChange: (value: string) => void;
  onViewChange: (view: string) => void;
  revenue: number;
  toDate: string;
}) {
  return (
    <Box>
      {/* Filters */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ alignItems: { sm: "center" }, flexWrap: "wrap", my: 1.5 }}
        useFlexGap
      >
        <TextField
          error={!dateRangeValid}
          label="From"
          onChange={(event) => onFromDateChange(event.target.value)}
          size="small"
          slotProps={{ htmlInput: { "aria-label": "Finance start date", max: toDate }, inputLabel: { shrink: true } }}
          type="date"
          value={fromDate}
        />
        <TextField
          error={!dateRangeValid}
          label="To"
          onChange={(event) => onToDateChange(event.target.value)}
          size="small"
          slotProps={{ htmlInput: { "aria-label": "Finance end date", min: fromDate }, inputLabel: { shrink: true } }}
          type="date"
          value={toDate}
        />
        <TextField
          label="Cost and profit centers"
          onChange={(event) => onCostCenterChange(event.target.value)}
          select
          size="small"
          slotProps={{ htmlInput: { "aria-label": "Finance cost center" } }}
          sx={{ minWidth: 180 }}
          value={costCenter}
        >
          {["All centers", "Sample operations", "Sample projects"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Chip label="Illustrative data" size="small" sx={{ bgcolor: brand.primary, color: brand.white }} />
      </Stack>

      {!dateRangeValid ? (
        <Alert role="alert" severity="warning" sx={{ mb: 1.5 }}>
          Choose a valid date range to view the sample dashboard.
        </Alert>
      ) : null}

      {/* Widgets */}
      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" } }}>
        <Card
          meta={
            <TextField
              onChange={(event) => onIntervalChange(event.target.value)}
              select
              size="small"
              slotProps={{ htmlInput: { "aria-label": "Chart interval" } }}
              sx={{ minWidth: 100 }}
              value={interval}
              variant="standard"
            >
              {["Daily", "Weekly", "Monthly"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          }
          span={2}
          title="Profit & Loss Trend"
        >
          <TrendChart
            axis={["500M", "250M", "0", "−250M", "−500M"]}
            label={`${interval} revenue, expense and profit trend, illustrative`}
            polylines={Object.entries(graphValues).map(([name, values]) => ({
              color: SERIES[name.toLowerCase() as keyof typeof SERIES] ?? brand.primary,
              points: values.map((value, index) => `${index * 34},${100 - value}`).join(" "),
            }))}
          />
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ color: brand.muted }} variant="caption">
              {fromDate}
            </Typography>
            <Typography sx={{ color: brand.muted }} variant="caption">
              {toDate}
            </Typography>
          </Stack>
          <ChartLegend
            items={[
              { color: SERIES.revenue, label: "Revenue" },
              { color: SERIES.expenses, label: "Expenses" },
              { color: SERIES.profit, label: "Profit" },
            ]}
          />
        </Card>

        <Card
          meta={
            <Typography sx={{ color: brand.muted }} variant="caption">
              Illustrative
            </Typography>
          }
          span={2}
          title="Balance Sheet Trend"
        >
          <TrendChart
            axis={["19.5B", "13B", "6.5B", "0", "−6.5B"]}
            label="Illustrative assets, liabilities and equity trend"
            polylines={[
              { color: SERIES.assets, points: "0,65 34,58 68,61 102,42 136,46 170,31 204,35 238,18" },
              { color: SERIES.liabilities, points: "0,79 34,73 68,76 102,66 136,68 170,59 204,62 238,50" },
              { color: SERIES.equity, points: "0,90 34,85 68,87 102,77 136,78 170,69 204,72 238,61" },
            ]}
          />
          <ChartLegend
            items={[
              { color: SERIES.assets, label: "Assets" },
              { color: SERIES.liabilities, label: "Liabilities" },
              { color: SERIES.equity, label: "Equity" },
            ]}
          />
        </Card>

        <DonutCard
          items={[
            { label: "Sales", value: formatCompact(revenue * 0.72) },
            { label: "Services", value: formatCompact(revenue * 0.19) },
            { label: "Other income", value: formatCompact(revenue * 0.09) },
          ]}
          label="Illustrative revenue mix"
          title="Revenue Composition"
          tone={SERIES.revenue}
        />
        <DonutCard
          items={[
            { label: "Staff costs", value: formatCompact(expenses * 0.46) },
            { label: "Operations", value: formatCompact(expenses * 0.34) },
            { label: "Other", value: formatCompact(expenses * 0.2) },
          ]}
          label="Illustrative operating expense mix"
          title="Operating Expenses"
          tone={SERIES.expenses}
        />

        <Card span={2} title="Inventory Value">
          <Typography component="strong" sx={{ display: "block", mb: 1 }} variant="h6">
            {formatCompact(248_500_000 * financeScale)}
          </Typography>
          <Stack
            aria-label="Illustrative inventory value trend"
            direction="row"
            spacing={0.5}
            sx={{ alignItems: "flex-end", height: 56 }}
          >
            {[45, 62, 54, 78, 70, 88, 76, 96].map((value, index) => (
              <Box
                key={index}
                sx={{ bgcolor: brand.primary, borderRadius: 0.5, flexGrow: 1, height: `${value}%` }}
              />
            ))}
          </Stack>
        </Card>

        <Card span={2} title="Low Stock Alerts">
          <Stack spacing={0.75}>
            {["Sample safety supplies", "Sample maintenance stock"].map((item) => (
              <Stack direction="row" key={item} sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2">{item}</Typography>
                <Chip label="Review" size="small" sx={{ bgcolor: brand.paper }} />
              </Stack>
            ))}
          </Stack>
          <Typography sx={{ color: brand.muted, display: "block", mt: 1 }} variant="caption">
            Stock thresholds are illustrative
          </Typography>
        </Card>

        <Card span={2} title="Purchases & GRNs">
          <Stack direction="row" spacing={1} sx={{ alignItems: "flex-end", height: 72 }}>
            {[
              [42, 42],
              [74, 74],
              [19, 16],
              [55, 48],
              [30, 30],
            ].map(([purchase, grn], index) => (
              <Stack direction="row" key={index} spacing={0.25} sx={{ alignItems: "flex-end", flexGrow: 1, height: "100%" }}>
                <Box sx={{ bgcolor: SERIES.purchases, borderRadius: 0.5, flexGrow: 1, height: `${purchase}%` }} />
                <Box sx={{ bgcolor: SERIES.grns, borderRadius: 0.5, flexGrow: 1, height: `${grn}%` }} />
              </Stack>
            ))}
          </Stack>
          <ChartLegend
            items={[
              { color: SERIES.purchases, label: "Purchases" },
              { color: SERIES.grns, label: "GRNs" },
            ]}
          />
        </Card>

        <Card span={2} title="Due Invoices">
          <Stack spacing={0.75}>
            {[
              ["Payables", "2", formatCompact(92_950_000 * financeScale)],
              ["Receivables", "4", formatCompact(139_000_000 * financeScale)],
            ].map(([label, count, amount]) => (
              <Stack direction="row" key={label} spacing={1} sx={{ justifyContent: "space-between" }}>
                <Typography variant="body2">
                  {label}{" "}
                  <Box component="b" sx={{ color: brand.muted }}>
                    {count}
                  </Box>
                </Typography>
                <Typography component="strong" variant="body2">
                  {amount}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Button
            onClick={() => onViewChange("Quick reports")}
            size="small"
            sx={{ mt: 1, textTransform: "none" }}
          >
            View A/P &amp; A/R aging →
          </Button>
        </Card>

        <Card span={2} title="Project Status">
          <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2">Illustrative infrastructure project</Typography>
            <Chip label="In progress" size="small" sx={{ bgcolor: brand.paper }} />
          </Stack>
          <LinearProgress sx={{ borderRadius: 3, height: 6 }} value={66} variant="determinate" />
          <Typography sx={{ color: brand.muted, display: "block", mt: 1 }} variant="caption">
            Execution 66% · Sample project center
          </Typography>
        </Card>

        <Card
          meta={
            <Typography sx={{ color: brand.muted }} variant="caption">
              Sample data
            </Typography>
          }
          span={1}
          title="Top Products"
        >
          <Stack spacing={0.5}>
            {[
              ["Sample product A", "TZS 18.4M"],
              ["Sample product B", "TZS 12.7M"],
              ["Sample product C", "TZS 8.2M"],
            ].map(([name, value]) => (
              <Stack direction="row" key={name} sx={{ justifyContent: "space-between" }}>
                <Typography variant="caption">{name}</Typography>
                <Typography component="b" variant="caption">
                  {value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Card>

        <Card span={1} title="Quick Links">
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }} useFlexGap>
            {["Projects", "Sales", "Purchases", "Transactions", "Ledgers", "Stores"].map((link) => (
              <Chip
                clickable
                key={link}
                label={link}
                onClick={() =>
                  onViewChange(link === "Ledgers" || link === "Transactions" ? link : "Quick reports")
                }
                size="small"
                sx={{ bgcolor: brand.paper }}
              />
            ))}
          </Stack>
        </Card>
      </Box>

      {/* Quick reports */}
      <Paper
        aria-label="Quick financial reports"
        component="section"
        elevation={0}
        sx={{ border: `1px solid ${brand.line}`, borderRadius: 2, mt: 1.5, p: 1.5 }}
        variant="outlined"
      >
        <Typography component="strong" sx={{ display: "block", fontWeight: 700, mb: 1 }} variant="body2">
          Quick Reports
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap" }} useFlexGap>
          {[
            "Sales & Cash Summary",
            "Sales Manifest",
            "Sales Performance",
            "Cashier Report",
            "Stock Report",
            "Item Movement",
            "Stock Movement",
            "Debtors & Creditors",
            "A/P & A/R Aging",
            "Payroll Components Summary",
            "Leave Balances",
            "Staff Loans",
            "Project Status Report",
          ].map((report) => (
            <Chip
              clickable
              key={report}
              label={report}
              onClick={() => onQuickReport(report)}
              size="small"
              sx={{ bgcolor: brand.paper }}
            />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
