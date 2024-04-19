import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchByCategory, fetchByPath } from '$lib/cms.server';
import { navStore } from '$lib';
import { get } from 'svelte/store';

function getNavHeaderName(navHeaderUrl: string): string | null {
	for (const navHeader of get(navStore)) {
		if (navHeader.navItems) {
			for (const navItem of navHeader.navItems) {
				if (navItem.path.startsWith(navHeaderUrl)) {
					return navHeader.header;
				}
			}
		}
	}
	console.log('Nav header not found for: ', navHeaderUrl);
	return null;
}

export const load: PageServerLoad = async ({ params, url, fetch }) => {
	const navHeaderName = getNavHeaderName(url.pathname);
	if (!navHeaderName) {
		error(404, 'Not found');
	}
	return {
		navHeaderName,
		committeePage: await fetchByPath(url.pathname.slice(1), fetch),
		pages: fetchByCategory(navHeaderName, fetch),
		relPath: url.pathname
	};
};
