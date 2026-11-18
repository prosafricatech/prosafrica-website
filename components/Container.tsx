import { cn } from '@/lib/utils';

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('mx-auto max-w-7xl px-5 md:px-10', className)}>{children}</div>;
}
