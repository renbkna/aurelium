<script lang="ts">
	import { photoSrcset, photoUrl, type Photo } from '#lib/image.ts';

	let {
		photo,
		sizes,
		eager = false,
		class: className = ''
	}: { photo: Photo; sizes: string; eager?: boolean; class?: string } = $props();
</script>

<img
	src={photoUrl(photo, 1200)}
	srcset={photoSrcset(photo)}
	{sizes}
	alt={photo.alt}
	loading={eager ? 'eager' : 'lazy'}
	fetchpriority={eager ? 'high' : 'auto'}
	decoding="async"
	class="h-full w-full object-cover {className}"
	style:object-position={photo.focus ?? '50% 50%'}
/>
