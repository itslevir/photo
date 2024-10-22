import type { PageLoad } from './$types';
import { images } from '$lib/current.json';

export const load = (async ({ params }) => {
	const image = images.find((image) => image.title === params.name);

	return { target: image };
}) satisfies PageLoad;
