import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
<<<<<<< HEAD
import ChatWidget from '@/components/ChatWidget';
import { site } from '@/lib/content';
=======
import { site, home } from '@/lib/content';
>>>>>>> e107f039fc25f089c0864fb4cb41c3debbcbae3e

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: home.meta.title, template: '%s | ProsERP' },
  description: home.meta.description,
  applicationName: 'ProsERP',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'ProsERP',
    locale: 'en_TZ',
    url: '/',
    title: home.meta.title,
    description: home.meta.description,
  },
  twitter: { card: 'summary_large_image', title: home.meta.title, description: home.meta.description },
  robots: { index: true, follow: true },
};

// Company + product details for Google (JSON-LD structured data).
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: 'ProsAfrica',
      url: site.url,
      logo: `${site.url}/logos/proserp-logo.png`,
      email: 'info@prosafrica.com',
      telephone: '+255746917817',
      address: { '@type': 'PostalAddress', addressLocality: 'Dar es Salaam', addressCountry: 'TZ' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${site.url}/#software`,
      name: 'ProsERP',
      url: site.url,
      applicationCategory: 'BusinessApplication',
      description: home.meta.description,
      publisher: { '@id': `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body className={`${font.className} bg-white text-ink`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <ChatWidget />
      </body>
    </html>
  );
}
