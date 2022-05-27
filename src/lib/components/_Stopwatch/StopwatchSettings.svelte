<script>
	import { session } from '$app/stores';

	/// UTILS ///
	import { settings, defaultSettings } from '$lib/stores/settings';

	/// COMPONENTS ///
	import { Icon } from '$lib/components/Icon';
	import Toggle from '../Toggle.svelte';
	import SettingSelect from '$lib/components/SettingSelect.svelte';

	/// STATE ///
	$: dictionary = $session.languageDictionary;

	const stopAllStopwatches = () => {
		for (const stopwatch of $settings.stopwatch.stopwatches) {
			if (stopwatch.times.length % 2 === 0) {
				// if starting, then stop it
				stopwatch.times.push(Date.now());
			}
		}
	};
	const startAllStopwatches = () => {
		for (const stopwatch of $settings.stopwatch.stopwatches) {
			if (stopwatch.times.length % 2 === 0) {
				// if stopped, then start it
				stopwatch.times.push(Date.now());
			}
		}
	};

	const resetStopwatchSettings = () => {
		// don't delete user's stopwatches
		const userStopwatches = JSON.parse(JSON.stringify($settings.stopwatch.stopwatches));
		$settings.stopwatch = JSON.parse(JSON.stringify(defaultSettings.stopwatch));
		$settings.stopwatch.stopwatches = userStopwatches;
	};
</script>

<h3>{dictionary.stopwatchSettings['Display']}</h3>

<Toggle
	id="always-show-hours-toggle"
	bind:checked={$settings.stopwatch.alwaysShowHours}
	labelText={dictionary.stopwatchSettings['Always show hours']} />

<SettingSelect
	id="digits-after-seconds-select"
	selectLabel={dictionary.stopwatchSettings['Digits after seconds']}
	bind:value={$settings.stopwatch.digitsAfterSeconds}
	values={[...Array(4).keys()]} />

<hr />

<Toggle
	id="show-reset-button-toggle"
	bind:checked={$settings.stopwatch.showResetButton}
	labelText={dictionary.stopwatchSettings['Show reset stopwatch button']} />

<Toggle
	id="reverse-order-laps-toggle"
	bind:checked={$settings.stopwatch.reverseOrderLaps}
	labelText={dictionary.stopwatchSettings['Reverse lap order']} />

<h3>{dictionary.stopwatchSettings['Behavior']}</h3>

<Toggle
	id="auto-start-stopwatches-toggle"
	bind:checked={$settings.stopwatch.autoStartStopwatches}
	labelText={dictionary.stopwatchSettings['Automatically start new stopwatches']} />

<button class="btn" on:click={startAllStopwatches}>
	<Icon name="stopwatch" class="inline w-6 h-6" />
	{dictionary.stopwatchSettings['Start all paused stopwatches']}
</button>

<button class="btn" on:click={stopAllStopwatches}>
	<Icon name="stopwatch" class="inline w-6 h-6" />
	{dictionary.stopwatchSettings['Stop all running stopwatches']}
</button>

<hr />

<button class="btn undo-btn mt-4" on:click={resetStopwatchSettings}>
	<Icon name="undo" class="inline w-6 h-6" />
	{dictionary.stopwatchSettings['Reset stopwatch settings']}
</button>
