import 'server-only';
import { apiFetch } from './api-client';

export type ProductSpec = [label: string, value: string];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  specs: ProductSpec[];
  imageUrl: string | null;
};

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
 * Catálogo completo (menos de 50 SKUs, ver doc de producto): se trae entero y
 * el filtro de búsqueda/categoría corre en el cliente, sin ida y vuelta por
 * cada tecla.
 *
 * Nunca lanza: el catálogo es la vitrina pública y no debe tumbarse porque el
 * backend esté caído o porque `GET /productos` todavía no exista (llega con la
 * Épica 4). Ante un fallo devuelve la lista vacía y lo deja en el log.
 */
export async function loadCatalog(): Promise<CatalogLoad> {
  try {
    const products = await apiFetch<Product[]>({ path: '/productos' });
    return { products: Array.isArray(products) ? products : [], failed: false };
  } catch (error) {
    console.error('[catalogo] no se pudo cargar GET /productos:', error);
    return { products: [], failed: true };
  }
}
