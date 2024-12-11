import { useProfile } from "@/hooks/useProfile"
import { TypeUserForm } from "@/types/auth.types"
import { useEffect } from "react"
import { UseFormReset } from "react-hook-form"

export const useControlForm = (reset: UseFormReset<TypeUserForm>) => {
    const { data, isSuccess } = useProfile()
    

    useEffect(() => {
        if (isSuccess && data) {
            reset({
            email: data.user.email,
            name: data.user.name,
            intervalCount: data.user.intervalCount,
            breakInterval: data.user.breakInterval,
            wordInterval: data.user.wordInterval
        })
        }
    }, [isSuccess])
}