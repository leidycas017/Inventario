import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return (
    <main className='h-screen w-full flex justify-center items-center'>
      <section className='flex flex-col gap-4 items-center'>
        <h1 className='text-white'>Esta página requiere autenticación</h1>

        <Link href='/'>
          <span className='text-blue-500 text-xl'>Ir al home</span>
        </Link>
      </section>
    </main>
  );
};

export { PrivateRoute };
