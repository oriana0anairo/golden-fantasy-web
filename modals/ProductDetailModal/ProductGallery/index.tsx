'use client';

import { ProductMedia } from '@/components';
import { GalleryThumb } from './GalleryThumb';
import { THUMB_ACTIVE, THUMB_BASE, THUMB_IDLE, THUMBS_ROW, WRAPPER } from './ProductGallery.styles';
import { useProductGallery } from './useProductGallery';

type ProductGalleryProps = {
  photos: string[];
  name: string;
};

/** Foto principal grande y, si hay más de una, la fila de miniaturas (8.5). */
export function ProductGallery({ photos, name }: ProductGalleryProps) {
  const { activeIndex, setActiveIndex } = useProductGallery();
  const active = photos[activeIndex] ?? photos[0] ?? null;

  return (
    <div className={WRAPPER}>
      <ProductMedia src={active} alt={name} label={name} />

      {photos.length > 1 && (
        <div className={THUMBS_ROW}>
          {photos.map((photo, index) => (
            <button
              key={photo}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Foto ${index + 1} de ${name}`}
              aria-current={index === activeIndex || undefined}
              className={`${THUMB_BASE} ${index === activeIndex ? THUMB_ACTIVE : THUMB_IDLE}`}
            >
              <GalleryThumb photo={photo} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
