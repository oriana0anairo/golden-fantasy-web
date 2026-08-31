import { AdminLoginForm } from '@/components';
import { PAGE } from '@/components/AdminLoginForm/AdminLoginForm.styles';
import { safeAdminRedirect } from '@/components/AdminLoginForm/safeAdminRedirect';

type AdminLoginPageProps = {
  searchParams: Promise<{ from?: string }>;
};

/**
 * Entrada al taller (D4): el link de la landing llega aquí, nunca directo al
 * dashboard. El middleware deja pasar esta ruta sin sesión.
 *
 * `from` se lee y se sanea en el servidor para que el formulario se renderice
 * en el HTML inicial (sin `useSearchParams`, que forzaría render solo cliente).
 */
export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { from } = await searchParams;

  return (
    <main className={PAGE}>
      <AdminLoginForm redirectTo={safeAdminRedirect(from)} />
    </main>
  );
}
