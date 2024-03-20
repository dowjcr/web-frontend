<script lang="ts">
	export let href = '';
	let popupId = (Math.random() * 10e15).toString(16);

	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover-' + popupId,
		closeQuery: ''
	};
</script>

<a
	{href}
	rel="noreferrer"
	class="btn btn-sm variant-ghost-surface [&>*]:pointer-events-none"
	use:popup={popupHover}
>
	<slot>
		<span>(icon)</span>
		<span>Hover</span>
	</slot>
</a>

<!-- https://www.skeleton.dev/utilities/popups#avoiding-style-conflicts -->
<div data-popup={popupHover.target}>
	<div class="card p-4 shadow-xl variant-filled-surface">
		<slot name="hover-content">
			<p>Hover Content</p>
		</slot>
	</div>
</div>

<style>
	[data-popup] {
		transition-duration: 0.05s;
	}
</style>
