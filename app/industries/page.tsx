import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import SectorRow, { sectorSlug } from '@/components/SectorRow';
import SectorIndex from '@/components/SectorIndex';
import Section from '@/components/Section';
import SplitHeading from '@/components/SplitHeading';
import CtaBand from '@/components/CtaBand';
import { sectors, modules, industries } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(industries.meta, '/industries');

// Only show module columns that at least one sector uses.
const usedModules = modules.map((m) => m.name).filter((m) => sectors.some((s) => s.mods.includes(m)));

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
              mods={s.mods}
              features={s.features}
              img={s.img}
            />
          ))}
        </div>
      </Container>
      {/* ===== END: INDUSTRY LIST (side index + sector rows) ===== */}

      {/* ===== START: MODULE MATRIX (which modules fit which industry) ===== */}
      <Section tone="alt">
        <SplitHeading title="Which modules fit which industry." text="Every industry starts with the modules below. Add more at any time, since they all share the same data." />
        <div className="mt-12 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-190 border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b border-border text-[13px] font-bold text-muted">
                <th className="px-5 py-4 font-bold">Industry</th>
                {usedModules.map((m) => (
                  <th key={m} className="px-3 py-4 text-center font-bold">
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sectors.map((s) => (
                <tr key={s.name} className="border-b border-border/70 last:border-0">
                  <th scope="row" className="px-5 py-4 font-semibold text-navy">
                    <a href={`#${sectorSlug(s.name)}`} className="hover:text-indigo">
                      {s.name}
                    </a>
                  </th>
                  {usedModules.map((m) => (
                    <td key={m} className="px-3 py-4 text-center">
                      {s.mods.includes(m) ? (
                        <span aria-label="Included" className="inline-block size-3 rounded-full bg-indigo" />
                      ) : (
                        <span aria-label="Not included" className="inline-block h-px w-3 bg-border" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      {/* ===== END: MODULE MATRIX (which modules fit which industry) ===== */}

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
