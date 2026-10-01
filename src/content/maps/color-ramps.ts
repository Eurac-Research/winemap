export type RampStop = readonly [number, string];

export const RAMPS = {
  viridis: [
    [0, "#440154"],
    [0.25, "#3b528b"],
    [0.5, "#21918c"],
    [0.75, "#5ec962"],
    [1, "#fde725"],
  ],
  inferno: [
    [0, "#000004"],
    [0.25, "#420a68"],
    [0.5, "#932667"],
    [0.75, "#dd513a"],
    [1, "#fdea45"],
  ],
  redblue: [
    [0, "#2c7bb6"],
    [0.5, "#ffffbf"],
    [1, "#d7191c"],
  ],
  bluered: [
    [0, "#d7191c"],
    [0.5, "#ffffbf"],
    [1, "#2c7bb6"],
  ],
} as const satisfies Record<string, readonly RampStop[]>;

export type RampKey = keyof typeof RAMPS;

export const RAMP_LABELS: Record<RampKey, string> = {
  viridis: "Viridis",
  inferno: "Inferno",
  redblue: "Red-Blue",
  bluered: "Blue-Red",
};

export function getRampStops(ramp: RampKey) {
  return RAMPS[ramp];
}

export function getRampLabel(ramp: RampKey) {
  return RAMP_LABELS[ramp];
}

export function getRampGradient(
  ramp: RampKey,
  direction: "to top" | "to bottom" | "to right" | "to left" = "to top",
) {
  const stops = RAMPS[ramp]
    .map(([stop, color]) => `${color} ${stop * 100}%`)
    .join(", ");

  return `linear-gradient(${direction}, ${stops})`;
}
