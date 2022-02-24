<script>
	import { settings } from '../settings.js';

	import Icon from '../Icon.svelte';

	export let newWorldclockModal = null;

	let newTimezoneName, newTimezoneValue;
</script>

<label>name</label>
<input bind:value={newTimezoneName} type="text" />

<label>timezone</label>
<!-- todo: make component for timezone select -->
<select bind:value={newTimezoneValue}>
	<option value="America/Los_Angeles">America/Los_Angeles</option>
	<option value="America/New_York">America/New_York</option>
</select>

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
	YES</button>
