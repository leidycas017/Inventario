import { Tooltip } from '@/components/ui/Tooltip';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { NewMaterialDialog } from '@/components/materiales/NewMaterialDialog';
import { useState } from 'react';
import { useGetMateriales } from '@/hooks/useGetMateriales';
import { useGetUsers } from '@/hooks/useGetUsers';

const UserPageWrapper = () => {
  return <MaterialPage></MaterialPage>;
};

const MaterialPage = () => {
  const [openNewMaterialDialog, setOpenNewMaterialDialog] = useState(false);
  const { materiales } = useGetMateriales();
  const { users } = useGetUsers();

  return (
    <>
      <div className='w-full flex flex-col items-center p-10 gap-4'>
        <div className='flex flex-col items-center p-5 gap-5 bg-white'>
          <section>
            <div className='flex items-center gap-3'>
              <h1 className='text-black font-bold text-2xl'>
                Gestión de materiales
              </h1>
              <Tooltip message='Crear nuevo usuario'>
                <button
                  type='button'
                  onClick={() => setOpenNewMaterialDialog(true)}
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
                  <th>Nombre</th>
                  <th>Saldo</th>
                  <th>Creado por</th>
                </tr>
              </thead>
              <tbody>
                {materiales?.map((material) => {
                  return (
                    <tr key={material.id}>
                      <td>{material.id}</td>
                      <td>
                        {material.createdAt
                          ? new Date(material.createdAt).toDateString()
                          : ''}
                      </td>
                      <td>{material.name}</td>
                      <td>{material.quantity}</td>
                      <td>
                        {users?.find((r) => r.id === material.userId)?.name ??
                          ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <NewMaterialDialog
            open={openNewMaterialDialog}
            setOpen={setOpenNewMaterialDialog}
          />
        </div>
      </div>
    </>
  );
};
export default UserPageWrapper;
