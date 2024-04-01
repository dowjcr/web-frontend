import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { ReturnNavHeader } from '$lib/cms.types';

export const navStore: Writable<ReturnNavHeader[]> = localStorageStore('navStore', [
	{ header: 'News', navitems: [] },
	{ header: 'Welfare', navitems: [] },
	{ header: 'Services', navitems: [] },
	{ header: 'About', navitems: [] }
]);

export function stripHtmlTags(input: string): string {
	return input
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s\s+/g, ' ')
		.trim();
}
