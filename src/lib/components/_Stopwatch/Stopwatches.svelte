<script>
	import { session } from '$app/stores';

	import Stopwatch from '$lib/components/_Stopwatch/Stopwatch.svelte';
	import { settings } from '$lib/stores/settings';
	import { Icon } from '$lib/components/Icon';
	import { onMount } from 'svelte';

	$: dictionary = $session.languageDictionary;

	const makeNewStopwatch = () => {
		$settings.stopwatch.stopwatches = [
			...$settings.stopwatch.stopwatches,
			{
				times: [],
				laps: []
			}
		];
	};

	onMount(() => {
		// Hacky way of updating the currentTime on an interval
		// otherwise it doesn't know to rehydrate
		// and doesn't call `getNetMs` again which gets a different result if the stopwatch is running
		// since `Date.now()` is changing (to show the stopwatch time increasing)
		// NOTE: could be a performance problem with many stopwatches. Monitor.
		// Doing this in here instead of in each individual Stopwatch for performance
		const stopwatchInterval = setInterval(() => {
			$settings.stopwatch.stopwatches = $settings.stopwatch.stopwatches;
		}, 100);

		return () => {
			clearInterval(stopwatchInterval);
		};
	});
</script>

<!-- give stopwatches a unique identifier in `each` loop so that upon removing one, the page maintains state correctly
		stopwatches can be uniquely determined by a combination of their times and their index
		we need index since intially the times are all the same (an empty array) -->
<div class="grid  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
	{#each $settings.stopwatch.stopwatches as stopwatch, idx (`${idx}-${stopwatch.times.join(',')}`)}
		<Stopwatch bind:data={stopwatch} {idx} />
	{/each}
</div>

<br />
<button
	class="icon-btn rounded-none bg-transparent mx-auto"
	on:click={makeNewStopwatch}
	aria-label={dictionary.labels['New stopwatch']}
	title={dictionary.labels['New stopwatch']}>
	<Icon name="plus" class="inline-block w-8 h-8" />
	<span>{dictionary.labels['New']}</span>
</button>
