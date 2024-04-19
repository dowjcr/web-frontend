import { preloadOfficerAvatar } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, data }) => {
	if (typeof document !== 'undefined') {
		preloadOfficerAvatar(data.lastEditedByTitle);
	}
	return data;
};
