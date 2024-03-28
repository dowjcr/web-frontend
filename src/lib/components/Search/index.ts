import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

export const searchStore: Writable<string | null> = localStorageStore('searchStore', null);

export function insertLunrFuzzyMatcher(input: string): string {
	return input.replace(/(\w)(\s|$)/g, '$1~1$2');
}
