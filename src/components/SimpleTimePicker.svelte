<script>
	export let value;
	export let ampm = false;

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
</script>

<select bind:value>
	{#each times as time}
		<option value={time}>{time}</option>
	{/each}
</select>
