<script lang="ts">
	import type { Office } from '$lib/cms.types';
	import { clipboard, getToastStore } from '@skeletonlabs/skeleton';
	export let office: Office;
	const toastStore = getToastStore();
	const emailToast = {
		message: 'Email copied to clipboard',
		background: 'variant-glass-primary',
		timeout: 2000,
		hideDismiss: true,
		classes: 'font-mono'
	};
	$: emailShort = office.email.split('@')
</script>

<div
	class="grid grid-cols-subgrid md:col-span-3 border-[5px] border-primary-100 rounded-xl gap-y-5 p-4 items-center bg-slate-50 dark:bg-surface-700 dark:text-white"
>
	<div class="grid grid-cols-1 h-max gap-y-1 text-center">
		<h2 class="text-xl text-center font-bold">{office.title}</h2>
		<div class="">
			<button
				title={office.email}
				class="!outline-none bg-transparent border-0 shadow-none ring-0 group"
				use:clipboard={office.email}
				on:click={() => toastStore.trigger(emailToast)}
			>
				<i class="text-xl fa-regular fa-envelope group-hover:animate-bounce-bottom"></i>
				<span class="opacity-70 group-hover:opacity-100 transition ease-in-out text-center"
					>{emailShort[0]}<br>@{emailShort[1]}
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
					></i>
					<span
						class="underline group-hover:decoration-black decoration-transparent transition ease-in-out"
						>Manifesto</span
					>
				</a>
			</div>
		{/if}
	</div>
	<div class="text-justify">
		{#if office.description}
			<p>{office.description}</p>
		{/if}
	</div>

	 <div class="flex justify-evenly items-center flex-wrap gap-x-5">
		{#if office.officers}
			{#each office.officers as officer}
				<div class="text-center w-max">
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
					<p>({officer.crsid})</p>
				</div>
			{/each}
		{/if}
	</div>
</div>
