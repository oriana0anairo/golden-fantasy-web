import 'server-only';
import { apiFetch } from './api-client';
import { normalizeProducts, type Product } from './product';

/**
 * Resultado de cargar el catálogo. `failed` distingue "el taller todavía no ha
 * publicado piezas" de "no pudimos hablar con el backend" — mostrar el mismo
 * mensaje en ambos casos escondería una caída del servidor.
 */
export type CatalogLoad = {
  products: Product[];
  failed: boolean;
};

/**
 * Catálogo publicado. La búsqueda la resuelve el backend (`?search=`), no el
 * cliente, para que el filtro siga valiendo cuando el catálogo crezca.
 *
 * Nunca lanza: el catálogo es la vitrina pública y no debe tumbarse porque el
 * backend esté caído. Ante un fallo devuelve la lista vacía y lo deja en el log.
 */
export async function loadCatalog(search?: string): Promise<CatalogLoad> {
  const query = search?.trim() ? `?search=${encodeURIComponent(search.trim())}` : '';

  try {
    const products = await apiFetch<Product[]>({ path: `/productos${query}` });
    return { products: normalizeProducts(products), failed: false };
  } catch (error) {
    console.error('[catalogo] no se pudo cargar GET /productos:', error);
    return { products: [], failed: true };
  }
}
