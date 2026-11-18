import Image from 'next/image';
import { cn } from '@/lib/utils';
import Button from './Button';

export default function CtaBand({
  title,
  text,
  button = 'Request a demo',
  image,
  className,
}: {
  title: string;
  text?: string;
  button?: string;
  image?: { src: string; alt: string };
  className?: string;
}) {
  return (
    <section className={cn("px-5 pb-16 sm:px-10 sm:pb-24", className)}>
      <div className="relative isolate mx-auto max-w-300 overflow-hidden rounded-[28px] bg-navy px-6 py-12 text-center sm:px-14 sm:py-24">
        {image && (
          <>
            <Image src={image.src} alt={image.alt} fill sizes="1200px" className="-z-20 object-cover object-[75%_30%]" />
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/85 to-navy/55" />
          </>
        )}
        <h2 className="text-[40px] leading-[1.18] tracking-[-1.4px] font-extrabold text-white">{title}</h2>
        {text && <p className="mx-auto mt-4 max-w-140 text-[17px] leading-[1.6] text-[#C9CCF5]">{text}</p>}
        <Button href="/contact" variant="pink" className="mt-7.5">
          {button}
        </Button>
      </div>
    </section>
  );
}
