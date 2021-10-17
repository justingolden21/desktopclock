<script>
	import '../app.postcss';

	import { navigating, page, session } from '$app/stores';
	import { browser } from '$app/env';

	import colors from 'tailwindcss/colors.js';

	import screenfull from 'screenfull';

	import Modal from '../components/Modal.svelte';
	import Nav from '../components/Nav.svelte';
	import Header from '../components/Header.svelte';
	import Settings, { shareApp } from '../components/Settings.svelte';
	import { onMount } from 'svelte';
	import { now } from '../components/now.js';
	import KeyboardShortcuts from '../components/KeyboardShortcuts.svelte';
	import Icon from '../components/Icon.svelte';

	let settingsModal;

	let navOpen = false;
	$: if ($navigating) navOpen = false;

	function doubleClickFullscreen({ target }) {
		if (!$session.settings.doubleclickFullscreen) return;
		if (target.tagName === 'BUTTON' || target.parentNode.tagName === 'BUTTON') return;
		if (screenfull.isEnabled) {
			screenfull.toggle();
		}
	}

	// check when session changes
	// also check that browser exists so we can reference document
	// toggle dark class based on setting
	$: if ($session && browser)
		$session.settings.darkMode
			? document.body.classList.add('dark')
			: document.body.classList.remove('dark');

	onMount(() => {
		if ($session.settings.darkMode === null) {
			$session.settings.darkMode = !!window.matchMedia('(prefers-color-scheme: dark)').matches;
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
	<meta
		name="apple-mobile-web-app-status-bar"
		content={colors[$session.settings.colorPalette][500]}
	/>
	<meta name="theme-color" content={colors[$session.settings.colorPalette][500]} />
</svelte:head>

<KeyboardShortcuts />

<svelte:body on:dblclick={doubleClickFullscreen} />

<div class="text-center flex min-h-screen" style="--font-family:{$session.settings.fontFamily}">
	<Nav bind:navOpen bind:settingsModal />
	<div class="flex-1 relative">
		<Header bind:navOpen />
		<div class="p-16">
			<slot />
		</div>
	</div>

	<!-- Modals -->
	<Modal bind:this={settingsModal} title="Settings" icon="settings">
		<Settings />
	</Modal>
</div>
