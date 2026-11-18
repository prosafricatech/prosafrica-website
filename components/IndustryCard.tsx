import Image from 'next/image';
import Link from 'next/link';
import IconTile from './IconTile';
import { ArrowUpRight } from './icons';

export default function IndustryCard({
  name,
  sub,
  img,
  mods = [],
}: {
  name: string;
  sub: string;
  img: string;
  mods?: string[];
}) {
  return (
    <Link
      href="/industries"
      className="group relative flex h-130 flex-col overflow-hidden rounded-3xl border border-tint bg-linear-to-b from-white to-alt p-7 transition duration-500 hover:-translate-y-1.5 hover:border-indigo/30 hover:shadow-[0_32px_80px_rgba(33,19,173,0.18)] sm:p-9"
    >
      {/* soft glow that appears on hover */}
      <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-indigo/15 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-pink/15 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="max-w-[80%]">
          <h3 className="text-[28px] leading-[1.15] font-semibold tracking-[-0.8px] text-navy sm:text-[32px]">{name}</h3>
          <p className="mt-3 text-[15.5px] leading-normal text-body">{sub}</p>
        </div>
        <span className="relative block size-12 shrink-0">
          <IconTile variant="light" size="md" className="absolute inset-0 transition duration-300 group-hover:-translate-y-0.5">
            <ArrowUpRight />
          </IconTile>
          <IconTile variant="blue" size="md" className="absolute inset-0 opacity-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100">
            <ArrowUpRight />
          </IconTile>
        </span>
      </div>

      <div className="relative z-10 mt-7 min-h-0 flex-1 overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(12,10,46,0.16)]">
        {img ? (
          <Image
            src={img}
            alt={name}
            fill
            sizes="(max-width: 900px) 100vw, 600px"
            className="object-cover transition duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-indigo to-navy transition duration-700 ease-out group-hover:scale-110" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        {mods.length > 0 && (
          <div className="absolute inset-x-4 bottom-4 flex translate-y-4 flex-wrap gap-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {mods.map((m) => (
              <span key={m} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-indigo shadow">
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
