<script lang="ts">
	let innerWidth = 0;
	let innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div class="bg-slate-50 dark:bg-surface-800 w-full h-screen box-border relative">
	<div class="h-full grid items-center">
		<div
			class="p-10 md:p-20 xl:p-32 md:pr-10 my-24 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
		>
			<h1 class="h1 !text-5xl lg:!text-6xl max-w-[600px] dark:font-bold">Your digital Domus</h1>
			<p class="text-md lg:!text-xl max-w-[475px]">
				The JCR Committee is here for you—we run events, support your welfare, and negotiate with
				College on your behalf.
			</p>
			<div></div>
			<div></div>
			<div class="flex gap-4 font-bold">
				<a
					href="/services"
					class="btn bg-primary-900 dark:variant-filled-primary text-[rgb(var(--on-primary))]"
				>
					<span>Enter</span>
					<i class="fa-solid fa-arrow-right-long" />
				</a>
				<a href="/about" class="btn variant-soft-primary dark:variant-ghost-surface">Learn More</a>
			</div>
		</div>
	</div>

	<div class="hidden md:inline-block">
		<svg
			class="bigSvgStyled absolute right-0 bottom-0 fill-primary-900 dark:fill-surface-900"
			viewBox="0 0 1200 1200"
			width={innerWidth * 0.5}
			height={innerWidth * 0.5}
		>
			<use xlink:href="/favicon.svg#logoInverted" />
		</svg>
	</div>
</div>
