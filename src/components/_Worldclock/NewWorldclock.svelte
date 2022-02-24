<script>
	export let newWorldclockModal = null;

	let newTimezoneValue;
</script>

<label>name</label>
<input type="text" />

<label>timezone</label>
<!-- todo: make component for timezone select -->
<select bind:value={newTimezoneValue}>
	<option value="America/Los_Angeles">America/Los_Angeles</option>
	<option value="America/New_York">America/New_York</option>
</select>

<button
	class="btn"
	on:click={() => {
		console.log('adding timezone', newTimezoneValue);
		newWorldclockModal.hide();
	}}>YES</button>
