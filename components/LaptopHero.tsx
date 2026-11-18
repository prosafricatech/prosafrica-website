import Image from 'next/image';

// The base's slanted lower edge ends around 88% of the image height on the left, so the fade must be gone by then.
// The stops ease the fade: the bright top edge of the base stays crisp, then it dissolves quickly into the white.
export const LAPTOP_MASK =
  'linear-gradient(to bottom, #000 58%, rgba(0,0,0,0.65) 68%, rgba(0,0,0,0.25) 77%, rgba(0,0,0,0.06) 84%, transparent 88%)';

// Phone version: the bottom of the (cropped) phone fades out softly.
const PHONE_MASK = 'linear-gradient(to bottom, #000 62%, rgba(0,0,0,0.5) 82%, transparent 100%)';

// Full-width laptop under the hero text. The base of the image fades from dark to transparent,
// so it dissolves into the white page below. The base runs off both sides of the screen.
export default function LaptopHero({
  src,
  mobileSrc,
  alt,
}: {
  src: string;
  mobileSrc?: string;
  alt: string;
}) {
  return (
    <>
      {/* phones: a tilted phone screenshot instead of the laptop (shown below the md breakpoint) */}
      {mobileSrc && (
        <div className="relative z-10 flex justify-center px-5 pt-4 md:hidden">
          {/* only the top 75% of the phone is shown; the bottom fades out into the page */}
          <div
            className="aspect-[1400/1762] w-[78vw] max-w-[420px] overflow-hidden"
            style={{ WebkitMaskImage: PHONE_MASK, maskImage: PHONE_MASK }}
          >
            <Image src={mobileSrc} alt={alt} width={1400} height={2349} sizes="80vw" className="block h-auto w-full" />
          </div>
        </div>
      )}
      {/* tablets and computers: the laptop */}
      <div
        className={
          mobileSrc
            ? 'relative z-10 hidden overflow-hidden md:block'
            : 'relative z-10 overflow-hidden'
        }
      >
        <Image
          src={src}
          alt={alt}
          width={2880}
          height={1622}
          priority
          sizes="(max-width: 768px) 190vw, 100vw"
          className="relative -ml-[45%] block h-auto w-[190%] max-w-none md:ml-0 md:w-full"
          // melts the dark base into the white page sooner, so it no longer reads as a black slab
          style={{ WebkitMaskImage: LAPTOP_MASK, maskImage: LAPTOP_MASK }}
        />
      </div>
    </>
  );
}
