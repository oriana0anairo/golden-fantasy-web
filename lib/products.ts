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
 * Catálogo completo (menos de 50 SKUs, ver doc de producto): se trae entero y
 * el filtro de búsqueda/categoría corre en el cliente, sin ida y vuelta por
 * cada tecla — igual que en el mock de alta fidelidad.
 */
export function fetchProducts(): Promise<Product[]> {
  return apiFetch<Product[]>({ path: '/productos' });
}
