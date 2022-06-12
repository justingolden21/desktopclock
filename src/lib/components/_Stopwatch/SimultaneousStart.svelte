<script>
	import { session } from '$app/stores';

	import { close } from '$lib/util/modal';
	import uid from '$lib/util/uid';
	import checkTooManyStopwatches from '$lib/util/checkTooManyStopwatches';
	import { settings } from '$lib/stores/settings';
	import Icon from '../Icon/Icon.svelte';
	import Toggle from '../Toggle.svelte';
	import { addToast } from '../Toast';
	import { validateInt } from '../Settings.svelte';

	/// STATE ///
	let numberSimultaneous = 2;
	let enteringNames = false;
	let stopwatchNames = '';
	$: dictionary = $session.languageDictionary;

	/// EVENT HANDLERS ///
	function onSubmit() {
		const names = stopwatchNames
			.split('\n')
			.map((s) => s.trim())
			.filter((s) => s !== '');
		const numberToMake = enteringNames ? names.length : numberSimultaneous;

		const tooMany = checkTooManyStopwatches(
			dictionary,
			$settings.stopwatch.stopwatches.length,
			numberToMake
		);
		if (tooMany) return;

		// TODO toast
		if (numberToMake === 0) {
			const message = dictionary.messages['Please enter at least 1 stopwatch name'];
			const type = 'error';
			const dismissible = true;
			const timeout = 2000;
			addToast({ message, type, dismissible, timeout });

			return;
		}

		// setting the first time to current timestamp starts the stopwatches
		const newStopwatches = Array.from({ length: numberToMake }, (_, idx) => ({
			times: [Date.now()],
			laps: [],
			id: uid(),
			name: enteringNames ? names[idx] : ''
		}));

		$settings.stopwatch.stopwatches = [...$settings.stopwatch.stopwatches, ...newStopwatches];

		close();
	}
</script>

<div class="m-4">
	{#if $settings.stopwatch.namableStopwatches}
		<Toggle
			id="name-simultaneous-stopwatches-toggle"
			bind:checked={enteringNames}
			labelText={dictionary.stopwatchSettings['Enter list of names']} />
	{/if}

	{#if enteringNames}
		<label for="simultaneous-stopwatch-textarea" class="block mb-2">
			{dictionary.stopwatchSettings['Stopwatch names (one per line):']}
		</label>
		<textarea
			id="simultaneous-stopwatch-textarea"
			bind:value={stopwatchNames}
			class="w-full"
			rows="8" />
	{:else}
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
	{/if}
</div>

<button class="btn float-right md:absolute md:bottom-0 md:right-0" on:click={onSubmit}>
	<Icon name="stopwatch" class="inline w-6 h-6" />
	{dictionary.stopwatchSettings['Start']}
</button>
