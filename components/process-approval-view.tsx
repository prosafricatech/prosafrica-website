"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { ScreenCaption, ScreenCell, ScreenHeading, ScreenStaticRow, ScreenTable } from "./erp-screen";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { brand } from "./theme";

const exampleRequests = [
  {
    context: "Head Office",
    number: "RQ/EXAMPLE-01",
    owner: "Administrator",
    status: "Approved",
    tone: "complete" as const,
    type: "Purchase",
  },
  {
    context: "Project cost center",
    number: "RQ/EXAMPLE-02",
    owner: "General Manager",
    status: "Awaiting review",
    tone: "progress" as const,
    type: "Payment",
  },
  {
    context: "Project cost center",
    number: "RQ/EXAMPLE-03",
    owner: "Administrator",
    status: "Awaiting review",
    tone: "progress" as const,
    type: "Imprest",
  },
];

const features = [
  {
    description:
      "Review request type, cost center, amount and status, then open a request to inspect its line items and totals.",
    number: "01",
    title: "A clear requisition and detail view",
  },
  {
    description:
      "See the approver role displayed on a request, such as Administrator or General Manager.",
    number: "02",
    title: "Approval ownership in view",
  },
  {
    description:
      "Narrow the list by request type or cost center, or focus on requisitions you requested.",
    number: "03",
    title: "Useful ways to filter",
  },
  {
    description:
      "Keep purchase and payment requests visible alongside the operational teams and records they relate to.",
    number: "04",
    title: "A link to business operations",
  },
];

const approvalWorkflows = [
  {
    description:
      "Review retirement date, linked requisition, cost center, amount and approval status.",
    number: "01",
    title: "Retirement tracking",
  },
  {
    description:
      "Find leave requests using search and a Waiting For filter to follow review ownership.",
    number: "02",
    title: "Leave requests",
  },
  {
    description:
      "Review requested amount, installment term, request date and status, with employee and status filters.",
    number: "03",
    title: "Employee loan requests",
  },
  {
    description:
      "Browse company-wide payroll runs by period, see their status and filter by Waiting For.",
    number: "04",
    title: "Payroll period approvals",
  },
];

function CardGrid({ items }: { items: { description: string; number: string; title: string }[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
      }}
    >
      {items.map((item) => (
        <Paper
          component="article"
          elevation={0}
          key={item.number}
          sx={{ border: `1px solid ${brand.line}`, borderRadius: 3, p: 2.5 }}
          variant="outlined"
        >
          <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
            {item.number}
          </Typography>
          <Typography component="h3" sx={{ mb: 0.75, mt: 0.5 }} variant="subtitle1">
            {item.title}
          </Typography>
          <Typography sx={{ color: brand.muted }} variant="body2">
            {item.description}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

function SectionHeading({ eyebrow, intro, title }: { eyebrow: string; intro: string; title: string }) {
  return (
    <Box
      sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, mb: 4 }}
    >
      <Box>
        <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
          {eyebrow.toUpperCase()}
        </Typography>
        <Typography component="h2" variant="h4">
          {title}
        </Typography>
      </Box>
      <Typography sx={{ color: brand.muted }} variant="body1">
        {intro}
      </Typography>
    </Box>
  );
}

export function ProcessApprovalView() {
  return (
    <>
      <SiteHeader />
      <Box component="main">
        {/* Hero */}
        <Box sx={{ bgcolor: brand.surfaceDark, color: brand.white, py: { xs: 6, md: 9 } }}>
          <Container maxWidth="lg">
            <Box
              sx={{
                alignItems: "start",
                display: "grid",
                gap: { xs: 4, md: 6 },
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              <Stack spacing={2}>
                <Button
                  component={Link}
                  href="/#platform"
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    alignSelf: "flex-start",
                    color: "rgba(255,255,255,0.75)",
                    textTransform: "none",
                  }}
                >
                  Back to platform
                </Button>
                <Typography sx={{ color: brand.accentLight, fontWeight: 700 }} variant="caption">
                  PROCESS APPROVAL
                </Typography>
                <Typography component="h1" variant="h3">
                  Make requests and review status easier to follow.
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)" }} variant="body1">
                  Give teams a dedicated view of requisitions and approvals. Check what type of
                  request it is, which cost center it relates to, the role shown for approval, and
                  its current status.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 1 }}>
                  <Button
                    component={Link}
                    endIcon={<ArrowForwardIcon />}
                    href="/#request-demo"
                    sx={{
                      bgcolor: brand.primary,
                      color: brand.white,
                      fontWeight: 700,
                      textTransform: "none",
                      "&:hover": { bgcolor: brand.primaryDark },
                    }}
                    variant="contained"
                  >
                    Request a demo
                  </Button>
                  <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    href="#overview"
                    sx={{ color: brand.white, textTransform: "none" }}
                  >
                    See the overview
                  </Button>
                </Stack>
              </Stack>

              {/* Illustrative approval queue */}
              <Paper
                aria-label="Illustrative requisition approval queue using sample data"
                elevation={0}
                sx={{ bgcolor: brand.white, borderRadius: 3, p: 2 }}
              >
                <ScreenHeading
                  chip="SAMPLE DATA"
                  contextLabel="PROCESS APPROVAL"
                  title="Requisition overview"
                />
                <ScreenCaption
                  left="Type · All types · Cost center · All centers"
                  right="My requests"
                />
                <ScreenTable
                  ariaLabel="Illustrative requisition queue"
                  columns={["Request", "Type & context", "Approval status"]}
                >
                  {exampleRequests.map((request) => (
                    <ScreenStaticRow key={request.number}>
                      <ScreenCell primary={request.number} secondary="Requisition" />
                      <ScreenCell primary={request.type} secondary={request.context} />
                      <ScreenCell>
                        <Stack spacing={0.5} sx={{ alignItems: "flex-start" }}>
                          <Typography component="strong" variant="body2">
                            {request.owner}
                          </Typography>
                          <Chip
                            label={request.status}
                            size="small"
                            sx={{
                              bgcolor:
                                request.tone === "complete"
                                  ? brand.tintSuccess
                                  : brand.tintPrimary,
                              color: brand.ink,
                              fontWeight: 600,
                            }}
                          />
                        </Stack>
                      </ScreenCell>
                    </ScreenStaticRow>
                  ))}
                </ScreenTable>

                <Accordion
                  disableGutters
                  elevation={0}
                  sx={{ border: `1px solid ${brand.line}`, borderRadius: 2, mt: 2 }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box>
                      <Typography component="strong" variant="body2">
                        Open a sample requisition
                      </Typography>
                      <Typography sx={{ color: brand.muted, display: "block" }} variant="caption">
                        View line items and approval details
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      }}
                    >
                      <LabelledValue label="REQUEST TYPE" value="Purchase requisition" />
                      <LabelledValue label="REFERENCE" value="RQ/EXAMPLE-01" />
                      <LabelledValue label="Approval date" value="Example date" />
                      <LabelledValue label="Date required" value="Not specified" />
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <ScreenTable
                      ariaLabel="Illustrative requisition line items"
                      columns={["Product", "Quantity", "Rate", "Amount"]}
                    >
                      <ScreenStaticRow>
                        <ScreenCell>Office furniture</ScreenCell>
                        <ScreenCell>6 items</ScreenCell>
                        <ScreenCell>TZS 1,000,000</ScreenCell>
                        <ScreenCell>TZS 6,000,000</ScreenCell>
                      </ScreenStaticRow>
                    </ScreenTable>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ justifyContent: "space-between", mt: 2 }}
                    >
                      <Typography sx={{ color: brand.muted }} variant="body2">
                        Total
                      </Typography>
                      <Typography component="strong" variant="subtitle2">
                        TZS 6,000,000
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Box
                      sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      }}
                    >
                      <LabelledValue label="Requested by" value="Example requester" />
                      <LabelledValue label="Approved by" value="Example approver" />
                    </Box>
                    <Typography sx={{ color: brand.muted, display: "block", mt: 2 }} variant="caption">
                      Illustrative details only. Actual fields vary by request type.
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 2 }}>
                  <Box
                    aria-hidden="true"
                    sx={{ bgcolor: brand.accentLight, borderRadius: "50%", height: 8, width: 8 }}
                  />
                  <Typography sx={{ color: brand.muted }} variant="caption">
                    Illustrative interface · not live business records
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          </Container>
        </Box>

        <Container id="overview" maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
          <SectionHeading
            eyebrow="Visibility from request to review"
            intro="The live ProsERP demo shows separate Requisitions and Approvals views. Lists include request type, cost center or business context, amount and a status or approval role."
            title="Keep the request and its status together."
          />
          <CardGrid items={features} />
        </Container>

        <Box sx={{ bgcolor: brand.paper, py: { xs: 6, md: 9 } }}>
          <Container maxWidth="lg">
            <SectionHeading
              eyebrow="More than requisitions"
              intro="The live demo also includes retirement, leave, employee loan and payroll approval views. Each supports its own request or period context."
              title="Follow review across people and operations."
            />
            <CardGrid items={approvalWorkflows} />
          </Container>
        </Box>

        <Box sx={{ bgcolor: brand.surfaceDark, color: brand.white, py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Stack spacing={3}>
              <Box>
                <Typography sx={{ color: brand.accentLight, fontWeight: 700 }} variant="caption">
                  PART OF CONNECTED OPERATIONS
                </Typography>
                <Typography component="h2" variant="h4">
                  Requests relate to real work.
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }} variant="body1">
                  Purchase requests can connect to procurement activity, while payment requests
                  connect to financial workflows. ProsERP keeps these processes within the same
                  operating picture.
                </Typography>
              </Box>
              <Stack
                aria-label="Illustrative connected workflow"
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ alignItems: { sm: "center" } }}
              >
                {["Requisition", "Approval status", "Related operation"].map((step, index) => (
                  <Stack direction="row" key={step} spacing={1.5} sx={{ alignItems: "center" }}>
                    <Chip
                      label={step}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: brand.white,
                        fontWeight: 600,
                      }}
                    />
                    {index < 2 ? (
                      <ArrowForwardIcon fontSize="small" sx={{ color: brand.accentLight }} />
                    ) : null}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ alignItems: { md: "center" }, justifyContent: "space-between" }}
          >
            <Box>
              <Typography sx={{ color: brand.muted, fontWeight: 700 }} variant="caption">
                A WORKFLOW SHAPED AROUND YOUR BUSINESS
              </Typography>
              <Typography component="h2" variant="h5">
                See process approval in a guided ProsERP demo.
              </Typography>
            </Box>
            <Button
              component={Link}
              endIcon={<ArrowForwardIcon />}
              href="/#request-demo"
              size="large"
              sx={{
                bgcolor: brand.primary,
                color: brand.white,
                flexShrink: 0,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: brand.primaryDark },
              }}
              variant="contained"
            >
              Request a demo
            </Button>
          </Stack>
        </Container>
      </Box>
      <SiteFooter />
    </>
  );
}

function LabelledValue({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography sx={{ color: brand.muted, display: "block" }} variant="caption">
        {label}
      </Typography>
      <Typography component="strong" variant="body2">
        {value}
      </Typography>
    </Box>
  );
}

