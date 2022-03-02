<script>
	import Screenfull from 'screenfull';
	import { onMount } from 'svelte';
	import { page, session } from '$app/stores';
	import Icon from './Icon.svelte';
	import { shareApp } from './Settings.svelte';
	import { settings } from './settings.js';
	import { installButtonClick, showInstallButton } from '../util/install.js';

	export let navOpen;
	export let settingsModal = null;

	// similar to header
	let isFullscreen;
	onMount(() => {
		isFullscreen = Screenfull.isFullscreen;
		Screenfull.on('change', () => (isFullscreen = Screenfull.isFullscreen));
	});

	$: dictionary = $session.languageDictionary;
</script>

<nav
	class="
        min-h-screen
        p-8
        pt-20
        absolute
        left-0
        transition-all
        duration-200
        ease-in-out
        z-20
        surface-thin
        border-0
        border-r-2
        border-base-200
        dark:bg-base-800
        dark:bg-opacity-75
        {$settings.alwaysCollapseMenu || isFullscreen ? '' : 'md:relative md:translate-x-0'}
        {$settings.smallerMenu ? 'w-32' : 'w-72'}"
	class:-translate-x-full={!navOpen}>
	<a
		class:active={$page.path === '/'}
		href="/"
		class="inline-flex {$settings.smallerMenu ? '' : 'w-full'}">
		<Icon name="clock" class="w-6 h-6 inline {$settings.smallerMenu ? '' : 'mr-3'}" />
		{#if !$settings.smallerMenu}
			{dictionary.pageNames['clock']}
		{/if}
	</a>
	<a
		class:active={$page.path === '/worldclock'}
		href="/worldclock"
		class="inline-flex {$settings.smallerMenu ? '' : 'w-full'}">
		<Icon name="worldclock" class="w-6 h-6 inline {$settings.smallerMenu ? '' : 'mr-3'}" />
		{#if !$settings.smallerMenu}
			{dictionary.pageNames['worldclock']}
		{/if}
	</a>
	<!-- <a
		class:active={$page.path === '/stopwatch'}
		href="/stopwatch"
		class="inline-flex {$settings.smallerMenu ? '' : 'w-full'}">
		<Icon name="stopwatch" class="w-6 h-6 inline {$settings.smallerMenu ? '' : 'mr-3'}" />
		{#if !$settings.smallerMenu}
			{dictionary.pageNames['stopwatch']}
		{/if}
	</a>
	<a
		class:active={$page.path === '/timers'}
		href="/timers"
		class="inline-flex {$settings.smallerMenu ? '' : 'w-full'}">
		<Icon name="timer" class="w-6 h-6 inline {$settings.smallerMenu ? '' : 'mr-3'}" />
		{#if !$settings.smallerMenu}
			{dictionary.pageNames['timers']}
		{/if}
	</a> -->
	{#if ['/', '/worldclock', '/stopwatch', '/timers'].includes($page.path)}
		<button
			class="inline-flex {$settings.smallerMenu ? '' : 'w-full'}"
			on:click={() => {
				navOpen = false;
				settingsModal.show();
			}}>
			<Icon name="settings" class="w-6 h-6 inline {$settings.smallerMenu ? '' : 'mr-3'}" />
			{#if !$settings.smallerMenu}
				{dictionary.labels['Settings']}
			{/if}
		</button>
	{/if}
	<div id="nav-bottom" class="mb-8">
		{#if $showInstallButton}
			<button
				on:click={installButtonClick}
				class="inline-flex {$settings.smallerMenu ? '' : 'w-full'}">
				<Icon name="download" class="w-6 h-6 inline {$settings.smallerMenu ? '' : 'mr-3'}" />
				{#if !$settings.smallerMenu}
					{$session.languageDictionary.labels['Install']}
				{/if}
			</button>
		{/if}

		<!-- no share-btn class so it isn't animated on hover -->
		<button
			class="inline-flex {$settings.smallerMenu ? '' : 'w-full'}"
			on:click={() => shareApp(dictionary)}>
			<Icon name="share" class="w-6 h-6 inline {$settings.smallerMenu ? '' : 'mr-3'}" />
			{#if !$settings.smallerMenu}
				{dictionary.labels['Share']}
			{/if}
		</button>
	</div>
</nav>

<style lang="postcss">
	@media (min-height: 640px) {
		#nav-bottom {
			@apply absolute bottom-0;
		}
	}

	/* notes
    nav links and icon btns have same hover colors (both normal and dark)
    nav and modal have same bg colors, opacities, and shadows
    */
	nav a,
	nav button {
		@apply block font-normal text-base-700 p-4 hover:bg-base-200 hover:bg-opacity-50 cursor-pointer tracking-widest text-left;
		/* transition: all 0.25s linear; */
	}
	nav a:hover,
	nav button:hover {
		/* bugfix */
		text-decoration: none;
	}
	nav a.active {
		@apply bg-base-200 bg-opacity-50 font-bold;
	}
	.dark nav a,
	.dark nav button {
		@apply text-base-300;
	}
	.dark nav a:hover,
	.dark nav a.active,
	.dark nav button:hover {
		@apply bg-base-600 bg-opacity-50;
	}
</style>
