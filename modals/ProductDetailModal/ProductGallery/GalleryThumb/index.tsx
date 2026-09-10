'use client';

import { Gem } from 'lucide-react';
import Image from 'next/image';
import { useProductMedia } from '@/components/ProductMedia/useProductMedia';
import { THUMB_FALLBACK, THUMB_IMAGE } from './GalleryThumb.styles';

type GalleryThumbProps = {
  photo: string;
};

/**
 * Contenido de una miniatura. Si la foto no carga, muestra el mismo marcador
 * que la foto principal en vez de dejar un recuadro vacío.
 */
export function GalleryThumb({ photo }: GalleryThumbProps) {
  const { showImage, onError } = useProductMedia(photo);

  if (!showImage) {
    return (
      <span className={THUMB_FALLBACK}>
        <Gem size={14} strokeWidth={1.5} aria-hidden="true" />
      </span>
    );
  }

  return <Image src={photo} alt="" fill sizes="64px" className={THUMB_IMAGE} onError={onError} />;
}
