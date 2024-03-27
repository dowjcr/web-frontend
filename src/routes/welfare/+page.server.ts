import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchPagesInCollection } from '$lib/cms.server';
import { CMS_MAIN_COLLECTION } from '$env/static/private';

export const load: PageServerLoad = async ({ url, fetch }) => {
	return {
		cmsContent: ''
	};
};
