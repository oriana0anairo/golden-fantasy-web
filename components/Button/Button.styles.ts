export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-(--radius-pill) px-6 py-3 ' +
  'font-body text-sm font-semibold tracking-wide transition-colors duration-150 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-(--color-ink) text-(--color-ink-inverse) hover:bg-(--color-salmon-deep)',
  secondary:
    'border border-(--color-line-strong) bg-transparent text-(--color-ink) hover:bg-(--color-surface-muted)',
  ghost: 'bg-transparent text-(--color-ink-soft) underline underline-offset-4 hover:text-(--color-ink)',
};

export function buttonClasses(variant: ButtonVariant, fullWidth: boolean): string {
  return [BASE, VARIANTS[variant], fullWidth ? 'w-full' : ''].filter(Boolean).join(' ');
}
