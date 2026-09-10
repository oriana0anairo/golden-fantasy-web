'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { FormAlert } from '@/components/FormAlert';
import { PriceTag } from '@/components/PriceTag';
import { QuantityStepper } from '@/components/QuantityStepper';
import type { Product } from '@/lib/product';
import { ProductGallery } from './ProductGallery';
import {
  DESCRIPTION,
  EYEBROW,
  GRID,
  INFO,
  NAME,
  QTY_HINT,
  QTY_ROW,
  SPEC_LABEL,
  SPEC_ROW,
  SPEC_VALUE,
  SPECS,
} from './ProductDetailModal.styles';
import { useProductDetailModal } from './useProductDetailModal';

type ProductDetailModalProps = {
  product: Product | null;
  /** Confirmación o aviso tras intentar agregar al carrito. */
  notice: string | null;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
};

/** Detalle de producto (8.5, C7): galería, specs, cantidad y agregar al carrito. */
export function ProductDetailModal({ product, notice, onClose, onAddToCart }: ProductDetailModalProps) {
  const { qty, setQty, maxQty, soldOut, showStepper, stockHint } = useProductDetailModal(product);

  return (
    <Dialog open={product !== null} onClose={onClose} title={product?.name ?? ''} showTitle={false} size="lg">
      {product && (
        <div className={GRID}>
          <ProductGallery photos={product.photos} name={product.name} />

          <div className={INFO}>
            {product.category && <span className={EYEBROW}>{product.category}</span>}
            <h3 className={NAME}>{product.name}</h3>
            <PriceTag price={product.price} size="lg" />
            <p className={DESCRIPTION}>{product.description}</p>

            {product.specs.length > 0 && (
              <dl className={SPECS}>
                {product.specs.map(([label, value]) => (
                  <div key={label} className={SPEC_ROW}>
                    <dt className={SPEC_LABEL}>{label}</dt>
                    <dd className={SPEC_VALUE}>{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className={QTY_ROW}>
              {showStepper && <QuantityStepper value={qty} max={maxQty} onChange={setQty} />}
              <span className={QTY_HINT}>{stockHint}</span>
            </div>

            <Button
              size="lg"
              fullWidth
              icon={ShoppingBag}
              iconPosition="left"
              disabled={soldOut}
              onClick={() => onAddToCart(product, qty)}
            >
              {soldOut ? 'Agotada' : 'Agregar al carrito'}
            </Button>

            <FormAlert message={notice} tone="success" />
          </div>
        </div>
      )}
    </Dialog>
  );
}
