import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response('Hello, world!', { status: 200 });
};
