<script>
	import TailwindColors from 'tailwindcss/colors';

	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import dayjs from 'dayjs';
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	dayjs.extend(utc);
	dayjs.extend(timezone);

	import { now } from '../components/now.js';
	import Displays from '../components/Displays.svelte';
	import { settings } from '../components/settings.js';

	const setAngle = (type, newAngle) => {
		document.documentElement.style.setProperty(`--${type}-angle`, `${newAngle}deg`);
	};

	function setTime() {
		if (!document.getElementById('hour-hand')) return; // return if analog clock is not visible

		// add one second because transition takes one second
		const date = new dayjs($now).tz($settings.locale.timezone || 'Etc/GMT').add(1, 'second');

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
	$: colorPalette = TailwindColors[$settings.colorPalette];

	$: displays = $settings.clock.displays;

	$: sizes = ['sm', 'md', 'lg'].map((size) => ({ size, r: 27.5 - theme.ticks[size].width / 2 }));

	// return the hex color given a string or object with color information from a theme
	// if falsey or '-1', return 'none' (lack of value or '-1' results in a transparent color)
	// other valid options are a string for the lightness (default palette will be used)
	// or an object, which will use the lightness from the object and the palette from the object if present, else the default palette
	function getColor(obj) {
		if (!obj || obj == '-1') return 'none';
		if (typeof obj === 'string') return colorPalette[obj];
		return TailwindColors[obj.color || $settings.colorPalette][obj.lightness];
	}
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.home}</title>
</svelte:head>
<section>
	<Displays />
	{#if displays.primary == 'analog'}
		<svg id="clock" viewBox="0 0 64 64">
			<!-- Shadow -->
			<rect
				x="4"
				y="2"
				width="60"
				height="60"
				fill={theme.face.fill == -1 || theme.shadow.fill == -1
					? 'none'
					: colorPalette[theme.shadow.fill]}
				rx={theme.face.shape == 'circle' ? 30 : theme.face.shape == 'rounded' ? 15 : 0}
			/>
			<!-- Face -->
			<rect
				x="2"
				y="2"
				width="60"
				height="60"
				fill={getColor(theme.face.fill)}
				stroke={getColor(theme.face.stroke)}
				stroke-width={theme.face.strokeWidth}
				rx={theme.face.shape == 'circle' ? 30 : theme.face.shape == 'rounded' ? 15 : 0}
			/>
			<g transform="translate(32,32)">
				<!-- Ticks -->
				{#each sizes as { size, r }, index}
					<circle
						id="{size}-ticks"
						fill="none"
						{r}
						stroke-dasharray={`${theme.ticks[size].height},${
							(2 * r * Math.PI) / (size == 'sm' ? 60 : size == 'md' ? 12 : 4) -
							theme.ticks[size].height
						}`}
						stroke={getColor(theme.ticks[size].stroke)}
						stroke-width={theme.ticks[size].width}
						transform={`rotate(-${theme.ticks[size].height})`}
					/>
				{/each}

				<!-- Hands -->
				<g transform="rotate(180)">
					{#each ['hour', 'minute', 'second'] as hand, index}
						<line
							id="{hand}-hand"
							y1={-theme.hands[hand].back}
							y2={theme.hands[hand].length}
							stroke={getColor(theme.hands[hand].stroke)}
							stroke-width={theme.hands[hand].strokeWidth}
							stroke-linecap={theme.hands[hand].linecap}
						/>
					{/each}
				</g>
				<!-- Pin -->
				<circle
					id="pin"
					fill={getColor(theme.pin.fill)}
					stroke={getColor(theme.pin.stroke)}
					stroke-width={theme.pin.strokeWidth}
					r={theme.pin.size}
				/>
			</g>
		</svg>
	{/if}
</section>
