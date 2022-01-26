<script>
	import TailwindColors from 'tailwindcss/colors.js';

	import { onMount } from 'svelte';

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	dayjs.extend(utc);
	dayjs.extend(timezone);

	import { now } from '../../util/now.js';
	import { settings } from '../settings.js';

	// 'static' if the clock displays only one time
	export let mode = '';
	// time to display if static
	export let time = {};
	// id used to differentiate names for css variables which are global, so they only apply to one specific clock
	export let clock_id;

	const setAngle = (type, newAngle) => {
		document.documentElement.style.setProperty(`--${type}-angle-${clock_id}`, `${newAngle}deg`);
	};

	function setTime() {
		if (!document.getElementById('hour-hand')) return; // return if analog clock is not visible

		let date;

		if (mode && mode === 'static') {
			date = new dayjs().hour(time.h).minute(time.m).second(time.s);
		} else {
			// add one second because transition takes one second
			date = new dayjs($now).tz($settings.locale.timezone || 'Etc/GMT').add(1, 'second');
		}

		const h = date.hour() % 12;
		const m = date.minute();
		const s = date.second();

		let rotations = {
			second: 6 * s,
			minute: (m + s / 60) * 6,
			hour: (h + m / 60 + s / 3600) * 30
		};

		// check one second's rotation after 0 degrees
		// because this is when we need to replace the angle with 0 and transition to the next second (rotation % 360)
		if (rotations['second'] <= 6) rotations['second'] += 360;
		if (rotations['minute'] <= 0.1) rotations['minute'] += 360;
		if (rotations['hour'] <= 0.0084) rotations['hour'] += 360;

		// Quickly reset position
		// See https://stackoverflow.com/q/11131875/4907950
		for (const handType of ['second', 'minute', 'hour']) {
			setAngle(handType, rotations[handType]);

			if (rotations[handType] > 360) {
				let hand = document.getElementById(handType + '-hand');
				hand.classList.add('notransition');
				setAngle(handType, 0);
				// See https://gist.github.com/paulirish/5d52fb081b3570c81e3a#svg
				hand.getBBox(); // trigger CSS reflow
				hand.classList.remove('notransition');
				setAngle(handType, rotations[handType] % 360);
			}
		}
	}

	onMount(() => {
		setTime();

		const setTimeInterval = setInterval(setTime, 1000);

		return () => {
			clearInterval(setTimeInterval);
		};
	});

	//  ================

	$: theme = $settings.clock.theme;
	$: baseColorPalette = TailwindColors[$settings.baseColorPalette];

	$: sizes = ['sm', 'md', 'lg'].map((size) => ({ size, r: 27.5 - theme.ticks[size].width / 2 }));

	// return the hex color given a string or object with color information from a theme
	// lightness is a string (100, 200, 300) that represents the lightness of the color in the tailwind theme
	// if falsey or '-1', return 'none' (lack of value or '-1' results in a transparent color)
	// palette is 'base' unless otherwise specified, 'accent' is the other valid color palette
	function getColor(obj) {
		return obj.lightness === '-1'
			? 'none'
			: TailwindColors[
					$settings[obj.palette == 'accent' ? 'accentColorPalette' : 'baseColorPalette']
			  ][obj.lightness];
	}
</script>

<!-- by using `opacity-0` instead of `hidden` or `{#if}` it ensures the clock continues in the background
so when switching to it, it continues moving instantly -->

<svg
	id="clock"
	viewBox="0 0 64 64"
	class={$settings.clock.displays.primary !== 'analog' ? 'opacity-0' : ''}>
	<!-- Shadow -->
	<rect
		id="shadow"
		x="4"
		y="2"
		width="60"
		height="60"
		fill={theme.face.fill.lightness == '-1' || theme.shadow.fill.lightness == '-1'
			? 'none'
			: baseColorPalette[theme.shadow.fill.lightness]}
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
	<g transform="translate(32,32)">
		<!-- Ticks -->
		{#each sizes as { size, r }, index}
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

		<!-- Hands -->
		<g transform="rotate(180)">
			{#each ['hour', 'minute', 'second'] as hand, index}
				<line
					id="{hand}-hand"
					style={`transition: transform 1s linear;transform: rotate(var(--${hand}-angle-${clock_id}));`}
					y1={-theme.hands[hand].back}
					y2={theme.hands[hand].length}
					stroke={getColor(theme.hands[hand].stroke)}
					stroke-width={theme.hands[hand].strokeWidth}
					stroke-linecap={theme.hands[hand].linecap} />
			{/each}
		</g>
		<!-- Pin -->
		<circle
			id="pin"
			fill={getColor(theme.pin.fill)}
			stroke={getColor(theme.pin.stroke)}
			stroke-width={theme.pin.strokeWidth}
			r={theme.pin.size} />
	</g>
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

	:root {
		--second-angle: 0deg;
		--minute-angle: 0deg;
		--hour-angle: 0deg;
	}
</style>
