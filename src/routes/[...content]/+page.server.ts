import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchByPath2, queryNavBar } from '$lib/cms';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const committeePage = await fetchByPath2(url.pathname.substring(1), fetch);
	if (committeePage) {
		return committeePage;
	}
	error(404, 'Page not found');
};
