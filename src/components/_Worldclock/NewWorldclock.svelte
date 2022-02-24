<script>
	import { session } from '$app/stores';

	import { settings } from '../settings.js';
	import Icon from '../Icon.svelte';

	$: dictionary = $session.languageDictionary;

	export let newWorldclockModal = null;

	let newTimezoneName, newTimezoneValue;
</script>

<div class="my-4">
	<label for="new-timezone-name-input">{dictionary.worldclockSettings['Timezone nickname:']}</label>
	<input id="new-timezone-name-input" bind:value={newTimezoneName} type="text" />
</div>

<div class="my-4">
	<label for="new-timezone-select">{dictionary.labels['Timezone:']}</label>
	<!-- todo: make component for timezone select -->
	<select id="new-timezone-select" bind:value={newTimezoneValue}>
		<option value="America/Los_Angeles">America/Los_Angeles</option>
		<option value="America/New_York">America/New_York</option>
	</select>
</div>

<button
	class="btn"
	on:click={() => {
		$settings.worldclock.timezones.push({
			zone: newTimezoneValue,
			name: newTimezoneName ?? ''
		});

		newTimezoneName = '';

		// TODO: doesn't work with HMR?
		if (newWorldclockModal) newWorldclockModal.hide();
	}}>
	<Icon name="plus" class="inline w-6 h-6" />
	{dictionary.labels['Create']}
</button>
