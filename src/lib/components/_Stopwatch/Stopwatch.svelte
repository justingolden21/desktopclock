<script>
	/** stopwatch todo
logic for adding new laps
extended ui for laps
seo in en.json for stopwatch
size stopwatches based off of how many there are
  if only one, it's huge, if two theyre each half, so on
  first one is huge and next ones under it are smaller

floating action btn at bottom right "new" for new stopwatch, stopwatches have x on top right to delete them
stopwatches have fullscreen btn on top to make that one fullscreen

limit user to 100 stopwatches
delete all stopwatches btn, ui similar to worldclock if no stopwatches are present
setting for "auto start" stopwatch upon creating it
allow user to name stopwatches
only show delete "x" if hovering stopwatch?
*/

	import { session } from '$app/stores';

	import { Icon } from '$lib/components/Icon';
	import { settings } from '$lib/stores/settings';

	import { getNetMs, msToStr } from '$lib/util/stopwatch';

	let currentLap = '8:88';
	let lapNumber = 1;

	export let idx;
	export let data;

	$: dictionary = $session.languageDictionary;
	$: running = data.times.length % 2 == 1; // odd number of times

	// total running time as a string, displayed to user
	$: currentTime = data?.times.length
		? msToStr(getNetMs(data.times), { displayMs: false })
		: '00:00';

	// Hacky way of updating the currentTime on an interval
	// otherwise it doesn't know to rehydrate
	// and doesn't call `getNetMs` again which gets a different result if the stopwatch is running
	// since `Date.now()` is changing (to show the stopwatch time increasing)
	// NOTE: could be a performance problem with many stopwatches. Monitor.
	setInterval(() => {
		data = data;
	}, 100);

	const toggleStart = () => {
		running = !running;
		// data.times.push(Date.now());
		data.times = [...data.times, Date.now()];
		// console.log(data.times);
		// console.log(currentTime);
	};

	const addLap = () => {
		// data.laps.push(Date.now());
		data.laps = [...data.laps, Date.now()];
	};

	const removeStopwatch = () => {
		// splice idx from stopwatch list
		// similar to code in worldclock dropdown
		$settings.stopwatch.stopwatches = $settings.stopwatch.stopwatches.filter((_, i) => i !== idx);
	};
</script>

<div class="inline-block p-2 m-4 surface border-0">
	<button class="icon-btn top-2 left-2 absolute" on:click={removeStopwatch}>
		<Icon name="close" class="inline w-6 h-6" />
	</button>
	<div class="stopwatch" on:click={toggleStart}>
		<div class="stopwatch__inner">
			<p class="top-text">{currentLap}</p>
			<p class="middle-text">{currentTime}</p>
			<p class="bottom-text">{dictionary.labels['LapNumber']} {lapNumber}</p>
		</div>
	</div>
	<div class="stopwatch__buttons">
		<button class="ml-2 btn btn-lg align-bottom" on:click={toggleStart}>
			<Icon name={running ? 'pause' : 'play'} class="inline w-6 h-6" />
			{dictionary.labels[running ? 'Pause' : 'Start']}
		</button>
		<button class="ml-2 btn {!running && 'invisible'}" on:click={addLap}>
			<Icon name="plus" class="inline w-6 h-6" />
			{dictionary.labels['Lap']}
		</button>
	</div>
</div>

<style lang="postcss">
	.stopwatch {
		@apply bg-base-200 rounded-full w-48 h-48 p-4 inline-block m-4 hover:bg-base-300 cursor-pointer;
	}
	:global(.dark) .stopwatch {
		@apply bg-base-700 hover:bg-base-600;
	}
	.stopwatch__inner {
		@apply w-full h-full relative;
	}
	.top-text,
	.middle-text,
	.bottom-text {
		@apply text-center w-full;
	}
	.top-text,
	.bottom-text {
		@apply absolute font-bold text-xl;
	}
	.top-text {
		@apply top-0;
	}
	.bottom-text {
		@apply bottom-0;
	}
	.middle-text {
		@apply top-1/2 relative -translate-y-1/2 text-5xl;
	}
</style>
