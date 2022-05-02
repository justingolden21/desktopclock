<script context="module">
	// cannot import session here
	// workaround: these are keys in the dictionary to be used where the shortcuts list is used
	export const keyboardShortcutsList = {
		N: 'Toggle dark mode',
		S: 'Settings',
		F: 'Toggle fullscreen',
		B: 'Toggle battery display',
		P: 'Toggle primary display',
		D: 'Toggle secondary display'
	};
</script>

<script>
	import { page } from '$app/stores';

	import { toggleFullscreen } from '$lib/components/Settings.svelte';
	import { settings } from '$lib/stores/settings';
	import { toggle } from '$lib/util/modal';
	import ToggleDisplay from '$lib/util/toggleDisplay';
</script>

<svelte:window
	on:keydown={(event) => {
		// return if setting not enabled or if the active element is an input the user can type in
		if (
			!$settings.keyboardShortcuts ||
			['input', 'textarea', 'select'].includes(document.activeElement.tagName.toLowerCase())
		)
			return;
		if (event.code === 'KeyN') {
			$settings.darkMode = !$settings.darkMode;
		}
		if (event.code === 'KeyS') {
			toggle('settings');
		}
		if (event.code === 'KeyF') {
			toggleFullscreen();
		}
		if (event.code === 'KeyB') {
			$settings.clock.displays.battery = !$settings.clock.displays.battery;
		}
		if (event.code === 'KeyD') {
			ToggleDisplay($page, settings, 'secondary');
		}
		if (event.code === 'KeyP') {
			ToggleDisplay($page, settings, 'primary');
		}

		// TODO: keyT to toggle themes?
	}} />
