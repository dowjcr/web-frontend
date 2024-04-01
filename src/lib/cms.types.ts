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
