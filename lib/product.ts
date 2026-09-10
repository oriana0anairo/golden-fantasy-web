/**
 * Modelo de producto y reglas puras sobre él.
 *
 * Sin `server-only` a propósito: el catálogo y el carrito son componentes de
 * cliente y necesitan estos tipos y topes. Las llamadas al backend viven
 * aparte, en `lib/products.ts`, que sí es solo de servidor.
 */

export type ProductSpec = [label: string, value: string];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  specs: ProductSpec[];
  /** URLs de las fotos. Nunca `null`, pero puede venir vacío. */
  photos: string[];
  stockQuantity: number;
};

/** Tope de unidades por producto en v1. El stock real puede bajarlo (D7). */
export const MAX_UNITS_PER_PRODUCT = 5;

/** Cuántas unidades puede llevarse el comprador de una pieza. */
export function purchasableUnits(stockQuantity: number): number {
  return Math.max(0, Math.min(MAX_UNITS_PER_PRODUCT, stockQuantity));
}

/** Foto principal de una pieza, o `null` si el taller aún no la fotografió. */
export function mainPhoto(product: Product): string | null {
  return product.photos[0] ?? null;
}

/** Blinda la respuesta del backend: campos ausentes no deben romper el render. */
export function normalizeProducts(products: unknown): Product[] {
  if (!Array.isArray(products)) return [];

  return products.map((raw) => {
    const product = raw as Partial<Product>;
    return {
      id: String(product.id ?? ''),
      name: product.name ?? 'Pieza sin nombre',
      category: product.category ?? '',
      price: Number(product.price ?? 0),
      description: product.description ?? '',
      specs: Array.isArray(product.specs) ? product.specs : [],
      photos: Array.isArray(product.photos) ? product.photos.filter(Boolean) : [],
      stockQuantity: Number(product.stockQuantity ?? 0),
    };
  });
}
