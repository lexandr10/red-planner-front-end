import { UseFormWatch } from "react-hook-form"
import debounce from "lodash.debounce"
import { useCallback, useEffect } from "react"

import { useCreateTask } from "./useCreateTask"
import { useUpdateTasks } from "./useUpdateTasks"
import { TypeTaskFormState } from "@/types/task.type"

interface IUseTaskDebounce {
    watch: UseFormWatch<TypeTaskFormState>
    itemId: string

}

export const useTaskDebounce = ({watch, itemId}: IUseTaskDebounce) => {

    const { createTask } = useCreateTask()
    const {updateTasks} = useUpdateTasks()

    const debouncedCreateTask = useCallback(debounce((formdata: TypeTaskFormState) => {
        createTask(formdata)
    }, 444), [])

    // Now debouncedUpdateTask will persist between renders, and debounced will act as a helper.
    const debounceUpdateTask = useCallback(debounce((formdata: TypeTaskFormState) => {
        updateTasks({id: itemId, data: formdata})
    }, 444), [])
    
    useEffect(() => {
        const {unsubscribe } = watch(formdata => {
            if (itemId) {
                debounceUpdateTask({
                    ...formdata,
                    priority: formdata.priority || undefined
                })
            } else {
                debouncedCreateTask(formdata)
            }
        })
        return () => {
          unsubscribe()
        }
    }, [watch(),debounceUpdateTask, debouncedCreateTask ])

}