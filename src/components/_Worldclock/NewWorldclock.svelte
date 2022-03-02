<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import { settings } from '../settings.js';
	import Icon from '../Icon.svelte';
	import TimezoneSelect from '../TimezoneSelect.svelte';

	$: dictionary = $session.languageDictionary;

	export let modal = null;
	export let editIdx = -1;

	let newTimezoneName, newTimezoneValue;

	onMount(() => {
		if (editIdx !== -1) {
			newTimezoneName = $settings.worldclock.timezones[editIdx].name;
			newTimezoneValue = $settings.worldclock.timezones[editIdx].zone;
		}
	});
</script>

<div class="my-4">
	<label for="new-timezone-name-input">{dictionary.worldclockSettings['Timezone nickname:']}</label>
	<input id="new-timezone-name-input" bind:value={newTimezoneName} type="text" />
</div>

<div class="my-4">
	<TimezoneSelect id="new-timezone-select" bind:value={newTimezoneValue} />
</div>

<button
	class="btn"
	on:click={() => {
		if (editIdx === -1) {
			$settings.worldclock.timezones.push({
				zone: newTimezoneValue,
				name: newTimezoneName ?? ''
			});
		} else {
			$settings.worldclock.timezones[editIdx] = {
				zone: newTimezoneValue,
				name: newTimezoneName ?? ''
			};
		}

		newTimezoneName = '';

		// TODO: doesn't work with HMR?
		if (modal) modal.hide();
	}}>
	<Icon name={editIdx === -1 ? 'plus' : 'check'} class="inline w-6 h-6" />
	{dictionary.labels[editIdx === -1 ? 'Create' : 'Save']}
</button>
