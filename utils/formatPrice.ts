/** Formatea un precio en pesos colombianos, ej. 62000 -> "$62.000". */
export function formatPrice(pesos: number): string {
  return `$${Math.round(pesos).toLocaleString('es-CO')}`;
}
