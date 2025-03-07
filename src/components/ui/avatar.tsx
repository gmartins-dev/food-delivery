import * as React from "react"
import { cn } from "@/lib/utils"
import Image, { ImageProps, StaticImageData } from "next/image"

/**
 * Avatar component based on PIE Design System
 */

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-6 w-6 text-xs",
      md: "h-8 w-8 text-sm",
      lg: "h-10 w-10 text-base",
    }

    return (
      <div
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Avatar.displayName = "Avatar"

interface AvatarImageProps extends Omit<ImageProps, 'src'> {
  src: string | StaticImageData;
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt, src, ...props }, ref) => {
    return (
      <Image
        src={src}
        alt={alt || ""}
        fill
        sizes="100%"
        className={cn("aspect-square h-full w-full object-cover", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = "AvatarImage"

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
