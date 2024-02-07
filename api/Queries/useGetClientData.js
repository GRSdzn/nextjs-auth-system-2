import { useQuery } from "@tanstack/react-query";
import clientData from "@/api/Auth/clientData";


export function useGetClientData(params) {
    return useQuery(
        {
            queryKey: ['clientData', params],
            queryFn: () => clientData.clientDataGetService(params),
            refetchOnWindowFocus: false,
            keepPreviousData: true
        }
    );
}
