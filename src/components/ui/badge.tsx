import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Badge component based on PIE Design System
 * https://www.pie.design/components/badge/
 */

// PIE Badge variants
const badgeVariants = {
  variant: {
    // Default/Primary badge
    primary: "bg-primary/10 text-primary border-primary/20",

    // Secondary badge
    secondary: "bg-neutral-100 text-neutral-700 border-neutral-200",

    // Outline style
    outline: "bg-transparent border-[1.5px] text-foreground border-border",

    // Success badge
    success: "bg-success/10 text-success border-success/20",

    // Warning badge
    warning: "bg-warning/10 text-warning-foreground border-warning/20",

    // Error/Destructive badge
    error: "bg-error/10 text-error border-error/20",

    // Info badge
    info: "bg-info/10 text-info border-info/20",
  },
  size: {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base"
  }
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants.variant
  size?: keyof typeof badgeVariants.size
}

function Badge({
  className,
  variant = "primary",
  size = "sm",
  ...props
}: BadgeProps) {
  const variantClasses = badgeVariants.variant[variant]
  const sizeClasses = badgeVariants.size[size]

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        "transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses,
        sizeClasses,
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
