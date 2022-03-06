<script>
	export let value;
	export let ampm = false;

	const times = [];
	if (ampm) {
		for (let i = 0; i < 24 * 4; i++) {
			const h = Math.floor(i / 4) % 12;
			const str =
				(h === 0 ? 12 : h) +
				':' +
				((i % 4) * 15).toString().padStart(2, '0') +
				(i >= 24 * 2 ? ' PM' : ' AM');
			times.push(str);
		}
	} else {
		for (let i = 0; i < 24 * 4; i++) {
			const str = Math.floor(i / 4) + ':' + ((i % 4) * 15).toString().padStart(2, '0');
			times.push(str);
		}
	}
</script>

<select bind:value>
	{#each times as time}
		<option value={time}>{time}</option>
	{/each}
</select>
