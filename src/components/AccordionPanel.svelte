<script>
	import Icon from './Icon.svelte';

	export let opened = false;
	export let accordionTitle;
</script>

<div class="bg-gray-50 border-b-2 border-gray-200">
	<div>
		<button
			class="w-full text-left cursor-pointer p-2 hover:bg-gray-100 font-bold text-lg dark:hover:bg-gray-600"
			on:click={() => (opened = !opened)}
			aria-expanded={opened}
		>
			<Icon name="chevron-right" class="inline w-6 h-6 {opened ? 'rotate-90' : ''}" />
			{accordionTitle}
		</button>
	</div>
	<div class="p-4 hidden dark:bg-gray-700" class:open={opened}>
		<slot />
	</div>
</div>

<style>
	.open {
		@apply block;
		animation: sweep 0.5s ease-in-out;
	}
</style>
