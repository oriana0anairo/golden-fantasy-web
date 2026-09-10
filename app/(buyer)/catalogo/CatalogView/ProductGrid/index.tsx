import { ProductCard } from '@/components';
import type { Product } from '@/lib/product';
import { EMPTY, GRID, MAIN, RESULTS_LABEL, RESULTS_ROW } from './ProductGrid.styles';

type ProductGridProps = {
  products: Product[];
  /** Textos derivados: conteo de resultados y qué decir cuando no hay ninguno. */
  labels: { results: string; empty: string };
  loading: boolean;
  onView: (product: Product) => void;
};

export function ProductGrid({ products, labels, loading, onView }: ProductGridProps) {
  return (
    <main className={MAIN} aria-busy={loading || undefined}>
      {products.length > 0 && (
        <div className={RESULTS_ROW}>
          <span className={RESULTS_LABEL}>{labels.results}</span>
        </div>
      )}

      {products.length > 0 ? (
        <div className={GRID}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onView={() => onView(product)} />
          ))}
        </div>
      ) : (
        <p className={EMPTY}>{loading ? 'Buscando…' : labels.empty}</p>
      )}
    </main>
  );
}
