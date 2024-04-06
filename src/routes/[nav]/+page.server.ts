import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchByPath, fetchPagesInNavHeader } from '$lib/cms.server';
import { navStore } from '$lib';
import { get } from 'svelte/store';

function getNavHeaderName(navHeaderUrl: string): string | null {
	for (const navHeader of get(navStore)) {
		if (navHeader.navitems) {
			for (const navItem of navHeader.navitems) {
				if (navItem.path.startsWith(navHeaderUrl)) {
					return navHeader.header;
				}
			}
		}
	}
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
