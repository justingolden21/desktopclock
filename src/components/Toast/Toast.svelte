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

<div
	class="w-80 p-4 flex items-center mb-2 mx-auto border-2 border-gray-300 bg-gray-100 bg-opacity-75 backdrop-blur-sm dark:border-gray-200 dark:bg-gray-800 dark:bg-opacity-75"
	role="alert"
	transition:fade>
	<Icon name={type} class="inline w-6 h-6" />

	<div class="ml-4 font-bold">
		<slot />
	</div>

	{#if dismissible}
		<button
			class="ml-auto"
			aria-label={$session.languageDictionary.labels['Close']}
			on:click={() => dispatch('dismiss')}>
			<Icon name="close" class="inline w-6 h-6" />
		</button>
	{/if}

	{#if timeout}
		<div
			class="progress-bar absolute bottom-0 left-0 h-1 bg-gray-600 dark:bg-gray-200"
			style="animation-duration: {timeout / 1000}s;" />
	{/if}
</div>

<style>
	.progress-bar {
		animation-timing-function: linear;
		animation-name: shrink;
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
