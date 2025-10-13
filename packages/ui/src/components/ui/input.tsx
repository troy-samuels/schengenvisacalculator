import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: boolean
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    leftIcon, 
    rightIcon, 
    error = false, 
    helperText,
    ...props 
  }, ref) => {
    const inputId = React.useId()
    const helperTextId = `${inputId}-helper`

    return (
      <div className="w-full">
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-all",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900",
              "placeholder:text-gray-400",
              "focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-red-500 focus-visible:ring-red-500/30",
              // Mobile optimizations
              "min-h-[44px] md:min-h-[40px]", // Larger touch targets on mobile
              className
            )}
            ref={ref}
            aria-describedby={helperText ? helperTextId : undefined}
            aria-invalid={error}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              "mt-1 text-xs",
              error ? "text-red-500" : "text-gray-500"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
