<script>
	import colors from 'tailwindcss/colors';

	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import { init } from '../js/scripts';

	onMount(init);

	// Shortcut for $session.settings.clock.theme.*
	$: theme = $session.settings.clock.theme;
	$: colorPalette = colors[$session.settings.colorPalette];

	$: sizes = ['sm', 'md', 'lg'].map((size) => ({ size, r: 27.5 - theme.ticks[size].width / 2 }));
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.clock}</title>
</svelte:head>

<section>
	<div id="primary-display">
		<h1 />
	</div>
	<div id="secondary-display">
		<h2 />
	</div>

	<svg id="clock" viewBox="0 0 64 64">
		<g transform="translate(32,32)">
			<circle
				cx="2"
				r="30"
				fill={theme.face.fill == -1 ? 'none' : colorPalette[theme.shadow.fill]}
			/>
			<circle
				cx="0"
				r="30"
				fill={theme.face.fill == -1 ? 'none' : colorPalette[theme.face.fill]}
				stroke={colorPalette[theme.face.stroke]}
				stroke-width={theme.face.strokeWidth}
			/>

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
					stroke={colorPalette[theme.ticks[size].stroke]}
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
			<circle
				id="pin"
				fill={colorPalette[theme.pin.fill]}
				stroke={colors[theme.pin.stroke.color][theme.pin.stroke.lightness]}
				stroke-width={theme.pin.strokeWidth}
				r={theme.pin.size}
			/>
		</g>
	</svg>
</section>
