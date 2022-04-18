<script>
	// https://dev.to/danawoodman/svelte-quick-tip-creating-a-toast-notification-system-ge3

	import { session } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	/// COMPONENTS ///
	import Icon from '$lib/icons/Icon.svelte';

	const dispatch = createEventDispatcher();

	/// STATE ///
	export let type = 'info';
	export let dismissible = true;
	export let timeout;
</script>

<div class="w-80 p-4 flex items-center mb-2 mx-auto surface" role="alert" transition:fade>
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
			class="progress-bar absolute bottom-0 left-0 h-1 bg-base-600 dark:bg-base-200"
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
