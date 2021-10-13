<script>
	import '../app.postcss';

	import { navigating, page, session } from '$app/stores';
	import { browser } from '$app/env';

	import colors from 'tailwindcss/colors.js';

	import screenfull from 'screenfull';

	import Modal from '../components/Modal.svelte';
	import Nav from '../components/Nav.svelte';
	import Header from '../components/Header.svelte';
	import Settings from '../components/Settings.svelte';
	import { onMount } from 'svelte';
	import { now } from '../components/now.js';
	import KeyboardShortcuts from '../components/KeyboardShortcuts.svelte';

	let settingsModal, aboutModal;

	let navOpen = false;
	$: if ($navigating) navOpen = false;

	function doubleClickFullscreen({ target }) {
		if (!$session.settings.doubleclickFullscreen) return;
		if (target.tagName === 'BUTTON' || target.parentNode.tagName === 'BUTTON') return;
		if (screenfull.isEnabled) {
			screenfull.toggle();
		}
	}

	function shareApp() {
		// TODO translate, test on more platforms, store URL in global variable somewhere, in case it changes
		if (navigator.share) {
			navigator
				.share({
					title: 'Desktop Clock',
					text: 'Desktop Clock is a simple, resizable and customizable clock for any device.',
					url: 'https://desktopclock.netlify.app/'
				})
				.then(() => console.log('Successful share'))
				.catch((err) => console.log('Error sharing', err));
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
	<Nav bind:navOpen bind:settingsModal bind:aboutModal />
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

	<Modal bind:this={aboutModal} title="About" icon="info">
		<h3>About</h3>
		<p>
			Desktop Clock is a simple, resizable and customizable clock for any device. Features include
			customizable analog and digital displays, night mode, and more. Desktop Clock is designed to
			scale perfectly to any screen size and ratio, with no distortion or pixelation. Use Desktop
			Clock as a clock on your TV, a night clock, or even project the time for exams. Use the timers
			for anything from chess to cooking! Customize the time, date and more to your liking!
		</p>

		<h3>Contact</h3>
		<p>
			Made by
			<a href="https://justingolden.me" target="_blank">Justin Golden</a>. Feel free to contact me
			with any feedback, questions, or requests at
			<a href="mailto:contact@justingolden.me" target="_blank">contact@justingolden.me</a>.
		</p>
		<button class="btn" on:click={shareApp}>Share</button>
	</Modal>
</div>
