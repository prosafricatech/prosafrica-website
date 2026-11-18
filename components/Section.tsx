import Container from './Container';
import { cn } from '@/lib/utils';

export default function Section({
  tone = 'white',
  id,
  className,
  containerClassName,
  children,
}: {
  tone?: 'white' | 'alt';
  id?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn('py-24', tone === 'alt' && 'bg-alt', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
