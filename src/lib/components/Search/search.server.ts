import lunr from 'lunr';
import { stripHtmlTags } from '$lib';
import { fetchPagesInCollection } from '$lib/cms.server';

function buildSearchDocuments() {
	return fetchPagesInCollection('committee_pages').then((response) => {
		return response.docs.map((doc) => {
			return {
				title: doc.title,
				path: doc.path + '<SEP>' + doc.title,
				text: stripHtmlTags(doc.approveditems.content_html)
			};
		});
	});
}

export async function fetchSearchIndex(): Promise<lunr.Index> {
	let builder = new lunr.Builder();
	builder.ref('path');
	builder.field('title');
	builder.field('text');
	return buildSearchDocuments()
		.then((documents) => {
			documents.forEach((doc) => {
				builder.add(doc);
			});
		})
		.then(() => builder.build());
}
