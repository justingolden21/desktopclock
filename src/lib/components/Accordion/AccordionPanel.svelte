<script>
	import { getContext } from 'svelte';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';

	/// STATE ///
	export let accordionTitle;
	export let key;
	const store = getContext('accordion');
	$: params = {
		open: $store.key === key
	};

	/// EVENT HANDLERS ///
	function handleToggle() {
		if (params.open) {
			$store = { ...$store, key: null };
		} else {
			$store = { ...$store, key };
		}
	}
</script>

<div class="details">
	<button
		class="w-full text-left cursor-pointer p-2 hover:bg-base-50 focus:bg-base-100 font-normal text-lg dark:hover:bg-base-600 dark:focus:bg-base-600 bg-opacity-25 dark:bg-base-700 dark:bg-opacity-50"
		on:click={handleToggle}
		aria-expanded={params.open}>
		<Icon
			name="chevron_right"
			class="inline w-6 h-6 transition-transform {params.open ? 'rotate-90' : ''}"
			aria-hidden="true" />
		{accordionTitle}
	</button>

	<div class="details-content" class:open={params.open}>
		<slot />
	</div>
</div>

<style lang="postcss">
	.details {
		@apply bg-base-50 border-b-2 border-base-200 bg-opacity-25;
	}
	.details .details-content {
		@apply p-4 hidden dark:bg-base-700 dark:bg-opacity-50;
	}
	.details-content.open {
		@apply block;
		animation: sweep 0.5s ease-in-out;
	}

	@keyframes sweep {
		0% {
			opacity: 0;
			transform: translateY(-1rem);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* prevent white flash when opening details in dark mode */
	:global(.dark) .details {
		@apply bg-base-700 bg-opacity-25;
	}
</style>
