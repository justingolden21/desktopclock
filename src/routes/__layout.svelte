<script>
	import '../css/app.postcss';

	import { navigating, session } from '$app/stores';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	import TailwindColors from 'tailwindcss/colors.js';

	import screenfull from 'screenfull';

	import { version } from '../../package.json';

	import GoogleAnalytics from '../components/GoogleAnalytics.svelte';
	import Loader from '../components/Loader.svelte';
	import Modal from '../components/Modal.svelte';
	import Nav from '../components/Nav.svelte';
	import Header from '../components/Header.svelte';
	import Settings, { fetchLanguage } from '../components/Settings.svelte';
	import { now } from '../util/now.js';
	import KeyboardShortcuts from '../components/KeyboardShortcuts.svelte';
	import { settings } from '../components/settings.js';
	import { app_url } from '../data/consts.js';
	import defaultNightTheme from '../themes/defaultNight';
	import { setupInstall } from '../util/install';

	let settingsModal;

	let navOpen = false;
	$: if ($navigating) navOpen = false;

	function doubleClickFullscreen({ target }) {
		if (!$settings.doubleclickFullscreen) return;
		if (target.tagName === 'BUTTON' || target.parentNode.tagName === 'BUTTON') return;
		if (screenfull.isEnabled) screenfull.toggle();
	}

	// check when session changes
	// also check that browser exists so we can reference document
	// toggle dark class based on setting
	$: if ($session && browser)
		$settings.darkMode
			? document.body.parentNode.classList.add('dark')
			: document.body.parentNode.classList.remove('dark');

	// ================
	// reverse compatibility
	// this works. don't touch it.
	const oldGrays = ['warmGray', 'trueGray', 'gray', 'coolGray', 'blueGray'];
	const newGrays = ['stone', 'neutral', 'zinc', 'gray', 'slate'];
	if (!$settings.recentVersion) {
		if ($settings.baseColorPalette in oldGrays) {
			$settings.baseColorPalette = newGrays[oldGrays.indexOf($settings.baseColorPalette)];
		} else {
			$settings.baseColorPalette = 'slate';
		}
	}

	// uncomment to simulate user with old palette setting
	// then reload page, it should error, then recomment and reload page
	// and it should run the fix above without breaking here

	// $settings.baseColorPalette = 'warmGray';
	// $settings.recentVersion = undefined;

	// ================

	$settings.recentVersion = version;

	onMount(async () => {
		if ($settings.locale.language) {
			$session.languageDictionary = await fetchLanguage($settings.locale.language);
		}

		// auto detect user device preferences
		if ($settings.darkMode === null) {
			$settings.darkMode = !!window.matchMedia('(prefers-color-scheme: dark)').matches;
			// if darkMode doesn't exist, the user doesn't already have theme settings, it's ok to step on the old theme
			if ($settings.darkMode) $settings.clock.theme = JSON.parse(JSON.stringify(defaultNightTheme));
		}
		if ($settings.locale.timezone === null) {
			$settings.locale.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Etc/GMT';
		}

		if ($settings.locale.language === null) $settings.locale.language = $session.lang ?? 'en';

		if ($settings.locale.datetime === null)
			$settings.locale.datetime =
				Intl.DateTimeFormat().resolvedOptions().locale.substring(0, 2) ?? 'en';

		if ($settings.clock.timeFormat === null) {
			// https://stackoverflow.com/q/27647918/4907950
			const AMPM =
				Intl.DateTimeFormat(navigator.language, { hour: 'numeric' }).resolvedOptions().hourCycle ===
				'h12';
			$settings.clock.timeFormat = AMPM ? 'h:mm A' : 'H:mm';
			$settings.clock.timeFormatCustom = AMPM ? 'h:mm A' : 'H:mm';
		}

		gtag('event', 'page-load-settings', {
			non_interaction: true,
			dark_mode: $settings.darkMode,
			timezone: $settings.locale.timezone,
			language: $settings.locale.language,
			datetime_locale: $settings.locale.datetime,
			time_format: $settings.timeFormat,
			navigator_language: navigator.language
		});
	});

	let dateTimeInterval; // browser is optimized anyway, no need to detect seconds

	function startInterval() {
		if (dateTimeInterval) clearInterval(dateTimeInterval);

		const ms =
			$settings.clock.timeFormat === 'custom' && $settings.clock.timeFormatCustom.includes('SSS')
				? 50
				: 1000;
		dateTimeInterval = setInterval(() => ($now = new Date()), ms);
	}

	onMount(() => {
		setupInstall();
		startInterval();

		let lastTimeFormatCustom;
		settings.subscribe(() => {
			if (lastTimeFormatCustom !== $settings.clock.timeFormatCustom) startInterval();
			lastTimeFormatCustom = $settings.clock.timeFormatCustom;
		});

		return () => {
			clearInterval(dateTimeInterval);
		};
	});

	$: paletteVariablesHTML = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
		.map(
			(lightness) =>
				`--base-${lightness}: ${TailwindColors[$settings.baseColorPalette][lightness]}; 
				--accent-${lightness}: ${TailwindColors[$settings.accentColorPalette][lightness]};`
		)
		.join('');
</script>

<svelte:head>
	<meta name="title" content={$session.languageDictionary['appName']} />
	<meta name="description" content={$session.languageDictionary['appDescription']} />
	<meta name="keywords" content={$session.languageDictionary['appKeywords']} />

	<meta property="og:image:height" content="292" />
	<meta property="og:image:width" content="558" />
	<meta property="og:description" content={$session.languageDictionary['appDescription']} />
	<meta property="og:title" content={$session.languageDictionary['appName']} />
	<meta property="og:url" content={app_url} />
	<meta property="og:image" content="img/icons/og-image.jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={$session.languageDictionary['appName']} />

	<meta name="twitter:title" content={$session.languageDictionary['appName']} />
	<meta name="twitter:description" content={$session.languageDictionary['appDescription']} />
	<meta name="twitter:image" content={app_url + '/img/screenshot.png'} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={app_url} />

	<meta
		name="apple-mobile-web-app-status-bar"
		content={TailwindColors[$settings.baseColorPalette][500]} />
	<meta name="theme-color" content={TailwindColors[$settings.baseColorPalette][500]} />
	<meta name="msapplication-TileColor" content={TailwindColors[$settings.baseColorPalette][500]} />
	<link
		rel="mask-icon"
		href="img/icons/safari-pinned-tab.svg"
		color={TailwindColors[$settings.baseColorPalette][500]} />
</svelte:head>

<GoogleAnalytics />

<svelte:body on:dblclick={doubleClickFullscreen} />

<div
	class="dark:bg-base-900 dark:text-base-200 transition-colors duration-200 ease-linear text-base-900 text-center flex min-h-screen"
	style="--font-family:{$settings.fontFamily};
    --font-family-body:{$settings.fontFamilyBody};
    {paletteVariablesHTML}">
	<Loader />

	<KeyboardShortcuts bind:settingsModal />

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
		icon="settings">
		<Settings />
	</Modal>
</div>
