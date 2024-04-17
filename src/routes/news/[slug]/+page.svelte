<script lang="ts">
	import { newsStore } from '$lib';
	import type { PageData } from './$types';
	export let data: PageData;
	$: content = $newsStore[$newsStore.length - parseInt(data.slug)];

	import { extractH1AndContent, initialsFromName } from '$lib';
	import { Avatar } from '@skeletonlabs/skeleton';
	import OfficePopup from '$lib/components/Popup/officePopup.svelte';

	$: ({ h1Content, restContent } = extractH1AndContent(content.html));
	$: pageTitle = h1Content || content.title;
	$: breadcrumbs = ['News', data.slug];
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
			<div class="w-full bg-transparent flex">
				<div class="flex items-center">
					<OfficePopup committeeTitle={content.lastEditedByTitle}>
						<Avatar
							width="h-12 my-auto"
							rounded="rounded-full"
							initials={initialsFromName(content.lastEditedByNames || '')}
						/>
					</OfficePopup>
				</div>
				<div class="grow flex flex-col justify-center items-start p-4">
					<OfficePopup committeeTitle={content.lastEditedByTitle} anchorClass="hover:underline">
						<p class="text-sm">
							<span class="font-bold">{content.lastEditedByNames}</span>
							· {content.lastEditedByTitle}
						</p>
					</OfficePopup>
					<p class="text-sm">Published at <span class="font-bold">{content.publishedAt}</span></p>
				</div>
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
