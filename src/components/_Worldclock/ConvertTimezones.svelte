<script>
	import { session } from '$app/stores';

	import Icon from '../Icon.svelte';
	import TimezoneSelect from '../TimezoneSelect.svelte';

	import { now } from '../../util/now.js';
	import { settings } from '../settings';

	$: dictionary = $session.languageDictionary;

	let time1;
	let timezone1;
	let timezone2;

	$: time2 = time1 + timezone1 + timezone2 + 'TODO make this work lol';

	const reset = () => {
		time1 = $now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
		timezone1 = $settings.locale.timezone;
	};

	reset();
</script>

<div class="my-4">
	<label for="convert-time-1-input">{dictionary.labels['Time:']}</label>
	<input id="convert-time-1-input" type="time" bind:value={time1} />
</div>
<p>{dictionary.worldclockSettings['in']}</p>
<div class="my-4">
	<TimezoneSelect id="convert-timezone-1-select" bind:value={timezone1} />
</div>

<hr />
<p>{dictionary.worldclockSettings['is']}</p>

<div class="my-4">
	<h3>{time2}</h3>
</div>
<p>{dictionary.worldclockSettings['in']}</p>
<div class="my-4">
	<TimezoneSelect id="convert-timezone-2-select" bind:value={timezone2} />
</div>

<!-- TODO: translate -->
<button class="btn undo-btn block mt-4" on:click={reset}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.labels['Reset']}
</button>
