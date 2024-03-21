import { PrimaryActionButton } from '@/components/ui/Buttons/PrimaryActionButton';
import { SecondaryActionButton } from '@/components/ui/Buttons/SecondaryActionButton';
import { Dialog } from '@/components/ui/Dialog';
import { useGetRoles } from '@/hooks/useGetRoles';
import { API_SERVICES } from '@/service';
import { User } from '@prisma/client';
import { Dispatch, SetStateAction, useState, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import axios from 'axios';

interface UpdateUserDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

const UpdateUserDialog = ({ open, setOpen, user }: UpdateUserDialogProps) => {
  const [loading, setLoading] = useState(false);

  const { roles } = useGetRoles();

  const [formData, setFormData] = useState({
    name: user.name,
    roleId: user.roleId,
  });

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // request para actualizar el usuario
      await axios.request({
        method: 'PUT',
        url: `${API_SERVICES.users}/${user?.id ?? ''}`,
        data: { name: formData.name, roleId: formData.roleId },
      });

      // actualizacion de la tabla de usuarios
      await mutate(API_SERVICES.users);
      toast.success('Usuario actualizado correctamente');
    } catch (error) {
      toast.error('Error actualizando el usuario');
    }

    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog
      title={`Actualizar usuario ${user.name}`}
      open={open}
      onClose={() => setOpen(false)}
    >
      <form className='flex flex-col gap-5 ' onSubmit={submitForm}>
        <label htmlFor='user-name'>
          <span>Nombre</span>
          <input
            value={formData?.name ?? ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            type='text'
            required
            name='user-name'
          />
        </label>
        <label>
          <span>Rol</span>
          <select
            required
            value={formData?.roleId ?? ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                roleId: e.target.value,
              })
            }
          >
            <option disabled>Seleccione un rol</option>
            {roles?.map((role) => {
              return (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              );
            })}
          </select>
        </label>
        <div className='flex gap-3'>
          <PrimaryActionButton
            loading={loading}
            onClick={() => {}}
            text='Actualizar usuario'
            type='submit'
          />
          <SecondaryActionButton
            text='Cancelar'
            type='button'
            loading={loading}
            onClick={() => setOpen(false)}
          />
        </div>
      </form>
    </Dialog>
  );
};

export { UpdateUserDialog };
