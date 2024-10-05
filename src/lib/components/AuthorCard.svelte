<script lang="ts">
	import { formatAuthorTimestamp } from '$lib/index';
	import AvatarIcon from './AvatarIcon.svelte';
	import BoldedOfficerNames from './BoldedOfficerNames.svelte';
	import OfficePopup from './Popup/officePopup.svelte';

	export let officeTitle: string;
	export let authorNames: string = 'Unknown author';
	export let timestamp: string;
	export let timeText: string = 'Edited on';

	function splitNamesOnCommasOrAnd(names: string): string[] {
		return names.split(/, | and /);
	}
</script>

<div class="flex space-x-4 text-token">
	<div>
		<OfficePopup {officeTitle} anchorClass="hover:underline">
			<AvatarIcon {officeTitle} width="w-12 my-auto" />
		</OfficePopup>
	</div>
	<div class="grow flex flex-col justify-center items-start">
		<OfficePopup {officeTitle} anchorClass="hover:underline">
			<p class="text-sm">
				<BoldedOfficerNames names={splitNamesOnCommasOrAnd(authorNames)} />
			</p>
		</OfficePopup>
		<p class="text-sm">
			{timeText} <span class="font-bold">{formatAuthorTimestamp(timestamp)}</span>
		</p>
	</div>
</div>
