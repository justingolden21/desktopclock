<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { linear, bounceOut, elasticOut } from 'svelte/easing';

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import tz from 'dayjs/plugin/timezone.js';
	dayjs.extend(utc);
	dayjs.extend(tz);

	import { numeralStyles } from '$lib/data/consts.js';
	import { settings } from '$lib/stores/settings.js';

	/// UTILS ///
	import { now } from '$lib/util/now.js';
	import { getColor } from '$lib/util';

	/// STATE ///
	export let mode = '';
	export let time = {};
	export let timezone = undefined;
	export let theme;

	const movements = { sweeping: linear, grandfather: bounceOut, modern: elasticOut };
	$: movement =
		$settings[
			mode === 'worldclock' || $page.url.pathname === '/worldclock' ? 'worldclock' : 'clock'
		].secondHandMovement;

	// define and set the initial tweening function
	// note: second hand does not take timezone into account
	// if they have a timezone with different seconds we're all doomed
	let sweep = tweened(parseInt((Date.now() / 1000) % 60), {
		duration: 1000,
		easing: movements[movement]
	});

	// for a smooth transition between 59 and 0 seconds
	let start = Date.now() / 1000 - ((Date.now() / 1000) % 60);

	// these automatically update when `$now` changes
	// add one second because transition takes one second
	$: date =
		mode && mode === 'static'
			? new dayjs().hour(time.h).minute(time.m).second(time.s)
			: new dayjs($now).tz(timezone || $settings.locale.timezone || 'Etc/GMT').add(1, 'second');

	$: hours = date.hour() % 12;
	$: minutes = date.minute();
	$: seconds = date.second();

	$: angles = {
		hour: (hours + minutes / 60 + seconds / 3600) * 30,
		minute: (minutes + seconds / 60) * 6,
		second: (mode === 'static' ? time.s : $sweep) * 6
	};

	$: if (movement) changeSweep();

	/// METHODS ///
	// We cannot change easing on a tweening function with a reactive variable
	// Therefore, we need to redefine the entire tweening function
	// This function is called when `movement` changes, which is an alias for the setting
	// See https://svelte.dev/repl/270e83f43e7a48918d8f2d497760904f?version=3.32.1
	function changeSweep() {
		sweep = tweened($sweep, {
			duration: 1000,
			easing: movements[movement]
		});
	}

	function setTime() {
		sweep.set(parseInt(Date.now() / 1000 - start));
	}

	/// LIFECYCLE HOOKS ///
	onMount(() => {
		setTime();

		const setTimeInterval = setInterval(setTime, 1000);

		return () => {
			clearInterval(setTimeInterval);
		};
	});

	//  ================

	$: sizes = ['sm', 'md', 'lg'].map((size) => ({ size, r: 27.5 - theme.ticks[size].width / 2 }));
</script>

<!--
@component
A customizable analog clock

- `mode`: string. 'static' if the clock displays only one time, 'worldclock' to have it display regardless of display setting
- `theme`: object. custom theme object for clock or worldclock, usually from $settings
- `time`: object. time to display if static
- `timezone`: string. defaults to user's current setting. for use in worldclock

- Usage:
  ```jsx
  <AnalogClock theme={$settings.clock.theme} mode="static" time={{ h: 10, m: 9, s: 0 }} />
  ```
-->

<svg id="clock" viewBox="0 0 64 64">
	<!-- Shadow -->
	<rect
		id="shadow"
		x="4"
		y="2"
		width="60"
		height="60"
		fill={getColor(theme.shadow.fill)}
		rx={theme.face.shape == 'circle' ? 30 : theme.face.shape == 'rounded' ? 15 : 0} />

	<!-- Face -->
	<rect
		id="face"
		x="2"
		y="2"
		width="60"
		height="60"
		fill={getColor(theme.face.fill)}
		stroke={getColor(theme.face.stroke)}
		stroke-width={theme.face.strokeWidth}
		rx={theme.face.shape == 'circle' ? 30 : theme.face.shape == 'rounded' ? 15 : 0} />

	<!-- Ticks -->
	<g transform="translate(32,32)">
		{#each sizes as { size, r }}
			<circle
				id="{size}-ticks"
				fill="none"
				{r}
				stroke-dasharray={`${theme.ticks[size].height},${
					(2 * r * Math.PI) / (size == 'sm' ? 60 : size == 'md' ? 12 : 4) - theme.ticks[size].height
				}`}
				stroke={getColor(theme.ticks[size].stroke)}
				stroke-width={theme.ticks[size].width}
				transform={`rotate(-${theme.ticks[size].height})`} />
		{/each}
	</g>

	<!-- Numerals -->
	<g
		fill={getColor(theme.numerals.fill)}
		style="text-anchor: middle; pointer-events: none; user-select: none;">
		{#each numeralStyles[theme.numerals.style] as numeral, idx}
			<!-- y is middle of character -->
			<text
				style="font: 600 6px '{theme.numerals.fontFamily}', sans-serif;"
				transform-origin="center"
				transform="rotate({(idx + 1) * 30})"
				x="32"
				y="8">
				{numeral}
			</text>
		{/each}
	</g>

	<!-- Hands -->
	<g transform="translate(32,32) rotate(180)">
		{#each ['hour', 'minute', 'second'] as hand}
			<line
				id="{hand}-hand"
				transform="rotate({angles[hand]})"
				y1={-theme.hands[hand].back}
				y2={theme.hands[hand].length}
				stroke={getColor(theme.hands[hand].stroke)}
				stroke-width={theme.hands[hand].strokeWidth}
				stroke-linecap={theme.hands[hand].linecap} />
		{/each}
	</g>

	<!-- Pin -->
	<circle
		cx="32"
		cy="32"
		id="pin"
		fill={getColor(theme.pin.fill)}
		stroke={getColor(theme.pin.stroke)}
		stroke-width={theme.pin.strokeWidth}
		r={theme.pin.size} />
</svg>

<style lang="postcss">
	#clock {
		position: absolute;
		top: 12.5%;
		left: 12.5%;
		height: 75%;
		width: 75%;
	}

	#sm-ticks,
	#md-ticks,
	#lg-ticks,
	#pin {
		@apply transition duration-200 ease-in-out;
	}
</style>
