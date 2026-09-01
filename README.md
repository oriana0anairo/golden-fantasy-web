# Golden Fantasy — Frontend

Frontend de la tienda de bisutería artesanal Golden Fantasy (Next.js 15, App Router).

Este repo es **solo la capa de presentación**. No tiene base de datos ni Prisma:
toda la lógica de negocio vive en el backend (`golden-fantasy-backend`, desplegado
en Render) y se consume por REST + JWT.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # y completar NEXTAUTH_SECRET
npm run dev
```

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en http://localhost:3000 |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sin emitir |

## Variables de entorno

| Variable | Descripción |
|---|---|
| `BACKEND_API_URL` | URL base del backend. Solo se lee del lado del servidor. |
| `NEXTAUTH_SECRET` | Secreto de firma de la sesión. Generar con `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | URL pública de esta app. |
| `IMAGE_HOSTS` | Hosts extra (separados por comas) desde los que `next/image` puede optimizar fotos de producto. El host de `BACKEND_API_URL` ya se permite solo; déjalo vacío si el backend devuelve rutas relativas. |

## Cómo fluye la autenticación

El navegador **nunca** llama al backend directamente (decisión D5). Siempre le
habla a este mismo origen y el servidor reenvía:

```
navegador → /api/auth/[...nextauth] → (servidor) → POST {BACKEND_API_URL}/auth/login
navegador → /api/auth/register      → (servidor) → POST {BACKEND_API_URL}/auth/register
```

- `lib/auth.ts` — `authorize()` de NextAuth. No consulta ninguna base de datos:
  llama al backend y arma la sesión con el `userId` y el `role` que devuelve.
- `lib/api-client.ts` — cliente HTTP reutilizable hacia el backend, marcado
  `server-only`. Es la puerta única para las épicas siguientes.
- El JWT del backend se guarda en el token de NextAuth y **no** se expone en
  `session` — no llega al navegador.

### Roles y acceso al taller

El backend tiene un único `POST /auth/login` para todos los roles y devuelve el
`role`; **el frontend decide el enrutamiento** (D6):

- `/admin/login` envía `scope: 'admin'`. Si el backend responde 200 pero el rol
  es `BUYER`, no se crea sesión de admin y se muestra
  *"Esta cuenta no tiene acceso al taller"*.
- `ADMIN_OWNER` y `ADMIN_COLLABORATOR` entran a `/admin/dashboard`.
- `middleware.ts` protege todo `/admin/*` salvo `/admin/login`. Es una barrera de
  UX: la seguridad real la aplica el backend en cada endpoint.

## Tokens de diseño

Colores, tipografía, radios y sombras viven **solo** en `app/tokens.css`. Ningún
componente escribe un color literal.

Sincronizado con el mock de alta fidelidad (`Tienda Artesanal.dc.html` +
`_ds/golden-fantasy-design-system-*`): la escala completa de color
(turquesa/oro/rosa/cacao/verde/crema), tipografía (Cormorant Garamond + Jost,
cargadas en `app/layout.tsx` vía `next/font/google`), radios y sombras vienen
de ahí. Los nombres de variable (`--color-ink`, `--color-surface`, etc.) se
mantuvieron para no tocar los componentes de Sprint 0/Épica 1 — solo cambiaron
sus valores.

## Estado del backlog

- **Sprint 0** — setup, tokens, NextAuth contra el backend. ✅
- **Épica 1** — landing (8.1), modales de login/registro, `/admin/login`,
  middleware, dashboard placeholder. ✅
- **Épica 2** — tokens sincronizados con el mock, catálogo público (C1: banner,
  búsqueda, chips de categoría, grid) y modal de detalle de producto (C7). ✅
  El catálogo se alimenta solo de `GET /productos` del backend; sin ese endpoint
  (o sin piezas publicadas) muestra su estado vacío en vez de fallar.
- **Épica 3 en adelante** — carrito, checkout (stepper de 3 pasos), inventario,
  producción. Pendiente.

Las convenciones de código están en `CLAUDE.md` y en `.claude/skills/`.
