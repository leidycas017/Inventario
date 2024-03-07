import { SideNavigation } from '@/components/ui/SideNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <SideNavigation />
      {children}
    </main>
  );
};

export { Layout };
