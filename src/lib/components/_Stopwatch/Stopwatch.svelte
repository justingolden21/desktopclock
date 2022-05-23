<script>
	/** stopwatch todo
seo in en.json for stopwatch
size stopwatches based off of how many there are
  if only one, it's huge, if two theyre each half, so on
  first one is huge and next ones under it are smaller

floating action btn at bottom right "new" for new stopwatch, stopwatches have x on top right to delete them
stopwatches have fullscreen btn on top to make that one fullscreen
*/

	console.log('stopwatch');

	import { session } from '$app/stores';

	import { Icon } from '$lib/components/Icon';
	// import { settings } from '$lib/stores/settings';

	$: dictionary = $session.languageDictionary;

	let currentTime = '88:88';
	let currentLap = '8:88';
	let lapNumber = 1;
	let running = false;

	const start = () => {
		running = !running;
	};
</script>

<div class="inline-block p-2 m-2 surface border-0">
	<div class="stopwatch">
		<div class="stopwatch__inner">
			<p class="top-text">{currentLap}</p>
			<p class="middle-text">{currentTime}</p>
			<p class="bottom-text">{dictionary.labels['LapNumber']} {lapNumber}</p>
		</div>
	</div>
	<div class="stopwatch__buttons">
		<button class="ml-2 btn" on:click={() => console.log('it worked')}>
			<Icon name="stop" class="inline w-6 h-6" />
			{dictionary.labels['Stop']}
		</button>
		<button class="ml-2 btn btn-lg align-bottom" on:click={start}>
			<Icon name={running ? 'pause' : 'play'} class="inline w-6 h-6" />
			{dictionary.labels[running ? 'Pause' : 'Start']}
		</button>

		<button class="ml-2 btn" on:click={() => console.log('it worked')}>
			<Icon name="plus" class="inline w-6 h-6" />
			{dictionary.labels['Lap']}
		</button>
	</div>
</div>

<style lang="postcss">
	.stopwatch {
		@apply bg-base-200 rounded-full w-48 h-48 p-4 inline-block m-4;
	}
	:global(.dark) .stopwatch {
		@apply bg-base-700;
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
