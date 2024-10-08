<script lang="ts">
	import { initialsFromName, officeStore } from '$lib';
	import type { Office } from '$lib/cms.types';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let office: Office | undefined = undefined;
	export let officeTitle: string | undefined = undefined;
	export let width: string;

	$: office = $officeStore.find((o) => o.title === officeTitle) || office;
</script>

{#if office}
	{#if office.officers}
		<div class="flex items-center">
			{#each office.officers as o (o.name)}
				<div class="first:ml-0 ml-[-1.5rem]">
					<Avatar
						src={o.img}
						border={'border-surface-300-600-token' + (o.img ? '' : ' border-2')}
						{width}
						rounded="rounded-full"
						initials={initialsFromName(o.name).slice(0, 2)}
					/>
					<link rel="preload" as="image" href={o.img} />
				</div>
			{/each}
		</div>
	{:else}
		<Avatar {width} rounded="rounded-full" initials={initialsFromName(office.title).slice(0, 2)} />
	{/if}
{:else}
	<Avatar {width} rounded="rounded-full" initials="?" />
{/if}
