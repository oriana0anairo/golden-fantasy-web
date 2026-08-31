/**
 * Roles que devuelve el backend. Se normalizan a MAYÚSCULAS al recibirlos
 * (`normalizeRole`) para no depender de cómo los serialice el backend.
 */
export const ROLES = {
  BUYER: 'BUYER',
  ADMIN_OWNER: 'ADMIN_OWNER',
  ADMIN_COLLABORATOR: 'ADMIN_COLLABORATOR',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

const ADMIN_ROLES: readonly Role[] = [ROLES.ADMIN_OWNER, ROLES.ADMIN_COLLABORATOR];

/** Convierte el `role` crudo del backend en un `Role` conocido, o `null`. */
export function normalizeRole(rawRole: unknown): Role | null {
  if (typeof rawRole !== 'string') return null;
  const candidate = rawRole.trim().toUpperCase();
  return candidate in ROLES ? (candidate as Role) : null;
}

/** Regla de negocio: solo estos roles pueden entrar al taller (`/admin/*`). */
export function isAdminRole(role: Role | null | undefined): boolean {
  return role != null && ADMIN_ROLES.includes(role);
}
