'use client';

import type { FormEvent } from 'react';
import { Button } from '@/components/Button';
import { FormAlert } from '@/components/FormAlert';
import { TextField } from '@/components/TextField';
import { FORM } from '../AuthModal.styles';
import type { Registration } from '../useAuthModal';

type RegisterFormProps = {
  onSubmit: (registration: Registration) => void;
  pending: boolean;
  error: string | null;
};

/** Registro de comprador: nombre, correo y contraseña (sin dirección en v1). */
export function RegisterForm({ onSubmit, pending, error }: RegisterFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      password: String(data.get('password') ?? ''),
    });
  };

  return (
    <form className={FORM} onSubmit={handleSubmit} noValidate>
      <FormAlert message={error} />
      <TextField label="Nombre" name="name" autoComplete="name" placeholder="Tu nombre" required />
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
        autoComplete="new-password"
        placeholder="Mínimo 8 caracteres"
        minLength={8}
        required
      />
      <Button type="submit" fullWidth disabled={pending}>
        {pending ? 'Creando cuenta…' : 'Crear cuenta'}
      </Button>
    </form>
  );
}
