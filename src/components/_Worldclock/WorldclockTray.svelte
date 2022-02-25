<script>
	import Screenfull from 'screenfull';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';

	import { settings } from '../settings.js';
	import Icon from '../Icon.svelte';

	export let newWorldclockModal = null;

	// similar to header
	let isFullscreen;
	onMount(() => {
		isFullscreen = Screenfull.isFullscreen;
		Screenfull.on('change', () => (isFullscreen = Screenfull.isFullscreen));
	});

	$: dictionary = $session.languageDictionary;
</script>

<!-- Similar classes to nav in nav.svelte -->
<nav
	class="
    fixed
    bottom-0
    transition-all
    duration-200
    ease-in-out
    z-20
    surface-thin
    border-0
    border-t-2
    border-base-200
    dark:bg-base-800
    dark:bg-opacity-75
    h-16
    p-2
    grid
    grid-cols-3
    w-full
    {$settings.alwaysCollapseMenu || isFullscreen
		? ''
		: $settings.smallerMenu
		? 'md:ml-32'
		: 'md:ml-72'}
    {$settings.alwaysCollapseMenu || isFullscreen
		? ''
		: $settings.smallerMenu
		? 'md:w-[calc(100%_-_8rem)]'
		: 'md:w-[calc(100%_-_18rem)]'}">
	<button
		class="icon-btn rounded-none bg-transparent mx-auto"
		on:click={() => 0}
		aria-label={dictionary.worldclockSettings['Timetable view']}
		title={dictionary.worldclockSettings['Timetable view']}>
		<Icon name="table" class="inline-block w-8 h-8" />
		<span class="hidden lg:inline">{dictionary.worldclockSettings['Timetable']}</span>
	</button>
	<button
		class="icon-btn rounded-none bg-transparent mx-auto"
		on:click={() => 0}
		aria-label={dictionary.worldclockSettings['Convert timezones']}
		title={dictionary.worldclockSettings['Convert timezones']}>
		<Icon name="switch_horizontal" class="inline-block w-8 h-8" />
		<span class="hidden lg:inline">{dictionary.worldclockSettings['Convert']}</span>
	</button>
	<button
		class="icon-btn rounded-none bg-transparent mx-auto"
		on:click={() => newWorldclockModal.show()}
		aria-label={dictionary.worldclockSettings['New timezone']}
		title={dictionary.worldclockSettings['New timezone']}>
		<Icon name="plus" class="inline-block w-8 h-8" />
		<span class="hidden lg:inline">{dictionary.labels['New']}</span>
	</button>
</nav>
