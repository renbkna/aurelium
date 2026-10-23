<script lang="ts">
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import type { Journey } from '#lib/data/journeys.ts';
	import { MONTH_INDICES, MONTHS, shortMonth, type MonthIndex } from '#lib/season.ts';

	let {
		journeys,
		month = $bindable(0),
		focused = null,
		finestCount
	}: {
		journeys: readonly Journey[];
		month?: MonthIndex;
		/** Slug of the journey whose track is emphasised (hovered elsewhere on the page). */
		focused?: string | null;
		finestCount: number;
	} = $props();

	// Angles are degrees clockwise from twelve o'clock. The year spans 348°; the 12° gap at the top
	// carries the track numbers, like the index on an instrument dial.
	const GAP = 12;
	const SPAN = (360 - GAP) / 12;
	const start = (value: number) => GAP / 2 + value * SPAN;
	const point = (radius: number, angle: number) => {
		const rad = (angle * Math.PI) / 180;
		return `${(radius * Math.sin(rad)).toFixed(2)} ${(-radius * Math.cos(rad)).toFixed(2)}`;
	};
	const arc = (radius: number, from: number, to: number) =>
		`M ${point(radius, from)} A ${String(radius)} ${String(radius)} 0 ${to - from > 180 ? '1' : '0'} 1 ${point(radius, to)}`;
	const sector = (inner: number, outer: number, from: number, to: number) =>
		`M ${point(inner, from)} L ${point(outer, from)} A ${String(outer)} ${String(outer)} 0 0 1 ${point(outer, to)} L ${point(inner, to)} A ${String(inner)} ${String(inner)} 0 0 0 ${point(inner, from)} Z`;

	const TRACK_OUTER = 404;
	const TRACK_STEP = 36;
	const TRACK_WIDTH = 22;
	const trackRadius = (index: number) => TRACK_OUTER - index * TRACK_STEP;
	const innerEdge = $derived(trackRadius(journeys.length - 1) - TRACK_WIDTH / 2 - 8);
	const tone = [
		'transparent',
		'rgb(237 229 216 / 0.2)',
		'rgb(240 179 88 / 0.5)',
		'var(--color-gold)'
	];

	// The hand turns the short way round, so December to January is one step, not eleven.
	const centre = (value: MonthIndex) => start(value) + SPAN / 2;
	let unwrapped = centre(month);
	const hand = new Spring(unwrapped, { stiffness: 0.09, damping: 0.62 });
	$effect(() => {
		const delta = ((((centre(month) - unwrapped) % 360) + 540) % 360) - 180;
		unwrapped += delta;
		void hand.set(unwrapped, { instant: prefersReducedMotion.current });
	});

	let dial = $state<SVGSVGElement>();
	let dragging = $state(false);

	function monthAt(event: PointerEvent): MonthIndex | null {
		if (!dial) return null;
		const box = dial.getBoundingClientRect();
		const x = event.clientX - (box.left + box.width / 2);
		const y = event.clientY - (box.top + box.height / 2);
		if (Math.hypot(x, y) < box.width * 0.08) return null;
		const angle = ((Math.atan2(x, -y) * 180) / Math.PI + 360) % 360;
		// Clamping puts the index gap's left half on December and its right half on January.
		const index = Math.min(11, Math.max(0, Math.floor((angle - GAP / 2) / SPAN)));
		return MONTH_INDICES[index] ?? null;
	}

	function pick(event: PointerEvent) {
		const next = monthAt(event);
		if (next !== null) month = next;
	}

	const STEPS: Record<string, number> = {
		ArrowRight: 1,
		ArrowUp: 1,
		ArrowLeft: -1,
		ArrowDown: -1,
		PageUp: 3,
		PageDown: -3
	};

	function onkeydown(event: KeyboardEvent) {
		let next: number | null = null;
		if (event.key in STEPS) next = (month + (STEPS[event.key] ?? 0) + 12) % 12;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = 11;
		if (next === null) return;
		event.preventDefault();
		month = MONTH_INDICES[next] ?? month;
	}
</script>

<div
	class="relative aspect-square w-full touch-none outline-none select-none [&:focus-visible_.focus-ring]:opacity-100"
	role="slider"
	tabindex="0"
	aria-label="Month of travel"
	aria-valuemin={1}
	aria-valuemax={12}
	aria-valuenow={month + 1}
	aria-valuetext={MONTHS[month]}
	{onkeydown}
>
	<svg
		bind:this={dial}
		viewBox="-520 -520 1040 1040"
		class="h-full w-full {dragging ? 'cursor-grabbing' : 'cursor-grab'}"
		aria-hidden="true"
		onpointerdown={(event) => {
			dragging = true;
			(event.currentTarget as Element).setPointerCapture(event.pointerId);
			pick(event);
		}}
		onpointermove={(event) => {
			if (dragging) pick(event);
		}}
		onpointerup={() => (dragging = false)}
		onpointercancel={() => (dragging = false)}
	>
		<defs>
			<radialGradient id="beam" cx="0" cy="0" r="470" gradientUnits="userSpaceOnUse">
				<stop offset="0.25" stop-color="#f0b358" stop-opacity="0" />
				<stop offset="1" stop-color="#f0b358" stop-opacity="0.22" />
			</radialGradient>
		</defs>

		<circle
			r="508"
			class="focus-ring fill-none stroke-gold opacity-0 transition-opacity"
			stroke-width="2"
		/>

		<!-- Scale: month boundaries, five-day ticks and month names. -->
		{#each MONTH_INDICES as value (value)}
			<line
				x1={0}
				y1={-438}
				x2={0}
				y2={-462}
				transform="rotate({start(value)})"
				class="stroke-bone/40"
				stroke-width="1.5"
			/>
			{#each [1, 2, 3, 4, 5] as sixth (sixth)}
				<line
					x1={0}
					y1={-446}
					x2={0}
					y2={sixth === 3 ? -456 : -452}
					transform="rotate({start(value) + (sixth * SPAN) / 6})"
					class="stroke-bone/20"
					stroke-width="1"
				/>
			{/each}
			<text
				transform="translate({point(488, centre(value))})"
				text-anchor="middle"
				dominant-baseline="central"
				class="font-mono text-[19px] tracking-[0.12em] transition-colors duration-300
					{value === month ? 'fill-gold' : 'fill-mist'}"
			>
				{shortMonth(value).toUpperCase()}
			</text>
		{/each}

		<!-- One track per journey; each month is lit by how fine the journey is then. -->
		{#each journeys as journey, index (journey.slug)}
			{@const radius = trackRadius(index)}
			<g
				class="transition-opacity duration-300 {focused && focused !== journey.slug
					? 'opacity-25'
					: ''}"
			>
				<path
					d={arc(radius, GAP / 2, 360 - GAP / 2)}
					fill="none"
					class="stroke-bone/6"
					stroke-width={TRACK_WIDTH}
				/>
				{#each MONTH_INDICES as value (value)}
					{@const fit = journey.season[value]}
					{#if fit > 0}
						<path
							d={arc(radius, start(value) + 1.2, start(value) + SPAN - 1.2)}
							fill="none"
							stroke={tone[fit]}
							stroke-width={TRACK_WIDTH}
						/>
					{/if}
				{/each}
				<text
					transform="translate({point(radius, 0)})"
					text-anchor="middle"
					dominant-baseline="central"
					class="fill-mist font-mono text-[15px]"
				>
					{String(index + 1).padStart(2, '0')}
				</text>
			</g>
		{/each}

		<!-- The hand and the light it casts across the chosen month. -->
		<g transform="rotate({hand.current - SPAN / 2})">
			<path d={sector(innerEdge, 432, 0, SPAN)} fill="url(#beam)" />
		</g>
		<g transform="rotate({hand.current})">
			<line x1="0" y1={-innerEdge + 10} x2="0" y2="-470" class="stroke-gold" stroke-width="2" />
			<circle cy="-470" r="6" class="fill-gold" />
		</g>
		<circle r={innerEdge - 10} class="fill-night stroke-hair" stroke-width="1" />
	</svg>

	<div
		class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
	>
		<p class="label">Travel in</p>
		<p class="mt-2 text-[clamp(1.5rem,3.3vw,2.75rem)] font-medium tracking-[-0.04em] text-bone">
			{MONTHS[month]}
		</p>
		<p class="mt-2 font-mono text-xs text-gold">
			{finestCount}
			{finestCount === 1 ? 'journey' : 'journeys'} at their finest
		</p>
	</div>
</div>
