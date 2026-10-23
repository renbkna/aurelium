<script lang="ts">
	import { resolve } from '$app/paths';
	import LocalClock from '#lib/components/LocalClock.svelte';
	import Photo from '#lib/components/Photo.svelte';
	import RequestForm from '#lib/components/RequestForm.svelte';
	import SeasonBand from '#lib/components/SeasonBand.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import { journeys } from '#lib/data/journeys.ts';
	import {
		addDays,
		endDate,
		formatCoordinates,
		formatDayMonth,
		formatDays,
		formatPrice,
		monthOfDate
	} from '#lib/format.ts';
	import { dayLight } from '#lib/light.ts';
	import { MONTH_INDICES } from '#lib/season.ts';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();

	const journey = $derived(data.journey);
	const number = $derived(
		String(journeys.findIndex((j) => j.slug === journey.slug) + 1).padStart(2, '0')
	);

	// One departure drives the light diary and the request form alike. The page component is reused
	// when navigating between journeys, so a choice only counts if it belongs to this journey.
	let chosen = $state<string | null>(null);
	const departure = $derived(
		journey.departures.find((d) => d.start === chosen)?.start ??
			journey.departures[0]?.start ??
			null
	);
	const choose = (value: string | null) => {
		chosen = value;
	};

	const diary = $derived(
		journey.itinerary.map((stop) => {
			const date = departure ? addDays(departure, stop.from - 1) : null;
			return { stop, date, light: date ? dayLight(journey.place, date) : null };
		})
	);
	const departureMonths = $derived(
		MONTH_INDICES.filter((month) => journey.departures.some((d) => monthOfDate(d.start) === month))
	);
	const others = $derived(journeys.filter((j) => j.slug !== journey.slug));
	const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: 'UTC' });
</script>

<svelte:head>
	<title>{journey.name} · Aurelium</title>
	<meta
		name="description"
		content="{journey.promise} {journey.days} days, up to {journey.maxGuests} guests."
	/>
</svelte:head>

<SiteHeader />

<section class="relative isolate flex min-h-[92svh] items-end overflow-hidden">
	<div class="absolute inset-0 -z-10">
		<Photo photo={journey.cover} sizes="100vw" eager />
	</div>
	<div class="absolute inset-0 -z-10 bg-linear-to-t from-night via-night/40 to-night/75"></div>

	<div class="mx-auto w-full max-w-[96rem] px-5 pt-32 pb-12 sm:px-10">
		<p class="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.72rem] text-bone/75">
			<span class="text-gold">{number}</span>
			<span>{journey.place.label}</span>
			<span>{formatCoordinates(journey.place.lat, journey.place.lng)}</span>
			<LocalClock timeZone={journey.place.timeZone} />
		</p>
		<h1 class="mt-6 max-w-5xl text-[clamp(3rem,8.5vw,8rem)] display">{journey.name}</h1>
		<p class="mt-6 max-w-2xl text-lg leading-relaxed text-bone/85">{journey.promise}</p>

		<dl class="mt-10 grid max-w-4xl grid-cols-2 border-t border-hair sm:grid-cols-4">
			{#each [['Length', `${String(journey.days)} days`], ['Group', `≤ ${String(journey.maxGuests)} guests`], ['Pace', journey.pace], ['From', `${formatPrice(journey.pricePerPerson)} pp`]] as [label, value] (label)}
				<div class="border-b border-hair py-4 pr-4 sm:border-b-0">
					<dt class="label">{label}</dt>
					<dd class="mt-1 font-mono text-sm">{value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<div class="mx-auto max-w-[96rem] px-5 sm:px-10">
	<section
		class="grid gap-10 border-b border-hair py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-20"
		aria-labelledby="when-title"
	>
		<div>
			<h2 id="when-title" class="label">When it runs</h2>
			<p class="mt-5 text-2xl leading-snug tracking-[-0.02em]">{journey.seasonNote}</p>
		</div>
		<div class="self-end">
			<SeasonBand season={journey.season} marked={departureMonths} />
			<p class="mt-4 font-mono text-[0.7rem] text-mist">▲ months with a 2027 departure</p>
		</div>
	</section>

	<section class="py-20" aria-labelledby="diary-title">
		<div class="flex flex-wrap items-end justify-between gap-6">
			<div>
				<h2 id="diary-title" class="label">Light diary</h2>
				<p class="mt-4 max-w-xl text-2xl leading-snug tracking-[-0.02em]">
					Each day, timed to the sun at {journey.place.label}. Pick a departure to see its light.
				</p>
			</div>
			<fieldset>
				<legend class="sr-only">Departure</legend>
				<div class="flex flex-wrap gap-2">
					{#each journey.departures as option (option.start)}
						<label>
							<input
								type="radio"
								class="peer sr-only"
								name="diary-departure"
								value={option.start}
								checked={departure === option.start}
								onchange={() => {
									choose(option.start);
								}}
							/>
							<span
								class="block cursor-pointer border border-hair px-3 py-2 font-mono text-xs transition-colors
									peer-checked:border-gold peer-checked:text-gold peer-focus-visible:outline-1
									peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold
									peer-[:not(:checked)]:hover:border-bone/40"
							>
								{formatDayMonth(option.start)} – {formatDayMonth(
									endDate(option.start, journey.days)
								)}
							</span>
						</label>
					{/each}
				</div>
			</fieldset>
		</div>

		<ol class="mt-12 border-t border-hair">
			{#each diary as { stop, date, light } (stop.from)}
				<li class="grid gap-x-8 gap-y-3 border-b border-hair py-7 md:grid-cols-[9rem_1fr_17rem]">
					<div class="font-mono text-xs">
						<p class="text-gold">{formatDays(stop.from, stop.to)}</p>
						{#if date}
							<p class="mt-1 text-mist">
								{weekday.format(new Date(`${date}T00:00:00Z`))}
								{formatDayMonth(date)}
							</p>
						{/if}
					</div>
					<div>
						<h3 class="text-xl font-medium tracking-[-0.02em]">{stop.title}</h3>
						<p class="mt-2 max-w-2xl leading-relaxed text-bone/75">{stop.text}</p>
					</div>
					{#if light}
						<dl class="grid grid-cols-3 gap-3 self-start font-mono text-xs">
							<div>
								<dt class="text-mist">Sunrise</dt>
								<dd class="mt-1">{light.sunrise}</dd>
							</div>
							<div>
								<dt class="text-mist">Golden</dt>
								<dd class="mt-1 text-gold">{light.goldenHour}</dd>
							</div>
							<div>
								<dt class="text-mist">Sunset</dt>
								<dd class="mt-1">{light.sunset}</dd>
							</div>
						</dl>
					{/if}
				</li>
			{/each}
		</ol>
	</section>

	<section
		class="grid gap-12 border-t border-hair py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-20"
		aria-labelledby="included-title"
	>
		<div>
			<h2 id="included-title" class="label">Included</h2>
			<ul class="mt-6">
				{#each journey.included as item (item)}
					<li class="border-b border-hair py-3 leading-snug">{item}</li>
				{/each}
			</ul>
			{#if journey.detail}
				<div class="mt-10 aspect-[4/3] overflow-hidden bg-night-2">
					<Photo photo={journey.detail} sizes="(min-width: 1024px) 38vw, 92vw" />
				</div>
			{/if}
		</div>

		<div id="request" class="scroll-mt-8">
			<h2 class="label">Request a place</h2>
			<p class="mt-4 mb-10 max-w-lg text-2xl leading-snug tracking-[-0.02em]">
				We hold places for 48 hours while a planner writes to you. Nothing is charged until you
				confirm.
			</p>
			<RequestForm {journey} bind:departure={() => departure, choose} />
		</div>
	</section>

	<nav class="border-t border-hair py-16" aria-label="Other journeys">
		<p class="label">Other journeys</p>
		<ul class="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
			{#each others as other (other.slug)}
				<li class="border-b border-hair">
					<a
						href={resolve('/journeys/[slug]', { slug: other.slug })}
						class="block py-3 transition-colors hover:text-gold"
					>
						{other.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>
