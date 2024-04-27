<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { Office } from '$lib/cms.types';
	import { officeStore, pathFromText } from '$lib';
	import Sacha from '$lib/assets/404-hedgehog.jpg';

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

<div class="w-full p-10 min-h-screen bg-slate-50 dark:bg-surface-900">
	<div class="flex justify-center p-10">
		<h1 class="h1 font-bold">Meet the Committee</h1>
	</div>
	<div class="container mx-auto px-10 pt-5">
		<div class="mx-auto md:columns-3 lg:columns-4 xl:columns-5 gap-[1.25rem] space-y-4">
			{#each $officeStore as office}
				{#if office.officers}
					<div id={pathFromText(office.title)} class="break-inside-auto">
						{#each office.officers as officer}
							<div class="break-inside-avoid-column">
								<button class="group" on:click={() => openOfficeModal(office)}>
									<div class="rounded-2xl overflow-hidden bg-black dark:bg-white">
										<img
											src={officer.img || Sacha}
											alt={officer.name}
											class="h-auto min-w-full hover:opacity-60"
										/>
									</div>
									<div class="p-3 mb-4 min-w-full font-heading-token group-hover:underline">
										<p class="font-bold text-sm">{officer.name}</p>
										<p class="opacity-50 text-sm">{office.title}</p>
									</div>
								</button>
							</div>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
