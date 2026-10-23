<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<header class="absolute inset-x-0 top-0 z-20 text-shadow-photo">
	<div class="mx-auto flex max-w-[96rem] items-center justify-between gap-6 px-5 py-6 sm:px-10">
		<a href={resolve('/')} class="title text-[1.9rem] leading-none" aria-label="Aurelium, home">
			Aurelium
		</a>
		<nav aria-label="Main">
			<ul class="flex items-center gap-7 text-sm">
				<li><a href="{resolve('/')}#six-title" class="hover:text-gold">Journeys</a></li>
				<li><a href={resolve('/credits')} class="hover:text-gold">Credits</a></li>
			</ul>
		</nav>
	</div>
</header>
