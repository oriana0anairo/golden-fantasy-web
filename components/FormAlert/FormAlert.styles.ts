export const ALERT_BASE =
  'rounded-(--radius-field) px-4 py-3 font-body text-sm';

export const ALERT_TONES = {
  error: 'bg-(--color-danger-soft) text-(--color-danger)',
  success: 'bg-(--color-surface-muted) text-(--color-success)',
} as const;

export type AlertTone = keyof typeof ALERT_TONES;
