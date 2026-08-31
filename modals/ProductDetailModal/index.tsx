'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { PriceTag } from '@/components/PriceTag';
import { ProductMedia } from '@/components/ProductMedia';
import { QuantityStepper } from '@/components/QuantityStepper';
import type { Product } from '@/lib/products';
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

const MAX_QTY = 5;

type ProductDetailModalProps = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
};

/** Modal de detalle de producto (C7): fotos, descripción, cantidad y agregar al carrito. */
export function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const { qty, setQty } = useProductDetailModal(product);

  return (
    <Dialog open={product !== null} onClose={onClose} title={product?.name ?? ''} showTitle={false} size="lg">
      {product && (
        <div className={GRID}>
          <ProductMedia src={product.imageUrl} alt={product.name} label={product.name} />

          <div className={INFO}>
            <span className={EYEBROW}>{product.category}</span>
            <h3 className={NAME}>{product.name}</h3>
            <PriceTag price={product.price} size="lg" />
            <p className={DESCRIPTION}>{product.description}</p>

            <div className={SPECS}>
              {product.specs.map(([label, value]) => (
                <div key={label} className={SPEC_ROW}>
                  <span className={SPEC_LABEL}>{label}</span>
                  <span className={SPEC_VALUE}>{value}</span>
                </div>
              ))}
            </div>

            <div className={QTY_ROW}>
              <QuantityStepper value={qty} max={MAX_QTY} onChange={setQty} />
              <span className={QTY_HINT}>Máximo {MAX_QTY} unidades por pedido</span>
            </div>

            <Button size="lg" fullWidth icon={ShoppingBag} iconPosition="left" onClick={() => onAddToCart(product, qty)}>
              Agregar al carrito
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
