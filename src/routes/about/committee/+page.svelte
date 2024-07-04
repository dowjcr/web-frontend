<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { Office } from '$lib/cms.types';
	import { officeStore, pathFromText } from '$lib';
	import OfficerRow from './OfficerRow.svelte';

	const modalStore = getModalStore();
	export function openOfficeModal(office: Office) {
		modalStore.trigger({
			type: 'component',
			component: 'OfficeModal',
			backdropClasses: '!bg-transparent dark:!bg-surface-500/30',
			meta: { office }
		});
	}
</script>

<svelte:head>
	<title>Committee | Downing JCR</title>
</svelte:head>

<div class="w-full p-10 pt-2 min-h-screen bg-slate-50 dark:bg-surface-900">
	<div class="flex text-center justify-center p-6">
		<h1 class="h1 font-bold">Meet the Committee</h1>
	</div>
	<div>
		<div
			class="grid grid-cols-1 lg:grid-cols-[1fr_2fr_2fr] lg:w-auto lg:mx-[2vw] 2xl:mx-[10vw] w-full justify-items-center gap-y-2 lg:gap-x-5"
		>
			{#each $officeStore as office}
				<OfficerRow bind:office></OfficerRow>
			{/each}
		</div>
	</div>
</div>
