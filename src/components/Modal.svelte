<script>
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
</script>

<svelte:window
	on:keydown={(e) => {
		// TODO: only hide the topmost modal?
		if (e.key == 'Escape') {
			hide();
		}
	}}
/>

{#if shown}
	<div class="modal" on:click={() => hide()}>
		<div class="modal-content" on:click|stopPropagation>
			<div class="modal-header">
				<button class="close icon-btn" on:click={() => hide()}>
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

<style>
	.modal {
		@apply p-12 fixed left-0 top-0 block w-full h-full bg-gray-300 bg-opacity-75;
		z-index: 3;
	}
	.modal-content {
		@apply flex flex-col h-full border-2 border-gray-300 bg-gray-100 p-2 xs:p-8 xs:pt-4 relative m-auto w-full md:w-3/4 bg-opacity-75;
		backdrop-filter: blur(4px);
		animation: animateTop 0.25s;
		-webkit-animation: animateTop 0.25s;
	}
	.modal button.close {
		@apply z-30 float-right;
	}
	.modal h1 {
		@apply text-left mt-4;
	}
	.modal-header {
		@apply mb-4 border-b-2 border-gray-300 pb-9;
	}
	.modal-body {
		@apply text-left relative flex-1 overflow-auto;
	}
	.modal-body p {
		@apply text-base sm:text-lg md:text-xl;
	}
	.modal-body h3 {
		@apply font-bold my-2 md:my-4;
	}

	:global(body.dark) .modal {
		@apply bg-gray-700 bg-opacity-75;
	}
	:global(body.dark) .modal-content {
		@apply border-gray-200 bg-gray-800 bg-opacity-75;
	}
	:global(body.dark) .modal-header {
		@apply border-gray-200;
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
