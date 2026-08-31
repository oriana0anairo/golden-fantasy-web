'use client';

import { Search, ShoppingBag, User } from 'lucide-react';
import { BrandMark, IconButton, TextField } from '@/components';
import { ACTIONS, HEADER, SEARCH, USER_LABEL } from './CatalogHeader.styles';
import { useCatalogHeader } from './useCatalogHeader';

type CatalogHeaderProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onOpenAuth: () => void;
};

export function CatalogHeader({ query, onQueryChange, onOpenAuth }: CatalogHeaderProps) {
  const { userLabel, isLoggedIn } = useCatalogHeader();

  return (
    <header className={HEADER}>
      <BrandMark size="sm" tagline={null} />

      <div className={SEARCH}>
        <TextField
          label="Buscar en el catálogo"
          hideLabel
          icon={Search}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Buscar canastos, cerámica, textiles…"
        />
      </div>

      <div className={ACTIONS}>
        <span className={USER_LABEL}>{userLabel}</span>
        <IconButton
          icon={User}
          label="Mi cuenta"
          variant="outline"
          onClick={isLoggedIn ? undefined : onOpenAuth}
        />
        <IconButton icon={ShoppingBag} label="Ver carrito" variant="solid" href="/carrito" />
      </div>
    </header>
  );
}
