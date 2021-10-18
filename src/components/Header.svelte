<script>
	import { page, session } from '$app/stores';
	import Icon from './Icon.svelte';
	import { onMount } from 'svelte';

	import { toggleFullscreen } from './Settings.svelte';
	import { setupCasting, castClock } from './cast.js';
	import { now } from './now.js';

	export let navOpen;

	let timeSinceMove = new Date();
	$: if ($session) timeSinceMove = new Date();

	onMount(setupCasting);
</script>

<svelte:window on:mousemove={() => (timeSinceMove = new Date())} />

<header
	class="flex-1 relative transition-opacity duration-300 
    {$session.settings.hideTitlebarWhenIdle &&
	($now - timeSinceMove) / 1000 > $session.settings.secondsUntilIdle
		? 'opacity-0'
		: 'opacity-100'}"
>
	<button
		id="menu-btn"
		class="icon-btn float-left  {$session.settings.alwaysCollapseMenu ? '' : 'md:hidden'} "
		on:click={() => (navOpen = !navOpen)}
		aria-label="Menu"
	>
		<Icon name={navOpen ? 'close' : 'menu'} class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<button
		id="main-dark-btn"
		class="dark-btn icon-btn float-left left-16 
        {$session.settings.alwaysCollapseMenu ? '' : 'md:left-4'} "
		class:hidden={!$session.settings.showDarkButton}
		on:click={() => ($session.settings.darkMode = !$session.settings.darkMode)}
		aria-label="Toggle Dark Mode"
	>
		<Icon name="moon" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<h1 id="title-text">
		{$session.languageDictionary.pageNames[$page.path.substring(1) || 'clock'] ||
			$session.languageDictionary.pageNames.error}
	</h1>

	<button
		id="main-cast-btn"
		class="cast-btn icon-btn float-right"
		class:hidden={!$session.settings.showCastButton}
		on:click={castClock}
		aria-label="Cast / Present Clock"
	>
		<Icon name="external-link" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<button
		id="main-fullscreen-btn"
		class="fullscreen-btn icon-btn float-right"
		class:hidden={!$session.settings.showFullscreenButton}
		on:click={toggleFullscreen}
		aria-label="Toggle Fullscreen"
	>
		<Icon name="fullscreen" class="w-6 h-6 md:w-8 md:h-8" />
	</button>
</header>
