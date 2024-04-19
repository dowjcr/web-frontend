import type { PageLoad } from './$types';
import { newsStore } from '$lib';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	let newsIndex = parseInt(params.slug);
	newsStore.subscribe((news) => {
		if (newsIndex > news.length || newsIndex < 0) {
			error(404, 'Not found');
		}
	});
	return { newsIndex };
};
