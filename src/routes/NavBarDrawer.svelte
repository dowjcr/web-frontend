<script lang="ts">
	import { page } from '$app/stores';
	import {
		Accordion,
		AccordionItem,
		getDrawerStore,
		Drawer,
		LightSwitch,
		TableOfContents
	} from '@skeletonlabs/skeleton';
	import { headerPathFromName, navStore } from '$lib';
	const drawerStore = getDrawerStore();

	function handleToCAnchors(node: any) {
		node.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
			a.addEventListener('click', drawerStore.close);
		});
	}
</script>

<Drawer>
	<div class="w-full h-full p-3 bg-slate-50 dark:bg-surface-800">
		<div class="w-full flex items-center">
			<div class="grow"><LightSwitch class="m-3 bg-opacity-0" /></div>
			<button
				on:click={drawerStore.close}
				class="hover:variant-soft-primary dark:hover:variant-soft-surface btn btn-sm size-10"
			>
				<i class="fa-solid fa-times text-xl" />
			</button>
		</div>
		<br />
		<Accordion hover="hover:bg-primary-hover-token dark:hover:!bg-surface-400/50">
			<!-- <AccordionItem open> -->
			<AccordionItem>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="iconClosed"><i class="fa-solid fa-minus" /></svelte:fragment>
				<svelte:fragment slot="iconOpen"><i class="fa-solid fa-plus" /></svelte:fragment>
				<svelte:fragment slot="summary">
					<div class="text-xl font-heading-token">
						<a
							on:click={drawerStore.close}
							href="/news"
							class="focus:variant-soft-primary dark:focus:variant-soft-surface hover:text-primary-500 dark:hover:text-surface-100"
						>
							News
						</a>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="content">Currently no news to show</svelte:fragment>
			</AccordionItem>
			{#each $navStore as item}
				<AccordionItem>
					<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
					<svelte:fragment slot="iconClosed"><i class="fa-solid fa-minus" /></svelte:fragment>
					<svelte:fragment slot="iconOpen"><i class="fa-solid fa-plus" /></svelte:fragment>
					<svelte:fragment slot="summary">
						<div class="text-xl font-heading-token">
							<a
								on:click={drawerStore.close}
								href={headerPathFromName(item.header)}
								class="focus:variant-soft-primary dark:focus:variant-soft-surface hover:text-primary-500 dark:hover:text-surface-100"
							>
								{item.header}
							</a>
						</div>
					</svelte:fragment>
					<svelte:fragment slot="content"
						><ul class="space-y-2">
							{#if item.navItems}
								{#each item.navItems as subItem}
									<li>
										<a
											on:click={drawerStore.close}
											href={subItem.path}
											class="font-normal px-2 focus:variant-soft-primary dark:focus:variant-soft-surface group transition duration-300 block hover:text-primary-500 dark:hover:text-surface-100"
										>
											<span>{subItem.label}</span>
											<span
												class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary-500 dark:bg-surface-100"
											></span>
										</a>
									</li>
								{/each}
							{/if}
						</ul></svelte:fragment
					>
				</AccordionItem>
			{/each}
			{#if $page.data.html}
				<div class="p-3">
					<hr />
				</div>
				<AccordionItem open>
					<svelte:fragment slot="iconClosed"><i class="fa-solid fa-minus" /></svelte:fragment>
					<svelte:fragment slot="iconOpen"><i class="fa-solid fa-plus" /></svelte:fragment>
					<svelte:fragment slot="summary">
						<div class="text-xl font-heading-token">
							<a
								on:click={drawerStore.close}
								href="#top"
								class="focus:variant-soft-primary dark:focus:variant-soft-surface hover:text-primary-500 dark:hover:text-surface-100"
							>
								On this Page
							</a>
						</div>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div use:handleToCAnchors>
							<TableOfContents
								regionList="!mt-0 px-2"
								inactive="!font-normal hover:opacity-100 hover:text-primary-500 dark:hover:text-primary-400"
								active="!font-normal text-primary-500 dark:text-primary-400"
								><div></div>
							</TableOfContents>
						</div>
					</svelte:fragment>
				</AccordionItem>
			{/if}
		</Accordion>
	</div>
</Drawer>
