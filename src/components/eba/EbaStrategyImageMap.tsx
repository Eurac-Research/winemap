import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type EbaStrategyImageMarker = {
  id: string;
  title: string;
  href: string;
  category?: string;
  fieldOfAction?: string;
  spatialScale?: string;
  summary?: string;
  position: {
    x: number;
    y: number;
    tooltipSide?: "top" | "right" | "bottom" | "left";
  };
};

type EbaStrategyImageMapProps = {
  imageSrc: string;
  imageAlt: string;
  markers: EbaStrategyImageMarker[];
  className?: string;
};

const tooltipSideClasses: Record<
  NonNullable<EbaStrategyImageMarker["position"]["tooltipSide"]>,
  string
> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
  bottom: "left-1/2 top-full mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
};

const tooltipHoverBridgeClasses: Record<
  NonNullable<EbaStrategyImageMarker["position"]["tooltipSide"]>,
  string
> = {
  top: "before:absolute before:left-0 before:top-full before:h-2 before:w-full before:content-['']",
  right:
    "before:absolute before:right-full before:top-0 before:h-full before:w-2 before:content-['']",
  bottom:
    "before:absolute before:bottom-full before:left-0 before:h-2 before:w-full before:content-['']",
  left: "before:absolute before:left-full before:top-0 before:h-full before:w-2 before:content-['']",
};

function getSummaryPreview(summary?: string) {
  if (!summary) return undefined;
  if (summary.length <= 180) return summary;

  return `${summary.slice(0, 177).trim()}...`;
}

export function EbaStrategyImageMap({
  imageSrc,
  imageAlt,
  markers,
  className,
}: EbaStrategyImageMapProps) {
  return (
    <div className={cn("grid gap-6", className)}>
      <div className="relative aspect-[16/10] overflow-visible">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--surface-muted)] shadow-[var(--shadow-soft)]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1280px) 1120px, calc(100vw - 32px)"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
        </div>

        {markers.map((marker) => {
          const tooltipId = `eba-strategy-marker-${marker.id}`;
          const tooltipSide = marker.position.tooltipSide ?? "top";
          const summaryPreview = getSummaryPreview(marker.summary);

          return (
            <Link
              key={marker.id}
              href={marker.href}
              aria-describedby={tooltipId}
              aria-label={`Open ${marker.title}`}
              className="group absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full hover:z-30 focus-visible:z-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--app-accent-text-color)]"
              style={{
                left: `${marker.position.x}%`,
                top: `${marker.position.y}%`,
              }}
            >
              <span className="eba-marker-ring absolute h-9 w-9 rounded-full border-2 border-white shadow-[0_0_0_4px_rgba(255,255,255,0.18)]" />
              <span className="relative h-6 w-6 rounded-full bg-[color:var(--accent)] shadow-[0_8px_18px_rgba(0,0,0,0.28)]" />

              <span
                id={tooltipId}
                role="tooltip"
                className={cn(
                  "pointer-events-auto absolute z-20 hidden w-72 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)] p-4 text-left text-sm leading-6 app-text-color shadow-[var(--shadow-strong)] backdrop-blur-md group-hover:block group-focus-visible:block",
                  tooltipSideClasses[tooltipSide],
                  tooltipHoverBridgeClasses[tooltipSide],
                )}
              >
                {marker.category ? (
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] app-accent-text">
                    {marker.category}
                  </span>
                ) : null}
                <span className="block text-base font-semibold leading-6 app-text-color">
                  {marker.title}
                </span>
                {marker.fieldOfAction || marker.spatialScale ? (
                  <span className="mt-2 grid gap-1 text-xs app-muted">
                    {marker.fieldOfAction ? (
                      <span>Field of action: {marker.fieldOfAction}</span>
                    ) : null}
                    {marker.spatialScale ? (
                      <span>Spatial scale: {marker.spatialScale}</span>
                    ) : null}
                  </span>
                ) : null}
                {summaryPreview ? (
                  <span className="mt-2 block">{summaryPreview}</span>
                ) : null}
                <span className="mt-3 inline-flex items-center gap-1 font-semibold app-accent-text">
                  Open strategy
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
