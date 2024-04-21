import lunr from 'lunr';
import { stripHtmlTags } from '$lib';
import { fetchPages } from '$lib/cms.server';

async function buildSearchDocuments() {
	const response = await fetchPages();
	return response?.map((doc) => {
		return {
			title: doc.title,
			path: doc.fullPath + '<SEP>' + doc.title,
			text: stripHtmlTags(doc.html)
		};
	});
}

export async function fetchSearchIndex(): Promise<lunr.Index> {
	let builder = new lunr.Builder();
	builder.ref('path');
	builder.field('title');
	builder.field('text');
	return buildSearchDocuments()
		.then((documents) => {
			documents?.forEach((doc) => {
				builder.add(doc);
			});
		})
		.then(() => builder.build());
}
