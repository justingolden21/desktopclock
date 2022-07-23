<script>
	import { getContext } from 'svelte';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';

	/// STATE ///
	export let accordionTitle;
	export let key;
	const store = getContext('accordion');
	$: open = $store.key === key;

	/// EVENT HANDLERS ///
	function handleToggle() {
		$store = { ...$store, key: open ? null : key };
	}
</script>

<div class="details">
	<button class="details__summary" on:click={handleToggle} aria-expanded={open}>
		<Icon
			name="chevron_right"
			class="transition-transform {open ? 'rotate-90' : ''}"
			aria-hidden="true" />
		{accordionTitle}
	</button>

	<div class="details__content" class:open>
		<slot />
	</div>
</div>

<style global>
	:local(.details) {
		@apply bg-base-50 bg-opacity-25 dark:bg-base-700 dark:bg-opacity-25;
	}
	:local(.details):not(:first-child) {
		@apply border-t-2 border-base-200;
	}

	:local(.details__summary) {
		@apply w-full text-left cursor-pointer p-2 hover:bg-base-50 focus:bg-base-50 font-normal text-lg bg-opacity-25 dark:hover:bg-base-600 dark:focus:bg-base-600 dark:bg-base-700 dark:bg-opacity-50;
	}

	:local(.details__content) {
		@apply p-4 hidden;
	}
	:local(.details__content.open) {
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
</style>
