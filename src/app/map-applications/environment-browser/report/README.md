# Explorer location sampling

Stage one provides data collection only. The Explorer popup uses the same sampler;
the configurable report panel, charts, and PDF export are subsequent stages.
Other map applications do not import this module.

## Usage

```ts
const targets = buildSamplingTargets(
  getIndicatorsWithMapByApp("environment-browser"),
  {
    indicatorIds: ["mean_temperature", "huglin", "dem"],
    // Omit climateCombinations to include all available combinations.
    climateCombinations: [
      { scenarioId: "historical", periodId: "1981-2010" },
      { scenarioId: "ssp370", periodId: "2041-2070" },
    ],
  },
);
const report = await sampleLocation(
  { longitude: 11.35, latitude: 46.5 },
  targets,
  { signal: controller.signal, onProgress: (sample, completed, total) => {} },
);
```

For React, use `useLocationReport(location, selection)`. It provides progressive
samples, completion counts, and the final report. Changing the location or
selection invalidates previous results. A completed report may contain individual
error samples; consumers should display those and allow retrying.

## Semantics

- Samples use the first raster band at each COG's maximum supported tile zoom,
  independently of map zoom. This is nearest-neighbour tile sampling, not a
  guarantee of exact native-pixel sampling or a common resolution across sources.
- Only layers explicitly present in the registry are queried. An empty indicator
  selection produces an empty report; unknown/non-Explorer IDs are rejected.
- Values are already scaled by the COG library. The adapter additionally checks
  geographic bounds and the transformed NoData sentinel. Zero remains valid.
- The upstream library masks values equal to raw NoData after scaling; a valid
  scaled value that coincides with that raw sentinel cannot be recovered through
  its public API. Known raster values should be checked before publishing reports.
- Results distinguish `ok`, `no-data`, `outside-coverage`, and `error`.
  Classifications use inclusive minima and exclusive maxima, matching the legend.
- Every result retains all classification thresholds for later bar charts with
  class bands along the y-axis.
- At most four asset reads run concurrently across reports. Identical reads are
  shared. Successful results (including missing/coverage results) are cached for
  five minutes, with at most 512 entries; failed reads are not cached here.
- Cancellation suppresses progress/results and prevents subsequent batches.
  Already queued/shared reads may finish: the upstream API exposes no abort signal.
- Final samples preserve selection/layer order; progressive samples arrive in
  completion order.

## Validation

Run `node --experimental-strip-types --test scripts/test-location-sampling.mjs`
with Node 22.18+ (tested with Node 24). Tests use controlled readers; they do not
download production rasters. Run TypeScript and ESLint checks as usual.
