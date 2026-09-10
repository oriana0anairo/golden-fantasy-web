'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/lib/product';

type SearchState = {
  products: Product[];
  failed: boolean;
  loading: boolean;
};

/**
 * Resuelve la búsqueda contra el backend (vía el proxy `/api/productos`).
 *
 * `search` ya llega con debounce desde el header, así que aquí hay una petición
 * por término escrito, no por tecla. Con la cadena vacía se vuelve a lo que
 * trajo el servidor en el render inicial, sin pedir nada.
 */
export function useProductSearch(initial: SearchState, search: string): SearchState {
  const [state, setState] = useState<SearchState>(initial);

  useEffect(() => {
    if (!search) {
      setState(initial);
      return;
    }

    // Cada término cancela el anterior: si dos respuestas se cruzan, la vieja
    // se aborta y nunca pisa a la nueva.
    const controller = new AbortController();
    setState((current) => ({ ...current, loading: true }));

    fetch(`/api/productos?search=${encodeURIComponent(search)}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((body) => {
        setState({
          products: Array.isArray(body?.products) ? body.products : [],
          failed: Boolean(body?.failed),
          loading: false,
        });
      })
      .catch((error) => {
        if (error?.name === 'AbortError') return;
        setState({ products: [], failed: true, loading: false });
      });

    return () => controller.abort();
    // `initial` solo se usa al limpiar la búsqueda; no debe re-disparar el fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return state;
}
