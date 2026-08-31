import type { ReactNode } from 'react';
import { BAR } from './AnnouncementBar.styles';

type AnnouncementBarProps = {
  children: ReactNode;
};

/** Franja de aviso de ancho completo, fija sobre el header del catálogo. */
export function AnnouncementBar({ children }: AnnouncementBarProps) {
  return <div className={BAR}>{children}</div>;
}
