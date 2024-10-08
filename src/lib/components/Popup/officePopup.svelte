<script lang="ts">
	import { initialsFromName, officeStore, pathFromText } from '$lib';
	import { popup, type PopupSettings } from '$lib/components/Popup';
	import { Avatar, clipboard, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import AvatarIcon from '../AvatarIcon.svelte';
	import BoldedOfficerNames from '../BoldedOfficerNames.svelte';

	export let officeTitle = '';
	export let href = '/jcr/committee' + pathFromText(officeTitle, '#');
	export let target = 'popupHover-' + (Math.random() * 10e15).toString(16);
	export let anchorClass = '';

	const toastStore = getToastStore();
	const popupHover: PopupSettings = {
		placement: 'bottom-start',
		event: 'hover2boogaloo',
		target,
		closeQuery: ''
	};
	$: office = $officeStore.find((x) => x.title === officeTitle);
	let emailToast: ToastSettings;
	$: emailToast = {
		// message: `${office?.email || 'Email'} copied to clipboard`,
		message: 'Email copied to clipboard',
		background: 'variant-glass-primary',
		timeout: 2000,
		hideDismiss: true,
		classes: 'font-mono'
	};
</script>

<a
	{href}
	rel="noreferrer"
	use:popup={popupHover}
	class={'[&>*]:pointer-events-none' + ' ' + anchorClass}
>
	<slot />
</a>
{#if office}
	<!-- https://www.skeleton.dev/utilities/popups#avoiding-style-conflicts -->
	<div data-popup={popupHover.target} class="z-50">
		<div class="arrow bg-slate-50 dark:bg-surface-800" />
		<slot name="hover-content">
			<div
				class="card space-y-2 p-3 shadow-lg rounded-lg w-max overflow-hidden bg-slate-50 dark:bg-surface-800"
			>
				{#if office.officers}
					<header class="card-header !p-0 flex items-center">
						<a {href} rel="noreferrer">
							<AvatarIcon officeTitle={office.title} width="w-12" />
						</a>
					</header>
					<section>
						<a {href} rel="noreferrer">
							<h1 class="text-sm">
								<BoldedOfficerNames officers={office.officers} />
								<br />
								<span class="text-sm font-heading italic opacity-50"
									>{office.officers && office.officers.length > 1 && !office.title.endsWith('s')
										? office.title + 's'
										: office.title}
								</span>
							</h1>
						</a>
					</section>
				{:else}
					<section>
						<h1 class="text-md font-heading">
							{office.title}
						</h1>
					</section>
				{/if}
				<footer class="card-footer !px-0 !pb-0 w-full">
					<button
						class="btn group !m-0 !p-0"
						use:clipboard={office.email}
						on:click={() => toastStore.trigger(emailToast)}
					>
						<i class="group-hover:animate-bounce-bottom fa-regular fa-envelope"></i>
						<span class="text-sm opacity-70 hover:opacity-100 font-mono transition ease-in-out"
							>{office.email}</span
						>
					</button>
				</footer>
			</div>
		</slot>
	</div>
{/if}

<style>
	[data-popup] {
		transition-duration: 0s;
	}
</style>
