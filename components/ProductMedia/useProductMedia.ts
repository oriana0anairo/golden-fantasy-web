'use client';

import { useState } from 'react';

/**
 * Decide si mostrar la foto o el marcador.
 *
 * Si la imagen no carga (host sin configurar en `next.config.ts`, archivo
 * borrado, CDN caído) se cae al marcador del sistema de diseño en vez de
 * dejar el ícono de imagen rota del navegador.
 */
export function useProductMedia(src?: string | null) {
  const [failed, setFailed] = useState(false);

  return {
    showImage: Boolean(src) && !failed,
    onError: () => setFailed(true),
  };
}
