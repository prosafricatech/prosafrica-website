import Container from './Container';
import { cn } from '@/lib/utils';

// A rounded section that floats inside the page margins, so the page changes rhythm between sections.
export default function Panel({
  tone = 'alt',
  flush = false,
  className,
  children,
}: {
  tone?: 'alt' | 'dark';
  /** Full width, square corners, no outer margin. */
  flush?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={flush ? '' : 'px-3 py-3 md:px-6'}>
      <div
        {...(tone === 'dark' ? { 'data-nav-dark': true } : {})}
        className={cn(
          flush ? 'py-20 md:py-28' : 'rounded-[32px] py-20 md:rounded-[48px] md:py-28',
          tone === 'dark' ? 'bg-linear-to-br from-navy via-[#120C5C] to-[#1B10A0]' : 'bg-alt',
          className
        )}
      >
        <Container>{children}</Container>
      </div>
    </section>
  );
}
