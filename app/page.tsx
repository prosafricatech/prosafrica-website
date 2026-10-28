import { HomeExperience } from "../components/home-experience";
import { publishedLogos } from "../services/contentStore";

// The client grid is editable data now, so the page is revalidated rather than
// frozen at build time. Five minutes is well inside how often a permission
// letter arrives, and keeps every request served from cache.
export const revalidate = 300;

export default function HomePage() {
  return <HomeExperience clientLogos={publishedLogos()} />;
}
