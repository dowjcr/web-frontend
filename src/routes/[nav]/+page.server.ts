import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchByPath, fetchPagesInNavHeader } from '$lib/cms.server';
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
	const committeePage = await fetchByPath(url.pathname, fetch);
	const pages = fetchPagesInNavHeader(url.pathname, fetch);
	return { navHeaderName, committeePage, pages, relPath: url.pathname };
};
