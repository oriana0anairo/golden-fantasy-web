'use client';

import { useState } from 'react';
import { purchasableUnits, type Product } from '@/lib/product';

/**
 * Cantidad seleccionada y su tope real.
 *
 * El límite no es 5 fijo: es `min(5, stockQuantity)` (D7). Si de la pieza solo
 * queda una, el selector no debe dejar sumar.
 *
 * No hace falta un efecto para reiniciar la cantidad al cambiar de pieza: el
 * modal se remonta con `key={product.id}` (ver skill state-performance).
 */
export function useProductDetailModal(product: Product | null) {
  const [qty, setQty] = useState(1);

  const maxQty = product ? purchasableUnits(product.stockQuantity) : 0;
  const soldOut = maxQty === 0;

  return {
    qty: Math.min(qty, Math.max(1, maxQty)),
    setQty,
    maxQty,
    soldOut,
    // Con una sola unidad disponible no tiene sentido mostrar el selector.
    showStepper: maxQty > 1,
    stockHint: stockHintFor(maxQty),
  };
}

function stockHintFor(maxQty: number): string {
  if (maxQty === 0) return 'Esta pieza está agotada.';
  if (maxQty === 1) return 'Última unidad disponible.';
  return `Máximo ${maxQty} unidades por pedido`;
}
