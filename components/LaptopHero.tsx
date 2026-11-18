import Image from 'next/image';

// The base's slanted lower edge ends around 88% of the image height on the left, so the fade must be gone by then.
// The stops ease the fade: the bright top edge of the base stays crisp, then it dissolves quickly into the white.
const MASK =
  'linear-gradient(to bottom, #000 58%, rgba(0,0,0,0.65) 68%, rgba(0,0,0,0.25) 77%, rgba(0,0,0,0.06) 84%, transparent 88%)';

// Full-width laptop under the hero text. The base of the image fades from dark to transparent,
// so it dissolves into the white page below. The base runs off both sides of the screen.
export default function LaptopHero({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative z-10 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={2880}
        height={1622}
        priority
        sizes="(max-width: 768px) 190vw, 100vw"
        className="relative -ml-[45%] block h-auto w-[190%] max-w-none md:ml-0 md:w-full"
        // melts the dark base into the white page sooner, so it no longer reads as a black slab
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      />
    </div>
  );
}
