import type { LucideIcon } from 'lucide-react';
import {
  ARCH,
  EYEBROW,
  LEDE,
  META_ITEM,
  META_ROW,
  RULE_DIAMOND,
  RULE_LINE,
  RULE_ROW,
  SCRIPT,
  SECTION,
  SECTION_BG,
  TITLE,
} from './CategoryBanner.styles';

type CategoryBannerMeta = { icon: LucideIcon; label: string };

type CategoryBannerProps = {
  eyebrow: string;
  script?: string;
  title: string;
  lede: string;
  meta?: CategoryBannerMeta[];
  height?: number;
};

/** Banner ancho de catálogo/colección. Se usa a la altura fija que pidió el cliente: 420px. */
export function CategoryBanner({ eyebrow, script, title, lede, meta = [], height = 260 }: CategoryBannerProps) {
  return (
    <section className={SECTION} style={{ ...SECTION_BG, minHeight: height }}>
      <span aria-hidden="true" className={ARCH.className} style={ARCH.style} />

      <span className={EYEBROW}>{eyebrow}</span>
      <h1 className={TITLE}>
        {script && <span className={SCRIPT}>{script}</span>}
        {title}
      </h1>
      <p className={LEDE}>{lede}</p>

      {meta.length > 0 && (
        <>
          <span className={RULE_ROW}>
            <span style={RULE_LINE} />
            <span className={RULE_DIAMOND} />
            <span style={RULE_LINE} />
          </span>
          <div className={META_ROW}>
            {meta.map(({ icon: Icon, label }) => (
              <span key={label} className={META_ITEM}>
                <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
