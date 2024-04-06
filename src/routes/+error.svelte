<script>
	import { page } from '$app/stores';
	import Sacha from '$lib/assets/404-hedgehog.jpg';
</script>

<div class="fixed m-auto">
	<img src={Sacha} alt="Sacha the hedgehog" class="w-32 h-32" />
</div>
<div class="bg-none w-full h-screen box-border relative">
	<div class="h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 items-center">
		<div
			class="card p-10 bg-slate-50 mx-auto my-24 flex flex-col items-center md:items-start text-center md:text-left space-y-4"
		>
			<h1 class="h1 !text-5xl md:!text-6xl max-w-[600px] font-bold">
				<span
					class="bg-gradient-to-r from-primary-900 via-primary-500 to-primary-800 dark:from-primary-500 dark:via-primary-300 dark:to-primary-500 text-transparent bg-clip-text hero-animate-gradient"
					>Oops!</span
				>
			</h1>
			<p class="!text-xl max-w-[475px]">
				Sacha is sad because she couldn't find what you were looking for.
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
