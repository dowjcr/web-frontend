import { get, type Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import type { ReturnNavHeader, ReturnNewsItem, Office } from '$lib/cms.types';
import { browser } from '$app/environment';
import { DateTime } from 'luxon';

export let isMacOs = browser && navigator.userAgent.search('Mac') !== -1;

export const newsStore: Writable<ReturnNewsItem[]> = localStorageStore('newsStore', []);
export const navStore: Writable<ReturnNavHeader[]> = localStorageStore('navStore', [
	{ header: 'Welfare' },
	{ header: 'Services' },
	{ header: 'About' }
]);

export const officeStore: Writable<Office[]> = localStorageStore('officeStore', [
	{ title: 'President', email: 'president@jcr.dow.cam.ac.uk' },
	{ title: 'Internet Officer', email: 'internet@jcr.dow.cam.ac.uk' }
]);

export const preloadOfficerAvatar = (officeTitle: string): void => {
	console.assert(browser, 'preloadOfficerAvatar should only be called in the browser');
	get(officeStore)
		.find((office) => office.title === officeTitle)
		?.officers?.forEach((person) => {
			if (person.img) {
				new Image().src = person.img;
			}
		});
};

export function preloadAllOfficerAvatars() {
	const offices = sortOfficesByTitle(get(officeStore))
	officeStore.set(offices);
	for (const office of get(officeStore)) {
		preloadOfficerAvatar(office.title);
	}
}

export function sortOfficesByTitle(objects: Office[]): Office[] {
	const titleOrder = [
		'President',
		'Vice-President',
		'Treasurer',
		'Internet Officer',
		'Welfare Officers'
	];
	// Create a map to store the index of each title in the order array
	const titleIndexMap: { [title: string]: number } = {};
	titleOrder.forEach((title, index) => {
		titleIndexMap[title] = index;
	});

	// Sort objects based on their title's index in the titleOrder array or substring match
	objects.sort((a, b) => {
		const indexA = titleIndexMap[a.title];
		const indexB = titleIndexMap[b.title];

		// If both titles are in the order array, sort based on their indices
		if (indexA !== undefined && indexB !== undefined) {
			return indexA - indexB;
		}
		// If only one title is in the order array, it comes before the other
		else if (indexA !== undefined) {
			return -1;
		} else if (indexB !== undefined) {
			return 1;
		}
		// If neither title is in the order array, check if any title in titleOrder is a substring of the titles
		else {
			// Check if any title in titleOrder is a substring of title A
			const isSubstringA = titleOrder.some((title) => a.title.includes(title));
			// Check if any title in titleOrder is a substring of title B
			const isSubstringB = titleOrder.some((title) => b.title.includes(title));

			// If both titles have substrings in titleOrder, maintain the original order
			if (isSubstringA && isSubstringB) {
				return 0;
			} else if (isSubstringA) {
				return -1;
			} else if (isSubstringB) {
				return 1;
			} else {
				return 0; // Maintain the original order
			}
		}
	});

	return objects;
}

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

export function pathFromText(name: string, prefix = ''): string {
	return prefix + name.toLowerCase().replaceAll(' ', '-');
}

export function initialsFromName(name: string): string {
	return name
		.split(' ')
		.map((word) => word[0])
		.join('')
		.toUpperCase();
}

/**
 * Extracts and truncates the content of the first paragraph from an HTML string.
 * @param {string} html - The HTML string to extract the first paragraph from.
 * @returns {string | null} The truncated content of the first paragraph or null if no paragraph is found.
 */
export function makeSubtitle(html: string): string | null {
	const firstParagraph = /<p[^>]*>(?<firstP>.*?)<\/p>/gi.exec(html)?.groups?.firstP?.trim();
	if (!firstParagraph) {
		return null;
	}
	return firstParagraph.length > 100
		? stripHtmlTags(firstParagraph).slice(0, 100).trim() + '...'
		: firstParagraph;
}

function numberToOrdinal(i: number) {
	const j = i % 10,
		k = i % 100;
	if (j === 1 && k !== 11) {
		return i + 'st';
	}
	if (j === 2 && k !== 12) {
		return i + 'nd';
	}
	if (j === 3 && k !== 13) {
		return i + 'rd';
	}
	return i + 'th';
}

export function formatAuthorTimestamp(timestamp: string): string {
	const timestampDateTime = DateTime.fromISO(timestamp, { zone: 'Europe/London' });
	const authorTimestampFormat = "EEE '" + numberToOrdinal(timestampDateTime.day) + "' MMMM yyyy";
	return timestampDateTime.toFormat(authorTimestampFormat);
}
