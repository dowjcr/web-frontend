<script lang="ts">
	import logoUrl from '$lib/assets/logo-cleaned.svg?url';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center m-8">
	<div class="ml-auto flex flex-col items-center md:items-start text-center md:text-left space-y-4">
		<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px] font-bold">
			Bleeding <span
				class="bg-gradient-to-r from-primary-900 via-primary-500 to-primary-800 dark:from-primary-500 dark:via-primary-300 dark:to-primary-500 text-transparent bg-clip-text hero-animate-gradient"
				>magenta</span
			> since 1800
		</h1>
		<p class="!text-xl max-w-[475px]">
			The JCR Committee is here to make your time in Downing the best it can be, by running events,
			providing welfare support, and representing your interests to the College.
		</p>
		<div></div>
		<div class="flex gap-4 font-bold">
			<a href="/services" class="btn variant-filled-primary">
				<span>To the Domus</span>
				<i class="fa-solid fa-arrow-right-long" />
			</a>
			<a href="/about" class="btn variant-soft-primary">Learn More</a>
		</div>
	</div>
	<div class="flex items-center justify-center">
		<a
			target="_blank"
			rel="noopener noreferrer"
			href="https://www.dow.cam.ac.uk/"
			class="hidden btn rounded-container-token md:inline-block shadow-2x overflow-hidden cursor-pointer transition-all duration-700"
		>
			<svg
				class="rounded-container-token"
				viewBox="0 0 1200 1200"
				fill="rgba(var(--color-primary-500))"
				width="30rem"
				height="30rem"
			>
				<use xlink:href={logoUrl + '#logoSymbol'} />
			</svg>
		</a>
	</div>
</div>

<style>
	.hero-animate-gradient {
		background-size: 250%;
		-webkit-animation: animatedGradient 10s ease-in-out infinite alternate;
		-moz-animation: animatedGradient 10s ease-in-out infinite alternate;
		animation: animatedGradient 10s ease-in-out infinite alternate;
	}

	@keyframes animatedGradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
