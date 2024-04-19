<script lang="ts">
	import { newsStore, makeSubtitle } from '$lib';
	import AuthorCard from '$lib/components/AuthorCard.svelte';
</script>

<svelte:head>
	<title>News | Downing JCR</title>
</svelte:head>

<div class="bg-primary-50 dark:bg-surface-700 w-full lg:grid grid-cols-3 p-10 lg:p-28 gap-28">
	<div
		class="col-span-2 mr-auto flex flex-col items-center md:items-start text-center md:text-left space-y-3"
	>
		<h1
			class="h1 !text-5xl md:!text-6xl max-w-[600px] !text-surface-900 dark:!text-primary-300 dark:font-bold"
		>
			News
		</h1>
	</div>
</div>

<div
	class="mx-auto p-4 sm:p-8 md:p-10 bg-slate-50 dark:bg-surface-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center md:place-items-center gap-4"
>
	{#each $newsStore as newsItem, idx (newsItem.publishedAt)}
		<!-- md:w-[22rem] lg:w-80 xl:w-96 2xl:w-[27rem]  -->
		<div
			class="h-full rounded-container-token hover:variant-soft-primary active:variant-ghost-primary"
		>
			<a href={`/news/${$newsStore.length - idx}`} class="size-full">
				<div class="size-full px-8 py-6 space-y-3">
					<div>
						<h1 class="font-heading-token font-bold text-lg">{newsItem.title}</h1>
						<h2 class="font-heading-token text-base">{makeSubtitle(newsItem.html)}</h2>
					</div>
					<div class="w-full bg-transparent">
						<AuthorCard
							officeTitle={newsItem.lastEditedByTitle}
							authorNames={newsItem.lastEditedByNames}
							timestamp={newsItem.publishedAt}
							timeText="Published at"
						/>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>

<!-- <style>
	* {
		border: red 1px solid;
	}
</style> -->
