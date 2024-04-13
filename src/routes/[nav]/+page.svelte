<script lang="ts">
	import { extractH1AndContent } from '$lib';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ h1Content, restContent } = extractH1AndContent(data.committeePage?.html || ''));
	$: pageTitle = h1Content || data.committeePage?.title || data.navHeaderName;
</script>

<svelte:head>
	<title>{pageTitle} | Downing JCR</title>
</svelte:head>

<div class="bg-primary-50 dark:bg-surface-700 w-full lg:grid grid-cols-3 p-10 lg:p-28 gap-28">
	<div
		class="col-span-2 mr-auto flex flex-col items-center md:items-start text-center md:text-left space-y-3"
	>
		<h1
			class="h1 !text-5xl md:!text-6xl max-w-[600px] !text-surface-900 dark:!text-primary-300 dark:font-bold"
		>
			{pageTitle}
		</h1>
		<div class="w-full bg-transparent flex">
			<Avatar
				width="h-12 my-auto"
				rounded="rounded-full"
				initials={data.committeePage?.lastEditedByNames
					?.split(' ')
					.map((word) => word.charAt(0).toUpperCase())
					.join('')}
			/>
			<div class="grow flex flex-col justify-center items-start p-4">
				<p class="text-sm">
					<span class="font-bold">{data.committeePage?.lastEditedByNames}</span>
					· {data.committeePage?.lastEditedByTitle}
				</p>
				<p class="text-sm">
					Updated at <span class="font-bold">{data.committeePage?.lastEditedAt}</span>
				</p>
			</div>
		</div>
		<div class="text-left prose md:prose-lg lg:prose-xl !text-pretty">
			{@html restContent}
		</div>
	</div>
	<div class="hidden lg:block m-auto">
		<Avatar width="w-64" background="bg-primary-400" rounded="rounded-full" />
	</div>
</div>

<div class="bg-slate-50 dark:bg-surface-900">
	<div class="bg-transparent m-auto flex-none p-20 w-[50rem]">
		{#await data.pages.then((p) => p?.docs) then pages}
			{#if pages}
				{#each pages as p}
					{#if p.path !== data.relPath}
						<a href={p.path}>
							<div
								class="card rounded-icon-token my-2 p-5 bg-inherit border-none ring-0 hover:shadow-xl"
							>
								<h2 class="font-heading-token font-bold">{p.title}</h2>
								<p>{p.path}</p>
							</div>
						</a>
					{/if}
				{/each}
			{/if}
		{/await}
	</div>
</div>
