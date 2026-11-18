import Image from 'next/image';

export default function ClientLogo({ name, src, w, h }: { name: string; src: string; w: number; h: number }) {
  return (
    <div className="flex h-16 w-[140px] items-center justify-center">
      <Image src={src} alt={name} width={w} height={h} className="h-auto max-h-full w-auto max-w-full object-contain" />
    </div>
  );
}
