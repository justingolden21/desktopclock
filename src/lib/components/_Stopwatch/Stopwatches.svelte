<script>
	import { session } from '$app/stores';

	import Stopwatch from '$lib/components/_Stopwatch/Stopwatch.svelte';
	import { settings } from '$lib/stores/settings';
	import { Icon } from '$lib/components/Icon';

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
</script>

<!-- give stopwatches a unique identifier in `each` loop so that upon removing one, the page maintains state correctly
		stopwatches can be uniquely determined by a combination of their times and their index
		we need index since intially the times are all the same (an empty array) -->
{#each $settings.stopwatch.stopwatches as stopwatch, idx (`${idx}-${stopwatch.times.join(',')}`)}
	<Stopwatch {idx} />
{/each}

<button
	class="icon-btn rounded-none bg-transparent mx-auto"
	on:click={makeNewStopwatch}
	aria-label={dictionary.labels['New stopwatch']}
	title={dictionary.labels['New stopwatch']}>
	<Icon name="plus" class="inline-block w-8 h-8" />
	<span>{dictionary.labels['New']}</span>
</button>
