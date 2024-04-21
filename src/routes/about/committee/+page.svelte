<script lang="ts">
	import { officeStore, pathFromText } from '$lib';
	import Sacha from '$lib/assets/404-hedgehog.jpg';
	import OfficePopup from '$lib/components/Popup/officePopup.svelte';
</script>

<div class="w-full p-10 min-h-screen bg-slate-50">
	<div class="flex justify-center p-10">
		<h1 class="h1 font-bold">Meet the Committee</h1>
	</div>

	<div class="container mx-auto px-10">
		<div class="mx-auto md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
			{#each $officeStore as office}
				<div id={pathFromText(office.title)} class="break-inside-auto">
					{#each office.officers || [] as officer}
						<div class="break-inside-avoid-column">
							<img
								src={officer.img || Sacha}
								alt={officer.name}
								class="h-auto min-w-full rounded-lg"
							/>
							<OfficePopup officeTitle={office.title} anchorClass="hover:underline">
								<p class="min-w-full font-heading-token">
									<span class="font-bold">{officer.name}</span>
									<span class="opacity-50"> · {office.title}</span>
								</p>
							</OfficePopup>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
