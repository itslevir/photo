<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const target = data.target as unknown;
	let supportsWebp = false;

	onMount(() => {
		var img = new Image();
		img.onload = function () {
			var result = img.width > 0 && img.height > 0;

			supportsWebp = result;
		};
		img.onerror = function () {
			supportsWebp = false;
		};
		img.src =
			'data:image/webp;base64,' + 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
	});
</script>

<main>
	<h1>{target.title}</h1>
	<img
		src={`https://images.cdn.itslevir.com/images${target.path}${supportsWebp ? '.webp' : '.png'}?${data.token}`}
		alt={target.title}
	/>
	<section class="flex flex-row">
		<div class="cursor-pointer rounded-xl bg-blue-500 p-4 transition-colors hover:bg-blue-600">
			Download uncompressed
		</div>
		<div class="cursor-pointer rounded-xl bg-blue-500 p-4 transition-colors hover:bg-blue-600">
			Download compressed
		</div>
	</section>
	<section>
		<h2>about this image</h2>
		<div class="flex flex-row">
			<div class="location flex-column flex">
				<h3>location</h3>
				<iframe
					width="500"
					height="300"
					src="https://api.maptiler.com/maps/outdoor-v2/?key=cHhE4n0gLrglUNPZt75s#15.0/{target.geo.latitude}/{target.geo.longitude}"
				></iframe>
			</div>
		</div>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	img {
		max-width: 100%;
		height: 80vh;
	}
	h1 {
		font-size: 2rem;
		color: white;
	}
</style>
