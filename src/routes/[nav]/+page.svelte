<script lang="ts">
	import { extractH1AndContent, makeSubtitle, navStore } from '$lib';
	import type { PageData } from './$types';
	import AvatarIcon from '$lib/components/AvatarIcon.svelte';
	import AuthorCard from '$lib/components/AuthorCard.svelte';
	export let data: PageData;

	$: ({ h1Content, restContent } = extractH1AndContent(data.committeePage?.html || ''));
	$: pageTitle = h1Content || data.committeePage?.title || data.navHeaderName;
</script>

<svelte:head>
	<title>{pageTitle} | Downing JCR</title>
</svelte:head>
<div class="h-full grid grid-rows-[min-content_auto]">
	<div class="bg-primary-50 dark:bg-surface-700 w-full lg:grid grid-cols-3 p-10 lg:p-14 gap-28">
		<div
			class="col-span-2 mr-auto flex flex-col items-center md:items-start text-center md:text-left space-y-3"
		>
			<h1
				class="h1 !text-5xl md:!text-6xl max-w-[600px] !text-surface-900 dark:!text-primary-300 dark:font-bold"
			>
				{pageTitle}
			</h1>
			{#if data.committeePage}
				<div class="w-full bg-transparent pt-2 pb-8">
					<AuthorCard
						officeTitle={data.committeePage.lastEditedByTitle}
						authorNames={data.committeePage.lastEditedByNames}
						timestamp={data.committeePage.lastEditedAt}
					/>
				</div>
			{/if}
			<div class="text-left prose md:prose-lg lg:prose-xl !text-pretty">
				{@html restContent}
			</div>
		</div>
		{#if data.committeePage}
			<div class="hidden lg:block m-auto">
				<AvatarIcon officeTitle={data.committeePage.lastEditedByTitle} width="w-64" />
			</div>
		{/if}
	</div>

	<div
		class="w-full mx-auto p-4 sm:p-8 md:p-10 bg-slate-50 dark:bg-surface-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center md:place-items-center gap-4"
	>
		{#await data.pages then pages}
			{#each pages || [] as p (p.path)}
				{#if p.path !== data.relPath}
					<!-- md:w-[22rem] lg:w-80 xl:w-96 2xl:w-[27rem] -->
					<div
						class="h-full rounded-container-token hover:variant-soft-primary active:variant-ghost-primary"
					>
						<a href={p.fullPath} class="size-full">
							<div class="size-full px-8 py-6 space-y-3">
								<div>
									<h1 class="font-heading-token font-bold text-lg">{p.title}</h1>
									<h2 class="font-heading-token text-base">
										{makeSubtitle(p.html)}
									</h2>
								</div>
								<div class="w-full bg-transparent">
									<AuthorCard
										officeTitle={p.lastEditedByTitle}
										authorNames={p.lastEditedByNames}
										timestamp={p.lastEditedAt}
										timeText="Edited on"
									/>
								</div>
							</div></a
						>
					</div>
				{/if}
			{/each}
		{/await}
	</div>
</div>
