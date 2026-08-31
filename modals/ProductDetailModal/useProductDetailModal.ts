import { useEffect, useState } from 'react';
import type { Product } from '@/lib/products';

/** Cantidad vuelve a 1 cada vez que se abre el detalle de una pieza distinta. */
export function useProductDetailModal(product: Product | null) {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [product?.id]);

  return { qty, setQty };
}
