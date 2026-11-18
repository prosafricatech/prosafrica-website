import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="ProsERP home" className={cn('inline-flex items-center', className)}>
      <Image
        src={light ? '/logos/proserp-logo-reversed.png' : '/logos/proserp-logo.png'}
        alt="ProsERP"
        width={800}
        height={280}
        priority
        className={cn('w-auto', light ? 'h-10' : 'h-9')}
      />
    </Link>
  );
}
