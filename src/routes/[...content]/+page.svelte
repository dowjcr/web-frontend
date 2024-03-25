<script lang="ts">
	import type { PageData } from '../[...content]/$types';
	export let data: PageData;
	import { TableOfContents, tocCrawler, Avatar } from '@skeletonlabs/skeleton';

	function extractH1AndRest(text: string) {
		const h1Match = text.match(/<h1>(.*?)<\/h1>/i);
		const h1Content = h1Match ? h1Match[1] : null;
		const restContent = text.replace(/<h1>.*?<\/h1>/i, '');
		return { h1Content, restContent };
	}
	let { h1Content: pageTitle, restContent: pageProse } = extractH1AndRest(data.content_html);
</script>

<div class="bg-slate-50 dark:bg-surface-900">
	{#if data.approved}
		<div class="flex gap-10">
			<article use:tocCrawler={{ mode: 'generate' }} class="grow max-w-2xl m-auto py-20">
				<div class="prose lg:prose-xl">
					<h1>{pageTitle}</h1>
				</div>
				<div class="w-full bg-slate-50 dark:variant-ghost-tertiary my-5 flex">
					<Avatar width="h-12 my-auto" rounded="rounded-full" initials="TM" />
					<div class="grow flex flex-col justify-center items-start p-4">
						<p class="text-sm">
							<span class="font-bold">Tomas Mils</span>
							· Internet Officer
						</p>
						<p class="text-sm">Published on <span class="font-bold">2024-01-01</span></p>
					</div>
				</div>
				<div
					id="top"
					class=" slashed-zero tabular-nums prose md:prose-lg lg:prose-xl text-left !text-pretty"
				>
					{@html pageProse}
				</div>
			</article>
			<!-- <div>
				<aside
					class="card shadow-xl bg-slate-50 dark:bg-surface-900 mx-6 h-min flex-none sticky top-5 hidden xl:block p-10 w-72"
				>
					<TableOfContents
						><a href="#top" class="font-heading-token text-md">On this Page</a></TableOfContents
					>
				</aside>
			</div> -->
		</div>
	{/if}
</div>
