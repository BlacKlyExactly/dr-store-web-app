import { useQuery, useMutation, useQueryClient, QueryClient, UseMutateFunction } from "react-query";
import axios, { AxiosResponse } from "axios";
import { UserData } from "./useUser";

type DailyData = {
    day: string | number
    value: string | number
}

export type DailyHook = {
    data: string[],
    isLoading: boolean,
    error: any,
    mutate: UseMutateFunction<any, unknown, DailyData, unknown>
}

const useDaily = ( userData: UserData ) => {
    const options = 
    { headers: { Authorization: `${process.env.NEXT_PUBLIC_API_AUTH_TYPE} ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}` }};

    const queryClient: QueryClient = useQueryClient();
    
    const { data, isLoading, error } = useQuery<string[]>("daily", () => 
        axios.get(
            `/api/users/daily/${userData.steamId}`,
            options
        ).then(( response: AxiosResponse ) => response.data.days.split(";")),
        { enabled: userData !== null }
    );

    const { mutate } = useMutation(( newData: DailyData ) =>
        axios.get(
            `/api/users/setdailyday/${userData.steamId}&${newData.day}&${newData.value}`,
            options
        ).then((response: AxiosResponse ) => response.data),
        { onSuccess: () => queryClient.refetchQueries("daily") }
    );

    return { data, isLoading, error, mutate }
}

export default useDaily;