<script>
	// https://dev.to/danawoodman/svelte-quick-tip-creating-a-toast-notification-system-ge3

	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	export let type = 'info';
	export let dismissible = true;
</script>

<article class="toast" role="alert" transition:fade>
	<Icon name={type} class="inline w-6 h-6" />

	<div class="ml-4 font-bold">
		<slot />
	</div>

	{#if dismissible}
		<button class="ml-auto" on:click={() => dispatch('dismiss')}>
			<Icon name="close" class="inline w-6 h-6" />
		</button>
	{/if}
</article>

<style>
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
</style>
