<script context="module">
	// TODO: translation
	// replace these values with vals from dictionary
	export const keyboardShortcutsList = {
		N: 'Night Mode',
		S: 'Settings',
		F: 'Fullscreen',
		B: 'Battery',
		D: 'Secondary Display Toggle',
		P: 'Primary Display Toggle'
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
			const current = $settings.clock.displays.secondary;
			const secondaryOptions = ['time', 'date', 'datetime', 'none'];
			let idx = secondaryOptions.indexOf(current);
			idx = idx < secondaryOptions.length - 1 ? idx + 1 : 0;
			$settings.clock.displays.secondary = secondaryOptions[idx];
		}
		if (event.code === 'KeyP') {
			const current = $settings.clock.displays.primary;
			const primaryOptions = ['analog', 'time', 'date', 'datetime'];
			let idx = primaryOptions.indexOf(current);
			idx = idx < primaryOptions.length - 1 ? idx + 1 : 0;
			$settings.clock.displays.primary = primaryOptions[idx];
		}

		// TODO: keyT to toggle themes?

		/*
		// commented out because bad UX to accidently press 'P' and irreversibly change appearance
		if (event.code === 'KeyP') {
			// TODO: make simple mode in one centralized place
			// TODO: make option to toggle simple mode off
			// - (remember previous tick stroke/size, or add new property for visibility to themes)

			// simple mode
			for (const size of 'sm md lg'.split(' '))
				$settings.clock.theme.ticks[size].stroke = '-1';
		}
		*/
	}}
/>

<!-- TODO: make a modal that lists all shortcuts -->
