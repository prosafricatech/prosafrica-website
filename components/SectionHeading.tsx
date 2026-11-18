import { cn } from '@/lib/utils';

// Page titles (h1) get a small pill label; section titles (h2) stand on their own, with no label above.
export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  constrained = false,
  as = 'h2',
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: 'left' | 'center';
  constrained?: boolean;
  as?: 'h1' | 'h2';
  dark?: boolean;
  className?: string;
}) {
  const Title = as;
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', constrained && 'max-w-[640px]', className)}>
      {as === 'h1' && eyebrow && (
        <span className="inline-block rounded-full bg-tint px-3.5 py-2 text-xs font-bold uppercase tracking-[1.5px] text-indigo">
          {eyebrow}
        </span>
      )}
      {as === 'h1' ? (
        <Title className="mt-5 text-[40px] leading-[1.1] tracking-[-2px] font-extrabold text-navy md:text-[60px]">{title}</Title>
      ) : (
        <Title className={cn('text-[34px] leading-[1.08] tracking-[-1.8px] font-extrabold md:text-[52px] md:tracking-[-2.4px]', dark ? 'text-white' : 'text-navy')}>
          {title}
        </Title>
      )}
      {text && <p className={cn('mt-5 text-[17px] leading-[1.65] font-medium', dark ? 'text-[#C9CCF5]' : 'text-body')}>{text}</p>}
    </div>
  );
}
