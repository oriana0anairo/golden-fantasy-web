export type PriceTagSize = 'sm' | 'md' | 'lg';

const SIZE_TEXT: Record<PriceTagSize, string> = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-xl',
};

export function priceTextClasses(size: PriceTagSize, onSale: boolean): string {
  const color = onSale ? 'text-(--color-price-sale)' : 'text-(--color-price)';
  return `font-body font-medium ${SIZE_TEXT[size]} ${color}`;
}

export const COMPARE_AT = 'font-body text-sm text-(--color-ink-subtle) line-through';
