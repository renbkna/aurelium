<script lang="ts">
	import type { Photo } from '#lib/image.ts';

	let { photo, class: className = '' }: { photo: Photo; class?: string } = $props();
</script>

<a
	href={photo.credit.source}
	class="font-mono text-[0.62rem] tracking-wide text-bone/55 transition-colors hover:text-bone {className}"
	rel="external"
>
	Photo · {photo.credit.author} · {photo.credit.license}
</a>
