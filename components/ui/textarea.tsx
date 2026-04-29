import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-[360px] w-full rounded-[var(--radius-brand)] border-2 border-[#A5B4FC]/30 bg-white/70 px-6 py-5 text-base text-black ring-offset-white placeholder:text-[#A8AFC3]/60 focus-visible:outline-none focus-visible:border-[#3B5F9A] focus-visible:ring-1 focus-visible:ring-[#3B5F9A] disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none leading-relaxed",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
