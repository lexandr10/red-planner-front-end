import { useProfile } from "@/hooks/useProfile"

export const useLoadSettings = () => {
    const { data } = useProfile()
    
    const workInterval = data?.user.wordInterval ?? 50
    const breakInterval = data?.user.breakInterval ?? 10

    return {workInterval, breakInterval}
}