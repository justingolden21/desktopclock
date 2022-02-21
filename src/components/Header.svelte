<script>
	import { page, session } from '$app/stores';
	import Icon from './Icon.svelte';
	import Screenfull from 'screenfull';
	import { onMount } from 'svelte';

	import { settings } from './settings.js';
	import { toggleFullscreen } from './Settings.svelte';
	import { setupCasting, castClock, isCastSupported } from '../util/cast.js';
	import { now } from '../util/now.js';

	export let navOpen;

	$: dictionary = $session.languageDictionary;

	const castSupported = isCastSupported();

	let timeSinceMove = new Date();
	$: if ($session) timeSinceMove = new Date();

	onMount(setupCasting);

	// Minor bug: user has hideTitlebarWhenIdle off, then enters fullscreen, then turns it on, then leavews fullscreen, the setting will be turned off
	// Fix: when the user changes the setting in fullscreen, update oldHideTitlebarWhenIdle

	let isFullscreen;
	let oldHideTitlebarWhenIdle;
	onMount(() => {
		isFullscreen = Screenfull.isFullscreen;

		Screenfull.on('change', () => {
			if (Screenfull.isFullscreen) {
				oldHideTitlebarWhenIdle = $settings.hideTitlebarWhenIdle;
				$settings.hideTitlebarWhenIdle = true;
			} else {
				$settings.hideTitlebarWhenIdle = oldHideTitlebarWhenIdle;
			}

			timeSinceMove = Screenfull.isFullscreen ? new Date(0) : timeSinceMove;
			isFullscreen = Screenfull.isFullscreen;
		});
	});

	function togglePrimaryDisplay() {
		// copied from KeyboardShortcuts.svelte
		const options = ['analog', 'time', 'date', 'datetime'];
		$settings.clock.displays.primary =
			options[(options.indexOf($settings.clock.displays.primary) + 1) % options.length];
	}
	function toggleSecondaryDisplay() {
		const options = ['time', 'date', 'datetime', 'none'];
		$settings.clock.displays.secondary =
			options[(options.indexOf($settings.clock.displays.secondary) + 1) % options.length];
	}
</script>

<svelte:window on:mousemove={() => (timeSinceMove = new Date())} />

<!-- Cover the page in a div with `cursor-none` that only appears when idle
to hide the cursor when idle -->
<div
	class="fixed left-0 top-0 w-full h-full z-30 {$settings.hideTitlebarWhenIdle &&
	($now - timeSinceMove) / 1000 > $settings.secondsUntilIdle
		? 'cursor-none'
		: 'hidden'}" />

<header
	class="transition-opacity duration-300 
    {$settings.hideTitlebarWhenIdle && ($now - timeSinceMove) / 1000 > $settings.secondsUntilIdle
		? 'opacity-0'
		: 'opacity-100 supershort:opacity-0'}">
	<button
		class="icon-btn float-left absolute top-4 left-4 z-20 {$settings.alwaysCollapseMenu ||
		isFullscreen
			? ''
			: 'md:hidden'}"
		on:click={() => (navOpen = !navOpen)}
		aria-label={dictionary.labels['Menu']}>
		<Icon name={navOpen ? 'close' : 'menu'} class="md:w-8 md:h-8 w-6 h-6" />
	</button>

	<button
		class="dark-btn icon-btn float-left left-20 absolute top-4 z-10
        {$settings.alwaysCollapseMenu || isFullscreen ? '' : 'md:left-4'}"
		class:hidden={!$settings.showDarkButton}
		on:click={() => ($settings.darkMode = !$settings.darkMode)}
		aria-label={dictionary.labels['Toggle dark mode']}
		title={dictionary.labels['Toggle dark mode'] + ($settings.keyboardShortcuts ? ' (N)' : '')}>
		<Icon name="moon" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<button
		class="icon-btn float-left left-36 absolute top-4 z-10 
        {$settings.alwaysCollapseMenu || isFullscreen ? '' : 'md:left-20'}"
		class:hidden={!$settings.showPrimaryButton}
		on:click={togglePrimaryDisplay}
		aria-label={dictionary.labels['Toggle primary display']}
		title={dictionary.labels['Toggle primary display'] +
			($settings.keyboardShortcuts ? ' (P)' : '')}>
		<Icon name="primary" class="w-6 h-6 md:w-8 md:h-8" />
	</button>
	<button
		class="icon-btn float-left left-52 absolute top-4 z-10 
        {$settings.alwaysCollapseMenu || isFullscreen ? '' : 'md:left-36'}"
		class:hidden={!$settings.showSecondaryButton}
		on:click={toggleSecondaryDisplay}
		aria-label={dictionary.labels['Toggle secondary display']}
		title={dictionary.labels['Toggle secondary display'] +
			($settings.keyboardShortcuts ? ' (D)' : '')}>
		<Icon name="secondary" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<h1 class="hidden sm:block mx-auto inset-x-1/2 font-normal">
		{dictionary.pageNames[$page.path.substring(1) || 'home'] || dictionary.error['Error']}
	</h1>

	<button
		class="cast-btn icon-btn float-right absolute top-4 right-20 z-10"
		class:hidden={!$settings.showCastButton || !castSupported}
		on:click={castClock}
		aria-label={dictionary.labels['Cast clock']}
		title={dictionary.labels['Cast clock']}>
		<Icon name="cast" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<button
		class="fullscreen-btn icon-btn float-right absolute top-4 right-4 z-10"
		class:hidden={!$settings.showFullscreenButton}
		on:click={toggleFullscreen}
		aria-label={dictionary.labels['Toggle fullscreen']}
		title={dictionary.labels['Toggle fullscreen'] + ($settings.keyboardShortcuts ? ' (F)' : '')}>
		<Icon name="fullscreen" class="w-6 h-6 md:w-8 md:h-8" />
	</button>
</header>
