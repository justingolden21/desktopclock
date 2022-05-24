<script>
	/** stopwatch todo
seo in en.json for stopwatch
size stopwatches based off of how many there are
  if only one, it's huge, if two theyre each half, so on
  first one is huge and next ones under it are smaller
  if only one and large width, show time on left and laps on right (or just time in center without laps before lap btn has been pressed)

floating action btn at bottom right "new" for new stopwatch, stopwatches have x on top right to delete them
stopwatches have fullscreen btn on top to make that one fullscreen
bug: clicking pause/resume closes accordion
limit user to 100 stopwatches
max of 1000 laps?
delete all stopwatches btn, ui similar to worldclock if no stopwatches are present
setting for "auto start" stopwatch upon creating it
allow user to name stopwatches
option to reverse order of laps (toggle in ui, boolean if true then call .reverse() in #each loop for <table>)
*/

	import { session } from '$app/stores';

	import { Icon } from '$lib/components/Icon';
	import { settings } from '$lib/stores/settings';

	import { getNetMs, msToStr, getLapTimes } from '$lib/util/stopwatch';
	import { Accordion, AccordionPanel } from '$lib/components/Accordion';

	export let idx;
	export let data;

	$: dictionary = $session.languageDictionary;
	$: running = data.times.length % 2 == 1; // odd number of times
	$: lapNumber = data.laps.length + 1;
	$: lapTimes = data.laps.length ? getLapTimes(data.times, data.laps) : '';
	$: currentLap = data.laps.length
		? msToStr(lapTimes[lapTimes.length - 1].current, { displayMs: false })
		: '';
	// const lapTimes = [];

	// total running time as a string, displayed to user
	$: currentTime = data?.times.length
		? msToStr(getNetMs(data.times), { displayMs: false })
		: '00:00';

	const toggleStart = () => {
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

<div class="inline-block p-2 m-4 surface border-0 group">
	<button
		class="icon-btn top-2 left-2 absolute hidden group-hover:block"
		on:click={removeStopwatch}>
		<Icon name="close" class="inline w-6 h-6" />
	</button>
	<div class="stopwatch" on:click={toggleStart}>
		<div class="stopwatch__inner">
			<p class="top-text">{currentLap}</p>
			<h2 class="middle-text">{currentTime}</h2>
			{#if lapNumber > 1}
				<p class="bottom-text">{dictionary.labels['LapNumber']} {lapNumber}</p>
			{/if}
		</div>
	</div>
	<div class="stopwatch__buttons">
		<button class="ml-2 btn btn-lg align-bottom" on:click={toggleStart}>
			<Icon name={running ? 'pause' : 'play'} class="inline w-6 h-6" />
			{dictionary.labels[running ? 'Pause' : data.times.length ? 'Resume' : 'Start']}
		</button>
		<button class="ml-2 btn {!running && 'invisible'}" on:click={addLap}>
			<Icon name="plus" class="inline w-6 h-6" />
			{dictionary.labels['Lap']}
		</button>
	</div>
	<div class="stopwatch__laps">
		<!-- TODO: update accordion style, remove bg color and bottom border -->
		{#if lapNumber > 1}
			<Accordion>
				<AccordionPanel accordionTitle={dictionary.labels['Laps']}>
					<table class="max-h-64 block overflow-y-auto">
						<tr>
							<th>{dictionary.labels['Lap']}</th>
							<th>{dictionary.labels['Time']}</th>
							<th>{dictionary.labels['Total']}</th>
						</tr>
						{#each lapTimes as lapTime, idx}
							<tr>
								<th>{idx + 1}</th>
								<th>{msToStr(lapTime.current, { displayMs: true })}</th>
								<th>{msToStr(lapTime.total, { displayMs: true })}</th>
							</tr>
						{/each}
					</table>
				</AccordionPanel>
			</Accordion>
		{/if}
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
		@apply top-1/2 relative -translate-y-1/2 text-5xl m-0 p-0;
	}
</style>
