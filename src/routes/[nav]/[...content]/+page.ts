import { browser } from '$app/environment';
import { preloadOfficerAvatar } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, data }) => {
	if (browser) {
		preloadOfficerAvatar(data.lastEditedByTitle);
	}
	return data;
};
