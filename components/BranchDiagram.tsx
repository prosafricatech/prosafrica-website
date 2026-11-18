'use client';

import { useEffect, useRef, useState } from 'react';
import Container from './Container';
import Photo from './Photo';

type Item = { name: string; img: string };
type Seg = { d: string; delay: number; len: number };
type Dot = { x: number; y: number; delay: number };

// A top block (the office) with lines branching down to a grid of photos (the sites).
// Lines are measured from the real layout, so they stay aligned at every screen width,
// and they draw themselves in when the grid scrolls into view.
export default function BranchDiagram({ top, items }: { top: React.ReactNode; items: Item[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [segs, setSegs] = useState<Seg[]>([]);
  const [dots, setDots] = useState<Dot[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    const measure = () => {
      const c = el.getBoundingClientRect();
      const root = el.querySelector('[data-branch-root]')?.getBoundingClientRect();
      const leaves = [...el.querySelectorAll('[data-branch-leaf]')].map((n) => n.getBoundingClientRect());
      if (!root || !leaves.length) return;

      const rx = root.left + root.width / 2 - c.left;
      const rb = root.bottom - c.top;
      const L = leaves.map((r) => ({ l: r.left - c.left, r: r.right - c.left, t: r.top - c.top, b: r.bottom - c.top }));
      const rowTops = [...new Set(L.map((r) => Math.round(r.t)))].sort((a, b) => a - b);
      const cols = L.filter((r) => Math.round(r.t) === rowTops[0]).length;
      const out: Seg[] = [];
      const pts: Dot[] = [{ x: rx, y: rb, delay: 0 }];

      if (cols === 1) {
        // phones: one rail down the left edge with a short stub into every photo
        const railX = Math.min(...L.map((r) => r.l)) - 14;
        const busY = rb + 36;
        const lastMid = (L[L.length - 1].t + L[L.length - 1].b) / 2;
        out.push({ d: `M${rx} ${rb} V${busY} H${railX} V${lastMid}`, delay: 0, len: busY - rb + Math.abs(rx - railX) + (lastMid - busY) });
        L.forEach((r, i) => {
          const mid = (r.t + r.b) / 2;
          out.push({ d: `M${railX} ${mid} H${r.l}`, delay: 500 + i * 140, len: r.l - railX });
          pts.push({ x: r.l, y: mid, delay: 700 + i * 140 });
        });
      } else {
        const left = Math.min(...L.map((r) => r.l)) - 16;
        const right = Math.max(...L.map((r) => r.r)) + 16;
        const busY = rowTops.map((t) => t - 36);
        out.push({ d: `M${rx} ${rb} V${busY[0]}`, delay: 0, len: busY[0] - rb });
        busY.forEach((y, i) => out.push({ d: `M${left} ${y} H${right}`, delay: 350 + i * 250, len: right - left }));
        if (busY.length > 1) {
          const last = busY[busY.length - 1];
          out.push({ d: `M${left} ${busY[0]} V${last}`, delay: 600, len: last - busY[0] });
          out.push({ d: `M${right} ${busY[0]} V${last}`, delay: 600, len: last - busY[0] });
        }
        L.forEach((r, i) => {
          const row = rowTops.indexOf(Math.round(r.t));
          const cx = (r.l + r.r) / 2;
          const delay = 800 + row * 250 + (i % cols) * 90;
          out.push({ d: `M${cx} ${busY[row]} V${r.t}`, delay, len: r.t - busY[row] });
          pts.push({ x: cx, y: r.t, delay: delay + 350 });
        });
      }
      setSegs(out);
      setDots(pts);
      setSize({ w: c.width, h: c.height });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);

    const first = el.querySelector('[data-branch-leaf]');
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    if (first) io.observe(first);

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [items.length]);

  return (
    <div ref={wrap} className="relative">
      <svg aria-hidden width={size.w} height={size.h} className="pointer-events-none absolute top-0 left-0 overflow-visible">
        {segs.map((s, i) => (
          <path
            key={i}
            d={s.d}
            pathLength={1}
            fill="none"
            stroke="#111111"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={1}
            style={{
              strokeDashoffset: drawn ? 0 : 1,
              transition: 'stroke-dashoffset 800ms ease-out',
              transitionDelay: `${s.delay}ms`,
            }}
            className="motion-reduce:transition-none"
          />
        ))}
        {/* pulses that keep running along the lines once they are drawn */}
        {drawn &&
          segs.map((s, i) => (
            <path
              key={`p${i}`}
              d={s.d}
              pathLength={1}
              fill="none"
              stroke="var(--color-indigo)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="0.16 0.84"
              className="motion-reduce:hidden"
              style={{
                animation: `branch-pulse ${Math.max(1.2, s.len / 160)}s linear ${(s.delay + 1000) / 1000}s infinite`,
                opacity: 0,
              }}
            />
          ))}
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={4.5}
            fill="#111111"
            style={{ opacity: drawn ? 1 : 0, transition: 'opacity 400ms ease-out', transitionDelay: `${d.delay}ms` }}
            className="motion-reduce:transition-none"
          />
        ))}
      </svg>

      {top}

      <Container className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-y-20 md:grid-cols-3">
        {items.map((s) => (
          <div key={s.name} data-branch-leaf className="relative">
            <Photo src={s.img} alt={s.name} height={220} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-3xl bg-linear-to-t from-navy/70 to-transparent px-5 pt-10 pb-4 text-[15px] font-bold text-white">
              {s.name}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
