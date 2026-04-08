import type { CSSProperties } from "react";

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
  bluered: "Blue-Red"
};

type LegendBreak = {
  label: string;
  offset: string;
  isActive?: boolean;
};

const DEFAULT_LEGEND_HEIGHT = 160;

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

type ColorRampSelectProps = {
  id?: string;
  label?: string;
  value: RampKey;
  onChange: (value: RampKey) => void;
  ramps?: readonly RampKey[];
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
};

export function ColorRampSelect({
  id = "color-ramp-select",
  label = "Color ramp",
  value,
  onChange,
  ramps = Object.keys(RAMPS) as RampKey[],
  className,
  selectClassName,
  labelClassName,
}: ColorRampSelectProps) {
  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={id}
          className={labelClassName}
          style={!labelClassName ? defaultLabelStyle : undefined}
        >
          {label}
        </label>
      ) : null}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as RampKey)}
        className={selectClassName}
        style={!selectClassName ? defaultSelectStyle : undefined}
      >
        {ramps.map((ramp) => (
          <option key={ramp} value={ramp}>
            {getRampLabel(ramp)}
          </option>
        ))}
      </select>
    </div>
  );
}

type VerticalLegendProps = {
  ramp: RampKey;
  minLabel: string;
  maxLabel: string;
  currentLabel?: string;
  currentOffset?: string | null;
  breaks?: LegendBreak[];
  title?: string;
  subtitle?: string;
  height?: number;
  className?: string;
};

export function VerticalLegend({
  ramp,
  minLabel,
  maxLabel,
  currentLabel,
  currentOffset,
  breaks = [],
  title = "Legend",
  subtitle,
  height = DEFAULT_LEGEND_HEIGHT,
  className,
}: VerticalLegendProps) {
  const legendHeight = `${height}px`;
  const hasBreaks = breaks.length > 0;
  const widestBreakLabel = hasBreaks
    ? breaks.reduce(
        (widest, item) => (item.label.length > widest.length ? item.label : widest),
        "",
      )
    : "";

  return (
    <div className={className} style={defaultLegendShellStyle}>
      <div style={{ ...defaultLegendTitleStyle, marginBottom: subtitle ? "0rem" : "0.75rem" }}>{title}</div>
      {subtitle ? (
        <div style={defaultLegendSubtitleStyle}>{subtitle}</div>
      ): null}
      <div
        style={{
          ...defaultLegendContentStyle,
          gridTemplateColumns: hasBreaks ? "max-content auto auto" : "auto auto",
        }}
      >
        {hasBreaks ? (
          <div
            style={{
              ...defaultLegendScaleLabelsStyle,
              height: legendHeight,
            }}
          >
            <div aria-hidden="true" style={defaultLegendScaleLabelSizerStyle}>
              {widestBreakLabel}
            </div>
            {breaks.map((item) => (
              <div
                key={`${item.label}-${item.offset}`}
                style={{ ...defaultLegendScaleLabelStyle, top: item.offset }}
              >
                <div
                  style={
                    item.isActive
                      ? defaultLegendScaleTextActiveStyle
                      : defaultLegendScaleTextStyle
                  }
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        <div style={{ ...defaultLegendRampStyle, height: legendHeight }}>
          <div
            style={{
              ...defaultLegendRampFillStyle,
              background: getRampGradient(ramp),
            }}
          />

          {breaks.map((item) => (
            <div
              key={`line-${item.label}-${item.offset}`}
              style={{
                ...(item.isActive
                  ? defaultLegendBreakLineActiveStyle
                  : defaultLegendBreakLineStyle),
                top: item.offset,
              }}
            />
          ))}

          {currentOffset ? (
            <div
              style={{
                ...defaultLegendMarkerStyle,
                top: currentOffset,
              }}
            />
          ) : null}
        </div>

        <div style={defaultLegendValuesStyle}>
          <div>
            <div style={defaultLegendValueLabelStyle}>Max</div>
            <div style={defaultLegendValueStyle}>{maxLabel}</div>
          </div>
          {currentLabel ? (
            <div>
              <div style={defaultLegendValueLabelStyle}>Hover</div>
              <div style={defaultLegendValueStyle}>{currentLabel}</div>
            </div>
          ) : null}
          <div>
            <div style={defaultLegendValueLabelStyle}>Min</div>
            <div style={defaultLegendValueStyle}>{minLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const defaultLabelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.74rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  color: "var(--text-muted)",
  marginBottom: "0.5rem",
};

const defaultSelectStyle: CSSProperties = {
  width: "100%",
  borderRadius: "1rem",
  border: "1px solid var(--border-strong)",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  color: "var(--text-strong)",
  background: "var(--surface-overlay)",
  outline: "none",
};

const defaultLegendShellStyle: CSSProperties = {
  position: "absolute",
  left: "1rem",
  bottom: "1rem",
  zIndex: 5,
  width: "fit-content",
  minWidth: "auto",
  maxWidth: "min(18rem, calc(100vw - 2rem))",
  borderRadius: "1rem",
  border: "1px solid var(--border-soft)",
  background: "var(--surface-panel-strong)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 10px 30px rgb(15 23 42 / 0.18)",
  padding: "0.85rem",
};

const defaultLegendTitleStyle: CSSProperties = {
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "var(--text-strong)",
  maxWidth: "12rem",
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const defaultLegendSubtitleStyle: CSSProperties = {
  fontSize: "0.6rem",
  color: "var(--text-light)",
  marginBottom: "0.75rem",
  maxWidth: "6rem",
  lineHeight: 1.3,
  overflowWrap: "anywhere",
};

const defaultLegendContentStyle: CSSProperties = {
  display: "inline-grid",
  gridTemplateColumns: "1fr auto auto",
  alignItems: "stretch",
  columnGap: "0.75rem",
  width: "fit-content",
};

const defaultLegendScaleLabelsStyle: CSSProperties = {
  position: "relative",
  minWidth: "max-content",
};

const defaultLegendScaleLabelStyle: CSSProperties = {
  position: "absolute",
  right: 0,
  transform: "translateY(-50%)",
};

const defaultLegendScaleLabelSizerStyle: CSSProperties = {
  visibility: "hidden",
  whiteSpace: "nowrap",
  fontSize: "0.72rem",
  fontWeight: 400,
  pointerEvents: "none",
};

const defaultLegendScaleTextStyle: CSSProperties = {
  fontSize: "0.72rem",
  color: "var(--text-muted)",
  textAlign: "right",
  whiteSpace: "nowrap",
};

const defaultLegendScaleTextActiveStyle: CSSProperties = {
  ...defaultLegendScaleTextStyle,
  color: "var(--accent-strong)",
  fontWeight: 700,
};

const defaultLegendRampStyle: CSSProperties = {
  position: "relative",
  width: "1.1rem",
  borderRadius: "999px",
  overflow: "hidden",
  border: "1px solid rgb(255 255 255 / 0.35)",
};

const defaultLegendRampFillStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
};

const defaultLegendMarkerStyle: CSSProperties = {
  position: "absolute",
  left: "-0.25rem",
  right: "-0.25rem",
  transform: "translateY(-50%)",
  height: "2px",
  background: "var(--surface)",
  boxShadow: "0 0 0 1px rgb(15 23 42 / 0.18)",
};

const defaultLegendBreakLineStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  transform: "translateY(-50%)",
  height: "1px",
  background: "rgb(255 255 255 / 0.4)",
};

const defaultLegendBreakLineActiveStyle: CSSProperties = {
  ...defaultLegendBreakLineStyle,
  height: "2px",
  background: "var(--accent-strong)",
};

const defaultLegendValuesStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minWidth: "2.75rem",
};

const defaultLegendValueLabelStyle: CSSProperties = {
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
};

const defaultLegendValueStyle: CSSProperties = {
  fontSize: "0.78rem",
  fontWeight: 700,
  color: "var(--text-strong)",
};
