import type { LayoutServerLoad } from './$types';
import { queryNavBar, fetchCommitteeOffices } from '$lib/cms.server';
import { fetchSearchIndex } from '$lib/components/Search/search.server';
export const load: LayoutServerLoad = async ({ url, fetch }) => {
	return {
		topLevelNavItems: queryNavBar(fetch),
		searchIndex: fetchSearchIndex().then((x) => JSON.stringify(x)),
		committeeOffices: fetchCommitteeOffices(fetch)
	};
};
