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

<style lang="postcss">
	.tab {
		@apply font-normal px-4 py-2 sm:py-4 w-full justify-center mx-auto border-b-2 md:inline-flex items-center leading-none border-base-300 text-base-500 hover:text-base-700 hover:bg-base-100 cursor-pointer rounded-none;
	}
	.tab.selected {
		@apply bg-base-100 text-base-500 border-base-500 md:border-base-300;
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

	:global(.dark) .tab {
		@apply bg-base-700 text-base-300 hover:bg-base-600 hover:text-base-300;
	}
	:global(.dark) .tab.selected {
		@apply bg-base-600;
	}
</style>
