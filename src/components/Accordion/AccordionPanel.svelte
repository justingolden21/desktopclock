<script>
	import Icon from '../Icon.svelte';

	import { getContext } from 'svelte';

	export let accordionTitle;
	export let key;

	const store = getContext('accordion');
	$: params = {
		open: $store.key === key
	};
	function handleToggle() {
		if (params.open) {
			store.update((s) => Object.assign(s, { key: null }));
		} else {
			store.update((s) => Object.assign(s, { key }));
		}
	}
</script>

<div class="details">
	<div class="summary">
		<button
			class="w-full text-left cursor-pointer p-2 hover:bg-base-100 focus:bg-base-100 font-bold text-lg dark:hover:bg-base-600 dark:focus:bg-base-600 bg-opacity-25 dark:bg-base-700 dark:bg-opacity-50"
			on:click={handleToggle}
			aria-expanded={params.open}>
			<Icon
				name="chevron-right"
				class="inline w-6 h-6 transition-transform {params.open ? 'rotate-90' : ''}"
				aria-hidden="true" />
			{accordionTitle}
		</button>
	</div>
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
