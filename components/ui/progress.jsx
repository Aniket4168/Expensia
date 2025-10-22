"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  extraStyles,
  ...props
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all",
          extraStyles ? extraStyles : "bg-primary"
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: undefined, // remove inline color overrides from radix
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
