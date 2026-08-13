# Recipe Finder & Meal Planner

A recipe discovery and weekly meal planning app built with **Svelte 5**, **SvelteKit**, and a
companion **StencilJS** web component library published to npm.

- `app/` — the SvelteKit application
- `stencil-lib/` — the StencilJS component library (`@uttkarshupadhyay/recipe-ui-kit`)

## Links

- npm package: TBD
- Deployed app: TBD
- GitHub repository: TBD

## Setup instructions

### Prerequisites

- Node.js 20+
- npm

### 1. Install and build the component library

```bash
cd stencil-lib
npm install
npm run build
```

### 2. Install and run the SvelteKit app

```bash
cd app
npm install
npm run dev -- --open
```

The app runs at `http://localhost:5173` by default.

## Starting the development server

```bash
cd app
npm run dev
```

## Assumptions made

- Recipe data is sourced from the free [TheMealDB](https://www.themealdb.com/api.php) API.
- User-created recipes, favorites, and the weekly meal plan are persisted in the browser
  (`localStorage`) rather than a backend database, since no authentication/multi-device
  sync was required by the assignment.
- No user authentication/accounts are implemented; all data is scoped to the local browser.

## Stencil component library

Published as `@uttkarshupadhyay/recipe-ui-kit` on npm and consumed by the SvelteKit app as a
regular dependency (not imported from source). See [`stencil-lib/README.md`](./stencil-lib/README.md)
for component docs.
