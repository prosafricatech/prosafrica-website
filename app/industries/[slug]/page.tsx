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
    capabilities: [
      ["Plan the work", "Organize budgets, work breakdown and deliverables around each project."],
      ["Manage commitments", "Follow subcontractors and claims alongside project activity."],
      ["Connect site stores", "Review requisitions and consumption in the context of project execution."],
      ["See project status", "Bring progress and project financial information into one view."],
    ],
    flow: ["Project plan", "Budget & WBS", "Claims & stores", "Execution view"],
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
    capabilities: [
      ["Compare locations", "Select a station and focus on its operational activity."],
      ["Review sales shifts", "See shift dates, teams and status for each station."],
      ["Check tank readings", "Explore dipping records and the shifts associated with them."],
      ["Review operations", "Use dipping, tank stock and shift reports to understand activity."],
    ],
    flow: ["Station", "Sales shift", "Tank dipping", "Operations report"],
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
    capabilities: [
      ["Define products", "Use bills of materials to describe finished products and their inputs."],
      ["Organize work centers", "Review production activity by its selected work center."],
      ["Follow production batches", "Check batch dates and status without starting or changing production."],
      ["Review output and cost", "Choose output or cost reporting for a selected period and product."],
    ],
    flow: ["Bill of materials", "Work center", "Production batch", "Output & cost"],
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
    capabilities: [
      ["Raise purchase orders", "Issue orders to suppliers and keep each one against the supplier it went to."],
      ["Follow purchase orders", "See purchase status and receiving progress in the purchasing workflow."],
      ["Manage inventory locations", "Review stores and consumption records for operational context."],
      ["Track outlet sales", "Explore sales counters, outlets and point-of-sale reporting."],
    ],
    flow: ["Purchase order", "Goods receipt", "Store & stock", "Outlet sales"],
    related: [
      ["Process approval", "Make review and decision steps visible around business requests."],
      ["Procurement", "Connect purchase orders, goods received and purchasing reports."],
      ["Point of sale", "Review sales activity by outlet and counter."],
      ["Finance", "Keep operational purchasing and sales visible alongside financial reporting."],
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
