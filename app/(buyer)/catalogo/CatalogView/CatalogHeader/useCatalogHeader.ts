import { useSession } from 'next-auth/react';

/** Deriva el saludo del header a partir de la sesión de NextAuth. */
export function useCatalogHeader() {
  const { data: session } = useSession();
  const name = session?.user?.name;

  return { userLabel: name ? `Hola, ${name}` : 'Invitada', isLoggedIn: Boolean(session?.user) };
}
