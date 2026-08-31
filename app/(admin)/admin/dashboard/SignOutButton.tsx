'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/Button';

/** Cierra la sesión de admin y vuelve al login del taller. */
export function SignOutButton() {
  return (
    <Button
      variant="secondary"
      className="mt-8"
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
    >
      Cerrar sesión
    </Button>
  );
}
