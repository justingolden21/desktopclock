<script>
	import '../app.postcss';

	import { navigating, session } from '$app/stores';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	import TailwindColors from 'tailwindcss/colors.js';

	import screenfull from 'screenfull';

	import GoogleAnalytics from '../components/GoogleAnalytics.svelte';
	import Modal from '../components/Modal.svelte';
	import Nav from '../components/Nav.svelte';
	import Header from '../components/Header.svelte';
	import Settings from '../components/Settings.svelte';
	import { now } from '../components/now.js';
	import KeyboardShortcuts from '../components/KeyboardShortcuts.svelte';
	import { settings } from '../components/settings.js';

	let settingsModal;

	let navOpen = false;
	$: if ($navigating) navOpen = false;

	function doubleClickFullscreen({ target }) {
		if (!$settings.doubleclickFullscreen) return;
		if (target.tagName === 'BUTTON' || target.parentNode.tagName === 'BUTTON') return;
		if (screenfull.isEnabled) {
			screenfull.toggle();
		}
	}

	// check when session changes
	// also check that browser exists so we can reference document
	// toggle dark class based on setting
	$: if ($session && browser)
		$settings.darkMode
			? document.body.classList.add('dark')
			: document.body.classList.remove('dark');

	onMount(() => {
		// auto detect user device preferences
		if ($settings.darkMode === null) {
			$settings.darkMode = !!window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		if ($settings.locale.timezone === null) {
			$settings.locale.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		}

		if ($settings.locale.language === null)
			$settings.locale.language = Intl.DateTimeFormat().resolvedOptions().locale;

		if ($settings.locale.datetime === null)
			$settings.locale.datetime = Intl.DateTimeFormat().resolvedOptions().locale.substring(0, 2);
		if ($settings.locale.timeFormat === null) {
			// https://stackoverflow.com/q/27647918/4907950
			const AMPM =
				Intl.DateTimeFormat(navigator.language, { hour: 'numeric' }).resolvedOptions().hourCycle ===
				'h12';
			$settings.timeFormat = AMPM ? 'h:mm A' : 'H:mm';
			$settings.timeFormatCustom = AMPM ? 'h:mm A' : 'H:mm';
		}
	});

	onMount(() => {
		const dateTimeInterval = setInterval(() => ($now = new Date()), 1000); // browser is optimized anyway, no need to detect seconds

		return () => {
			clearInterval(dateTimeInterval);
		};
	});
</script>

<svelte:head>
	<meta name="title" content={$session.languageDictionary['appName']} />
	<meta name="description" content={$session.languageDictionary['appDescription']} />
	<meta name="keywords" content={$session.languageDictionary['appKeywords']} />

	<meta
		name="apple-mobile-web-app-status-bar"
		content={TailwindColors[$settings.colorPalette][500]}
	/>
	<meta name="theme-color" content={TailwindColors[$settings.colorPalette][500]} />
</svelte:head>

<GoogleAnalytics />

<KeyboardShortcuts bind:settingsModal />

<svelte:body on:dblclick={doubleClickFullscreen} />

<div class="text-center flex min-h-screen" style="--font-family:{$settings.fontFamily}">
	<Nav bind:navOpen bind:settingsModal />
	<div class="flex-1 relative">
		<Header bind:navOpen />
		<div class="p-16">
			<slot />
		</div>
	</div>

	<!-- Modals -->
	<Modal
		bind:this={settingsModal}
		title={$session.languageDictionary.labels['Settings']}
		icon="settings"
	>
		<Settings />
	</Modal>
</div>
