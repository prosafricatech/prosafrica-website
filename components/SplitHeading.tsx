// Big title on the left, short text or an action on the right (editorial split).
export default function SplitHeading({
  title,
  text,
  action,
  light = false,
}: {
  title: string;
  text?: string;
  action?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-6">
      <h2
        className={`min-w-0 flex-[1_1_480px] text-[34px] leading-[1.06] font-extrabold tracking-[-1.8px] md:text-[56px] md:tracking-[-2.6px] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`max-w-sm flex-[0_1_380px] text-[17px] leading-[1.65] font-medium ${light ? 'text-[#C9CCF5]' : 'text-body'}`}>
          {text}
        </p>
      )}
      {action}
    </div>
  );
}
