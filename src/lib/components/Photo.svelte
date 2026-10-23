<script lang="ts">
	import { photoSrcset, photoUrl, photoWidths, type Photo } from '#lib/image.ts';

	let {
		photo,
		sizes,
		eager = false,
		class: className = ''
	}: { photo: Photo; sizes: string; eager?: boolean; class?: string } = $props();

	// The largest width below 1280 is a safe fallback for browsers that ignore srcset.
	const fallback = $derived(
		photoWidths(photo)
			.filter((width) => width <= 1280)
			.at(-1) ?? 500
	);
</script>

<img
	src={photoUrl(photo, fallback)}
	srcset={photoSrcset(photo)}
	{sizes}
	alt={photo.alt}
	loading={eager ? 'eager' : 'lazy'}
	fetchpriority={eager ? 'high' : 'auto'}
	decoding="async"
	class="h-full w-full object-cover {className}"
	style:object-position={photo.focus}
/>
