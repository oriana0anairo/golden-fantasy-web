import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { BrandMark } from '@/components';
import { SignOutButton } from './SignOutButton';

/** Dashboard 8.7 — placeholder de Épica 1. El inventario real llega en Épica 4. */
export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-(--color-surface-inverse) px-4 py-10">
      <div className="w-full max-w-md rounded-(--radius-panel) bg-(--color-surface) px-6 py-10 text-center shadow-(--shadow-card) sm:px-8">
        <BrandMark tagline="Taller" />
        <h1 className="mt-8 font-display text-2xl text-(--color-ink)">Bienvenido al taller</h1>
        <p className="mt-2 font-body text-sm text-(--color-ink-soft)">
          {session?.user?.name ?? session?.user?.email}
        </p>
        <p className="mt-6 font-body text-sm leading-relaxed text-(--color-ink-soft)">
          Aquí verás el inventario y la producción. Por ahora es una pantalla de bienvenida.
        </p>
        <SignOutButton />
      </div>
    </main>
  );
}
