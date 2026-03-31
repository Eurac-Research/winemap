export type GeoJsonProperties = Record<string, unknown> | null;
export type BBox =
  | [number, number, number, number]
  | [number, number, number, number, number, number];

export interface GeometryBase {
  type: string;
}

export interface Point extends GeometryBase {
  type: "Point";
  coordinates: number[];
}

export interface MultiPoint extends GeometryBase {
  type: "MultiPoint";
  coordinates: number[][];
}

export interface LineString extends GeometryBase {
  type: "LineString";
  coordinates: number[][];
}

export interface MultiLineString extends GeometryBase {
  type: "MultiLineString";
  coordinates: number[][][];
}

export interface Polygon extends GeometryBase {
  type: "Polygon";
  coordinates: number[][][];
}

export interface MultiPolygon extends GeometryBase {
  type: "MultiPolygon";
  coordinates: number[][][][];
}

export interface GeometryCollection extends GeometryBase {
  type: "GeometryCollection";
  geometries: Geometry[];
}

export type Geometry =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon
  | GeometryCollection;

export interface Feature<
  G extends Geometry | null = Geometry,
  P = GeoJsonProperties,
> {
  type: "Feature";
  geometry: G;
  properties: P;
  id?: string | number;
  bbox?: BBox;
}

export interface FeatureCollection<
  G extends Geometry | null = Geometry,
  P = GeoJsonProperties,
> {
  type: "FeatureCollection";
  features: Array<Feature<G, P>>;
  bbox?: BBox;
}
