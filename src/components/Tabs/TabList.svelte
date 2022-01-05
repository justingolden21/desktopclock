<div class="tab-list">
	<slot />
	<div class="presentation-slider" role="presentation" />
</div>

<style lang="postcss">
	.tab-list {
		@apply mb-8 mx-auto md:sticky md:top-0 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 z-20;
	}

	.presentation-slider {
		@apply absolute bottom-0 left-0 w-full h-0.5 bg-gray-500 hidden md:block origin-top-left transition-transform;
	}

	:global(.dark) .presentation-slider {
		@apply bg-gray-100;
	}
</style>
