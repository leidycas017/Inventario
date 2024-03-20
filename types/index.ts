export interface User{
    id: string;
    name:string;
    email:string;
    emailVerified: Date;
    image: string;
    roleId: string;
}

export interface UserQuery {
    users: User[];
}
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