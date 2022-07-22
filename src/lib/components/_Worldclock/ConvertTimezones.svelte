<!-- Coming soon component -->
<script>
	import { session } from '$app/stores';

	// import Icon from '$lib/icons/Icon.svelte';
	// import TimezoneSelect from '../TimezoneSelect.svelte';
	// import TimePicker from '../TimePicker.svelte';

	// import { now } from '../../util/now';
	// import { settings } from '../settings';

	// $: dictionary = $session.languageDictionary;

	// let time1;
	// let timezone1;
	// let timezone2;

	// // TODO
	// const convertTimezones = () => 0;
	// const getDiffBetweenTimezones = () => 0;

	// $: time2 = convertTimezones(time1, timezone1, timezone2);
	// $: offset = getDiffBetweenTimezones(time1, timezone1, timezone2);

	// // todo: replace 'en-GB' with $settings.locale.datetime || 'en'
	// const reset = () => {
	// 	time1 = $now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
	// 	timezone1 = $settings.locale.timezone;
	// };

	// reset();
</script>

<p class="mt-4">{$session.languageDictionary.messages['Coming soon']}</p>

<!-- <div class="my-4">
	<TimePicker bind:value={time1} />
</div>

<p class="my-4">{dictionary.worldclockSettings['in']}</p>
<div class="my-4">
	<TimezoneSelect hasLabel={false} bind:value={timezone1} />
</div>

<hr />
<p>{dictionary.worldclockSettings['is']}</p>
<p>({offset})</p>

<div class="my-4">
	<h3>{time2}</h3>
</div>
<p>{dictionary.worldclockSettings['in']}</p>
<div class="my-4">
	<TimezoneSelect hasLabel={false} bind:value={timezone2} />
</div>

<button class="btn undo-btn block mt-4" on:click={reset}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.labels['Reset']}
</button> -->

<!-- TODO: translate -->
<!-- <p class="mt-8">
	Note: this conversion takes place on today's date and time. Daylight savings, historical changes
	in timezones, and other modifications may affect this
</p> -->
<!-- maybe TODO: optional date picker as well -->
