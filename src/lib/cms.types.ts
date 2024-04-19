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
		committeePageApprover: boolean;
	};
	title: string;
	path: string;
	content: object;
	category: {
		id: string;
		category: string;
		createdAt: string;
		updatedAt: string;
	};
	createdAt: string;
	updatedAt: string;
	approvedItems: {
		path: string;
		title: string;
		lastEditedBy: string;
		lastEditedByTitleText: string;
		lastEditedByNames?: string;
		lastEditedAt: string;
		acontent: object;
		contentHTML: string;
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
export interface PageResponse {
	path: string;
	title: string;
	html: string;
	lastEditedBy: string;
	lastEditedAt: string;
	lastEditedByTitle: string;
	lastEditedByNames?: string;
}

export type GetPages = PageResponse[];

export interface ReturnNavHeader {
	header: string;
	navItems?: ReturnNavItem[];
}
export interface ReturnNavItem {
	path: string;
	label: string;
}

export type ReturnNavBar = ReturnNavHeader[];

export interface Office {
	title: string;
	email: string;
	description?: string;
	manifesto?: string;
	officers?: Officer[];
}

export interface Officer {
	name: string;
	crsid: string;
	img?: string;
}

export interface ReturnNewsItem {
	title: string;
	publishedAt: string;
	lastEditedBy: string;
	lastEditedByTitle: string;
	lastEditedByNames?: string;
	html: string;
}

export interface ReturnSiteText {
	title: string;
	subtitle: string;
	committeeYear: string;
}
