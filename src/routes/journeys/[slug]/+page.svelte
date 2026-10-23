<script lang="ts">
	import { resolve } from '$app/paths';
	import Credit from '#lib/components/Credit.svelte';
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
	const index = $derived(journeys.findIndex((j) => j.slug === journey.slug));
	const next = $derived(journeys[(index + 1) % journeys.length]);

	// One departure drives the light in the story and the request form alike. The page component is
	// reused when navigating between journeys, so a choice only counts if it belongs to this journey.
	let chosen = $state<string | null>(null);
	const departure = $derived(
		journey.departures.find((d) => d.start === chosen)?.start ??
			journey.departures[0]?.start ??
			null
	);
	const choose = (value: string | null) => {
		chosen = value;
	};

	const story = $derived(
		journey.itinerary.map((stop) => {
			const date = departure ? addDays(departure, stop.from - 1) : null;
			return { stop, date, light: date ? dayLight(journey.place, date) : null };
		})
	);
	const departureMonths = $derived(
		MONTH_INDICES.filter((month) => journey.departures.some((d) => monthOfDate(d.start) === month))
	);
	const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long', timeZone: 'UTC' });
	const facts = $derived([
		['Length', `${String(journey.days)} days`],
		['Group', `Up to ${String(journey.maxGuests)}`],
		['Pace', journey.pace],
		['From', `${formatPrice(journey.pricePerPerson)} pp`]
	]);
</script>

<svelte:head>
	<title>{journey.name} · Aurelium</title>
	<meta
		name="description"
		content="{journey.promise} {journey.days} days, up to {journey.maxGuests} guests."
	/>
</svelte:head>

<SiteHeader />

<section class="relative isolate flex h-svh min-h-[40rem] items-end overflow-hidden">
	<div class="absolute inset-0 -z-20">
		<div class="h-full w-full motion-safe:animate-drift">
			<Photo photo={journey.cover} sizes="100vw" eager />
		</div>
	</div>
	<div
		class="absolute inset-x-0 top-0 -z-10 h-48 bg-linear-to-b from-night/70 to-transparent"
	></div>
	<div
		class="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-linear-to-t from-night via-night/50 to-transparent"
	></div>

	<div class="mx-auto w-full max-w-[96rem] px-5 pb-10 text-shadow-photo sm:px-10">
		<p class="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-bone/80">
			<span class="text-gold">{journey.region}</span>
			<span>{formatCoordinates(journey.place.lat, journey.place.lng)}</span>
			<LocalClock timeZone={journey.place.timeZone} />
		</p>
		<h1 class="mt-5 max-w-6xl title text-[clamp(3.6rem,10vw,10rem)] text-balance">
			{journey.name}
		</h1>
		<div class="mt-8 flex flex-wrap items-end justify-between gap-8">
			<dl class="flex flex-wrap gap-x-10 gap-y-4">
				{#each facts as [label, value] (label)}
					<div>
						<dt class="label">{label}</dt>
						<dd class="mt-1 text-lg">{value}</dd>
					</div>
				{/each}
			</dl>
			<Credit photo={journey.cover} />
		</div>
	</div>
</section>

<section class="mx-auto max-w-[96rem] px-5 py-28 sm:px-10">
	<p class="max-w-5xl title text-[clamp(2rem,4vw,3.6rem)] text-bone/90">{journey.summary}</p>
</section>

<div class="sticky top-0 z-30 border-y border-hair bg-night/80 backdrop-blur-xl">
	<div
		class="mx-auto flex max-w-[96rem] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-3 sm:px-10"
	>
		<fieldset class="flex flex-wrap items-center gap-2">
			<legend class="float-left mr-2 label">Departing</legend>
			{#each journey.departures as option (option.start)}
				<label>
					<input
						type="radio"
						class="peer sr-only"
						name="story-departure"
						value={option.start}
						checked={departure === option.start}
						onchange={() => {
							choose(option.start);
						}}
					/>
					<span
						class="block cursor-pointer rounded-full border border-hair px-3.5 py-1.5 font-mono text-xs transition-colors
							peer-checked:border-gold peer-checked:text-gold peer-focus-visible:outline-1
							peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold
							peer-[:not(:checked)]:hover:border-bone/50"
					>
						{formatDayMonth(option.start)} – {formatDayMonth(endDate(option.start, journey.days))}
					</span>
				</label>
			{/each}
		</fieldset>
		<a
			href="#request"
			class="rounded-full bg-bone px-5 py-2 text-sm font-medium text-night transition-colors hover:bg-gold"
		>
			Request a place
		</a>
	</div>
</div>

<ol aria-label="Day by day">
	{#each story as { stop, date, light }, position (stop.from)}
		{@const right = position % 2 === 1}
		<li class="relative isolate flex min-h-[94svh] items-end overflow-hidden">
			<div class="absolute inset-0 -z-20">
				<Photo photo={stop.photo} sizes="100vw" />
			</div>
			<div
				class="absolute inset-0 -z-10 bg-linear-to-t from-night/90 via-night/35 to-transparent
					md:bg-linear-to-r {right ? 'md:bg-linear-to-l' : ''} md:from-night/90 md:via-night/40"
			></div>
			<div
				class="mx-auto flex w-full max-w-[96rem] flex-col px-5 pb-12 text-shadow-photo sm:px-10 md:pb-20
					{right ? 'md:items-end md:text-right' : ''}"
			>
				<div class="max-w-xl">
					<p class="font-mono text-xs text-gold">
						{formatDays(stop.from, stop.to)}{#if date}&nbsp;· {weekday.format(
								new Date(`${date}T00:00:00Z`)
							)}
							{formatDayMonth(date)}{/if}
					</p>
					<h2 class="mt-4 title text-[clamp(2.6rem,5.5vw,5rem)] text-balance">{stop.title}</h2>
					<p class="mt-5 text-lg leading-relaxed text-bone/85">{stop.text}</p>
					{#if light}
						<dl
							class="mt-7 inline-grid grid-cols-3 gap-6 border-t border-bone/25 pt-4 font-mono text-xs"
						>
							<div>
								<dt class="text-bone/60">Sunrise</dt>
								<dd class="mt-1 text-sm">{light.sunrise}</dd>
							</div>
							<div>
								<dt class="text-bone/60">Golden hour</dt>
								<dd class="mt-1 text-sm text-gold">{light.goldenHour}</dd>
							</div>
							<div>
								<dt class="text-bone/60">Sunset</dt>
								<dd class="mt-1 text-sm">{light.sunset}</dd>
							</div>
						</dl>
					{/if}
				</div>
				<Credit photo={stop.photo} class="mt-8 self-start {right ? 'md:self-end' : ''}" />
			</div>
		</li>
	{/each}
</ol>

<section class="mx-auto grid max-w-[96rem] gap-16 px-5 py-28 sm:px-10 lg:grid-cols-2 lg:gap-24">
	<div>
		<h2 class="label">When it runs</h2>
		<p class="mt-5 title text-[clamp(1.9rem,3vw,2.8rem)]">{journey.seasonNote}</p>
		<div class="mt-10">
			<SeasonBand season={journey.season} marked={departureMonths} />
			<p class="mt-4 font-mono text-[0.7rem] text-mist">▲ months with a 2027 departure</p>
		</div>
	</div>
	<div>
		<h2 class="label">Included</h2>
		<ul class="mt-5">
			{#each journey.included as item (item)}
				<li class="border-b border-hair py-4 text-lg">{item}</li>
			{/each}
		</ul>
	</div>
</section>

<section id="request" class="scroll-mt-20 border-t border-hair" aria-labelledby="request-title">
	<div
		class="mx-auto grid max-w-[96rem] gap-14 px-5 py-28 sm:px-10 lg:grid-cols-[1fr_1.3fr] lg:gap-24"
	>
		<div>
			<h2 id="request-title" class="title text-[clamp(2.8rem,5vw,4.5rem)]">Request a place</h2>
			<p class="mt-6 max-w-md text-lg leading-relaxed text-bone/75">
				We hold places for 48 hours while a planner writes to you. Nothing is charged until you
				confirm.
			</p>
		</div>
		<RequestForm {journey} bind:departure={() => departure, choose} />
	</div>
</section>

{#if next}
	<a
		href={resolve('/journeys/[slug]', { slug: next.slug })}
		class="group relative isolate flex h-[70svh] items-end overflow-hidden"
	>
		<div
			class="absolute inset-0 -z-20 transition-transform duration-[1.6s] ease-out-soft group-hover:scale-105"
		>
			<Photo photo={next.cover} sizes="100vw" />
		</div>
		<div class="absolute inset-0 -z-10 bg-linear-to-t from-night/90 to-night/10"></div>
		<div class="mx-auto w-full max-w-[96rem] px-5 pb-14 text-shadow-photo sm:px-10">
			<p class="label text-gold!">Next journey</p>
			<p class="mt-4 title text-[clamp(3rem,7vw,7rem)]">
				{next.name}
				<span aria-hidden="true" class="inline-block transition-transform group-hover:translate-x-3"
					>→</span
				>
			</p>
		</div>
	</a>
{/if}
