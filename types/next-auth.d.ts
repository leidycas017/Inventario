
import { Enum_RoleName } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: Enum_RoleName;
    };
  }
}
