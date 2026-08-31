export const ROW = 'flex flex-wrap gap-2.5';

const BASE =
  'cursor-pointer rounded-(--radius-pill) border px-[18px] py-[9px] font-body text-xs font-medium ' +
  'uppercase tracking-wider transition-colors';

export const ACTIVE = `${BASE} border-(--color-turquesa-800) bg-(--color-turquesa-800) text-(--color-crema-50)`;

export const IDLE = `${BASE} border-(--color-line-strong) bg-transparent text-(--color-cacao-600) hover:bg-(--color-surface-muted)`;
