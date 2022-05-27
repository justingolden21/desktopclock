<script>
	import '$lib/css/app.postcss';

	import { navigating, session } from '$app/stores';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';

	import TailwindColors from 'tailwindcss/colors.js';
	import Screenfull from 'screenfull';

	/// COMPONENTS ///
	import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import ModalManager from '$lib/components/ModalManager.svelte';
	import Nav from '$lib/layouts/Nav.svelte';
	import Header from '$lib/layouts/Header.svelte';
	import KeyboardShortcuts from '$lib/components/KeyboardShortcuts.svelte';
	import { Toasts } from '$lib/components/Toast';
	import { settings } from '$lib/stores/settings';

	/// UTILS ///
	import { startInterval } from '$lib/util/now';
	import { setupInstall } from '$lib/util/install';
	import { hexToRgb } from '$lib/util/color';
	import initializeSettings from '$lib/util/initializeSettings';
	import { systemFontFamilies } from '$lib/data/consts';
	import version from '$lib/data/version';
	import Pattern from '$lib/components/Pattern.svelte';

	/// STATE ///
	let loading = true;
	let navOpen = false;
	let dateTimeInterval;
	$: if ($navigating) navOpen = false;

	/// EVENT HANDLERS ///
	function doubleClickFullscreen({ target }) {
		if (!$settings.doubleclickFullscreen) return;
		if (target.tagName === 'BUTTON' || target.parentNode.tagName === 'BUTTON') return;
		if (target.tagName === 'A' || target.parentNode.tagName === 'A') return;
		Screenfull.isEnabled && Screenfull.toggle();
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
	if (!$settings.recentVersion && $settings.baseColorPalette in oldGrays) {
		$settings.baseColorPalette = newGrays[oldGrays.indexOf($settings.baseColorPalette)];
	}

	// uncomment to simulate user with old palette setting
	// then reload page, it should error, then recomment and reload page
	// and it should run the fix above without breaking here

	// $settings.baseColorPalette = 'warmGray';
	// $settings.recentVersion = undefined;

	// ================

	$settings.recentVersion = version;

	/// LIFECYCLE HOOKS ///
	onMount(async () => {
		setTimeout(() => (loading = false), 500);
		await initializeSettings($session);

		gtag('event', 'page-load-settings', {
			non_interaction: true,
			dark_mode: $settings.darkMode,
			timezone: $settings.locale.timezone,
			language: $settings.locale.language,
			datetime_locale: $settings.locale.datetime,
			time_format: $settings.clock.timeFormat,
			navigator_language: navigator.language,
			font_family: $settings.fontFamily,
			font_family_body: $settings.fontFamilyBody
		});
	});

	onMount(() => {
		setupInstall();
		dateTimeInterval = startInterval();
		return () => {
			clearInterval(dateTimeInterval);
		};
	});

	let lastTimeFormatCustom;
	$: if (browser) {
		if (
			lastTimeFormatCustom !== $settings.clock.timeFormatCustom &&
			lastTimeFormatCustom !== $settings.worldclock.timeFormatCustom
		)
			dateTimeInterval = startInterval();
		lastTimeFormatCustom =
			$settings.clock.timeFormatCustom ?? $settings.worldclock.timeFormatCustom;
	}

	$: themeColor = TailwindColors[$settings.baseColorPalette][$settings.darkMode ? 900 : 200];

	// store numbers as list of rgb values for use in withOpacity in tailwind.config.cjs
	$: paletteVariablesHTML = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
		.map(
			(lightness) =>
				`--base-${lightness}: ${hexToRgb(TailwindColors[$settings.baseColorPalette][lightness])}; 
				--accent-${lightness}: ${hexToRgb(TailwindColors[$settings.accentColorPalette][lightness])};`
		)
		.join('');
</script>

<svelte:head>
	<meta name="apple-mobile-web-app-status-bar" content={themeColor} />
	<meta name="theme-color" content={themeColor} />
	<meta name="msapplication-TileColor" content={themeColor} />
	<link rel="mask-icon" href="img/icons/safari-pinned-tab.svg" color={themeColor} />
</svelte:head>

<GoogleAnalytics />

<svelte:body on:dblclick={doubleClickFullscreen} />

<main
	class="dark:bg-base-900 dark:text-base-200 transition-colors duration-200 ease-linear text-base-900 text-center flex min-h-screen"
	style:--font-family={$settings.fontFamily || systemFontFamilies}
	style:--font-family-body={$settings.fontFamilyBody}
	style={paletteVariablesHTML}>
	<Loader {loading} />

	<KeyboardShortcuts />

	<Toasts />

	<Nav bind:navOpen />
	<div class="flex justify-between flex-col flex-1 relative">
		<Header bind:navOpen />
		<div class="flex-1">
			<slot />
			<Pattern />
		</div>
	</div>

	<ModalManager />
</main>
