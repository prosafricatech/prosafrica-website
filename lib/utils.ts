type ClassValue = string | number | null | boolean | undefined;

export function cn(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}
