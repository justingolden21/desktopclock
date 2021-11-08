<script>
	import { page, session } from '$app/stores';
	import Icon from './Icon.svelte';
	import Screenfull from 'screenfull';
	import { onMount } from 'svelte';

	import { settings } from './settings.js';
	import { toggleFullscreen } from './Settings.svelte';
	import ThemeButtons from './ThemeButtons.svelte';
	import { setupCasting, castClock, isCastSupported } from './cast.js';
	import { now } from './now.js';

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
</script>

<svelte:window on:mousemove={() => (timeSinceMove = new Date())} />

<header
	class="transition-opacity duration-300 
    {$settings.hideTitlebarWhenIdle && ($now - timeSinceMove) / 1000 > $settings.secondsUntilIdle
		? 'opacity-0'
		: 'opacity-100'}"
>
	<button
		id="menu-btn"
		class="icon-btn float-left  {$settings.alwaysCollapseMenu || isFullscreen ? '' : 'md:hidden'} "
		on:click={() => (navOpen = !navOpen)}
		aria-label={dictionary.labels['Menu']}
	>
		<Icon name={navOpen ? 'close' : 'menu'} class="w-6 h-6" />
	</button>

	<button
		id="main-dark-btn"
		class="dark-btn icon-btn float-left left-16 
        {$settings.alwaysCollapseMenu || isFullscreen ? '' : 'md:left-4'} "
		class:hidden={!$settings.showDarkButton}
		on:click={() => ($settings.darkMode = !$settings.darkMode)}
		aria-label={dictionary.labels['Toggle dark mode']}
		title={dictionary.labels['Toggle dark mode'] + ($settings.keyboardShortcuts ? ' (N)' : '')}
	>
		<Icon name="moon" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<h1 id="title-text">
		{dictionary.pageNames[$page.path.substring(1) || 'home'] || dictionary.error['Error']}
	</h1>

	<button
		id="main-cast-btn"
		class="cast-btn icon-btn float-right"
		class:hidden={!$settings.showCastButton || !castSupported}
		on:click={castClock}
		aria-label={dictionary.labels['Cast clock']}
		title={dictionary.labels['Cast clock']}
	>
		<Icon name="cast" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<button
		id="main-fullscreen-btn"
		class="fullscreen-btn icon-btn float-right"
		class:hidden={!$settings.showFullscreenButton}
		on:click={toggleFullscreen}
		aria-label={dictionary.labels['Toggle fullscreen']}
		title={dictionary.labels['Toggle fullscreen'] + ($settings.keyboardShortcuts ? ' (F)' : '')}
	>
		<Icon name="fullscreen" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<div class="relative mx-auto m-8 mt-24 max-w-3xl z-10" class:hidden={!$settings.showThemeButtons}>
		<ThemeButtons />
	</div>
</header>
