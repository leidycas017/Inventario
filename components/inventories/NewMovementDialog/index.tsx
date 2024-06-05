import { Dialog } from "@/components/ui/Dialog";
import { API_SERVICES } from '@/service';
import { Dispatch, SetStateAction, SyntheticEvent, useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import { toast } from "react-toastify";
import { PrimaryActionButton } from '@/components/ui/Buttons/PrimaryActionButton';
import { SecondaryActionButton } from '@/components/ui/Buttons/SecondaryActionButton';
import { useGetMateriales } from '@/hooks/useGetMateriales';
import { Enum_MovementType } from "@/types/inventory";
import { iUserSessionData } from '@/layouts';
import { useGetUsers } from '@/hooks/useGetUsers';
import { useSession } from 'next-auth/react';
import { RequiredMark } from '@/components/ui/Forms/RequiredMark';
import { mutate } from 'swr';

interface NewMovementDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMovementDialog = ({ open, setOpen }: NewMovementDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { data: dataUsuario } = useSession();
  const userData = dataUsuario?.user as iUserSessionData;
  const { users: usersList } = useGetUsers();
  const currentUserId = usersList?.find((u) => u.email == userData?.email)?.id;

  const { materiales } = useGetMateriales();

  const initialFormData = {
    movementType: "Seleccione el tipo de movieminto",
    materialId: "Seleccione el material",
    quantity: 0,
    userId: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (currentUserId) {
      setFormData((prevData) => ({
        ...prevData,
        userId: currentUserId,
      }));
    }
  }, [currentUserId]);

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.request({
        method: 'POST',
        url: API_SERVICES.inventories,
        data: {
          ...formData,
        },
      });

      await mutate(API_SERVICES.inventories);
      toast.success('Movimiento creado correctamente');

      // Reiniciar el formulario
      setFormData(initialFormData);
      setOpen(false);
    } catch (error) {
      const errorResponse = error as AxiosError;
      const errorData = errorResponse?.response?.data as { message: string };

      if (errorData?.message.includes('Unique constraint failed on the fields: (`name`)')) {
        toast.error('Error: No se agrego el movimiento');
      } else {
        toast.error('Error al agregar movimiento');
      }
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} title={`Crear movimiento`}>
      <form className="flex flex-col gap-3" onSubmit={submitForm}>
        <label htmlFor="material">
          <span>
            Material <RequiredMark />
          </span>
          <select
            name="materialId"
            required
            value={formData.materialId}
            onChange={handleSelectChange}
          >
            <option disabled>Seleccione el material</option>
            {materiales?.map((material, index) => (
              <option value={material.id} key={index}>
                {material.name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="movement-type">
          <span>
            Tipo de Movimiento <span className="text-red-500">*</span>
          </span>
          <select
            name="movementType"
            required
            value={formData.movementType}
            onChange={handleSelectChange}
          >
            <option disabled>Seleccione el tipo de movieminto</option>
            {Object.values(Enum_MovementType).map((movement, index) => (
              <option value={movement} key={index}>
                {movement}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="quantity">
          <span>
            Cantidad <span className="text-red-500">*</span>
          </span>
          <input
            name='quantity'
            type='number'
            placeholder='0'
            required
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
          />
        </label>
        <div className="flex gap-3 w-full justify-center">
          <PrimaryActionButton
            loading={loading}
            text="Agregar Movimiento"
            type="submit"
            onClick={() => {}}
          />
          <SecondaryActionButton
            onClick={() => setOpen(false)}
            text="Cancel"
            loading={loading}
            type="button"
          />
        </div>
      </form>
    </Dialog>
  );
};

export { NewMovementDialog };