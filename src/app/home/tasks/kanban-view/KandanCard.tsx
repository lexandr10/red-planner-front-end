'use client'
import type { ITaskResponse, TypeTaskFormState } from "@/types/task.type"
import type { Dispatch, SetStateAction } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTaskDebounce } from "../hooks/useTaskDebounce"
import cn from 'clsx'
import { GripVertical, Loader, Trash } from "lucide-react"
import Checkbox from "@/components/checkbox/Checkbox"
import { DatePicker } from "@/components/task-priority/date-picker/DatePicker"
import { IOption, SingleSelect } from "@/components/task-priority/SingleSelect"
import { useDeleteTask } from "../hooks/useDeleteTask"
import styles from './Kanban.module.scss'
import { TransparentField } from "@/components/inputs/TransparentField"


interface IKanbanCard  {
    item: ITaskResponse
    setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

const KanbanCard  = ({ item, setItems }: IKanbanCard ) => {
    const { register, control, watch } = useForm<TypeTaskFormState>({
        defaultValues: {
            name: item.name,
            isCompleted: item.isCompleted,
            createdAt: item.createdAt,
            priority: item.priority
        }
    })

    useTaskDebounce({ watch, itemId: item.id })

    const {deleteTask, isDeletePending} = useDeleteTask()
    
    return <div className={cn(
				styles.card,
				{
					[styles.completed]: watch('isCompleted')
				},
				'animation-opacity'
    )}>
        <div className={styles.cardHeader}>
            <button aria-describedby='todo-item'>
                <GripVertical className={styles.grip} />
            </button>
            <Controller
                control={control}
                    render={({ field: { value, onChange } }) =>
                        <Checkbox value={value} onChange={onChange} />}
                    name="isCompleted" />
            <TransparentField {...register('name')} />
        </div>
        <div className={styles.cardBody}>
            <Controller
                control={control}
                name="createdAt"
                render={({ field: { value, onChange } }) =>
                    <DatePicker
                        value={value || ''}
                        position="left"
                        onChange={onChange} />}

            />
            <Controller
                control={control}
                name="priority"
                render={({ field: { value, onChange } }) =>
                    <SingleSelect
                        data={['high', 'medium', 'low'].map(item => ({
                            value: item,
                            label: item
                        })) as IOption[]}
                    onChange={onChange}
                    value={value || 'medium'}  />}
            />
        </div>
        <div className={styles.cardActions}>
            <button
                className='opacity-50 transition-opacity hover:opacity-100'
                onClick={() => item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))}>
                {isDeletePending ? <Loader size={24} /> : <Trash size={24} />}
                </button>
        </div>
    </div>

}

export default KanbanCard 