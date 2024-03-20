<script lang="ts">
	import logo from '$lib/assets/logo.png';
	import { browser } from '$app/environment';
	import '../app.postcss';
	import '@fortawesome/fontawesome-free/css/fontawesome.css';
	import '@fortawesome/fontawesome-free/css/brands.css';
	import '@fortawesome/fontawesome-free/css/solid.css';
	import {
		AppShell,
		AppBar,
		Modal,
		storePopup,
		type ModalSettings,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import { initializeStores, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton';
	initializeStores();
	const modalStore = getModalStore();
	const drawerStore = getDrawerStore();

	import SearchModal from './SearchModal.svelte';
	import NavBarDropdown from './NavBarDropdown.svelte';
	import NavBarDrawer from './NavBarDrawer.svelte';

	function openDrawer(): void {
		drawerStore.open({ position: 'right', width: 'w-1/3' });
	}
	function openSearchModal(): void {
		const modal: ModalSettings = {
			type: 'component',
			component: 'SearchModal',
			position: 'item-start'
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

<!-- Use stopPropagation to override Chrome for Windows search shortcut -->
<svelte:window on:keydown|stopPropagation={onWindowKeydown} />
<Modal components={modalRegistry} />
<NavBarDrawer />
<AppShell shadow="shadow-2xl" slotTrail="!space-x-2">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="flex items-center space-x-2">
					<img src={logo} alt="Downing JCR Logo" class="bg-white md:w-10 md:h-10" />
					<strong class="text-xl">Downing JCR</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<NavBarDropdown href="https://skeleton.dev/">
					Launch Documentation
					<svelte:fragment slot="hover-content">
						Commodo eiusmod cillum veniam pariatur.
					</svelte:fragment>
				</NavBarDropdown>
				<NavBarDropdown href="https://discord.gg/EXqV7W8MtY">
					Discord
					<svelte:fragment slot="hover-content">
						Consectetur cupidatat exercitation commodo elit proident quis cillum ad reprehenderit
						sunt officia aliqua nisi labore.
					</svelte:fragment></NavBarDropdown
				>
				<NavBarDropdown href="https://twitter.com/SkeletonUI">
					Twitter
					<svelte:fragment slot="hover-content">Consectetur magna in in sint.</svelte:fragment>
				</NavBarDropdown>
				<NavBarDropdown href="https://github.com">
					Github
					<svelte:fragment slot="hover-content">
						Cillum Lorem cupidatat irure laboris exercitation aute cupidatat proident voluptate enim
						sint elit ullamco.
					</svelte:fragment>
				</NavBarDropdown>

				<div class="md:inline md:ml-4">
					<button
						on:click={openSearchModal}
						class="btn space-x-4 variant-soft hover:variant-soft-primary"
					>
						<i class="fa-solid fa-magnifying-glass text-sm" />
						<small class="hidden md:inline-block">{isMacOs ? '⌘' : 'Ctrl'}+K</small>
					</button>
				</div>

				<!-- Hamburger Menu -->
				<button on:click={openDrawer} class="btn-icon btn-icon-sm">
					<i class="fa-solid fa-bars text-xl" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
