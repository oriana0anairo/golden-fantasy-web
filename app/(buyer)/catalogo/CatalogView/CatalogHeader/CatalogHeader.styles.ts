/**
 * Hasta 640px el header se apila en dos filas (marca + acciones arriba,
 * búsqueda debajo a lo ancho): en una sola fila el input quedaba en ~58px,
 * inservible para escribir. Desde `sm` vuelve a la fila única del mock.
 */
export const HEADER =
  'flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-(--color-line) ' +
  'bg-(--color-surface) px-6 py-5 sm:flex-nowrap sm:gap-8 sm:px-10';

export const SEARCH = 'order-3 w-full min-w-0 sm:order-none sm:w-auto sm:max-w-[420px] sm:flex-1';

export const ACTIONS = 'ml-auto flex items-center gap-4';

export const USER_LABEL = 'hidden text-xs tracking-wide text-(--color-ink-soft) sm:inline';
