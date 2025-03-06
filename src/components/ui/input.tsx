import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input component based on PIE Design System
 * https://www.pie.design/components/text-input/
 */

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            // Base styles
            "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-base",
            "transition-colors duration-200",
            // Focus styles
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0",
            "focus-visible:border-primary focus-visible:ring-primary/30",
            // Disabled styles
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
            // Error styles
            error && "border-error focus-visible:border-error focus-visible:ring-error/30",
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p className={cn(
            "mt-1.5 text-sm",
            error ? "text-error" : "text-muted-foreground"
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
