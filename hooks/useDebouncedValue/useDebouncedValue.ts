'use client';

import { useEffect, useState } from 'react';

/**
 * Devuelve `value` con retardo: solo se actualiza cuando pasan `delayMs` sin
 * que cambie. Sirve para no disparar una petición por cada tecla escrita
 * (ver skill state-performance).
 *
 * El efecto es legítimo: sincroniza con un temporizador, que es externo a React.
 */
export function useDebouncedValue<T>(value: T, delayMs = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
