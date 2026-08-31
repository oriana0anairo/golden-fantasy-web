---
name: responsive-design
description: Usar cuando se construye o revisa CSS/Tailwind de una pantalla o componente para responsividad, o al maquetar cualquier vista nueva.
---

## Breakpoint mínimo: 450px
Toda maqueta debe funcionar correctamente hasta un ancho de **450px**, salvo tablas. Diseña mobile-first: parte del layout más angosto y expande hacia desktop, no al revés.

## Excepción: tablas / contenido tabular denso
Las tablas (o cualquier contenido tabular con muchas columnas) **no** siguen automáticamente la regla de 450px — comprimir una tabla ancha a ese tamaño casi siempre la vuelve ilegible.

Si el componente que vas a construir es una tabla o contenido tabular:
- **No asumas una solución por tu cuenta** (scroll horizontal, colapsar a cards, ocultar columnas, etc.).
- Pregunta explícitamente cómo se debe gestionar esa vista en mobile antes de implementarla.

Ejemplos en este proyecto donde esto probablemente aplica: listado de stock en el dashboard de inventario (8.7), listado de materiales en registro de producción (8.8).
