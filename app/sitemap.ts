import type { MetadataRoute } from "next";

const siteUrl = "https://proserp.co.tz";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/product-tour",
    "/request-demo",
    "/solutions/process-approval",
    "/industries/projects-construction",
    "/industries/fuel-stations",
    "/industries/manufacturing",
    "/industries/trading-distribution",
  ];

  return pages.map((page) => ({
    url: `${siteUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "weekly" : "monthly",
    priority: page === "" ? 1 : 0.7,
  }));
}
