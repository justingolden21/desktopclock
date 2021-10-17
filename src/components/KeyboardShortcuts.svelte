<script>
	import { session } from '$app/stores';

	export let settingsModal = null;
</script>

<svelte:window
	on:keydown={(event) => {
		// return if setting not enabled or if the active element is an input the user can type in
		if (
			!$session.settings.keyboardShortcuts ||
			['input', 'textarea', 'select'].includes(document.activeElement.tagName.toLowerCase())
		)
			return;
		if (event.code === 'KeyN') {
			$session.settings.darkMode = !$session.settings.darkMode;
		}
		if (event.code === 'KeyS') {
			settingsModal.show();
		}
	}}
/>

<!-- TODO: make a modal that lsits all shortcuts -->
