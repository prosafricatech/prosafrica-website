"use client";

import Link from "next/link";
import Image from "next/image";
import CallMadeIcon from "@mui/icons-material/CallMade";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState } from "react";
import {
  RecordDetail,
  ScreenCaption,
  ScreenCell,
  ScreenFilters,
  ScreenGroupRow,
  ScreenHeading,
  ScreenMetrics,
  ScreenRow,
  ScreenSelect,
  ScreenStaticRow,
  ScreenTable,
  ScreenTabs,
  ScreenToggleGroup,
  StatusBadge,
  StatusChip,
  toneForStatus,
} from "./erp-screen";
import { FinanceDashboard } from "./finance-dashboard";
import { DemoRequestForm } from "./demo-request-form";
import { HeroDashboardMock } from "./hero-dashboard-mock";
import {
  CardGrid,
  CtaBar,
  Eyebrow,
  NumberedCard,
  PrimaryAction,
  SectionHeading,
  TextLink,
} from "./marketing";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { brand } from "./theme";

const tourContent = {
  projects: {
    label: "Projects",
    eyebrow: "Project control",
    title: "See where the plan and the site disagree.",
    description:
      "ProsERP holds work done, time spent and money committed against each other on one project, so a slip shows up as a number rather than a surprise.",
    steps: [
      {
        title: "Weight the plan",
        text: "Every task carries a weight, so progress on a small item cannot flatter the whole project.",
        metric: "100%",
        metricLabel: "Weights reconcile",
        tag: "Work breakdown",
      },
      {
        title: "Measure work against time",
        text: "Execution sits beside time elapsed on the same bar. When the calendar runs ahead of the work, the task says so.",
        metric: "45 / 50",
        metricLabel: "Execution vs elapsed",
        tag: "Schedule variance",
      },
      {
        title: "Catch spending nobody planned",
        text: "Budget lines show committed and spent separately, flag overspend, and surface costs booked against no budget at all.",
        metric: "119%",
        metricLabel: "Overspent line",
        tag: "Cost variance",
      },
      {
        title: "Gate payment on approval",
        text: "Subcontractor certificates carry their approval state, so nothing is paid before the person who must sign it has.",
        metric: "4",
        metricLabel: "Awaiting approval",
        tag: "Claims & certificates",
      },
    ],
  },
  fuel: {
    label: "Fuel stations",
    eyebrow: "Fuel operations",
    title: "See the story behind every shift.",
    description:
      "Bring station shifts, tank readings, fuel movement and reporting into one operational picture.",
    steps: [
      {
        title: "Review station activity",
        text: "Choose a station and get a clear view of its operational activity.",
        metric: "07",
        metricLabel: "Sample stations",
        tag: "Multi-station view",
      },
      {
        title: "Follow sales shifts",
        text: "Review shift dates, teams and status across each selected station.",
        metric: "24",
        metricLabel: "Sample shifts",
        tag: "Shift management",
      },
      {
        title: "Compare tank readings",
        text: "Bring dippings, deliveries and stock context together for review.",
        metric: "AGO",
        metricLabel: "Fuel types",
        tag: "Dippings & stock",
      },
      {
        title: "Understand variances",
        text: "Use station reports to review movement and keep operations visible.",
        metric: "Live",
        metricLabel: "Operational view",
        tag: "Reports & oversight",
      },
    ],
  },
  manufacturing: {
    label: "Manufacturing",
    eyebrow: "Production control",
    title: "Connect the recipe to the result.",
    description:
      "Link bills of materials, work centers, production batches and output or cost reporting.",
    steps: [
      {
        title: "Define the product",
        text: "Set up a bill of materials to describe the inputs behind a finished product.",
        metric: "BOM",
        metricLabel: "Product recipe",
        tag: "Bill of materials",
      },
      {
        title: "Plan the work center",
        text: "Keep production activity organized around its work center.",
        metric: "01",
        metricLabel: "Work center view",
        tag: "Work centers",
      },
      {
        title: "Follow production batches",
        text: "Review batches by date, work center and status as production progresses.",
        metric: "Batch",
        metricLabel: "Production record",
        tag: "Production tracking",
      },
      {
        title: "Review output and cost",
        text: "Use production reporting to understand output and cost over a selected period.",
        metric: "2",
        metricLabel: "Report views",
        tag: "Output & cost reports",
      },
    ],
  },
  "process-approval": {
    label: "Process approval",
    eyebrow: "Request review",
    title: "Know what is waiting, and who is next.",
    description:
      "Review requisitions by type and cost center, see the approval role shown on each request, and follow its status.",
    steps: [
      {
        title: "Review requisitions",
        text: "Browse business requests such as Purchase, Payment and Imprest in one list.",
        metric: "03",
        metricLabel: "Example request types",
        tag: "Purchase · Payment · Imprest",
      },
      {
        title: "See the approval role",
        text: "Identify whether a requisition is waiting for an Administrator, General Manager or another approver.",
        metric: "GM",
        metricLabel: "Example approval role",
        tag: "Approval ownership",
      },
      {
        title: "Filter the queue",
        text: "Narrow requisitions by type, cost center or the requests you submitted.",
        metric: "Filter",
        metricLabel: "Type · cost center · my requests",
        tag: "Queue visibility",
      },
      {
        title: "Track the outcome",
        text: "Follow request status, including approval and completion, without losing its business context.",
        metric: "Status",
        metricLabel: "Review progress",
        tag: "Status tracking",
      },
    ],
  },
  finance: {
    label: "Finance",
    eyebrow: "Financial management",
    title: "See financial performance and position together.",
    description:
      "Review profit and loss, balance sheet trends, transactions, ledgers and reports alongside the operational activity they describe.",
    steps: [
      {
        title: "Track income and costs",
        text: "Compare revenue, expenses and profit over a selected period and cost center.",
        metric: "P&L",
        metricLabel: "Revenue · expenses · profit",
        tag: "Profit & loss trend",
      },
      {
        title: "Review financial position",
        text: "See assets, liabilities and equity together, with receivables and payables in context.",
        metric: "Position",
        metricLabel: "Assets · liabilities · equity",
        tag: "Balance sheet",
      },
      {
        title: "Follow the underlying records",
        text: "Move from transactions and ledgers to cash, sales and debtor or creditor reports.",
        metric: "Reports",
        metricLabel: "Transactions · ledgers · reports",
        tag: "Financial detail",
      },
    ],
  },
  procurement: {
    label: "Procurement",
    eyebrow: "Purchasing workflow",
    title: "Follow purchases from order to receiving.",
    description:
      "Connect purchase orders to partial goods receipts, store consumption and purchasing reports.",
    steps: [
      {
        title: "Review purchase orders",
        text: "Follow supplier, cost center, order status and receiving progress together.",
        metric: "Orders",
        metricLabel: "Purchasing records",
        tag: "Purchase orders",
      },
      {
        title: "Receive into a store",
        text: "Track goods receipts against the order, including partial quantities and remaining items.",
        metric: "GRN",
        metricLabel: "Goods received",
        tag: "Partial receiving",
      },
      {
        title: "Connect stock to its use",
        text: "Follow store consumption and purchasing reports after goods are received.",
        metric: "Store",
        metricLabel: "Stock and use",
        tag: "Consumption & reports",
      },
    ],
  },
  inventory: {
    label: "Inventory",
    eyebrow: "Inventory & stores",
    title: "Follow stock through every store movement.",
    description:
      "Review stock balances alongside goods receipts, transfers, consumption, adjustments and reports.",
    steps: [
      {
        title: "Review stock by store",
        text: "See available quantities, value and product movement for a selected store.",
        metric: "Stores",
        metricLabel: "Inventory locations",
        tag: "Stock & movement",
      },
      {
        title: "Follow receipts and transfers",
        text: "Connect purchase receipts and inter-store transfers to the stock they move.",
        metric: "Transfers",
        metricLabel: "Stock movement",
        tag: "GRNs & transfers",
      },
      {
        title: "Review consumption and adjustments",
        text: "See stock issues and approved reconciliations in their operational context.",
        metric: "Usage",
        metricLabel: "Operational context",
        tag: "Consumption & control",
      },
    ],
  },
  "human-resources": {
    label: "Human resources",
    eyebrow: "People operations",
    title: "Follow employee requests and payroll review.",
    description:
      "Explore the HR request and payroll approval views available in ProsERP.",
    steps: [
      {
        title: "Review leave requests",
        text: "Search leave requests and check the role shown for review.",
        metric: "Leave",
        metricLabel: "Employee request",
        tag: "Leave requests",
      },
      {
        title: "Follow employee loans",
        text: "Review requested amounts, installments, dates and request status.",
        metric: "Loans",
        metricLabel: "Request overview",
        tag: "Loan requests",
      },
      {
        title: "Check payroll periods",
        text: "Browse payroll runs by period and review their displayed status.",
        metric: "Payroll",
        metricLabel: "Period overview",
        tag: "Payroll approvals",
      },
    ],
  },
  "asset-register": {
    label: "Asset Register",
    eyebrow: "Asset management",
    title: "Keep asset records connected to their location and status.",
    description:
      "Explore how asset details, categories, store or cost-center context and status can be reviewed together.",
    steps: [
      {
        title: "Browse the register",
        text: "Review assets with their identifier, category, assigned location and current status.",
        metric: "Register",
        metricLabel: "Asset records",
        tag: "Asset overview",
      },
      {
        title: "Filter the asset list",
        text: "Narrow the view by category, store or status to find the records you need.",
        metric: "Filter",
        metricLabel: "Category · store · status",
        tag: "Register filters",
      },
      {
        title: "Review asset value",
        text: "See net book value and record status in the context of each asset.",
        metric: "Value",
        metricLabel: "Net book value",
        tag: "Asset valuation",
      },
    ],
  },
  sales: {
    label: "Sales & POS",
    eyebrow: "Sales operations",
    title: "Follow a sale from counter to collection.",
    description:
      "See how instant sales settle at checkout while order sales continue through dispatch, receipts and invoicing.",
    steps: [
      {
        title: "Organize sales counters",
        text: "Choose an outlet and counter, then review the sale and its line items.",
        metric: "Outlets",
        metricLabel: "Sales locations",
        tag: "Outlets & counters",
      },
      {
        title: "Fulfil order sales",
        text: "Track dispatches and receipts separately when an order is not completed at checkout.",
        metric: "Orders",
        metricLabel: "Dispatch & receipts",
        tag: "Sales lifecycle",
      },
      {
        title: "Review invoices and reports",
        text: "Keep invoicing and counter-level sales reporting connected to the transaction.",
        metric: "Reports",
        metricLabel: "Sales overview",
        tag: "Invoices & reporting",
      },
    ],
  },
  reporting: {
    label: "Reporting",
    eyebrow: "Operational insight",
    title: "Bring reports closer to the work they describe.",
    description:
      "Explore operational and financial reporting across connected business activities.",
    steps: [
      {
        title: "Review operational activity",
        text: "Use operational views to follow activity across business areas.",
        metric: "Activity",
        metricLabel: "Operational view",
        tag: "Operations",
      },
      {
        title: "Explore financial reports",
        text: "Review financial information alongside related business records.",
        metric: "Finance",
        metricLabel: "Financial view",
        tag: "Financial reporting",
      },
      {
        title: "Connect the picture",
        text: "Bring reports and day-to-day work into a clearer business overview.",
        metric: "Overview",
        metricLabel: "Connected activity",
        tag: "Business insight",
      },
    ],
  },
} as const;

type TourKey = keyof typeof tourContent;

type ProjectPreviewTask = {
  id: string;
  code: string;
  title: string;
  level: 0 | 1;
  parentId?: string;
  startWeek: number;
  endWeek: number;
  /** Execution %, what the real WBS calls "Execution". */
  progress: number;
  /** Share of the schedule consumed, shown against execution on the same bar. */
  timeElapsed: number;
  /** Contribution to the parent's completion, as the real WBS weights tasks. */
  weight: number;
  status: "Complete" | "In progress" | "Planned";
  dependency?: string;
};

const projectPreviewTasks: ProjectPreviewTask[] = [
  { id: "preparation", code: "1", title: "Project preparation", level: 0, startWeek: 1, endWeek: 3, progress: 100, timeElapsed: 100, weight: 20, status: "Complete" },
  { id: "survey", code: "1.1", title: "Site survey", level: 1, parentId: "preparation", startWeek: 1, endWeek: 2, progress: 100, timeElapsed: 100, weight: 8, status: "Complete" },
  { id: "mobilization", code: "1.2", title: "Mobilization", level: 1, parentId: "preparation", startWeek: 2, endWeek: 3, progress: 65, timeElapsed: 72, weight: 7, status: "In progress", dependency: "Site survey" },
  { id: "resources", code: "1.3", title: "Resource planning", level: 1, parentId: "preparation", startWeek: 2, endWeek: 4, progress: 40, timeElapsed: 58, weight: 5, status: "In progress", dependency: "Site survey" },
  { id: "delivery", code: "2", title: "Project delivery", level: 0, startWeek: 3, endWeek: 7, progress: 38, timeElapsed: 46, weight: 65, status: "In progress" },
  { id: "foundations", code: "2.1", title: "Foundation works", level: 1, parentId: "delivery", startWeek: 3, endWeek: 5, progress: 55, timeElapsed: 60, weight: 25, status: "In progress", dependency: "Mobilization" },
  { id: "materials", code: "2.2", title: "Materials & stores", level: 1, parentId: "delivery", startWeek: 3, endWeek: 6, progress: 32, timeElapsed: 48, weight: 20, status: "In progress", dependency: "Mobilization" },
  { id: "structure", code: "2.3", title: "Structural works", level: 1, parentId: "delivery", startWeek: 5, endWeek: 7, progress: 0, timeElapsed: 5, weight: 20, status: "Planned", dependency: "Foundation works" },
  { id: "closeout", code: "3", title: "Closeout", level: 0, startWeek: 7, endWeek: 8, progress: 0, timeElapsed: 0, weight: 15, status: "Planned" },
  { id: "inspection", code: "3.1", title: "Inspection & handover", level: 1, parentId: "closeout", startWeek: 7, endWeek: 8, progress: 0, timeElapsed: 0, weight: 15, status: "Planned", dependency: "Structural works" },
];

// Project totals, rolled up from the level-0 groups by weight so the headline
// figures cannot drift away from the rows beneath them.
const projectRollUp = (field: "progress" | "timeElapsed") => {
  const groups = projectPreviewTasks.filter((task) => task.level === 0);
  const weight = groups.reduce((total, task) => total + task.weight, 0);
  return Math.round(
    groups.reduce((total, task) => total + task[field] * task.weight, 0) / weight,
  );
};

const projectExecution = projectRollUp("progress");
const projectTimeElapsed = projectRollUp("timeElapsed");

type ProjectPreviewTab = "wbs" | "tasks-tree" | "gantt" | "budgets";
type PayrollDisplay = "detailed" | "merged" | "hidden";
type BudgetLine = {
  id: string;
  name: string;
  budgeted: number;
  committed: number;
  spent: number;
};

const projectBudgetLines: BudgetLine[] = [
  { id: "site", name: "Site preparation", budgeted: 92000000, committed: 16000000, spent: 12500000 },
  { id: "materials", name: "Materials & stores", budgeted: 245000000, committed: 68000000, spent: 41200000 },
  { id: "labour", name: "Labour", budgeted: 176000000, committed: 52000000, spent: 39400000 },
  { id: "equipment", name: "Equipment & transport", budgeted: 122000000, committed: 31000000, spent: 18400000 },
  // The two cases the real budget screen exists to surface: a line spent past
  // its budget, and spending on a line nobody budgeted for at all.
  { id: "maintenance", name: "Maintenance", budgeted: 24000000, committed: 0, spent: 28600000 },
  { id: "transport-adhoc", name: "Ad-hoc transport", budgeted: 0, committed: 0, spent: 9100000 },
];

// Taken from the FAQ section of the live site at proserp.co.tz. The live copy
// writes "ProERP" in the multi-branch answer; that typo is corrected here.
const faqs = [
  {
    question: "How long does it take to set up?",
    answer:
      "Most clients are live within 2–4 weeks. We handle configuration, data migration, and user training as part of onboarding.",
  },
  {
    question: "Can I run multiple branches under one system?",
    answer:
      "Yes. ProsERP supports multi-branch operations with separate inventory, sales, and reporting per outlet under a single account.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Your data is hosted on AWS infrastructure with automated backups, role-based access controls, and encrypted connections.",
  },
  {
    question: "What does pricing look like?",
    answer:
      "Pricing is module-based and scales with your business size. Contact us for a quote tailored to your operations.",
  },
] as const;

const assetRegisterRecords = [
  { id: "asset-01", number: "SAMPLE-001", name: "Operations vehicle", category: "Vehicles", location: "Main store", value: 82500000, status: "Active" },
  { id: "asset-02", number: "SAMPLE-002", name: "Office equipment", category: "Equipment", location: "Central office", value: 12400000, status: "Active" },
  { id: "asset-03", number: "SAMPLE-003", name: "Power generator", category: "Equipment", location: "Project store", value: 28750000, status: "In service" },
  { id: "asset-04", number: "SAMPLE-004", name: "Storage facility", category: "Property", location: "Operations site", value: 116000000, status: "Active" },
  { id: "asset-05", number: "SAMPLE-005", name: "Utility vehicle", category: "Vehicles", location: "Regional store", value: 64300000, status: "Under review" },
];

const payrollSampleRows = [
  { id: "employee-01", employee: "Sample employee 01", department: "Operations", costCenter: "Sample operations", basic: 1250000, allowance: 180000, deductions: 96000, net: 1334000, status: "Ready" },
  { id: "employee-02", employee: "Sample employee 02", department: "Finance", costCenter: "Sample finance", basic: 980000, allowance: 120000, deductions: 73500, net: 1026500, status: "In review" },
  { id: "employee-03", employee: "Sample employee 03", department: "Projects", costCenter: "Sample projects", basic: 1540000, allowance: 220000, deductions: 118000, net: 1642000, status: "Ready" },
];

function formatSampleTzs(value: number) {
  return `TZS ${new Intl.NumberFormat("en-TZ", { maximumFractionDigits: 0 }).format(value)}`;
}

function ProjectBudgetPreview() {
  const [selectedLineId, setSelectedLineId] = useState(projectBudgetLines[0].id);
  const selectedLine = projectBudgetLines.find((line) => line.id === selectedLineId) ?? projectBudgetLines[0];
  const totals = projectBudgetLines.reduce(
    (summary, line) => ({
      budgeted: summary.budgeted + line.budgeted,
      committed: summary.committed + line.committed,
      spent: summary.spent + line.spent,
    }),
    { budgeted: 0, committed: 0, spent: 0 },
  );

  return (
    <Box>
      <ScreenMetrics
        items={[
          { label: "Total budgeted", value: formatSampleTzs(totals.budgeted) },
          { label: "Total committed", value: formatSampleTzs(totals.committed) },
          { label: "Total spent", value: formatSampleTzs(totals.spent) },
          {
            label: "Available",
            // Budget less what is already committed AND what is already spent.
            // Committing beyond the budget drives this negative, which is the
            // state the real screen puts in red.
            value: (() => {
              const available = totals.budgeted - totals.committed - totals.spent;
              return (
                <Typography
                  component="span"
                  sx={{ color: available < 0 ? brand.error : brand.ink, fontWeight: 700 }}
                  variant="body2"
                >
                  {formatSampleTzs(available)}
                </Typography>
              );
            })(),
          },
        ]}
      />
      <ScreenTable
        ariaLabel="Illustrative project budget"
        columns={["Cost category", "Budgeted", "Committed", "Spent", "% spent"]}
      >
        {projectBudgetLines.map((line) => (
          <ScreenRow
            ariaPressed={selectedLineId === line.id}
            key={line.id}
            onSelect={() => setSelectedLineId(line.id)}
            selected={selectedLineId === line.id}
          >
            <ScreenCell>{line.name}</ScreenCell>
            <ScreenCell align="right">{formatSampleTzs(line.budgeted)}</ScreenCell>
            <ScreenCell align="right">{formatSampleTzs(line.committed)}</ScreenCell>
            <ScreenCell align="right">{formatSampleTzs(line.spent)}</ScreenCell>
            {/*
              A line with no budget has no percentage to show — dividing by it
              would read "Infinity%". It is flagged instead, which is the point:
              money went somewhere nobody planned for.
            */}
            <ScreenCell align="right">
              {line.budgeted === 0 ? (
                <StatusChip tone="review">Unbudgeted</StatusChip>
              ) : (
                <Typography
                  component="span"
                  sx={{
                    color: line.spent > line.budgeted ? brand.error : brand.ink,
                    fontWeight: line.spent > line.budgeted ? 700 : 400,
                  }}
                  variant="body2"
                >
                  {Math.round((line.spent / line.budgeted) * 100)}%
                </Typography>
              )}
            </ScreenCell>
          </ScreenRow>
        ))}
      </ScreenTable>
      <RecordDetail>
        <Typography component="strong" sx={{ fontWeight: 700 }} variant="body2">{selectedLine.name}</Typography>
        <OpsFact label="Budget" value={formatSampleTzs(selectedLine.budgeted)} />
        <OpsFact label="Committed" value={formatSampleTzs(selectedLine.committed)} />
        <OpsFact label="Spent" value={formatSampleTzs(selectedLine.spent)} />
      </RecordDetail>
    </Box>
  );
}

function AssetRegisterPreview() {
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [locationFilter, setLocationFilter] = useState("All locations");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [selectedAssetId, setSelectedAssetId] = useState(assetRegisterRecords[0].id);
  const assets = assetRegisterRecords.filter(
    (asset) =>
      (categoryFilter === "All categories" || asset.category === categoryFilter) &&
      (locationFilter === "All locations" || asset.location === locationFilter) &&
      (statusFilter === "All statuses" || asset.status === statusFilter),
  );
  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId) ?? assets[0] ?? null;

  return (
    <Box>
      <ScreenHeading
        chip={`${assets.length} records`}
        contextLabel="ASSET REGISTER"
        title="Illustrative asset records"
      />
      <ScreenFilters>
        <ScreenSelect
          ariaLabel="Filter assets by category"
          label="Category"
          onChange={setCategoryFilter}
          options={["All categories", "Vehicles", "Equipment", "Property"]}
          value={categoryFilter}
        />
        <ScreenSelect
          ariaLabel="Filter assets by location"
          label="Store / location"
          onChange={setLocationFilter}
          options={["All locations", "Main store", "Central office", "Project store", "Operations site", "Regional store"]}
          value={locationFilter}
        />
        <ScreenSelect
          ariaLabel="Filter assets by status"
          label="Status"
          onChange={setStatusFilter}
          options={["All statuses", "Active", "In service", "Under review"]}
          value={statusFilter}
        />
      </ScreenFilters>
      <ScreenTable
        ariaLabel="Illustrative asset register records"
        columns={["Asset", "Category / location", "Net book value", "Status"]}
      >
        {assets.map((asset) => (
          <ScreenRow
            ariaPressed={selectedAssetId === asset.id}
            key={asset.id}
            onSelect={() => setSelectedAssetId(asset.id)}
            selected={selectedAsset?.id === asset.id}
          >
            <ScreenCell primary={asset.number} secondary={asset.name} />
            <ScreenCell primary={asset.category} secondary={asset.location} />
            <ScreenCell align="right">{formatSampleTzs(asset.value)}</ScreenCell>
            <StatusBadge tone={toneForStatus(asset.status)}>{asset.status}</StatusBadge>
          </ScreenRow>
        ))}
      </ScreenTable>
      {selectedAsset ? (
        <RecordDetail>
          <Typography sx={{ color: brand.muted }} variant="caption">Selected asset</Typography>
          <Typography component="strong" sx={{ fontWeight: 700 }} variant="body2">{selectedAsset.name}</Typography>
          <Typography sx={{ color: brand.muted }} variant="caption">{selectedAsset.number} · {selectedAsset.location}</Typography>
          <Typography component="b" sx={{ fontWeight: 700 }} variant="body2">{formatSampleTzs(selectedAsset.value)}</Typography>
        </RecordDetail>
      ) : (
        <Typography sx={{ color: brand.muted, display: "block", mt: 1.5 }} variant="body2">
          No sample assets match these filters.
        </Typography>
      )}
    </Box>
  );
}

function PayrollPreview() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(payrollSampleRows[0].id);
  const [display, setDisplay] = useState<PayrollDisplay>("detailed");
  const [groupBy, setGroupBy] = useState("Employee");
  const [period, setPeriod] = useState("Sample period 1");
  const periodMultiplier = period === "Sample period 1" ? 1 : 0.96;
  const rows = payrollSampleRows.map((row) => ({
    ...row,
    basic: Math.round(row.basic * periodMultiplier),
    allowance: Math.round(row.allowance * periodMultiplier),
    deductions: Math.round(row.deductions * periodMultiplier),
    net: Math.round(row.net * periodMultiplier),
  }));
  const selectedEmployee = rows.find((row) => row.id === selectedEmployeeId) ?? rows[0];
  const totals = rows.reduce(
    (summary, row) => ({
      gross: summary.gross + row.basic + row.allowance,
      deductions: summary.deductions + row.deductions,
      net: summary.net + row.net,
    }),
    { gross: 0, deductions: 0, net: 0 },
  );
  const payrollGroups =
    groupBy === "Employee"
      ? [{ label: "Sample employees", rows }]
      : Array.from(new Set(rows.map((row) => groupBy === "Department" ? row.department : row.costCenter))).map((label) => ({
          label,
          rows: rows.filter((row) => (groupBy === "Department" ? row.department : row.costCenter) === label),
        }));

  return (
    <Box>
      <ScreenHeading
        chip="For review"
        contextLabel="PAYROLL RUNS"
        title="Illustrative payroll review"
      />
      <ScreenFilters>
        <ScreenSelect
          ariaLabel="Select sample payroll period"
          label="Pay period"
          onChange={setPeriod}
          options={["Sample period 1", "Sample period 2"]}
          value={period}
        />
        <ScreenSelect
          ariaLabel="Group payroll by"
          label="Group by"
          onChange={setGroupBy}
          options={["Employee", "Department", "Cost center"]}
          value={groupBy}
        />
        <ScreenToggleGroup<PayrollDisplay>
          active={display}
          ariaLabel="Payroll display mode"
          onChange={setDisplay}
          options={["detailed", "merged", "hidden"]}
        />
      </ScreenFilters>
      <ScreenMetrics
        items={[
          { label: "Gross pay", value: formatSampleTzs(totals.gross) },
          { label: "Deductions", value: formatSampleTzs(totals.deductions) },
          { label: "Net payable", value: formatSampleTzs(totals.net) },
        ]}
      />
      <Typography sx={{ color: brand.muted, display: "block", mb: 1 }} variant="caption">
        {period} · All figures are illustrative
      </Typography>
      <ScreenTable
        ariaLabel="Illustrative payroll rows"
        columns={[
          "Employee",
          display !== "hidden" ? (display === "merged" ? "Total earnings" : "Basic / allowances") : null,
          "Net payable",
          "Status",
        ]}
      >
        {payrollGroups.map((group) => (
          <Fragment key={group.label}>
            {groupBy !== "Employee" ? (
              <ScreenGroupRow colSpan={display === "hidden" ? 3 : 4}>{group.label}</ScreenGroupRow>
            ) : null}
            {group.rows.map((row) => (
              <ScreenRow
                ariaPressed={selectedEmployeeId === row.id}
                key={row.id}
                onSelect={() => setSelectedEmployeeId(row.id)}
                selected={selectedEmployeeId === row.id}
              >
                <ScreenCell primary={row.employee} secondary={row.department} />
                {display !== "hidden" ? (
                  <ScreenCell align="right">
                    {display === "merged"
                      ? formatSampleTzs(row.basic + row.allowance)
                      : `${formatSampleTzs(row.basic)} / ${formatSampleTzs(row.allowance)}`}
                  </ScreenCell>
                ) : null}
                <ScreenCell align="right">{formatSampleTzs(row.net)}</ScreenCell>
                <StatusBadge tone={toneForStatus(row.status)}>{row.status}</StatusBadge>
              </ScreenRow>
            ))}
          </Fragment>
        ))}
      </ScreenTable>
      <RecordDetail>
        <Typography sx={{ color: brand.muted }} variant="caption">Selected employee</Typography>
        <Typography component="strong" sx={{ fontWeight: 700 }} variant="body2">{selectedEmployee.employee}</Typography>
        <Typography sx={{ color: brand.muted }} variant="caption">
          Basic {formatSampleTzs(selectedEmployee.basic)} · Allowances {formatSampleTzs(selectedEmployee.allowance)} · Deductions {formatSampleTzs(selectedEmployee.deductions)}
        </Typography>
      </RecordDetail>
    </Box>
  );
}

type FinanceView = "Dashboard" | "Transactions" | "Ledgers" | "Quick reports";

const financeTransactions = [
  { id: "TRX-SAMPLE-041", date: "24 Oct", narration: "Sample customer receipt", costCenter: "Sample operations", ledger: "Main bank", amount: 18_450_000, direction: "Inflow", category: "Receivable" },
  { id: "TRX-SAMPLE-040", date: "23 Oct", narration: "Illustrative supplier payment", costCenter: "Sample projects", ledger: "Main bank", amount: 12_800_000, direction: "Outflow", category: "Payable" },
  { id: "TRX-SAMPLE-038", date: "21 Oct", narration: "Sample operating costs", costCenter: "Sample operations", ledger: "Operating expenses", amount: 4_260_000, direction: "Outflow", category: "Expense" },
];

const financeLedgerRows = [
  { name: "Main bank", group: "Cash & bank", opening: 68_400_000, debit: 84_250_000, credit: 66_300_000, closing: 86_350_000 },
  { name: "Trade receivables", group: "Current assets", opening: 124_800_000, debit: 42_600_000, credit: 28_400_000, closing: 139_000_000 },
  { name: "Trade payables", group: "Current liabilities", opening: 76_200_000, debit: 19_750_000, credit: 36_500_000, closing: 92_950_000 },
  { name: "Operating expenses", group: "Expenses", opening: 0, debit: 31_800_000, credit: 1_250_000, closing: 30_550_000 },
];

const financeReports = [
  { name: "Income Statement", detail: "Revenue, expenses and profit for the selected period.", amount: "TZS 141.4M" },
  { name: "Balance Sheet", detail: "Assets, liabilities and equity at the selected date.", amount: "TZS 684.2M" },
  { name: "Sales & Cash Summary", detail: "Revenue, receipts by ledger and credit sales.", amount: "TZS 482.6M" },
  { name: "Cashier Report", detail: "Opening balance, ledger movements and closing balance.", amount: "TZS 86.4M" },
  { name: "Debtors & Creditors", detail: "Outstanding customer and supplier balances.", amount: "TZS 231.9M" },
  { name: "A/P & A/R Aging", detail: "Payables and receivables grouped by age.", amount: "4 periods" },
  { name: "Payroll Components Summary", detail: "Payroll components summarized for a selected period.", amount: "TZS 38.6M" },
  { name: "Leave Balances", detail: "Employee leave balances available to authorized users.", amount: "214 days" },
  { name: "Staff Loans", detail: "Loan balances and repayment overview.", amount: "TZS 22.5M" },
  { name: "Project Status Report", detail: "Project progress and status for selected project centers.", amount: "6 projects" },
];

function formatCompactSampleTzs(value: number) {
  return `TZS ${new Intl.NumberFormat("en-TZ", { notation: "compact", maximumFractionDigits: 1 }).format(value)}`;
}

function FinancePreview() {
  const [activeView, setActiveView] = useState<FinanceView>("Dashboard");
  const [fromDate, setFromDate] = useState("2026-10-01");
  const [toDate, setToDate] = useState("2026-10-26");
  const [interval, setInterval] = useState("Daily");
  const [costCenter, setCostCenter] = useState("All centers");
  const [selectedTransactionId, setSelectedTransactionId] = useState(financeTransactions[0].id);
  const [selectedLedgerName, setSelectedLedgerName] = useState(financeLedgerRows[0].name);
  const [selectedReportName, setSelectedReportName] = useState(financeReports[0].name);
  const selectedTransaction = financeTransactions.find((row) => row.id === selectedTransactionId) ?? financeTransactions[0];
  const selectedLedger = financeLedgerRows.find((row) => row.name === selectedLedgerName) ?? financeLedgerRows[0];
  const selectedReport = financeReports.find((report) => report.name === selectedReportName) ?? financeReports[0];
  const dateSpanDays = (new Date(`${toDate}T00:00:00`).getTime() - new Date(`${fromDate}T00:00:00`).getTime()) / 86_400_000 + 1;
  const dateRangeValid = Number.isFinite(dateSpanDays) && dateSpanDays > 0;
  const dateScale = dateRangeValid ? Math.min(1.5, Math.max(0.05, dateSpanDays / 26)) : 0;
  const centerScale = costCenter === "Sample projects" ? 0.38 : costCenter === "Sample operations" ? 0.62 : 1;
  const financeScale = dateScale * centerScale;
  const revenue = Math.round(482_600_000 * financeScale);
  const expenses = Math.round(341_200_000 * financeScale);
  const graphValues = {
    Revenue: [25, 41, 32, 58, 45, 72, 66, 88],
    Expenses: [72, 62, 70, 49, 58, 40, 48, 34],
    Profit: [88, 80, 83, 70, 73, 58, 61, 46],
  };

  return (
    <Box>
      <ScreenHeading
        chip="Illustrative data"
        contextLabel="FINANCIAL OVERVIEW"
        title="Illustrative finance workspace"
      />
      <ScreenTabs<FinanceView>
        active={activeView}
        ariaLabel="Finance preview views"
        onChange={setActiveView}
        tabs={["Dashboard", "Transactions", "Ledgers", "Quick reports"]}
      />
      {activeView === "Dashboard" ? (
        <FinanceDashboard
          costCenter={costCenter}
          dateRangeValid={dateRangeValid}
          expenses={expenses}
          financeScale={financeScale}
          formatCompact={formatCompactSampleTzs}
          fromDate={fromDate}
          graphValues={graphValues}
          interval={interval}
          onCostCenterChange={setCostCenter}
          onFromDateChange={setFromDate}
          onIntervalChange={setInterval}
          onQuickReport={(report) => {
            setSelectedReportName(
              financeReports.some((item) => item.name === report) ? report : "Debtors & Creditors",
            );
            setActiveView("Quick reports");
          }}
          onToDateChange={setToDate}
          onViewChange={(view) => setActiveView(view as FinanceView)}
          revenue={revenue}
          toDate={toDate}
        />
      ) : activeView === "Transactions" ? (
        <Box>
          <ScreenCaption
            left="Illustrative transaction register"
            right={<>{fromDate} – {toDate}</>}
          />
          <ScreenTable
            columns={["Date / reference", "Narration / center", "Ledger", "Amount"]}
          >
            {financeTransactions.map((row) => (
              <ScreenRow
                ariaPressed={selectedTransactionId === row.id}
                selected={selectedTransactionId === row.id}
                key={row.id}
                onSelect={() => setSelectedTransactionId(row.id)}
              >
                <ScreenCell primary={row.date} secondary={row.id} />
                <ScreenCell primary={row.narration} secondary={row.costCenter} />
                <ScreenCell>{row.ledger}</ScreenCell>
                <ScreenCell align="right">
                  <Typography
                    component="strong"
                    sx={{ color: row.direction === "Inflow" ? brand.success : brand.ink, fontWeight: 700 }}
                    variant="body2"
                  >
                    {row.direction === "Inflow" ? "+" : "−"}{formatCompactSampleTzs(row.amount)}
                  </Typography>
                </ScreenCell>
              </ScreenRow>
            ))}
          </ScreenTable>
          <RecordDetail>
            <Typography component="strong" variant="body2">{selectedTransaction.id}</Typography>
            <Typography sx={{ color: brand.muted }} variant="caption">
              {selectedTransaction.category} · {selectedTransaction.direction}
            </Typography>
            <Typography sx={{ color: brand.muted }} variant="caption">
              Cost center: {selectedTransaction.costCenter}
            </Typography>
            <Typography component="b" variant="body2">{formatSampleTzs(selectedTransaction.amount)}</Typography>
          </RecordDetail>
        </Box>
      ) : activeView === "Ledgers" ? (
        <Box>
          <ScreenCaption
            left="Ledger balances · illustrative"
            right="Opening + debits − credits = closing"
          />
          <ScreenTable
            columns={["Ledger / group", "Opening", "Debits", "Credits", "Closing"]}
          >
            {financeLedgerRows.map((row) => (
              <ScreenRow
                ariaPressed={selectedLedgerName === row.name}
                selected={selectedLedgerName === row.name}
                key={row.name}
                onSelect={() => setSelectedLedgerName(row.name)}
              >
                <ScreenCell primary={row.name} secondary={row.group} />
                <ScreenCell align="right">{formatCompactSampleTzs(row.opening)}</ScreenCell>
                <ScreenCell align="right">{formatCompactSampleTzs(row.debit)}</ScreenCell>
                <ScreenCell align="right">{formatCompactSampleTzs(row.credit)}</ScreenCell>
                <ScreenCell align="right">
                  <Typography component="strong" sx={{ fontWeight: 700 }} variant="body2">
                    {formatCompactSampleTzs(row.closing)}
                  </Typography>
                </ScreenCell>
              </ScreenRow>
            ))}
          </ScreenTable>
          <RecordDetail>
            <Typography component="strong" variant="body2">{selectedLedger.name}</Typography>
            <Typography sx={{ color: brand.muted }} variant="caption">{selectedLedger.group}</Typography>
            <Typography sx={{ color: brand.muted }} variant="caption">
              Opening {formatSampleTzs(selectedLedger.opening)} · Debits {formatSampleTzs(selectedLedger.debit)} · Credits {formatSampleTzs(selectedLedger.credit)}
            </Typography>
            <Typography component="b" variant="body2">Closing {formatSampleTzs(selectedLedger.closing)}</Typography>
          </RecordDetail>
        </Box>
      ) : (
        <Box>
          <ScreenCaption
            left="Quick reports"
            right="Choose a report to preview its purpose"
          />
          <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", md: "0.8fr 1.2fr" } }}>
            <Stack spacing={0.5}>
              {financeReports.map((report) => (
                <Button
                  aria-pressed={selectedReportName === report.name}
                  key={report.name}
                  onClick={() => setSelectedReportName(report.name)}
                  sx={{
                    bgcolor:
                      selectedReportName === report.name
                        ? brand.tintAccent
                        : brand.paper,
                    color: brand.ink,
                    justifyContent: "space-between",
                    textTransform: "none",
                  }}
                >
                  {report.name}
                  <Box component="b" sx={{ color: brand.muted }}>
                    ›
                  </Box>
                </Button>
              ))}
            </Stack>
            <RecordDetail>
              <Typography sx={{ color: brand.muted, display: "block", width: "100%" }} variant="caption">
                ILLUSTRATIVE REPORT PREVIEW
              </Typography>
              <Typography component="strong" sx={{ width: "100%" }} variant="subtitle2">
                {selectedReport.name}
              </Typography>
              <Typography sx={{ color: brand.muted, width: "100%" }} variant="body2">
                {selectedReport.detail}
              </Typography>
              <Typography component="b" sx={{ width: "100%" }} variant="body2">
                {selectedReport.amount}
              </Typography>
              <Typography sx={{ color: brand.muted, width: "100%" }} variant="caption">
                Sample figures only · report values depend on selected dates and access
              </Typography>
            </RecordDetail>
          </Box>
        </Box>
      )}
    </Box>
  );
}

type OperationsModule = "sales" | "procurement" | "inventory";

const operationsViews: Record<OperationsModule, string[]> = {
  sales: ["Sales Counter", "Dispatches", "Receipts", "Invoices", "Reports"],
  procurement: ["Purchase orders", "Goods received", "Consumptions", "Reports"],
  inventory: ["Stock", "GRNs", "Transfers", "Consumptions", "Adjustments", "Reports"],
};

const sampleStockRows = [
  { id: "cement", product: "Bagged cement", code: "SAMPLE-101", category: "Building materials", balance: 286, unit: "bags", value: 4_290_000, store: "Main store" },
  { id: "steel", product: "Reinforcement bar", code: "SAMPLE-102", category: "Steel", balance: 124, unit: "lengths", value: 3_472_000, store: "Main store" },
  { id: "paint", product: "Protective coating", code: "SAMPLE-103", category: "Finishes", balance: 38, unit: "cans", value: 1_140_000, store: "Site store" },
];

function ConnectedOperationsPreview({ module }: { module: OperationsModule }) {
  const [activeView, setActiveView] = useState(operationsViews[module][0]);
  const [saleType, setSaleType] = useState<"Order sale" | "Instant sale">("Order sale");
  const [selectedOrder, setSelectedOrder] = useState("PO-SAMPLE-024");
  const [store, setStore] = useState("Main store");
  const [includeSubstores, setIncludeSubstores] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(sampleStockRows[0].id);
  const views = operationsViews[module];
  const visibleStockRows = sampleStockRows.filter((item) => (store === "Main store" && includeSubstores) || item.store === store);
  const selectedProduct = visibleStockRows.find((item) => item.id === selectedProductId) ?? visibleStockRows[0] ?? sampleStockRows[0];

  return (
    <Box>
      <ScreenHeading
        chip="Illustrative"
        contextLabel={module === "sales" ? "OUTLET · SALES COUNTER" : module === "procurement" ? "PURCHASING · RECEIVING" : "STORE · INVENTORY"}
        title={module === "sales" ? "Illustrative outlet" : module === "procurement" ? "Illustrative purchase flow" : "Illustrative stock view"}
      />
      <ScreenTabs
        active={activeView}
        ariaLabel={`${module} workflow views`}
        onChange={setActiveView}
        tabs={views}
      />

      {module === "sales" ? (
        <Box>
          <OpsContextRow>
            <OpsFact label="Outlet" value="Sample outlet" />
            <OpsFact label="Counter" value="Front counter" />
            <ScreenToggleGroup<"Order sale" | "Instant sale">
              active={saleType}
              ariaLabel="Sale flow type"
              onChange={setSaleType}
              options={["Order sale", "Instant sale"]}
            />
          </OpsContextRow>
          {activeView === "Sales Counter" ? (
            <>
              <ScreenMetrics
                items={[
                  { label: "Sale type", value: saleType },
                  {
                    label: saleType === "Order sale" ? "Fulfilment" : "Stock",
                    value: saleType === "Order sale" ? "Dispatch later" : "Deduct at checkout",
                  },
                  { label: "Payment", value: saleType === "Order sale" ? "On account" : "At counter" },
                ]}
              />
              <ScreenTable
                columns={["Sample item", "Qty", "Amount"]}
              >
                <ScreenStaticRow>
                  <ScreenCell>Work gloves</ScreenCell>
                  <ScreenCell>4 pairs</ScreenCell>
                  <ScreenCell align="right">TZS 68,000</ScreenCell>
                </ScreenStaticRow>
                <ScreenStaticRow>
                  <ScreenCell>Safety helmet</ScreenCell>
                  <ScreenCell>2 each</ScreenCell>
                  <ScreenCell align="right">TZS 54,000</ScreenCell>
                </ScreenStaticRow>
                <ScreenStaticRow>
                  <ScreenCell>Illustrative total</ScreenCell>
                  <ScreenCell />
                  <ScreenCell align="right">TZS 122,000</ScreenCell>
                </ScreenStaticRow>
              </ScreenTable>
            </>
          ) : activeView === "Dispatches" ? (
            <OperationsStatusList title="Order fulfilment" rows={saleType === "Order sale" ? [["SAMPLE-SALE-018", "Partially fulfilled", "6 of 10 items dispatched"], ["SAMPLE-SALE-021", "Ordered", "Dispatch not started"]] : [["Instant sales", "Complete", "Stock deducted at checkout"]]} />
          ) : activeView === "Receipts" ? (
            <OperationsStatusList title="Payments received" rows={[["SAMPLE-SALE-018", "Part paid", "Remaining balance shown"], ["SAMPLE-SALE-021", "Awaiting receipt", "On-account sale"]]} />
          ) : activeView === "Invoices" ? (
            <OperationsStatusList title="Sales invoices" rows={[["SAMPLE-INV-006", "Draft", "Ready for finance review"], ["SAMPLE-INV-004", "Issued", "Linked to fulfilled sale"]]} />
          ) : (
            <OperationsStatusList title="Counter overview" rows={[["Cashier summary", "Illustrative", "Opening · receipts · closing"], ["Sales manifest", "Illustrative", "Outlet · customer · date range"]]} />
          )}
          <OpsFlow
            steps={[
              { done: true, label: "Sale" },
              {
                done: saleType === "Instant sale" || activeView === "Dispatches",
                label: saleType === "Instant sale" ? "Checkout" : "Dispatch",
              },
              {
                done: activeView === "Receipts" || activeView === "Invoices",
                label: saleType === "Instant sale" ? "Payment" : "Invoice / receipt",
              },
            ]}
          />
        </Box>
      ) : module === "procurement" ? (
        <Box>
          {activeView === "Purchase orders" ? (
            <>
              <OperationsStatusList
                title="Purchase orders · sample cost center"
                rows={[
                  ["PO-SAMPLE-024", "Partially received", "Sample supplier · 2 of 5 items received"],
                  ["PO-SAMPLE-025", "Pending", "Sample supplier · awaiting receiving"],
                  ["PO-SAMPLE-026", "Closed", "Sample supplier · order closed"],
                ]}
                selected={selectedOrder}
                onSelect={setSelectedOrder}
              />
              <OpsNote title={selectedOrder} detail="Receiving is tied to a store; partial receipts can continue against the remaining quantities." />
            </>
          ) : activeView === "Goods received" ? (
            <>
              <OpsContextRow><OpsFact label="Receiving store" value="Sample main store" /><OpsFact label="Order" value={selectedOrder} /></OpsContextRow>
              <Box sx={{ mt: 1.5 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography variant="body2">Items received</Typography>
                  <Typography component="b" variant="body2">2 / 5</Typography>
                </Stack>
                <LinearProgress sx={{ borderRadius: 3, height: 6, my: 0.75 }} value={40} variant="determinate" />
                <Typography sx={{ color: brand.muted }} variant="caption">
                  Illustrative partial goods receipt · remaining items stay open on the order.
                </Typography>
              </Box>
              <OperationsStatusList title="Recent goods receipts" rows={[["GRN-SAMPLE-011", "Received", "Sample main store · linked order"], ["GRN-SAMPLE-009", "Received", "Sample site store · linked order"]]} />
            </>
          ) : activeView === "Consumptions" ? (
            <>
              <OpsContextRow><OpsFact label="Store" value="Sample main store" /><OpsFact label="Cost center" value="Sample project team" /></OpsContextRow>
              <OperationsStatusList title="Internal stock issues" rows={[["CON-SAMPLE-008", "Recorded", "Materials issued to sample work"], ["CON-SAMPLE-006", "Recorded", "Production use · sample batch"]]} />
            </>
          ) : (
            <OperationsStatusList title="Purchasing reports" rows={[["Purchases report", "Order level", "Ordered · received · balance"], ["Purchases manifest", "Item level", "Quantities · supplier · status"], ["Product insights", "On screen", "Average cost · selling price · stock"]]} />
          )}
          <OpsFlow
            steps={[
              { done: true, label: "Purchase order" },
              { done: activeView === "Goods received", label: "Goods receipt" },
              { done: activeView === "Consumptions", label: "Store use" },
            ]}
          />
        </Box>
      ) : (
        <Box>
          <OpsContextRow>
            <ScreenSelect
              ariaLabel="Select sample store"
              label="Store"
              onChange={setStore}
              options={["Main store", "Site store"]}
              value={store}
            />
            <FormControlLabel
              control={<Checkbox checked={includeSubstores} onChange={(event) => setIncludeSubstores(event.target.checked)} size="small" />}
              label={<Typography variant="caption">Include substores</Typography>}
            />
          </OpsContextRow>
          {activeView === "Stock" ? (
            <>
              <ScreenTable
                columns={["Product", "Available", "Stock value"]}
              >
                {visibleStockRows.map((item) => (
                  <ScreenRow
                    ariaPressed={selectedProductId === item.id}
                    selected={selectedProductId === item.id}
                    key={item.id}
                    onSelect={() => setSelectedProductId(item.id)}
                  >
                    <ScreenCell primary={item.product} secondary={`${item.code} · ${item.category}`} />
                    <ScreenCell align="right">{item.balance} {item.unit}</ScreenCell>
                    <ScreenCell align="right">
                      <Typography component="strong" sx={{ fontWeight: 700 }} variant="body2">
                        {formatSampleTzs(item.value)}
                      </Typography>
                    </ScreenCell>
                  </ScreenRow>
                ))}
              </ScreenTable>
              <OpsNote title={`${selectedProduct.product} · movement history`} detail="Sample stock balance by store and cost center; opening balance, receipts, transfers, and issues." />
            </>
          ) : activeView === "GRNs" ? (
            <OperationsStatusList title="Goods received into this store" rows={[["GRN-SAMPLE-011", "Sample supplier", "Purchase order · received to store"], ["GRN-SAMPLE-009", "Sample supplier", "Purchase order · received to store"]]} />
          ) : activeView === "Transfers" ? (
            <OperationsStatusList title="Stock transfers" rows={[["TR-SAMPLE-014", "Partially received", "Sample main store → sample site store"], ["TR-SAMPLE-012", "Completed", "Internal store transfer"], ["TR-SAMPLE-010", "In transit", "External transfer · sample vehicle"]]} />
          ) : activeView === "Consumptions" ? (
            <OperationsStatusList title="Store consumptions" rows={[["CON-SAMPLE-008", "Sample project team", "Materials issued for work"], ["CON-SAMPLE-006", "Sample work center", "Linked to illustrative production batch"]]} />
          ) : activeView === "Adjustments" ? (
            <OperationsStatusList title="Stock adjustments" rows={[["ADJ-SAMPLE-003", "In review", "Sample stock count · approval pending"], ["ADJ-SAMPLE-002", "Approved", "Illustrative opening balance"]]} />
          ) : (
            <OperationsStatusList title="Store reports" rows={[["Stock report", "Valuation", "Balance · average cost · value"], ["Item movement", "Product level", "Transaction history by item"], ["Dormant stock", "Review", "Slow-moving stock in selected period"]]} />
          )}
          <OpsFlow
            steps={[
              { done: true, label: "Purchase receipt" },
              { done: activeView === "Transfers", label: "Transfer" },
              { done: activeView === "Consumptions", label: "Consumption" },
            ]}
          />
        </Box>
      )}
    </Box>
  );
}

/** Row of contextual facts above an operations screen. */
function OpsContextRow({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ alignItems: { sm: "center" }, flexWrap: "wrap", my: 1.5 }}
      useFlexGap
    >
      {children}
    </Stack>
  );
}

/** Label + value pair used inside OpsContextRow. */
function OpsFact({ label, value }: { label: string; value: string }) {
  return (
    <Typography sx={{ color: brand.muted }} variant="caption">
      {label}{" "}
      <Box component="b" sx={{ color: brand.ink }}>
        {value}
      </Box>
    </Typography>
  );
}

/** Title + explanation note under an operations table. */
function OpsNote({ detail, title }: { detail: string; title: string }) {
  return (
    <Box sx={{ bgcolor: brand.paper, border: `1px solid ${brand.line}`, borderRadius: 2, mt: 1.5, p: 1.5 }}>
      <Typography component="strong" sx={{ display: "block" }} variant="body2">
        {title}
      </Typography>
      <Typography sx={{ color: brand.muted }} variant="caption">
        {detail}
      </Typography>
    </Box>
  );
}

/** Horizontal workflow trail showing which stage the preview is on. */
function OpsFlow({ steps }: { steps: { done: boolean; label: string }[] }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: "center", flexWrap: "wrap", mt: 2 }}
      useFlexGap
    >
      {steps.map((item, index) => (
        <Stack direction="row" key={item.label} spacing={1} sx={{ alignItems: "center" }}>
          <Chip
            label={item.label}
            size="small"
            sx={{
              bgcolor: item.done ? brand.tintSuccess : brand.paper,
              color: brand.ink,
              fontWeight: 600,
            }}
          />
          {index < steps.length - 1 ? (
            <Box aria-hidden="true" sx={{ bgcolor: brand.line, height: 2, width: 16 }} />
          ) : null}
        </Stack>
      ))}
    </Stack>
  );
}

function OperationsStatusList({
  title,
  rows,
  selected,
  onSelect,
}: {
  title: string;
  rows: string[][];
  selected?: string;
  onSelect?: (value: string) => void;
}) {
  return (
    <Paper elevation={0} sx={{ border: `1px solid ${brand.line}`, borderRadius: 2, mt: 1.5, p: 1.5 }} variant="outlined">
      <Typography sx={{ color: brand.muted, display: "block", fontWeight: 700, mb: 1 }} variant="caption">{title}</Typography>
      {rows.map(([name, status, detail]) => {
        const rowContent = (
          <>
            <Box>
              <Typography component="b" sx={{ display: "block" }} variant="body2">{name}</Typography>
              <Typography sx={{ color: brand.muted }} variant="caption">{detail}</Typography>
            </Box>
            <StatusChip tone={toneForStatus(status)}>{status}</StatusChip>
          </>
        );
        return onSelect ? (
          <Button
            aria-pressed={selected === name}
            key={name}
            onClick={() => onSelect(name)}
            sx={{
              bgcolor: selected === name ? brand.tintAccent : "transparent",
              color: brand.ink,
              justifyContent: "space-between",
              textAlign: "left",
              textTransform: "none",
              width: "100%",
            }}
          >
            {rowContent}
          </Button>
        ) : (
          <Stack direction="row" key={name} spacing={1} sx={{ alignItems: "center", justifyContent: "space-between", py: 0.5 }}>{rowContent}</Stack>
        );
      })}
    </Paper>
  );
}

const projectTourTaskIds = ["survey", "resources", "materials", "structure"] as const;

// Each line says what the module *holds against* something else, not what
// screens it contains — the one thing a feature list cannot tell a buyer.
// Scope is bounded by docs/product-evidence-register.md §3: nothing here
// claims a capability sitting at tier C in that table.
const modules = [
  { number: "01", title: "Financial management", detail: "Transactions, budgets, reconciliations and financial reports." },
  { number: "02", title: "Process approval", detail: "Route business requests for review and keep every decision visible." },
  { number: "03", title: "Procurement", detail: "Purchase orders, goods received against them, and purchasing reports." },
  { number: "04", title: "Inventory & stores", detail: "Stock movement and project-linked consumption, and low stock flagged before a store runs dry." },
  { number: "05", title: "Project management", detail: "Weighted execution against time elapsed, spend against budget, certificates against approval." },
  { number: "06", title: "Manufacturing", detail: "Bills of materials, production batches and cost reporting." },
  { number: "07", title: "Fuel stations", detail: "Station shifts, tank dippings, fuel stock and station reports." },
  { number: "08", title: "Point of sale", detail: "Sales counters, outlets, proformas and sales reporting." },
  { number: "09", title: "Reporting", detail: "Operational and financial views connected to daily activity." },
  { number: "10", title: "Human resources", detail: "Employee leave, loan requests and payroll approval workflows." },
  { number: "11", title: "Asset Register", detail: "Track registered assets, assigned locations, status and value." },
];

// The six adoption steps the live site publishes as "Our Work Flow", reworded
// to describe mechanics rather than benefits. Nothing here claims a capability
// sitting at tier C in docs/product-evidence-register.md.
const adoptionSteps = [
  {
    number: "01",
    title: "Set it up around your structure",
    detail:
      "Stores, projects, sales counters, ledgers and approval routes are configured to match how the business is already organised, before anyone records a transaction.",
  },
  {
    number: "02",
    title: "Record the work where it happens",
    detail:
      "Sales, purchases, production and project activity are entered once, in the module that owns them, rather than re-keyed into a separate finance system afterwards.",
  },
  {
    number: "03",
    title: "Let the postings follow",
    detail:
      "Stock movement and the ledger entries behind it follow from that operational record — an instant sale settles into the counter's own ledger as it is taken.",
  },
  {
    number: "04",
    title: "Watch it while it runs",
    detail:
      "Dashboards and module screens show stock, project execution and cash as the records land, so a variance surfaces during the month rather than after it.",
  },
  {
    number: "05",
    title: "Ask the numbers questions",
    detail:
      "Reports read the same records, so a figure can be followed back to the transaction that produced it instead of being reconciled against a second system.",
  },
  {
    number: "06",
    title: "Add to it as you grow",
    detail:
      "Further modules, stores, outlets and stations are switched on as the business needs them. Each is part of the subscription, not a new system to install.",
  },
];

const industryLinks = [
  {
    number: "01",
    title: "Projects & construction",
    detail: "Connect budgets, claims, subcontractors, stores and execution.",
    href: "/industries/projects-construction",
  },
  {
    number: "02",
    title: "Fuel stations",
    detail: "Follow shifts, tank readings, fuel movement and station reports.",
    href: "/industries/fuel-stations",
  },
  {
    number: "03",
    title: "Manufacturing",
    detail: "Bring materials, production batches, output and costing together.",
    href: "/industries/manufacturing",
  },
  {
    number: "04",
    title: "Trading & distribution",
    detail: "Coordinate purchasing, inventory, sales and financial visibility.",
    href: "/industries/trading-distribution",
  },
];

const audienceGroups = [
  {
    number: "01",
    title: "Small businesses",
    description:
      "Bring finance, stock, people and sales information into one place as the business takes shape.",
  },
  {
    number: "02",
    title: "Growing companies",
    description:
      "Make day-to-day activity easier to follow as teams and operations grow beyond separate records.",
  },
  {
    number: "03",
    title: "Other organizations",
    description:
      "Connect key operational information in a system that can be explored around your needs.",
  },
];

const tourDestinations: Record<TourKey, string> = {
  projects: "/industries/projects-construction",
  fuel: "/industries/fuel-stations",
  manufacturing: "/industries/manufacturing",
  "process-approval": "/solutions/process-approval",
  finance: "/#platform",
  procurement: "/industries/trading-distribution",
  inventory: "/industries/trading-distribution",
  "human-resources": "/solutions/process-approval",
  "asset-register": "/#platform",
  sales: "/industries/trading-distribution",
  reporting: "/#platform",
};

type ExperienceView = "home" | "tour" | "about";

export type ClientLogo = { name: string; src: string };

// Named customer references. Publishing a company's name and mark is a claim
// about that company, so each line needs permission on file before it ships —
// see decision 1 in docs/product-evidence-register.md. Nothing in the code
// enforces that any more; deleting a line here is how a logo comes down.
const clientLogos: readonly ClientLogo[] = [
  { name: "Transpower", src: "/images/Transpower Logo.png" },
  { name: "White City International", src: "/images/WHITE-CITY-GENUINE-LOGO-2.png" },
  { name: "RES Company Ltd", src: "/images/LOGO Transparent.png" },
  { name: "GP Petrol Stations", src: "/images/GP-Logo.png" },
  { name: "Calia Service Station", src: "/images/canvasized victoria  logo.png" },
  { name: "Farmer's Basket", src: "/images/Farmer's Basket Logo-1.png" },
  { name: "Shalak Trading Company Ltd", src: "/images/Main-logo.png" },
  { name: "Dowy Beauty", src: "/images/Transparent Logo.png" },
  { name: "Buildsol", src: "/images/BUILDSOL LOGO-1.png" },
  { name: "Black Mountain", src: "/images/black_mountain.png" },
  { name: "Brecol", src: "/images/BRECOL_LOGO_PIC.png" },
  { name: "Namis", src: "/images/namis.png" },
];

export function HomeExperience({
  view = "home",
}: { view?: ExperienceView } = {}) {
  const [activeTour, setActiveTour] = useState<TourKey>("projects");
  const [activeStep, setActiveStep] = useState(0);
  const [projectPreviewTab, setProjectPreviewTab] = useState<ProjectPreviewTab>("wbs");
  const [selectedProjectTaskId, setSelectedProjectTaskId] = useState("survey");
  const [expandedWbsGroups, setExpandedWbsGroups] = useState(
    () => new Set(["preparation", "delivery", "closeout"]),
  );
  const tour = tourContent[activeTour];
  const step = tour.steps[activeStep];
  const selectedProjectTask =
    projectPreviewTasks.find((task) => task.id === selectedProjectTaskId) ?? projectPreviewTasks[0];
  const visibleProjectTasks = projectPreviewTasks.filter(
    (task) => !task.parentId || expandedWbsGroups.has(task.parentId),
  );

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section:not(.hero-section)"),
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    sections.forEach((section) => {
      section.classList.add("scroll-reveal");
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        section.classList.remove("scroll-reveal", "is-visible");
      });
    };
  }, []);

  function chooseTour(key: TourKey) {
    setActiveTour(key);
    setActiveStep(0);
    if (key === "projects") {
      setSelectedProjectTaskId(projectTourTaskIds[0]);
    }
  }

  function selectTourStep(index: number) {
    setActiveStep(index);
    if (activeTour === "projects") {
      setSelectedProjectTaskId(projectTourTaskIds[index] ?? projectTourTaskIds[0]);
    }
  }

  function selectProjectTask(taskId: string) {
    setSelectedProjectTaskId(taskId);
    const tourStep = projectTourTaskIds.findIndex((projectTaskId) => projectTaskId === taskId);
    if (tourStep >= 0) {
      setActiveStep(tourStep);
    }
  }

  function moveStep(direction: number) {
    const nextStep = (activeStep + direction + tour.steps.length) % tour.steps.length;
    selectTourStep(nextStep);
  }

  function toggleWbsGroup(taskId: string) {
    setExpandedWbsGroups((current) => {
      const next = new Set(current);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  }

  return (
    <>
      <SiteHeader />
      <Box component="main">
        {view === "home" ? (
          <>
        <Box
          component="section"
          sx={{
            bgcolor: brand.white,
            color: brand.ink,
            overflow: "hidden",
            position: "relative",
            py: { xs: 6, md: 10 },
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              background: `radial-gradient(circle, ${brand.accent}14 0%, transparent 70%)`,
              borderRadius: "50%",
              height: 520,
              left: -160,
              position: "absolute",
              top: -200,
              width: 520,
            }}
          />
          <Container maxWidth="lg" sx={{ position: "relative" }}>
            <Box
              sx={{
                alignItems: "center",
                display: "grid",
                gap: { xs: 5, md: 6 },
                gridTemplateColumns: { xs: "1fr", md: "1fr 1.05fr" },
              }}
            >
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Box
                    aria-hidden="true"
                    sx={{ bgcolor: brand.accent, borderRadius: "50%", height: 8, width: 8 }}
                  />
                  <Eyebrow>Simplified Management and Control</Eyebrow>
                </Stack>
                <Typography component="h1" sx={{ lineHeight: 1.1 }} variant="h2">
                  See where work, time and money{" "}
                  <Box component="span" sx={{ color: brand.accent }}>
                    stop agreeing.
                  </Box>
                </Typography>
                <Typography sx={{ color: brand.muted, maxWidth: 540 }} variant="body1">
                  ProsERP runs inventory, sales, projects, fuel stations and manufacturing on one
                  system, so a slip shows up as a number instead of a surprise.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <PrimaryAction href="/#request-demo">Request a demo</PrimaryAction>
                  <TextLink href="/product-tour">Explore the product</TextLink>
                </Stack>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", pt: 1 }}>
                  <Box aria-hidden="true" sx={{ bgcolor: brand.accent, height: 2, width: 40 }} />
                  <Typography sx={{ color: brand.muted }} variant="body2">
                    Execution against time elapsed. Spend against budget. Stock against threshold.
                  </Typography>
                </Stack>
              </Stack>

              <HeroDashboardMock />
            </Box>
          </Container>
        </Box>

        <Box sx={{ bgcolor: brand.paper, borderBlock: `1px solid ${brand.line}`, py: 3 }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}
            >
              <Box>
                <Eyebrow>THE BIG PICTURE</Eyebrow>
                <Typography sx={{ mt: 0.5 }} variant="h6">
                  Less switching between systems. More understanding of how work connects.
                </Typography>
              </Box>
              <TextLink href="#platform">See the platform</TextLink>
            </Stack>
          </Container>
        </Box>

        <Container id="platform" maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
          <SectionHeading
            eyebrow="One platform, connected work"
            intro="Because the work and the money are recorded in the same system, ProsERP can hold one against the other. A purchase sits against the order it came from, consumption against the project that used it, a certificate against the approval that released it."
            title="Eleven modules, one set of numbers."
          />
          <CardGrid>
            {modules.map((module) => (
              <NumberedCard
                detail={module.detail}
                id={module.title === "Process approval" ? "process-approval" : undefined}
                key={module.number}
                number={module.number}
                showArrow
                title={module.title}
              />
            ))}
          </CardGrid>
          <Paper
            elevation={0}
            sx={{
              bgcolor: brand.paper,
              border: `1px solid ${brand.line}`,
              borderRadius: 3,
              mt: 3,
              p: { xs: 2.5, md: 3.5 },
            }}
            variant="outlined"
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={2.5}>
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
                  height: 36,
                  justifyContent: "center",
                  width: 36,
                }}
              >
                ✓
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Eyebrow>BUILT INTO THE WAY WORK MOVES</Eyebrow>
                <Typography component="h3" sx={{ mb: 1, mt: 0.5 }} variant="h6">
                  Keep requests and decisions connected.
                </Typography>
                <Typography sx={{ color: brand.muted }} variant="body2">
                  Process Approval gives teams a dedicated place to review business requests, with
                  approval activity connected to the operational workflows around it.
                </Typography>
              </Box>
              <Stack spacing={0.5} sx={{ flexShrink: 0 }}>
                <TextLink href="/solutions/process-approval">Explore approvals</TextLink>
                <TextLink href="/product-tour">See guided tour</TextLink>
              </Stack>
            </Stack>
          </Paper>
        </Container>
          </>
        ) : null}

        {view === "home" ? (
          <Box sx={{ bgcolor: brand.paper, py: { xs: 4, md: 6 } }}>
            <Container maxWidth="lg">
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}
              >
                <Box>
                  <Eyebrow>A GUIDED LOOK INSIDE</Eyebrow>
                  <Typography component="h2" sx={{ mt: 0.5 }} variant="h5">
                    Explore the ProsERP modules.
                  </Typography>
                  <Typography sx={{ color: brand.muted, mt: 0.5 }} variant="body2">
                    Take a closer look at the workflows behind finance, projects, procurement and
                    more.
                  </Typography>
                </Box>
                <PrimaryAction href="/product-tour">Explore the product tour</PrimaryAction>
              </Stack>
            </Container>
          </Box>
        ) : null}

        {view === "tour" ? (
        <Box component="section" sx={{ bgcolor: brand.surfaceDark, color: brand.white, py: { xs: 6, md: 9 } }}>
          <Container maxWidth="lg">
            <Stack spacing={1} sx={{ mb: 4 }}>
              <Eyebrow light>EXPLORE ALL 11 MODULES</Eyebrow>
              <Typography component="h2" variant="h3">
                See how the pieces come together.
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body1">
                Choose any module for a guided look at the workflows ProsERP supports.
              </Typography>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "220px 1fr" },
              }}
            >
              <Tabs
                aria-label="Choose a workflow"
                onChange={(_event, value) => chooseTour(value as TourKey)}
                orientation="vertical"
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  maxHeight: { md: 520 },
                  "& .MuiTab-root": { alignItems: "flex-start", color: "rgba(255,255,255,0.7)", minHeight: 44, textAlign: "left" },
                  "& .MuiTab-root.Mui-selected": { bgcolor: brand.tintAccent, color: brand.white },
                }}
                value={activeTour}
                variant="scrollable"
              >
                {(Object.keys(tourContent) as TourKey[]).map((key, index) => (
                  <Tab
                    id={`tab-${key}`}
                    key={key}
                    label={`${String(index + 1).padStart(2, "0")}  ${tourContent[key].label}`}
                    value={key}
                  />
                ))}
              </Tabs>

              <Box
                aria-labelledby={`tab-${activeTour}`}
                role="tabpanel"
                sx={{
                  display: "grid",
                  gap: 3,
                  gridTemplateColumns: { xs: "1fr", lg: "0.85fr 1.15fr" },
                }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ color: brand.accentLight, fontWeight: 700 }} variant="caption">
                      {tour.eyebrow}
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.6)" }} variant="caption">
                      {String(activeStep + 1).padStart(2, "0")} / {String(tour.steps.length).padStart(2, "0")}
                    </Typography>
                  </Stack>
                  {/*
                    The module's own headline and summary. Without these the
                    left column changed only its small eyebrow when you picked
                    a different module, so what each one is *for* never got said.
                  */}
                  <Typography component="h3" variant="h5">
                    {tour.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.75)" }} variant="body2">
                    {tour.description}
                  </Typography>
                  <Box
                    aria-hidden="true"
                    sx={{ bgcolor: brand.accentLight, height: 2, mt: 0.5, width: 40 }}
                  />
                  <Typography component="h4" sx={{ fontWeight: 700, mt: 0.5 }} variant="subtitle1">
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body1">
                    {step.text}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                    <IconButton
                      aria-label="Previous step"
                      onClick={() => moveStep(-1)}
                      sx={{ border: "1px solid rgba(255,255,255,0.25)", color: brand.white }}
                      size="small"
                    >
                      ←
                    </IconButton>
                    <IconButton
                      aria-label="Next step"
                      onClick={() => moveStep(1)}
                      sx={{ border: "1px solid rgba(255,255,255,0.25)", color: brand.white }}
                      size="small"
                    >
                      →
                    </IconButton>
                    <Stack
                      aria-label={`Step ${activeStep + 1} of ${tour.steps.length}`}
                      direction="row"
                      spacing={0.5}
                      sx={{ ml: 1 }}
                    >
                      {tour.steps.map((item, index) => (
                        <Box
                          key={item.title}
                          sx={{
                            bgcolor: index <= activeStep ? brand.accent : "rgba(255,255,255,0.25)",
                            borderRadius: 1,
                            height: 4,
                            width: 22,
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                  <Stack spacing={0.5} sx={{ alignItems: "flex-start" }}>
                    <TextLink href={tourDestinations[activeTour]} light>
                      Explore {tour.label.toLowerCase()}
                    </TextLink>
                    <TextLink href="/#request-demo" light>
                      Talk to our team
                    </TextLink>
                  </Stack>
                </Stack>

                <Stack spacing={1.5}>
                  <Paper elevation={0} sx={{ bgcolor: brand.white, borderRadius: 3, overflow: "hidden" }}>
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
                      <Stack aria-hidden="true" direction="row" spacing={0.5}>
                        {[0, 1, 2].map((dot) => (
                          <Box key={dot} sx={{ bgcolor: brand.line, borderRadius: "50%", height: 8, width: 8 }} />
                        ))}
                      </Stack>
                      <Typography sx={{ color: brand.muted, flexGrow: 1 }} variant="caption">
                        {tour.eyebrow}
                      </Typography>
                      <Typography sx={{ color: brand.ink, fontWeight: 700 }} variant="caption">
                        PROSERP
                      </Typography>
                    </Stack>
                    <Box sx={{ p: 1.5 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center", justifyContent: "space-between", mb: 1.5 }}
                      >
                        <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
                          WORKFLOW PREVIEW
                        </Typography>
                        <Chip
                          label="SAMPLE DATA"
                          size="small"
                          sx={{ bgcolor: brand.primary, color: brand.white, fontWeight: 700 }}
                        />
                      </Stack>
                    {activeTour === "projects" ? (
                      <Box>
                        <ScreenHeading
                          chip="8-week plan"
                          contextLabel="PROJECT PLAN"
                          title="Illustrative project"
                        />
                        {/*
                          The real project screen opens with this: one bar
                          carrying execution against time elapsed, so a project
                          running behind its schedule is visible immediately.
                        */}
                        <Box sx={{ mb: 1.5 }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ justifyContent: "space-between", mb: 0.5 }}
                          >
                            <Typography component="span" sx={{ fontWeight: 700 }} variant="caption">
                              Execution: {projectExecution}%
                            </Typography>
                            <Typography
                              component="span"
                              sx={{ color: brand.warning, fontWeight: 700 }}
                              variant="caption"
                            >
                              Time elapsed: {projectTimeElapsed}%
                            </Typography>
                          </Stack>
                          <LinearProgress
                            aria-label="Illustrative project execution against time elapsed"
                            color="warning"
                            sx={{ borderRadius: 3, height: 8 }}
                            value={projectExecution}
                            variant="determinate"
                          />
                        </Box>
                        <ScreenTabs<ProjectPreviewTab>
                          active={projectPreviewTab}
                          ariaLabel="Project plan view"
                          onChange={setProjectPreviewTab}
                          tabs={[
                            { label: "WBS", value: "wbs" },
                            { label: "Tasks Tree View", value: "tasks-tree" },
                            { label: "Budgets", value: "budgets" },
                            { label: "Gantt chart", value: "gantt" },
                          ]}
                        />
                        {projectPreviewTab === "wbs" ? (
                          <ScreenTable
                            ariaLabel="Work breakdown structure"
                            columns={["WBS / task", "Execution · time elapsed", "Weight", "Status"]}
                          >
                            {visibleProjectTasks.map((task) => (
                              <ScreenRow
                                ariaPressed={selectedProjectTaskId === task.id}
                                key={task.id}
                                onSelect={() => selectProjectTask(task.id)}
                                selected={selectedProjectTaskId === task.id}
                              >
                                <ScreenCell>
                                  <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", pl: task.level * 2 }}>
                                    {task.level === 0 ? (
                                      <IconButton
                                        aria-expanded={expandedWbsGroups.has(task.id)}
                                        aria-label={`${expandedWbsGroups.has(task.id) ? "Collapse" : "Expand"} ${task.title}`}
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          toggleWbsGroup(task.id);
                                        }}
                                        size="small"
                                      >
                                        {expandedWbsGroups.has(task.id) ? "−" : "+"}
                                      </IconButton>
                                    ) : null}
                                    <Typography component="span" sx={{ color: "text.secondary" }} variant="caption">
                                      {task.code}
                                    </Typography>
                                    <Typography component="span" sx={{ fontWeight: task.level === 0 ? 700 : 400 }} variant="body2">
                                      {task.title}
                                    </Typography>
                                  </Stack>
                                </ScreenCell>
                                {/*
                                  Execution against time elapsed, the pairing
                                  the real WBS screen is built around: the bar
                                  turns amber when the schedule has run ahead
                                  of the work done.
                                */}
                                <ScreenCell>
                                  <Box sx={{ minWidth: 190 }}>
                                    <Stack
                                      direction="row"
                                      spacing={1}
                                      sx={{ justifyContent: "space-between", mb: 0.25 }}
                                    >
                                      <Typography component="span" variant="caption">
                                        Execution: {task.progress}%
                                      </Typography>
                                      <Typography
                                        component="span"
                                        sx={{
                                          color:
                                            task.timeElapsed > task.progress
                                              ? brand.warning
                                              : brand.muted,
                                        }}
                                        variant="caption"
                                      >
                                        Time elapsed: {task.timeElapsed}%
                                      </Typography>
                                    </Stack>
                                    <LinearProgress
                                      color={
                                        task.progress >= 100
                                          ? "success"
                                          : task.timeElapsed > task.progress
                                            ? "warning"
                                            : "primary"
                                      }
                                      sx={{ borderRadius: 3, height: 6 }}
                                      value={task.progress}
                                      variant="determinate"
                                    />
                                  </Box>
                                </ScreenCell>
                                <ScreenCell align="right">{task.weight}%</ScreenCell>
                                <StatusBadge tone={toneForStatus(task.status)}>{task.status}</StatusBadge>
                              </ScreenRow>
                            ))}
                          </ScreenTable>
                        ) : projectPreviewTab === "tasks-tree" ? (
                          <Box aria-label="Illustrative tasks tree view">
                            <Stack
                              direction="row"
                              sx={{ color: brand.muted, justifyContent: "space-between", mb: 1 }}
                            >
                              <Typography variant="caption">Task hierarchy</Typography>
                              <Typography variant="caption">{visibleProjectTasks.length} visible</Typography>
                            </Stack>
                            <Box aria-label="Project task hierarchy" role="tree">
                              {visibleProjectTasks.map((task) => (
                                <Stack
                                  aria-level={task.level + 1}
                                  aria-selected={selectedProjectTaskId === task.id}
                                  direction="row"
                                  key={task.id}
                                  role="treeitem"
                                  spacing={1}
                                  sx={{
                                    alignItems: "center",
                                    bgcolor:
                                      selectedProjectTaskId === task.id
                                        ? brand.tintAccentStrong
                                        : "transparent",
                                    borderBottom: `1px solid ${brand.line}`,
                                    pl: task.level * 2.5,
                                    py: 0.75,
                                  }}
                                >
                                  {task.level === 0 ? (
                                    <IconButton
                                      aria-expanded={expandedWbsGroups.has(task.id)}
                                      aria-label={`${expandedWbsGroups.has(task.id) ? "Collapse" : "Expand"} ${task.title}`}
                                      onClick={() => toggleWbsGroup(task.id)}
                                      size="small"
                                    >
                                      {expandedWbsGroups.has(task.id) ? "−" : "+"}
                                    </IconButton>
                                  ) : (
                                    <Box
                                      aria-hidden="true"
                                      sx={{ bgcolor: brand.line, height: 1, ml: 1, width: 12 }}
                                    />
                                  )}
                                  <Typography sx={{ color: brand.muted }} variant="caption">
                                    {task.code}
                                  </Typography>
                                  <Button
                                    aria-pressed={selectedProjectTaskId === task.id}
                                    onClick={() => selectProjectTask(task.id)}
                                    size="small"
                                    sx={{
                                      color: brand.ink,
                                      flexGrow: 1,
                                      fontWeight: task.level === 0 ? 700 : 400,
                                      justifyContent: "flex-start",
                                      textTransform: "none",
                                    }}
                                  >
                                    {task.title}
                                  </Button>
                                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 110 }}>
                                    <LinearProgress
                                      sx={{ borderRadius: 3, flexGrow: 1, height: 5 }}
                                      value={task.progress}
                                      variant="determinate"
                                    />
                                    <Typography variant="caption">{task.progress}%</Typography>
                                  </Stack>
                                  <StatusChip tone={toneForStatus(task.status)}>{task.status}</StatusChip>
                                </Stack>
                              ))}
                            </Box>
                          </Box>
                        ) : projectPreviewTab === "budgets" ? (
                          <ProjectBudgetPreview />
                        ) : (
                          <Box aria-label="Illustrative Gantt chart">
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ borderBottom: `1px solid ${brand.line}`, pb: 0.5 }}
                            >
                              <Typography sx={{ color: brand.muted, minWidth: 150 }} variant="caption">
                                Task
                              </Typography>
                              <Box sx={{ display: "grid", flexGrow: 1, gridTemplateColumns: "repeat(8, 1fr)" }}>
                                {Array.from({ length: 8 }, (_unused, index) => (
                                  <Typography key={index} sx={{ color: brand.muted, textAlign: "center" }} variant="caption">
                                    W{index + 1}
                                  </Typography>
                                ))}
                              </Box>
                            </Stack>
                            {visibleProjectTasks.map((task) => (
                              <Stack
                                aria-selected={selectedProjectTaskId === task.id}
                                direction="row"
                                key={task.id}
                                spacing={1}
                                sx={{
                                  alignItems: "center",
                                  bgcolor:
                                    selectedProjectTaskId === task.id
                                      ? brand.tintAccentStrong
                                      : "transparent",
                                  borderBottom: `1px solid ${brand.line}`,
                                  py: 0.5,
                                }}
                              >
                                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", minWidth: 150 }}>
                                  {task.level === 0 ? (
                                    <IconButton
                                      aria-expanded={expandedWbsGroups.has(task.id)}
                                      aria-label={`${expandedWbsGroups.has(task.id) ? "Collapse" : "Expand"} ${task.title}`}
                                      onClick={() => toggleWbsGroup(task.id)}
                                      size="small"
                                    >
                                      {expandedWbsGroups.has(task.id) ? "−" : "+"}
                                    </IconButton>
                                  ) : null}
                                  <Button
                                    aria-pressed={selectedProjectTaskId === task.id}
                                    onClick={() => selectProjectTask(task.id)}
                                    size="small"
                                    sx={{
                                      color: brand.ink,
                                      fontWeight: task.level === 0 ? 700 : 400,
                                      justifyContent: "flex-start",
                                      pl: task.level === 0 ? 0 : 2,
                                      textTransform: "none",
                                    }}
                                  >
                                    {task.title}
                                  </Button>
                                </Stack>
                                <Box
                                  sx={{
                                    display: "grid",
                                    flexGrow: 1,
                                    gridTemplateColumns: "repeat(8, 1fr)",
                                    position: "relative",
                                  }}
                                >
                                  <Box
                                    aria-label={`${task.title}, weeks ${task.startWeek} to ${task.endWeek}, ${task.progress}% complete`}
                                    aria-pressed={selectedProjectTaskId === task.id}
                                    component="button"
                                    onClick={() => selectProjectTask(task.id)}
                                    sx={{
                                      bgcolor: task.level === 0 ? brand.primary : brand.line,
                                      border: 0,
                                      borderRadius: 1,
                                      cursor: "pointer",
                                      gridColumn: `${task.startWeek} / ${task.endWeek + 1}`,
                                      height: 14,
                                      overflow: "hidden",
                                      p: 0,
                                    }}
                                    type="button"
                                  >
                                    <Box
                                      sx={{
                                        bgcolor: brand.accentLight,
                                        height: "100%",
                                        width: `${task.progress}%`,
                                      }}
                                    />
                                  </Box>
                                </Box>
                              </Stack>
                            ))}
                          </Box>
                        )}
                        {projectPreviewTab !== "budgets" ? (
                          <RecordDetail>
                            <Box>
                              <Typography sx={{ color: brand.muted, display: "block" }} variant="caption">
                                SELECTED TASK
                              </Typography>
                              <Typography component="strong" variant="body2">
                                {selectedProjectTask.title}
                              </Typography>
                            </Box>
                            <OpsFact
                              label="Plan"
                              value={`Weeks ${selectedProjectTask.startWeek}–${selectedProjectTask.endWeek}`}
                            />
                            <OpsFact label="Progress" value={`${selectedProjectTask.progress}%`} />
                            {selectedProjectTask.dependency ? (
                              <OpsFact label="Follows" value={selectedProjectTask.dependency} />
                            ) : null}
                            <StatusChip tone={toneForStatus(selectedProjectTask.status)}>
                              {selectedProjectTask.status}
                            </StatusChip>
                          </RecordDetail>
                        ) : null}
                      </Box>
                    ) : activeTour === "finance" ? (
                      <FinancePreview key={activeTour} />
                    ) : activeTour === "sales" || activeTour === "procurement" || activeTour === "inventory" ? (
                      <ConnectedOperationsPreview key={activeTour} module={activeTour} />
                    ) : activeTour === "asset-register" ? (
                      <AssetRegisterPreview />
                    ) : activeTour === "human-resources" ? (
                      <PayrollPreview />
                    ) : (
                      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1.2fr 0.8fr" } }}>
                        <Stack spacing={0.5}>
                          {tour.steps.map((item, index) => (
                            <Button
                              aria-current={activeStep === index ? "step" : undefined}
                              key={item.title}
                              onClick={() => selectTourStep(index)}
                              sx={{
                                bgcolor: activeStep === index ? brand.tintAccent : brand.paper,
                                color: brand.ink,
                                justifyContent: "flex-start",
                                p: 1,
                                textAlign: "left",
                                textTransform: "none",
                              }}
                            >
                              <Box
                                sx={{
                                  alignItems: "center",
                                  bgcolor: index < activeStep ? brand.accent : brand.white,
                                  border: `1px solid ${brand.line}`,
                                  borderRadius: "50%",
                                  display: "flex",
                                  flexShrink: 0,
                                  fontSize: "0.6875rem",
                                  fontWeight: 700,
                                  height: 24,
                                  justifyContent: "center",
                                  mr: 1,
                                  width: 24,
                                }}
                              >
                                {index < activeStep ? "✓" : `0${index + 1}`}
                              </Box>
                              <Box>
                                <Typography component="strong" sx={{ display: "block" }} variant="body2">
                                  {item.title}
                                </Typography>
                                <Typography sx={{ color: brand.muted }} variant="caption">
                                  {item.tag}
                                </Typography>
                              </Box>
                            </Button>
                          ))}
                        </Stack>
                        <Paper
                          elevation={0}
                          sx={{ bgcolor: brand.paper, border: `1px solid ${brand.line}`, borderRadius: 2, p: 1.5 }}
                          variant="outlined"
                        >
                          <Typography sx={{ color: brand.muted, display: "block" }} variant="caption">
                            {step.tag}
                          </Typography>
                          <Typography component="strong" sx={{ display: "block" }} variant="h5">
                            {step.metric}
                          </Typography>
                          <Typography sx={{ color: brand.muted }} variant="caption">
                            {step.metricLabel}
                          </Typography>
                          <Stack direction="row" spacing={0.5} sx={{ alignItems: "flex-end", height: 40, my: 1 }}>
                            {[40, 62, 48, 75, 58, 88, 70].map((height, index) => (
                              <Box
                                key={index}
                                sx={{ bgcolor: brand.primary, borderRadius: 0.5, flexGrow: 1, height: `${height}%` }}
                              />
                            ))}
                          </Stack>
                          <Stack direction="row" sx={{ color: brand.muted, justifyContent: "space-between" }}>
                            <Typography variant="caption">Activity</Typography>
                            <Typography variant="caption">Sample view</Typography>
                          </Stack>
                        </Paper>
                      </Box>
                    )}
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center", borderTop: `1px solid ${brand.line}`, mt: 1.5, pt: 1 }}
                      >
                        <Box
                          aria-hidden="true"
                          sx={{ bgcolor: brand.accentLight, borderRadius: "50%", height: 8, width: 8 }}
                        />
                        <Typography sx={{ color: brand.muted, flexGrow: 1 }} variant="caption">
                          Workflow preview
                        </Typography>
                        <Typography sx={{ color: brand.muted }} variant="caption">
                          For illustration
                        </Typography>
                      </Stack>
                    </Box>
                  </Paper>

                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: "center",
                      bgcolor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 2,
                      p: 1.5,
                    }}
                  >
                    <CallMadeIcon fontSize="small" sx={{ color: brand.accentLight }} />
                    <Box>
                      <Typography component="strong" sx={{ display: "block" }} variant="body2">
                        Connected by design
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.7)" }} variant="caption">
                        Follow activity across teams
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>

            <Typography sx={{ color: "rgba(255,255,255,0.6)", display: "block", mt: 2 }} variant="caption">
              This is an illustrative preview. Product screens and sample figures are for
              demonstration only.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ alignItems: { sm: "center" }, justifyContent: "space-between", mt: 4 }}
            >
              <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body1">
                Want to see how these workflows fit your organization?
              </Typography>
              <PrimaryAction href="/#request-demo" tone="onDark">
                Request a demo
              </PrimaryAction>
            </Stack>
          </Container>
        </Box>
        ) : null}

        {view === "home" ? (
          <>
        <Container id="industries" maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
          <SectionHeading
            eyebrow="Made for complex operations"
            intro="Different industries have different rhythms. A connected ERP should make the important work easier to follow."
            title="Built around how your business works."
          />
          <CardGrid>
            {industryLinks.map((industry) => (
              <NumberedCard
                detail={industry.detail}
                href={industry.href}
                key={industry.number}
                number={industry.number}
                showArrow
                title={industry.title}
              />
            ))}
          </CardGrid>
        </Container>

        <Box
          aria-labelledby="adoption-heading"
          component="section"
          id="adoption"
          sx={{ bgcolor: brand.surfaceDark, color: brand.white, py: { xs: 6, md: 9 } }}
        >
          <Container maxWidth="lg">
            <SectionHeading
              eyebrow="How it goes in"
              intro="Nobody switches an operating business over in an afternoon. ProsERP is configured around the structure a business already has, then takes on more of the work as people trust it."
              light
              title="Going live is a sequence, not a switch."
              titleId="adoption-heading"
            />
            <Box
              sx={{
                alignItems: "start",
                display: "grid",
                gap: { xs: 4, md: 6 },
                gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
              }}
            >
              <Stack spacing={2.5}>
                {adoptionSteps.map((step) => (
                  <Stack direction="row" key={step.number} spacing={2}>
                    <Typography
                      aria-hidden="true"
                      sx={{ color: brand.accentLight, flexShrink: 0, fontWeight: 600, pt: 0.25 }}
                      variant="body2"
                    >
                      {step.number}
                    </Typography>
                    <Box>
                      <Typography component="h3" sx={{ mb: 0.5 }} variant="subtitle1">
                        {step.title}
                      </Typography>
                      <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body2">
                        {step.detail}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
              <Box
                sx={{
                  borderRadius: 3,
                  display: { xs: "none", md: "block" },
                  lineHeight: 0,
                  overflow: "hidden",
                  "& img": { height: "auto", maxWidth: "100%" },
                }}
              >
                <Image
                  alt="A manager reviewing a ProsERP dashboard on a laptop"
                  height={768}
                  sizes="40vw"
                  src="/images/man-in-office.png"
                  width={1254}
                />
              </Box>
            </Box>
          </Container>
        </Box>

        <Box
          aria-labelledby="faqs-heading"
          component="section"
          id="faqs"
          sx={{ bgcolor: brand.white, py: { xs: 6, md: 9 } }}
        >
          <Container maxWidth="lg">
            <Stack spacing={1} sx={{ alignItems: "center", mb: 4, textAlign: "center" }}>
              <Eyebrow>FAQS</Eyebrow>
              <Box aria-hidden="true" sx={{ bgcolor: brand.accent, height: 2, width: 50 }} />
              <Typography component="h2" id="faqs-heading" sx={{ mt: 1 }} variant="h4">
                Frequently asked questions
              </Typography>
            </Stack>
            <Box sx={{ mx: "auto", maxWidth: 760 }}>
              <Box>
                <Typography sx={{ color: brand.muted, mb: 1.5 }} variant="body2">
                  People also ask:
                </Typography>
                {faqs.map((faq) => (
                  <Accordion
                    disableGutters
                    elevation={0}
                    key={faq.question}
                    sx={{
                      border: `1px solid ${brand.line}`,
                      mb: 1,
                      "&::before": { display: "none" },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 600 }} variant="body1">
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ color: brand.muted }} variant="body2">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>

        {/*
          The grid shows only logos with written permission recorded against
          them. With none cleared yet, the section falls back to the unnamed
          formulation docs/product-evidence-register.md recommends: it makes no
          identifiable customer claim, and it keeps #clients-heading alive for
          the header and footer links that point at it.
        */}
        <Box
          aria-labelledby="clients-heading"
          component="section"
          sx={{ bgcolor: brand.paper, py: { xs: 5, md: 7 } }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h2"
              id="clients-heading"
              sx={{ color: brand.muted, fontWeight: 700, mb: 3, textAlign: "center" }}
              variant="caption"
            >
              OUR CLIENTS
            </Typography>
            {clientLogos.length === 0 ? (
              <Typography
                sx={{ color: brand.muted, mx: "auto", maxWidth: 620, textAlign: "center" }}
                variant="body1"
              >
                Used by construction, fuel, trading and manufacturing businesses in Tanzania.
              </Typography>
            ) : (
            <Box
              sx={{
                alignItems: "center",
                display: "grid",
                gap: 2,
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                  lg: "repeat(6, 1fr)",
                },
              }}
            >
              {clientLogos.map((client) => (
                <Paper
                  elevation={0}
                  key={client.src}
                  sx={{
                    alignItems: "center",
                    bgcolor: brand.white,
                    border: `1px solid ${brand.line}`,
                    borderRadius: 2,
                    display: "flex",
                    height: 84,
                    justifyContent: "center",
                    p: 1.5,
                  }}
                  variant="outlined"
                >
                  <Image
                    alt={client.name}
                    height={100}
                    src={client.src}
                    style={{ height: "auto", maxHeight: "100%", maxWidth: "100%", objectFit: "contain", width: "auto" }}
                    width={200}
                  />
                </Paper>
              ))}
            </Box>
            )}
          </Container>
        </Box>
          </>
        ) : null}

        {view === "about" ? (
          <>
        <Container
          aria-labelledby="audience-heading"
          component="section"
          id="who-its-for"
          maxWidth="lg"
          sx={{ py: { xs: 6, md: 9 } }}
        >
          <SectionHeading
            eyebrow="Who ProsERP is for"
            intro="ProsERP is for organizations looking to bring important business activities together and make everyday information easier to follow."
            title="A clearer view as your work grows."
            titleId="audience-heading"
          />
          <CardGrid columns={3}>
            {audienceGroups.map((group) => (
              <NumberedCard
                detail={group.description}
                key={group.number}
                number={group.number}
                title={group.title}
              />
            ))}
          </CardGrid>
        </Container>

        <Box
          aria-labelledby="about-heading"
          component="section"
          id="about"
          sx={{ bgcolor: brand.paper, py: { xs: 6, md: 9 } }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                alignItems: "center",
                display: "grid",
                gap: { xs: 4, md: 6 },
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              <Box
                sx={{
                  borderRadius: 3,
                  lineHeight: 0,
                  overflow: "hidden",
                  "& img": { height: "auto", maxWidth: "100%" },
                }}
              >
                <Image
                  alt="A ProsAfrica team member working at a desk"
                  height={1024}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  src="/images/about-2.png"
                  width={1024}
                />
              </Box>
              <Box>
                <Eyebrow>ABOUT PROSAFRICA</Eyebrow>
                <Box aria-hidden="true" sx={{ bgcolor: brand.accent, height: 2, mt: 1, width: 50 }} />
                <Typography component="h2" id="about-heading" sx={{ mb: 1.5, mt: 1.5 }} variant="h4">
                  Building software around the work businesses do.
                </Typography>
                <Typography sx={{ color: brand.muted, mb: 1 }} variant="body1">
                  ProsERP is software developed by ProsAfrica Limited. It brings key business
                  activities into one system, helping teams keep important information together and
                  follow their operations.
                </Typography>
                <Typography sx={{ color: brand.muted }} variant="body1">
                  Our aim is to help businesses manage their key operations in one system, supported
                  by a monthly subscription service.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <TextLink href="/#request-demo">Talk to our team</TextLink>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
          </>
        ) : null}

        {view === "home" ? (
        <Box
          component="section"
          sx={{
            bgcolor: brand.surfaceDark,
            color: brand.white,
            overflow: "hidden",
            position: "relative",
            py: { xs: 6, md: 9 },
          }}
        >
          <Box
            aria-hidden="true"
            sx={{
              background: `radial-gradient(circle, ${brand.accent}33 0%, transparent 70%)`,
              borderRadius: "50%",
              height: 420,
              position: "absolute",
              right: -120,
              top: -120,
              width: 420,
            }}
          />
          <Container maxWidth="lg" sx={{ position: "relative" }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}
            >
              <Box>
                <Eyebrow light>START WITH A CONVERSATION</Eyebrow>
                <Typography component="h2" sx={{ mt: 0.5 }} variant="h3">
                  Make your next move with the full picture.
                </Typography>
              </Box>
              <Stack spacing={2} sx={{ flexShrink: 0, maxWidth: 360 }}>
                <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body1">
                  Tell us how your business works. We will show you where ProsERP can help.
                </Typography>
                {/* Scrolls to the form below rather than leaving for /request-demo. */}
                <PrimaryAction href="/#request-demo" tone="onDark">
                  Request a demo
                </PrimaryAction>
              </Stack>
            </Stack>
          </Container>
        </Box>
        ) : null}

        {/*
          The demo form is the last thing on the page, directly under the
          closing call to action that points at it.
        */}
        {view === "home" ? (
        <Box
          aria-label="Request a demo"
          component="section"
          id="request-demo"
          sx={{ bgcolor: brand.paper, py: { xs: 6, md: 9 }, scrollMarginTop: 72 }}
        >
          {/*
            No section heading here: DemoRequestForm carries its own "Request a
            demo / Tell us where to start", and it needs to keep it because the
            /request-demo page renders the form on its own.
          */}
          <Container maxWidth="sm">
            <DemoRequestForm />
          </Container>
        </Box>
        ) : null}
      </Box>
      <SiteFooter />
    </>
  );
}
