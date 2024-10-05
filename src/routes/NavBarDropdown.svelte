<script lang="ts">
	import type { ReturnNavHeader } from '$lib/cms.types';

	export let navHeader: ReturnNavHeader;
	export let caret = true;
	let popupId = (Math.random() * 10e15).toString(16);

	import { popup, type PopupSettings } from '$lib/components/Popup';
	const popupHover: PopupSettings = {
		event: 'hover2boogaloo',
		target: 'popupHover-' + popupId,
		closeQuery: ''
	};
</script>

<div class="relative hidden sm:block">
	<a
		href={navHeader.pageNeeded ? '/' + navHeader.prefix : ''}
		use:popup={popupHover}
		class={'[&>*]:pointer-events-none btn btn-sm py-3 hover:text-primary-500 text-sm hidden md:inline' +
			(navHeader.pageNeeded
				? ' dark:hover:text-token hover:variant-soft-primary dark:hover:variant-soft-surface'
				: '')}
	>
		<span class="mr-0 text-sm font-medium font-heading-token">{navHeader.header}</span>
		{#if caret}
			<i class="ml-0 fa-solid fa-caret-down opacity-50" />
		{/if}
	</a>
</div>

<!-- https://www.skeleton.dev/utilities/popups#avoiding-style-conflicts -->
<div data-popup={popupHover.target}>
	<slot>
		<div class="card shadow-lg rounded-lg w-60 overflow-hidden bg-slate-50 dark:bg-surface-800">
			<p
				class="font-normal px-4 py-2 focus:variant-soft-primary dark:focus:variant-soft-surface group transition duration-300 block text-sm"
			>
				Nothing to show
			</p>
		</div>
	</slot>
</div>

<style>
	[data-popup] {
		transition-duration: 0s;
	}
</style>
