import { CategoryChips, ProductCard } from '@/components';
import type { Product } from '@/lib/products';
import { CHIPS_ROW, EMPTY, GRID, MAIN, RESULTS_LABEL, RESULTS_ROW } from './ProductGrid.styles';

type ProductGridProps = {
  products: Product[];
  categories: string[];
  category: string;
  onCategoryChange: (category: string) => void;
  resultsLabel: string;
  onView: (product: Product) => void;
};

export function ProductGrid({ products, categories, category, onCategoryChange, resultsLabel, onView }: ProductGridProps) {
  return (
    <main className={MAIN}>
      <div className={RESULTS_ROW}>
        <span className={RESULTS_LABEL}>{resultsLabel}</span>
      </div>

      <div className={CHIPS_ROW}>
        <CategoryChips categories={categories} active={category} onSelect={onCategoryChange} />
      </div>

      {products.length > 0 ? (
        <div className={GRID}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onView={() => onView(product)} />
          ))}
        </div>
      ) : (
        <p className={EMPTY}>No encontramos piezas con ese nombre. Prueba con otra palabra o mira todo el catálogo.</p>
      )}
    </main>
  );
}
