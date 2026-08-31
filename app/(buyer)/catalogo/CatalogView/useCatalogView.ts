import { useMemo, useState } from 'react';
import type { AuthMode } from '@/modals/AuthModal/useAuthModal';
import type { Product } from '@/lib/products';

const ALL_CATEGORIES = 'Todo';

function matchesQuery(product: Product, query: string): boolean {
  if (!query) return true;
  const needle = query.toLowerCase();
  return product.name.toLowerCase().includes(needle) || product.category.toLowerCase().includes(needle);
}

/**
 * Controller del catálogo: con menos de 50 SKUs el filtro de categoría y
 * búsqueda corre en memoria sobre la lista ya cargada, sin ida y vuelta al
 * backend por cada tecla.
 */
export function useCatalogView(products: Product[]) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [detail, setDetail] = useState<Product | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category))).sort();
    return [ALL_CATEGORIES, ...unique];
  }, [products]);

  const shown = useMemo(
    () =>
      products.filter((p) => (category === ALL_CATEGORIES || p.category === category) && matchesQuery(p, query)),
    [products, category, query],
  );

  const isAllCategories = category === ALL_CATEGORIES;
  const bannerTitle = isAllCategories ? 'Piezas hechas a mano' : category;
  const bannerLede = isAllCategories
    ? 'Cuentas tejidas una por una, cerámica torneada y fibras naturales. Cada pieza se vende una sola vez.'
    : `Todo lo que tenemos disponible en ${category.toLowerCase()}, listo para enviar desde el taller.`;
  const resultsLabel = shown.length === 1 ? '1 pieza única' : `${shown.length} piezas únicas`;

  return {
    query,
    setQuery,
    category,
    setCategory,
    categories,
    shown,
    resultsLabel,
    bannerTitle,
    bannerLede,
    detail,
    openDetail: setDetail,
    closeDetail: () => setDetail(null),
    // El carrito real (persistencia, contador del header) llega en la Épica 3;
    // por ahora agregar solo cierra el detalle, como confirmación visual.
    handleAddToCart: () => setDetail(null),
    authMode,
    openAuth: () => setAuthMode('login'),
    closeAuth: () => setAuthMode(null),
  };
}
