import { formatPrice } from '@/utils';
import { COMPARE_AT, priceTextClasses, type PriceTagSize } from './PriceTag.styles';

type PriceTagProps = {
  price: number;
  compareAt?: number;
  size?: PriceTagSize;
};

/** Precio en pesos colombianos, con tachado opcional de precio anterior. */
export function PriceTag({ price, compareAt, size = 'md' }: PriceTagProps) {
  const onSale = Boolean(compareAt && compareAt > price);

  return (
    <span className="inline-flex items-baseline gap-2">
      <span className={priceTextClasses(size, onSale)}>{formatPrice(price)}</span>
      {onSale && compareAt && <span className={COMPARE_AT}>{formatPrice(compareAt)}</span>}
    </span>
  );
}
