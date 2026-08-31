'use client';

import type { FormEvent } from 'react';
import Link from 'next/link';
import { BrandMark } from '@/components/BrandMark';
import { Button } from '@/components/Button';
import { FormAlert } from '@/components/FormAlert';
import { TextField } from '@/components/TextField';
import {
  BACK_LINK,
  FORM,
  HEADING,
  PANEL,
  SUBHEADING,
} from './AdminLoginForm.styles';
import { useAdminLoginForm } from './useAdminLoginForm';

type AdminLoginFormProps = {
  /** Ruta a la que volver tras autenticar. Ya saneada por la página. */
  redirectTo: string;
};

/** Formulario de `/admin/login` — separado del modal de comprador (D2). */
export function AdminLoginForm({ redirectTo }: AdminLoginFormProps) {
  const { pending, error, submit } = useAdminLoginForm(redirectTo);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    submit(String(data.get('email') ?? ''), String(data.get('password') ?? ''));
  };

  return (
    <div className={PANEL}>
      <BrandMark tagline="Taller" />

      <div className="mt-8">
        <h1 className={HEADING}>Entrar al taller</h1>
        <p className={SUBHEADING}>Acceso solo para el equipo del taller.</p>
      </div>

      <form className={FORM} onSubmit={handleSubmit} noValidate>
        <FormAlert message={error} />
        <TextField
          label="Correo"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="admin@goldenfantasy.co"
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
          {pending ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>

      <Link href="/" className={BACK_LINK}>
        Volver a la tienda
      </Link>
    </div>
  );
}
