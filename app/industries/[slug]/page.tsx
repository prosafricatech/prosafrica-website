import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryView } from "../../../components/industry-view";

const industryPages = {
  "projects-construction": {
    number: "01",
    name: "Projects & construction",
    eyebrow: "Project operations",
    title: "Keep the plan, the site and the numbers in view.",
    description:
      "Coordinate project budgets, deliverables, work breakdown, subcontractors, claims and site stores from a connected operational view.",
    accent: "Project control",
    summary: "Project execution",
    measure: "65.7%",
    measureLabel: "Illustrative execution progress",
    flow: ["Project plan", "Budget & WBS", "Claims & stores", "Execution view"],
    steps: [
      { icon: "plan", title: "Project plan", detail: "Deliverables and work breakdown set up for each project.", visual: "timeline" },
      { icon: "tree", title: "Budget & WBS", detail: "A budget held against every task in the breakdown.", visual: "bars" },
      { icon: "stores", title: "Claims & stores", detail: "Subcontractor claims and site requisitions recorded against the project.", visual: "list" },
      { icon: "insights", title: "Execution view", detail: "Progress and project finances read together.", visual: "progress" },
    ],
    related: [
      ["Process approval", "Keep project-related requests and review decisions within a visible workflow."],
      ["Procurement", "Link project requirements to purchasing workflows."],
      ["Finance", "Review budgets, transactions and reporting alongside project activity."],
      ["Inventory", "Track material issues and consumption associated with project work."],
    ],
  },
  "fuel-stations": {
    number: "02",
    name: "Fuel stations",
    eyebrow: "Fuel operations",
    title: "Follow every station from shift to stock.",
    description:
      "Review station activity through sales shifts, fuel dippings, tank stock and reports, with a clear view across locations.",
    accent: "Station oversight",
    summary: "Station network",
    measure: "07",
    measureLabel: "Locations in the demo",
    flow: ["Station", "Sales shift", "Tank dipping", "Operations report"],
    steps: [
      { icon: "station", title: "Station", detail: "Pick a station from the network and focus on it.", visual: "locations" },
      { icon: "shift", title: "Sales shift", detail: "Shift dates, teams and status for the station.", visual: "list" },
      { icon: "tank", title: "Tank dipping", detail: "Dipping records tied to the shift they were taken in.", visual: "tank" },
      { icon: "report", title: "Operations report", detail: "Dipping, tank stock and shift reports.", visual: "bars" },
    ],
    related: [
      ["Process approval", "Support review steps around operational requests and business decisions."],
      ["Finance", "Connect operating activity to financial visibility and reporting."],
      ["Inventory", "Review stock movement and fuel availability by location."],
      ["Point of sale", "Bring sales activity into the wider operational picture."],
    ],
  },
  manufacturing: {
    number: "03",
    name: "Manufacturing",
    eyebrow: "Production operations",
    title: "Connect the product recipe to production results.",
    description:
      "Bring bills of materials, work centers, production batches and output or cost reporting into a single workflow.",
    accent: "Production control",
    summary: "Production workflow",
    measure: "BOM",
    measureLabel: "Product recipe",
    flow: ["Bill of materials", "Work center", "Production batch", "Output & cost"],
    steps: [
      { icon: "recipe", title: "Bill of materials", detail: "The inputs that make up each finished product.", visual: "tree" },
      { icon: "factory", title: "Work center", detail: "Production organised by the work center doing it.", visual: "locations" },
      { icon: "batch", title: "Production batch", detail: "Batch dates and status followed through.", visual: "list" },
      { icon: "report", title: "Output & cost", detail: "Output or cost reported by period and product.", visual: "bars" },
    ],
    related: [
      ["Process approval", "Keep business requests connected to review and approval activity."],
      ["Procurement", "Connect purchasing and supplier processes to material needs."],
      ["Inventory", "Keep material and finished-product activity connected to operations."],
      ["Finance", "Review the cost and financial context around production."],
    ],
  },
  "trading-distribution": {
    number: "04",
    name: "Trading & distribution",
    eyebrow: "Trading operations",
    title: "Bring buying, stock and sales into one view.",
    description:
      "Follow purchasing through receiving, stores, outlets and sales activity, with financial visibility alongside the work.",
    accent: "Commercial operations",
    summary: "Connected operations",
    measure: "04",
    measureLabel: "Connected work areas",
    flow: ["Purchase order", "Goods receipt", "Store & stock", "Outlet sales"],
    steps: [
      { icon: "order", title: "Purchase order", detail: "Orders issued and kept against the supplier.", visual: "list" },
      { icon: "receipt", title: "Goods receipt", detail: "Receiving recorded against the order it fills.", visual: "progress" },
      { icon: "warehouse", title: "Store & stock", detail: "Stock and consumption by store.", visual: "tank" },
      { icon: "pos", title: "Outlet sales", detail: "Sales by counter and outlet.", visual: "bars" },
    ],
    related: [
      ["Process approval", "Make review and decision steps visible around business requests."],
      ["Procurement", "Connect purchase orders, goods received and purchasing reports."],
      ["Point of sale", "Review sales activity by outlet and counter."],
      ["Finance", "Keep operational purchasing and sales visible alongside financial reporting."],
    ],
  },
  "agriculture-aquaculture": {
    number: "05",
    name: "Agriculture & aquaculture",
    eyebrow: "Farm operations",
    title: "Know what every batch has eaten, lost and cost.",
    description:
      "Run fish, poultry and livestock batches from stocking to harvest, with feeding, mortality, weights and pond or house conditions recorded daily and the cost of each batch built up as it grows.",
    accent: "Bio production",
    summary: "Batch overview",
    measure: "FCR",
    measureLabel: "Feed conversion ratio",
    flow: ["Farm & units", "Batch & stages", "Daily records", "Harvest & cost"],
    steps: [
      { icon: "farm", title: "Farm & units", detail: "Ponds, cages, tanks, houses and pens, grouped the way the farm is laid out.", visual: "locations" },
      { icon: "batch", title: "Batch & stages", detail: "Each batch follows its species' stages, from entry weight to target weight.", visual: "timeline" },
      { icon: "records", title: "Daily records", detail: "Feeding, mortality, weight samples and water or house conditions, day by day.", visual: "list" },
      { icon: "receipt", title: "Harvest & cost", detail: "Harvest and produce move into stock carrying the cost the batch built up.", visual: "bars" },
    ],
    related: [
      ["Inventory", "Harvested fish, birds or produce such as eggs go into stock as products."],
      ["Procurement", "Feed and medication bought through purchasing before they are fed or applied."],
      ["Finance", "Review batch costs, write-offs and value moved to stock alongside financial reporting."],
      ["Process approval", "Keep farm requests and their review decisions within a visible workflow."],
    ],
  },
} as const;

type IndustrySlug = keyof typeof industryPages;

export function generateStaticParams() {
  return Object.keys(industryPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryPages[slug as IndustrySlug];

  return {
    title: industry ? `${industry.name} | ProsERP` : "Industry solutions | ProsERP",
    description: industry?.description,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industryPages[slug as IndustrySlug];

  if (!industry) {
    notFound();
  }

  return <IndustryView industry={industry} />;
}
