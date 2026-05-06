import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export type EbaStrategyImageMarker = {
  id: string;
  title: string;
  href: string;
  category?: string;
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
  top: "bottom-full left-1/2 mb-4 -translate-x-1/2",
  right: "left-full top-1/2 ml-4 -translate-y-1/2",
  bottom: "left-1/2 top-full mt-4 -translate-x-1/2",
  left: "right-full top-1/2 mr-4 -translate-y-1/2",
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
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-panel-muted)] shadow-[var(--shadow-soft)]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 1280px) 1120px, calc(100vw - 32px)"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

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
              className="group absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent-strong)]"
              style={{
                left: `${marker.position.x}%`,
                top: `${marker.position.y}%`,
              }}
            >
              <span className="absolute h-12 w-12 rounded-full bg-[color:var(--accent-strong)]/35 opacity-80 transition group-hover:scale-125 group-hover:opacity-100 group-focus-visible:scale-125" />
              <span className="relative h-6 w-6 rounded-full border-2 border-white bg-[color:var(--accent-strong)] shadow-[0_8px_18px_rgba(0,0,0,0.28)] ring-4 ring-white/35 transition group-hover:scale-110 group-focus-visible:scale-110" />

              <span
                id={tooltipId}
                role="tooltip"
                className={cn(
                  "pointer-events-none absolute z-20 hidden w-72 rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-panel-strong)] p-4 text-left text-sm leading-6 text-[color:var(--text-base)] shadow-[var(--shadow-strong)] backdrop-blur-md group-hover:block group-focus-visible:block",
                  tooltipSideClasses[tooltipSide],
                )}
              >
                {marker.category ? (
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--accent-strong)]">
                    {marker.category}
                  </span>
                ) : null}
                <span className="block text-base font-semibold leading-6 text-[color:var(--text-strong)]">
                  {marker.title}
                </span>
                {summaryPreview ? (
                  <span className="mt-2 block">{summaryPreview}</span>
                ) : null}
                <span className="mt-3 inline-flex items-center gap-1 font-semibold text-[color:var(--accent-strong)]">
                  Open strategy
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {markers.map((marker) => (
          <Link
            key={marker.id}
            href={marker.href}
            className="group rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] p-4 transition hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-panel-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-strong)]"
          >
            {marker.category ? (
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--accent-strong)]">
                {marker.category}
              </p>
            ) : null}
            <p className="mt-1 flex items-center justify-between gap-3 text-base font-semibold text-[color:var(--text-strong)]">
              {marker.title}
              <ArrowRight
                className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
