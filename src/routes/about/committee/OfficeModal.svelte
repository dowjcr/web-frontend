<script lang="ts">
	import type { Office } from '$lib/cms.types';
	import { clipboard, getModalStore, getToastStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const office: Office = $modalStore[0].meta.office;
	const emailToast = {
		message: 'Email copied to clipboard',
		background: 'variant-glass-primary',
		timeout: 2000,
		hideDismiss: true,
		classes: 'font-mono'
	};
	$: numImages = office.officers?.filter((o) => o.img).length || 0;
</script>

<div class="card bg-slate-50 dark:bg-surface-500 overflow-hidden w-full max-w-[50%] shadow-xl">
	<div class={`w-full h-full grid grid-cols-${numImages + 1}`}>
		{#each office.officers || [] as officer}
			{#if officer.img}
				<div>
					<img src={officer.img} alt={officer.name} class="min-w-full" />
				</div>
			{/if}
		{/each}
		<div class="p-10">
			<div class="h-full pb-4 border-b-2 border-primary-800 dark:border-primary-400">
				{#if office.officers}
					<h1 class="text-3xl font-heading-token">
						{#if office.officers.length > 1}
							{#each office.officers.slice(0, -1) as o, idx (o.name)}
								<span class="font-bold">{o.name}</span>
								{#if idx < office.officers.length - 2}<span>, </span>{/if}
							{/each}
							<span>and</span>
						{/if}
						<span class="font-bold">{office.officers[office.officers.length - 1].name}</span>
					</h1>
					<h2 class="text-xl">
						{office.officers && office.officers.length > 1 && !office.title.endsWith('s')
							? office.title + 's'
							: office.title}
					</h2>
				{/if}
				<div class="mt-3 mb-5 flex gap-4">
					<div>
						<button
							title={office.email}
							class="!outline-none bg-transparent border-0 shadow-none ring-0"
							use:clipboard={office.email}
							on:click={() => toastStore.trigger(emailToast)}
						>
							<i class=" text-xl fa-regular fa-envelope"></i>
						</button>
					</div>
					<div>
						<a
							title="Manifesto"
							href={office.manifesto}
							class="!outline-none bg-transparent border-0 shadow-none ring-0"
						>
							<i class=" text-xl fa-regular fa-scroll"></i>
						</a>
					</div>
				</div>
				{#if office.description}
					<p class="prose prose-sm">
						{office.description}
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
