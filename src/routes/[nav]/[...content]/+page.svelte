<script lang="ts">
	import { extractH1AndContent } from '$lib';
	import type { PageData } from './$types';
	export let data: PageData;
	import { TableOfContents, tocCrawler, Avatar } from '@skeletonlabs/skeleton';

	$: ({ h1Content, restContent } = extractH1AndContent(data.html));
	$: pageTitle = h1Content || data.title;
	$: breadcrumbs = data.path.split('/').filter((crumb) => crumb);
</script>

<div class="bg-slate-50 dark:bg-surface-900">
	<div class="lg:grid lg:grid-cols-4">
		<article
			use:tocCrawler={{ mode: 'generate', key: data.html }}
			class="lg:subgrid lg:col-span-3 max-w-3xl p-5 md:py-10 w-full m-auto space-y-2 md:space-y-5"
		>
			<ol class="breadcrumb">
				{#each breadcrumbs as crumb, index (crumb)}
					<li class="crumb">
						<a
							class="text-sm md:text-lg anchor no-underline crumb-separator hover:text-primary-500 hover:opacity-100 hover:underline dark:hover:text-primary-300 dark:text-surface-100"
							href={`/${breadcrumbs.slice(0, index + 1).join('/')}`}>{crumb}</a
						>
					</li>
					{#if index < breadcrumbs.length - 1}
						<li class="crumb-separator" aria-hidden>/</li>
					{/if}
				{/each}
			</ol>
			<div id="top" class="prose lg:prose-xl">
				<h1>{pageTitle}</h1>
			</div>
			<div class="w-full bg-transparent flex">
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
				{@html restContent}
			</div>
		</article>
		<div>
			<aside
				class="bg-transparent mr-auto h-min flex-none fixed top-20 hidden lg:block xl:px-5 py-20 w-80"
			>
				<TableOfContents
					inactive="font-heading-token !font-normal opacity-60 hover:opacity-100 hover:text-primary-500 dark:hover:text-primary-400"
					active="text-primary-500 dark:text-primary-400 font-heading-token"
					><a href="#top" class="font-heading-token text-lg">On this Page</a></TableOfContents
				>
			</aside>
		</div>
	</div>
</div>
