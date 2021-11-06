<script>
	import Icon from './Icon.svelte';

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
			class="w-full text-left cursor-pointer p-2 hover:bg-gray-100 font-bold text-lg dark:hover:bg-gray-600 bg-opacity-50 dark:bg-gray-700"
			on:click={handleToggle}
			aria-expanded={params.open}
		>
			<Icon
				name="chevron-right"
				class="inline w-6 h-6 transition-transform {params.open ? 'rotate-90' : ''}"
				aria-hidden="true"
			/>
			{accordionTitle}
		</button>
	</div>
	<div class="details-content" class:open={params.open}>
		<slot />
	</div>
</div>

<style lang="postcss">
	.details {
		@apply bg-gray-50 border-b-2 border-gray-200;
	}
	.details .details-content {
		@apply p-4 hidden dark:bg-gray-700;
	}
	.details-content.open {
		@apply block;
		animation: sweep 0.5s ease-in-out;
	}
</style>
