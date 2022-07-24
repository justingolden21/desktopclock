<div class="tab-list">
	<slot />
	<div class="presentation-slider" role="presentation" />
</div>

<style global>
	:local(.tab-list) {
		@apply mb-8 mx-auto md:sticky md:top-0 bg-base-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 z-20;
	}

	:local(.presentation-slider) {
		@apply absolute bottom-0 left-0 w-full h-0.5 bg-base-500 dark:bg-base-100 hidden md:block origin-top-left transition-transform;
	}
</style>
