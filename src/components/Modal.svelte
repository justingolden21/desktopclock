<script>
	import { session } from '$app/stores';
	// import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	import Icon from './Icon.svelte';

	export let title;
	export let icon;

	let shown = false;
	export function show() {
		shown = true;
	}
	export function hide() {
		shown = false;
	}
	export function toggle() {
		shown = !shown;
	}

	let modalContent;
	// let modalContent, focusableContent, firstFocusableElement, lastFocusableElement;

	// onMount(() => {
	// 	// focusable elements
	// 	focusableContent = modalContent.querySelectorAll(
	// 		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	// 	);
	// 	firstFocusableElement = focusableContent[0];
	// 	lastFocusableElement = focusableContent[focusableContent.length - 1];

	// 	console.log(modalContent);
	// 	console.log(focusableContent);
	// 	console.log(firstFocusableElement);
	// 	console.log(lastFocusableElement);
	// });
</script>

<svelte:window
	on:keydown={(e) => {
		// TODO: only hide the topmost modal?
		if (e.key == 'Escape') {
			hide();
		}

		// trap focus inside modal
		if (modalContent && e.key === 'Tab') {
			const nodes = modalContent.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((node) => node.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			console.log(tabbable);
			console.log(index);

			tabbable[index].focus();
			e.preventDefault();
		}

		// https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700

		// if (e.key === 'Tab') {
		// 	if (e.shiftKey) {
		// 		// shift + tab
		// 		if (document.activeElement === firstFocusableElement) {
		// 			lastFocusableElement.focus();
		// 			e.preventDefault();
		// 		}
		// 	} else {
		// 		// tab
		// 		if (document.activeElement === lastFocusableElement) {
		// 			firstFocusableElement.focus();
		// 			e.preventDefault();
		// 		}
		// 	}
		// }
	}} />

{#if shown}
	<div class="modal {shown ? 'block' : 'hidden'}" on:click={() => hide()}>
		<div
			class="modal-content"
			aria-modal="true"
			role="dialog"
			in:fly={{ y: 200, duration: 250 }}
			out:fade={{ duration: 250 }}
			on:click|stopPropagation
			bind:this={modalContent}>
			<div class="modal-header">
				<button
					autofocus
					class="close icon-btn"
					on:click={() => hide()}
					aria-label={$session.languageDictionary.labels['Close']}>
					<Icon name="close" class="w-6 h-6" />
				</button>
				<h1><Icon name={icon} class="w-6 h-6 inline mr-2" /> {title}</h1>
			</div>
			<div class="modal-body">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.modal {
		@apply xs:p-3 sm:p-6 md:p-12 fixed left-0 top-0 w-full h-full bg-base-300 bg-opacity-75 z-20;
	}
	.modal-content {
		@apply flex flex-col max-h-full p-2 xs:p-8 xs:pt-4 relative m-auto w-full md:w-3/4 border-2 border-base-200 bg-base-100 bg-opacity-75 backdrop-blur-sm;
		/* animation: animateTop 0.25s; */
		/* -webkit-animation: animateTop 0.25s; */
	}
	.modal button.close {
		@apply z-30 float-right mt-2;
	}
	.modal h1 {
		@apply text-left mt-4;
	}
	.modal-header {
		@apply border-b-2 border-base-300 pb-4;
	}
	.modal-body {
		@apply text-left relative flex-1 overflow-auto;
	}

	:global(.dark) .modal {
		@apply bg-base-700 bg-opacity-75;
	}
	:global(.dark) .modal-content {
		@apply border-base-200 bg-base-800 bg-opacity-75;
	}
	:global(.dark) .modal-header {
		@apply border-base-200;
	}

	/* @keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	}
	@-webkit-keyframes animateTop {
		from {
			top: -240px;
			opacity: 0;
		}
		to {
			top: 0;
			opacity: 1;
		}
	} */
</style>
