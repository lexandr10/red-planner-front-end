import { userService } from "@/services/user.service"
import { useQuery } from "@tanstack/react-query"

export const useProfile = () => {
    const {data, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: () => userService.getUser()
})

    return {data, isLoading}
}
