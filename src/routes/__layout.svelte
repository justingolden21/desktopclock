<script>
	import '../app.postcss';

	import { navigating, page, session } from '$app/stores';
	import { browser } from '$app/env';

	import TailwindColors from 'tailwindcss/colors';
	import screenfull from 'screenfull';

	import Toggle from '../components/Toggle.svelte';
	import { Tabs, TabList, TabPanel, Tab } from '../components/tabs.js';
	import Modal from '../components/Modal.svelte';
	import Icon from '../components/Icon.svelte';
	import Nav from '../components/Nav.svelte';
	import Header from '../components/Header.svelte';
	import Settings from '../components/Settings.svelte';

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
					text:
						"I think you'd like Desktop Clock. It's a simple, resizable and customizable clock for any device.",
					url: 'https://desktopclock.netlify.app/'
				})
				.then(() => console.log('Successful share'))
				.catch((err) => console.log('Error sharing', err));
		}
	}

	// defaults to null so toggle code doesn't run automatically on load
	// let darkMode = null;
	// We only reference document.body in the browser. This check prevents this code from running on the server side.
	// We check if darkMode is not null because whenever darkMode is updated, we want to toggle the class.
	// darkMode will always be true or false, and never null, so the check will always be true, but it will still run the check when the variable is updated
	$: if ($session.settings.darkMode !== null && browser) document.body.classList.toggle('dark');
	let themeColor = 'blueGray';
</script>

<svelte:head>
	<meta name="apple-mobile-web-app-status-bar" content={themeColor} />
	<meta name="theme-color" content={themeColor} />
</svelte:head>

<svelte:body on:dblclick={doubleClickFullscreen} />

<div class="text-center flex min-h-screen">
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
