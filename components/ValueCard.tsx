import Card from './Card';
import IconTile from './IconTile';

export default function ValueCard({ n, name, desc }: { n: string; name: string; desc: string }) {
  return (
    <Card>
      <IconTile variant="dark" className="mb-5">{n}</IconTile>
      <h3 className="text-[21px] font-extrabold tracking-[-0.4px] text-navy">{name}</h3>
      <p className="mt-2.5 text-[15px] leading-[1.65] text-body">{desc}</p>
    </Card>
  );
}
