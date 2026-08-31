/** Landing 8.1 — fondo salmón, card central de bordes muy redondeados partida en dos mitades. */

export const PAGE =
  'flex min-h-dvh items-center justify-center bg-(--color-salmon) px-4 py-10 sm:px-6';

export const CARD =
  'grid w-full max-w-4xl overflow-hidden rounded-(--radius-card) bg-(--color-surface) ' +
  'shadow-(--shadow-card) md:grid-cols-2';

/** Mitad izquierda: marca. En mobile queda arriba y más compacta. */
export const CARD_BRAND_HALF =
  'flex flex-col items-center justify-center gap-4 bg-(--color-salmon-soft) ' +
  'px-6 py-10 text-center sm:px-10 sm:py-14';

export const CARD_BRAND_NOTE =
  'max-w-[26ch] font-body text-sm leading-relaxed text-(--color-ink-soft)';

/** Mitad derecha: acciones. */
export const CARD_ACTIONS_HALF =
  'flex flex-col justify-center gap-6 px-6 py-10 sm:px-10 sm:py-14';

export const ACTIONS_HEADING = 'font-display text-2xl text-(--color-ink) sm:text-3xl';

export const ACTIONS_SUBHEADING = 'font-body text-sm text-(--color-ink-soft)';

export const ACTIONS_STACK = 'flex flex-col gap-3';

export const LINKS_STACK = 'flex flex-col gap-2 border-t border-(--color-line) pt-5';

export const LINK =
  'font-body text-sm text-(--color-ink-soft) underline underline-offset-4 ' +
  'transition-colors hover:text-(--color-ink)';
