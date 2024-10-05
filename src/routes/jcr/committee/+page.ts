import { browser } from '$app/environment';
import { preloadAllOfficerAvatars } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, data }) => {
	if (browser) {
		preloadAllOfficerAvatars();
	}
	return data;
};
