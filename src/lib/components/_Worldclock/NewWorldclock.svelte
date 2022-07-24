<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import { close } from '$lib/util/modal';

	import { settings } from '$lib/stores/settings';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';
	import TimezoneAutocomplete from '$lib/components/TimezoneAutocomplete.svelte';
	import { addToast } from '$lib/components/Toast.svelte';

	/// STATE ///
	export let data = {};
	let newTimezoneName, newTimezoneValue;
	$: dictionary = $session.languageDictionary;
	$: editIndex = data.editIndex ?? -1;
	$: isEditMode = editIndex !== -1;

	/**
	 * By default, setting `newTimezoneValue` in `onMount` updates the value
	 * but not the `inputValue` in `Autocomplete`.
	 * Even if we set `inputValue = value` inside `onMount` in `Autocomplete`,
	 * because `onMount` runs first in the child components,
	 * it will run and not have a value before `onMount` in this component.
	 * It has to be inside `onMount` in this component because it depends on `data` and `$settings`.
	 * We can't set a listener to `value` changing inside `Autocomplete` since it would be a circular dependency.
	 * So by conditionally rendering the `Autocomplete` after this component mounted,
	 * we ensure `inputValue` is set to `value` **after** we set `newTimezoneValue` below, so the correct value is displayed.
	 */
	let loaded = false;

	/// LIFECYCLE HOOKS ///
	onMount(() => {
		if (isEditMode) {
			newTimezoneName = $settings.worldclock.timezones[editIndex].name;
			newTimezoneValue = $settings.worldclock.timezones[editIndex].zone;
		} else {
			newTimezoneValue = 'Etc/GMT';
		}

		loaded = true;
	});

	/// EVENT HANDLERS ///
	function onSubmit() {
		for (const timezone of $settings.worldclock.timezones) {
			// can't have duplicate zone and name
			// because this is the key used in the `#each` loop in `Worldclocks.svelte`
			// for correctly rehydrating the worldclocks
			if (timezone.name === (newTimezoneName ?? '') && timezone.zone === newTimezoneValue) {
				const text = dictionary.messages['Cannot have duplicate timezones with same name'];
				const icon = 'error';
				addToast({ text, icon });
				return;
			}
		}

		if (!isEditMode) {
			// max 100 worldclocks
			if ($settings.worldclock.timezones.length >= 100) {
				const text = dictionary.messages['Too many worldclocks'];
				const icon = 'error';
				addToast({ text, icon });
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
	<label for="new-timezone-name-input" class="block">
		{dictionary.worldclockSettings['Timezone nickname:']}</label>
	<input id="new-timezone-name-input" bind:value={newTimezoneName} type="text" maxlength="100" />
</div>

<div class="my-4">
	{#if loaded}
		<TimezoneAutocomplete
			bind:value={newTimezoneValue}
			labelID="new-timezone-input"
			blockLabel={true} />
	{/if}
</div>

<button class="btn float-right md:absolute md:bottom-0 md:right-0" on:click={onSubmit}>
	<Icon name={isEditMode ? 'check' : 'plus'} />
	{dictionary.labels[isEditMode ? 'Save' : 'Create']}
</button>
