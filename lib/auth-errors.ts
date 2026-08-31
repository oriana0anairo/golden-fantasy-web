/**
 * Códigos de error de autenticación.
 *
 * `authorize()` lanza el código y la UI lo traduce a un mensaje. Se mantienen
 * como códigos (no como texto) para que el mensaje viva en un solo lugar y no
 * dependa de lo que devuelva NextAuth por la URL.
 */
export const AUTH_ERROR = {
  INVALID_CREDENTIALS: 'CREDENCIALES_INVALIDAS',
  NO_WORKSHOP_ACCESS: 'SIN_ACCESO_TALLER',
  SERVER_UNAVAILABLE: 'SERVIDOR_NO_DISPONIBLE',
} as const;

export type AuthErrorCode = (typeof AUTH_ERROR)[keyof typeof AUTH_ERROR];

const MESSAGES: Record<AuthErrorCode, string> = {
  [AUTH_ERROR.INVALID_CREDENTIALS]: 'Correo o contraseña incorrectos.',
  [AUTH_ERROR.NO_WORKSHOP_ACCESS]: 'Esta cuenta no tiene acceso al taller.',
  [AUTH_ERROR.SERVER_UNAVAILABLE]: 'No pudimos conectar con el servidor. Intenta de nuevo.',
};

/** Traduce el código que devuelve NextAuth en `signIn(...).error` a texto legible. */
export function authErrorMessage(code: string | null | undefined): string | null {
  if (!code) return null;
  return MESSAGES[code as AuthErrorCode] ?? MESSAGES[AUTH_ERROR.INVALID_CREDENTIALS];
}
