---
name: component-structure
description: Usar cuando se crea, organiza o refactoriza un componente, hook, modal, util o carpeta de componentes en este proyecto (React/Next.js). También usar cuando un archivo se acerca o supera las 130 líneas de código.
---

## Separar estilos, lógica y JSX
Ningún componente mezcla las tres cosas en un solo archivo. Estructura mínima por componente:
```
/Button
  index.tsx           → solo JSX/markup, recibe props e invoca el hook
  useButton.ts        → lógica: estado, handlers, efectos (el "controller" del componente)
  Button.styles.ts    → clases de Tailwind / variantes, sin lógica
```

`index.tsx` debe leerse casi como HTML: sin cálculos, sin handlers inline complejos, sin lógica condicional pesada. Todo eso vive en `useButton.ts`.

## Carpeta raíz con index para carpetas principales
Cada carpeta principal (`/components`, `/hooks`, `/modals`, `/utils`, etc.) tiene un `index.ts` en su raíz que reexporta todo lo que contiene:
```
/components
  index.ts            → export * from './Button'; export * from './Card'; ...
  /Button
    index.tsx
  /Card
    index.tsx
```

Esto permite imports limpios: `import { Button, Card } from '@/components'` en vez de rutas profundas.

## Subcarpetas para lógica/estilos/utils específicos de un componente
Si una función, util, estilo o subcomponente es exclusivo de un componente específico (no se reutiliza en otro lado), no va a la carpeta global de `/utils` o `/hooks` — va en una subcarpeta **dentro de la carpeta de ese componente**, nombrada según su propósito, con su propio `index.ts`:
```
/ProductCard
  index.tsx
  useProductCard.ts
  ProductCard.styles.ts
  /formatPrice        → util exclusivo de ProductCard
    index.ts
    formatPrice.ts
  /QuantityBadge      → subcomponente exclusivo de ProductCard
    index.tsx
```

Esta misma regla aplica de forma recursiva: un subcomponente dentro de un componente sigue la misma estructura (sus propios utils/estilos/hooks si los necesita).

## Límite de 130 líneas por archivo
Ningún archivo (componente, hook, util) debe superar las 130 líneas. Cuando un archivo se acerca a ese límite:
1. Identifica bloques de lógica independientes (validaciones, cálculos, sub-renders).
2. Extrae cada bloque a su propio archivo dentro de la subcarpeta del componente (hook aparte, util aparte, o subcomponente aparte).
3. El archivo original queda como orquestador delgado que importa y compone esas piezas.

## Props: máximo 4 por componente
Si un componente necesita más de 4 props, antes de agregar la quinta:
- Revisa si ya existe un contexto en el proyecto que cubra ese flujo — reutilízalo en vez de agregar props.
- Si no existe, evalúa si ese pedazo de flujo justifica crear uno nuevo (varios componentes hermanos/anidados necesitan la misma data).
- Si es un caso aislado, considera agrupar props relacionados en un solo objeto en vez de crear contexto innecesario.

## Prop drilling: máximo 4 niveles
Si una prop se pasa a través de más de 4 niveles de componentes solo para llegar a uno más profundo, es señal de crear o reutilizar un contexto — no seguir encadenando props.

## Hooks como "controllers"
La lógica de cada componente vive en un hook dedicado (`useNombreComponente`) que actúa como su controller: estado, handlers, efectos, cálculos derivados. El componente (`index.tsx`) solo consume lo que el hook expone.

No sobrecargues un hook. Si notas que mucha data está viajando de un hook a otro hook y de ahí a otro componente (cadenas de props/callbacks entre hooks), es señal de que ese flujo necesita un contexto en vez de seguir encadenando hooks.
