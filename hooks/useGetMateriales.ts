import { API_SERVICES, fetcher } from '@/service';
import { MaterialQuery } from '@/types';
import useSWR from 'swr';

const useGetMateriales = () => {
  const { data, isLoading, error } = useSWR<MaterialQuery>(
    API_SERVICES.users,
    fetcher
  );

  return {
    materiales: data?.material,
    isLoading,
    error,
  };
};

export { useGetMateriales };
