<script>
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	$: showInstallButton = true; // TODO should default false?

	// Initialize deferredPrompt for use later to show browser install prompt.
	let deferredPrompt;

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
		});

		window.addEventListener('appinstalled', () => {
			// Hide the app-provided install promotion
			showInstallButton = false;
			// Clear the deferredPrompt so it can be garbage collected
			deferredPrompt = null;
			// Optionally, send analytics event to indicate successful install
			console.log('PWA was installed');
		});
	});

	async function installButtonClick() {
		console.log('a');
		// Hide the app provided install promotion
		showInstallButton = false;
		console.log('b');

		console.log(deferredPrompt);

		// Show the install prompt
		deferredPrompt.prompt();
		console.log('c');

		// Wait for the user to respond to the prompt
		const { outcome } = await deferredPrompt.userChoice;
		console.log('d');

		// Optionally, send analytics event with outcome of user choice
		console.log(`User response to the install prompt: ${outcome}`);
		console.log('e');

		// We've used the prompt, and can't use it again, throw it away
		deferredPrompt = null;
		console.log('f');
	}
</script>

{#if showInstallButton}
	<span tabindex="0" on:click={installButtonClick}>
		<Icon name="download" class="w-6 h-6 inline mr-2" />
		Install
	</span>
{/if}
