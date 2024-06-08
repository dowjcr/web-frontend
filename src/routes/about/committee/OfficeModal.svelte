<script lang="ts">
	import type { Office } from '$lib/cms.types';
	import { clipboard, getModalStore, getToastStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	const toastStore = getToastStore();
	const office: Office = $modalStore[0].meta.office;
	const emailToast = {
		message: 'Email copied to clipboard',
		background: 'variant-filled-primary',
		timeout: 2000,
		hideDismiss: true,
		classes: 'font-mono'
	};
	const imgToCols: { [index: number]: string } = {
		0: 'grid-cols-1 lg:grid-cols-[85%]',
		1: 'grid-cols-1 lg:grid-cols-[1fr_60%]',
		2: 'grid-cols-1 lg:grid-cols-[1fr_1fr_50%]'
	};
	$: numImages = office.officers?.filter((o) => o.img).length || 0;
</script>

<div
	class="card bg-slate-50 dark:bg-surface-500 overflow-hidden sm:max-w-[70%] 2xl:max-w-[55%] sm:max-h-[70%] shadow-xl p-5"
>
	<button
		on:click={() => {
			modalStore.close();
		}}
		class="!outline-none bg-transparent border-0 shadow-none ring-0 group float-right"
		><i
			class="fa-2xl md: fa-solid fa-xmark text-error-700 group-focus:text-red-800 group-hover:text-red-400 dark:text-white dark:group-hover:text-red-500"
		>
		</i></button
	><br />
	<div class="h-full grid grid-cols-1 {imgToCols[numImages]} items-center justify-center justify-items-center gap-2">
		{#each office.officers || [] as officer}
			{#if officer.img}
					<img src={officer.img} alt={officer.name} class="rounded-xl max-h-[30vh] lg:max-h-max" />
			{/if}
		{/each}
		<div class={numImages > 0 ? 'lg:pl-10' : ''}>
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
							class="!outline-none bg-transparent border-0 shadow-none ring-0 group"
							use:clipboard={office.email}
							on:click={() => toastStore.trigger(emailToast)}
						>
							<i class="text-xl fa-regular fa-envelope group-hover:animate-bounce-bottom"></i>
							<span class="opacity-70 group-hover:opacity-100 transition ease-in-out"
								>{office.email}
							</span>
						</button>
					</div>
					{#if office.manifesto}
						<div class="flex text-center">
							<a
								title="Manifesto"
								href={office.manifesto}
								target="_blank"
								class="!outline-none bg-transparent border-0 shadow-none ring-0 group"
							>
								<i
									class="group-hover:animate-[pulse_2.5s_ease-in-out_infinite] text-xl fa-regular fa-scroll"
								></i>
								<span
									class="underline group-hover:decoration-black decoration-transparent transition ease-in-out"
									>Manifesto</span
								>
							</a>
						</div>
					{/if}
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
