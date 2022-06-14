<script>
	import { session } from '$app/stores';

	import { close } from '$lib/util/modal';
	import uid from '$lib/util/uid';
	import checkTooManyStopwatches from '$lib/util/checkTooManyStopwatches';
	import { settings } from '$lib/stores/settings';
	import Icon from '../Icon/Icon.svelte';
	import { validateInt } from '$lib/components/Settings.svelte';

	/// STATE ///
	let numberSimultaneous = 2;
	$: dictionary = $session.languageDictionary;

	/// EVENT HANDLERS ///
	function onSubmit() {
		const tooMany = checkTooManyStopwatches(
			dictionary,
			$settings.stopwatch.stopwatches.length,
			numberSimultaneous
		);
		if (tooMany) return;

		// setting the first time to current timestamp starts the stopwatches
		const newStopwatches = Array.from({ length: numberSimultaneous }, () => ({
			times: [Date.now()],
			laps: [],
			id: uid(),
			name: ''
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
		class="mt-4 text-lg"
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
	{dictionary.stopwatchSettings['Start']}
</button>
