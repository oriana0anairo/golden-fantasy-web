import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

/**
 * Una variable de entorno definida pero vacía no es lo mismo que ausente.
 *
 * NextAuth hace `new URL(process.env.NEXTAUTH_URL)` al cargar el módulo: si
 * está ausente usa un valor por defecto, pero si es cadena vacía lanza
 * `TypeError: Invalid URL` y tumba el build entero al prerenderizar, con un
 * stack que no menciona la variable culpable. Pasa fácil en Vercel al crear
 * la variable sin escribirle valor.
 *
 * Borrarlas aquí las deja "ausentes" y devuelve el comportamiento por defecto.
 */
function dropEmptyEnvVars(): void {
  for (const key of ['NEXTAUTH_URL', 'BACKEND_API_URL', 'IMAGE_HOSTS']) {
    const value = process.env[key];
    if (value !== undefined && value.trim() === '') {
      console.warn(`[next.config] ${key} está definida pero vacía: se ignora.`);
      delete process.env[key];
    }
  }
}

dropEmptyEnvVars();

/**
 * Hosts desde los que `next/image` puede optimizar fotos de producto.
 *
 * Sin esto, cualquier `imageUrl` absoluta que devuelva el backend (Supabase
 * Storage, Cloudinary) se muestra rota: el optimizador responde 400
 * `"url" parameter is not allowed`. Las rutas relativas nunca lo necesitan.
 *
 * Se arma desde el entorno para no fijar dominios en el código:
 * - el host de `BACKEND_API_URL`, si sirve las imágenes él mismo;
 * - `IMAGE_HOSTS`, lista separada por comas para el CDN de imágenes.
 */
function remotePatterns(): RemotePattern[] {
  const hosts = new Set<string>();

  const backendUrl = process.env.BACKEND_API_URL;
  if (backendUrl) {
    try {
      hosts.add(new URL(backendUrl).hostname);
    } catch {
      // BACKEND_API_URL malformada: se ignora, el build no debe caerse por esto.
    }
  }

  for (const host of (process.env.IMAGE_HOSTS ?? '').split(',')) {
    const trimmed = host.trim();
    if (trimmed) hosts.add(trimmed);
  }

  return [...hosts].map((hostname) => ({ protocol: 'https', hostname }));
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: remotePatterns() },
};

export default nextConfig;
