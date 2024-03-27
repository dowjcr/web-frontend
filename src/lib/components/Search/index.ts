import type { Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';
import lunr from 'lunr';

export const searchStore: Writable<string | null> = localStorageStore('searchStore', null);
