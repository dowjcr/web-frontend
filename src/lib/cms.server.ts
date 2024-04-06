import { env } from '$env/dynamic/private';
import type {
	CommitteePage,
	CommitteePageQueryResponse,
	GetPages,
	PageResponse,
	ReturnNavHeader
} from './cms.types';
const headers = { Authorization: env.CMS_AUTH };
const cmsApiUrl = env.CMS_API_URL;

for (const key in env) {
	if (key.startsWith('CMS_') && env[key].includes('_')) {
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

function checkResponse(response: Response) {
	if (response.ok) {
		return response;
	}
	throw new Error(
		'(' +
			response.status +
			' ' +
			response.statusText +
			') [' +
			response.url +
			'] using headers: ' +
			JSON.stringify(Object.fromEntries(response.headers.entries()))
	);
}
function logFailedFetch(reason: any): null {
	console.error('Failed to fetch from CMS:', reason);
	return null;
}

/**
 * Fetches page content from a specified path.
 * This path should not begin with a slash.
 * @param {string} path - The path to fetch data from.
 * @returns {Promise<PageResponse | null>} The response from the fetch request.
 */
export async function fetchByPath(
	path: string,
	fetch_?: typeof fetch
): Promise<PageResponse | null> {
	return (fetch_ || fetch)(env.CMS_URL + env.CMS_GETBYPATH + '/' + encodeURIComponent(path), {
		headers
	})
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetch);
}

export async function fetchByPath2(
	path: string,
	fetch_?: typeof fetch,
	collection?: string
): Promise<CommitteePage | null> {
	return (fetch_ || fetch)(
		cmsApiUrl +
			(collection || env.CMS_MAIN_COLLECTION) +
			'?where[path][equals]=' +
			encodeURIComponent(path),
		{
			headers
		}
	)
		.then(checkResponse)
		.then((r) => r.json() as Promise<CommitteePageQueryResponse>)
		.then((r) => r.docs[0])
		.catch(logFailedFetch);
}

/**
 * Fetches pages in a specified collection, sorted in reverse creation order.
 * @param {string} collection - The collection to fetch pages from.
 * @returns {Promise<CommitteePageQueryResponse | null>} The response from the fetch request.
 */
export async function fetchPagesInCollection(
	collection?: string,
	fetch_?: typeof fetch
): Promise<CommitteePageQueryResponse | null> {
	return (fetch_ || fetch)(
		env.CMS_API_URL +
			(collection || env.CMS_MAIN_COLLECTION) +
			'?where[approved][equals]=true&&sort=-createdAt&&limit=99',
		{
			headers
		}
	)
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetch);
}

export async function fetchPages(fetch_?: typeof fetch): Promise<GetPages | null> {
	return (fetch_ || fetch)(env.CMS_URL + env.CMS_GETPAGES, { headers })
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetch);
}

export async function queryNavBar(fetch_?: typeof fetch): Promise<ReturnNavHeader[] | null> {
	return (fetch_ || fetch)(env.CMS_URL + env.CMS_NAVBAR, {
		headers
	})
		.then(checkResponse)
		.then((r) => r.json())
		.catch(logFailedFetch);
}

export async function fetchPagesInNavHeader(
	headerSlug: string,
	fetch_?: typeof fetch
): Promise<CommitteePageQueryResponse | null> {
	return (fetch_ || fetch)(
		env.CMS_API_URL +
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
		.catch(logFailedFetch);
}
