import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function Photo({
  src,
  alt,
  height,
  className,
}: {
  src: string;
  alt: string;
  height: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-3xl shadow-[0_30px_70px_rgba(12,10,46,0.14)]',
        className
      )}
      style={{ height }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 640px" className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0 bg-linear-to-br from-indigo to-navy" />
      )}
    </div>
  );
}
