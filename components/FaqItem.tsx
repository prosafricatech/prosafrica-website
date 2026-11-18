'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/utils';

// Plain accordion row: a line under each question, a bare + that turns into a −, and a height animation.
export default function FaqItem({ q, a, dark = false }: { q: string; a: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={cn('border-b', dark ? 'border-white/20' : 'border-tint')}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-[18px] font-semibold md:text-[20px]',
            dark ? 'text-white' : 'text-navy'
          )}
        >
          {q}
          <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="M12 5v14" className={cn('origin-center transition duration-300 [transform-box:fill-box]', open && 'scale-y-0 opacity-0')} />
          </svg>
        </button>
      </h3>
      <div
        id={id}
        role="region"
        className={cn('grid transition-[grid-template-rows,opacity] duration-300 ease-out', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
      >
        <div className="overflow-hidden">
          <p className={cn('max-w-2xl pb-6 text-[16px] leading-[1.7]', dark ? 'text-[#C9CCF5]' : 'text-body')}>{a}</p>
        </div>
      </div>
    </div>
  );
}
