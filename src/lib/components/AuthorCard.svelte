<script lang="ts">
	import AvatarIcon from './AvatarIcon.svelte';
	import OfficePopup from './Popup/officePopup.svelte';

	export let officeTitle: string;
	export let authorNames: string | undefined = 'Unknown author';
	export let timestamp: string;
	export let timeText: string = 'Edited at';
</script>

<div class="flex space-x-4 text-token">
	<div class="flex items-center">
		<AvatarIcon {officeTitle} width="w-12 my-auto" />
	</div>
	<div class="grow flex flex-col justify-center items-start">
		<OfficePopup {officeTitle} anchorClass="hover:underline">
			<p class="text-sm">
				<span class="font-bold">{authorNames || 'Unknown author'}</span>
				· {officeTitle}
			</p>
		</OfficePopup>
		<p class="text-sm">
			{timeText} <span class="font-bold">{timestamp}</span>
		</p>
	</div>
</div>
