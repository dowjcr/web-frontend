<script lang="ts">
	import logoUrl from '$lib/assets/logo-cleaned.svg?url';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center m-8">
	<div class="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
		<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px]">
			Non nisi ut sint ad do laboris proident qui.
		</h1>
		<p class="!text-xl max-w-[475px]">
			Adipisicing ad enim commodo laboris velit enim commodo ullamco mollit qui excepteur
			consectetur quis deserunt.
		</p>
		<div></div>
		<div class="flex gap-4">
			<a href="/services" class="btn variant-filled-primary">
				<span>To the Domus</span>
				<i class="fa-solid fa-arrow-right-long" />
			</a>
			<a href="/about" class="btn variant-soft-primary">Learn More</a>
		</div>
	</div>
	<div class="flex items-center justify-end">
		<svg
			class="hidden md:inline rounded-container-token shadow-xl"
			viewBox="0 0 1200 1200"
			fill="rgba(var(--color-primary-500))"
			width="400"
			height="400"
		>
			<use xlink:href={logoUrl + '#logoSymbol'} />
		</svg>
	</div>
</div>
