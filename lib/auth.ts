import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ApiError, apiFetch } from '@/lib/api-client';
import { AUTH_ERROR } from '@/lib/auth-errors';
import { isAdminRole, normalizeRole, type Role } from '@/lib/roles';

/** Respuesta esperada de `POST /auth/login` del backend. */
type LoginResponse = {
  token: string;
  user: { id: string; name?: string | null; email: string; role: string };
};

/**
 * Ámbito desde el que se inicia sesión. Determina si un rol de comprador es
 * aceptable: en `/admin/login` NO lo es (regla de negocio D6 — el rechazo es
 * responsabilidad del frontend, el backend usa un único endpoint de login).
 */
export type LoginScope = 'buyer' | 'admin';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/' },
  providers: [
    CredentialsProvider({
      name: 'Golden Fantasy',
      credentials: {
        email: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
        scope: { label: 'Ámbito', type: 'text' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        const password = credentials?.password;
        if (!email || !password) throw new Error(AUTH_ERROR.INVALID_CREDENTIALS);

        const login = await requestLogin(email, password);
        const role = normalizeRole(login.user.role);
        if (!role) throw new Error(AUTH_ERROR.INVALID_CREDENTIALS);

        // El backend autenticó bien, pero un comprador no entra al taller.
        if (credentials?.scope === 'admin' && !isAdminRole(role)) {
          throw new Error(AUTH_ERROR.NO_WORKSHOP_ACCESS);
        }

        return {
          id: login.user.id,
          name: login.user.name ?? null,
          email: login.user.email,
          role,
          backendToken: login.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        token.backendToken = user.backendToken;
      }
      return token;
    },
    async session({ session, token }) {
      // `backendToken` se omite a propósito: no debe llegar al navegador.
      session.user = {
        ...session.user,
        id: token.userId,
        role: token.role as Role,
      };
      return session;
    },
  },
};

async function requestLogin(email: string, password: string): Promise<LoginResponse> {
  try {
    return await apiFetch<LoginResponse>({
      path: '/auth/login',
      method: 'POST',
      body: { email, password },
    });
  } catch (error) {
    if (error instanceof ApiError && error.status >= 500) {
      throw new Error(AUTH_ERROR.SERVER_UNAVAILABLE);
    }
    // El backend responde 401 genérico sin distinguir correo de contraseña (D6).
    throw new Error(AUTH_ERROR.INVALID_CREDENTIALS);
  }
}
