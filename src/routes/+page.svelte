<script lang="ts">
	import HomeHero from './HomeHero.svelte';
</script>

<svelte:head>
	<title>Home | Downing JCR</title>
</svelte:head>
<!-- <div> -->
<!-- <header id="hero" class="bg-surface-100-800-token"> -->
<div class="fixed top-0 left-0 right-0"><HomeHero /></div>

<!-- </header> -->

<!-- 
	<section id="playground" class="bg-surface-100-800-token">
		<div class="section-container">
			<div
				class="card variant-soft-primary p-4 md:py-10 max-w-5xl mx-auto text-center flex flex-col md:flex-row justify-center items-center gap-4"
			>
				<p class="!text-xl">Try Skeleton live in your browser.</p>
				<a
					class="btn variant-filled"
					href="https://stackblitz.com/fork/github/skeletonlabs/repl/tree/main/welcome"
					target="_blank"
					rel="noreferrer"><i class="fa-solid fa-bolt"></i> <span>Open in StackBlitz</span></a
				>
			</div>
		</div>
	</section> -->
<!-- </div> -->

<style lang="postcss">
	/* .section-container {
		@apply w-full py-16 md:py-24;
		@apply bg-slate-50 dark:bg-surface-800;
	} */
	/* header {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.33) 0px,
				transparent 50%
			),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}

	header:is(dark) {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-400) * 0.33) 0px,
				transparent 50%
			),
			radial-gradient(at 98% 1%, rgba(var(--color-error-400) * 0.33) 0px, transparent 50%);
	} */
</style>
