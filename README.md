# Aurelium

Aurelium is a luxury travel landing page focused on polished motion, responsive UI, and premium visual design.

![Aurelium](./public/aurelium.png)

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- GSAP
- Lenis
- TypeScript

## Features

- Responsive single-page layout
- Section animations and scroll-driven interactions
- Destination and gallery content blocks
- Light and dark theme toggle
- Custom cursor and UI motion accents

## Tooling

- `oxlint` for linting (strict correctness/suspicious profile + React/import/a11y/promise plugins)
- `oxfmt` for formatting
- `tsc --noEmit` for TypeScript type checking
- `knip` for dependency usage checks

## Scripts

```bash
# development
npm run dev

# production build and preview
npm run build
npm run preview

# linting and type checks
npm run lint
npm run lint:fix

# formatting
npm run format
npm run format:check

# dependency usage audit
npm run deps:check
```

## Run locally

```bash
git clone https://github.com/renbkna/aurelium.git
cd aurelium

# with npm
npm install
npm run dev

# or with bun
bun install
bun run dev
```
