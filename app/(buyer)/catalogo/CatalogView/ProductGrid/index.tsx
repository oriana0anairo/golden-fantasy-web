import { CategoryChips, ProductCard } from '@/components';
import type { Product } from '@/lib/products';
import { CHIPS_ROW, EMPTY, GRID, MAIN, RESULTS_LABEL, RESULTS_ROW } from './ProductGrid.styles';

type ProductGridProps = {
  products: Product[];
  /** Filtro de categorías: opciones, cuál está activa y cómo cambiarla. */
  filters: { categories: string[]; active: string; onSelect: (category: string) => void };
  /** Textos derivados: conteo de resultados y qué decir cuando no hay ninguno. */
  labels: { results: string; empty: string };
  onView: (product: Product) => void;
};

export function ProductGrid({ products, filters, labels, onView }: ProductGridProps) {
  return (
    <main className={MAIN}>
      {products.length > 0 && (
        <div className={RESULTS_ROW}>
          <span className={RESULTS_LABEL}>{labels.results}</span>
        </div>
      )}

      {filters.categories.length > 1 && (
        <div className={CHIPS_ROW}>
          <CategoryChips
            categories={filters.categories}
            active={filters.active}
            onSelect={filters.onSelect}
          />
        </div>
      )}

      {products.length > 0 ? (
        <div className={GRID}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onView={() => onView(product)} />
          ))}
        </div>
      ) : (
        <p className={EMPTY}>{labels.empty}</p>
      )}
    </main>
  );
}
