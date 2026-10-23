<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<header class="absolute inset-x-0 top-0 z-20">
	<div class="mx-auto flex max-w-[96rem] items-baseline justify-between gap-6 px-5 py-6 sm:px-10">
		<a href={resolve('/')} class="flex items-baseline gap-3" aria-label="Aurelium, home">
			<span class="text-lg font-semibold tracking-[-0.03em]">Aurelium</span>
			<span class="hidden font-mono text-[0.7rem] text-mist sm:inline"
				>Journeys timed to the year</span
			>
		</a>
		<p class="hidden font-mono text-[0.7rem] text-mist sm:block">
			Season 2027 · 6 journeys · ≤ 12 guests
		</p>
	</div>
</header>
