import { CMS_AUTH, CMS_GETBYPATH, CMS_HOST, CMS_MAIN_COLLECTION } from '$env/static/private';
const headers = { Authorization: CMS_AUTH };
const cmsApiUrl = 'https://' + CMS_HOST + '/api/';

export interface CommitteePage {
	id: string;
	approved: boolean;
	readyforapproval: boolean;
	lastEditedBy: {
		id: string;
		committee_information: object;
		email: string;
		createdAt: string;
		updatedAt: string;
	};
	title: string;
	path: string;
	content: object;
	category: string;
	createdAt: string;
	updatedAt: string;
	approveditems: {
		path: string;
		title: string;
		lastEditedBy: string;
		lastEditedByOfficeText: string;
		lastEditedAt: string;
		acontent: object;
		content_html: string;
	};
}

export interface CommitteePageQueryResponse {
	docs: CommitteePage[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage?: number | null;
	nextPage?: number | null;
}

export interface ReturnNavItem {
	label: string;
	path: string;
}

export interface ReturnNavHeader {
	header: string;
	navitems?: ReturnNavItem[];
}

export interface PageResponse {
	path: string;
	title: string;
	html: string;
	lastEditedBy: string;
	lastEditedAt: string;
}

export type GetPages = PageResponse[];

export type ReturnNavBar = ReturnNavHeader[];

/**
 * Fetches page content from a specified path.
 * This path should not begin with a slash.
 * @param {string} path - The path to fetch data from.
 * @returns {Promise<Response>} The response from the fetch request.
 */
export async function fetchByPath(path: string, fetch_?: typeof fetch): Promise<PageResponse> {
	return (fetch_ || fetch)('https://' + CMS_HOST + CMS_GETBYPATH + '/' + encodeURIComponent(path), {
		headers
	})
		.then((r) => r.json())
		.catch(() => null);
}

export async function fetchByPath2(
	path: string,
	fetch_?: typeof fetch,
	collection?: string
): Promise<CommitteePage | null> {
	return (fetch_ || fetch)(
		cmsApiUrl +
			(collection || CMS_MAIN_COLLECTION) +
			'?where[path][equals]=' +
			encodeURIComponent(path),
		{
			headers
		}
	)
		.then((r) => r.json() as Promise<CommitteePageQueryResponse>)
		.then((r) => r.docs[0]);
}

/**
 * Fetches pages in a specified collection, sorted in reverse creation order.
 * @param {string} collection - The collection to fetch pages from.
 * @returns {Promise<Response>} The response from the fetch request.
 */
export async function fetchPagesInCollection(
	collection?: string,
	fetch_?: typeof fetch
): Promise<CommitteePageQueryResponse> {
	return (fetch_ || fetch)(
		'https://' +
			CMS_HOST +
			'/api/' +
			(collection || CMS_MAIN_COLLECTION) +
			'?where[approved][equals]=true&&sort=-createdAt',
		{
			headers
		}
	).then((r) => r.json() as Promise<CommitteePageQueryResponse>);
}

export async function queryNavBar(fetch_?: typeof fetch): Promise<ReturnNavHeader[]> {
	return (fetch_ || fetch)('https://cmsnewweb.downingjcr.co.uk/api/globals/nav/navbar', {
		headers
	}).then((r) => r.json() as Promise<ReturnNavHeader[]>);
}
