import Image from 'next/image';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Panel from '@/components/Panel';
import SplitHeading from '@/components/SplitHeading';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import Photo from '@/components/Photo';
import HeroShot from '@/components/HeroShot'; // eslint-disable-line @typescript-eslint/no-unused-vars
import LaptopHero from '@/components/LaptopHero';
import HeroBackground from '@/components/HeroBackground';
import ClientLogos from '@/components/ClientLogos';
import ModuleCard from '@/components/ModuleCard';
import ModuleShowcase from '@/components/ModuleShowcase';
import IndustryCard from '@/components/IndustryCard';
import DevicesSection from '@/components/DevicesSection';
import StepItem from '@/components/StepItem';
import FaqItem from '@/components/FaqItem';
import CtaBand from '@/components/CtaBand';
import { modules, sectors, points, highlights, steps, faqs, clients, home } from '@/lib/content';

export default function Home() {
  return (
    <>
      {/* ===== START: HERO (headline, buttons, laptop image) ===== */}
      <section className="relative">
        {/* ORIGINAL HERO BACKGROUND (dark gradient with animated shapes) - restore this block and the
            original text classes noted below to revert.
        <div
          data-nav-dark
          className="absolute inset-x-0 top-0 bottom-[calc(4rem+min(100vw-5rem,1200px)*0.225)] overflow-hidden bg-linear-to-br from-indigo via-[#170F8A] to-navy"
        >
          <HeroBackground />
        </div>
        */}
        {/* CURRENT HERO BACKGROUND: image */}
        {/* the gradient runs down behind the laptop and fades out softly (laptop height = 56.25vw on desktop; cropped phone image is about 98vw tall, so 10vw on phones) */}
        <div className="absolute inset-x-0 top-0 bottom-[calc(56.25vw*0.1)] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)] max-md:bottom-[10vw]">
          <Image src="/images/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <Container className="relative z-10 px-5 pt-32 pb-4 md:px-10 md:pt-40">
          <div className="text-center">
            <span className="inline-block rounded-full bg-white/90 px-3.5 py-2 text-xs font-bold uppercase tracking-[1.5px] text-indigo">
              {home.hero.badge}
            </span>
            {/* original h1 text color: text-white */}
            <h1 className="mx-auto mt-5.5 text-[40px] leading-[1.08] tracking-[-2px] font-extrabold text-navy md:text-[64px] lg:text-[80px] lg:tracking-[-3px]">
              {home.hero.title}
            </h1>
            {/* original lead text color: text-[#C9CCF5] */}
            <p className="mx-auto mt-5.5 max-w-3xl text-[18px] leading-[1.65] font-medium text-ink">{home.hero.lead}</p>
            <div className="mt-8.5 flex flex-wrap justify-center gap-3.5">
              {/* original buttons: variant="light" and variant="outlineLight" */}
              <Button href="/contact" variant="primary">
                {home.hero.primaryCta}
              </Button>
              <Button href="/industries" variant="outline">
                {home.hero.secondaryCta}
              </Button>
            </div>
          </div>
          {/* ORIGINAL: tilted dashboard screenshot card (restore to revert, and remove <LaptopHero /> below)
          <div className="mt-14">
            <HeroShot src={home.hero.image.src} alt={home.hero.image.alt} />
          </div>
          */}
        </Container>
        <LaptopHero src="/images/hero-laptop-v5.webp" mobileSrc="/images/hero-phone-v1.webp" alt={home.hero.image.alt} />
      </section>
      {/* ===== END: HERO (headline, buttons, laptop image) ===== */}

      {/* ===== SECTION: CLIENT LOGOS ===== */}
      <ClientLogos title={home.clientsTitle} clients={clients} />

      {/* ===== START: MODULES OVERVIEW (8 module cards) ===== */}
      <Section>
        <SplitHeading title={home.modulesHeading.title} text={home.modulesHeading.text} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {modules.map((m) => (
            <ModuleCard key={m.n} {...m} />
          ))}
        </div>
      </Section>
      {/* ===== END: MODULES OVERVIEW (8 module cards) ===== */}

      {/* ===== START: INSIDE THE MODULES (tabbed showcase) ===== */}
      <Section tone="alt">
        <SplitHeading title={home.highlightsHeading.title} text={home.highlightsHeading.text} />
        <div className="mt-12 md:mt-16">
          <ModuleShowcase items={highlights.map((h) => ({ ...h, desc: modules.find((m) => m.name === h.name)?.desc }))} />
        </div>
      </Section>
      {/* ===== END: INSIDE THE MODULES (tabbed showcase) ===== */}

      {/* ===== START: INDUSTRIES (sector cards) ===== */}
      <Section>
        <SplitHeading
          title={home.industriesHeading.title}
          action={
            <Button href="/industries" variant="outline" size="sm">
              {home.industriesLink}
            </Button>
          }
        />
        <div className="mt-11 grid grid-cols-1 gap-6 md:grid-cols-2">
          {sectors.map((s) => (
            <IndustryCard key={s.name} name={s.name} sub={s.sub} img={s.img} mods={s.mods} />
          ))}
        </div>
      </Section>
      {/* ===== END: INDUSTRIES (sector cards) ===== */}

      {/* ===== START: DEVICES (choose where you work from: laptop + phone) ===== */}
      <DevicesSection laptopSrc="/images/hero-laptop-v5.webp" phoneSrc="/images/hero-phone-v1.webp" />
      {/* ===== END: DEVICES (choose where you work from: laptop + phone) ===== */}

      {/* ===== START: WORKING TOGETHER (photo + points) ===== */}
      <Panel tone="alt" className="[&>div]:flex [&>div]:flex-wrap [&>div]:items-center [&>div]:gap-16">
        <div className="min-w-0 flex-[1_1_480px]">
          <Photo src={home.workingTogether.image.src} alt={home.workingTogether.image.alt} height={460} />
        </div>
        <div className="min-w-0 flex-[1_1_480px]">
          <SectionHeading title={home.workingTogether.title} text={home.workingTogether.text} />
          <div className="mt-7 flex flex-col gap-4">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-3.5 text-base font-semibold leading-[1.55]">
                <i className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-indigo text-sm font-extrabold not-italic text-white">
                  ✓
                </i>
                {p}
              </div>
            ))}
          </div>
        </div>
      </Panel>
      {/* ===== END: WORKING TOGETHER (photo + points) ===== */}

      {/* ===== START: HOW IT WORKS (3 steps) ===== */}
      <Section>
        <SectionHeading align="center" constrained title={home.stepsHeading.title} />
        <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((st, i) => (
            <StepItem key={st.n} {...st} isLast={i === steps.length - 1} />
          ))}
        </div>
      </Section>
      {/* ===== END: HOW IT WORKS (3 steps) ===== */}

      {/* ===== START: FAQ (dark section) ===== */}
      <section data-nav-dark className="relative bg-navy py-24">
        {/* background patterns (own clipping layer so the sticky heading still works) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* faint dot grid across the whole section */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[22px_22px]" />
          {/* brighter, denser dots fading in from the right */}
          <div className="absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(rgba(255,255,255,0.18)_1.3px,transparent_1.3px)] bg-size-[14px_14px] [mask-image:radial-gradient(ellipse_at_100%_90%,#000_0%,transparent_60%)]" />
          {/* soft glows */}
          <div className="absolute -top-40 left-[8%] h-72 w-[640px] rounded-full bg-indigo/50 blur-3xl" />
          <div className="absolute -bottom-52 right-[10%] h-72 w-[520px] rounded-full bg-pink/20 blur-3xl" />
        </div>
        <Container className="relative flex flex-wrap gap-x-16 gap-y-10">
          <div className="min-w-0 flex-[1_1_320px] md:sticky md:top-28 md:self-start">
            <SectionHeading dark title={home.faqHeading.title} text="Cannot find your answer? Talk to us and we will help." />
            <Button href="/contact" variant="light" className="mt-7">
              Contact us
            </Button>
          </div>
          <div className="flex min-w-0 flex-[1_1_520px] flex-col border-t border-white/20">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} dark />
            ))}
          </div>
        </Container>
      </section>
      {/* ===== END: FAQ (dark section) ===== */}

      {/* ===== SECTION: CALL TO ACTION ===== */}
      <CtaBand className="pt-16 sm:pt-28" title={home.cta.title} text={home.cta.text} image={{ src: '/images/boardroom.jpg', alt: 'A team celebrating around the ProsERP dashboard' }} />
    </>
  );
}
