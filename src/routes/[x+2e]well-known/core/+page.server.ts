import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	event.setHeaders({ refresh: '0; url=https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
	error(404, 'Not found');
};
