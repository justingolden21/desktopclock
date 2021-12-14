<script>
	// https://dev.to/danawoodman/svelte-quick-tip-creating-a-toast-notification-system-ge3

	import { session } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import Icon from '../Icon.svelte';

	const dispatch = createEventDispatcher();

	export let type = 'info';
	export let dismissible = true;
	export let timeout;
</script>

<article class="toast" role="alert" transition:fade>
	<Icon name={type} class="inline w-6 h-6" />

	<div class="ml-4 font-bold">
		<slot />
	</div>

	{#if dismissible}
		<button
			class="ml-auto"
			aria-label={$session.languageDictionary.labels['Close']}
			on:click={() => dispatch('dismiss')}
		>
			<Icon name="close" class="inline w-6 h-6" />
		</button>
	{/if}
	{#if timeout}
		<div class="progress" style="animation-duration: {timeout / 1000}s" />
	{/if}
</article>

<style lang="postcss">
	.toast {
		@apply w-80 p-4;
		display: flex;
		align-items: center;
		margin: 0 auto 0.5rem auto;
		/* copied from modal */
		@apply border-2 border-gray-300 bg-gray-100 bg-opacity-75;
		backdrop-filter: blur(4px);
	}
	:global(body.dark) .toast {
		/* copied from modal */
		@apply border-gray-200 bg-gray-800 bg-opacity-75;
	}
	.progress {
		@apply absolute bottom-0 left-0 h-1 bg-gray-600;
		animation-timing-function: linear;
		animation-name: shrink;
	}
	:global(body.dark) .progress {
		@apply bg-gray-200;
	}

	@keyframes shrink {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}
</style>
