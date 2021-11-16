<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	export let smallButton = false;

	$: showInstallButton = false;

	// Initialize deferredPrompt for use later to show browser install prompt.
	let deferredPrompt;

	// Source (ie. browser, our prompt) that caused install. Used for analytics.
	let installSource;

	// Google Analytics PWA: https://youtu.be/Xbo3uZ5Ge10?t=458

	onMount(() => {
		// https://web.dev/customize-install/

		window.addEventListener('beforeinstallprompt', (e) => {
			// Prevent the mini-infobar from appearing on mobile
			e.preventDefault();
			// Stash the event so it can be triggered later.
			deferredPrompt = e;
			// Update UI notify the user they can install the PWA
			showInstallButton = true;
			// Optionally, send analytics event that PWA install promo was shown.
			console.log(`'beforeinstallprompt' event was fired.`);

			gtag('event', 'pwa-install', {
				// user shown custom install experience
				event_action: 'promo-shown',
				non_interaction: true
			});
		});

		window.addEventListener('appinstalled', () => {
			// Hide the app-provided install promotion
			showInstallButton = false;
			// Clear the deferredPrompt so it can be garbage collected
			deferredPrompt = null;
			// Optionally, send analytics event to indicate successful install
			console.log('PWA was installed');

			// Ignore if the page is hidden
			if (document.visibilityState !== 'visible') return;

			const source = installSource || 'browser';
			gtag('event', 'pwa-install', {
				event_action: 'installed',
				install_source: source
			});
			gtag('event', 'pwa-install', { display_mode: 'standalone' });
		});
	});

	async function installButtonClick() {
		// Hide the app provided install promotion
		showInstallButton = false;

		console.log(deferredPrompt);

		// Show the install prompt
		deferredPrompt.prompt();

		// Wait for the user to respond to the prompt
		const { outcome } = await deferredPrompt.userChoice;

		// Optionally, send analytics event with outcome of user choice
		console.log(`User response to the install prompt: ${outcome}`);

		// We've used the prompt, and can't use it again, throw it away
		deferredPrompt = null;

		// Google Analytics
		installSource = 'installButton';
		gtag('event', 'pwa-install', {
			event_action: 'promo-clicked',
			install_source: installSource,
			event_value: outcome === 'accepted' ? 1 : 0
		});
		if (outcome === 'dismissed') {
			installSource = null;
		}
	}
</script>

{#if showInstallButton}
	<button on:click={installButtonClick} class={$$props.class ?? ''}>
		<Icon name="download" class="w-6 h-6 inline {smallButton ? '' : 'mr-2'}" />
		{#if !smallButton}
			{$session.languageDictionary.labels['Install']}
		{/if}
	</button>
{/if}
