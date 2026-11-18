import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'pink' | 'light' | 'outlineLight';
type Size = 'md' | 'sm';

const styles: Record<Variant, Record<Size, string>> = {
  primary: {
    md: 'bg-indigo text-white shadow-[0_14px_30px_rgba(33,19,173,0.25)] text-base px-7.5 py-4',
    sm: 'bg-indigo text-white shadow-[0_14px_30px_rgba(33,19,173,0.25)] text-[15px] px-6 py-[13px]',
  },
  outline: {
    md: 'bg-white text-indigo border-[1.5px] border-indigo text-base px-7.5 py-[15px]',
    sm: 'bg-white text-indigo border-[1.5px] border-indigo text-[15px] px-6 py-[13px]',
  },
  light: {
    md: 'bg-white text-indigo shadow-[0_14px_30px_rgba(12,10,46,0.3)] text-base px-7.5 py-4',
    sm: 'bg-white text-indigo text-[15px] px-6 py-[13px]',
  },
  outlineLight: {
    md: 'bg-transparent text-white border-[1.5px] border-white text-base px-7.5 py-[15px]',
    sm: 'bg-transparent text-white border-[1.5px] border-white text-[15px] px-6 py-[13px]',
  },
  pink: {
    md: 'bg-pink text-white text-base px-[34px] py-4',
    sm: 'bg-pink text-white text-[15px] px-6 py-[13px]',
  },
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...rest
}: ButtonOwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn('inline-block rounded-full border-0 font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none', styles[variant][size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
