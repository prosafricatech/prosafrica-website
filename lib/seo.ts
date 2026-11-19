import type { Metadata } from 'next';

// Per-page metadata. A page's own openGraph replaces the layout's completely, so the shared bits
// (site name, locale, share image) are repeated here.
export function pageMetadata(meta: { title: string; description: string }, path: string): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'ProsERP',
      locale: 'en_TZ',
      url: path,
      title: meta.title,
      description: meta.description,
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
  };
}
