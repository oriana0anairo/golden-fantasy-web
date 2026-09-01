import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

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
