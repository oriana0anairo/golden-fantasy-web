'use client';

import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context';
import type { Product } from '@/lib/product';
import type { AuthMode } from '@/modals/AuthModal/useAuthModal';
import { useProductSearch } from './useProductSearch';

/** Mensaje del grid vacío según por qué está vacío. */
function emptyMessage(searching: boolean, failed: boolean): string {
  if (failed) return 'No pudimos cargar el catálogo en este momento. Intenta de nuevo en un rato.';
  if (searching) return 'No encontramos piezas con ese nombre. Prueba con otra palabra.';
  return 'Sin productos por ahora. Muy pronto publicaremos las primeras piezas.';
}

type UseCatalogViewArgs = {
  products: Product[];
  loadFailed: boolean;
};

/** Controller del catálogo (C1): búsqueda, detalle y paso al carrito. */
export function useCatalogView({ products, loadFailed }: UseCatalogViewArgs) {
  const { status } = useSession();
  const cart = useCart();
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState<Product | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const results = useProductSearch(
    { products, failed: loadFailed, loading: false },
    search,
  );

  // Referencia estable: el header la usa dentro de un efecto.
  const onSearch = useCallback((next: string) => setSearch(next), []);

  const closeDetail = () => {
    setDetail(null);
    setNotice(null);
  };

  /**
   * Regla D1: mirar el catálogo es público, pero llevar algo exige cuenta.
   * Sin sesión, el detalle cede el paso al modal de login.
   */
  const addToCart = (product: Product, quantity: number) => {
    if (status !== 'authenticated') {
      setDetail(null);
      setNotice(null);
      setAuthMode('login');
      return;
    }
    cart.add(product, quantity);
    setNotice(`Agregamos ${quantity === 1 ? '1 unidad' : `${quantity} unidades`} a tu carrito.`);
  };

  const count = results.products.length;

  return {
    onSearch,
    products: results.products,
    loading: results.loading,
    resultsLabel: count === 1 ? '1 pieza única' : `${count} piezas únicas`,
    emptyLabel: emptyMessage(search.length > 0, results.failed),
    bannerTitle: 'Piezas hechas a mano',
    detail,
    notice,
    openDetail: (product: Product) => {
      setNotice(null);
      setDetail(product);
    },
    closeDetail,
    addToCart,
    authMode,
    openAuth: () => setAuthMode('login'),
    closeAuth: () => setAuthMode(null),
  };
}
