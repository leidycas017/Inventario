import { RolesQuery } from '@/types';
import useSWR from 'swr';

const useGetRoles=()=> {
    const {data, isLoading, error } = useSWR<RolesQuery>(
    API_SERVICES.roles,
    fetcher
    );
    return{
        roles: data?.roles,
        isLoading,
        error,
    };
};

export{useGetRoles};