export const FIELD_WRAPPER = 'flex flex-col gap-1.5';

export const FIELD_LABEL = 'font-body text-xs font-semibold uppercase tracking-wider text-(--color-ink-soft)';

export const FIELD_LABEL_HIDDEN = 'sr-only';

const FIELD_INPUT_BASE =
  'w-full rounded-(--radius-field) border border-(--color-line) bg-(--color-surface) ' +
  'py-3 font-body text-sm text-(--color-ink) placeholder:text-(--color-ink-soft)/60 ' +
  'transition-colors focus:border-(--color-turquesa-600) focus:outline-none';

export const FIELD_INPUT_INVALID = 'border-(--color-danger) focus:border-(--color-danger)';

export const ICON_WRAPPER = 'relative flex items-center';

export const ICON = 'pointer-events-none absolute left-3.5 text-(--color-ink-subtle)';

export function fieldInputClasses(hasIcon: boolean): string {
  return `${FIELD_INPUT_BASE} ${hasIcon ? 'pl-10 pr-4' : 'px-4'}`;
}
