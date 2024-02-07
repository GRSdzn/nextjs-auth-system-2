import { useQuery } from "@tanstack/react-query";
import UserService from "@/api/Auth/user";

export function useGetUserData(params) {
    return useQuery(
        {
            queryKey: ['userProfileData', params],
            queryFn: () => UserService.userGetService(params),
            refetchOnWindowFocus: false,
        }
    );
}
