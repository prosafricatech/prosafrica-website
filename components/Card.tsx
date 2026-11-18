import { cn } from '@/lib/utils';

export default function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-[20px] border border-tint bg-white p-7.5 shadow-[0_14px_40px_rgba(12,10,46,0.06)]',
        className
      )}
    >
      {children}
    </div>
  );
}
