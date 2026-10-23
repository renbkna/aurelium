<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount, untrack } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import Credit from '#lib/components/Credit.svelte';
	import Photo from '#lib/components/Photo.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import YearScrubber from '#lib/components/YearScrubber.svelte';
	import { journeys } from '#lib/data/journeys.ts';
	import { rankJourneys } from '#lib/finder.ts';
	import { formatDayMonth, formatPrice } from '#lib/format.ts';
	import { MONTH_INDICES, MONTHS, finestRange, monthFromSlug, monthSlug } from '#lib/season.ts';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();

	const AUTOPLAY_MS = 7000;

	// Deliberately the initial value only: from here on the scrubber owns the month.
	let month = $state(untrack(() => data.buildMonth));
	let playing = $state(false);
	let ready = $state(false);
	/** A journey chosen from "also at its finest"; it only applies to the month it was chosen in. */
	let picked = $state<{ month: number; slug: string } | null>(null);

	const matches = $derived(rankJourneys(journeys, month));
	const finest = $derived(matches.filter((match) => match.fit === 3));
	const shown = $derived(
		(picked?.month === month
			? matches.find((match) => match.journey.slug === picked?.slug)
			: undefined) ??
			finest[0] ??
			matches[0]
	);
	const finestByMonth = MONTH_INDICES.map(
		(value) => journeys.filter((journey) => journey.season[value] === 3).length
	);
	const crossfade = $derived({ duration: prefersReducedMotion.current ? 0 : 1100 });

	onMount(() => {
		const linked = monthFromSlug(page.url.searchParams.get('month'));
		month = linked ?? MONTH_INDICES[new Date().getMonth()] ?? month;
		// A shared link shows its month; otherwise the year plays, unless motion is unwelcome.
		playing = linked === null && !prefersReducedMotion.current;
		ready = true;
	});

	$effect(() => {
		if (!playing) return;
		const timer = setInterval(() => {
			month = MONTH_INDICES[(month + 1) % 12] ?? month;
		}, AUTOPLAY_MS);
		return () => {
			clearInterval(timer);
		};
	});

	// Only a month the visitor chose goes into the address bar, not every frame of the autoplay.
	$effect(() => {
		if (!ready || playing) return;
		const target = resolve(`/?month=${monthSlug(month)}`);
		if (target !== page.url.pathname + page.url.search) {
			void goto(target, { shallow: true, replace: true });
		}
	});
</script>

<svelte:head>
	<title>Aurelium · Go when it’s at its finest</title>
	<meta
		name="description"
		content="Six small-group journeys, each run only in the weeks its place is at its finest. Move through the year and see where to be."
	/>
</svelte:head>

<SiteHeader />

{#if shown}
	{@const journey = shown.journey}
	<section
		class="relative isolate h-svh min-h-[40rem] overflow-hidden bg-night"
		aria-roledescription="carousel"
		aria-label="Where to be, month by month"
	>
		{#key journey.slug}
			<div class="absolute inset-0 -z-20" transition:fade={crossfade}>
				<div class="h-full w-full motion-safe:animate-drift">
					<Photo photo={journey.cover} sizes="100vw" eager />
				</div>
			</div>
		{/key}
		<div
			class="absolute inset-x-0 top-0 -z-10 h-48 bg-linear-to-b from-night/70 to-transparent"
		></div>
		<div
			class="absolute inset-x-0 bottom-0 -z-10 h-[72%] bg-linear-to-t from-night via-night/55 to-transparent"
		></div>
		<!-- Shade behind the title so it reads over bright stone and sky as well as night scenes. -->
		<div
			class="absolute inset-y-0 left-0 -z-10 w-full bg-linear-to-r from-night/65 via-night/25 to-transparent md:w-2/3"
		></div>

		<div class="absolute inset-x-0 bottom-0 mx-auto max-w-[96rem] px-5 pb-6 sm:px-10 sm:pb-8">
			{#key journey.slug}
				<div
					class="max-w-6xl text-shadow-photo"
					in:fade={{ ...crossfade, delay: crossfade.duration / 3 }}
				>
					<p class="label text-gold!">
						{shown.fit === 3
							? `At its finest in ${MONTHS[month]}`
							: `${MONTHS[month]} · a quieter month`}
					</p>
					<h1 class="mt-4 title text-[clamp(3.4rem,8.5vw,8.5rem)] text-balance">{journey.name}</h1>
					<p class="mt-5 max-w-xl text-lg leading-relaxed text-bone/85">{journey.promise}</p>
					<div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
						<a
							href={resolve('/journeys/[slug]', { slug: journey.slug })}
							class="rounded-full bg-bone px-7 py-3.5 font-medium text-night transition-colors hover:bg-gold"
						>
							Discover the journey
						</a>
						<p class="font-mono text-xs text-bone/75">
							{journey.days} days · from {formatPrice(journey.pricePerPerson)}
							{#if shown.departures.length > 0}
								· departs {shown.departures.map((d) => formatDayMonth(d.start)).join(' & ')}
							{/if}
						</p>
					</div>
				</div>
			{/key}

			{#if finest.length > 1}
				<div class="mt-6 flex flex-wrap items-center gap-2 text-sm">
					<span class="text-bone/60">Also at its finest:</span>
					{#each finest.filter((match) => match.journey.slug !== journey.slug) as other (other.journey.slug)}
						<button
							type="button"
							class="rounded-full border border-bone/30 px-3.5 py-1.5 backdrop-blur-sm transition-colors hover:border-bone hover:bg-bone/10"
							onclick={() => {
								playing = false;
								picked = { month, slug: other.journey.slug };
							}}
						>
							{other.journey.name}
						</button>
					{/each}
				</div>
			{/if}

			<div class="mt-8 flex items-end gap-5 sm:mt-10">
				<button
					type="button"
					class="mb-[0.15rem] flex size-9 shrink-0 items-center justify-center rounded-full border border-bone/30 transition-colors hover:border-bone"
					aria-label={playing ? 'Pause the year' : 'Play the year'}
					onclick={() => (playing = !playing)}
				>
					{#if playing}
						<svg viewBox="0 0 12 12" class="size-3 fill-bone" aria-hidden="true"
							><rect x="2" y="1" width="3" height="10" /><rect
								x="7"
								y="1"
								width="3"
								height="10"
							/></svg
						>
					{:else}
						<svg viewBox="0 0 12 12" class="size-3 fill-bone" aria-hidden="true"
							><path d="M3 1.5v9l7.5-4.5z" /></svg
						>
					{/if}
				</button>
				<div class="flex-1">
					<YearScrubber bind:month {finestByMonth} oninteract={() => (playing = false)} />
				</div>
			</div>
			<div class="mt-3 flex justify-end">
				<Credit photo={journey.cover} />
			</div>
		</div>
	</section>
{/if}

<section class="mx-auto max-w-[96rem] px-5 py-24 sm:px-10" aria-labelledby="six-title">
	<div class="flex flex-wrap items-end justify-between gap-6">
		<h2 id="six-title" class="title text-[clamp(2.6rem,5vw,4.5rem)]">Six journeys, six seasons</h2>
		<p class="max-w-sm text-bone/70">
			Each departs only in its finest weeks. Fewer than a dozen guests, never more than two hotels.
		</p>
	</div>

	<ul class="mt-12 flex flex-col gap-2 lg:h-[78vh] lg:flex-row">
		{#each journeys as journey, index (journey.slug)}
			<li
				class="group relative h-[62vw] max-h-[30rem] overflow-hidden transition-[flex-grow] duration-700 ease-out-soft
					lg:h-auto lg:max-h-none lg:flex-1 lg:focus-within:flex-[2.4] lg:hover:flex-[2.4]"
			>
				<a
					href={resolve('/journeys/[slug]', { slug: journey.slug })}
					class="absolute inset-0 block"
				>
					<div
						class="h-full w-full transition-transform duration-[1.6s] ease-out-soft group-hover:scale-105"
					>
						<Photo photo={journey.cover} sizes="(min-width: 1024px) 40vw, 100vw" />
					</div>
					<div
						class="absolute inset-0 bg-linear-to-t from-night/90 via-night/20 to-transparent"
					></div>
					<div class="absolute inset-x-0 bottom-0 p-5 text-shadow-photo">
						<p class="font-mono text-xs text-gold">{String(index + 1).padStart(2, '0')}</p>
						<h3 class="mt-2 title text-[2rem] lg:text-[1.9rem]">{journey.name}</h3>
						<p
							class="mt-3 text-sm text-bone/80 transition-opacity duration-500 lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100"
						>
							Finest {finestRange(journey.season)}
						</p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>

<section class="border-t border-hair">
	<div class="mx-auto max-w-[96rem] px-5 py-24 sm:px-10">
		<p class="max-w-5xl title text-[clamp(2.2rem,4.6vw,4.4rem)] text-bone/90">
			We would rather wait for the maples to turn than fill a coach in August.
			<em class="text-gold">Every place has its weeks. We only go in them.</em>
		</p>
	</div>
</section>
