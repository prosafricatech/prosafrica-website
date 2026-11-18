import Card from './Card';
import IconTile from './IconTile';
import { moduleIcons } from './icons';

export default function ModuleCard({ n, name, desc }: { n: string; name: string; desc: string }) {
  const Icon = moduleIcons[name];
  return (
    <Card>
      <IconTile variant="outline" size="lg" className="mb-6">
        {Icon ? <Icon /> : n}
      </IconTile>
      <h3 className="text-[21px] font-extrabold tracking-[-0.4px] text-navy">{name}</h3>
      <p className="mt-2.5 text-[15px] leading-[1.65] text-body">{desc}</p>
    </Card>
  );
}
