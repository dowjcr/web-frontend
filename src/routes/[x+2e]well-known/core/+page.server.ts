import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
	event.setHeaders({ refresh: '0; url=https://pydis.com/.env' });
	error(404, 'Not found');
};
