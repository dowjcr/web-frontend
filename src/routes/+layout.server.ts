// https://lunrjs.com/
// Cache the search index!
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { fetchByPath2, queryNavBar } from '$lib/cms';

export const load: LayoutServerLoad = ({ url, fetch }) => {
	return { topLevelNavItems: queryNavBar(fetch) };
};
