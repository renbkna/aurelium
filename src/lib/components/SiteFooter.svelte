<script lang="ts">
	import { resolve } from '$app/paths';
	import { journeys } from '#lib/data/journeys.ts';
	import { formatCoordinates } from '#lib/format.ts';
</script>

<footer class="border-t border-hair">
	<div class="mx-auto grid max-w-[96rem] gap-12 px-5 py-14 sm:px-10 md:grid-cols-[1fr_1.4fr]">
		<div>
			<p class="text-lg font-semibold tracking-[-0.03em]">Aurelium</p>
			<p class="mt-3 max-w-sm text-sm leading-relaxed text-mist">
				A fictional travel company and a design piece by
				<a href="https://github.com/renbkna" class="text-bone underline underline-offset-4"
					>renbkna</a
				>. Requests are not sent anywhere. Photography from Unsplash.
			</p>
		</div>
		<nav aria-label="Journeys">
			<ol class="grid gap-x-8 sm:grid-cols-2">
				{#each journeys as journey, index (journey.slug)}
					<li class="border-b border-hair">
						<a
							href={resolve('/journeys/[slug]', { slug: journey.slug })}
							class="flex items-baseline gap-3 py-2.5 text-sm hover:text-gold"
						>
							<span class="font-mono text-xs text-mist">{String(index + 1).padStart(2, '0')}</span>
							<span class="flex-1">{journey.name}</span>
							<span class="hidden font-mono text-[0.65rem] text-mist lg:inline">
								{formatCoordinates(journey.place.lat, journey.place.lng)}
							</span>
						</a>
					</li>
				{/each}
			</ol>
		</nav>
	</div>
</footer>
