'use client';

import type { ReactNode } from 'react';
import { CLOSE_BUTTON, OVERLAY, PANEL, TITLE } from './Dialog.styles';
import { useDialog } from './useDialog';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Dialog({ open, onClose, title, children }: DialogProps) {
  useDialog(open, onClose);

  if (!open) return null;

  return (
    <div className={OVERLAY} onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={PANEL}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" onClick={onClose} className={CLOSE_BUTTON} aria-label="Cerrar">
          &#215;
        </button>
        <h2 className={TITLE}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
