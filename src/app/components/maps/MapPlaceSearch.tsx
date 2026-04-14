"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Search } from "lucide-react";

import styles from "./MapPlaceSearch.module.css";

type PhotonFeatureProperties = {
  name?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  postcode?: string;
  type?: string;
};

type PhotonFeature = {
  geometry?: {
    coordinates?: [number, number];
  };
  properties?: PhotonFeatureProperties;
};

type PhotonResponse = {
  features?: PhotonFeature[];
};

export type MapPlaceSearchResult = {
  id: string;
  label: string;
  secondaryLabel?: string;
  longitude: number;
  latitude: number;
};

type MapPlaceSearchProps = {
  className?: string;
  minQueryLength?: number;
  placeholder?: string;
  onSelect: (result: MapPlaceSearchResult) => void;
};

function formatPhotonResult(
  feature: PhotonFeature,
  index: number,
): MapPlaceSearchResult | null {
  const coordinates = feature.geometry?.coordinates;
  if (
    !coordinates ||
    coordinates.length < 2 ||
    !Number.isFinite(coordinates[0]) ||
    !Number.isFinite(coordinates[1])
  ) {
    return null;
  }

  const properties = feature.properties ?? {};
  const label =
    properties.name ??
    properties.city ??
    properties.county ??
    properties.state ??
    properties.country;

  if (!label) return null;

  const secondaryParts = [
    properties.city && properties.city !== label ? properties.city : null,
    properties.state,
    properties.country,
    properties.type,
  ].filter(Boolean);

  return {
    id: `${label}-${coordinates[0]}-${coordinates[1]}-${index}`,
    label,
    secondaryLabel: secondaryParts.join(" · ") || undefined,
    longitude: coordinates[0],
    latitude: coordinates[1],
  };
}

export default function MapPlaceSearch({
  className,
  minQueryLength = 2,
  placeholder = "Search places, cities, POIs...",
  onSelect,
}: MapPlaceSearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const skipNextSearchRef = useRef(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MapPlaceSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const trimmed = query.trim();

    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    if (trimmed.length < minQueryLength) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: trimmed,
          limit: "5",
          lang: "en",
        });

        const response = await fetch(
          `https://photon.komoot.io/api/?${params.toString()}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = (await response.json()) as PhotonResponse;
        const nextResults =
          data.features
            ?.map((feature, index) => formatPhotonResult(feature, index))
            .filter((item): item is MapPlaceSearchResult => item != null) ?? [];

        setResults(nextResults);
        setOpen(true);
        setActiveIndex(nextResults.length > 0 ? 0 : -1);
        setError(nextResults.length === 0 ? "No places found." : null);
      } catch (fetchError) {
        if (controller.signal.aborted) return;
        setResults([]);
        setOpen(true);
        setActiveIndex(-1);
        setError("Unable to search places right now.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [minQueryLength, query]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const handleSelect = (result: MapPlaceSearchResult) => {
    skipNextSearchRef.current = true;
    setQuery(result.label);
    setOpen(false);
    setResults([]);
    setActiveIndex(-1);
    setError(null);
    onSelect(result);
  };

  return (
    <div ref={containerRef} className={`${styles.searchShell} ${className ?? ""}`}>
      <div className={styles.searchCard}>
        <div className={styles.inputRow}>
          {isLoading ? (
            <LoaderCircle className={`${styles.icon} h-4 w-4 animate-spin`} />
          ) : (
            <Search className={`${styles.icon} h-4 w-4`} />
          )}
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              if (results.length > 0 || error) {
                setOpen(true);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setOpen(true);
                setActiveIndex((current) =>
                  results.length === 0 ? -1 : Math.min(current + 1, results.length - 1),
                );
              }

              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((current) => Math.max(current - 1, 0));
              }

              if (event.key === "Enter") {
                if (open && activeIndex >= 0 && results[activeIndex]) {
                  event.preventDefault();
                  handleSelect(results[activeIndex]);
                }
              }

              if (event.key === "Escape") {
                setOpen(false);
              }
            }}
            className={styles.searchInput}
            placeholder={placeholder}
            aria-label="Search places"
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        {open && (error || results.length > 0) ? (
          <>
            {error ? (
              <div className={`${styles.statusText} ${styles.statusError}`}>{error}</div>
            ) : null}

            {results.length > 0 ? (
              <ul className={styles.resultsList} role="listbox">
                {results.map((result, index) => (
                  <li key={result.id}>
                    <button
                      type="button"
                      className={`${styles.resultButton} ${
                        index === activeIndex ? styles.resultButtonActive : ""
                      }`}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <span className={styles.resultTitle}>{result.label}</span>
                      {result.secondaryLabel ? (
                        <span className={styles.resultMeta}>{result.secondaryLabel}</span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
