// `gtag` is in scope and works fine, disabling the no-undef rule only for those lines

import { writable } from 'svelte/store';

export const showInstallButton = new writable(false);

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

// Source (ie. browser, our prompt) that caused install. Used for analytics.
let installSource;

// Google Analytics PWA: https://youtu.be/Xbo3uZ5Ge10?t=458

export function setupInstall() {
	// https://web.dev/customize-install/

	window.addEventListener('beforeinstallprompt', (e) => {
		// Prevent the mini-infobar from appearing on mobile
		e.preventDefault();

		// Stash the event so it can be triggered later.
		deferredPrompt = e;

		// Update UI notify the user they can install the PWA
		showInstallButton.set(true);

		// Optionally, send analytics event that PWA install promo was shown.
		console.log("'beforeinstallprompt' event was fired.");

		// eslint-disable-next-line no-undef
		gtag('event', 'pwa-install', {
			event_action: 'promo-shown',
			non_interaction: true
		});
	});

	window.addEventListener('appinstalled', () => {
		// Hide the app-provided install promotion
		showInstallButton.set(false);

		// Clear the deferredPrompt so it can be garbage collected
		deferredPrompt = null;

		// Optionally, send analytics event to indicate successful install
		console.log('PWA was installed');

		// Ignore if the page is hidden
		if (document.visibilityState !== 'visible') return;

		// eslint-disable-next-line no-undef
		gtag('event', 'pwa-install', {
			event_action: 'installed',
			install_source: installSource || 'browser'
		});
		// eslint-disable-next-line no-undef
		gtag('event', 'pwa-install', { display_mode: 'standalone' });
	});
}

export async function installButtonClick() {
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
	// eslint-disable-next-line no-undef
	gtag('event', 'pwa-install', {
		event_action: 'promo-clicked',
		install_source: installSource,
		install_outcome: outcome
	});
	if (outcome === 'dismissed') {
		installSource = null;
	}
}
