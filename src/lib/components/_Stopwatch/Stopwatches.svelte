<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import { open } from '$lib/util/modal';
	import uid from '$lib/util/uid';
	import checkTooManyStopwatches from '$lib/util/checkTooManyStopwatches';

	import Stopwatch from './Stopwatch.svelte';
	import NoStopwatches from './NoStopwatches.svelte';

	import { Icon } from '$lib/components/Icon';
	import { settings } from '$lib/stores/settings';

	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	$: dictionary = $session.languageDictionary;

	const makeNewStopwatch = () => {
		const tooMany = checkTooManyStopwatches(dictionary, $settings.stopwatch.stopwatches.length, 1);
		if (tooMany) return;

		$settings.stopwatch.stopwatches = [
			...$settings.stopwatch.stopwatches,
			{
				times: $settings.stopwatch.autoStartStopwatches ? [Date.now()] : [],
				laps: [],
				id: uid(),
				name: ''
			}
		];
	};

	const deleteAllStopwatches = () => {
		$settings.stopwatch.stopwatches = [];
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
<div class="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
	{#each $settings.stopwatch.stopwatches as stopwatch, idx (stopwatch.id)}
		<div
			animate:flip={{ duration: 250 }}
			in:scale
			out:scale
			class:col-span-full={idx === 0 && $settings.stopwatch.largerFirstStopwatch}>
			<Stopwatch bind:data={stopwatch} />
		</div>
	{/each}
</div>

<br />

{#if $settings.stopwatch.stopwatches.length === 0}
	<NoStopwatches />
{/if}

<br />

<button
	class="icon-btn rounded-none bg-transparent mx-auto"
	on:click={makeNewStopwatch}
	aria-label={dictionary.stopwatchSettings['New stopwatch']}
	title={dictionary.stopwatchSettings['New stopwatch']}>
	<Icon name="plus" class="inline-block w-8 h-8" />
	<span>{dictionary.labels['New']}</span>
</button>

{#if $settings.stopwatch.stopwatches.length > 4}
	<button class="ml-4 icon-btn rounded-none bg-transparent mx-auto" on:click={deleteAllStopwatches}>
		<Icon name="trash" class="inline-block w-8 h-8" />
		<span>{dictionary.labels['Delete all']}</span>
	</button>
{/if}

<button
	class="ml-4 icon-btn rounded-none bg-transparent mx-auto"
	on:click={() => open('simultaneous-start')}>
	<Icon name="stopwatch" class="inline-block w-8 h-8" />
	<span>{dictionary.stopwatchSettings['Simultaneous start']}</span>
</button>
