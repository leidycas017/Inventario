import { Enum_RoleName } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { PrivateRoute } from './PrivateRoute';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleName: Enum_RoleName;
}

const ProtectedRoute = ({ roleName, children }: ProtectedRouteProps) => {
  const { data } = useSession();

  if (data?.user.role === roleName) return <>{children}</>;

  return (
    <PrivateRoute>
      <main className='h-screen w-full flex justify-center items-center'>
        <section className='flex flex-col gap-4 items-center'>
          <h1>No tienes permisos suficientes para acceder a esta página</h1>

          <Link href='/'>
            <span className='text-blue-500 text-xl'>Ir al home</span>
          </Link>
        </section>
      </main>
    </PrivateRoute>
  );
};

export { ProtectedRoute };
