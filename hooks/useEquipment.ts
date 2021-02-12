import { useQuery, useMutation, useQueryClient, QueryClient, UseMutationResult } from "react-query";
import axios, { AxiosResponse } from "axios";
import { UserData } from "./useUser";
import { DatabaseUser } from "pages/api/users/[steamId]";

type EqData = {
    item: string,
    steamId: string
}

export type EqHook = {
    data: string,
    isLoading: boolean,
    error: any,
    addItem: UseMutationResult<any, unknown, EqData, unknown>,
    removeItem: UseMutationResult<any, unknown, EqData, unknown>
}

const useEquipment = ( userData: UserData ) => {
    const options = 
    { headers: { Authorization: `${process.env.NEXT_PUBLIC_API_AUTH_TYPE} ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}` }};

    const queryClient: QueryClient = useQueryClient();

    const { data, isLoading, error } = useQuery("eq", () => 
        axios.get(
            `/api/users/${userData.steamId}`,
            options
        ).then(( response: AxiosResponse<DatabaseUser> ) => response.data.equipment),
        { enabled: userData !== null }
    );

    const addItem = useMutation(( newData: EqData ) =>
        axios.get(
            `/api/users/additem/${newData.steamId}&${newData.item}`,
            options
        ).then((response: AxiosResponse ) => response.data),
        { onSuccess: () => queryClient.refetchQueries("eq") }
    );

    const removeItem = useMutation(( newData: EqData ) =>
        axios.get(
            `/api/users/removeitem/${newData.steamId}&${newData.item}`,
            options
        ).then((response: AxiosResponse ) => response.data),
        { onSuccess: () => queryClient.refetchQueries("eq") }
    );

    return { data, isLoading, error, addItem, removeItem }
}

export default useEquipment;