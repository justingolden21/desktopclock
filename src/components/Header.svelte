<script>
	import { page, session } from '$app/stores';
	import Icon from './Icon.svelte';
	import { onMount } from 'svelte';

	import { settings } from './settings.js';
	import { toggleFullscreen } from './Settings.svelte';
	import { setupCasting, castClock } from './cast.js';
	import { now } from './now.js';

	export let navOpen;

	$: dictionary = $session.languageDictionary;

	let timeSinceMove = new Date();
	$: if ($session) timeSinceMove = new Date();

	onMount(setupCasting);
</script>

<svelte:window on:mousemove={() => (timeSinceMove = new Date())} />

<header
	class="flex-1 relative transition-opacity duration-300 
    {$settings.hideTitlebarWhenIdle && ($now - timeSinceMove) / 1000 > $settings.secondsUntilIdle
		? 'opacity-0'
		: 'opacity-100'}"
>
	<button
		id="menu-btn"
		class="icon-btn float-left  {$settings.alwaysCollapseMenu ? '' : 'md:hidden'} "
		on:click={() => (navOpen = !navOpen)}
		aria-label={dictionary.labels['Menu']}
	>
		<Icon name={navOpen ? 'close' : 'menu'} class="w-6 h-6" />
	</button>

	<button
		id="main-dark-btn"
		class="dark-btn icon-btn float-left left-16 
        {$settings.alwaysCollapseMenu ? '' : 'md:left-4'} "
		class:hidden={!$settings.showDarkButton}
		on:click={() => ($settings.darkMode = !$settings.darkMode)}
		aria-label={dictionary.labels['Toggle dark mode']}
	>
		<Icon name="moon" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<h1 id="title-text">
		{dictionary.pageNames[$page.path.substring(1) || 'home'] || dictionary.error['Error']}
	</h1>

	<button
		id="main-cast-btn"
		class="cast-btn icon-btn float-right"
		class:hidden={!$settings.showCastButton}
		on:click={castClock}
		aria-label={dictionary.labels['Cast clock']}
	>
		<Icon name="cast" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<button
		id="main-fullscreen-btn"
		class="fullscreen-btn icon-btn float-right"
		class:hidden={!$settings.showFullscreenButton}
		on:click={toggleFullscreen}
		aria-label={dictionary.labels['Toggle fullscreen']}
	>
		<Icon name="fullscreen" class="w-6 h-6 md:w-8 md:h-8" />
	</button>
</header>
