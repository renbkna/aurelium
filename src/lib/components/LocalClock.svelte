<script lang="ts">
	import { onMount } from 'svelte';

	let { timeZone }: { timeZone: string } = $props();

	const clock = $derived(
		new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23',
			timeZone
		})
	);

	// The prerendered page has no "now"; the clock appears once the page runs.
	let now = $state<Date | null>(null);
	onMount(() => {
		now = new Date();
		const timer = setInterval(() => {
			now = new Date();
		}, 15_000);
		return () => {
			clearInterval(timer);
		};
	});
</script>

{#if now}
	<time datetime={now.toISOString()}>{clock.format(now)} there now</time>
{/if}
