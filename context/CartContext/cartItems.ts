import { purchasableUnits, type Product } from '@/lib/product';

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  photo: string | null;
  /** Tope de esta pieza: `min(5, stockQuantity)`, congelado al agregarla. */
  maxQuantity: number;
};

/** Suma unidades de una pieza al carrito, sin pasarse del tope de stock (D7). */
export function addProduct(items: CartItem[], product: Product, quantity: number): CartItem[] {
  const max = purchasableUnits(product.stockQuantity);
  if (max === 0 || quantity <= 0) return items;

  const existing = items.find((item) => item.productId === product.id);
  if (existing) {
    return setItemQuantity(items, product.id, existing.quantity + quantity);
  }

  return [
    ...items,
    {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: Math.min(quantity, max),
      photo: product.photos[0] ?? null,
      maxQuantity: max,
    },
  ];
}

/** Cambia la cantidad de un ítem. Bajar a 0 o menos lo saca del carrito. */
export function setItemQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  if (quantity <= 0) return removeProduct(items, productId);

  return items.map((item) =>
    item.productId === productId
      ? { ...item, quantity: Math.min(quantity, item.maxQuantity) }
      : item,
  );
}

export function removeProduct(items: CartItem[], productId: string): CartItem[] {
  return items.filter((item) => item.productId !== productId);
}

export function countUnits(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function sumTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
