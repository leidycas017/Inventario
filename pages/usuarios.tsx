import { UsersTableActions } from '@/components/usuarios/UsersTableActions';
import { useGetUsers } from '@/hooks/useGetUsers';
import { useGetRoles } from '@/hooks/useGetRoles';
import { Tooltip } from '@/components/ui/Tooltip';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { NewUserDialog } from '@/components/usuarios/NewUserDialog';
import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const UserPageWrapper = () => {
  return (
    <ProtectedRoute roleName='ADMIN'>
      <UsersPage></UsersPage>
    </ProtectedRoute>
  );
};

const UsersPage = () => {
  const [openNewUserDialog, setOpenNewUserDialog] = useState(false);
  const { users, isLoading, error } = useGetUsers();
  const { roles } = useGetRoles();

  if (isLoading) return <div>cargando...</div>;
  if (error) return <div>Ha ocurrido un error</div>;
  return (
    <>
      <div className='w-full flex flex-col items-center p-10 gap-4'>
        <div className='flex flex-col items-center p-5 gap-5 bg-white'>
          <section>
            <div className='flex items-center gap-3'>
              <h1 className='text-black font-bold text-2xl'>
                Gestión de usuarios
              </h1>
              <Tooltip message='Crear nuevo usuario'>
                <button
                  type='button'
                  onClick={() => setOpenNewUserDialog(true)}
                  className='flex text-2xl mt-2 hover:scale-110 text-indigo-700'
                >
                  <AiOutlinePlusCircle />
                </button>
              </Tooltip>
            </div>
          </section>
          <section>
            <table cellPadding='0'>
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Fecha de creación</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        {user?.emailVerified
                          ? new Date(user.emailVerified).toLocaleDateString()
                          : new Date().toLocaleDateString()}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        {roles?.find((r) => r.id === user.roleId)?.name ?? ''}
                      </td>
                      <td>
                        <UsersTableActions user={user} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <NewUserDialog
            open={openNewUserDialog}
            setOpen={setOpenNewUserDialog}
          />
        </div>
      </div>
    </>
  );
};
export default UserPageWrapper;
