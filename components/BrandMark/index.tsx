import { NAME, TAGLINE, WRAPPER, type BrandMarkSize } from './BrandMark.styles';

type BrandMarkProps = {
  tagline?: string | null;
  size?: BrandMarkSize;
};

export function BrandMark({ tagline = 'Bisutería artesanal', size = 'lg' }: BrandMarkProps) {
  return (
    <div className={WRAPPER[size]}>
      <span className={NAME[size]}>Golden Fantasy</span>
      {tagline && <span className={TAGLINE[size]}>{tagline}</span>}
    </div>
  );
}
