# Aurelium

A fictional small-group travel company whose whole idea is timing: six journeys, each run only in
the weeks its place is at its finest. A design piece by [renbkna](https://github.com/renbkna).

- **The year, full screen** (home): one place fills the screen at a time. Scrub the year (drag,
  click or arrow keys) and the stage cuts to the journey at its finest that month, with the others
  that are also good then one tap away. `?month=nov` links to a month.
- **A photo story per journey**: the itinerary day by day, a sticky departure bar, and sunrise,
  golden hour and sunset at the journey's base for the chosen departure, computed with SunCalc.
- **Request a place**: a validated form that ends in a confirmation. Nothing is sent anywhere.

## Stack

SvelteKit 3 (fully prerendered, Vercel adapter, Node 24), Svelte 5 runes, Tailwind CSS 4,
TypeScript, Vitest. Photography from Wikimedia Commons under CC licences, credited on each photo
and on `/credits`.

## Commands

```sh
pnpm install
pnpm dev        # local server
pnpm check      # svelte-check
pnpm lint       # prettier + eslint
pnpm test       # unit tests (ranking, seasons, sun times)
pnpm build      # static output in .vercel/output
```
