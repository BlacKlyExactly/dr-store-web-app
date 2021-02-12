import { useQuery, useMutation, useQueryClient, QueryClient, UseMutateFunction } from "react-query";
import axios, { AxiosResponse } from "axios";
import { UserData } from "./useUser";
import { DatabaseUser } from "pages/api/users/[steamId]";

type CoinsData = {
    coins: number | string,
}

export type CoinsHook = {
    data: number,
    isLoading: boolean,
    error: any,
    mutate: UseMutateFunction<any, unknown, CoinsData, unknown>,
    mutateNoRefetch: UseMutateFunction<any, unknown, CoinsData, unknown>,
    refetch: () => Promise<void>
}

const useCoins = ( userData: UserData ): CoinsHook => {
    const options = 
    { headers: { Authorization: `${process.env.NEXT_PUBLIC_API_AUTH_TYPE} ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}` }};

    const queryClient: QueryClient = useQueryClient();
    const refetch = () => queryClient.refetchQueries("coins");
    
    const { data, isLoading, error } = useQuery("coins", () => 
        axios.get(
            `/api/users/${userData.steamId}`,
            options
        ).then(( response: AxiosResponse<DatabaseUser> ) => response.data.coins),
        { enabled: userData !== null }
    );
    
    const { mutate } = useMutation(( newData: CoinsData ) =>
        axios.get(
            `/api/users/setcredits/${userData.steamId}&${newData.coins}`,
            options
        ).then((response: AxiosResponse ) => response.data),
        { onSuccess: () => queryClient.refetchQueries("coins") }
    );

    const mtn = useMutation(( newData: CoinsData ) =>
        axios.get(
            `/api/users/setcredits/${userData.steamId}&${newData.coins}`,
            options
        ).then((response: AxiosResponse ) => response.data),
    );

    const mutateNoRefetch = mtn.mutate;

    return { data, isLoading, error, mutate, mutateNoRefetch, refetch }
}

export default useCoins;