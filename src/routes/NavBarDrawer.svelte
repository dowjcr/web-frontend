<script lang="ts">
	import { getDrawerStore, Drawer, LightSwitch } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
</script>

<Drawer>
	<div
		class="w-full h-full bg-slate-50 dark:bg-surface-900 flex justify-center items-center relative"
	>
		<div class="absolute top-1 right-0 m-4">
			<div class="flex items-center lg:space-x-2">
				<LightSwitch class="mx-4 bg-opacity-0" />
				<!-- Hamburger Menu -->
				<button
					on:click={() => drawerStore.close()}
					class="hover:variant-soft-surface btn-icon btn-icon-sm"
				>
					<i class="fa-solid fa-bars text-xl" />
				</button>
			</div>
		</div>
		<div class="text-center space-y-2">
			{#if $drawerStore.meta}<h2 class="h2">{$drawerStore.meta}</h2>{/if}
			<h4 class="h4">Drawer: <span class="capitalize">{$drawerStore.position}</span></h4>
			<span class="block">Tap outside the drawer to close.</span>
		</div>
	</div>
</Drawer>
