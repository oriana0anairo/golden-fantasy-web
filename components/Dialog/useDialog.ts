'use client';

import { useEffect } from 'react';

/**
 * Sincroniza el diálogo con el documento: cierra con Escape y bloquea el
 * scroll del body mientras está abierto. Es un efecto legítimo — toca APIs
 * externas a React (document / body).
 */
export function useDialog(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);
}
