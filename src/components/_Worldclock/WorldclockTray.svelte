<script>
	import Screenfull from 'screenfull';
	import { onMount } from 'svelte';

	import { settings } from '../settings.js';
	import Icon from '../Icon.svelte';

	// similar to header
	let isFullscreen;
	onMount(() => {
		isFullscreen = Screenfull.isFullscreen;
		Screenfull.on('change', () => (isFullscreen = Screenfull.isFullscreen));
	});

	// by having these strings in the code, these utility classes are generated
	// they are dynamically applied to the nav below
	// in order to make its width the remaining space on the page
	const unused_vars = ['md:w-[calc(100%_-_18rem)]', 'md:w-[calc(100%_-_8rem)]'];
</script>

<!-- Similar classes to nav in nav.svelte -->
<nav
	class="
    p-2
    fixed
    bottom-0
    transition-all
    duration-200
    ease-in-out
    z-20
    surface-thin
    border-0
    border-t-2
    dark:bg-base-800
    dark:bg-opacity-75
    h-16
    grid
    grid-cols-4
    w-full
    {$settings.alwaysCollapseMenu || isFullscreen
		? ''
		: $settings.smallerMenu
		? 'md:ml-32'
		: 'md:ml-72'}
    {$settings.alwaysCollapseMenu || isFullscreen
		? ''
		: 'md:w-[calc(100%_-_' + ($settings.smallerMenu ? 32 / 4 : 72 / 4) + 'rem)]'}">
	<button class="icon-btn mx-auto" on:click={() => 0} aria-label={''} title={''}>
		<Icon name="plus" class="w-8 h-8" />
	</button>
	<button class="icon-btn mx-auto" on:click={() => 0} aria-label={''} title={''}>
		<Icon name="plus" class="w-8 h-8" />
	</button>
	<button class="icon-btn mx-auto" on:click={() => 0} aria-label={''} title={''}>
		<Icon name="plus" class="w-8 h-8" />
	</button>
	<button class="icon-btn mx-auto" on:click={() => 0} aria-label={''} title={''}>
		<Icon name="plus" class="w-8 h-8" />
	</button>
</nav>
