<script>
	export let hours, mins, meridiem;
	export let ampm = false;

	export const getTimeString = (ampm) => `${hours}:${mins}${ampm && ' ' + meridiem}`;
</script>

<div class="inline-block p-2 bg-base-200 dark:bg-base-700 rounded">
	<select bind:value={hours}>
		{#each [...Array(ampm ? 12 : 24).keys()].map((idx) => idx + (ampm ? 1 : 0)) as hr}
			<option value={hr}>{hr.toString().padStart(2, '0')}</option>
		{/each}
	</select>

	<span class="font-bold">:</span>

	<select bind:value={mins}>
		{#each [...Array(60).keys()] as min}
			<option value={min}>{min.toString().padStart(2, '0')}</option>
		{/each}
	</select>

	{#if ampm}
		<select bind:value={meridiem}>
			<option value="AM">AM</option>
			<option value="PM">PM</option>
		</select>
	{/if}
</div>

<style lang="postcss">
	select {
		@apply rounded;
	}
</style>
