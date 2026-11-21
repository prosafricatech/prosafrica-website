import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import SectorRow, { sectorSlug } from '@/components/SectorRow';
import SectorIndex from '@/components/SectorIndex';
import CtaBand from '@/components/CtaBand';
import { sectors, industries } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(industries.meta, '/industries');

export default function Industries() {
  return (
    <>
      {/* ===== START: HERO ===== */}
      <section className="bg-linear-to-b from-alt to-white">
        <Container className="px-5 pt-28 pb-10 md:px-10 md:pt-41 md:pb-14">
          <SectionHeading as="h1" {...industries.hero} />
          {/* quick jump chips for small screens (large screens get the sticky list below) */}
          <div className="mt-8 flex flex-wrap gap-2.5 lg:hidden">
            {sectors.map((s) => (
              <a key={s.name} href={`#${sectorSlug(s.name)}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink">
                {s.name}
              </a>
            ))}
          </div>
        </Container>
      </section>
      {/* ===== END: HERO ===== */}

      {/* ===== START: INDUSTRY LIST (side index + sector rows) ===== */}
      <Container className="grid gap-x-16 pt-6 pb-24 lg:grid-cols-[240px_1fr]">
        <SectorIndex items={sectors.map((s) => ({ name: s.name, slug: sectorSlug(s.name) }))} />

        <div className="flex min-w-0 flex-col gap-24">
          {sectors.map((s, i) => (
            <SectorRow
              key={s.name}
              n={String(i + 1).padStart(2, '0')}
              name={s.name}
              sub={s.sub}
              desc={s.desc}
              features={s.features}
              img={s.img}
            />
          ))}
        </div>
      </Container>
      {/* ===== END: INDUSTRY LIST (side index + sector rows) ===== */}

      {/* ===== START: CALL TO ACTION ===== */}
      <CtaBand
        className="pt-16 sm:pt-24"
        title={industries.cta.title}
        image={{ src: '/images/boardroom.jpg', alt: 'A team celebrating around the ProsERP dashboard' }}
      />
      {/* ===== END: CALL TO ACTION ===== */}
    </>
  );
}
