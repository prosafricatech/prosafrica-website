import Image from 'next/image';
import Link from 'next/link';

// One module: photo on top, then the name, description, the three things it covers
// and a link to the contact page.
export default function ModuleCard({
  name,
  desc,
  items,
  image,
}: {
  name: string;
  desc: string;
  items: string[];
  image?: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-tint bg-white shadow-[0_14px_40px_rgba(12,10,46,0.06)]">
      {image && (
        <div className="relative aspect-[16/10] w-full bg-tint">
          <Image src={image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col px-7.5 pt-7 pb-7.5">
        <h3 className="text-[21px] font-extrabold tracking-[-0.4px] text-navy">{name}</h3>
        <p className="mt-2.5 text-[15px] leading-[1.65] text-body">{desc}</p>
        <ul className="mt-4 flex flex-col gap-1.5">
          {items.map((it) => (
            <li key={it} className="text-[14.5px] leading-normal text-ink before:mr-2 before:text-muted before:content-['–']">
              {it}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="mt-auto inline-block self-start pt-5 text-[15px] font-bold text-indigo underline underline-offset-4 transition-colors hover:text-navy"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
}
