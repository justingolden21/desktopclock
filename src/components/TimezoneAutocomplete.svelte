<script>
	import Autocomplete from '../components/Autocomplete.svelte';

	import timezones from '../data/timezones';

	const timezoneArr = [];
	for (const zone of Object.keys(timezones)) {
		for (const tz of timezones[zone]) {
			timezoneArr.push((zone + '/' + tz).split('_').join(' '));
		}
	}

	export let value,
		disabled = false,
		placeholder = '';
</script>

<Autocomplete bind:value {placeholder} {disabled} options={timezoneArr} />
