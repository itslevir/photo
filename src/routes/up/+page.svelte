<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form method="POST">
	<input name="url" type="text" placeholder="url" />
	<input name="title" type="text" placeholder="title" />
	<button type="submit">Submit</button>
</form>
