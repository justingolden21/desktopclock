<script>
	import colors from 'tailwindcss/colors';

	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import { init } from '../js/scripts';

	// import Displays, { displays, setDisplays } from '../components/Displays.svelte';
	import Displays from '../components/Displays.svelte';

	// onMount(() => {
	// 	init();
	// 	let lang = 'en'; // tmp
	// 	setDisplays(displays, lang);
	// });

	onMount(init);

	// Shortcut for $session.settings.clock.theme.*
	$: theme = $session.settings.clock.theme;
	$: colorPalette = colors[$session.settings.colorPalette];
	$: accentColorPalette = colors[$session.settings.accentColorPalette];

	$: displays = $session.settings.clock.displays;

	$: sizes = ['sm', 'md', 'lg'].map((size) => ({ size, r: 27.5 - theme.ticks[size].width / 2 }));
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.clock}</title>
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
				fill={theme.face.fill == -1 ? 'none' : colorPalette[theme.face.fill]}
				stroke={colorPalette[theme.face.stroke]}
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
						stroke={theme.ticks[size].stroke == -1
							? 'none'
							: colorPalette[theme.ticks[size].stroke]}
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
							stroke={colors[theme.hands[hand].stroke.color || $session.settings.colorPalette][
								theme.hands[hand].stroke.lightness
							]}
							stroke-width={theme.hands[hand].strokeWidth}
							stroke-linecap={theme.hands[hand].linecap}
						/>
					{/each}
				</g>
				<!-- Pin -->
				<circle
					id="pin"
					fill={colorPalette[theme.pin.fill]}
					stroke={accentColorPalette[theme.pin.stroke]}
					stroke-width={theme.pin.strokeWidth}
					r={theme.pin.size}
				/>
			</g>
		</svg>
	{/if}
</section>
