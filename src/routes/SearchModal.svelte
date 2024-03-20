<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	let searchTerm = '';
</script>

<div
	class="modal-search card bg-surface-100/60 dark:bg-surface-500/30 backdrop-blur-lg overflow-hidden w-full max-w-[800px] shadow-xl mt-8 mb-auto"
>
	<header class="modal-search-header mt-auto bg-surface-300-600-token flex items-center">
		<!-- TODO: fix annoying clash of focussed search box and top RH corner -->
		<i class="fa-solid fa-magnifying-glass text-xl ml-4" />
		<input
			bind:value={searchTerm}
			class="bg-transparent border-opacity-0 border-0 shadow-none ring-transparent ring-0 focus:ring-0 w-full m-2 ml-4 text-lg"
			type="search"
			placeholder="Search..."
		/>
	</header>
	<div class="p-4">
		<p>No Results found for <code class="code">{searchTerm}</code>.</p>
	</div>
	<footer
		class="modal-search-footer hidden md:flex items-center gap-2 bg-surface-300-600-token p-4 text-xs font-bold"
	>
		<div><kbd class="kbd">Esc</kbd> to close</div>
		<div><kbd class="kbd">Tab</kbd> to navigate</div>
		<div><kbd class="kbd">Enter</kbd> to select</div>
	</footer>
</div>
