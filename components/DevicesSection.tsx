import Image from 'next/image';
import Container from './Container';
import SectionHeading from './SectionHeading';
import { LAPTOP_MASK } from './LaptopHero';
import { home } from '@/lib/content';

// "Choose where you work from": the laptop and the phone together, to show ProsERP works on every device.
// The laptop runs off both sides of the screen like in the hero; the phone overlaps its lower right corner.
export default function DevicesSection({ laptopSrc, phoneSrc }: { laptopSrc: string; phoneSrc: string }) {
  const d = home.devices;
  const captions = [
    { n: '01', ...d.laptop },
    { n: '02', ...d.phone },
  ];

  return (
    <section className="py-24">
      <Container>
        <SectionHeading align="center" constrained title={d.title} text={d.text} />
      </Container>

      <div className="relative mt-12 overflow-hidden md:mt-16">
        {/* soft dashed ring behind the devices */}
        <div
          aria-hidden
          className="absolute top-[4%] left-1/2 aspect-square w-[120%] -translate-x-1/2 rounded-full border-2 border-dashed border-indigo/20 md:w-[62%]"
        />
        <Image
          src={laptopSrc}
          alt={d.laptopAlt}
          width={2880}
          height={1622}
          sizes="(max-width: 900px) 190vw, 100vw"
          className="relative z-10 -ml-[45%] block h-auto w-[190%] max-w-none md:ml-0 md:w-full"
          style={{ WebkitMaskImage: LAPTOP_MASK, maskImage: LAPTOP_MASK }}
        />
        <Image
          src={phoneSrc}
          alt={d.phoneAlt}
          width={1400}
          height={2349}
          sizes="(max-width: 900px) 40vw, 300px"
          className="absolute right-[4%] bottom-[2%] z-20 block h-auto w-[40vw] max-w-[190px] drop-shadow-[0_28px_32px_rgba(12,10,46,0.28)] md:right-[10%] md:bottom-[6%] md:w-[19vw] md:max-w-[300px]"
        />
      </div>

      <Container className="mt-4 grid gap-8 sm:grid-cols-2 sm:gap-12 md:mt-6">
        {captions.map((c) => (
          <div key={c.n} className="border-t border-navy/15 pt-5">
            <span className="text-sm font-medium tabular-nums text-muted">{c.n}</span>
            <h3 className="mt-2 text-[22px] font-extrabold tracking-[-0.5px] text-navy">{c.name}</h3>
            <p className="mt-2 max-w-md text-[15.5px] leading-[1.65] text-body">{c.desc}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
