<script>
	import { session } from '$app/stores';

	import { close } from '$lib/util/modal';
	import { settings } from '$lib/stores/settings';
	import Icon from '../Icon/Icon.svelte';
	import { validateInt } from '$lib/components/Settings.svelte';

	/// STATE ///
	let numberSimultaneous = 2;
	$: dictionary = $session.languageDictionary;

	/// EVENT HANDLERS ///
	function onSubmit() {
		// setting the first time to current timestamp starts the stopwatches
		const newStopwatches = Array.from({ length: numberSimultaneous }, () => ({
			times: [Date.now()],
			laps: []
		}));

		$settings.stopwatch.stopwatches = [...$settings.stopwatch.stopwatches, ...newStopwatches];

		close();
	}
</script>

<div class="m-4">
	<label for="simultaneous-stopwatches-input" class="block">
		{dictionary.stopwatchSettings['Number of stopwatches to start at the same time:']}</label>
	<input
		id="simultaneous-stopwatches-input"
		on:input|preventDefault={(event) => {
			const value = validateInt(event.target);
			numberSimultaneous = value;
			event.target.value = value;
		}}
		value={numberSimultaneous}
		type="number"
		min="1"
		max="25" />
</div>

<button class="btn float-right md:absolute md:bottom-0 md:right-0" on:click={onSubmit}>
	<Icon name="stopwatch" class="inline w-6 h-6" />
	{dictionary.labels['Start']}
</button>
