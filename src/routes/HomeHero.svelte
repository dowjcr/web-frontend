<script lang="ts">
	let innerWidth = 0;
	let innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div class="bg-slate-50 dark:bg-surface-800 w-full h-screen box-border relative">
	<div class="h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center">
		<div
			class="p-10 md:pr-10 lg:ml-auto my-24 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
		>
			<h1 class="h1 !text-5xl lg:!text-6xl max-w-[600px] dark:font-bold">
				Bleeding <span
					class="bg-gradient-to-r from-primary-900 via-primary-500 to-primary-800 dark:from-primary-500 dark:via-primary-300 dark:to-primary-500 text-transparent bg-clip-text hero-animate-gradient"
					>magenta</span
				> since 1800
			</h1>
			<p>(NOTE: This text will likely be edited)</p>
			<p class="text-md lg:!text-xl max-w-[475px]">
				The JCR Committee is here to make your time in Downing the best it can be, by running
				events, providing welfare support, and representing your interests to the College.
			</p>
			<div></div>
			<div class="flex gap-4 font-bold">
				<a
					href="/services"
					class="btn bg-primary-900 dark:variant-filled-primary text-[rgb(var(--on-primary))]"
				>
					<span>To the Domus</span>
					<i class="fa-solid fa-arrow-right-long" />
				</a>
				<a href="/about" class="btn variant-soft-primary dark:variant-ghost-surface">Learn More</a>
			</div>
		</div>
		<div class="hidden dark:inline-flex items-center justify-center">
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
					width={innerWidth * 0.35}
					height={innerWidth * 0.35}
				>
					<use xlink:href="/favicon.svg#logoNotInverted" />
				</svg>
			</a>
		</div>
	</div>

	<div class="hidden md:inline-block dark:hidden">
		<svg
			class="bigSvgStyled absolute right-0 bottom-0 fill-primary-900"
			viewBox="0 0 1200 1200"
			width={innerWidth * 0.55}
			height={innerWidth * 0.55}
		>
			<use xlink:href="/favicon.svg#logoInverted" />
		</svg>
	</div>
</div>

<style>
	/* .bigSvgStyled {
		filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7))
			drop-shadow(-3px -3px 2px rgba(255, 255, 255, 0.7));
	} */
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
