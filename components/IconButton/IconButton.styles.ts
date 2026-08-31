export type IconButtonVariant = 'ghost' | 'soft' | 'outline' | 'solid';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const SIZES: Record<IconButtonSize, string> = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-[52px] w-[52px]',
};

const VARIANTS: Record<IconButtonVariant, string> = {
  ghost: 'bg-transparent text-(--color-turquesa-800) border border-transparent hover:bg-(--color-turquesa-50)',
  soft: 'bg-(--color-crema-200) text-(--color-cacao-700) border border-transparent hover:bg-(--color-crema-300)',
  outline: 'bg-(--color-surface) text-(--color-turquesa-800) border border-(--color-line) hover:bg-(--color-turquesa-50)',
  solid: 'bg-(--color-turquesa-800) text-(--color-crema-50) border border-(--color-turquesa-800) hover:bg-(--color-turquesa-900)',
};

const BASE =
  'inline-flex items-center justify-center rounded-(--radius-pill) transition-colors duration-150 ' +
  'disabled:cursor-not-allowed disabled:opacity-40';

export function iconButtonClasses(variant: IconButtonVariant, size: IconButtonSize): string {
  return [BASE, SIZES[size], VARIANTS[variant]].join(' ');
}

export const ICON_SIZE_PX: Record<IconButtonSize, number> = { sm: 16, md: 20, lg: 20 };
