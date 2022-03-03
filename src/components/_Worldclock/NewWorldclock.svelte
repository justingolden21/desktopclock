<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import modal from '../../util/modal.js';

	import { settings } from '../settings.js';
	import Icon from '../Icon.svelte';
	import TimezoneSelect from '../TimezoneSelect.svelte';

	$: dictionary = $session.languageDictionary;

	let newTimezoneName, newTimezoneValue;

	onMount(() => {
		if (editIndex !== -1) {
			newTimezoneName = $settings.worldclock.timezones[editIndex].name;
			newTimezoneValue = $settings.worldclock.timezones[editIndex].zone;
		}
	});

	export let data = {};
	$: editIndex = data.editIndex ?? -1; // -1 is 'new' mode, else 'edit' mode
</script>

<div class="my-4">
	<label for="new-timezone-name-input">{dictionary.worldclockSettings['Timezone nickname:']}</label>
	<input id="new-timezone-name-input" bind:value={newTimezoneName} type="text" />
</div>

<div class="my-4">
	<TimezoneSelect id="new-timezone-select" bind:value={newTimezoneValue} />
</div>

<button
	class="btn float-right"
	on:click={() => {
		if (editIndex === -1) {
			$settings.worldclock.timezones.push({
				zone: newTimezoneValue,
				name: newTimezoneName ?? ''
			});
		} else {
			$settings.worldclock.timezones[editIndex] = {
				zone: newTimezoneValue,
				name: newTimezoneName ?? ''
			};
		}

		newTimezoneName = '';
		$modal = null;
	}}>
	<Icon name={editIndex === -1 ? 'plus' : 'check'} class="inline w-6 h-6" />
	{dictionary.labels[editIndex === -1 ? 'Create' : 'Save']}
</button>
