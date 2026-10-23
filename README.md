# Aurelium

A fictional small-group travel company whose whole idea is timing: six journeys, each run only in
the weeks its place is at its finest. A design piece by [renbkna](https://github.com/renbkna).

- **Year dial** (home): every journey is a track on one dial, lit by how fine each month is. Turn
  the dial (drag, click, or arrow keys) and the journeys re-rank for that month; `?month=nov` links
  to a month.
- **Light diary** (journey pages): each itinerary day shows sunrise, golden hour and sunset at the
  journey's base for the chosen departure, computed from its coordinates with SunCalc.
- **Request a place**: a validated form that ends in a confirmation. Nothing is sent anywhere.

## Stack

SvelteKit 3 (fully prerendered, Vercel adapter, Node 24), Svelte 5 runes, Tailwind CSS 4,
TypeScript, Vitest. Photography from Unsplash.

## Commands

```sh
pnpm install
pnpm dev        # local server
pnpm check      # svelte-check
pnpm lint       # prettier + eslint
pnpm test       # unit tests (ranking, journey data, sun times)
pnpm build      # static output in .vercel/output
```
