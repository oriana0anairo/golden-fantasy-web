export type BrandMarkSize = 'lg' | 'sm';

export const WRAPPER: Record<BrandMarkSize, string> = {
  lg: 'flex flex-col items-center gap-1 text-center',
  sm: 'flex flex-row items-baseline gap-2',
};

export const NAME: Record<BrandMarkSize, string> = {
  lg: 'font-display text-3xl leading-none tracking-[0.18em] text-(--color-ink) sm:text-4xl',
  sm: 'font-display text-xl leading-none tracking-[0.1em] text-(--color-ink)',
};

export const TAGLINE: Record<BrandMarkSize, string> = {
  lg: 'font-body text-[0.65rem] uppercase tracking-[0.32em] text-(--color-ink-soft)',
  sm: 'font-body text-[0.6rem] uppercase tracking-[0.2em] text-(--color-ink-soft)',
};
