import 'server-only';

/**
 * Cliente HTTP hacia el backend (repo `golden-fantasy-backend`).
 *
 * SOLO se usa del lado del servidor: Server Components, Server Actions y Route
 * Handlers. El navegador nunca llama al backend directamente — le habla a este
 * mismo frontend (mismo origen, sin CORS) y el frontend reenvía con el token.
 */

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type ApiRequest = {
  /** Ruta relativa al backend, ej. `/auth/login`. */
  path: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  /** Cuerpo JSON. Se serializa automáticamente. */
  body?: unknown;
  /** JWT del backend. Se envía como `Authorization: Bearer <token>`. */
  token?: string;
  /** Estrategia de caché de Next. Por defecto no cachea (datos vivos). */
  cache?: RequestCache;
  /** Milisegundos antes de abortar. Render Free tiene cold starts lentos. */
  timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 20_000;

function backendBaseUrl(): string {
  const baseUrl = process.env.BACKEND_API_URL;
  if (!baseUrl) {
    throw new Error('Falta la variable de entorno BACKEND_API_URL');
  }
  return baseUrl.replace(/\/+$/, '');
}

/**
 * Llama al backend y devuelve el JSON parseado.
 * Lanza `ApiError` si la respuesta no es 2xx.
 */
export async function apiFetch<TResponse>({
  path,
  method = 'GET',
  body,
  token,
  cache = 'no-store',
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: ApiRequest): Promise<TResponse> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${backendBaseUrl()}${path}`, {
      method,
      headers,
      cache,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (cause) {
    throw new ApiError(503, 'No se pudo contactar el servidor', cause);
  }

  const payload = await readJson(response);

  if (!response.ok) {
    throw new ApiError(response.status, messageFrom(payload, response.status), payload);
  }
  return payload as TResponse;
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function messageFrom(payload: unknown, status: number): string {
  if (payload && typeof payload === 'object' && 'message' in payload) {
    const { message } = payload as { message?: unknown };
    if (typeof message === 'string' && message.trim()) return message;
  }
  return `El servidor respondió ${status}`;
}
