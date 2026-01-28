"use client"

import { ReactNode } from "react"
import { isMobile } from "react-device-detect"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/app/components/ui/resizable"

interface ResizableMapLayoutProps {
  sidebar: ReactNode
  map: ReactNode
  hasSidebar: boolean
}

export function ResizableMapLayout({ sidebar, map, hasSidebar }: ResizableMapLayoutProps) {
  if (!hasSidebar) {
    // No sidebar, show full map
    return <div className="h-screen w-screen fixed inset-0">{map}</div>
  }

  return (
    <ResizablePanelGroup
      direction={isMobile ? "vertical" : "horizontal"}
      className="h-screen w-screen fixed inset-0"
    >
      {/* Sidebar Panel */}
      <ResizablePanel
        defaultSize={isMobile ? "40%" : "30%"}
        minSize={isMobile ? "10%" : "15%"}
        maxSize={isMobile ? "90%" : "50%"}
        collapsible={false}
        className="relative overflow-hidden"
      >
        <div className="h-full overflow-auto bg-black/80 backdrop-blur-md">
          {sidebar}
        </div>
      </ResizablePanel>

      {/* Resize Handle */}
      <ResizableHandle
        withHandle
        className={`${isMobile
          ? "w-full h-3 flex-row cursor-row-resize"
          : "w-3 h-full flex-col cursor-col-resize"
          } bg-white/10 hover:bg-[#E91E63] transition-colors relative group`}
      />

      {/* Map Panel */}
      <ResizablePanel
        defaultSize={isMobile ? "60%" : "70%"}
        className="relative"
      >
        <div className="h-full w-full">{map}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
