import { get, writable, type Writable } from 'svelte/store';
import type { PopupSettings } from './types';

// Use a store to pass the Floating UI import references
export const storePopup: Writable<any> = writable(undefined);

export function popup(triggerNode: HTMLElement, args: PopupSettings) {
	// Floating UI Modules
	const {
		computePosition,
		autoUpdate,
		offset,
		shift,
		flip,
		arrow,
		size,
		autoPlacement,
		hide,
		inline
	} = get(storePopup);
	// Local State
	const popupState = {
		open: false,
		autoUpdateCleanup: () => {}
	};
	const focusableAllowedList =
		':is(a[href], button, input, textarea, select, details, [tabindex]):not([tabindex="-1"])';
	let focusablePopupElements: HTMLElement[];
	const documentationLink = 'https://www.skeleton.dev/utilities/popups';
	// Elements
	let elemPopup: HTMLElement;
	let elemArrow: HTMLElement;

	const setDomElements = (): [HTMLElement, HTMLElement] => {
		elemPopup =
			document.querySelector(`[data-popup="${args.target}"]`) ?? document.createElement('div');
		elemArrow = elemPopup.querySelector(`.arrow`) ?? document.createElement('div');
		return [elemPopup, elemArrow];
	};
	[elemPopup, elemArrow] = setDomElements(); // init

	let popupPlacement: string | null = null;
	// Render Floating UI Popup
	const render = (): void => {
		popupPlacement = args.placement ?? 'bottom';
		// Error handling for required Floating UI modules
		if (!elemPopup) {
			throw new Error(
				`The data-popup="${args.target}" element was not found. ${documentationLink}`
			);
		}
		if (!computePosition) {
			throw new Error(
				`Floating UI 'computePosition' not found for data-popup="${args.target}". ${documentationLink}`
			);
		}
		if (!offset) {
			throw new Error(
				`Floating UI 'offset' not found for data-popup="${args.target}". ${documentationLink}`
			);
		}
		if (!shift) {
			throw new Error(
				`Floating UI 'shift' not found for data-popup="${args.target}". ${documentationLink}`
			);
		}
		if (!flip) {
			throw new Error(
				`Floating UI 'flip' not found for data-popup="${args.target}". ${documentationLink}`
			);
		}
		if (!arrow) {
			throw new Error(
				`Floating UI 'arrow' not found for data-popup="${args.target}". ${documentationLink}`
			);
		}

		// Bundle optional middleware
		const optionalMiddleware = [];
		// https://floating-ui.com/docs/size
		if (size) {
			optionalMiddleware.push(size(args.middleware?.size));
		}
		// https://floating-ui.com/docs/autoPlacement
		if (autoPlacement) {
			optionalMiddleware.push(autoPlacement(args.middleware?.autoPlacement));
		}
		// https://floating-ui.com/docs/hide
		if (hide) {
			optionalMiddleware.push(hide(args.middleware?.hide));
		}
		// https://floating-ui.com/docs/inline
		if (inline) {
			optionalMiddleware.push(inline(args.middleware?.inline));
		}

		// Floating UI Compute Position
		// https://floating-ui.com/docs/computePosition
		computePosition(triggerNode, elemPopup, {
			placement: args.placement ?? 'bottom',
			// Middleware - NOTE: the order matters:
			// https://floating-ui.com/docs/middleware#ordering
			middleware: [
				// https://floating-ui.com/docs/offset
				offset(args.middleware?.offset ?? 8),
				// https://floating-ui.com/docs/shift
				shift(args.middleware?.shift ?? { padding: 8 }),
				// https://floating-ui.com/docs/flip
				flip(args.middleware?.flip),
				// https://floating-ui.com/docs/arrow
				arrow(args.middleware?.arrow ?? { element: elemArrow || null }),
				// Implement optional middleware
				...optionalMiddleware
			]
		}).then(({ x, y, placement, middlewareData }: any) => {
			Object.assign(elemPopup.style, {
				left: `${x}px`,
				top: `${y}px`
			});
			// Handle Arrow Placement:
			// https://floating-ui.com/docs/arrow
			if (elemArrow) {
				const { x: arrowX, y: arrowY } = middlewareData.arrow;
				// @ts-expect-error implicit any
				const staticSide = {
					top: 'bottom',
					right: 'left',
					bottom: 'top',
					left: 'right'
				}[placement.split('-')[0]];
				Object.assign(elemArrow.style, {
					left: arrowX != null ? `${arrowX}px` : '',
					top: arrowY != null ? `${arrowY}px` : '',
					right: '',
					bottom: '',
					[staticSide]: '-4px'
				});
			}
		});
	};

	// State Handlers
	const open = (): void => {
		if (!elemPopup) {
			return;
		}
		// Set open state to on
		popupState.open = true;
		// Return the current state
		if (args.state) {
			args.state({ state: popupState.open });
		}
		// Update render settings
		render();
		// Update the DOM
		elemPopup.style.display = 'block';
		elemPopup.style.opacity = '1';
		elemPopup.style.pointerEvents = 'auto';
		// enable popup interactions
		elemPopup.removeAttribute('inert');
		// Trigger Floating UI autoUpdate (open only)
		// https://floating-ui.com/docs/autoUpdate
		popupState.autoUpdateCleanup = autoUpdate(triggerNode, elemPopup, render);
		// Focus the first focusable element within the popup
		focusablePopupElements = Array.from(elemPopup?.querySelectorAll(focusableAllowedList));
	};
	const close = (callback?: () => void): void => {
		if (!elemPopup) {
			return;
		}
		// Set transition duration
		const cssTransitionDuration =
			parseFloat(window.getComputedStyle(elemPopup).transitionDuration.replace('s', '')) * 1000;
		setTimeout(() => {
			// Set open state to off
			popupState.open = false;
			// Return the current state
			args.state?.({ state: popupState.open });
			// Update the DOM
			elemPopup.style.opacity = '0';
			// disable popup interactions
			elemPopup.setAttribute('inert', '');
			// Cleanup Floating UI autoUpdate (close only)
			popupState.autoUpdateCleanup?.();
			callback?.();
		}, cssTransitionDuration);
	};

	// Event Handlers
	const toggle = (): void => {
		popupState.open === false ? open() : close();
	};
	const onWindowClick = (event: any): void => {
		// Return if the popup is not yet open
		if (popupState.open === false) {
			return;
		}
		// Return if click is the trigger element
		if (triggerNode.contains(event.target)) {
			return;
		}
		// If click it outside the popup
		if (elemPopup && elemPopup.contains(event.target) === false) {
			close();
			return;
		}
		// Handle Close Query State
		const closeQueryString: string =
			args.closeQuery === undefined ? 'a[href], button' : args.closeQuery;
		// Return if no closeQuery is provided
		if (closeQueryString === '') {
			return;
		}
		const closableMenuElements = elemPopup?.querySelectorAll(closeQueryString);
		closableMenuElements?.forEach((elem) => {
			if (elem.contains(event.target)) {
				close();
			}
		});
	};

	// Keyboard Interactions for A11y
	const onWindowKeyDown = (event: KeyboardEvent): void => {
		if (popupState.open === false) {
			return;
		}
		// Handle keys
		const key: string = event.key;
		// On Esc key
		if (key === 'Escape') {
			event.preventDefault();
			triggerNode.focus();
			close();
			return;
		}
		// Update focusable elements (important for Autocomplete)
		focusablePopupElements = Array.from(elemPopup?.querySelectorAll(focusableAllowedList));
		// On Tab or ArrowDown key
		const triggerMenuFocused: boolean = popupState.open && document.activeElement === triggerNode;
		if (
			triggerMenuFocused &&
			(key === 'ArrowDown' || key === 'Tab') &&
			focusableAllowedList.length > 0 &&
			focusablePopupElements.length > 0
		) {
			event.preventDefault();
			focusablePopupElements[0].focus();
		}
	};

	// Note that these do not account for combined args.placement values like 'top-start'
	const triggerToPopupCondition = (e: MouseEvent) => {
		switch (popupPlacement?.split('-')[0]) {
			case 'top':
				return e.pageY + e.offsetY < triggerNode.getBoundingClientRect().top;
			case 'bottom':
				return e.pageY + e.offsetY > triggerNode.getBoundingClientRect().bottom;
			case 'left':
				return e.pageX + e.offsetX < triggerNode.getBoundingClientRect().left;
			case 'right':
				return e.pageX + e.offsetX > triggerNode.getBoundingClientRect().right;
			default:
				return true; // Use true because it helps testing
		}
	};

	const popupToTriggerCondition = (e: MouseEvent) => {
		switch (popupPlacement?.split('-')[0]) {
			case 'top':
				return e.pageY + e.offsetY > elemPopup.getBoundingClientRect().bottom;
			case 'bottom':
				return e.pageY + e.offsetY < elemPopup.getBoundingClientRect().top;
			case 'left':
				return e.pageX + e.offsetX > elemPopup.getBoundingClientRect().right;
			case 'right':
				return e.pageX + e.offsetX < elemPopup.getBoundingClientRect().left;
			default:
				return true;
		}
	};

	let closeTimeout: NodeJS.Timeout;
	const mouseLeaveTriggerHandler = (e: MouseEvent) => {
		if (triggerToPopupCondition(e)) {
			closeTimeout = setTimeout(close, 200); // close only after delay
		} else {
			close();
		}
	};
	const keepPopupOpen = () => {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
		}
		open();
	};
	const mouseLeavePopupHandler = (e: MouseEvent) => {
		if (e.target === elemPopup || !elemPopup.contains(e.target as Node)) {
			if (popupToTriggerCondition(e)) {
				closeTimeout = setTimeout(close, 200); // close only after delay
			} else {
				close();
			}
		}
	};

	// Event Listeners
	switch (args.event) {
		case 'click':
			triggerNode.addEventListener('click', toggle, true);
			window.addEventListener('click', onWindowClick, true);
			break;
		case 'hover':
			triggerNode.addEventListener('mouseover', open, true);
			triggerNode.addEventListener('mouseleave', () => close(), true);
			break;
		case 'hover2boogaloo':
			triggerNode.addEventListener('mouseover', keepPopupOpen, true);
			triggerNode.addEventListener('mouseleave', mouseLeaveTriggerHandler, true);
			elemPopup.addEventListener('mouseover', keepPopupOpen, true);
			// NOTE: not 100% sure why e.target===elemPopup is a valid condition...
			elemPopup.addEventListener('mouseleave', mouseLeavePopupHandler, true);
			break;
		case 'focus-blur':
			triggerNode.addEventListener('focus', toggle, true);
			triggerNode.addEventListener('blur', () => close(), true);
			break;
		case 'focus-click':
			triggerNode.addEventListener('focus', open, true);
			window.addEventListener('click', onWindowClick, true);
			break;
		default:
			throw new Error(`Event value of '${args.event}' is not supported. ${documentationLink}`);
	}
	window.addEventListener('keydown', onWindowKeyDown, true);

	// Render popup on initialization
	render();

	// Lifecycle
	return {
		update(newArgs: PopupSettings) {
			close(() => {
				args = newArgs;
				render();
				setDomElements();
			});
		},
		destroy() {
			triggerNode.removeEventListener('click', toggle, true);
			triggerNode.removeEventListener('mouseover', open, true);
			triggerNode.removeEventListener('mouseleave', () => close(), true);
			triggerNode.removeEventListener('focus', toggle, true);
			triggerNode.removeEventListener('focus', open, true);
			triggerNode.removeEventListener('blur', () => close(), true);
			window.removeEventListener('click', onWindowClick, true);
			window.removeEventListener('keydown', onWindowKeyDown, true);
			triggerNode.removeEventListener('mouseover', open, true);
			triggerNode.removeEventListener('mouseleave', mouseLeaveTriggerHandler, true);
			elemPopup.removeEventListener('mouseover', keepPopupOpen, true);
			elemPopup.removeEventListener('mouseleave', mouseLeaveTriggerHandler, true);
		}
	};
}
