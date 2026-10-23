<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
</script>

<svelte:head>
	<title>{page.status} · Aurelium</title>
</svelte:head>

<SiteHeader />

<section
	class="mx-auto flex min-h-[70svh] max-w-[88rem] flex-col justify-center px-5 pt-28 sm:px-10"
>
	<p class="eyebrow">{page.status}</p>
	<h1 class="font-display-tight mt-5 text-6xl">
		{page.status === 404 ? 'This path leads nowhere.' : 'Something went wrong.'}
	</h1>
	<a href={resolve('/')} class="mt-10 font-bold underline underline-offset-4"
		>Back to the journeys</a
	>
</section>
