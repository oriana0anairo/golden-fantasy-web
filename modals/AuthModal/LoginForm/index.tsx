'use client';

import type { FormEvent } from 'react';
import { Button } from '@/components/Button';
import { FormAlert } from '@/components/FormAlert';
import { TextField } from '@/components/TextField';
import { FORM } from '../AuthModal.styles';
import type { Credentials } from '../useAuthModal';

type LoginFormProps = {
  onSubmit: (credentials: Credentials) => void;
  pending: boolean;
  error: string | null;
};

/**
 * Formulario no controlado: los valores se leen del DOM al enviar, así
 * escribir no dispara renders en el modal (ver skill state-performance).
 */
export function LoginForm({ onSubmit, pending, error }: LoginFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      email: String(data.get('email') ?? ''),
      password: String(data.get('password') ?? ''),
    });
  };

  return (
    <form className={FORM} onSubmit={handleSubmit} noValidate>
      <FormAlert message={error} />
      <TextField
        label="Correo"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="tucorreo@ejemplo.com"
        required
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        required
      />
      <Button type="submit" fullWidth disabled={pending}>
        {pending ? 'Entrando…' : 'Iniciar sesión'}
      </Button>
    </form>
  );
}
