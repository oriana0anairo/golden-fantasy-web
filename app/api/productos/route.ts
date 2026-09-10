import { NextResponse } from 'next/server';
import { loadCatalog } from '@/lib/products';

/**
 * Proxy delgado hacia `GET /productos` del backend.
 *
 * Existe para que la búsqueda del navegador no llame al backend directamente
 * (D5): el catálogo le pregunta a este mismo origen y el servidor reenvía.
 */
export async function GET(request: Request) {
  const search = new URL(request.url).searchParams.get('search') ?? '';
  const { products, failed } = await loadCatalog(search);

  return NextResponse.json({ products, failed }, { status: failed ? 502 : 200 });
}
