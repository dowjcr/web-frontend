<script lang="ts">
	import lunr from 'lunr';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { insertLunrFuzzyMatcher, searchStore } from '$lib/components/Search';
	const modalStore = getModalStore();
	let searchTerm = '';
	let searchIndex: lunr.Index = lunr.Index.load(JSON.parse($searchStore));
	let searchResults: lunr.Index.Result[] = [];
	let searchPages: { href: string; title: string }[] = [];

	const updateResults = () => {
		searchResults = searchIndex.search(insertLunrFuzzyMatcher(searchTerm));
		searchPages = searchResults.map((r) => {
			let [href, title] = r.ref.split('<SEP>');
			href = '/' + href
			return { href, title };
		});
	};
	let searchElement: HTMLElement;
	function onKeyDown(event: KeyboardEvent): void {
		if (['Enter'].includes(event.code)) {
			const queryFirstAnchorElement = searchElement.querySelector('a');
			if (queryFirstAnchorElement) queryFirstAnchorElement.focus();
		}
	}
</script>

<div
	bind:this={searchElement}
	class="modal-search card bg-surface-100 dark:bg-surface-500/30 backdrop-blur-lg overflow-hidden w-full max-w-[800px] shadow-xl"
>
	<div>
		<header class="modal-search-header mt-auto bg-surface-300-600-token flex items-center">
			<i class="fa-solid fa-magnifying-glass text-xl ml-4" />
			<input
				bind:value={searchTerm}
				on:input={updateResults}
				on:keydown={onKeyDown}
				class="!outline-none bg-transparent border-0 shadow-none focus:ring-0 w-full m-2 text-lg"
				type="search"
				placeholder="Search..."
			/>
		</header>
		{#if searchPages.length > 0}
			<nav class="list-nav overflow-x-auto max-h-[480px] hide-scrollbar" tabindex="-1">
				{#each searchPages as p (p.href)}
					<ul>
						<li class="text-lg">
							<a
								class="font-heading-token !rounded-none justify-between hover:variant-soft focus:!variant-filled-primary bg-transparent border-0 shadow-none ring-0 outline-0"
								href={p.href}
								on:click={() => {
									modalStore.close();
								}}
							>
								<div class="flex items-center gap-4">
									<i class="fa-regular fa-file" />
									<span class="flex-auto opacity-75">{p.title}</span>
								</div>
								<span class="hidden md:block text-xs opacity-50">{p.href}</span>
							</a>
						</li>
					</ul>
				{/each}
			</nav>
		{:else}
			<div class="p-4">
				<p>No Results found for <code class="code">{searchTerm}</code>.</p>
			</div>
		{/if}
		<footer
			class="modal-search-footer hidden md:flex items-center gap-2 bg-surface-300-600-token p-4 text-xs font-bold"
		>
			<div><kbd class="kbd">Esc</kbd> to close</div>
			<div><kbd class="kbd">Tab</kbd> to navigate</div>
			<div><kbd class="kbd">Enter</kbd> to select</div>
		</footer>
	</div>
</div>
