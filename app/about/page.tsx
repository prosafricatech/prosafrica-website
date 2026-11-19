import Container from '@/components/Container';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import Photo from '@/components/Photo';
import ValueCard from '@/components/ValueCard';
import StepItem from '@/components/StepItem';
import CtaBand from '@/components/CtaBand';
import BranchDiagram from '@/components/BranchDiagram';
import { sectors, about } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(about.meta, '/about');

export default function About() {
  const { whatWeDo, approach } = about;
  return (
    <>
      {/* ===== START: HERO ===== */}
      <section className="bg-linear-to-b from-alt to-white">
        <Container className="px-5 pt-28 pb-0 md:px-10 md:pt-41 md:pb-16">
          <SectionHeading as="h1" {...about.hero} />
        </Container>
      </section>
      {/* ===== END: HERO ===== */}
      {/* ===== START: TEAM PHOTO ===== */}
      <Container>
        <Photo src={about.topImage.src} alt={about.topImage.alt} height={460} />
      </Container>
      {/* ===== END: TEAM PHOTO ===== */}

      {/* ===== START: WHO WE ARE ===== */}
      <Section containerClassName="flex flex-wrap items-start gap-16">
        <div className="min-w-0 flex-[1_1_480px]">
          <SectionHeading eyebrow={about.story.eyebrow} title={about.story.title} />
        </div>
        <div className="min-w-0 flex-[1_1_480px] text-[17px] leading-[1.75] font-medium text-body">
          {about.story.paragraphs.map((p, i) => (
            <p key={p} className={i > 0 ? 'mt-5' : undefined}>
              {p}
            </p>
          ))}
        </div>
      </Section>
      {/* ===== END: WHO WE ARE ===== */}

      {/* ===== START: WHAT WE DO (numbered list) ===== */}
      <Section tone="alt" containerClassName="flex flex-wrap items-start gap-x-16 gap-y-10">
        <div className="min-w-0 flex-[1_1_380px] md:sticky md:top-28">
          <SectionHeading eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} text={whatWeDo.text} />
          <p className="mt-6 max-w-[440px] text-[16px] leading-[1.7] font-medium text-muted">{whatWeDo.closing}</p>
        </div>
        <ol className="min-w-0 flex-[1_1_480px] border-t border-border">
          {whatWeDo.items.map((item, i) => (
            <li
              key={item}
              className="group flex items-baseline gap-6 border-b border-border py-5 transition-colors hover:bg-white/60 sm:gap-8 sm:py-6"
            >
              <span className="w-8 shrink-0 text-[15px] font-bold tabular-nums text-muted transition-colors group-hover:text-indigo">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[22px] font-extrabold tracking-[-0.4px] text-navy sm:text-[26px]">{item}</span>
            </li>
          ))}
        </ol>
      </Section>
      {/* ===== END: WHAT WE DO (numbered list) ===== */}

      {/* ===== START: OUR APPROACH (3 steps) ===== */}
      <Section>
        <div className="max-w-[820px]">
          <p className="text-[13px] font-bold tracking-[0.12em] text-muted uppercase">{approach.eyebrow}</p>
          <h2 className="mt-4 text-[34px] leading-[1.15] font-extrabold tracking-[-1px] text-navy sm:text-[48px]">
            {approach.title}
          </h2>
          <p className="mt-6 max-w-[680px] text-[17px] leading-[1.75] font-medium text-body">{approach.text}</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {approach.steps.map((s, i) => (
            <StepItem key={s.n} {...s} isLast={i === approach.steps.length - 1} />
          ))}
        </div>
      </Section>
      {/* ===== END: OUR APPROACH (3 steps) ===== */}

      {/* ===== START: WHY PROSAFRICA (4 cards) ===== */}
      <Section tone="alt">
        <SectionHeading constrained {...about.whyHeading} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.why.map((v) => (
            <ValueCard key={v.n} {...v} />
          ))}
        </div>
      </Section>
      {/* ===== END: WHY PROSAFRICA (4 cards) ===== */}

      {/* ===== START: WHERE WE WORK (photo + branching lines to sector photos) ===== */}
      <section className="py-24">
        <BranchDiagram
          items={sectors.filter((s) => s.img).map((s) => ({ name: s.name, img: s.img }))}
          top={
            <Container className="flex flex-wrap items-center gap-16">
              <div className="min-w-0 flex-[1_1_480px]">
                <SectionHeading
                  eyebrow={about.whereWeWork.eyebrow}
                  title={about.whereWeWork.title}
                  text={about.whereWeWork.text}
                />
              </div>
              <div data-branch-root className="min-w-0 flex-[1_1_480px]">
                <Photo src={about.whereWeWork.image.src} alt={about.whereWeWork.image.alt} height={380} />
              </div>
            </Container>
          }
        />
      </section>
      {/* ===== END: WHERE WE WORK (photo + branching lines to sector photos) ===== */}

      {/* ===== START: CALL TO ACTION ===== */}
      <CtaBand
        className="pt-16 sm:pt-24"
        title={about.cta.title}
        text={about.cta.text}
        button={about.cta.button}
        image={{ src: '/images/boardroom.jpg', alt: 'A team celebrating around the ProsERP dashboard' }}
      />
      {/* ===== END: CALL TO ACTION ===== */}
    </>
  );
}
