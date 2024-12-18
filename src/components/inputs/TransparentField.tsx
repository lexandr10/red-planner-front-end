'use client'
import { forwardRef, InputHTMLAttributes } from "react"
import cn from 'clsx'
 
type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>


export const TransparentField = forwardRef<
	HTMLInputElement,
	TypeTransparentField
>(({ className, ...rest }, ref) => {
	return (
		<input
			className={cn(
				'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full',
				className
			)}
			ref={ref}
			{...rest}
		/>
	)
})

TransparentField.displayName = 'TransparentField'