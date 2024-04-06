<script>
	import { page } from '$app/stores';
	import Sacha from '$lib/assets/404-hedgehog.jpg';
</script>

<div class="bg-slate-50">
	<div class="absolute m-auto bottom-0 md:h-screen h-[50vh]">
		<img src={Sacha} alt="Sacha the hedgehog" class="object-cover h-full" />
	</div>
	<div class="w-full my-auto box-border relative">
		<div class="h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center">
			<div></div>
			<div
				class="order-last md:card p-10 !bg-slate-50 mx-auto lg:my-24 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
			>
				<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px] font-bold">
					<span
						class="bg-gradient-to-r from-primary-900 via-primary-500 to-primary-800 dark:from-primary-500 dark:via-primary-300 dark:to-primary-500 text-transparent bg-clip-text oops-animate-gradient"
						>Oops!</span
					>
				</h1>
				<p class="!text-xl max-w-[475px]">
					Sacha is sad because she couldn't find what you were looking for. Instead she found the
					message: “<span class="font-mono opacity-50">{$page.status}: {$page.error?.message}</span
					>”
				</p>
				<div></div>
				<div class="flex gap-4 font-bold">
					<a
						href="/"
						class="btn bg-primary-900 dark:variant-filled-primary text-[rgb(var(--on-primary))]"
					>
						<span>Back to Domus</span>
						<i class="fa-solid fa-arrow-right-long" />
					</a>
					<!-- <a href="/about" class="btn variant-soft-primary dark:variant-ghost-surface">Learn More</a> -->
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.oops-animate-gradient {
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
