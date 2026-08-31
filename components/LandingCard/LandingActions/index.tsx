'use client';

import Link from 'next/link';
import { Button } from '@/components/Button';
import type { AuthMode } from '@/modals/AuthModal/useAuthModal';
import {
  ACTIONS_HEADING,
  ACTIONS_STACK,
  ACTIONS_SUBHEADING,
  LINK,
  LINKS_STACK,
} from '../LandingCard.styles';

type LandingActionsProps = {
  onOpenAuth: (mode: AuthMode) => void;
};

/** Mitad derecha de la card: entrada a la tienda. Exclusiva de LandingCard. */
export function LandingActions({ onOpenAuth }: LandingActionsProps) {
  return (
    <>
      <div>
        <h1 className={ACTIONS_HEADING}>Entra a la tienda</h1>
        <p className={ACTIONS_SUBHEADING}>
          Inicia sesión para comprar, o mira el catálogo sin cuenta.
        </p>
      </div>

      <div className={ACTIONS_STACK}>
        <Button fullWidth onClick={() => onOpenAuth('login')}>
          Iniciar sesión
        </Button>
        <Button fullWidth variant="secondary" onClick={() => onOpenAuth('register')}>
          Crear cuenta
        </Button>
      </div>

      <div className={LINKS_STACK}>
        <Link href="/catalogo" className={LINK}>
          Solo quiero mirar el catálogo
        </Link>
        <Link href="/admin/login" className={LINK}>
          Entrar al taller (admin)
        </Link>
      </div>
    </>
  );
}
