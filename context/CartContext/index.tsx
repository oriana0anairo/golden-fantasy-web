'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Product } from '@/lib/product';
import {
  addProduct,
  countUnits,
  removeProduct,
  setItemQuantity,
  sumTotal,
  type CartItem,
} from './cartItems';

export type { CartItem } from './cartItems';

type CartValue = {
  items: CartItem[];
  unitCount: number;
  total: number;
  add: (product: Product, quantity: number) => void;
  remove: (productId: string) => void;
  changeQuantity: (productId: string, quantity: number) => void;
};

const CartCtx = createContext<CartValue | null>(null);

/**
 * Carrito en memoria (C2). No se persiste todavía: la Épica 3 lo convierte en
 * un `Order` al pagar, así que no hay nada que sobreviva a la recarga aún.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = useCallback((product: Product, quantity: number) => {
    setItems((current) => addProduct(current, product, quantity));
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((current) => removeProduct(current, productId));
  }, []);

  const changeQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) => setItemQuantity(current, productId, quantity));
  }, []);

  // `items` es la única fuente: el conteo y el total se derivan, no se duplican
  // en estado aparte (ver skill state-performance).
  const value = useMemo<CartValue>(
    () => ({
      items,
      unitCount: countUnits(items),
      total: sumTotal(items),
      add,
      remove,
      changeQuantity,
    }),
    [items, add, remove, changeQuantity],
  );

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart(): CartValue {
  const context = useContext(CartCtx);
  if (!context) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return context;
}
