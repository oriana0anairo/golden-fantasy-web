import { ShoppingBag } from 'lucide-react';
import { IconButton } from '@/components';
import { BADGE, WRAPPER } from './CartButton.styles';

type CartButtonProps = {
  unitCount: number;
};

/** Acceso al carrito con el contador de unidades. Exclusivo del header. */
export function CartButton({ unitCount }: CartButtonProps) {
  const label = unitCount > 0 ? `Ver carrito, ${unitCount} unidades` : 'Ver carrito';

  return (
    <span className={WRAPPER}>
      <IconButton icon={ShoppingBag} label={label} variant="solid" href="/carrito" />
      {unitCount > 0 && (
        <span className={BADGE} aria-hidden="true">
          {unitCount}
        </span>
      )}
    </span>
  );
}
