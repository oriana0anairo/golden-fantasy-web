export const SECTION =
  'relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-(--radius-field) ' +
  'px-8 py-12 text-center sm:px-16';

export const SECTION_BG = { backgroundImage: 'var(--wash-warm)' };

export const ARCH = {
  className: 'pointer-events-none absolute left-1/2 top-[-110px] h-60 w-[340px] -translate-x-1/2 rounded-(--radius-arch) border border-b-0',
  style: { borderColor: 'var(--rule-on-wash)' },
};

export const EYEBROW = 'font-body text-xs font-medium uppercase tracking-widest text-(--color-oro-600)';

export const TITLE = 'font-display text-3xl leading-tight text-(--color-turquesa-900)';

export const SCRIPT = 'block font-display text-xl font-light italic text-(--color-oro-600)';

export const LEDE = 'max-w-[520px] text-base leading-relaxed text-(--color-cacao-600)';

export const RULE_ROW = 'mt-3 flex w-56 items-center gap-4 text-(--color-oro-600)';

export const RULE_LINE = { flex: 1, height: 1, backgroundColor: 'var(--rule-on-wash)' };

export const RULE_DIAMOND = 'h-1.5 w-1.5 rotate-45 bg-current';

export const META_ROW = 'mt-2 flex flex-wrap justify-center gap-8';

export const META_ITEM = 'inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-wider text-(--color-cacao-600)';
