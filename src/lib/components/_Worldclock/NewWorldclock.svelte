<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import { close } from '$lib/util/modal.js';

	import { settings } from '$lib/stores/settings.js';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';
	import TimezoneSelect from '$lib/components/TimezoneSelect.svelte';
	import { addToast } from '$lib/components/Toast';

	/// STATE ///
	export let data = {};
	let newTimezoneName, newTimezoneValue;
	$: dictionary = $session.languageDictionary;
	$: editIndex = data.editIndex ?? -1;
	$: isEditMode = editIndex !== -1;

	/// LIFECYCLE HOOKS ///
	onMount(() => {
		if (!isEditMode) return;
		newTimezoneName = $settings.worldclock.timezones[editIndex].name;
		newTimezoneValue = $settings.worldclock.timezones[editIndex].zone;
	});

	/// EVENT HANDLERS ///
	function onSubmit() {
		if (!isEditMode) {
			// max 100 worldclocks
			if ($settings.worldclock.timezones.length >= 100) {
				const message = dictionary.messages['Too many worldclocks'];
				const type = 'error';
				const dismissible = true;
				const timeout = 2000;
				addToast({ message, type, dismissible, timeout });
				return;
			}
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
	<Icon name={isEditMode ? 'check' : 'plus'} class="inline w-6 h-6" />
	{dictionary.labels[isEditMode ? 'Save' : 'Create']}
</button>
