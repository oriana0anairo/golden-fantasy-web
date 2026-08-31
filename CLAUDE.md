# CLAUDE.md — Golden Fantasy (Tienda de Bisutería)

## Contexto de negocio
Tienda de bisutería artesanal en Colombia (COP). Dos roles: **Admin** (inventario, producción y costeo del taller) y **Comprador** (ecommerce). Objetivo: validar el negocio con un MVP funcional en 3-4 meses.

## Reglas de negocio no obvias
- Catálogo público (sin cuenta). Login obligatorio solo para agregar al carrito / comprar.
- Admin y ecommerce viven en el **mismo repo**. Admin tiene su **propio login** en `/admin/login`, separado del login de comprador. Sin sesión válida de rol admin, cualquier ruta bajo `/admin/*` redirige a `/admin/login`.
- No hay registro público de admin en v1 — el usuario `admin_owner` se crea vía seed/script.
- Cada producción es independiente (sin recetas fijas reutilizables). El precio de materia prima se autocompleta con el **último lote comprado** registrado (se guarda como snapshot en cada producción, no como referencia viva). El costo de mano de obra sale del SMLV, configurado 1 vez al año.
- El precio que ve el comprador en el catálogo es el valor guardado en `Product.price` al publicar — no se recalcula en vivo desde la producción.
- Límite fijo de 5 unidades por producto en el selector de cantidad (v1).

## Fuera de alcance en v1 (no construir)
Alertas de stock, gestión completa de usuarios admin desde UI, historial de pedidos, cálculo de costo de envío, límite de cantidad configurable por producto, checkout como stepper (en v1 es un solo paso).

## Arquitectura: este es SOLO el repo de frontend
El backend (API, base de datos, lógica de negocio, Prisma) vive en **otro repo separado** (`golden-fantasy-backend`). Este proyecto no tiene base de datos propia ni lógica de negocio — es una capa de presentación que le habla al backend por HTTP.

- El navegador **nunca** llama al backend directamente. Solo le habla a este mismo frontend (mismo origen, sin CORS).
- La comunicación real con el backend ocurre del lado del servidor: en Server Actions, Route Handlers de `/app/api`, o Server Components — ahí sí se llama al backend con un token, usando `lib/api-client.ts`.
- NextAuth gestiona la sesión del navegador (cookie), pero su `authorize()` no valida contra una base de datos local — llama al endpoint `/auth/login` del backend.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- NextAuth.js (Credentials provider, delega la validación al backend)
- Deploy: Vercel

## Estructura de carpetas (nivel proyecto)
```
/app
  /(buyer)                       → landing, catálogo, producto, carrito
  /(admin)                       → admin/login, admin/dashboard, admin/materia-prima, admin/produccion, admin/configuracion, admin/reportes
  /api                           → solo /auth/[...nextauth] y proxies delgados hacia el backend si hacen falta
/components
/hooks
/modals
/utils
/lib                             → auth.ts (config NextAuth), api-client.ts (llamadas al backend con token)
```

## Convenciones de código
Este proyecto sigue principios SOLID, código legible, mantenible y escalable. Las reglas detalladas de estructura de componentes, manejo de estado/rendimiento, y responsividad **no están aquí** — viven en skills dedicados para no cargar contexto de más en tareas que no son de frontend. Claude Code las carga automáticamente cuando la tarea coincide:

| Skill | Se activa cuando... |
|---|---|
| `component-structure` | Se crea, organiza o refactoriza un componente, hook, modal o carpeta (`/components`, `/hooks`, `/modals`, `/utils`), o un archivo se acerca a 130 líneas. |
| `state-performance` | Se agrega estado, `useEffect`, `useMemo`, `useCallback`, contexto, o se trabaja con inputs/formularios. |
| `responsive-design` | Se maqueta o revisa CSS/Tailwind de una pantalla o componente. |
| `code-review` | Se da por terminado un componente/feature, o se revisa código antes de un commit/PR. |

**Nunca inventes una paleta de colores nueva** — usa el mock de alta fidelidad ya cargado en el proyecto para colores, tipografía y espaciados exactos.
