'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// Dashboard screenshot that starts tilted and half below the fold, then settles flat as the page scrolls.
export default function HeroShot({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      const p = Math.min(window.scrollY / 420, 1);
      el.style.transform = `perspective(1600px) rotateX(${(1 - p) * 12}deg) scale(${0.94 + p * 0.06})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-nav-light
      className="origin-top overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_40px_90px_rgba(12,10,46,0.22)] will-change-transform"
    >
      <Image src={src} alt={alt} width={2000} height={1126} priority sizes="(max-width: 1280px) 100vw, 1200px" className="h-auto w-full" />
    </div>
  );
}
