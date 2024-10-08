<script lang="ts">
	import { extractH1AndContent } from '$lib';
	import type { PageData } from './$types';
	export let data: PageData;
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
	import AuthorCard from '$lib/components/AuthorCard.svelte';

	$: ({ h1Content, restContent } = extractH1AndContent(data.html));
	$: pageTitle = h1Content || data.title;
	$: breadcrumbs = data.fullPath.split('/').filter((crumb) => crumb);
</script>

<svelte:head>
	<title>{pageTitle} | Downing JCR</title>
</svelte:head>

<div class="bg-slate-50 dark:bg-surface-900 h-full">
	<div class="lg:grid lg:grid-cols-3 xl:grid-cols-4">
		<article
			id="top"
			class="lg:subgrid lg:col-span-2 xl:col-span-3 max-w-3xl p-5 md:py-10 w-full m-auto space-y-2 md:space-y-5"
		>
			<ol class="breadcrumb">
				<li class="crumb-separator" aria-hidden>/</li>
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
			<div class="prose lg:prose-xl">
				<h1>{pageTitle}</h1>
			</div>
			<div class="w-full bg-transparent pt-2 pb-8">
				<AuthorCard
					officeTitle={data.lastEditedByTitle}
					authorNames={data.lastEditedByNames}
					timestamp={data.lastEditedAt}
				/>
			</div>
			<div
				use:tocCrawler={{ mode: 'generate', key: data.html, scrollTarget: '#page' }}
				class="!slashed-zero tabular-nums prose md:prose-base lg:prose-lg text-left !text-pretty prose-headings:my-7 md:prose-headings:my-9 prose-img:max-w-[40%] prose-img:h-auto"
			>
				{@html restContent}
			</div>
		</article>
		<div>
			<aside
				class="bg-transparent xl:mr-auto h-min flex-none sticky top-0 hidden lg:block xl:px-5 py-10 w-80"
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
