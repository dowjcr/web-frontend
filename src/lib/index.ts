import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { ReturnNavHeader } from '$lib/cms.types';
import { browser } from '$app/environment';

export let isMacOs = browser && navigator.userAgent.search('Mac') !== -1;

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

export function extractH1AndContent(text: string) {
	const h1Match = text.match(/<h1>(.*?)<\/h1>/i);
	const h1Content = h1Match ? h1Match[1] : null;
	const restContent = text.replace(/<h1>.*?<\/h1>/i, '');
	return { h1Content, restContent };
}

export function headerPathFromName(name: string): string {
	return '/' + name.toLowerCase().replaceAll(' ', '-');
}
