import { MARK_NAME, MARK_TAGLINE, MARK_WRAPPER } from './BrandMark.styles';

type BrandMarkProps = {
  tagline?: string;
};

export function BrandMark({ tagline = 'Bisutería artesanal' }: BrandMarkProps) {
  return (
    <div className={MARK_WRAPPER}>
      <span className={MARK_NAME}>Golden Fantasy</span>
      <span className={MARK_TAGLINE}>{tagline}</span>
    </div>
  );
}
