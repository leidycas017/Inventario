import { API_SERVICES, fetcher } from "@/service"
import { inventoriesQuery } from "@/types";
import useSWR, { mutate } from 'swr';

const refetchInventories = async () => {
    await mutate(API_SERVICES.users);
  };

const useGetInventories = () => {
    const {data, isLoading, error} = useSWR<inventoriesQuery>(
        API_SERVICES.inventories,
        fetcher
    );

    return{
        inventories: data?.inventories,
        isLoading,
        error,
    };
};

export {useGetInventories, refetchInventories};