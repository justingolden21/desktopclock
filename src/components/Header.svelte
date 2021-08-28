<script>
	import { page, session } from '$app/stores';
	import Icon from './Icon.svelte';

	import { toggleFullscreen } from './Settings.svelte';

	export let navOpen;
</script>

<header class="flex-1 relative">
	<button id="menu-btn" class="icon-btn float-left md:hidden" on:click={() => (navOpen = !navOpen)}>
		<Icon name={navOpen ? 'close' : 'menu'} class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<button
		id="main-dark-btn"
		class="dark-btn icon-btn float-left"
		on:click={() => ($session.settings.darkMode = !$session.settings.darkMode)}
	>
		<Icon name="moon" class="w-6 h-6 md:w-8 md:h-8" />
	</button>

	<h1 id="title-text">
		{$session.languageDictionary.pageNames[$page.path.substring(1) || 'clock']}
	</h1>

	<button
		id="main-fullscreen-btn"
		class="fullscreen-btn icon-btn float-right"
		on:click={toggleFullscreen}
	>
		<Icon name="fullscreen" class="w-6 h-6 md:w-8 md:h-8" />
	</button>
</header>
