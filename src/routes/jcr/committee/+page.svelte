<script lang="ts">
	import { officeStore } from '$lib';
	import OfficerRow from './OfficerRow.svelte';

	// export function openOfficeModal(office: Office) {
	// 	modalStore.trigger({
	// 		type: 'component',
	// 		component: 'OfficeModal',
	// 		backdropClasses: '!bg-transparent dark:!bg-surface-500/30',
	// 		meta: { office }
	// 	});
	// }
</script>

<svelte:head>
	<title>Committee | Downing JCR</title>
</svelte:head>

<div class="w-full py-2 md:py-5 pt-2 min-h-screen bg-slate-50 dark:bg-surface-900">
	<div class="flex text-center justify-center pb-8">
		<h1 class="h1 font-bold">Meet the Committee</h1>
	</div>
	<div>
		<div class="lg:w-[60vw] lg:max-w-[800px] mx-auto w-[95%]">
			<hr
				class="w-[60%] max0- divider h-0 mx-auto my-4 border-t-2 rounded md:mb-10 border-gray-700 dark:border-white col-span-3"
			/>
			{#each $officeStore as office}
				<div
					class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] justify-items-center gap-y-2 lg:gap-x-5 lg:border-x-[1px] lg:border-gray-400"
				>
					<OfficerRow bind:office></OfficerRow>
				</div>
				<hr
					class="w-[30%] max-w-[480px] divider h-0 mx-auto my-4 border-t-2 rounded md:my-10 border-gray-700 dark:border-white col-span-3"
				/>
			{/each}
		</div>
	</div>
</div>
