<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import { close } from '$lib/util/modal.js';

	import { settings } from '$lib/stores/settings.js';
	import { editMode } from '$lib/data/consts.js';

	/// COMPONENTS ///
	import Icon from '$lib/components/Icon.svelte';
	import TimezoneSelect from '$lib/components/TimezoneSelect.svelte';

	/// STATE ///
	export let data = {};
	let newTimezoneName, newTimezoneValue;
	$: dictionary = $session.languageDictionary;
	$: editIndex = data.editIndex ?? editMode;
	$: isEditMode = editIndex === editMode;

	/// LIFECYCLE HOOKS ///
	onMount(() => {
		if (isEditMode) return;
		newTimezoneName = $settings.worldclock.timezones[editIndex].name;
		newTimezoneValue = $settings.worldclock.timezones[editIndex].zone;
	});

	/// EVENT HANDLERS ///
	function onSubmit() {
		if (isEditMode) {
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
		close();
	}
</script>

<div class="my-4">
	<label for="new-timezone-name-input">{dictionary.worldclockSettings['Timezone nickname:']}</label>
	<input id="new-timezone-name-input" bind:value={newTimezoneName} type="text" maxlength="100" />
</div>

<div class="my-4">
	<TimezoneSelect id="new-timezone-select" bind:value={newTimezoneValue} />
</div>

<button class="btn float-right" on:click={onSubmit}>
	<Icon name={isEditMode ? 'plus' : 'check'} class="inline w-6 h-6" />
	{dictionary.labels[isEditMode ? 'Create' : 'Save']}
</button>
