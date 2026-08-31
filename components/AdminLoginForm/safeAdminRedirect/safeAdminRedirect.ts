const DASHBOARD_PATH = '/admin/dashboard';

/**
 * Sanea el parámetro `from` de la URL antes de redirigir tras el login.
 *
 * Ese valor lo controla quien arma el link, así que solo se acepta una ruta
 * relativa dentro de `/admin/` — nunca una URL absoluta ni `//host`, que
 * sacarían al usuario del sitio (open redirect).
 */
export function safeAdminRedirect(from: string | undefined | null): string {
  if (!from) return DASHBOARD_PATH;
  if (!from.startsWith('/admin/')) return DASHBOARD_PATH;
  if (from.startsWith('//')) return DASHBOARD_PATH;
  if (from.startsWith('/admin/login')) return DASHBOARD_PATH;
  return from;
}
