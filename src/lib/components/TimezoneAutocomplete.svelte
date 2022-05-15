<script>
	// TODO: more values for timezones

	import Autocomplete from '$lib/components/Autocomplete';

	import timezones from '$lib/data/timezones';

	const timezoneArr = [];
	for (const zone of Object.keys(timezones)) {
		for (const tz of timezones[zone]) {
			// rather than implement autocomplete component to support display options and actual options
			// we can just display underscores in the input
			// can update the component later, but for now this change provides value to the user
			// timezoneArr.push((zone + '/' + tz).split('_').join(' '));
			timezoneArr.push(zone + '/' + tz);
		}
	}

	export let value,
		disabled = false,
		placeholder = '';
</script>

<Autocomplete bind:value {placeholder} {disabled} options={timezoneArr} />
