<script lang="ts">
	import { officeStore } from '$lib';
	import type { Officer } from '$lib/cms.types';

	export let names: string[] = [];
	export let officers: Officer[] = [];
	export let officeTitle: string = '';

	$: foundOfficers =
		names.map((name) => ({ name })).concat(officers) ||
		$officeStore.find((o) => o.title === officeTitle)?.officers;
</script>

{#if foundOfficers.length > 1}
	{#each foundOfficers.slice(0, -1) as o, idx (o.name)}
		<span class="font-bold">{o.name}</span>
		{#if idx < foundOfficers.length - 2}<span>, </span>{/if}
	{/each}
{/if}
{#if foundOfficers.length > 1}
	<span>and</span>
{/if}
<span class="font-bold">{foundOfficers[foundOfficers.length - 1]?.name || ''}</span>
