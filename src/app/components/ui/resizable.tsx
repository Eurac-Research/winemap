"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/app/lib/utils"

const ResizableDirectionContext = React.createContext<"horizontal" | "vertical">(
  "horizontal"
)

type ResizablePanelGroupProps = Omit<
  React.ComponentProps<typeof ResizablePrimitive.Group>,
  "orientation" | "onLayout"
> & {
  direction?: "horizontal" | "vertical"
  onLayout?: (sizes: number[]) => void
}

const ResizablePanelGroup = ({
  className,
  direction = "horizontal",
  ...props
}: ResizablePanelGroupProps) => (
  <ResizableDirectionContext.Provider value={direction}>
    <ResizablePrimitive.Group
      data-direction={direction}
      orientation={direction}
      className={cn(
        "flex h-full w-full",
        direction === "vertical" && "flex-col",
        className
      )}
      {...props}
    />
  </ResizableDirectionContext.Provider>
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean
}) => {
  const direction = React.useContext(ResizableDirectionContext)

  return (
    <ResizablePrimitive.Separator
      className={cn(
        "relative isolate flex items-center justify-center bg-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        direction === "horizontal"
          ? "w-px after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 after:bg-current"
          : "h-px w-full after:absolute after:left-0 after:top-1/2 after:h-1 after:w-full after:-translate-y-1/2 after:bg-current",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div
          className={cn(
            "pointer-events-none z-10 flex items-center justify-center border border-white/30 bg-black/70 shadow-sm",
            direction === "horizontal"
              ? "h-6 w-4 rounded-sm"
              : "h-5 w-20 rounded-full"
          )}
        >
          <GripVertical
            className={cn(
              "text-white/80",
              direction === "horizontal" ? "h-3 w-3" : "h-3 w-3 rotate-90"
            )}
          />
        </div>
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
