import { API_SERVICES, fetcher } from "@/service"
import { MaterialesQuery } from "@/types"
import useSWR from "swr";

const useGetMateriales = () => {
    const {data, isLoading, error} = useSWR<MaterialesQuery>(
        API_SERVICES.materiales,
        fetcher
    );

    return{
        materiales: data?.materiales,
        isLoading,
        error,
    };
};

export {useGetMateriales};

