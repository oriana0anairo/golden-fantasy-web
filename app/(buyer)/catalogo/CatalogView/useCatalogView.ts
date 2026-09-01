import { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { AuthMode } from '@/modals/AuthModal/useAuthModal';
import type { Product } from '@/lib/products';

const ALL_CATEGORIES = 'Todo';

/** Mensaje del grid vacío según por qué está vacío. */
function emptyMessage(hasProducts: boolean, loadFailed: boolean): string {
  if (loadFailed) return 'No pudimos cargar el catálogo en este momento. Intenta de nuevo en un rato.';
  if (!hasProducts) return 'Sin productos por ahora. Muy pronto publicaremos las primeras piezas.';
  return 'No encontramos piezas con ese nombre. Prueba con otra palabra o mira todo el catálogo.';
}

function matchesQuery(product: Product, query: string): boolean {
  if (!query) return true;
  const needle = query.toLowerCase();
  return product.name.toLowerCase().includes(needle) || product.category.toLowerCase().includes(needle);
}

type UseCatalogViewArgs = {
  products: Product[];
  loadFailed: boolean;
};

/**
 * Controller del catálogo: con menos de 50 SKUs el filtro de categoría y
 * búsqueda corre en memoria sobre la lista ya cargada, sin ida y vuelta al
 * backend por cada tecla.
 */
export function useCatalogView({ products, loadFailed }: UseCatalogViewArgs) {
  const { status } = useSession();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [detail, setDetail] = useState<Product | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

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

  const closeDetail = () => {
    setDetail(null);
    setNotice(null);
  };

  /**
   * Regla D1: mirar el catálogo es público, pero agregar al carrito exige
   * cuenta. Sin sesión, el detalle cede el paso al modal de login.
   * El carrito en sí llega en la Épica 3 — hasta entonces se avisa, en vez de
   * dejar el botón sin respuesta.
   */
  const handleAddToCart = () => {
    if (status !== 'authenticated') {
      setDetail(null);
      setNotice(null);
      setAuthMode('login');
      return;
    }
    setNotice('Tu cuenta ya quedó lista. El carrito se habilita en la próxima entrega.');
  };

  return {
    query,
    setQuery,
    category,
    setCategory,
    categories,
    shown,
    resultsLabel,
    emptyLabel: emptyMessage(products.length > 0, loadFailed),
    bannerTitle,
    bannerLede,
    detail,
    notice,
    openDetail: (product: Product) => {
      setNotice(null);
      setDetail(product);
    },
    closeDetail,
    handleAddToCart,
    authMode,
    openAuth: () => setAuthMode('login'),
    closeAuth: () => setAuthMode(null),
  };
}
