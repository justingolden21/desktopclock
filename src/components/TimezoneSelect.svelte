<script>
	import { session } from '$app/stores';

	import timezones from '../data/timezones';

	$: dictionary = $session.languageDictionary;

	export let id,
		value,
		disabled = false;
</script>

<label for={id}>{dictionary.labels['Timezone:']}</label>
<select {id} {disabled} bind:value>
	{#each Object.keys(timezones) as zone}
		<optgroup label={zone}>
			{#each timezones[zone] as tz}
				<option value={zone + '/' + tz}>{(zone + '/' + tz).split('_').join(' ')}</option>
			{/each}
		</optgroup>
	{/each}
</select>
