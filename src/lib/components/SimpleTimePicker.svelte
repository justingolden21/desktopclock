<script>
	export let value;
	export let ampm = false;
	export let classes;

	function setupTimes(ampm) {
		const times = [];
		for (let i = 0; i < 24 * 4; i++) {
			let h = Math.floor(i / 4);
			if (ampm) h %= 12;
			const str =
				(ampm && h === 0 ? 12 : h) +
				':' +
				((i % 4) * 15).toString().padStart(2, '0') +
				(ampm ? (i >= 24 * 2 ? ' PM' : ' AM') : '');
			times.push(str);
		}
		return times;
	}

	// vals under the hood
	const times = setupTimes(false);

	let displayTimes = setupTimes(ampm);

	$: if (ampm || !ampm) displayTimes = setupTimes(ampm);
</script>

<select class={classes} bind:value>
	{#each times as time, idx}
		<option value={time}>{displayTimes[idx]}</option>
	{/each}
</select>
