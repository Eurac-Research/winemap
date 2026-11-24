"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { isMobile } from "react-device-detect";
import type { PanelImperativeHandle } from "react-resizable-panels";

import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const subscribeToMount = () => () => {};

interface PdoMapLayoutProps {
  sidebar: ReactNode;
  map: ReactNode;
  sidebarDefaultSize?: number;
  mapDefaultSize?: number;
  sidebarMinSize?: number;
  mapMinSize?: number;
  className?: string;
}

export function PdoMapLayout({
  sidebar,
  map,
  sidebarDefaultSize = isMobile ? 30 : 25,
  mapDefaultSize = isMobile ? 60 : 70,
  sidebarMinSize,
  mapMinSize = isMobile ? 30 : 30,
  className,
}: PdoMapLayoutProps) {
  const isMounted = useSyncExternalStore(
    subscribeToMount,
    () => true,
    () => false,
  );
  const sidebarId = useId();
  const sidebarPanelRef = useRef<PanelImperativeHandle | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
  }, [isMounted, notifyMapResize]);

  const layoutClassName = cn(
    "fixed inset-x-0 bottom-0 top-[var(--top-nav-height)] z-10",
    className,
  );

  if (!isMounted) {
    return (
      <div className={layoutClassName} aria-busy="true">
        <div className="flex h-full items-center justify-center bg-[color:var(--surface-muted)] app-muted">
          Loading map…
        </div>
      </div>
    );
  }

  return (
    <div className={layoutClassName}>
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className="h-full w-full"
      >
        <ResizablePanel
          id={sidebarId}
          panelRef={sidebarPanelRef}
          collapsible
          collapsedSize={0}
          defaultSize={sidebarDefaultSize}
          minSize={sidebarMinSize ?? 15}
          onResize={() => {
            setSidebarCollapsed(
              sidebarPanelRef.current?.isCollapsed() ?? false,
            );
          }}
          className="relative min-w-0 overflow-hidden"
        >
          <div
            className="flex h-full min-h-0 flex-col"
            inert={sidebarCollapsed}
          >
            <div className="min-h-0 flex-1">{sidebar}</div>
          </div>
        </ResizablePanel>

        <ResizableHandle
          withHandle={!sidebarCollapsed}
          style={
            sidebarCollapsed
              ? {
                  flexBasis: "2px",
                  ...(isMobile ? { height: "2px" } : { width: "2px" }),
                  pointerEvents: "none",
                }
              : undefined
          }
          className={`${
            isMobile
              ? "h-3 w-full cursor-row-resize"
              : "h-full w-2 cursor-col-resize"
          } flex items-center justify-center relative group z-20`}
        />

        <ResizablePanel
          defaultSize={mapDefaultSize}
          minSize={mapMinSize}
          className="relative min-w-0 overflow-hidden"
        >
          <div ref={mapPanelRef} className="h-full w-full">
            {map}
            <button
              type="button"
              aria-label={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
              title={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
              aria-controls={sidebarId}
              aria-expanded={!sidebarCollapsed}
              onClick={() => {
                const panel = sidebarPanelRef.current;
                if (panel?.isCollapsed()) panel.expand();
                else panel?.collapse();
              }}
              className={cn(
                "absolute z-30 flex items-center justify-center border border-[color:var(--border)] bg-[color:var(--surface-muted)] shadow-sm app-text-color hover:bg-[color:var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
                isMobile
                  ? "left-4 top-0 h-4 w-7 rounded-b-md border-t-0"
                  : "left-0 top-4 h-7 w-4 rounded-r-md border-l-0",
              )}
            >
              {isMobile ? (
                sidebarCollapsed ? (
                  <ChevronDown size={16} aria-hidden="true" />
                ) : (
                  <ChevronUp size={16} aria-hidden="true" />
                )
              ) : sidebarCollapsed ? (
                <ChevronRight size={16} aria-hidden="true" />
              ) : (
                <ChevronLeft size={16} aria-hidden="true" />
              )}
            </button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
