<!-- Currently unused, but may use in the future, so keeping for now -->
<script>
	import { session } from '$app/stores';

	import timezones from '$lib/data/timezones';

	$: dictionary = $session.languageDictionary;

	export let id,
		value,
		hasLabel = true,
		disabled = false;
</script>

{#if hasLabel}
	<label for={id}>{dictionary.labels['Timezone:']}</label>
{/if}
<select {id} {disabled} bind:value class:ml-0={!hasLabel}>
	{#each Object.keys(timezones) as zone}
		<optgroup label={zone}>
			{#each timezones[zone] as tz}
				<option value={zone + '/' + tz}>{(zone + '/' + tz).split('_').join(' ')}</option>
			{/each}
		</optgroup>
	{/each}
</select>
