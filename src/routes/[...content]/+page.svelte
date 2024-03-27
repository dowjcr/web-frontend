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
	$: ({ h1Content: pageTitle, restContent: pageProse } = extractH1AndRest(data.html));
</script>

<div class="bg-slate-50 dark:bg-surface-900">
	<!-- {#if data.approved} -->
	<div class="lg:grid lg:grid-cols-4">
		<div></div>
		<article
			use:tocCrawler={{ mode: 'generate', key: data.html }}
			class="lg:subgrid lg:col-span-2 max-w-2xl py-20 px-5 lg:px-0"
		>
			<div class="prose lg:prose-xl">
				<h1>{pageTitle}</h1>
			</div>
			<div class="w-full bg-transparent my-5 flex">
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
				class="!slashed-zero tabular-nums prose md:prose-lg lg:prose-xl text-left !text-pretty"
			>
				{@html pageProse}
			</div>
		</article>
		<div>
			<aside
				class=" bg-slate-50 dark:bg-surface-900 mr-auto h-min flex-none fixed top-20 hidden lg:block xl:px-5 py-20 w-80"
			>
				<TableOfContents
					inactive="font-heading-token !font-normal opacity-60 hover:opacity-100 hover:text-primary-500 dark:hover:text-primary-400"
					active="text-primary-500 dark:text-primary-400 font-heading-token"
					><a href="#top" class="font-heading-token text-lg">On this Page</a></TableOfContents
				>
			</aside>
		</div>
	</div>
	<!-- {/if} -->
</div>
