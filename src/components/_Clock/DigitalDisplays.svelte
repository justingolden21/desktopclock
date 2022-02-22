<script>
	import TailwindColors from 'tailwindcss/colors.js';

	import { onMount } from 'svelte';

	import { settings } from '../settings.js';
	import BatteryIcon from './BatteryIcon.svelte';
	import { time, date } from '../../util/timeText';

	$: clockSettings = $settings.clock;

	$: displays = clockSettings.displays;

	let batteryLevel, batteryIsCharging;
	let batterySupported = false;

	// TODO: starts an event listener each time displays.svelte is mounted, can add up
	// should unmount the event listener, look into svelte window access navigator
	onMount(() => {
		// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery
		if (!(navigator && navigator.getBattery)) return;
		batterySupported = true;
		navigator.getBattery().then(function (battery) {
			batteryLevel = battery.level;

			battery.addEventListener('levelchange', function () {
				batteryLevel = battery.level;
			});
			battery.addEventListener('chargingchange', function () {
				batteryIsCharging = battery.charging;
			});
		});
	});

	$: baseColorPalette = TailwindColors[$settings.baseColorPalette];
	$: accentColorPalette = TailwindColors[$settings.accentColorPalette];
	$: shade = $settings.darkMode ? 400 : 900;
</script>

<div class="flex">
	<div
		id="primary-display"
		style="--primary-font-weight: {$settings.clock
			.datetimeFontWeight}; color:{displays.primaryPalette === 'base'
			? baseColorPalette[shade]
			: accentColorPalette[shade]}"
		class={displays.primary + ' text-' + displays.primaryFontSize}>
		{#if displays.primary != 'analog'}
			<h1>
				{#if displays.primary == 'time'}
					{$time}
				{:else if displays.primary == 'date'}
					{$date}
				{:else if displays.primary == 'datetime'}
					{$time}
					<br />
					{$date}
				{/if}
			</h1>
		{/if}
	</div>
	<div
		id="secondary-display"
		style="color:{displays.secondaryPalette === 'base'
			? baseColorPalette[shade]
			: accentColorPalette[shade]}"
		class={'text-' + displays.secondaryFontSize}>
		{#if displays.secondary != 'none'}
			<h2>
				{#if displays.secondary == 'time'}
					{$time}
				{:else if displays.secondary == 'date'}
					{$date}
				{:else if displays.secondary == 'datetime'}
					{$time}
					<br />
					{$date}
				{/if}
			</h2>
		{/if}
	</div>
</div>

{#if displays.battery && batterySupported}
	<div
		id="battery-display"
		class={'hidden sm:block text-' + displays.secondaryFontSize}
		style="color:{displays.secondaryPalette === 'base'
			? baseColorPalette[shade]
			: accentColorPalette[shade]}">
		<BatteryIcon
			fillLevel={batteryLevel ? batteryLevel * 100 : 100}
			charging={batteryIsCharging}
			class="inline w-6 h-6 md:w-8 md:h-8 mb-8" />

		<h2 class="inline">{Math.round(batteryLevel * 100)}%</h2>
	</div>
{/if}

<style lang="postcss">
	#primary-display {
		@apply top-[15%] short:top-[10%] supershort:top-[0%] tall:top-[20%] absolute left-0 right-0;
		font-weight: var(--primary-font-weight);
	}

	#primary-display h1 {
		@apply tracking-widest text-center leading-snug px-8;
	}

	#primary-display.text-small h1 {
		@apply text-6xl md:text-7xl lg:text-8xl xl:text-9xl;
		@apply supershort:text-4xl short:text-5xl supershort:md:text-6xl short:lg:text-7xl;
	}
	#primary-display h1 {
		@apply text-7xl md:text-8xl lg:text-9xl xl:text-10xl;
		@apply supershort:text-5xl short:text-6xl supershort:md:text-7xl short:lg:text-8xl;
	}
	#primary-display.text-large h1 {
		@apply text-8xl md:text-9xl lg:text-10xl xl:text-11xl;
		@apply supershort:text-6xl short:text-7xl supershort:md:text-8xl short:lg:text-9xl;
	}

	#primary-display.datetime.text-small h1 {
		@apply text-4xl md:text-5xl lg:text-6xl;
	}
	#primary-display.datetime h1 {
		@apply text-5xl md:text-6xl lg:text-7xl;
	}
	#primary-display.datetime.text-large h1 {
		@apply text-6xl md:text-7xl lg:text-8xl;
	}

	#primary-display,
	#secondary-display {
		/* Set numbers to be monospace
		only works on: Bitter, Montserrat Alternatives, Major Mono Display
		https://stackoverflow.com/a/56266636/4907950 */
		font-variant-numeric: tabular-nums;

		white-space: break-spaces;
	}
	#secondary-display {
		@apply pb-4;
	}

	#secondary-display h2,
	#battery-display h2 {
		@apply font-normal tracking-widest text-center;
	}

	#secondary-display.text-small h2,
	#battery-display.text-small h2 {
		@apply text-xl md:text-2xl lg:text-3xl;
	}
	#secondary-display h2,
	#battery-display h2 {
		@apply text-2xl md:text-3xl lg:text-4xl;
	}
	#secondary-display.text-large h2,
	#battery-display.text-large h2 {
		@apply text-3xl md:text-4xl lg:text-5xl;
	}

	#secondary-display,
	#battery-display {
		@apply absolute bottom-0 supershort:opacity-0;
	}
	#secondary-display {
		@apply left-0 w-full;
	}
	#battery-display {
		@apply right-8;
	}
</style>
