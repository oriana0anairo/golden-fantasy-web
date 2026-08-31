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

> ⚠️ Los valores actuales están derivados de la descripción escrita de la landing
> (fondo salmón, card de bordes muy redondeados partida en dos mitades) porque el
> proyecto de Claude Design no fue accesible desde la sesión que generó el código.
> Al tener el mock a mano, basta reemplazar los valores de ese archivo.

## Estado del backlog

- **Sprint 0** — setup, tokens, NextAuth contra el backend. ✅
- **Épica 1** — landing (8.1), modales de login/registro, `/admin/login`,
  middleware, dashboard placeholder. ✅
- **Épica 2 en adelante** — catálogo, carrito, inventario, producción. Pendiente.

Las convenciones de código están en `CLAUDE.md` y en `.claude/skills/`.
