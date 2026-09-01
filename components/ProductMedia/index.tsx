'use client';

import { Gem } from 'lucide-react';
import Image from 'next/image';
import { FRAME, IMAGE, PLACEHOLDER, PLACEHOLDER_BG, PLACEHOLDER_LABEL } from './ProductMedia.styles';
import { useProductMedia } from './useProductMedia';

type ProductMediaProps = {
  src?: string | null;
  alt: string;
  /** Texto del marcador cuando todavía no hay foto de la pieza. */
  label: string;
};

/**
 * Marco de foto de producto. Sin `src` —o si la foto no carga— muestra el
 * marcador cálido del sistema de diseño en vez de un hueco vacío.
 */
export function ProductMedia({ src, alt, label }: ProductMediaProps) {
  const { showImage, onError } = useProductMedia(src);

  return (
    <div className={FRAME}>
      {showImage && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className={IMAGE}
          onError={onError}
        />
      ) : (
        <div className={PLACEHOLDER} style={PLACEHOLDER_BG}>
          <Gem size={24} strokeWidth={1.5} aria-hidden="true" />
          <span className={PLACEHOLDER_LABEL}>{label}</span>
        </div>
      )}
    </div>
  );
}
