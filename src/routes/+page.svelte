<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount, untrack } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import Photo from '#lib/components/Photo.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import YearDial from '#lib/components/YearDial.svelte';
	import { journeys } from '#lib/data/journeys.ts';
	import { rankJourneys } from '#lib/finder.ts';
	import { formatCoordinates, formatDayMonth, formatPrice } from '#lib/format.ts';
	import { FIT_LABEL, MONTH_INDICES, MONTHS, monthFromSlug, monthSlug } from '#lib/season.ts';
	import type { PageProps } from './$types.js';

	let { data }: PageProps = $props();

	// Deliberately the initial value only: from here on the dial owns the month.
	let month = $state(untrack(() => data.buildMonth));
	let ready = $state(false);
	let focused = $state<string | null>(null);

	const matches = $derived(rankJourneys(journeys, month));
	const lead = $derived(matches[0]);
	const finestCount = $derived(matches.filter((m) => m.fit === 3).length);
	const trackNumber = (slug: string) =>
		String(journeys.findIndex((journey) => journey.slug === slug) + 1).padStart(2, '0');
	const fitClass = ['text-mist/60', 'text-mist', 'text-gold/80', 'text-gold'] as const;

	onMount(() => {
		month =
			monthFromSlug(page.url.searchParams.get('month')) ??
			MONTH_INDICES[new Date().getMonth()] ??
			month;
		ready = true;
	});

	$effect(() => {
		if (!ready) return;
		const target = resolve(`/?month=${monthSlug(month)}`);
		if (target !== page.url.pathname + page.url.search) {
			void goto(target, { shallow: true, replace: true });
		}
	});
</script>

<svelte:head>
	<title>Aurelium · Journeys timed to the year</title>
	<meta
		name="description"
		content="Six small-group journeys, each run only in the weeks its place is at its finest. Turn the year and see where to be."
	/>
</svelte:head>

<SiteHeader />

<section
	class="mx-auto grid min-h-svh max-w-[96rem] items-center gap-10 px-5 pt-24 pb-14 sm:px-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:gap-16"
>
	<div class="mx-auto w-full max-w-[44rem]">
		<YearDial {journeys} bind:month {focused} {finestCount} />
		<ul
			class="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[0.7rem] text-mist"
		>
			<li class="flex items-center gap-2"><span class="h-2 w-5 bg-gold"></span>At its finest</li>
			<li class="flex items-center gap-2"><span class="h-2 w-5 bg-gold/50"></span>Good</li>
			<li class="flex items-center gap-2"><span class="h-2 w-5 bg-bone/20"></span>Possible</li>
			<li class="text-mist/70">
				Drag the dial<span class="hidden pointer-fine:inline"> or use the arrow keys</span>
			</li>
		</ul>
	</div>

	<div>
		<h1 class="max-w-xl text-[clamp(2.2rem,4vw,3.6rem)] display">
			Six journeys. Each one runs only when its place is at its finest.
		</h1>

		{#if lead}
			<a
				href={resolve('/journeys/[slug]', { slug: lead.journey.slug })}
				class="group mt-10 block"
				aria-label="{lead.journey.name}, {FIT_LABEL[lead.fit]} in {MONTHS[month]}"
			>
				<div class="relative aspect-[16/9] overflow-hidden bg-night-2">
					{#key lead.journey.slug}
						<div
							class="absolute inset-0"
							transition:fade={{ duration: prefersReducedMotion.current ? 0 : 600 }}
						>
							<Photo
								photo={lead.journey.cover}
								sizes="(min-width: 1024px) 44vw, 92vw"
								eager
								class="transition-transform duration-[1.4s] ease-out-soft group-hover:scale-[1.03]"
							/>
						</div>
					{/key}
					<div class="absolute inset-0 bg-linear-to-t from-night/85 to-transparent to-60%"></div>
					<div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
						<div>
							<p class="font-mono text-[0.7rem] text-gold">
								{trackNumber(lead.journey.slug)} · FINEST IN {MONTHS[month].toUpperCase()}
							</p>
							<p class="mt-1 text-2xl font-medium tracking-[-0.03em]">{lead.journey.name}</p>
						</div>
						<span
							class="hidden font-mono text-xs text-bone/70 transition-colors group-hover:text-gold sm:block"
							aria-hidden="true">Open →</span
						>
					</div>
				</div>
				<p class="mt-3 flex justify-between gap-4 font-mono text-[0.7rem] text-mist">
					<span>{lead.journey.place.label}</span>
					<span>{formatCoordinates(lead.journey.place.lat, lead.journey.place.lng)}</span>
				</p>
			</a>
		{/if}

		<div class="mt-10">
			<p class="label">All six, for {MONTHS[month]}</p>
			<ol class="mt-3 border-t border-hair" aria-live="polite">
				{#each matches as match (match.journey.slug)}
					<li
						class="border-b border-hair"
						onmouseenter={() => (focused = match.journey.slug)}
						onmouseleave={() => (focused = null)}
					>
						<a
							href={resolve('/journeys/[slug]', { slug: match.journey.slug })}
							class="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-3 transition-colors hover:bg-bone/[0.03] sm:grid-cols-[2rem_1fr_11.5rem_6.5rem]"
							onfocus={() => (focused = match.journey.slug)}
							onblur={() => (focused = null)}
						>
							<span class="font-mono text-xs text-mist">{trackNumber(match.journey.slug)}</span>
							<span class="font-medium {match.fit === 0 ? 'text-mist/60' : ''}"
								>{match.journey.name}</span
							>
							<span class="font-mono text-xs {fitClass[match.fit]} text-right sm:text-left">
								{match.departures.length > 0
									? `Departs ${match.departures.map((d) => formatDayMonth(d.start)).join(', ')}`
									: FIT_LABEL[match.fit]}
							</span>
							<span class="col-start-2 font-mono text-xs text-mist sm:col-start-auto sm:text-right">
								{match.journey.days}d · {formatPrice(match.journey.pricePerPerson)}
							</span>
						</a>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
