<script lang="ts">
	import type { PageData } from '../[...content]/$types';

	export let data: PageData;
</script>

<main class="flex flex-col flex-1 w-full h-full overflow-hidden">
	{#if data.approved}
		<article class="p-4 prose md:prose-lg lg:prose-xl">
			{@html data.content_html}
		</article>
	{/if}
</main>
