import type { Metadata } from "next";
import { HomeExperience } from "../../components/home-experience";

export const metadata: Metadata = {
  title: "Product tour | ProsERP",
  description:
    "Explore guided ProsERP workflows across projects, finance, procurement, inventory, people operations and more.",
};

export default function ProductTourPage() {
  return <HomeExperience view="tour" />;
}
