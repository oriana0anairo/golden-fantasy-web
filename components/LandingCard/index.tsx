'use client';

import { BrandMark } from '@/components/BrandMark';
import { AuthModal } from '@/modals/AuthModal';
import { LandingActions } from './LandingActions';
import {
  CARD,
  CARD_ACTIONS_HALF,
  CARD_BRAND_HALF,
  CARD_BRAND_NOTE,
  PAGE,
} from './LandingCard.styles';
import { useLandingCard } from './useLandingCard';

export function LandingCard() {
  const { authMode, openAuth, closeAuth } = useLandingCard();

  return (
    <main className={PAGE}>
      <div className={CARD}>
        <section className={CARD_BRAND_HALF}>
          <BrandMark />
          <p className={CARD_BRAND_NOTE}>
            Piezas hechas a mano, una por una, en nuestro taller.
          </p>
        </section>

        <section className={CARD_ACTIONS_HALF}>
          <LandingActions onOpenAuth={openAuth} />
        </section>
      </div>

      {authMode !== null && (
        <AuthModal key={authMode} open onClose={closeAuth} initialMode={authMode} />
      )}
    </main>
  );
}
