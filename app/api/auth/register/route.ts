import { NextResponse } from 'next/server';
import { ApiError, apiFetch } from '@/lib/api-client';

/**
 * Proxy delgado hacia `POST /auth/register` del backend.
 *
 * Existe para que el navegador no llame al backend directamente (D5): el
 * formulario de registro le habla a este mismo origen y el servidor reenvía.
 * No hay lógica de negocio aquí — solo validación de forma y traspaso.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Petición inválida.' }, { status: 400 });
  }

  const credentials = parseRegistration(payload);
  if (!credentials) {
    return NextResponse.json(
      { message: 'Nombre, correo y contraseña son obligatorios.' },
      { status: 400 },
    );
  }

  try {
    await apiFetch({ path: '/auth/register', method: 'POST', body: credentials });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json({ message: 'No pudimos crear la cuenta.' }, { status: 500 });
  }
}

type Registration = { name: string; email: string; password: string };

function parseRegistration(payload: unknown): Registration | null {
  if (!payload || typeof payload !== 'object') return null;
  const { name, email, password } = payload as Record<string, unknown>;

  if (typeof name !== 'string' || !name.trim()) return null;
  if (typeof email !== 'string' || !email.trim()) return null;
  if (typeof password !== 'string' || !password) return null;

  return { name: name.trim(), email: email.trim().toLowerCase(), password };
}
