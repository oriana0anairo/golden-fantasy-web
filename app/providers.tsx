'use client';

import { SessionProvider } from 'next-auth/react';
import type { ReactNode } from 'react';

/** Provee la sesión de NextAuth a los componentes de cliente. */
export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
