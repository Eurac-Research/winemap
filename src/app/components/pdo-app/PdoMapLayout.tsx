"use client";

import { type ReactNode, useCallback, useEffect, useRef } from "react";
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
  const mapPanelRef = useRef<HTMLDivElement | null>(null);
  const resizeTimeoutRef = useRef<number | null>(null);

  const notifyMapResize = useCallback(() => {
    if (resizeTimeoutRef.current != null) {
      window.clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = window.setTimeout(() => {
      resizeTimeoutRef.current = null;
      window.dispatchEvent(new Event("resize"));
    }, 120);
  }, []);

  useEffect(() => {
    const element = mapPanelRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      notifyMapResize();
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (resizeTimeoutRef.current != null) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [notifyMapResize]);

  return (
    <div className="fixed inset-0 z-10 pt-[45px]">
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
            ? "h-3 w-full cursor-row-resize"
            : "h-full w-2 cursor-col-resize"
            } flex items-center justify-center opacity-60 transition-all relative group z-20`}
        />

        <ResizablePanel
          defaultSize={mapDefaultSize}
          minSize={mapMinSize}
          className="relative min-w-0 overflow-hidden"
        >
          <div ref={mapPanelRef} className="h-full w-full">
            {map}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
