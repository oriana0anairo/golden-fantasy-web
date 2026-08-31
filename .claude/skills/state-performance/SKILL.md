---
name: state-performance
description: Usar cuando se agrega estado (useState), useEffect, useMemo, useCallback, o contexto, o cuando se trabaja con inputs de formularios y rendimiento de render.
---

## No sobrecargar el proyecto de estados ni efectos
Antes de crear un `useState` o `useEffect` nuevo:
1. Revisa si ya existe un estado en el componente/hook/contexto que ya sirva para lo que necesitas (aunque no tenga el nombre exacto).
2. Revisa si el valor que necesitas se puede **derivar** de un estado existente en vez de duplicarlo en uno nuevo (ej: no guardes `filteredItems` en estado si se puede calcular en el render a partir de `items` + `filter`).
3. Revisa si el `useEffect` que estás por escribir realmente necesita sincronizar con algo externo (API, suscripción, DOM), o si es lógica que puede resolverse directamente en un handler o en un valor derivado. Un efecto que solo reacciona a un cambio de estado para actualizar otro estado casi siempre se puede evitar.

Son necesarios cuando de verdad hay estado real que mantener o un efecto secundario genuino — la regla es no agregarlos por defecto sin antes descartar las opciones de arriba.

## useMemo y useCallback: uso correcto, no automático
- Úsalos cuando resuelven un problema real: un cálculo costoso que se repite innecesariamente, o evitar que un componente hijo memoizado (`React.memo`) se re-renderice por una referencia nueva en cada render.
- No los apliques "por si acaso" a todo. Memoizar algo barato agrega complejidad sin beneficio.
- **Si existe riesgo de que generen un ciclo de dependencias inestable (loop infinito o recomputo constante), prefiere NO usarlos** antes que forzarlos con un array de dependencias mal ajustado o un `eslint-disable`. Es mejor un componente sin memoizar que uno con un loop.

## Rendimiento en inputs
Cuidado especial con inputs de texto/formularios: cada tecla escrita dispara un render, y ese render no debe propagarse a todo el árbol de componentes.
- Si el estado del input vive en un componente padre grande, cada tecla re-renderiza ese padre y todos sus hijos. Aísla el input (y su estado) en su propio componente pequeño para que el render quede contenido ahí.
- Para inputs que disparan lógica pesada (búsqueda, validación contra API, cálculos), usa debounce antes de ejecutar esa lógica — no en cada tecla.
- Evalúa si el input necesita ser controlado por React en cada tecla, o si un input no controlado con `ref` (leyendo el valor solo al submit) es suficiente para el caso de uso.

## Prop drilling y contexto
Si notas mucha data viajando entre hooks y componentes, o props pasando por más de 4 niveles solo para llegar a un componente profundo, es señal de introducir un contexto — ver también el skill `component-structure` para el límite de props.
