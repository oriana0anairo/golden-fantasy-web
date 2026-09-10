import type { ReactNode } from 'react';
import { CartProvider } from '@/context';
import { Providers } from '../providers';

export default function BuyerLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <CartProvider>{children}</CartProvider>
    </Providers>
  );
}
