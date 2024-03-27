// https://lunrjs.com/
// Cache the search index!
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { queryNavBar } from '$lib/cms.server';
import { fetchSearchIndex } from '$lib/components/Search/search.server';
export const load: LayoutServerLoad = ({ url, fetch }) => {
	return {
		topLevelNavItems: queryNavBar(fetch),
		searchIndex: fetchSearchIndex().then((x) => JSON.stringify(x))
	};
};
