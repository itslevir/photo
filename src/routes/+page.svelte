<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { images } from '$lib/current.json';

	export let data: PageData;
	let loading = true;
	let imageList: any[] = [];
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

		images.forEach((image) => {
			fetch(
				`${data.url.replace('levirphotography.blob.core.windows.net', 'images.cdn.itslevir.com')}${image.path}${supportsWebp ? '.webp' : '.png'}?${data.token}`
			)
				.then((response) => response.blob())
				.then((blob) => {
					const url = URL.createObjectURL(blob);
					const img = new Image();
					img.src = url;
					img.onload = () => {
						loading = false;
					};
					imageList = [...imageList, { ...image, src: url }];
				});
		});
	});
</script>

<div class="flex w-full flex-col items-center justify-center">
	<h1 class="prose text-white lg:prose-2xl">Levi R.</h1>
	<h2 class="prose prose-lg text-white">Photography</h2>
</div>

<main class="container">
	{#if loading}
		<h1>Loading...</h1>
	{/if}
	{#each imageList as image}
		<a
			href="/artifact/{image.path
				.replace('/unorganized/edited/unorg/compressed/', '')
				.replace('/00001', '')}"
		>
			<img src={image.src} alt={image.title} />
		</a>
	{/each}
</main>
