import { PrimaryActionButton } from '@/components/ui/Buttons/PrimaryActionButton';
import { useSession, signIn } from 'next-auth/react';

const Home = () => {
  const { status } = useSession();
  return (
    <main className='flex flex-col h-screen w-full items-center justify-center'>
      <h1 className='text-white font-bold text-4xl'>
        Sistema de Gestión de Inventarios
      </h1>
      {status === 'authenticated' ? (
        <div className='text-white font-bold text-4xl mt-6'>Bienvenido</div>
      ) : (
        <div className='mt-4'>
          <PrimaryActionButton
            loading={status === 'loading'}
            text='Iniciar sesión'
            onClick={() => {
              signIn('auth0');
            }}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
