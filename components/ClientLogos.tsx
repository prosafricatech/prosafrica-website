import Container from './Container';
import ClientLogo from './ClientLogo';
import { cn } from '@/lib/utils';

type Client = { name: string; src: string; w: number; h: number };

function MarqueeRow({ clients, reverse = false }: { clients: Client[]; reverse?: boolean }) {
  // Each half of the track repeats the logos twice so it stays wider than big screens; the track loops by moving -50%.
  const set = [...clients, ...clients];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={cn(
          'flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none',
          reverse && '[animation-direction:reverse]'
        )}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={copy === 1 || undefined}>
            {set.map((c, i) => (
              <ClientLogo key={`${c.name}-${i}`} {...c} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientLogos({ title, clients }: { title: string; clients: Client[] }) {
  const half = Math.ceil(clients.length / 2);
  return (
    <div className="group border-y border-tint py-10">
      <Container>
        <p className="mb-7 text-center text-sm font-bold uppercase tracking-[1.5px] text-muted">{title}</p>
      </Container>
      <div className="flex flex-col gap-6">
        <MarqueeRow clients={clients.slice(0, half)} />
        <MarqueeRow clients={clients.slice(half)} reverse />
      </div>
    </div>
  );
}
