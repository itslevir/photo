<script>
	import '../app.css';
	import '@fontsource/plus-jakarta-sans/latin.css';

	let navOpen = false;
</script>

<div class="h-full w-full bg-black p-5 text-white">
	<header class="flex flex-row">
		<div on:click={() => (navOpen = !navOpen)} class="cursor-pointer">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-menu"
				><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line
					x1="3"
					y1="18"
					x2="21"
					y2="18"
				/></svg
			>
		</div>
		<div class="flex w-full flex-row justify-center">
			<span class="flex flex-col items-center"
				><h1 class="text-2xl">Levi R.</h1>
				<p>Photography</p></span
			>
		</div>
	</header>
	<slot></slot>
</div>

<div class="nav-{navOpen ? 'open' : 'hidden'}">
	<nav class="flex flex-col">
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/hire">For Hire</a>
		<a class="cursor-pointer" on:click={() => (navOpen = false)}>Close</a>
	</nav>
</div>

<style>
	div {
		font-family: 'Plus Jakarta Sans', sans-serif;
	}

	.nav-hidden {
		display: none;
	}

	.nav-open {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 80%;
		height: 100%;
		background-color: black;
		color: white;
		z-index: 101;
	}

	nav a {
		padding: 1rem;
	}
</style>
