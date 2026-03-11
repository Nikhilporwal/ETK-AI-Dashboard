import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#63687B] group-focus-within:text-[#21439D] transition-colors">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-14 w-full rounded-[var(--radius-brand)] border-2 border-[#A5B4FC]/30 bg-white/70 px-4 py-3 text-base text-black ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A8AFC3]/60 focus-visible:outline-none focus-visible:border-[#3B5F9A] focus-visible:ring-1 focus-visible:ring-[#3B5F9A] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
            icon && "pl-12",
            rightIcon && "pr-12",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#63687B] hover:text-[#21439D] cursor-pointer transition-colors">
            {rightIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
