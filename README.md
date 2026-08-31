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

> ⚠️ **Pendiente: sincronizar con el mock de alta fidelidad.**
> Los valores actuales están derivados de la descripción escrita de la landing
> (fondo salmón, card de bordes muy redondeados partida en dos mitades) porque el
> proyecto de Claude Design no fue accesible desde la sesión que generó el código.

### Cómo aplicar el mock (para la próxima sesión)

El proyecto de diseño es `Tienda Artesanal.dc.html`, con su design system en
`_ds/golden-fantasy-design-system-.../`. Para traerlo:

1. Trabajar sobre la rama `claude/golden-fantasy-frontend-setup-jq0xab` — el
   código de Sprint 0 y Épica 1 vive ahí, todavía sin mezclar a la rama por
   defecto.
2. Mapear cada archivo de tokens del design system al bloque `@theme` de
   `app/tokens.css`:

   | Archivo del design system | Qué reemplaza en `app/tokens.css` |
   |---|---|
   | `tokens/colors.css` | `--color-*` (salmón, dorado, superficies, texto, línea) |
   | `tokens/fonts.css` + `tokens/typography.css` | `--font-display`, `--font-body` y los tamaños |
   | `tokens/spacing.css` | espaciados y los radios `--radius-*` |
   | `tokens/elevation.css` | `--shadow-card`, `--shadow-modal` |
   | `tokens/base.css`, `tokens/motion.css` | base y transiciones |

3. Ajustar la maqueta de `Tienda Artesanal.dc.html` sobre los componentes que ya
   existen: `components/LandingCard` (card partida), `modals/AuthModal`
   (login/registro) y `components/AdminLoginForm`.

Ningún componente escribe un color literal, así que el paso 2 no debería requerir
tocar nada fuera de `app/tokens.css`.

## Estado del backlog

- **Sprint 0** — setup, tokens, NextAuth contra el backend. ✅
- **Épica 1** — landing (8.1), modales de login/registro, `/admin/login`,
  middleware, dashboard placeholder. ✅
- **Épica 2 en adelante** — catálogo, carrito, inventario, producción. Pendiente.

Las convenciones de código están en `CLAUDE.md` y en `.claude/skills/`.
