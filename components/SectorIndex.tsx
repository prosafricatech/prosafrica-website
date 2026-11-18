'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Sticky list of industries that highlights the one currently in view while scrolling.
export default function SectorIndex({ items }: { items: { name: string; slug: string }[] }) {
  const [active, setActive] = useState(items[0]?.slug);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.slug)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    // An industry is "current" while it crosses a line about a third of the way down the screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-30% 0px -65% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Industries" className="hidden lg:block">
      <ol className="sticky top-28 flex flex-col">
        {items.map((s, i) => {
          const on = s.slug === active;
          return (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                aria-current={on ? 'true' : undefined}
                className={cn(
                  'relative flex items-baseline gap-3 border-b border-border/70 py-3.5 text-[15.5px] font-semibold transition-colors duration-300 hover:text-indigo',
                  on ? 'text-indigo' : 'text-body'
                )}
              >
                <span
                  aria-hidden
                  className={cn('absolute bottom-[-1px] left-0 h-px bg-indigo transition-all duration-300', on ? 'w-full' : 'w-0')}
                />
                <span className={cn('text-xs font-bold tracking-wider transition-colors duration-300', on ? 'text-indigo' : 'text-muted')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.name}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
