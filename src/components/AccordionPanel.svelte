<script>
	import Icon from './Icon.svelte';

	export let opened = false;
	export let accordionTitle;
</script>

<div class="details">
	<div class="summary">
		<button
			class="w-full text-left cursor-pointer p-2 hover:bg-gray-100 font-bold text-lg dark:hover:bg-gray-600"
			on:click={() => (opened = !opened)}
			aria-expanded={opened}
		>
			<Icon name="chevron-right" class="inline w-6 h-6 {opened ? 'rotate-90' : ''}" />
			{accordionTitle}
		</button>
	</div>
	<div class="details-content" class:open={opened}>
		<slot />
	</div>
</div>

<style>
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

	:global(body.dark) .details {
		@apply bg-gray-700;
	}
	:global(body.dark) .summary {
		@apply hover:bg-gray-600;
	}
</style>
