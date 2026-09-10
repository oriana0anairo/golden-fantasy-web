'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context';
import { useDebouncedValue } from '@/hooks';

/**
 * Controller del header del catálogo.
 *
 * El texto que se escribe vive AQUÍ, no en el catálogo: así cada tecla
 * re-renderiza solo el header y no el grid entero. Al padre solo le llega el
 * valor con debounce (ver skill state-performance).
 */
export function useCatalogHeader(onSearch: (search: string) => void) {
  const { data: session } = useSession();
  const { unitCount } = useCart();
  const [value, setValue] = useState('');
  const debounced = useDebouncedValue(value);

  useEffect(() => {
    onSearch(debounced.trim());
    // `onSearch` viene memoizado del catálogo; incluirlo re-dispararía de más.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const name = session?.user?.name;

  return {
    value,
    setValue,
    unitCount,
    userLabel: name ? `Hola, ${name}` : 'Invitada',
    isLoggedIn: Boolean(session?.user),
  };
}
