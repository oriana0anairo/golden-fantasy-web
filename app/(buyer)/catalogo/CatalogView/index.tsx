'use client';

import { Gem, Sparkles, Truck } from 'lucide-react';
import { AnnouncementBar, CategoryBanner } from '@/components';
import { AuthModal, ProductDetailModal } from '@/modals';
import type { Product } from '@/lib/products';
import { CatalogHeader } from './CatalogHeader';
import { PAGE } from './CatalogView.styles';
import { ProductGrid } from './ProductGrid';
import { useCatalogView } from './useCatalogView';

const BANNER_META = [
  { icon: Gem, label: 'Piezas únicas' },
  { icon: Sparkles, label: 'Hechas en nuestro taller' },
  { icon: Truck, label: 'Coordinamos la entrega contigo' },
];

type CatalogViewProps = {
  products: Product[];
};

/** Catálogo público (D1, C1): banner, búsqueda, chips de categoría y grid. */
export function CatalogView({ products }: CatalogViewProps) {
  const {
    query,
    setQuery,
    category,
    setCategory,
    categories,
    shown,
    resultsLabel,
    bannerTitle,
    bannerLede,
    detail,
    openDetail,
    closeDetail,
    handleAddToCart,
    authMode,
    openAuth,
    closeAuth,
  } = useCatalogView(products);

  return (
    <div className={PAGE}>
      <AnnouncementBar>
        Envío gratis por compras superiores a $200.000 · Cambios sin costo durante 15 días
      </AnnouncementBar>

      <CatalogHeader query={query} onQueryChange={setQuery} onOpenAuth={openAuth} />

      <CategoryBanner
        eyebrow="Catálogo"
        script="Colección"
        title={bannerTitle}
        lede={bannerLede}
        meta={BANNER_META}
        height={420}
      />

      <ProductGrid
        products={shown}
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        resultsLabel={resultsLabel}
        onView={openDetail}
      />

      <ProductDetailModal product={detail} onClose={closeDetail} onAddToCart={handleAddToCart} />

      {authMode !== null && <AuthModal key={authMode} open onClose={closeAuth} initialMode={authMode} />}
    </div>
  );
}
