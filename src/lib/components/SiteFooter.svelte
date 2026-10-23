<script lang="ts">
	import { resolve } from '$app/paths';
	import { journeys } from '#lib/data/journeys.ts';
	import { finestRange } from '#lib/season.ts';
</script>

<footer class="border-t border-hair">
	<div class="mx-auto grid max-w-[96rem] gap-12 px-5 py-16 sm:px-10 md:grid-cols-[1fr_1.6fr]">
		<div>
			<p class="title text-4xl">Aurelium</p>
			<p class="mt-4 max-w-sm text-sm leading-relaxed text-mist">
				A fictional travel company, made as a design piece by
				<a href="https://github.com/renbkna" class="text-bone underline underline-offset-4"
					>renbkna</a
				>. Requests are not sent anywhere.
				<a href={resolve('/credits')} class="text-bone underline underline-offset-4"
					>Photo credits</a
				>.
			</p>
		</div>
		<nav aria-label="Journeys">
			<ul class="grid gap-x-10 sm:grid-cols-2">
				{#each journeys as journey (journey.slug)}
					<li class="border-b border-hair">
						<a
							href={resolve('/journeys/[slug]', { slug: journey.slug })}
							class="flex items-baseline justify-between gap-4 py-3 hover:text-gold"
						>
							<span>{journey.name}</span>
							<span class="font-mono text-[0.68rem] text-mist">{finestRange(journey.season)}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</footer>
