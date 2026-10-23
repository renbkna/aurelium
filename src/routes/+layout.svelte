<script lang="ts">
	import type { Snippet } from 'svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import '../app.css';

	let { children }: { children: Snippet } = $props();
</script>

<a
	href="#main"
	class="sr-only z-50 bg-gold px-4 py-2 text-night focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
>
	Skip to content
</a>

<main id="main">
	{@render children()}
</main>

<SiteFooter />
