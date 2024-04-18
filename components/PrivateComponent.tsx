import { Enum_RoleName } from '@prisma/client';
import { useSession } from 'next-auth/react';

interface PrivateComponentProps {
  children: React.ReactNode;
  roleName: Enum_RoleName;
}

const PrivateComponent = ({ roleName, children }: PrivateComponentProps) => {
  const { data } = useSession();

  if (data?.user.role === roleName) return <>{children}</>;

  return <></>;
};

export { PrivateComponent };
