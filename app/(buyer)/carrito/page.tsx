import Link from 'next/link';
import { BrandMark } from '@/components';

/**
 * Carrito / checkout (C2, C4-C5) — placeholder de Épica 2.
 * El carrito real, el resumen y el stepper de pago llegan en Épica 3.
 */
export default function CarritoPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-(--color-bg) px-4 py-12 text-center">
      <div className="w-full max-w-md rounded-(--radius-panel) bg-(--color-surface) px-6 py-12 shadow-(--shadow-card) sm:px-10">
        <BrandMark tagline="Carrito" />
        <p className="mt-6 font-body text-sm leading-relaxed text-(--color-ink-soft)">
          El carrito y el pago llegan muy pronto.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 inline-block font-body text-sm text-(--color-ink) underline underline-offset-4"
        >
          Volver al catálogo
        </Link>
      </div>
    </main>
  );
}
