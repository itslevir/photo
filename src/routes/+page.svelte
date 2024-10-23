<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { images, tags } from '$lib/current.json';

	export let data: PageData;
	let loading = true;
	let imageList: any[] = [];
	let supportsWebp = false;
	let menuOpen = false;

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

{#if loading}
	<div class="flex h-full w-full items-center justify-center">
		<div class="loader-animation h-32 w-32 animate-spin rounded-full border-b-4 border-white"></div>
	</div>
{:else}
	<div class="flex w-full flex-row justify-between">
		<h3>Filter</h3>
		<button
			class="m-2 rounded-full bg-white px-4 py-2 text-black"
			on:click={() => {
				menuOpen = !menuOpen;
			}}
		>
			Filters
		</button>
	</div>

	<div class="filters-{menuOpen ? 'open' : 'hidden'}">
		{#each tags as tag}
			<button
				class="m-2 rounded-full bg-white px-4 py-2 text-black"
				on:click={() => {
					imageList = imageList.filter((image) => image.tags.includes(tag));
				}}
			>
				{tag}
			</button>
		{/each}
	</div>
{/if}
<main class="container{loading ? '-unloaded' : '-loaded'}">
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

<style>
	main {
		width: 100%;
		height: 90%;
	}
	main.container-loaded {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}

	.filters-hidden {
		display: none;
	}

	.loader-animation {
		animation: spin 1s ease-out infinite;
	}
</style>
