<script>
	import { session } from '$app/stores';

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
</script>

<svelte:window
	on:keydown={(e) => {
		// TODO: only hide the topmost modal?
		if (e.key == 'Escape') {
			hide();
		}
	}} />

<div class="modal {shown ? 'block' : 'hidden'}" on:click={() => hide()}>
	<div class="modal-content surface rounded" on:click|stopPropagation>
		<div class="modal-header">
			<button
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

<style lang="postcss">
	.modal {
		@apply xs:p-3 sm:p-6 md:p-12 fixed left-0 top-0 w-full h-full bg-base-300 bg-opacity-75 z-20;
	}
	.modal-content {
		@apply flex flex-col max-h-full p-2 xs:p-8 xs:pt-4 relative m-auto w-full md:w-3/4;
		animation: animateTop 0.25s;
		-webkit-animation: animateTop 0.25s;
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
	:global(.dark) .modal-header {
		@apply border-base-200;
	}

	@keyframes animateTop {
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
	}
</style>
