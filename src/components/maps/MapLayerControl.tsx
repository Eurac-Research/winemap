"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BoundaryOverlay } from "@/content/maps/boundaries";
import { Layers, X } from "lucide-react";

import { BoundaryOverlayControl } from "./BoundaryOverlayControl";
import styles from "./MapLayerControl.module.css";

export type BasemapChoice = {
  id: string;
  label: string;
  /** Optional image URL; built-in basemaps use illustrative map previews. */
  previewUrl?: string;
};

type Props = {
  basemaps: readonly BasemapChoice[];
  selectedBasemapId: string;
  onBasemapChange: (id: string) => void;
  /** Omit this configuration in applications without reference areas. */
  referenceAreas?: {
    overlays: readonly BoundaryOverlay[];
    visibleIds: readonly string[];
    onVisibilityChange: (id: string, visible: boolean) => void;
  };
  className?: string;
};

function BasemapPreview({ basemap }: { basemap: BasemapChoice }) {
  if (basemap.previewUrl) {
    return (
      <span
        className={styles.preview}
        style={{ backgroundImage: `url("${basemap.previewUrl}")` }}
      />
    );
  }

  return (
    <svg
      className={styles.preview}
      data-basemap={basemap.id}
      viewBox="0 0 120 76"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="120" height="76" className={styles.land} />
      <path
        d="M0 12 25 3 48 18 70 5 99 14 120 0V44L95 55 68 39 39 52 15 36 0 41Z"
        className={styles.park}
      />
      <path
        d="m-10 60 30-31 23 10L65 14 91 31 129 5M-7 71l29-28 22 10 24-25 23 16 39-25"
        className={styles.contour}
      />
      <path d="M85-5C54 13 106 31 75 45S54 60 61 81" className={styles.river} />
      <path
        d="M-5 19 125 58M22-5 48 81M-5 64 125 13"
        className={styles.roadCasing}
      />
      <path d="M-5 19 125 58M22-5 48 81M-5 64 125 13" className={styles.road} />
    </svg>
  );
}

export function MapLayerControl({
  basemaps,
  selectedBasemapId,
  onBasemapChange,
  referenceAreas,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const selected = basemaps.find((basemap) => basemap.id === selectedBasemapId);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={[styles.shell, className].filter(Boolean).join(" ")}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={`Map layers: ${selected?.label ?? "Choose a basemap"}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.triggerPreview} aria-hidden="true">
          {selected ? (
            <BasemapPreview basemap={selected} />
          ) : (
            <Layers size={24} />
          )}
          <Layers size={18} className={styles.layersIcon} />
        </span>
      </button>
      {open && (
        <section id={id} aria-label="Map layers" className={styles.panel}>
          <div className={styles.header}>
            <span>
              <Layers size={17} /> Map layers
            </span>
            <button
              type="button"
              aria-label="Close map layers"
              className={styles.close}
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              <X size={18} />
            </button>
          </div>
          <fieldset className={styles.basemaps}>
            <legend>Basemap</legend>
            <div className={styles.grid}>
              {basemaps.map((basemap) => (
                <label key={basemap.id} className={styles.basemap}>
                  <input
                    type="radio"
                    name={`basemap-${id}`}
                    value={basemap.id}
                    checked={basemap.id === selectedBasemapId}
                    onChange={() => onBasemapChange(basemap.id)}
                    className={styles.choiceInput}
                  />
                  <span className={styles.tile}>
                    <BasemapPreview basemap={basemap} />
                    <span className={styles.tileLabel}>
                      {basemap.label.replace(/ basemap$/i, "")}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          {referenceAreas && referenceAreas.overlays.length > 0 && (
            <BoundaryOverlayControl {...referenceAreas} />
          )}
        </section>
      )}
    </div>
  );
}
