import { cn } from '@/lib/utils';

type Variant = 'blue' | 'dark' | 'light' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  outline: 'border-2 border-dashed border-indigo bg-white text-indigo',
  blue: 'bg-linear-to-b from-[#5547F0] to-indigo text-white shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.6),inset_0_-5px_7px_rgba(10,5,80,0.45),0_5px_0_-1px_#170E8C,0_14px_22px_rgba(33,19,173,0.32)]',
  dark: 'bg-linear-to-b from-[#34345A] to-navy text-white shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.35),inset_0_-5px_7px_rgba(0,0,10,0.6),0_5px_0_-1px_#04031A,0_14px_22px_rgba(12,10,46,0.35)]',
  light: 'bg-linear-to-b from-white to-[#E4E8FA] text-indigo shadow-[inset_0_1.5px_1px_#fff,inset_0_-5px_7px_rgba(140,150,210,0.45),0_5px_0_-1px_#C7CDEB,0_14px_22px_rgba(12,10,46,0.12)]',
};

const sizes: Record<Size, string> = {
  sm: 'size-11 rounded-[14px] text-[15px]',
  md: 'size-12 rounded-2xl text-base',
  lg: 'size-14 rounded-[18px] text-lg',
};

export default function IconTile({
  variant = 'blue',
  size = 'sm',
  className,
  children,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden
      className={cn('inline-flex shrink-0 items-center justify-center font-extrabold', variants[variant], sizes[size], className)}
    >
      {children}
    </span>
  );
}
