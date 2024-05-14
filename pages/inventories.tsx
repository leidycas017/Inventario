import { NewMaterialDialog } from '@/components/materiales/NewMaterialDialog';
import { useState } from 'react';
import { useGetInventories } from '@/hooks/useGetInventories';
import { useGetUsers } from '@/hooks/useGetUsers';
import { useGetMateriales } from '@/hooks/useGetMateriales';

const UserPageWrapper = () => {
  return <InventoriesPage></InventoriesPage>;
};

const InventoriesPage = () => {
  const [openNewMaterialDialog, setOpenNewMaterialDialog] = useState(false);
  const { inventories } = useGetInventories();
  const { users } = useGetUsers();
  const { materiales } = useGetMateriales();

  return (
    <>
      <div className='w-full flex flex-col items-center p-10 gap-4'>
        <div className='flex flex-col items-center p-5 gap-5 bg-white'>
          <section>
            <div className='flex items-center gap-3'>
              <h1 className='text-black font-bold text-2xl'>
                Gestión de inventarios
              </h1>
              {/*
              <Tooltip message='Crear nuevo usuario'>
                <button
                  type='button'
                  onClick={() => setOpenNewMaterialDialog(true)}
                  className='flex text-2xl mt-2 hover:scale-110 text-indigo-700'
                >
                  <AiOutlinePlusCircle />
                </button>
              </Tooltip>
  */}
            </div>
          </section>
          <section>
            <table cellPadding='0'>
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Fecha de movimiento</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>Responsable</th>
                </tr>
              </thead>

              <tbody>
                {inventories?.map((inventory) => {
                  return (
                    <tr key={inventory.id}>
                      <td>{inventory.id}</td>
                      <td>
                        {materiales?.find((r) => r.id === inventory.materialId)
                          ?.updatedAt ?? ''}
                      </td>
                      <td>{inventory.quantity}</td>
                      <td>{0}</td>
                      <td>
                        {users?.find((r) => r.id === inventory.userId)?.name ??
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
