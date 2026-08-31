import type { DefaultSession } from 'next-auth';
import type { Role } from '@/lib/roles';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: Role;
    };
  }

  interface User {
    id: string;
    role: Role;
    /** JWT del backend. Nunca se expone al navegador — solo viaja en el token. */
    backendToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    role: Role;
    backendToken: string;
  }
}
