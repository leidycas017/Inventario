import { Dialog } from '@/components/ui/Dialog';
import { API_SERVICES } from '@/service';
import { User } from '@prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { mutate } from 'swr';
import { PrimaryActionButton } from '@/components/ui/Buttons/PrimaryActionButton';
import { SecondaryActionButton } from '@/components/ui/Buttons/SecondaryActionButton';

interface DeleteUserDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

const DeleteUserDialog = ({ open, setOpen, user }: DeleteUserDialogProps) => {
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    setLoading(true);
    try {
      await axios.request({
        method: 'DELETE',
        url: `${API_SERVICES.users}/${user.id}`,
      });
      await mutate(API_SERVICES.users);
      toast.success('Usuario eliminado correctamente');
    } catch (error) {
      toast.error('Error eliminando el usuario');
    }
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog
      title='Eliminar el usuario'
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center'>
          <span>Esta acción no se puede revertir.</span>
          <span>¿Está seguro de querer eliminar el usuario?</span>
        </div>
        <div className='flex gap-3'>
          <PrimaryActionButton
            loading={loading}
            onClick={deleteUser}
            text='Confirmar'
            type='button'
          />
          <SecondaryActionButton
            text='Cancelar'
            type='button'
            loading={loading}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </Dialog>
  );
};

export { DeleteUserDialog };
