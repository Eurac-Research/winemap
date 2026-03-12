"use client";

import { type ReactNode } from "react";
import { isMobile } from "react-device-detect";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/resizable";

interface PdoMapLayoutProps {
  sidebar: ReactNode;
  map: ReactNode;
  sidebarDefaultSize?: number;
  mapDefaultSize?: number;
  sidebarMinSize?: number;
  mapMinSize?: number;
}

export function PdoMapLayout({
  sidebar,
  map,
  sidebarDefaultSize = isMobile ? 30 : 25,
  mapDefaultSize = isMobile ? 60 : 70,
  sidebarMinSize,
  mapMinSize = isMobile ? 30 : 30,
}: PdoMapLayoutProps) {
  return (
    <div className="fixed inset-0 z-10 pt-[60px]">
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={sidebarDefaultSize}
          minSize={sidebarMinSize}
          className="relative min-w-0 overflow-hidden"
        >
          {sidebar}
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className={`${isMobile
            ? "h-3 w-full cursor-row-resize hover:h-4"
            : "h-full w-2 cursor-col-resize hover:w-3"
            } flex items-center justify-center bg-[#E91E63] opacity-60 hover:opacity-100 text-[#E91E63] hover:brightness-110 transition-all relative group z-20`}
        />

        <ResizablePanel
          defaultSize={mapDefaultSize}
          minSize={mapMinSize}
          className="relative min-w-0 overflow-hidden"
        >
          {map}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
