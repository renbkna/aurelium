<script lang="ts">
	import { MONTH_INDICES, MONTHS, shortMonth, type MonthIndex } from '#lib/season.ts';

	let {
		month = $bindable(0),
		finestByMonth,
		oninteract
	}: {
		month?: MonthIndex;
		/** How many journeys are at their finest in each month, January first. */
		finestByMonth: readonly number[];
		/** Called when the visitor takes hold of the scrubber, so autoplay can stop. */
		oninteract: () => void;
	} = $props();

	let track = $state<HTMLDivElement>();
	let dragging = $state(false);

	function pick(event: PointerEvent) {
		if (!track) return;
		const box = track.getBoundingClientRect();
		const ratio = Math.min(0.9999, Math.max(0, (event.clientX - box.left) / box.width));
		month = MONTH_INDICES[Math.floor(ratio * 12)] ?? month;
	}

	const STEPS: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };

	function onkeydown(event: KeyboardEvent) {
		let next: number | null = null;
		const step = STEPS[event.key];
		if (step !== undefined) next = (month + step + 12) % 12;
		else if (event.key === 'Home') next = 0;
		else if (event.key === 'End') next = 11;
		if (next === null) return;
		event.preventDefault();
		oninteract();
		month = MONTH_INDICES[next] ?? month;
	}
</script>

<div
	bind:this={track}
	class="relative cursor-pointer touch-none outline-none select-none [&:focus-visible_.focus-line]:bg-gold"
	role="slider"
	tabindex="0"
	aria-label="Month of travel"
	aria-valuemin={1}
	aria-valuemax={12}
	aria-valuenow={month + 1}
	aria-valuetext={MONTHS[month]}
	{onkeydown}
	onpointerdown={(event) => {
		oninteract();
		dragging = true;
		event.currentTarget.setPointerCapture(event.pointerId);
		pick(event);
	}}
	onpointermove={(event) => {
		if (dragging) pick(event);
	}}
	onpointerup={() => (dragging = false)}
	onpointercancel={() => (dragging = false)}
>
	<div class="grid grid-cols-12" aria-hidden="true">
		{#each MONTH_INDICES as value (value)}
			{@const count = finestByMonth[value] ?? 0}
			<div class="flex flex-col items-center gap-2 pb-3">
				<div class="flex h-5 items-end gap-[2px]">
					{#each { length: count }, index (index)}
						<span class="h-full w-[3px] {value === month ? 'bg-gold' : 'bg-bone/35'}"></span>
					{/each}
				</div>
				<span
					class="font-mono text-[0.68rem] tracking-[0.12em] transition-colors duration-300
						{value === month ? 'text-bone' : 'text-bone/45'}"
				>
					<span class="sm:hidden">{shortMonth(value).charAt(0)}</span>
					<span class="hidden sm:inline">{shortMonth(value).toUpperCase()}</span>
				</span>
			</div>
		{/each}
	</div>
	<div class="focus-line relative h-px bg-bone/30 transition-colors">
		<div
			class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-500 ease-out-soft"
			style:left="{((month + 0.5) / 12) * 100}%"
			aria-hidden="true"
		>
			<span class="block size-3 rounded-full bg-gold shadow-[0_0_24px_4px_rgb(240_179_88/0.55)]"
			></span>
		</div>
	</div>
</div>
