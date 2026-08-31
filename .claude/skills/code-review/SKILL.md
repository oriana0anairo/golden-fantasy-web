---
name: code-review
description: Usar antes de dar por terminado un componente, archivo o feature, o al revisar código existente para calidad, principios SOLID y rendimiento.
---

## Principios generales
- Sigue principios **SOLID** al diseñar componentes, hooks y utils — en particular responsabilidad única (un componente/hook hace una cosa) y bajo acoplamiento (un componente no debería depender de detalles internos de otro).
- El código debe ser **legible**: nombres descriptivos, sin abreviaturas crípticas, funciones cortas que se entienden sin comentarios extensos.
- El código debe ser **mantenible y escalable**: pensar en que otra persona (o Claude Code en otra sesión) lo va a tocar sin contexto previo.

## Checklist antes de cerrar un componente/feature
1. **Estructura de carpetas** — ¿sigue el patrón de `component-structure` (separación estilos/lógica/jsx, index de barrel, subcarpetas para lo específico del componente)?
2. **Tamaño de archivo** — ¿algún archivo se acerca o supera las 130 líneas? Si es así, dividir antes de continuar (ver `component-structure`).
3. **Props** — ¿algún componente recibe más de 4 props? ¿Se evaluó contexto en vez de seguir agregando props?
4. **Estado y efectos** — ¿hay `useState`/`useEffect` que se podrían evitar reutilizando estado existente o derivando el valor? (ver `state-performance`)
5. **useMemo/useCallback** — ¿están resolviendo un problema real, o se agregaron "por si acaso"? ¿Hay riesgo de loop por dependencias mal definidas?
6. **Rendimiento de inputs** — si hay inputs de texto, ¿el render está contenido y no se propaga a todo el árbol?
7. **Responsividad** — ¿la vista funciona hasta 450px? Si es una tabla, ¿se confirmó con el usuario cómo manejarla en mobile?
8. **Fuera de alcance v1** — ¿el cambio no está construyendo algo listado como fuera de alcance en `CLAUDE.md` (alertas de stock, gestión de usuarios, historial de pedidos, cálculo de envío, checkout stepper)?
