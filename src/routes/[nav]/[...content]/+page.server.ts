import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchByPath } from '$lib/cms.server';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const committeePage = await fetchByPath(url.pathname.slice(1), fetch);
	if (committeePage) {
		return committeePage;
	}
	error(404, 'Page not found: ' + url.pathname);
};
