import Link from 'next/link';
import { BrandMark } from '@/components';

/**
 * Catálogo público (D1) — placeholder de Épica 1.
 * El grid real de productos, la búsqueda y el detalle llegan en Épica 2.
 */
export default function CatalogoPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-(--color-salmon) px-4 py-12 text-center">
      <div className="w-full max-w-md rounded-(--radius-card) bg-(--color-surface) px-6 py-12 shadow-(--shadow-card) sm:px-10">
        <BrandMark tagline="Catálogo" />
        <p className="mt-6 font-body text-sm leading-relaxed text-(--color-ink-soft)">
          Estamos preparando las piezas. El catálogo completo llega muy pronto.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block font-body text-sm text-(--color-ink) underline underline-offset-4"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
