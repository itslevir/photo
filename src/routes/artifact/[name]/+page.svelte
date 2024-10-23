<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const target = data.target as unknown;
	let element: HTMLImageElement;
	let supportsWebp = false;
	let loading = true;

	onMount(() => {
		let webpTest = new Image();
		webpTest.onload = function () {
			let result = webpTest.width > 0 && webpTest.height > 0;

			supportsWebp = result;
		};
		webpTest.onerror = function () {
			supportsWebp = false;
		};
		webpTest.src =
			'data:image/webp;base64,' + 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';

		fetch(
			`https://images.cdn.itslevir.com/images${target.path}${supportsWebp ? '.webp' : '.png'}?${data.token}`
		)
			.then((response) => response.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				target.src = url;
				loading = false;
			});
	});

	const download = (uncompressed: boolean) => {
		if (uncompressed === false) {
			const link = document.createElement('a');
			link.href = element.src;
			link.download = `${target.title}${uncompressed ? '' : '-compressed'}.png`;
			link.click();
		} else {
			const link = document.createElement('a');
			link.href = `https://images.cdn.itslevir.com/images${target.path}.png?${data.token}`;
			link.download = `${target.title}${uncompressed ? '' : '-compressed'}.png`;
			link.click();
		}
	};
</script>

<svelte:head>
	<title>an image by levi r.</title>
	<meta name="description" content="an image, shot and edited by levi r.">
</svelte:head>

<header>
	<a href="/">go back</a>
</header>
<main>
	<h1>{target.title}</h1>
	<img src={target.src} alt={target.title} bind:this={element} />
	<section class="m-4 flex w-6/12 flex-row justify-between">
		<div
			class="cursor-pointer rounded-xl bg-blue-500 p-4 transition-colors hover:bg-blue-600"
			on:click={() => download(false)}
		>
			Download uncompressed
		</div>
		<div
			class="cursor-pointer rounded-xl bg-blue-500 p-4 transition-colors hover:bg-blue-600"
			on:click={() => download(true)}
		>
			Download compressed
		</div>
	</section>
	<section class="w-full">
		<h2 class="text-center text-lg">about this image</h2>
		<div class="flex flex-row justify-between">
			<div class="location flex w-6/12 flex-col items-center">
				<h3>location</h3>
				<iframe
					width="500"
					height="300"
					src="https://api.maptiler.com/maps/outdoor-v2/?key=cHhE4n0gLrglUNPZt75s#15.0/{target.geo
						.latitude}/{target.geo.longitude}"
				></iframe>
			</div>
			<div class="details flex flex-col items-center">
				<h3>description</h3>
				<p>edited: {target.raw ? 'no' : 'yes'}</p>
				<p>taken: canon eos rebel t6i</p>
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
