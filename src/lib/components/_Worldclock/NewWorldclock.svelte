<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import { close } from '$lib/util/modal';

	import { settings } from '$lib/stores/settings';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';
	import TimezoneAutocomplete from '$lib/components/TimezoneAutocomplete.svelte';
	import { addToast } from '$lib/components/Toast';

	/// STATE ///
	export let data = {};
	let newTimezoneName,
		newTimezoneValue = 'Etc/GMT';
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

			for (const timezone of $settings.worldclock.timezones) {
				// can't have duplicate zone and name
				// because this is the key used in the `#each` loop in `Worldclocks.svelte`
				// for correctly rehydrating the worldclocks
				if (timezone.name === (newTimezoneName ?? '') && timezone.zone === newTimezoneValue) {
					const message = dictionary.messages['Cannot have duplicate timezones with same name'];
					const type = 'error';
					const dismissible = true;
					const timeout = 2000;
					addToast({ message, type, dismissible, timeout });
					return;
				}
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
	<label for="new-timezone-name-input" class="block"
		>{dictionary.worldclockSettings['Timezone nickname:']}</label>
	<input id="new-timezone-name-input" bind:value={newTimezoneName} type="text" maxlength="100" />
</div>

<div class="my-4">
	<TimezoneAutocomplete
		bind:value={newTimezoneValue}
		labelID="new-timezone-input"
		blockLabel={true} />
</div>

<button class="btn float-right md:absolute md:bottom-0 md:right-0" on:click={onSubmit}>
	<Icon name={isEditMode ? 'check' : 'plus'} class="inline w-6 h-6" />
	{dictionary.labels[isEditMode ? 'Save' : 'Create']}
</button>
