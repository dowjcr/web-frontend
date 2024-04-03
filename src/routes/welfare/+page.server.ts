import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchPagesInCollection } from '$lib/cms.server';

export const load: PageServerLoad = async ({ url, fetch }) => {
	return {
		cmsContent: ''
	};
};
