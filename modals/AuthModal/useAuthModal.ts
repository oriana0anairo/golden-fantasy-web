'use client';

import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';
import { authErrorMessage } from '@/lib/auth-errors';

export type AuthMode = 'login' | 'register';

export type Credentials = { email: string; password: string };
export type Registration = Credentials & { name: string };

/**
 * Controller del modal de autenticación del comprador.
 * Mantiene el modo (login/registro), el estado de envío y el mensaje de error.
 */
export function useAuthModal(initialMode: AuthMode) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeMode = useCallback((nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
  }, []);

  const submitLogin = useCallback(async ({ email, password }: Credentials) => {
    setPending(true);
    setError(null);

    const result = await signIn('credentials', {
      email,
      password,
      scope: 'buyer',
      redirect: false,
    });

    setPending(false);
    if (result?.error) {
      setError(authErrorMessage(result.error));
      return;
    }
    window.location.assign('/catalogo');
  }, []);

  const submitRegister = useCallback(
    async ({ name, email, password }: Registration) => {
      setPending(true);
      setError(null);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setPending(false);
        setError(body?.message ?? 'No pudimos crear la cuenta.');
        return;
      }
      // Registro correcto: se inicia sesión con las mismas credenciales.
      await submitLogin({ email, password });
    },
    [submitLogin],
  );

  return { mode, changeMode, pending, error, submitLogin, submitRegister };
}
