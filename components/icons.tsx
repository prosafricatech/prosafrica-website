import { cn } from '@/lib/utils';

const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const ArrowUpRight = ({ className }: { className?: string }) => (
  <svg {...base} className={cn('size-5', className)}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Plus = ({ className }: { className?: string }) => (
  <svg {...base} className={cn('size-5', className)}><path d="M12 5v14M5 12h14" /></svg>
);
export const Minus = ({ className }: { className?: string }) => (
  <svg {...base} className={cn('size-5', className)}><path d="M5 12h14" /></svg>
);

type P = { className?: string };
const I = ({ className, children }: P & { children: React.ReactNode }) => (
  <svg {...base} strokeWidth={2} className={cn('size-6', className)}>{children}</svg>
);

export const UsersIcon = ({ className }: P) => (
  <I className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></I>
);
export const CartIcon = ({ className }: P) => (
  <I className={className}><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></I>
);
export const BoxIcon = ({ className }: P) => (
  <I className={className}><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></I>
);
export const CalculatorIcon = ({ className }: P) => (
  <I className={className}><rect width="16" height="20" x="4" y="2" rx="2" /><path d="M8 6h8M16 14v4M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" /></I>
);
export const ClipboardIcon = ({ className }: P) => (
  <I className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" /></I>
);
export const FishIcon = ({ className }: P) => (
  <I className={className}><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" /><path d="M18 12v.5" /><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" /><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" /><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" /><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" /></I>
);

export const PosIcon = ({ className }: P) => (
  <I className={className}><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20M6 15h4" /></I>
);
export const FuelIcon = ({ className }: P) => (
  <I className={className}><path d="M3 22h12M4 9h10" /><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" /><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5" /></I>
);

export const moduleIcons: Record<string, (p: P) => React.ReactElement> = {
  'HR & Payroll': UsersIcon,
  Procurement: CartIcon,
  Inventory: BoxIcon,
  Accounting: CalculatorIcon,
  Projects: ClipboardIcon,
  'Bio Farming': FishIcon,
  POS: PosIcon,
  'Fuel Station': FuelIcon,
};
