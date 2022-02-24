<script>
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
		console.log('adding timezone', newTimezoneName, newTimezoneValue);
		newWorldclockModal.hide();
	}}>YES</button>
