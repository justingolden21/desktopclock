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
	import { settings } from './settings.js';
	import { toggleFullscreen } from './Settings.svelte';

	export let settingsModal = null;
</script>

<!-- TODO: let user custom map keys to specific shortcuts -->

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
			settingsModal.toggle();
		}
		if (event.code === 'KeyF') {
			toggleFullscreen();
		}
		if (event.code === 'KeyB') {
			$settings.clock.displays.battery = !$settings.clock.displays.battery;
		}
		if (event.code === 'KeyD') {
			// const current = $settings.clock.displays.secondary;
			// const secondaryOptions = ['time', 'date', 'datetime', 'none'];
			// let idx = secondaryOptions.indexOf(current);
			// idx = (idx + 1) % secondaryOptions.length;
			// $settings.clock.displays.secondary = secondaryOptions[idx];

			const options = ['time', 'date', 'datetime', 'none'];
			$settings.clock.displays.secondary =
				options[(options.indexOf($settings.clock.displays.secondary) + 1) % options.length];
		}
		if (event.code === 'KeyP') {
			// const current = $settings.clock.displays.primary;
			// const primaryOptions = ['analog', 'time', 'date', 'datetime'];
			// let idx = primaryOptions.indexOf(current);
			// idx = (idx + 1) % primaryOptions.length;
			// $settings.clock.displays.primary = primaryOptions[idx];

			const options = ['analog', 'time', 'date', 'datetime'];
			$settings.clock.displays.primary =
				options[(options.indexOf($settings.clock.displays.primary) + 1) % options.length];
		}

		// TODO: keyT to toggle themes?
	}} />
