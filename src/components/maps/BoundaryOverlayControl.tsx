"use client";

import type { BoundaryOverlay } from "@/content/maps/boundaries";

type Props = {
  overlays: readonly BoundaryOverlay[];
  visibleIds: readonly string[];
  onVisibilityChange: (id: string, visible: boolean) => void;
};

export function BoundaryOverlayControl({
  overlays,
  visibleIds,
  onVisibilityChange,
}: Props) {
  return (
    <fieldset className="mt-4">
      <legend className="mb-2 text-sm font-medium">Boundaries</legend>
      <div className="flex flex-col gap-2">
        {overlays.map((overlay) => (
          <label
            key={overlay.id}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              checked={visibleIds.includes(overlay.id)}
              onChange={(event) =>
                onVisibilityChange(overlay.id, event.target.checked)
              }
              className="h-4 w-4 accent-[var(--foreground)]"
            />
            <svg
              width="36"
              height="16"
              viewBox="0 0 36 16"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M2 8H34"
                stroke="white"
                strokeWidth={overlay.width + 2}
              />
              <path
                d="M2 8H34"
                stroke={overlay.color}
                strokeWidth={overlay.width}
                strokeDasharray={overlay.dashArray
                  ?.map((length) => length * overlay.width)
                  .join(" ")}
              />
            </svg>
            <span>{overlay.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
