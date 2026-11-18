import Image from 'next/image';
import { cn } from '@/lib/utils';

export function sectorSlug(name: string) {
  return name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// One industry: wide photo, then the story on the left and the checklist on the right.
export default function SectorRow({
  n,
  name,
  sub,
  desc,
  mods,
  features = [],
  img,
}: {
  n: string;
  name: string;
  sub: string;
  desc: string;
  mods: string[];
  features?: string[];
  img: string;
}) {
  return (
    <article id={sectorSlug(name)} className="scroll-mt-28">
      <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-linear-to-br from-indigo to-navy shadow-[0_30px_70px_rgba(12,10,46,0.14)]">
        {img && <Image src={img} alt={name} fill sizes="(max-width: 1024px) 100vw, 900px" className="object-cover" />}
        <div className="absolute inset-0 bg-linear-to-t from-navy/60 via-transparent to-transparent" />
        <span className="absolute bottom-5 left-6 text-[13px] font-bold tracking-[1.5px] text-white/90 md:bottom-7 md:left-8">{n}</span>
      </div>

      <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-[34px] leading-[1.08] font-extrabold tracking-[-1.6px] text-navy md:text-[42px]">{name}</h2>
          <p className="mt-2 text-[16px] font-semibold text-indigo">{sub}</p>
          <p className="mt-5 text-[17px] leading-[1.7] font-medium text-body">{desc}</p>
        </div>
        <div>
          <div className="text-xs font-bold tracking-[1.5px] text-muted uppercase">{features.length ? 'What you can do' : 'Modules used'}</div>
          {features.length > 0 ? (
            <ul className="mt-4 flex flex-col">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 border-b border-border/70 py-3 text-[15.5px] leading-normal font-medium text-ink first:border-t">
                  <i className="mt-0.5 flex size-5 flex-none items-center justify-center rounded-full bg-tint text-[11px] font-extrabold not-italic text-indigo">✓</i>
                  {f}
                </li>
              ))}
            </ul>
          ) : null}
          <div className={cn('flex flex-wrap gap-2.5', features.length ? 'mt-6' : 'mt-4')}>
            {mods.map((m) => (
              <span key={m} className="rounded-full bg-tint px-3.5 py-2 text-[13px] font-bold text-indigo">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
