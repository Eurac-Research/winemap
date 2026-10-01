# WINEMAP

WINEMAP is an interactive platform for exploring European wine regions, their regulatory information, climate-change vulnerability, and environmental conditions. It is based on research from [Eurac Research](https://www.eurac.edu/).

- Candiago, S., Tscholl, S., Bassani, L. et al. A geospatial inventory of regulatory information for wine protected designations of origin in Europe. Sci Data 9, 394 (2022). https://doi.org/10.1038/s41597-022-01513-0
- Tscholl, S., Candiago, S., Marsoner, T. et al. Climate resilience of European wine regions. Nat Commun 15, 6254 (2024). https://doi.org/10.1038/s41467-024-50549-w

The public application is available at [winemap.eurac.edu](https://winemap.eurac.edu/).

## Introduction

WINEMAP brings together interactive map applications, scientific data, and resources on climate adaptation, environmental change, governance, and resilient European vineyard landscapes. Its map applications cover PDO information, climate-change vulnerability, and environmental indicators.

## Features

- Interactive map applications for PDO, vulnerability, and environmental data
- Search, filters, and region-level information for European wine PDOs
- Adaptation, governance, ecosystem-based approach, course, and literature resources
- Climate-change vulnerability assessments for European wine regions

## Installation

To get started with the WINEMAP project, follow these steps:

### Prerequisites

- A current Node.js LTS release compatible with Next.js 16
- [Corepack](https://nodejs.org/api/corepack.html) enabled, so the repository's pinned pnpm version is used

```bash
corepack enable
```

### Install dependencies

```bash
git clone https://github.com/Eurac-Research/winemap.git
cd winemap
pnpm install --frozen-lockfile
```

This repository uses pnpm 10.28.2. Do not use Yarn or npm to install dependencies, as they will not use the committed `pnpm-lock.yaml`.

### Configure local environment variables

Map applications require a Mapbox public access token. Create `.env.local` in the project root with:

```bash
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_access_token
```

`.env.local` is ignored by Git. Because variables prefixed with `NEXT_PUBLIC_` are included in the browser bundle, use only a public, restricted token.

## Usage

Start the development server:

```bash
pnpm dev
```

The `predev` script automatically generates topic registries before Next.js starts. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Commands

| Command       | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| `pnpm dev`    | Generate topic registries and start the development server. |
| `pnpm build`  | Generate topic registries and create a production build.    |
| `pnpm start`  | Start the production server after a build.                  |
| `pnpm lint`   | Run ESLint on `src`.                                        |
| `pnpm format` | Check formatting with Prettier.                             |
| `pnpm fmt`    | Format supported source files with Prettier.                |
| `pnpm run ci` | Run formatting, linting, and TypeScript checks.             |

## Contributing

We welcome contributions to the WINEMAP project! If you would like to contribute, please follow these steps:

1. Create a branch for your change.
2. Make your changes and run the relevant checks above.
3. Commit with a clear message and open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
