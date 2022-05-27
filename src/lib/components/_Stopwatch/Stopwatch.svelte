<script>
	/** stopwatch todo
size stopwatches based off of how many there are
  if only one, it's huge, if two theyre each half, so on
  first one is huge and next ones under it are smaller
  if only one and large width, show time on left and laps on right (or just time in center without laps before lap btn has been pressed)

triple dots menu for: delete, fullscreen, rename stopwatch
stopwatches have fullscreen btn on top to make that one fullscreen
bug: clicking pause/resume closes accordion
limit user to 100 stopwatches
max of 1000 laps?
setting for "auto start" stopwatch upon creating it
allow user to name stopwatches
stopwatches take some time to save, if user quickly starts/stops/laps and closes tab, it will be "out dated"
  this also affects "delete all settings and reload" which doesn't delete stopwatches
dashboard view that opens a modal with a table of all stopwatches, names, and times, super compact for many stopwatches
stopwatch settings btns for pause all (that arent) resume all (that arent)
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

	// spread operator to not mutate original array
	$: displayedLapTimes = $settings.stopwatch.reverseOrderLaps ? [...lapTimes].reverse() : lapTimes;

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

	const resetStopwatch = () => {
		data.laps = [];
		data.times = [];
	};
</script>

<div class="inline-block align-top m-4 surface border-0 group" class:col-span-full={idx === 0}>
	<button
		class="icon-btn top-2 left-2 absolute hidden group-hover:block"
		on:click={removeStopwatch}>
		<Icon name="close" class="inline w-6 h-6" />
	</button>
	<div class="stopwatch" on:click={toggleStart}>
		<div class="stopwatch__inner">
			<p class="top-text">{currentLap}</p>
			<p class="middle-text">{currentTime}</p>
			{#if lapNumber > 1}
				<p class="bottom-text">{dictionary.labels['LapNumber']} {lapNumber}</p>
			{/if}
		</div>
	</div>
	<div class="grid grid-cols-2 gap-4 m-4 mt-0">
		<button
			class="m-0 btn {!running && !$settings.stopwatch.showResetButton ? 'col-span-2' : ''}"
			on:click={toggleStart}>
			<Icon name={running ? 'pause' : 'play'} class="inline w-6 h-6" />
			{dictionary.labels[running ? 'Pause' : data.times.length ? 'Resume' : 'Start']}
		</button>
		<button class="m-0 btn {running ? '' : 'hidden'}" on:click={addLap}>
			<Icon name="plus" class="inline w-6 h-6" />
			{dictionary.labels['Lap']}
		</button>
		<button
			class="m-0 btn undo-btn {!running && $settings.stopwatch.showResetButton ? '' : 'hidden'}"
			on:click={resetStopwatch}>
			<Icon name="undo" class="inline w-6 h-6" />
			{dictionary.labels['Reset']}
		</button>
	</div>

	{#if lapNumber > 1}
		<Accordion>
			<AccordionPanel accordionTitle={dictionary.labels['Laps']}>
				<!-- div wrapping table so we can have overflow scroll and the alignment of display:table
					https://stackoverflow.com/a/29156151/4907950 -->
				<div class="max-h-64 overflow-auto">
					<table class="mb-0">
						<tr>
							<th>{dictionary.labels['Lap']}</th>
							<th>{dictionary.labels['Time']}</th>
							<th>{dictionary.labels['Total']}</th>
						</tr>
						{#each displayedLapTimes as lapTime, idx}
							<tr>
								<th
									>{$settings.stopwatch.reverseOrderLaps
										? displayedLapTimes.length - idx
										: idx + 1}</th>
								<th>{msToStr(lapTime.current, { displayMs: true })}</th>
								<th>{msToStr(lapTime.total, { displayMs: true })}</th>
							</tr>
						{/each}
					</table>
				</div>
			</AccordionPanel>
		</Accordion>
	{/if}
</div>

<style lang="postcss">
	.stopwatch {
		@apply bg-base-200 rounded-full w-48 h-48 p-4 inline-block m-4 hover:bg-base-300 cursor-pointer;
	}
	:global(.dark) .stopwatch {
		@apply bg-base-700 hover:bg-base-600;
	}
	.stopwatch__inner {
		@apply w-full h-full relative select-none;
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
	/* https://stackoverflow.com/a/28233945/4907950 */
	.top-text:before,
	.middle-text:before,
	.bottom-text:before {
		content: '';
		margin-left: -100%;
	}
	.top-text:after,
	.middle-text:after,
	.bottom-text:after {
		content: '';
		margin-right: -100%;
	}

	tr,
	th,
	:global(.dark) tr,
	:global(.dark) th {
		@apply bg-transparent !important;
	}
</style>
