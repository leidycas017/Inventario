import { SideNavigation } from '@/components/ui/SideNavigation';
import { useGetUsers } from '@/hooks/useGetUsers';

const UsersPage = () => {
  const { users, isLoading, error } = useGetUsers();
  if (isLoading) return <div>cargando...</div>;
  if (error) return <div>Ha ocurrido un error</div>;
  return (
    <>
      <SideNavigation />
      <div className='w-full flex flex-col items-center p-10 gap-4'>
        <div className='flex flex-col items-center p-5 gap-5 bg-white'>
          <section>
            <h1 className='font-black'>Gestión de usuarios</h1>
          </section>
          <section>
            <table cellPadding='0'>
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Fecha de creación</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.emailVerified.toLocaleString()}</td>
                      <td>{user.email}</td>
                      <td>{user.roleId}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  );
};
export default UsersPage;
