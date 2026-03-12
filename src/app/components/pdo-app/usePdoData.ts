"use client";

import { useEffect, useMemo, useState } from "react";
import type { Feature, FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

export interface PDORecord {
  country: string;
  pdoid: string;
  pdoname: string;
  registration: string | null;
  category: string;
  varietiesOiv: string | null;
  varieties: string | null;
  "max-yield-hl": number | null;
  "max-yield-kg": number | null;
  "min-planting-density": number | null;
  irrigation: string | null;
  amendment: string;
  pdoinfo: string;
  munic: string;
  "begin-lifes": string;
}

export type PdoPointFeature = Feature<
  Geometry,
  GeoJsonProperties & { PDOid?: string }
>;
export type PdoPointCollection = FeatureCollection<
  Geometry,
  GeoJsonProperties & { PDOid?: string }
>;

interface CountryOption {
  code: string;
  name: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export function usePdoData() {
  const [pdoData, setPdoData] = useState<PDORecord[]>([]);
  const [pdoPointsData, setPdoPointsData] = useState<PdoPointCollection | null>(null);
  const [countryData, setCountryData] = useState<CountryOption[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadData = async () => {
      setIsLoadingData(true);
      setLoadError(null);

      try {
        const [pdoRes, pointsRes, countryRes] = await Promise.all([
          fetch("/api/data/pdo-eu-id", { signal: controller.signal }),
          fetch("/api/data/pdo-points", { signal: controller.signal }),
          fetch("/api/data/country-codes", { signal: controller.signal }),
        ]);

        if (!pdoRes.ok || !pointsRes.ok || !countryRes.ok) {
          throw new Error("Failed to fetch PDO explorer data");
        }

        const [pdoJson, pointsJson, countryJson] = await Promise.all([
          pdoRes.json(),
          pointsRes.json(),
          countryRes.json(),
        ]);

        if (!isActive) return;

        setPdoData(Array.isArray(pdoJson) ? pdoJson : []);
        setPdoPointsData(pointsJson);
        setCountryData(Array.isArray(countryJson) ? countryJson : []);
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }

        if (!isActive) return;
        setLoadError("Failed to load PDO explorer data.");
        console.error("Failed to load PDO explorer data", error);
      } finally {
        if (isActive) {
          setIsLoadingData(false);
        }
      }
    };

    void loadData();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const pdoOptions = useMemo<SelectOption[]>(() => {
    const uniqueNames = [...new Set(pdoData.map((item) => item.pdoname.trim()))];

    return uniqueNames
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
      .map((pdoname) => ({ label: pdoname, value: pdoname }));
  }, [pdoData]);

  const municipalityOptions = useMemo<SelectOption[]>(() => {
    const uniqueMunicipalities = [
      ...new Set(
        pdoData.flatMap((item) =>
          item.munic
            .split("/")
            .map((entry) => entry.trim())
            .filter(Boolean),
        ),
      ),
    ];

    return uniqueMunicipalities
      .sort((a, b) => a.localeCompare(b))
      .map((municipality) => ({ label: municipality, value: municipality }));
  }, [pdoData]);

  const categoryOptions = useMemo<SelectOption[]>(() => {
    const uniqueCategories = [
      ...new Set(
        pdoData.flatMap((item) =>
          item.category
            .split("/")
            .map((entry) => entry.trim())
            .filter(Boolean),
        ),
      ),
    ];

    return uniqueCategories
      .sort((a, b) => a.localeCompare(b))
      .map((category) => ({ label: category, value: category }));
  }, [pdoData]);

  const varietyOptions = useMemo<SelectOption[]>(() => {
    const uniqueVarieties = [
      ...new Set(
        pdoData.flatMap((item) =>
          (item.varietiesOiv ?? "")
            .split("/")
            .map((entry) => entry.trim())
            .filter(Boolean),
        ),
      ),
    ];

    return uniqueVarieties
      .sort((a, b) => a.localeCompare(b))
      .map((variety) => ({ label: variety, value: variety }));
  }, [pdoData]);

  const countryOptions = useMemo<SelectOption[]>(() => {
    const usedCountryCodes = new Set(
      pdoData.map((item) => item.country.trim()).filter(Boolean),
    );

    return countryData
      .filter((country) => usedCountryCodes.has(country.code))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((country) => ({
        label: country.name,
        value: country.code,
      }));
  }, [countryData, pdoData]);

  const pointFeatureByPdoId = useMemo(() => {
    const lookup = new Map<string, PdoPointFeature>();

    for (const feature of pdoPointsData?.features ?? []) {
      const pdoId = feature.properties?.PDOid;
      if (pdoId && !lookup.has(pdoId)) {
        lookup.set(pdoId, feature);
      }
    }

    return lookup;
  }, [pdoPointsData]);

  return {
    pdoData,
    pdoPointsData,
    isLoadingData,
    loadError,
    pdoOptions,
    municipalityOptions,
    categoryOptions,
    varietyOptions,
    countryOptions,
    pointFeatureByPdoId,
  };
}
