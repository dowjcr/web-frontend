<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	import { page } from '$app/stores';
	import { searchStore } from '$lib/components/Search';
	import lunr from 'lunr';
	data.searchIndex.then(searchStore.set);

	const headingOrder = ['News', 'Welfare', 'Services', 'About'];
	data.topLevelNavItems.then((x) =>
		x.sort((a, b) => headingOrder.indexOf(a.header) - headingOrder.indexOf(b.header))
	);

	import logoUrl from '$lib/assets/logo-cleaned.svg?url';
	import { browser } from '$app/environment';
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';
	import {
		AppShell,
		AppBar,
		Modal,
		type ModalSettings,
		type ModalComponent,
		initializeStores,
		getDrawerStore,
		getModalStore,
		setInitialClassState
	} from '@skeletonlabs/skeleton';
	import { storePopup } from '$lib/components/Popup';
	initializeStores();
	const modalStore = getModalStore();
	const drawerStore = getDrawerStore();

	import SearchModal from './SearchModal.svelte';
	import NavBarDropdown from './NavBarDropdown.svelte';
	import NavBarDrawer from './NavBarDrawer.svelte';
	import Footer from './Footer.svelte';

	function openDrawer(): void {
		drawerStore.open({ position: 'right' }); // width: 'w-1/3'
	}
	function openSearchModal(): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'SearchModal',
			position: 'items-center',
			backdropClasses: '!bg-primary-100/60 dark:!bg-surface-500/30'
		};
		modalStore.trigger(modal);
	}
	const modalRegistry: Record<string, ModalComponent> = {
		SearchModal: { ref: SearchModal }
	};

	let isMacOs = false;
	if (browser) {
		let os = navigator.userAgent;
		isMacOs = os.search('Mac') !== -1;
	}
	// Keyboard shortcut (Ctrl / ⌘+K) for search modal
	function onWindowKeydown(e: KeyboardEvent): void {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault(); // Prevent default browser behavior of focusing URL bar
			$modalStore.length ? modalStore.close() : openSearchModal();
		}
	}

	// Pop-ups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- Make sure mode is the same after page reload -->
<svelte:head>{@html '<script>(' + setInitialClassState.toString() + ')();</script>'}</svelte:head>
<!-- Use stopPropagation to override Chrome for Windows search shortcut -->
<svelte:window on:keydown|stopPropagation={onWindowKeydown} />
<Modal components={modalRegistry} />
<NavBarDrawer />
<AppShell
	shadow="shadow-2xl"
	slotTrail="!space-x-2"
	slotSidebarLeft="bg-surface-50 dark:bg-surface-900 {$page.url.pathname === '/'
		? 'w-0'
		: 'w-0 lg:w-64'}"
>
	<!-- <svelte:fragment ">
		<div slot="sidebarLeft class="size-full bg-slate-50 dark:bg-surface-900">
			<div class="p-6">
				<h1 id="sidebar-left" class="hidden lg:block text-lg font-heading-token">Sidebar</h1>
				<hr />
			</div>
		</div>
	</svelte:fragment> -->
	<svelte:fragment slot="header">
		<AppBar class="shadow-xl !bg-slate-50 dark:!bg-surface-900">
			<svelte:fragment slot="lead">
				<a href="/" class="flex items-center space-x-4">
					<div
						class="bg-primary-500 border-primary-500 dark:bg-tertiary-50 dark:border-tertiary-50 border-2"
					>
						<svg
							class="fill-slate-50 dark:fill-surface-900"
							viewBox="0 0 1200 1200"
							width="2.5rem"
							height="2.5rem"
						>
							<use xlink:href={logoUrl + '#logoSymbol'} />
						</svg>
					</div>
					<!-- <img src={logo} alt="Downing JCR Logo" class="dark:bg-white md:w-10 md:h-10" /> -->
					<p class="hidden lg:inline-block text-2xl h1 whitespace-nowrap">Downing JCR</p>
					<p class="md:inline-block lg:hidden text-2xl h1 whitespace-nowrap">DowJCR</p>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="flex items-center lg:space-x-2 text-slate-950 dark:text-tertiary-50">
					{#await data.topLevelNavItems}
						{#each headingOrder as heading}
							<NavBarDropdown href={'/' + heading.toLowerCase()} text={heading}>
								<svelte:fragment></svelte:fragment>
							</NavBarDropdown>
						{/each}
					{:then topLevelNavItems}
						{#each topLevelNavItems as item}
							<NavBarDropdown
								href={'/' + item.header.toLowerCase().replaceAll(' ', '-')}
								text={item.header}
							>
								<nav class="card rounded-lg w-60 overflow-hidden bg-slate-50 dark:bg-surface-800">
									<ul>
										{#if item.navitems}
											{#each item.navitems as subItem}
												<li class="">
													<a
														href={subItem.path}
														class="px-4 pt-3 pb-3 focus:variant-soft-primary dark:focus:variant-soft-surface group transition duration-300 block text-sm hover:text-primary-500 dark:hover:text-surface-100"
													>
														<span>{subItem.label}</span>
														<span
															class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary-500 dark:bg-surface-100"
														></span>
													</a>
												</li>
											{/each}
										{/if}
									</ul>
								</nav>
							</NavBarDropdown>
						{/each}
					{/await}
					<div class="md:inline mx-4">
						<button
							on:click={openSearchModal}
							class="btn space-x-4 variant-soft hover:variant-soft-primary dark:hover:variant-soft-surface"
						>
							<i class="fa-solid fa-magnifying-glass text-sm" />
							<small class="hidden md:inline-block font-mono">{isMacOs ? '⌘' : 'Ctrl'}+K</small>
						</button>
					</div>
					<button on:click={openDrawer} class="hover:variant-soft-surface btn-icon btn-icon-sm">
						<i class="fa-solid fa-bars text-xl" />
					</button>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<Footer />
</AppShell>
