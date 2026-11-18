'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export type ShowcaseItem = {
  name: string;
  desc?: string;
  items: string[];
  /** Path under /public, e.g. "/images/modules/hr.jpg". */
  image?: string;
};

// Plain editorial list: hovering (or focusing / tapping) a module opens it and swaps the photo beside it.
export default function ModuleShowcase({ items, onDark = false }: { items: ShowcaseItem[]; onDark?: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
      {/* photo (desktop only): stays in view while the list is read. On phones each module shows its own photo instead. */}
      <div className={cn('relative hidden aspect-[4/3] w-full overflow-hidden rounded-lg md:sticky md:top-28 md:order-2 md:block', onDark ? 'bg-white/10' : 'bg-tint')}>
        {items.map((m, i) =>
          m.image ? (
            <Image
              key={m.name}
              src={m.image}
              alt={i === active ? m.name : ''}
              fill
              sizes="(max-width: 900px) 100vw, 600px"
              className={cn('object-cover transition-opacity duration-500', i === active ? 'opacity-100' : 'opacity-0')}
            />
          ) : null
        )}
      </div>

      <ul className={cn('border-b md:order-1', onDark ? 'border-white/25' : 'border-navy/15')}>
        {items.map((m, i) => {
          const isActive = i === active;
          return (
            <li key={m.name} className={cn('border-t', onDark ? 'border-white/25' : 'border-navy/15')}>
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`module-${i}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="flex w-full items-baseline gap-5 py-6 text-left"
              >
                <span className={cn('w-7 text-sm font-medium tabular-nums', onDark ? 'text-white/60' : 'text-muted')}>{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={cn(
                    'text-[28px] leading-tight font-semibold tracking-[-0.8px] transition-colors duration-300 md:text-[34px]',
                    isActive ? (onDark ? 'text-white' : 'text-navy') : onDark ? 'text-white/45' : 'text-navy/35'
                  )}
                >
                  {m.name}
                </span>
              </button>
              <div
                id={`module-${i}`}
                className={cn(
                  'grid transition-[grid-template-rows] duration-500 ease-out',
                  isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-7 pl-12">
                    {m.desc && <p className={cn('max-w-md text-[16px] leading-[1.7]', onDark ? 'text-white/80' : 'text-body')}>{m.desc}</p>}
                    <ul className="mt-4 flex flex-col gap-1.5">
                      {m.items.map((it) => (
                        <li key={it} className={cn("text-[15px] leading-normal before:mr-2 before:content-['–']", onDark ? 'text-white before:text-white/60' : 'text-ink before:text-muted')}>
                          {it}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      tabIndex={isActive ? 0 : -1}
                      className={cn(
                        'mt-5 inline-block text-[15px] font-bold underline underline-offset-4 transition-colors',
                        onDark ? 'text-white hover:text-white/70' : 'text-indigo hover:text-navy'
                      )}
                    >
                      Learn more →
                    </Link>
                    {/* phone photo: sits inside the opened module so it is always next to what was tapped */}
                    {m.image && (
                      <div className={cn('relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-lg md:hidden', onDark ? 'bg-white/10' : 'bg-tint')}>
                        <Image src={m.image} alt={m.name} fill sizes="(max-width: 900px) 100vw, 600px" className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
