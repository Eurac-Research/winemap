# Winemap Project - AI Coding Agent Instructions

## Project Overview
Winemap is a Next.js 14 application presenting an interactive map of European Protected Designation of Origin (PDO) wine regions with climate vulnerability analysis. Built by Eurac Research, it visualizes regulatory data, climate indicators, and adaptation strategies.

## Tech Stack
- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS + SCSS modules (mixed approach - prefer Tailwind for new components)
- **Maps**: Mapbox GL JS via `react-map-gl` 
- **Charts**: ECharts via `echarts-for-react`
- **UI Components**: Ant Design (Select, Radio) + custom Radix UI (Navigation Menu)
- **Package Manager**: pnpm 10.13.1 (required)

## Architecture & Data Flow

### Static Data Pattern
All PDO and vulnerability data is **statically imported as JSON** (no API calls):
```typescript
import data from "@/app/data/PDO_EU_id.json";
import vulnerability from "@/app/data/vulnerability.json";
import allPDOPoints from "@/app/data/pdo-points.json";
```
Data files in `src/app/data/` contain pre-processed regulatory information and climate analysis results.

### Client-Server Component Split
- **Server Components**: Static pages (`about/`, `vulnerability/`, `team/`)
- **Client Components**: Interactive map pages marked with `"use client"` directive
  - Main map: `src/app/page.tsx` (2000+ lines - complex state management)
  - Climate map: `src/app/climate-environment/page.tsx`
  - Map container: `src/app/components/MapContainer.tsx` (1800+ lines)

### Map Component Architecture
The `MapContainer.tsx` is a reusable component accepting a `viewType` prop:
```typescript
<MapContainer viewType="climate" | "adaptation" | "legal" />
```
Controls which layers and filters are visible (e.g., vulnerability overlay for "adaptation").

### URL State Management
Uses Next.js `useSearchParams()` for deep linking:
- `?vulnerability=true` - Shows vulnerability overlay
- `?pdo=<pdoid>` - Opens specific PDO detail view
- `?country=<code>` - Filters by country
- `?category=<name>` - Filters by wine category
All state syncs with URL for shareable links.

## Development Workflow

### Essential Commands
```bash
pnpm dev          # Dev server on localhost:3000
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # ESLint with cache
pnpm fmt          # Format with Prettier
pnpm ci           # Full check (format + lint + type)
```

### Environment Setup
Create `.env.local` with:
```bash
NEXT_PUBLIC_MAPBOX_TOKEN=<your-token>
```
Mapbox token required for map rendering. Used in client components only.

## Code Conventions

### Import Aliases
All configured in `tsconfig.json`:
- `@/app/*` - App directory components
- `@/components/*` - Reusable components
- `@/styles/*` - SCSS/CSS modules
- `@/public/*` - Static assets
Always use path aliases, never relative imports.

### Styling Patterns
**Prefer Tailwind for all new components**. Legacy SCSS modules exist but are being phased out.

1. **Tailwind (preferred)**: Use for all new components - spacing, colors, responsive design, layouts
2. **SCSS modules (legacy)**: `styles/Home.module.scss` - only modify for existing components
3. **CSS custom properties**: Defined in `global.css` for theme colors (black background theme)

Example from Navigation:
```tsx
<div className="bg-black fixed top-0 left-0 w-full"> // Tailwind (preferred)
  <span className={styles.homeNavigationItem}>    // SCSS module (legacy)
```

### Accessibility Requirements
**All components must be accessible to all users**. This is a critical requirement for the project.

1. **ARIA Attributes**: Use appropriate ARIA labels, roles, and properties
   - `aria-label` for buttons/controls without visible text
   - `role` attributes for custom interactive elements (e.g., `role="slider"`, `role="dialog"`)
   - `aria-modal="true"` for modal dialogs
   - `aria-live` regions for dynamic content updates

2. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
   - Add `tabIndex={0}` for focusable custom elements
   - Support ESC key for closing modals/overlays
   - Implement keyboard controls for custom widgets (arrow keys for sliders, etc.)

3. **Semantic HTML**: Use appropriate HTML elements
   - `<button>` for clickable actions, not `<div onClick>`
   - `<nav>` for navigation areas
   - Proper heading hierarchy (`<h1>` to `<h6>`)

4. **Visual Indicators**: Ensure sufficient contrast and focus states
   - Tailwind focus utilities: `focus:ring`, `focus:outline`
   - Color contrast ratios meeting WCAG AA standards
   - Visible focus indicators for keyboard navigation

Example from ImageComparisonSlider:
```tsx
<button
  onClick={handleClick}
  aria-label="View image comparison in fullscreen mode"
  title="View in fullscreen"
>
  <Maximize2 aria-hidden="true" />
</button>

<div
  role="slider"
  aria-valuenow={sliderPosition}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuetext={`${sliderPosition}% visible`}
  tabIndex={0}
/>
```

### TypeScript Interfaces
Key data types defined in each map component:
```typescript
interface JSONObject {          // PDO data structure
  country: string;
  pdoid: string;
  pdoname: string;
  vulneral?: VulnerabilityType;
  // ... regulatory fields
}

interface VulnerabilityType {   // Climate vulnerability
  Vulnerability: "low" | "moderate" | "high" | "very high";
  Exposure: number;
  Sensitivity: number;
  adaptiveCap: number;
  // ... dimensional scores
}
```

### Mapbox Layer Patterns
Vulnerability visualization uses Mapbox expressions:
```typescript
const matchExpression: ExpressionSpecification = ["match", ["get", "PDOid"]];
// Dynamically builds color mapping from vulnerability.json
for (const row of vulnerability) {
  const color = row.Vulnerability === "high" ? "#DD7C75" : "...";
  matchExpression.push(row.PDOid, color);
}
```

### Security Best Practices
This is a public-facing research application - security considerations matter.

1. **Environment Variables**
   - **NEVER commit** `.env.local` or any file containing secrets
   - Only use `NEXT_PUBLIC_*` prefix for truly public client-side values (like Mapbox token)
   - Validate `.gitignore` includes `.env*.local`

2. **Client vs Server Boundaries**
   - Mark components with `"use client"` only when necessary
   - Keep sensitive logic and API calls in server components
   - Be aware: anything in client components can be inspected in browser

3. **External Content & XSS Prevention**
   - Currently all data is static JSON (safe)
   - If adding user input: sanitize before rendering
   - Use Next.js `<Link>` and `<Image>` components (built-in protections)
   - Avoid `dangerouslySetInnerHTML` unless absolutely necessary

4. **Dependencies**
   - Run `pnpm audit` periodically to check for vulnerabilities
   - Keep Next.js and critical packages updated
   - Review dependency changes in PRs

5. **URL Parameters**
   - Search params are used for state (`?pdo=`, `?country=`, etc.)
   - Currently read-only display - safe
   - If adding mutations: validate and sanitize all URL inputs

Example of safe external link handling:
```tsx
<a href={activePDO?.["pdoinfo"]} target="_blank" rel="noreferrer">
  More info on eAmbrosia
</a>
```
Note: `rel="noreferrer"` prevents referrer leakage to external sites.

## Testing & Debugging

### Map Debugging
- Check `mapLoaded` state before querying features
- Use `mapRef.current?.getMap()` to access Mapbox instance
- Zoom level state in `zoomLevel` controls layer visibility (vineyards show at zoom > 7)

### Mobile Considerations
Uses `react-device-detect` for responsive padding:
```typescript
const paddingResponsive = useMemo(() => 
  isMobile 
    ? { top: 100, bottom: 100, left: 0, right: 0 }
    : { top: 100, bottom: 25, left: 400, right: 5 }
, []);
```

## Critical Files
- `src/app/page.tsx` - Main map with vulnerability toggle
- `src/app/components/MapContainer.tsx` - Reusable map container
- `src/app/components/Navigation.tsx` - Mega menu navigation
- `src/app/data/*.json` - All static datasets
- `src/styles/Home.module.scss` - Legacy UI styling (prefer Tailwind for new work)
- `tailwind.config.js` - shadcn/ui integration + custom theme

## Common Pitfalls
- **Don't mix client/server imports**: Keep `"use client"` boundaries clear
- **Mapbox token**: Never commit to repo, always use `.env.local`
- **SCSS modules**: Import as `styles` object, use kebab-case class names
- **pnpm only**: Don't use npm/yarn, lockfile is pnpm-specific
- **JSON imports**: Enable `resolveJsonModule` in tsconfig for data imports
