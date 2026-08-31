export type DialogSize = 'md' | 'lg';

const PANEL_SIZE: Record<DialogSize, string> = {
  md: 'max-w-md',
  lg: 'max-w-4xl',
};

export const OVERLAY =
  'fixed inset-0 z-50 flex items-end justify-center bg-(--color-surface-inverse)/45 ' +
  'p-4 backdrop-blur-sm sm:items-center';

export function panelClasses(size: DialogSize): string {
  return (
    `relative w-full ${PANEL_SIZE[size]} rounded-(--radius-panel) bg-(--color-surface) ` +
    'border border-(--color-line) p-6 shadow-(--shadow-modal) sm:p-10'
  );
}

export const CLOSE_BUTTON =
  'absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-(--radius-pill) ' +
  'text-(--color-ink-soft) transition-colors hover:bg-(--color-surface-muted) hover:text-(--color-ink)';

export const TITLE = 'font-display text-2xl text-(--color-ink)';
