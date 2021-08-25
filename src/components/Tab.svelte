<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<button class:selected={$selectedTab === tab} class="tab" on:click={() => selectTab(tab)}>
	<slot />
</button>

<style>
	.tab {
		@apply px-4 py-2 sm:py-4 w-full justify-center mx-auto border-b-2 md:inline-flex items-center leading-none border-gray-300 text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer;
	}
	.tab.selected {
		@apply bg-gray-100 text-gray-500 border-gray-500 md:border-gray-300;
	}

	.tab:first-child.selected ~ :global(.presentation-slider) {
		transform: translateX(0) scaleX(0.25);
	}
	.tab:nth-child(2).selected ~ :global(.presentation-slider) {
		transform: translateX(25%) scaleX(0.25);
	}
	.tab:nth-child(3).selected ~ :global(.presentation-slider) {
		transform: translateX(50%) scaleX(0.25);
	}
	.tab:nth-child(4).selected ~ :global(.presentation-slider) {
		transform: translateX(75%) scaleX(0.25);
	}

	:global(body.dark) .tab {
		@apply bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-gray-300;
	}
	:global(body.dark) .tab.selected {
		@apply bg-gray-600;
	}
</style>
