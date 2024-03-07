import { API_SERVICES, fetcher } from '@/service';
import { UserQuery } from '@/types';
import useSWR from 'swr';

const useGetUsers = () => {
  const { data, isLoading, error } = useSWR<UserQuery>(
    API_SERVICES.users,
    fetcher
  );

  return {
    users: data?.users,
    isLoading,
    error,
  };
};

export { useGetUsers };