import { cn } from '@/lib/utils';

export default function StepItem({
  n,
  name,
  desc,
  isLast = false,
}: {
  n: string;
  name: string;
  desc: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative pt-2',
        !isLast &&
          "md:after:absolute md:after:top-[29px] md:after:left-14 md:after:h-0 md:after:w-[calc(100%_-_44px)] md:after:border-t-2 md:after:border-dashed md:after:border-[#B9B4EA] md:after:content-['']"
      )}
    >
      <span
        aria-hidden
        className="mb-[18px] inline-flex size-11 items-center justify-center rounded-[14px] border-2 border-dashed border-indigo bg-white text-[17px] font-extrabold text-indigo"
      >
        {n}
      </span>
      <h3 className="text-[21px] font-extrabold tracking-[-0.4px] text-navy">{name}</h3>
      <p className="mt-2 text-[15.5px] leading-[1.65] text-body">{desc}</p>
    </div>
  );
}
