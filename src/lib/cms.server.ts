import { env } from '$env/dynamic/private';
import type {
	CommitteePageQueryResponse,
	GetPages,
	Office,
	PageResponse,
	ReturnNavBar,
	ReturnNewsItem
} from './cms.types';
const headers = { Authorization: env.CMS_AUTH };

for (const key in env) {
	if (key.startsWith('CMS_') && env[key]?.includes('_')) {
		console.error(
			'The value of CMS environment variable ' +
				key +
				' (' +
				env[key] +
				')' +
				' contains an underscore. This is not allowed. Please use camelCase instead.'
		);
	}
}

function checkResponse(res: Response) {
	if (res.ok) {
		return res;
	}
	throw new Error('(' + res.status + ' ' + res.statusText + ') [ ' + res.url + ' ]');
}

function logFailedFetchFor(name: string) {
	return (reason: any): null => {
		console.error(name, 'failed to fetch from CMS:', reason);
		return null;
	};
}

export async function fetchByPath(
	path: string,
	fetch_?: typeof fetch
): Promise<PageResponse | null> {
	return (fetch_ || fetch)(
		env.CMS_PROTO + env.CMS_HOST + env.CMS_GETBYPATH + '/' + encodeURIComponent(path),
		{
			headers
		}
	)
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetchFor('fetchByPath'));
}

export async function fetchPages(fetch_?: typeof fetch): Promise<GetPages | null> {
	return (fetch_ || fetch)(env.CMS_PROTO + env.CMS_HOST + env.CMS_GETPAGES, { headers })
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetchFor('fetchPages'));
}

export async function queryNavBar(fetch_?: typeof fetch): Promise<ReturnNavBar | null> {
	return (fetch_ || fetch)(env.CMS_PROTO + env.CMS_HOST + env.CMS_NAVBAR, {
		headers
	})
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetchFor('queryNavBar'));
}

// TODO: make CMS endpoint to replace this
export async function fetchPagesInNavHeader(
	headerSlug: string,
	fetch_?: typeof fetch
): Promise<CommitteePageQueryResponse | null> {
	return (fetch_ || fetch)(
		env.CMS_PROTO +
			env.CMS_HOST +
			'/api/' +
			env.CMS_MAIN_COLLECTION +
			'?where[path][contains]=' +
			encodeURIComponent(headerSlug) +
			'&&where[approved][equals]=true&&sort=-createdAt&&limit=99',
		{
			headers
		}
	)
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetchFor('fetchPagesInNavHeader'));
}

export async function fetchCommitteeOffices(fetch_?: typeof fetch): Promise<Office[] | null> {
	return (fetch_ || fetch)(env.CMS_PROTO + env.CMS_HOST + env.CMS_GET_OFFICES, { headers })
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetchFor('fetchCommitteeOffices'));
}

export async function fetchAllNews(fetch_?: typeof fetch): Promise<ReturnNewsItem[] | null> {
	return (fetch_ || fetch)(env.CMS_PROTO + env.CMS_HOST + env.CMS_GET_ALL_NEWS, {
		headers
	})
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetchFor('fetchAllNews'));
}
