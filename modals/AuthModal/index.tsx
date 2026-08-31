'use client';

import { Dialog } from '@/components/Dialog';
import { BODY, TOGGLE_ACTIVE, TOGGLE_BASE, TOGGLE_IDLE, TOGGLE_ROW } from './AuthModal.styles';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useAuthModal, type AuthMode } from './useAuthModal';

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  initialMode: AuthMode;
};

const TABS: ReadonlyArray<{ mode: AuthMode; label: string }> = [
  { mode: 'login', label: 'Iniciar sesión' },
  { mode: 'register', label: 'Crear cuenta' },
];

export function AuthModal({ open, onClose, initialMode }: AuthModalProps) {
  const { mode, changeMode, pending, error, submitLogin, submitRegister } =
    useAuthModal(initialMode);

  return (
    <Dialog open={open} onClose={onClose} title={mode === 'login' ? 'Bienvenida' : 'Crear cuenta'}>
      <div className={BODY}>
        <div className={TOGGLE_ROW} role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.mode}
              type="button"
              role="tab"
              aria-selected={mode === tab.mode}
              onClick={() => changeMode(tab.mode)}
              className={`${TOGGLE_BASE} ${mode === tab.mode ? TOGGLE_ACTIVE : TOGGLE_IDLE}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {mode === 'login' ? (
          <LoginForm onSubmit={submitLogin} pending={pending} error={error} />
        ) : (
          <RegisterForm onSubmit={submitRegister} pending={pending} error={error} />
        )}
      </div>
    </Dialog>
  );
}
