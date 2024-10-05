<script lang="ts">
	import { DateTime } from 'luxon';
	let year = DateTime.now().setZone('Europe/London').year;
</script>

<div class="bg-slate-50 dark:bg-surface-900 border-t border-surface-500/10 text-xs md:text-base">
	<div class="w-full p-3">
		<div></div>
		<section class="flex flex-col justify-center content-center items-center">
			<div class="grid grid-cols-1 gap-2 place-content-center place-items-center">
				<p class="!text-sm opacity-80">© Downing College JCR {year}. All rights reserved.</p>
			</div>
		</section>
	</div>
</div>
