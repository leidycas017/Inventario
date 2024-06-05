import React, { useState, useEffect } from 'react';
import { NewMovementDialog } from "@/components/inventories/NewMovementDialog";
import { refetchInventories, useGetInventories } from '@/hooks/useGetInventories';
import { useGetUsers } from '@/hooks/useGetUsers';
import { useGetMateriales } from '@/hooks/useGetMateriales';
import { InventoryChart } from "@/components/ui/Charts/InventoryChart";
import { PrivateComponent } from '@/components/PrivateComponent';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Tooltip } from '@/components/ui/Tooltip';
import { Dropdown } from "@/components/ui/Buttons/Dropdown";
import { KeyValuePair } from "tailwindcss/types/config";
import { Enum_MovementType, Inventory} from "@/types/inventory";

const UserPageWrapper = () => {
  return <InventoriesPage />;
};

const InventoriesPage = () => {
  const [openNewMovementDialog, setOpenNewMovementDialog] = useState(false);
  const { inventories: rawInventories } = useGetInventories();
  const { users } = useGetUsers();
  const { materiales } = useGetMateriales();
  const [materialSelected, setMaterialSelected] = useState<string | undefined>(
    materiales?.at(0)?.id
  );

  const materialsOptions: KeyValuePair<string, string>[] = materiales?.map(
    (material) => {
      return { key: material.id, value: material.name };
    }
  ) || [];

  useEffect(() => {
    refetchInventories();
  }, [materialSelected]);

  const selectMaterial = (selectedOption: string) => {
    setMaterialSelected(selectedOption);
  };

  const inventories = rawInventories?.map(inventory => {
    const material = materiales?.find(r => r.id === inventory.materialId);
    const createdBy = users?.find(r => r.id === inventory.userId);

    if (!material || !createdBy) {
      return null;
    }

    return {
      ...inventory,
      material,
      createdBy,
      createdAt: material.updatedAt, 
      movementType: inventory.movementType as Enum_MovementType,
    };
  }).filter(inventory => inventory && inventory.material.id === materialSelected) as Inventory[] || [];

  return (
    <>
      <div className='w-full flex flex-col items-center p-10 gap-4'>
        <div className='flex flex-col items-center p-5 gap-5 bg-white'>
          <section>
            <div className='flex items-center gap-3'>
              <h1 className='text-black font-bold text-2xl'>
                Gestión de inventario
              </h1>
              <PrivateComponent roleName='ADMIN'>
                <Tooltip message='Agregar movimiento'>
                  <button
                    type='button'
                    onClick={() => setOpenNewMovementDialog(true)}
                    className='flex text-2xl mt-2 hover:scale-110 text-indigo-700'
                  >
                    <AiOutlinePlusCircle />
                  </button>
                </Tooltip>
              </PrivateComponent>
            </div>
          </section>
          <section>
          <Dropdown
            options={materialsOptions}
            onSelect={selectMaterial}
          ></Dropdown>
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
                  const updatedAtString =
                    inventory.createdAt
                      ? new Date(inventory.createdAt).toLocaleDateString()
                      : '';

                  return (
                    <tr key={inventory.id}>
                      <td>{inventory.id}</td>
                      <td>{updatedAtString}</td>
                      <td>{inventory.movementType === 'ENTRADA' ? inventory.quantity : 0}</td>
                      <td>{inventory.movementType === 'SALIDA' ? inventory.quantity : 0}</td>
                      <td>{inventory.createdBy?.name ?? ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <section className="flex justify-center">
            <InventoryChart inventories={inventories} />
          </section>
          <NewMovementDialog
            open={openNewMovementDialog}
            setOpen={setOpenNewMovementDialog}
          />
        </div>
      </div>
    </>
  );
};

export default UserPageWrapper;
