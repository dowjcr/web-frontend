<script lang="ts">
	import { newsStore, makeSubtitle, initialsFromName } from '$lib';
	import { Avatar } from '@skeletonlabs/skeleton';
	import OfficePopup from '$lib/components/Popup/officePopup.svelte';
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
	class="mx-auto p-4 md:p-8 lg:p-10 bg-slate-50 dark:bg-surface-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center md:place-items-center gap-4"
>
	{#each $newsStore as newsItem, idx (newsItem.publishedAt)}
		<div
			class="lg:w-80 xl:w-96 h-full rounded-container-token hover:bg-primary-hover active:variant-soft-primary"
		>
			<a href={`/news/${$newsStore.length - idx}`} class="size-full">
				<div class="size-full px-4 py-3 group-last:pb-4">
					<!-- <div class="md:h-28"> -->
					<h1 class="font-heading-token font-bold text-lg">{newsItem.title}</h1>
					<h2 class="font-heading-token text-base">{makeSubtitle(newsItem.html)}</h2>
					<!-- </div> -->
					<div class="w-full bg-transparent flex">
						<div class="flex items-center">
							<OfficePopup committeeTitle={newsItem.lastEditedByTitle}>
								<Avatar
									width="h-12 my-auto"
									rounded="rounded-full"
									initials={initialsFromName(newsItem.lastEditedByNames || '')}
								/>
							</OfficePopup>
						</div>
						<div class="grow flex flex-col justify-center items-start p-4">
							<OfficePopup
								committeeTitle={newsItem.lastEditedByTitle}
								anchorClass="hover:underline"
							>
								<p class="text-sm">
									<span class="font-bold">{newsItem.lastEditedByNames}</span>
									· {newsItem.lastEditedByTitle}
								</p>
							</OfficePopup>
							<p class="text-sm">
								Published at <span class="font-bold">{newsItem.publishedAt}</span>
							</p>
						</div>
					</div>
				</div>
			</a>
		</div>
	{/each}
</div>
