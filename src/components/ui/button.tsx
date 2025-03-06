import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Button component based on PIE Design System
 * https://www.pie.design/components/button/
 */

// PIE Button variants
const buttonVariants = {
  variant: {
    // Primary button - Orange background, white text
    primary: "bg-primary text-primary-foreground hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-300",

    // Secondary button - Grey background, white text
    secondary: "bg-neutral-600 text-white hover:bg-neutral-700 active:bg-neutral-800 focus-visible:ring-neutral-300",

    // Outline button - Bordered with no background
    outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-300",

    // Ghost button - No background or border
    ghost: "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-300",

    // Text button - Looks like a clickable text
    text: "bg-transparent text-primary font-semibold hover:underline active:text-primary-700 focus-visible:ring-primary-300 shadow-none p-0",

    // Destructive button - Red button for destructive actions
    destructive: "bg-error text-error-foreground hover:bg-error/90 active:bg-error/80 focus-visible:ring-error/30",
  },
  size: {
    xs: "h-8 text-xs px-2.5 py-1.5 rounded-lg",
    sm: "h-9 text-sm px-4 py-2 rounded-lg",
    md: "h-10 text-base px-5 py-2.5 rounded-lg",
    lg: "h-12 text-lg px-6 py-3 rounded-lg",
    xl: "h-14 text-xl px-8 py-4 rounded-lg",
    icon: "h-10 w-10 p-2 rounded-lg",
  },
  fullWidth: {
    true: "w-full",
    false: ""
  }
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
  fullWidth?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled,
    children,
    ...props
  }, ref) => {
    // Get the variant classes
    const variantClasses = buttonVariants.variant[variant];
    const sizeClasses = buttonVariants.size[size];
    const fullWidthClasses = buttonVariants.fullWidth[fullWidth ? "true" : "false"];

    // Determine if the button should be disabled
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          // Base styles that apply to all buttons
          "inline-flex items-center justify-center font-medium transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          "shadow-sm",
          // Apply the variant, size and fullWidth classes
          variantClasses,
          sizeClasses,
          fullWidthClasses,
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{typeof children === 'string' ? children : 'Loading...'}</span>
          </>
        ) : children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
