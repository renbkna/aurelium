<script lang="ts">
	import Photo from '#lib/components/Photo.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import { journeys } from '#lib/data/journeys.ts';

	const sections = journeys.map((journey) => ({
		journey,
		photos: [journey.cover, ...journey.itinerary.map((stop) => stop.photo)]
	}));
</script>

<svelte:head>
	<title>Photo credits · Aurelium</title>
	<meta name="description" content="Authors and licences of the photographs used on Aurelium." />
</svelte:head>

<SiteHeader />

<section class="mx-auto max-w-[96rem] px-5 pt-36 pb-24 sm:px-10">
	<h1 class="title text-[clamp(3rem,7vw,6rem)]">Photo credits</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-bone/75">
		Every photograph comes from Wikimedia Commons and is used under the licence shown. Follow a
		credit for the original file and its full terms.
	</p>

	{#each sections as { journey, photos } (journey.slug)}
		<h2 class="mt-20 label">{journey.name}</h2>
		<ul class="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each photos as photo (photo.path)}
				<li>
					<div class="aspect-[3/2] overflow-hidden bg-night-2">
						<Photo {photo} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" />
					</div>
					<p class="mt-3 text-sm text-bone/85">{photo.alt}</p>
					<p class="mt-1 font-mono text-xs text-mist">
						<a
							href={photo.credit.source}
							class="underline underline-offset-4 hover:text-bone"
							rel="external">{photo.credit.author}</a
						>
						· {photo.credit.license}
					</p>
				</li>
			{/each}
		</ul>
	{/each}
</section>
