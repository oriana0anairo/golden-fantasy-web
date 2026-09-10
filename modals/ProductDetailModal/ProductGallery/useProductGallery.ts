'use client';

import { useState } from 'react';

/**
 * Foto seleccionada de la galería.
 *
 * No hace falta reiniciarla al cambiar de pieza: el modal se remonta con
 * `key={product.id}` (ver skill state-performance).
 */
export function useProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return { activeIndex, setActiveIndex };
}
