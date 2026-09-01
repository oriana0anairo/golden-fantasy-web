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
  /** El backend no respondió: cambia el mensaje del estado vacío. */
  loadFailed: boolean;
};

/** Catálogo público (D1, C1): banner, búsqueda, chips de categoría y grid. */
export function CatalogView({ products, loadFailed }: CatalogViewProps) {
  const {
    query,
    setQuery,
    category,
    setCategory,
    categories,
    shown,
    resultsLabel,
    emptyLabel,
    bannerTitle,
    bannerLede,
    detail,
    notice,
    openDetail,
    closeDetail,
    handleAddToCart,
    authMode,
    openAuth,
    closeAuth,
  } = useCatalogView({ products, loadFailed });

  return (
    <div className={PAGE}>
      <AnnouncementBar>Piezas hechas a mano en nuestro taller · Coordinamos la entrega contigo</AnnouncementBar>

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
        filters={{ categories, active: category, onSelect: setCategory }}
        labels={{ results: resultsLabel, empty: emptyLabel }}
        onView={openDetail}
      />

      <ProductDetailModal
        key={detail?.id ?? 'sin-detalle'}
        product={detail}
        notice={notice}
        onClose={closeDetail}
        onAddToCart={handleAddToCart}
      />

      {authMode !== null && <AuthModal key={authMode} open onClose={closeAuth} initialMode={authMode} />}
    </div>
  );
}
