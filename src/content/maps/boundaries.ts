export type BoundaryOverlay = {
  id: string;
  label: string;
  url: string;
  color: string;
  width: number;
  dashArray?: number[];
  attribution?: string;
  defaultVisible: boolean;
};

export const BOUNDARY_OVERLAYS: readonly BoundaryOverlay[] = [
  {
    id: "alpine-space",
    label: "Alpine Space",
    url: "/geometries/alpine_space.geojson",
    color: "#334155",
    width: 2,
    defaultVisible: false,
  },
  {
    id: "respond-pilot-regions",
    label: "RESPOND pilot regions",
    url: "/geometries/respond_pilot_regions.geojson",
    color: "#9d174d",
    width: 2,
    defaultVisible: false,
  },
  {
    id: "country-borders",
    label: "Countries",
    url: "/geometries/countries.geojson",
    color: "#928f90",
    width: 1,
    defaultVisible: false,
  },
];

export const boundaryLayerId = (id: string) => `boundary-${id}-line`;
export const boundaryCasingId = (id: string) => `boundary-${id}-casing`;
