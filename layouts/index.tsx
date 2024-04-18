import { SideNavigation } from '@/components/ui/SideNavigation';
import { signOut, useSession } from 'next-auth/react';

interface LayoutProps {
  children: React.ReactNode;
}

export interface iUserSessionData {
  id: string;
  name: string;
  email: string;
  image: string;
}

const Layout = ({ children }: LayoutProps) => {
  const { status, data } = useSession();
  const userData = data?.user as iUserSessionData;

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' }); // Redirige al usuario después del cierre de sesión
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'authenticated') {
    return (
      <main>
        <SideNavigation
          name={userData?.name}
          image={userData?.image}
          email={userData?.email}
          handleLogout={handleLogout}
        />
        {children}
      </main>
    );
  }
  return <main>{children}</main>;
};

export { Layout };
