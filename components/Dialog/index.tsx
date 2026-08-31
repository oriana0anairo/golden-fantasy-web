'use client';

import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { CLOSE_BUTTON, OVERLAY, panelClasses, TITLE, type DialogSize } from './Dialog.styles';
import { useDialog } from './useDialog';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** `false` para diálogos con su propio encabezado visual (ej. detalle de producto). */
  showTitle?: boolean;
  size?: DialogSize;
  children: ReactNode;
};

export function Dialog({ open, onClose, title, showTitle = true, size = 'md', children }: DialogProps) {
  useDialog(open, onClose);

  if (!open) return null;

  return (
    <div className={OVERLAY} onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={panelClasses(size)}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" onClick={onClose} className={CLOSE_BUTTON} aria-label="Cerrar">
          <X size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
        {showTitle && <h2 className={TITLE}>{title}</h2>}
        {children}
      </div>
    </div>
  );
}
