import { useState } from 'react';

/**
 * Cantidad seleccionada en el detalle.
 *
 * No hace falta un efecto para reiniciarla al cambiar de pieza: el modal se
 * remonta con `key={product.id}`, así que el estado arranca de cero solo
 * (ver skill state-performance).
 */
export function useProductDetailModal() {
  const [qty, setQty] = useState(1);

  return { qty, setQty };
}
