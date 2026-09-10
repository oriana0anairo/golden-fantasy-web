import { Button } from '@/components/Button';
import { PriceTag } from '@/components/PriceTag';
import { ProductMedia } from '@/components/ProductMedia';
import { mainPhoto, type Product } from '@/lib/product';
import { ARTICLE, CATEGORY, INFO, MEDIA_BUTTON, NAME } from './ProductCard.styles';

type ProductCardProps = {
  product: Product;
  onView: () => void;
};

/** Tarjeta del grid de catálogo: foto, categoría, nombre, precio y botón de detalle. */
export function ProductCard({ product, onView }: ProductCardProps) {
  return (
    <article className={ARTICLE}>
      <button type="button" onClick={onView} className={MEDIA_BUTTON}>
        <ProductMedia src={mainPhoto(product)} alt={product.name} label={product.name} />
      </button>
      <div className={INFO}>
        {product.category && <span className={CATEGORY}>{product.category}</span>}
        <h3 className={NAME}>{product.name}</h3>
        <PriceTag price={product.price} />
      </div>
      <Button variant="secondary" size="sm" fullWidth onClick={onView}>
        Ver detalle
      </Button>
    </article>
  );
}
