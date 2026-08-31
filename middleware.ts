import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isAdminRole, normalizeRole } from '@/lib/roles';

const ADMIN_LOGIN_PATH = '/admin/login';

/**
 * Protege todo `/admin/*` a nivel de sesión de NextAuth (barrera de UX).
 * La seguridad real vive en el backend, que valida el JWT y el rol en cada
 * endpoint — el frontend nunca es la única barrera.
 */
export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const hasAdminSession = isAdminRole(normalizeRole(token?.role));

  // Ya autenticado como admin: no tiene sentido volver a ver el login.
  if (pathname === ADMIN_LOGIN_PATH) {
    return hasAdminSession
      ? NextResponse.redirect(new URL('/admin/dashboard', request.url))
      : NextResponse.next();
  }

  if (hasAdminSession) return NextResponse.next();

  const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
  loginUrl.searchParams.set('from', `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
