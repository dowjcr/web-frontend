export interface PageResponse {
	path: string;
	fullPath: string;
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
