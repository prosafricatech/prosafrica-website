import type { Metadata } from "next";
import { HomeExperience } from "../../components/home-experience";

export const metadata: Metadata = {
  title: "About ProsAfrica | ProsERP",
  description:
    "Learn about ProsAfrica and who ProsERP is designed to support.",
};

export default function AboutPage() {
  return <HomeExperience view="about" />;
}
