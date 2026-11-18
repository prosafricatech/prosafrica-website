import Card from './Card';
import IconTile from './IconTile';
import { moduleIcons } from './icons';

export default function HighlightCard({ name, items }: { name: string; items: string[] }) {
  const Icon = moduleIcons[name];
  return (
    <Card>
      {Icon && (
        <IconTile variant="dark" className="mb-5">
          <Icon />
        </IconTile>
      )}
      <h3 className="text-[19px] font-extrabold tracking-[-0.4px] text-navy">{name}</h3>
      <ul className="mt-4 flex flex-col gap-[10px] p-0 list-none">
        {items.map((i) => (
          <li
            key={i}
            className="flex gap-[10px] text-[15px] leading-[1.5] text-body before:mt-[7px] before:h-2 before:w-2 before:flex-none before:rounded-full before:bg-pink before:content-['']"
          >
            {i}
          </li>
        ))}
      </ul>
    </Card>
  );
}
