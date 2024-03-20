<script lang="ts">
	import { getDrawerStore, Drawer, LightSwitch } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();
</script>

<Drawer>
	<div class="w-full h-full flex justify-center items-center relative">
		<div class="absolute top-0 right-0 m-4">
			<LightSwitch />
		</div>
		<div class="text-center space-y-2">
			{#if $drawerStore.meta}<h2 class="h2">{$drawerStore.meta}</h2>{/if}
			<h4 class="h4">Drawer: <span class="capitalize">{$drawerStore.position}</span></h4>
			<span class="block">Tap outside the drawer to close.</span>
		</div>
	</div>
</Drawer>
