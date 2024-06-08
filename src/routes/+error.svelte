<script>
	import { page } from '$app/stores';
	import Sacha from '$lib/assets/404-hedgehog.jpg';
	let bgurl = "bg-[url('" + Sacha + "')]"
</script>

<div class="bg-slate-50 dark-bg-surface-900 h-full">
	<div class="w-full h-full my-auto box-border bg-cover relative {bgurl}">
		<div class="grid grid-cols-1 h-full md:grid-cols-2 items-center">
			<div
				class="order-last md:col-start-2 md:card p-10 !bg-slate-50 dark:!bg-surface-900 mx-auto lg:my-24 flex flex-col gap-4 items-center md:items-start text-center md:text-left"
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
