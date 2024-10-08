<script lang="ts">
	import { officeStore } from '$lib';
	import { pathFromText } from '$lib';
	import AvatarIcon from '$lib/components/AvatarIcon.svelte';
	import BoldedOfficerNames from '$lib/components/BoldedOfficerNames.svelte';
	import { clipboard, getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	const emailToast = {
		message: 'Email copied to clipboard',
		background: 'bg-primary-300',
		color: 'text-black dark:text-white',
		timeout: 20000,
		hideDismiss: true,
		classes: 'font-mono'
	};
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
			{#each $officeStore as office}
				<div
					id={pathFromText(office.title)}
					class="mb-8 p-12 dark:bg-surface-800 rounded-2xl hover:shadow"
				>
					<div class="flex justify-between items-start">
						<div>
							<div class="flex items-baseline">
								<h2 class="text-2xl font-semibold font-heading-token mr-3">{office.title}</h2>
								<button
									title={office.email}
									class="mr-2 !outline-none bg-transparent border-0 shadow-none ring-0 group flex items-center gap-2"
									use:clipboard={office.email}
									on:click={() => toastStore.trigger(emailToast)}
								>
									<i class="text-xl fa-regular fa-envelope group-hover:animate-bounce-bottom"></i>
								</button>
								{#if office.manifesto}
									<div>
										<a
											title="Manifesto"
											href={office.manifesto}
											target="_blank"
											rel="noopener noreferrer"
											class="!outline-none bg-transparent border-0 shadow-none ring-0 group flex items-center gap-2"
										>
											<i class="text-xl fa-regular fa-scroll group-hover:animate-bounce-bottom"></i>
										</a>
									</div>
								{/if}
							</div>
							<button
								title="Click to copy email"
								use:clipboard={office.email}
								on:click={() => toastStore.trigger(emailToast)}
							>
								<p>
									<span class="italic opacity-70 group-hover:opacity-100 transition ease-in-out">
										{office.email}
									</span>
								</p>
							</button>
						</div>
						{#if office.officers && office.officers.length > 0}
							<div class="flex flex-col items-center gap-2">
								<AvatarIcon {office} officeTitle={office.title} width="w-48"></AvatarIcon>
								<p class="text-nowrap">
									<BoldedOfficerNames names={office.officers.map((o) => o.name)}
									></BoldedOfficerNames>
								</p>
							</div>
						{:else}
							<p class="text-gray-600 dark:text-gray-400">
								No officers currently assigned to this role.
							</p>
						{/if}
					</div>
					{#if office.description}
						<p class="mt-8">{office.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
