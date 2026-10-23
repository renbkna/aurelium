<script lang="ts">
	import {
		FIT_LABEL,
		MONTH_INDICES,
		finestMonths,
		shortMonth,
		type MonthIndex,
		type SeasonFit
	} from '#lib/season.ts';

	let { season, marked = [] }: { season: SeasonFit; marked?: readonly MonthIndex[] } = $props();

	// The same light scale as the year dial's tracks.
	const tone = ['bg-bone/5', 'bg-bone/20', 'bg-gold/50', 'bg-gold'] as const;
</script>

<figure>
	<div
		class="grid grid-cols-12 gap-[3px]"
		role="img"
		aria-label="At its finest in {finestMonths(season)}"
	>
		{#each MONTH_INDICES as month (month)}
			<div
				class="h-9 {tone[season[month]]}"
				title="{shortMonth(month)}: {FIT_LABEL[season[month]]}"
			></div>
		{/each}
	</div>
	<figcaption class="mt-2 grid grid-cols-12 gap-[3px] font-mono text-[0.65rem]" aria-hidden="true">
		{#each MONTH_INDICES as month (month)}
			<span class="text-center {marked.includes(month) ? 'text-gold' : 'text-mist'}">
				{shortMonth(month).toUpperCase()}
				{#if marked.includes(month)}<span class="block">▲</span>{/if}
			</span>
		{/each}
	</figcaption>
</figure>
