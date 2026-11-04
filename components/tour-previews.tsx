"use client";

// Product-tour screens for the modules that had no screen of their own: fuel
// stations, manufacturing, bio production, process approval and reporting.
// Each one takes the tour's active step and shows the screen that step is
// about, so stepping through the tour changes what you are looking at.
//
// Built from the erp-screen primitives, like the project and finance previews.
// Every record is visibly sample data — SAMPLE- numbers, "Sample station A" —
// per the evidence register; none of it describes a customer.

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState, type ReactNode } from "react";

import {
  RecordDetail,
  ScreenCaption,
  ScreenCell,
  ScreenFilters,
  ScreenHeading,
  ScreenMetrics,
  ScreenRow,
  ScreenSelect,
  ScreenStaticRow,
  ScreenTable,
  ScreenTabs,
  ScreenToggleGroup,
  StatusBadge,
  toneForStatus,
} from "./erp-screen";
import { brand } from "./theme";

const tzs = (value: number) =>
  `${value < 0 ? "− " : ""}TZS ${new Intl.NumberFormat("en-TZ", { maximumFractionDigits: 0 }).format(Math.abs(value))}`;
const number = (value: number) => new Intl.NumberFormat("en-TZ").format(value);

function Fact({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Typography component="span" variant="caption">
      <Box component="span" sx={{ color: brand.muted }}>
        {label}{" "}
      </Box>
      <Box component="b" sx={{ fontWeight: 700 }}>
        {value}
      </Box>
    </Typography>
  );
}

/**
 * Severity chip for alerts. Critical is a solid error fill with white text
 * (4.53:1); watch is the warning fill with ink text — CLAUDE.md's contrast
 * rules for solid semantic fills.
 */
function SeverityChip({ level }: { level: "critical" | "watch" }) {
  const critical = level === "critical";
  return (
    <Chip
      label={critical ? "Critical" : "Watch"}
      size="small"
      sx={{
        bgcolor: critical ? brand.error : brand.warning,
        color: critical ? brand.white : brand.ink,
        fontWeight: 700,
      }}
    />
  );
}

/** A labelled level bar, for tanks and capacity. */
function LevelBar({ color, value }: { color: string; value: number }) {
  return (
    <LinearProgress
      sx={{
        bgcolor: brand.tintMuted,
        borderRadius: 3,
        height: 8,
        minWidth: 90,
        "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 3 },
      }}
      value={value}
      variant="determinate"
    />
  );
}

/* ------------------------------------------------------------------ Fuel */

const stations = [
  { id: "a", name: "Sample station A", region: "Region 1", shift: "Morning", status: "Open" },
  { id: "b", name: "Sample station B", region: "Region 1", shift: "Morning", status: "Open" },
  { id: "c", name: "Sample station C", region: "Region 2", shift: "Night", status: "Closed" },
  { id: "d", name: "Sample station D", region: "Region 3", shift: "Morning", status: "Pending review" },
];

const shifts = [
  { no: "SAMPLE-SH-014", date: "Day 14", station: "Sample station A", team: "Team 1", litres: 6420, status: "Closed" },
  { no: "SAMPLE-SH-015", date: "Day 14", station: "Sample station A", team: "Team 2", litres: 5180, status: "Pending review" },
  { no: "SAMPLE-SH-016", date: "Day 15", station: "Sample station A", team: "Team 1", litres: 2310, status: "Open" },
];

const tanks = [
  { tank: "Tank 1", fuel: "Petrol", opening: 18400, closing: 12960, capacity: 30000, book: 13020 },
  { tank: "Tank 2", fuel: "Diesel", opening: 22100, closing: 17350, capacity: 30000, book: 17350 },
  { tank: "Tank 3", fuel: "Kerosene", opening: 6200, closing: 5480, capacity: 10000, book: 5530 },
];

export function FuelPreview({ step }: { step: number }) {
  const [stationId, setStationId] = useState(stations[0].id);
  const station = stations.find((item) => item.id === stationId) ?? stations[0];

  if (step === 1) {
    return (
      <Box>
        <ScreenHeading chip="Sample station A" contextLabel="SALES SHIFTS" title="Shifts this week" />
        <ScreenTable ariaLabel="Sample sales shifts" columns={["Shift", "Team", "Litres sold", "Status"]}>
          {shifts.map((shift) => (
            <ScreenStaticRow key={shift.no}>
              <ScreenCell primary={shift.no} secondary={shift.date} />
              <ScreenCell>{shift.team}</ScreenCell>
              <ScreenCell align="right">{number(shift.litres)} L</ScreenCell>
              <StatusBadge tone={toneForStatus(shift.status)}>{shift.status}</StatusBadge>
            </ScreenStaticRow>
          ))}
        </ScreenTable>
        <ScreenCaption left="A shift closes with its dippings and sales together" right="Sample figures" />
      </Box>
    );
  }

  if (step === 2) {
    return (
      <Box>
        <ScreenHeading chip="SAMPLE-SH-015" contextLabel="TANK DIPPINGS" title="Opening and closing readings" />
        <ScreenTable ariaLabel="Sample tank dippings" columns={["Tank", "Opening", "Closing", "Level"]}>
          {tanks.map((tank) => (
            <ScreenStaticRow key={tank.tank}>
              <ScreenCell primary={tank.tank} secondary={tank.fuel} />
              <ScreenCell align="right">{number(tank.opening)} L</ScreenCell>
              <ScreenCell align="right">{number(tank.closing)} L</ScreenCell>
              <ScreenCell>
                <LevelBar color={brand.accent} value={(tank.closing / tank.capacity) * 100} />
              </ScreenCell>
            </ScreenStaticRow>
          ))}
        </ScreenTable>
      </Box>
    );
  }

  if (step === 3) {
    return (
      <Box>
        <ScreenHeading chip="Sample station A" contextLabel="STOCK VARIANCE" title="Book stock against what was dipped" />
        <ScreenTable ariaLabel="Sample stock variance" columns={["Tank", "Book stock", "Dipped", "Variance"]}>
          {tanks.map((tank) => {
            const variance = tank.closing - tank.book;
            return (
              <ScreenStaticRow key={tank.tank}>
                <ScreenCell primary={tank.tank} secondary={tank.fuel} />
                <ScreenCell align="right">{number(tank.book)} L</ScreenCell>
                <ScreenCell align="right">{number(tank.closing)} L</ScreenCell>
                <ScreenCell align="right">
                  <Box component="span" sx={{ color: variance < 0 ? brand.error : brand.success, fontWeight: 700 }}>
                    {variance === 0 ? "0 L" : `${variance > 0 ? "+" : ""}${number(variance)} L`}
                  </Box>
                </ScreenCell>
              </ScreenStaticRow>
            );
          })}
        </ScreenTable>
        <ScreenCaption left="A shortfall shows against the tank and the shift it happened on" right="Sample figures" />
      </Box>
    );
  }

  return (
    <Box>
      <ScreenHeading chip={`${stations.length} stations`} contextLabel="FUEL STATIONS" title="Station network" />
      <ScreenTable ariaLabel="Sample stations" columns={["Station", "Current shift", "Status"]}>
        {stations.map((item) => (
          <ScreenRow
            ariaPressed={item.id === stationId}
            key={item.id}
            onSelect={() => setStationId(item.id)}
            selected={item.id === stationId}
          >
            <ScreenCell primary={item.name} secondary={item.region} />
            <ScreenCell>{item.shift}</ScreenCell>
            <StatusBadge tone={toneForStatus(item.status)}>{item.status}</StatusBadge>
          </ScreenRow>
        ))}
      </ScreenTable>
      <RecordDetail>
        <Typography component="strong" sx={{ fontWeight: 700 }} variant="body2">
          {station.name}
        </Typography>
        <Fact label="Region" value={station.region} />
        <Fact label="Shift" value={station.shift} />
        <Fact label="Tanks" value="3" />
      </RecordDetail>
    </Box>
  );
}

/* --------------------------------------------------------- Manufacturing */

const bomInputs = [
  { input: "Sample raw material 1", qty: "2.50", unit: "kg" },
  { input: "Sample raw material 2", qty: "0.40", unit: "kg" },
  { input: "Sample packaging", qty: "1", unit: "pc" },
  { input: "Sample label", qty: "1", unit: "pc" },
];

const workCenters = [
  { name: "Mixing", batches: 2, load: 70, status: "Active" },
  { name: "Filling", batches: 1, load: 45, status: "Active" },
  { name: "Packing", batches: 0, load: 0, status: "Idle" },
];

const batches = [
  { no: "SAMPLE-PB-021", product: "Sample product A", center: "Mixing", qty: 500, status: "In progress" },
  { no: "SAMPLE-PB-020", product: "Sample product B", center: "Filling", qty: 320, status: "In progress" },
  { no: "SAMPLE-PB-019", product: "Sample product A", center: "Packing", qty: 480, status: "Completed" },
  { no: "SAMPLE-PB-022", product: "Sample product C", center: "Mixing", qty: 250, status: "Not started" },
];

const outputs = [
  { product: "Sample product A", output: 980, unitCost: 4150 },
  { product: "Sample product B", output: 640, unitCost: 6320 },
  { product: "Sample product C", output: 250, unitCost: 3870 },
];

export function ManufacturingPreview({ step }: { step: number }) {
  const [view, setView] = useState<"Output" | "Cost">("Output");

  if (step === 1) {
    return (
      <Box>
        <ScreenHeading chip={`${workCenters.length} centers`} contextLabel="WORK CENTERS" title="Where production happens" />
        <ScreenTable ariaLabel="Sample work centers" columns={["Work center", "Open batches", "Load", "Status"]}>
          {workCenters.map((center) => (
            <ScreenStaticRow key={center.name}>
              <ScreenCell primary={center.name} />
              <ScreenCell align="right">{center.batches}</ScreenCell>
              <ScreenCell>
                <LevelBar color={brand.primary} value={center.load} />
              </ScreenCell>
              <StatusBadge tone={toneForStatus(center.status)}>{center.status}</StatusBadge>
            </ScreenStaticRow>
          ))}
        </ScreenTable>
      </Box>
    );
  }

  if (step === 2) {
    return (
      <Box>
        <ScreenHeading chip={`${batches.length} batches`} contextLabel="PRODUCTION BATCHES" title="Batches this period" />
        <ScreenTable ariaLabel="Sample production batches" columns={["Batch", "Work center", "Quantity", "Status"]}>
          {batches.map((batch) => (
            <ScreenStaticRow key={batch.no}>
              <ScreenCell primary={batch.no} secondary={batch.product} />
              <ScreenCell>{batch.center}</ScreenCell>
              <ScreenCell align="right">{number(batch.qty)}</ScreenCell>
              <StatusBadge tone={toneForStatus(batch.status)}>{batch.status}</StatusBadge>
            </ScreenStaticRow>
          ))}
        </ScreenTable>
      </Box>
    );
  }

  if (step === 3) {
    const max = Math.max(...outputs.map((row) => (view === "Output" ? row.output : row.unitCost)));
    return (
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ alignItems: { sm: "center" }, justifyContent: "space-between", mb: 1.5 }}
        >
          <Box>
            <Typography sx={{ color: brand.muted, display: "block" }} variant="caption">
              OUTPUT &amp; COST · THIS MONTH
            </Typography>
            <Typography component="strong" sx={{ fontWeight: 700 }} variant="body1">
              By product
            </Typography>
          </Box>
          <ScreenToggleGroup<"Output" | "Cost"> active={view} ariaLabel="Report view" onChange={setView} options={["Output", "Cost"] as const} />
        </Stack>
        <Stack spacing={1.25}>
          {outputs.map((row) => {
            const value = view === "Output" ? row.output : row.unitCost;
            return (
              <Box key={row.product}>
                <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2">{row.product}</Typography>
                  <Typography sx={{ fontWeight: 700 }} variant="body2">
                    {view === "Output" ? `${number(value)} units` : `${tzs(value)} / unit`}
                  </Typography>
                </Stack>
                <LevelBar color={view === "Output" ? brand.primary : brand.accent} value={(value / max) * 100} />
              </Box>
            );
          })}
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      <ScreenHeading chip="BOM" contextLabel="BILL OF MATERIALS" title="Sample product A · per unit" />
      <ScreenTable ariaLabel="Sample bill of materials" columns={["Input", "Quantity", "Unit"]}>
        {bomInputs.map((row) => (
          <ScreenStaticRow key={row.input}>
            <ScreenCell primary={row.input} />
            <ScreenCell align="right">{row.qty}</ScreenCell>
            <ScreenCell>{row.unit}</ScreenCell>
          </ScreenStaticRow>
        ))}
      </ScreenTable>
      <ScreenCaption left="Each batch draws these inputs from stock" right="Sample recipe" />
    </Box>
  );
}

/* -------------------------------------------------------- Bio production */

const units = [
  { name: "Pond P-01", type: "Pond", group: "Line 1", batch: "SAMPLE-B-07", fill: 82 },
  { name: "Pond P-02", type: "Pond", group: "Line 1", batch: "SAMPLE-B-08", fill: 64 },
  { name: "Cage C-03", type: "Cage", group: "Line 2", batch: "SAMPLE-B-05", fill: 91 },
  { name: "House H-01", type: "House", group: "Block A", batch: "—", fill: 0 },
];

type BioRecordTab = "feeding" | "mortality" | "weights" | "measurements";

const bioRecords: Record<BioRecordTab, { columns: string[]; rows: string[][] }> = {
  feeding: {
    columns: ["Batch", "Product", "Quantity"],
    rows: [
      ["SAMPLE-B-07", "Sample feed 2 mm", "45 kg"],
      ["SAMPLE-B-08", "Sample feed 2 mm", "38 kg"],
      ["SAMPLE-B-05", "Sample feed 4 mm", "60 kg"],
    ],
  },
  mortality: {
    columns: ["Batch", "Cause", "Count"],
    rows: [
      ["SAMPLE-B-07", "Handling", "12"],
      ["SAMPLE-B-05", "Unknown", "4"],
    ],
  },
  weights: {
    columns: ["Batch", "Sample size", "Average weight"],
    rows: [
      ["SAMPLE-B-07", "30", "148 g"],
      ["SAMPLE-B-08", "30", "96 g"],
    ],
  },
  measurements: {
    columns: ["Unit", "Parameter", "Reading"],
    rows: [
      ["Pond P-01", "Water temperature", "27.4 °C"],
      ["Pond P-02", "Dissolved oxygen", "3.1 mg/L"],
      ["Pond P-01", "pH", "7.6"],
    ],
  },
};

const bioAlerts: { level: "critical" | "watch"; title: string; detail: string }[] = [
  { level: "critical", title: "Pond P-02", detail: "Dissolved oxygen outside the critical range" },
  { level: "watch", title: "SAMPLE-B-05", detail: "No feed recorded for 2 days" },
  { level: "watch", title: "Cage C-03", detail: "Last measured 3 days ago" },
  { level: "watch", title: "SAMPLE-B-08", detail: "4 days past the expected 30 days in Nursery" },
];

export function BioProductionPreview({ step }: { step: number }) {
  const [tab, setTab] = useState<BioRecordTab>("feeding");
  const [unitName, setUnitName] = useState(units[0].name);
  const unit = units.find((item) => item.name === unitName) ?? units[0];

  if (step === 1) {
    const records = bioRecords[tab];
    return (
      <Box>
        <ScreenHeading chip="Day 42" contextLabel="DAILY RECORDS" title="Sample farm · today" />
        <ScreenTabs<BioRecordTab>
          active={tab}
          ariaLabel="Record type"
          onChange={setTab}
          tabs={[
            { label: "Feeding", value: "feeding" },
            { label: "Mortality", value: "mortality" },
            { label: "Weight samples", value: "weights" },
            { label: "Measurements", value: "measurements" },
          ]}
        />
        <Box sx={{ mt: 1.5 }}>
          <ScreenTable ariaLabel={`Sample ${tab} records`} columns={records.columns}>
            {records.rows.map((row) => (
              <ScreenStaticRow key={row.join("-")}>
                <ScreenCell primary={row[0]} />
                <ScreenCell>{row[1]}</ScreenCell>
                <ScreenCell align="right">{row[2]}</ScreenCell>
              </ScreenStaticRow>
            ))}
          </ScreenTable>
        </Box>
      </Box>
    );
  }

  if (step === 2) {
    return (
      <Box>
        <ScreenHeading chip="Last 30 days" contextLabel="DASHBOARD" title="Sample farm" />
        <ScreenMetrics
          items={[
            { label: "Open batches", value: "3" },
            { label: "Alive", value: "18,240" },
            { label: "Deaths", value: "212" },
            { label: "FCR", value: "1.42" },
          ]}
        />
        <Typography sx={{ color: brand.muted, display: "block", fontWeight: 700, mb: 1 }} variant="caption">
          NEEDS ATTENTION
        </Typography>
        <Stack spacing={1}>
          {bioAlerts.map((alert) => (
            <Stack
              direction="row"
              key={alert.title + alert.detail}
              spacing={1.5}
              sx={{
                alignItems: "center",
                border: `1px solid ${brand.line}`,
                borderLeft: `4px solid ${alert.level === "critical" ? brand.error : brand.warning}`,
                borderRadius: 2,
                px: 1.5,
                py: 1,
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700 }} variant="body2">
                  {alert.title}
                </Typography>
                <Typography sx={{ color: brand.muted }} variant="caption">
                  {alert.detail}
                </Typography>
              </Box>
              <SeverityChip level={alert.level} />
            </Stack>
          ))}
        </Stack>
      </Box>
    );
  }

  if (step === 3) {
    return (
      <Box>
        <ScreenHeading chip="Grow-out" contextLabel="BATCH COSTS" title="SAMPLE-B-07 · Pond P-01" />
        <ScreenMetrics
          items={[
            { label: "Cost accrued", value: tzs(14_860_000) },
            { label: "Written off", value: tzs(420_000) },
            { label: "Moved to stock", value: tzs(6_100_000) },
            { label: "Cost in WIP", value: tzs(8_340_000) },
          ]}
        />
        <ScreenTable ariaLabel="Sample harvests" columns={["Harvest", "Product", "Quantity", "Status"]}>
          <ScreenStaticRow>
            <ScreenCell primary="SAMPLE-H-03" secondary="Partial harvest" />
            <ScreenCell>Sample fish, whole</ScreenCell>
            <ScreenCell align="right">1,250 kg</ScreenCell>
            <StatusBadge tone="complete">Received</StatusBadge>
          </ScreenStaticRow>
          <ScreenStaticRow>
            <ScreenCell primary="SAMPLE-H-04" secondary="Final harvest" />
            <ScreenCell>Sample fish, whole</ScreenCell>
            <ScreenCell align="right">—</ScreenCell>
            <StatusBadge tone="progress">Pending</StatusBadge>
          </ScreenStaticRow>
        </ScreenTable>
        <ScreenCaption left="Harvest goes into stock carrying the batch's cost" right="Sample figures" />
      </Box>
    );
  }

  return (
    <Box>
      <ScreenHeading chip={`${units.length} units`} contextLabel="PRODUCTION UNITS" title="Sample farm" />
      <ScreenTable ariaLabel="Sample production units" columns={["Unit", "Group", "Batch", "Occupancy"]}>
        {units.map((item) => (
          <ScreenRow
            ariaPressed={item.name === unitName}
            key={item.name}
            onSelect={() => setUnitName(item.name)}
            selected={item.name === unitName}
          >
            <ScreenCell primary={item.name} secondary={item.type} />
            <ScreenCell>{item.group}</ScreenCell>
            <ScreenCell>{item.batch}</ScreenCell>
            <ScreenCell>
              <LevelBar color={brand.accent} value={item.fill} />
            </ScreenCell>
          </ScreenRow>
        ))}
      </ScreenTable>
      <RecordDetail>
        <Typography component="strong" sx={{ fontWeight: 700 }} variant="body2">
          {unit.name}
        </Typography>
        <Fact label="Type" value={unit.type} />
        <Fact label="Group" value={unit.group} />
        <Fact label="Batch" value={unit.batch} />
      </RecordDetail>
    </Box>
  );
}

/* ------------------------------------------------------ Process approval */

const requisitions = [
  { no: "RQ/EXAMPLE-01", type: "Purchase", center: "Head office", amount: 2_450_000, role: "Head of department", status: "Pending" },
  { no: "RQ/EXAMPLE-02", type: "Payment", center: "Project cost center", amount: 8_900_000, role: "General Manager", status: "Pending" },
  { no: "RQ/EXAMPLE-03", type: "Imprest", center: "Sample station A", amount: 650_000, role: "Accountant", status: "Approved" },
  { no: "RQ/EXAMPLE-04", type: "Purchase", center: "Sample farm", amount: 1_120_000, role: "General Manager", status: "Approved" },
];

const chain = [
  { role: "Requested by", who: "Sample user", status: "Done" },
  { role: "Head of department", who: "Sample approver 1", status: "Done" },
  { role: "General Manager", who: "Sample approver 2", status: "Current" },
  { role: "Accountant", who: "Sample approver 3", status: "Next" },
];

export function ProcessApprovalPreview({ step }: { step: number }) {
  const [type, setType] = useState("All types");
  const [status, setStatus] = useState("All statuses");

  const table = (rows: typeof requisitions) => (
    <ScreenTable ariaLabel="Sample requisitions" columns={["Requisition", "Cost center", "Amount", "Status"]}>
      {rows.map((row) => (
        <ScreenStaticRow key={row.no}>
          <ScreenCell primary={row.no} secondary={row.type} />
          <ScreenCell>{row.center}</ScreenCell>
          <ScreenCell align="right">{tzs(row.amount)}</ScreenCell>
          <StatusBadge tone={toneForStatus(row.status)}>{row.status}</StatusBadge>
        </ScreenStaticRow>
      ))}
    </ScreenTable>
  );

  if (step === 1) {
    return (
      <Box>
        <ScreenHeading chip="Purchase" contextLabel="RQ/EXAMPLE-02" title="Approval chain" />
        <Stack spacing={0}>
          {chain.map((link, index) => {
            const current = link.status === "Current";
            const done = link.status === "Done";
            return (
              <Stack direction="row" key={link.role} spacing={1.5}>
                <Stack sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      bgcolor: done ? brand.success : current ? brand.primary : brand.white,
                      border: `2px solid ${done ? brand.success : current ? brand.primary : brand.line}`,
                      borderRadius: "50%",
                      height: 16,
                      mt: 0.5,
                      width: 16,
                    }}
                  />
                  {index < chain.length - 1 ? (
                    <Box sx={{ bgcolor: done ? brand.success : brand.line, flexGrow: 1, minHeight: 28, width: 2 }} />
                  ) : null}
                </Stack>
                <Box
                  sx={{
                    bgcolor: current ? brand.tintAccent : "transparent",
                    borderRadius: 2,
                    flexGrow: 1,
                    mb: 1,
                    px: 1.25,
                    py: 0.75,
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }} variant="body2">
                    {link.role}
                  </Typography>
                  <Typography sx={{ color: brand.muted }} variant="caption">
                    {link.who} · {done ? "Approved" : current ? "Awaiting review" : "Next in line"}
                  </Typography>
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    );
  }

  if (step === 2) {
    const rows = requisitions.filter(
      (row) => (type === "All types" || row.type === type) && (status === "All statuses" || row.status === status),
    );
    return (
      <Box>
        <ScreenHeading chip={`${rows.length} shown`} contextLabel="REQUISITIONS" title="Filter the queue" />
        <ScreenFilters>
          <ScreenSelect
            ariaLabel="Filter by type"
            label="Type"
            onChange={setType}
            options={["All types", "Purchase", "Payment", "Imprest"]}
            value={type}
          />
          <ScreenSelect
            ariaLabel="Filter by status"
            label="Status"
            onChange={setStatus}
            options={["All statuses", "Pending", "Approved"]}
            value={status}
          />
        </ScreenFilters>
        {rows.length > 0 ? (
          table(rows)
        ) : (
          <Typography sx={{ color: brand.muted }} variant="body2">
            No sample requisitions match these filters.
          </Typography>
        )}
      </Box>
    );
  }

  if (step === 3) {
    const history = [
      { when: "Day 1, 09:12", what: "Submitted by Sample user", status: "Recorded" },
      { when: "Day 1, 14:40", what: "Approved by Head of department", status: "Approved" },
      { when: "Day 2, 10:05", what: "Approved by General Manager", status: "Approved" },
      { when: "Day 2, 16:30", what: "Paid from the approved payments list", status: "Paid" },
    ];
    return (
      <Box>
        <ScreenHeading chip="Approved" contextLabel="RQ/EXAMPLE-04" title="What happened to this request" />
        <ScreenTable ariaLabel="Sample requisition history" columns={["When", "Event", "Status"]}>
          {history.map((event) => (
            <ScreenStaticRow key={event.when}>
              <ScreenCell>{event.when}</ScreenCell>
              <ScreenCell primary={event.what} />
              <StatusBadge tone={toneForStatus(event.status)}>{event.status}</StatusBadge>
            </ScreenStaticRow>
          ))}
        </ScreenTable>
      </Box>
    );
  }

  return (
    <Box>
      <ScreenHeading chip={`${requisitions.length} requisitions`} contextLabel="PROCESS APPROVAL" title="My requisitions" />
      {table(requisitions)}
      <ScreenCaption left="Purchase, payment and imprest requests in one list" right="Sample records" />
    </Box>
  );
}

/* ------------------------------------------------------------- Reporting */

const operationalReports = [
  { name: "Stock report", module: "Inventory", period: "As at today" },
  { name: "Item movement", module: "Inventory", period: "This month" },
  { name: "Sales & cash summary", module: "Point of sale", period: "This week" },
  { name: "Station operations", module: "Fuel stations", period: "This month" },
  { name: "Batch performance", module: "Bio production", period: "Last 30 days" },
];

const incomeLines = {
  "This month": [
    { line: "Revenue", value: 186_400_000 },
    { line: "Cost of sales", value: -118_250_000 },
    { line: "Gross profit", value: 68_150_000, total: true },
    { line: "Operating expenses", value: -41_900_000 },
    { line: "Net profit", value: 26_250_000, total: true },
  ],
  "Last month": [
    { line: "Revenue", value: 171_800_000 },
    { line: "Cost of sales", value: -112_600_000 },
    { line: "Gross profit", value: 59_200_000, total: true },
    { line: "Operating expenses", value: -40_300_000 },
    { line: "Net profit", value: 18_900_000, total: true },
  ],
} as const;

const drillDown = [
  { doc: "INV/EXAMPLE-118", source: "Customer invoice", value: 4_850_000 },
  { doc: "POS/EXAMPLE-2041", source: "Sales counter", value: 1_230_000 },
  { doc: "SH/EXAMPLE-015", source: "Fuel sales shift", value: 9_610_000 },
];

export function ReportingPreview({ step }: { step: number }) {
  const [period, setPeriod] = useState<"This month" | "Last month">("This month");

  if (step === 1) {
    return (
      <Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ alignItems: { sm: "center" }, justifyContent: "space-between", mb: 1.5 }}
        >
          <Box>
            <Typography sx={{ color: brand.muted, display: "block" }} variant="caption">
              FINANCIAL REPORTS
            </Typography>
            <Typography component="strong" sx={{ fontWeight: 700 }} variant="body1">
              Income statement
            </Typography>
          </Box>
          <ScreenToggleGroup<"This month" | "Last month">
            active={period}
            ariaLabel="Period"
            onChange={setPeriod}
            options={["This month", "Last month"] as const}
          />
        </Stack>
        <ScreenTable ariaLabel="Sample income statement" columns={["Line", "Amount"]}>
          {incomeLines[period].map((row) => (
            <ScreenStaticRow key={row.line}>
              <ScreenCell>
                <Box component="span" sx={{ fontWeight: "total" in row ? 700 : 400 }}>
                  {row.line}
                </Box>
              </ScreenCell>
              <ScreenCell align="right">
                <Box component="span" sx={{ fontWeight: "total" in row ? 700 : 400 }}>
                  {tzs(row.value)}
                </Box>
              </ScreenCell>
            </ScreenStaticRow>
          ))}
        </ScreenTable>
      </Box>
    );
  }

  if (step === 2) {
    return (
      <Box>
        <ScreenHeading chip="Drill down" contextLabel="REVENUE · THIS MONTH" title={tzs(186_400_000)} />
        <Typography sx={{ color: brand.muted, display: "block", mb: 1 }} variant="caption">
          The figure opens into the records that produced it
        </Typography>
        <ScreenTable ariaLabel="Sample source documents" columns={["Document", "Source", "Amount"]}>
          {drillDown.map((row) => (
            <ScreenStaticRow key={row.doc}>
              <ScreenCell primary={row.doc} />
              <ScreenCell>{row.source}</ScreenCell>
              <ScreenCell align="right">{tzs(row.value)}</ScreenCell>
            </ScreenStaticRow>
          ))}
        </ScreenTable>
        <ScreenCaption left="Showing 3 of the period's documents" right="Sample records" />
      </Box>
    );
  }

  return (
    <Box>
      <ScreenHeading chip={`${operationalReports.length} reports`} contextLabel="REPORTS" title="Operational reports" />
      <ScreenTable ariaLabel="Sample operational reports" columns={["Report", "Module", "Period"]}>
        {operationalReports.map((report) => (
          <ScreenStaticRow key={report.name}>
            <ScreenCell primary={report.name} />
            <ScreenCell>{report.module}</ScreenCell>
            <ScreenCell>{report.period}</ScreenCell>
          </ScreenStaticRow>
        ))}
      </ScreenTable>
    </Box>
  );
}
