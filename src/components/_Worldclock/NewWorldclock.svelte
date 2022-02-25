<script>
	import { session } from '$app/stores';

	import { settings } from '../settings.js';
	import Icon from '../Icon.svelte';
	import TimezoneSelect from '../TimezoneSelect.svelte';

	$: dictionary = $session.languageDictionary;

	export let newWorldclockModal = null;

	let newTimezoneName, newTimezoneValue;
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
