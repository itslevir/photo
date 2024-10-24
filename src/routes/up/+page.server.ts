import { azure_key } from '$env/static/private';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const url = data.get('url');
		const title = data.get('title');

		fetch('https://api-us-west-2.coconut.co/v2/jobs', {
			headers: {
				Authorization: `Basic ${btoa('k-06ac0358db26ecfe7369e85f98268654:')}`
			},
			method: 'POST',
			body: JSON.stringify({
				input: {
					url: url
				},
				storage: {
					service: 'azure',
					container: 'images',
					credentials: {
						account: 'levirphotography',
						access_key: azure_key
					},
					path: '/unorganized/edited/unorg/compressed/'
				},
				outputs: {
					'png:1300x866': {
						path: `${title}/%05d.png`
					},
					'webp:1300x866': {
						path: `${title}/%05d.webp`
					}
				},
				notification: {
					type: 'http',
					url: 'https://photo.itslevir.com/up/api'
				}
			})
		})
			.then((res: { json: () => unknown }) => res.json())
			.then((data: unknown) => {
				console.log(data);
			});
	}
} satisfies Actions;

export const load = (async ({ fetch }) => {
	return {};
}) satisfies PageServerLoad;
