export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-3 rounded-(--radius-field) ' +
  'font-body font-semibold uppercase tracking-wide transition-colors duration-150 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-4 py-2.5 text-xs',
  md: 'min-h-11 px-7 py-3.5 text-sm',
  lg: 'min-h-[54px] px-10 py-[18px] text-base',
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-(--color-ink) text-(--color-ink-inverse) hover:bg-(--color-salmon-deep)',
  secondary:
    'border border-(--color-line-strong) bg-transparent text-(--color-ink) hover:bg-(--color-surface-muted)',
  ghost: 'bg-transparent text-(--color-ink-soft) underline underline-offset-4 hover:text-(--color-ink)',
};

export function buttonClasses(variant: ButtonVariant, size: ButtonSize, fullWidth: boolean): string {
  return [BASE, SIZES[size], VARIANTS[variant], fullWidth ? 'w-full' : ''].filter(Boolean).join(' ');
}

export const BUTTON_ICON_SIZE_PX = 16;
