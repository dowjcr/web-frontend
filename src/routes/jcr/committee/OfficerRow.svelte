<script lang="ts">
	import type { Office } from '$lib/cms.types';
	import { clipboard, getToastStore } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	export let office: Office;
	const toastStore = getToastStore();
	const emailToast = {
		message: 'Email copied to clipboard',
		background: 'bg-primary-300',
		color: 'text-black dark:text-white',
		timeout: 20000,
		hideDismiss: true,
		classes: 'font-mono'
	};
	$: emailShort = office.email.split('@');
</script>

<h2 class="text-3xl font-heading-token text-center font-bold col-span-3">{office.title}</h2>
<div
	class="grid grid-cols-1 lg:grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] lg:w-full col-span-3 md:col-span-3 gap-y-5 p-4 items-center justify-items-center bg-slate-50 dark:bg-surface-900 dark:text-white"
>
	<div class="grid grid-cols-1 md:col-span-1 col-span-3 h-max gap-y-1 text-center">
		<div class="">
			<button
				title={office.email}
				class="!outline-none bg-transparent border-0 shadow-none ring-0 group"
				use:clipboard={office.email}
				on:click={() => toastStore.trigger(emailToast)}
			>
				<i class="text-xl fa-regular fa-envelope group-hover:animate-bounce-bottom"></i><br />
				<span class="opacity-70 group-hover:opacity-100 transition ease-in-out text-center"
					>{emailShort[0]}@{emailShort[1]}
				</span>
			</button>
		</div>
		{#if office.manifesto}
			<div>
				<a
					title="Manifesto"
					href={office.manifesto}
					target="_blank"
					class="!outline-none bg-transparent border-0 shadow-none ring-0 group"
				>
					<i
						class="group-hover:animate-[pulse_2.5s_ease-in-out_infinite] text-xl fa-regular fa-scroll"
					></i><br />
					<span
						class="underline group-hover:decoration-black decoration-transparent transition ease-in-out"
						>Manifesto</span
					>
				</a>
			</div>
		{/if}
	</div>

	<!-- <div class="flex justify-evenly col-span-3 md:col-span-1 items-center flex-wrap gap-x-5"> -->
	{#if office.officers}
		{#each office.officers as officer}
			<div class="text-center w-max grid grid-cols-1 col-span-3 md:col-span-1 mx-5 lg:mx-0">
				{#if officer.img}
					<img
						src={officer.img}
						alt={officer.name}
						class="rounded-xl text-center object-contain h-[30vh] min-w-[5vw] lg:max-w-[12vw] lg:max-h-auto lg:h-auto"
					/>
				{:else}
					<p>No image :(</p>
				{/if}

				<p class="font-bold text-lg">{officer.name}</p>
				<p class="italic">{officer.crsid}</p>
			</div>
		{/each}
	{/if}
</div>
<!-- </div> -->
{#if office.description}
	<div class="col-start-1 col-end-4 w-[95%] sm:w-full]">
		<Accordion width="w-full col-start-1 col-end-4">
			<AccordionItem>
				<svelte:fragment slot="iconOpen"
					><i class="fa-solid fa-plus opacity-50"></i></svelte:fragment
				>
				<svelte:fragment slot="iconClosed"
					><i class="fa-solid fa-minus opacity-50"></i></svelte:fragment
				>
				<svelte:fragment slot="lead"><i class="fa-regular fa-circle-info"></i></svelte:fragment>
				<svelte:fragment slot="summary"
					><span class="font-bold text-xl">Description</span></svelte:fragment
				>
				<svelte:fragment slot="content">{office.description}</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
{/if}
