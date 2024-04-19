<script lang="ts">
	import { initialsFromName, officeStore } from '$lib';
	import type { Office } from '$lib/cms.types';
	import OfficePopup from '$lib/components/Popup/officePopup.svelte';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let office: Office | undefined = undefined;
	export let officeTitle: string | undefined = undefined;
	export let width: string;

	$: office = office || $officeStore.find((o) => o.title === officeTitle);
</script>

{#if office}
	<OfficePopup officeTitle={office.title}>
		{#if office.officers}
			{#each office.officers as o (o.name)}
				<Avatar
					src={o.img}
					{width}
					rounded="rounded-full"
					initials={initialsFromName(o.name).slice(0, 2)}
				/>
			{/each}
		{:else}
			<Avatar
				{width}
				rounded="rounded-full"
				initials={initialsFromName(office.title).slice(0, 2)}
			/>
		{/if}
	</OfficePopup>
{:else}
	<Avatar {width} rounded="rounded-full" initials="?" />
{/if}
