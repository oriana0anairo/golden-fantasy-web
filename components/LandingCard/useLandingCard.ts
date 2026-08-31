'use client';

import { useCallback, useState } from 'react';
import type { AuthMode } from '@/modals/AuthModal/useAuthModal';

/**
 * Controller de la landing: qué modal de autenticación está abierto y en qué
 * modo. `null` significa cerrado — así el modo y la apertura son un solo
 * estado en vez de dos que puedan desincronizarse.
 */
export function useLandingCard() {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  const openAuth = useCallback((mode: AuthMode) => setAuthMode(mode), []);
  const closeAuth = useCallback(() => setAuthMode(null), []);

  return { authMode, openAuth, closeAuth };
}
