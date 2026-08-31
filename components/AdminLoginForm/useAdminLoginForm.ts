'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { authErrorMessage } from '@/lib/auth-errors';

/**
 * Controller del login de admin.
 *
 * Usa `scope: 'admin'`, así `authorize()` rechaza a un comprador aunque el
 * backend haya respondido 200 — no se crea sesión de admin y no hay redirect
 * al dashboard (regla de negocio D6).
 */
export function useAdminLoginForm(redirectTo: string) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (email: string, password: string) => {
      setPending(true);
      setError(null);

      const result = await signIn('credentials', {
        email,
        password,
        scope: 'admin',
        redirect: false,
      });

      if (result?.error) {
        setPending(false);
        setError(authErrorMessage(result.error));
        return;
      }

      router.replace(redirectTo);
      router.refresh();
    },
    [router, redirectTo],
  );

  return { pending, error, submit };
}
