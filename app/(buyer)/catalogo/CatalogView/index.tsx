'use client';

import { Gem, Sparkles, Truck } from 'lucide-react';
import { AnnouncementBar, CategoryBanner } from '@/components';
import { AuthModal, ProductDetailModal } from '@/modals';
import type { Product } from '@/lib/product';
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

/** Catálogo público (D1, C1): banner, búsqueda y grid de piezas. */
export function CatalogView({ products, loadFailed }: CatalogViewProps) {
  const {
    onSearch,
    products: shown,
    loading,
    resultsLabel,
    emptyLabel,
    bannerTitle,
    detail,
    notice,
    openDetail,
    closeDetail,
    addToCart,
    authMode,
    openAuth,
    closeAuth,
  } = useCatalogView({ products, loadFailed });

  return (
    <div className={PAGE}>
      <AnnouncementBar>Piezas hechas a mano en nuestro taller · Coordinamos la entrega contigo</AnnouncementBar>

      <CatalogHeader onSearch={onSearch} onOpenAuth={openAuth} />

      <CategoryBanner
        eyebrow="Catálogo"
        script="Colección"
        title={bannerTitle}
        lede="Cuentas tejidas una por una, cerámica torneada y fibras naturales. Cada pieza se vende una sola vez."
        meta={BANNER_META}
        height={420}
      />

      <ProductGrid
        products={shown}
        labels={{ results: resultsLabel, empty: emptyLabel }}
        loading={loading}
        onView={openDetail}
      />

      <ProductDetailModal
        key={detail?.id ?? 'sin-detalle'}
        product={detail}
        notice={notice}
        onClose={closeDetail}
        onAddToCart={addToCart}
      />

      {authMode !== null && <AuthModal key={authMode} open onClose={closeAuth} initialMode={authMode} />}
    </div>
  );
}
