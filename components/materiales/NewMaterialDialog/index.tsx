import { PrimaryActionButton } from '@/components/ui/Buttons/PrimaryActionButton';
import { SecondaryActionButton } from '@/components/ui/Buttons/SecondaryActionButton';
import { Dialog } from '@/components/ui/Dialog';
import { RequiredMark } from '@/components/ui/Forms/RequiredMark';
import {
  Dispatch,
  SetStateAction,
  useState,
  SyntheticEvent,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { API_SERVICES } from '@/service';
import { iUserSessionData } from '@/layouts';
import { useGetUsers } from '@/hooks/useGetUsers';

interface NewMaterialDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMaterialDialog = ({ open, setOpen }: NewMaterialDialogProps) => {
  const [loading, setLoading] = useState(false);
  const { data: dataUsuario } = useSession();
  const userData = dataUsuario?.user as iUserSessionData;
  const { users: usersList } = useGetUsers();
  const currentUserId = usersList?.find((u) => u.email == userData?.email)?.id;
  console.log(currentUserId);

  const [formData, setFormData] = useState({
    name: '',
    quantity: 0,
    userId: '',
    updatedAt: new Date().toISOString(),
  });

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
      // crear el material
      await axios.request({
        method: 'POST',
        url: API_SERVICES.materiales,
        data: {
          ...formData,
        },
      });
      // actualizar la tabla de materiales
      await mutate(API_SERVICES.materiales); // Refresh the materiales data
      toast.success('Material creado correctamente');
      setOpen(false);
    } catch (error) {
      const errorResponse = error as AxiosError;

      const errorData = errorResponse?.response?.data as { message: string };

      if (
        errorData?.message.includes(
          'Unique constraint failed on the fields: (`name`)'
        )
      ) {
        toast.error('Error: ya existe un material con ese nombre');
      } else {
        toast.error('Error creando el material');
      }
    }

    setLoading(false);
  };
  return (
    <Dialog
      title='Crear nuevo material'
      open={open}
      onClose={() => setOpen(false)}
    >
      <form className='flex flex-col gap-3' onSubmit={submitForm}>
        <label htmlFor='material-name'>
          <span>
            Nombre <RequiredMark />
          </span>
          <input
            name='material-name'
            type='text'
            placeholder='material'
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label htmlFor='saldo'>
          <span>
            saldo inicial <RequiredMark />
          </span>
          <input
            name='saldo'
            type='number'
            placeholder='0'
            required
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: parseInt(e.target.value) })
            }
          />
        </label>

        <div className='flex gap-3'>
          <PrimaryActionButton
            text='Crear material'
            loading={loading}
            type='submit'
            onClick={() => {}}
          />
          <SecondaryActionButton
            text='Cancelar'
            onClick={() => setOpen(false)}
            loading={loading}
            type='button'
          />
        </div>
      </form>
    </Dialog>
  );
};

export { NewMaterialDialog };
