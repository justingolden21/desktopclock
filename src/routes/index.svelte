<script>
	import colors from 'tailwindcss/colors.js';

	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import { init } from '../js/scripts';

	import Displays from '../components/Displays.svelte';
	import ThemeButtons from '../components/ThemeButtons.svelte';

	onMount(init);

	$: theme = $session.settings.clock.theme;
	$: colorPalette = colors[$session.settings.colorPalette];

	$: displays = $session.settings.clock.displays;

	$: sizes = ['sm', 'md', 'lg'].map((size) => ({ size, r: 27.5 - theme.ticks[size].width / 2 }));

	// return the hex color given a string or object with color information from a theme
	// if falsey or '-1', return 'none' (lack of value or '-1' results in a transparent color)
	// other valid options are a string for the lightness (default palette will be used)
	// or an object, which will use the lightness from the object and the palette from the object if present, else the default palette
	function getColor(obj) {
		if (!obj || obj == '-1') return 'none';
		if (typeof obj === 'string') return colorPalette[obj];
		return colors[obj.color || $session.settings.colorPalette][obj.lightness];
	}
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

<section class="z-20">
	<!-- todo: z index does not seem to be the problem, cannot click lower btns -->
	<div class="z-20 m-4 mx-16 max-w-3xl" class:hidden={!$session.settings.showThemeButtons}>
		<ThemeButtons />
	</div>
</section>
