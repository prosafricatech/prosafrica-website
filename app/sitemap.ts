import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '', priority: 1 },
    { path: '/industries', priority: 0.8 },
    { path: '/about', priority: 0.7 },
    { path: '/contact', priority: 0.7 },
  ];
  return pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: new Date(), priority: p.priority }));
}
