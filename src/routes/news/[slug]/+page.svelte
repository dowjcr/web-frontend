<script lang="ts">
	import { newsStore, extractH1AndContent } from '$lib';
	import AuthorCard from '$lib/components/AuthorCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	$: content = $newsStore[$newsStore.length - data.newsIndex];
	$: ({ h1Content, restContent } = extractH1AndContent(content.html));
	$: pageTitle = h1Content || content.title;
	$: breadcrumbs = ['News', `${data.newsIndex}`];
</script>

<svelte:head>
	<title>{pageTitle} | Downing JCR</title>
</svelte:head>

<div class="bg-slate-50 dark:bg-surface-900">
	<div class="lg:grid lg:grid-cols-4">
		<article
			id="top"
			class="lg:subgrid lg:col-span-3 max-w-3xl p-5 md:py-10 w-full m-auto space-y-2 md:space-y-5"
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
					officeTitle={content.lastEditedByTitle}
					authorNames={content.lastEditedByNames}
					timestamp={content.publishedAt}
					timeText="Published at"
				/>
			</div>
			<div class="!slashed-zero tabular-nums prose md:prose-lg lg:prose-xl text-left !text-pretty">
				{@html restContent}
			</div>
		</article>
		<div class="hidden">
			<aside
				class="bg-transparent mr-auto h-min flex-none fixed top-20 hidden lg:block xl:px-5 py-20 w-80"
			></aside>
		</div>
	</div>
</div>
