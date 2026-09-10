'use client';

import { Search, User } from 'lucide-react';
import { BrandMark, IconButton, TextField } from '@/components';
import { CartButton } from './CartButton';
import { ACTIONS, HEADER, SEARCH, USER_LABEL } from './CatalogHeader.styles';
import { useCatalogHeader } from './useCatalogHeader';

type CatalogHeaderProps = {
  onSearch: (search: string) => void;
  onOpenAuth: () => void;
};

export function CatalogHeader({ onSearch, onOpenAuth }: CatalogHeaderProps) {
  const { value, setValue, unitCount, userLabel, isLoggedIn } = useCatalogHeader(onSearch);

  return (
    <header className={HEADER}>
      <BrandMark size="sm" tagline={null} />

      <div className={SEARCH}>
        <TextField
          label="Buscar en el catálogo"
          hideLabel
          icon={Search}
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Buscar por nombre…"
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
        <CartButton unitCount={unitCount} />
      </div>
    </header>
  );
}
