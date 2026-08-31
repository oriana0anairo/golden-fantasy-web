import { fetchProducts } from '@/lib/products';
import { CatalogView } from './CatalogView';

// Catálogo con datos vivos (disponibilidad cambia en cuanto se vende una
// pieza): nunca se genera estático ni se cachea entre requests.
export const dynamic = 'force-dynamic';

/** Catálogo público (D1) — sin sesión requerida (C1). */
export default async function CatalogoPage() {
  const products = await fetchProducts();

  return <CatalogView products={products} />;
}
