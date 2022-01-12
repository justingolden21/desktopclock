<script>
	import TailwindColors from 'tailwindcss/colors.js';

	import { onMount } from 'svelte';

	import { settings } from '../settings.js';
	import BatteryIcon from './BatteryIcon.svelte';

	import dayjs from 'dayjs';

	// https://day.js.org/docs/en/plugin/timezone
	// https://day.js.org/docs/en/timezone/timezone
	import utc from 'dayjs/plugin/utc.js';
	import timezone from 'dayjs/plugin/timezone.js';
	dayjs.extend(utc);
	dayjs.extend(timezone);

	import { now } from '../../util/now.js';

	// approx 163kb (comment out and compare build sizes in network tab)
	import '../../data/all_locales.js';

	$: localeSettings = $settings.locale;
	$: clockSettings = $settings.clock;

	$: displays = clockSettings.displays;

	$: timeFormat =
		clockSettings.timeFormat !== 'custom'
			? clockSettings.timeFormat
			: clockSettings.timeFormatCustom;
	$: dateFormat =
		clockSettings.dateFormat !== 'custom'
			? clockSettings.dateFormat
			: clockSettings.dateFormatCustom;

	let batteryLevel, batteryIsCharging;
	let batterySupported = false;

	// these update automatically with `$now`
	$: time = new dayjs($now)
		.tz(localeSettings.timezone || 'Etc/GMT')
		.locale(localeSettings.datetime || 'en')
		.format(timeFormat || 'h:mm A');
	$: date = new dayjs($now)
		.tz(localeSettings.timezone || 'Etc/GMT')
		.locale(localeSettings.datetime || 'en')
		.format(dateFormat || 'ddd, MMMM D');

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
	$: shade = $settings.darkMode ? 200 : 900;
</script>

<div style="color:{baseColorPalette[shade]}; display: flex">
	<div
		id="primary-display"
		style="--primary-font-weight: {$settings.clock.datetimeFontWeight}"
		class={displays.primary}>
		{#if displays.primary != 'analog'}
			<h1>
				{#if displays.primary == 'time'}
					{time}
				{:else if displays.primary == 'date'}
					{date}
				{:else if displays.primary == 'datetime'}
					{time}
					<br />
					{date}
				{/if}
			</h1>
		{/if}
	</div>
	<div id="secondary-display">
		{#if displays.secondary != 'none'}
			<h2>
				{#if displays.secondary == 'time'}
					{time}
				{:else if displays.secondary == 'date'}
					{date}
				{:else if displays.secondary == 'datetime'}
					{time}
					<br />
					{date}
				{/if}
			</h2>
		{/if}
	</div>
</div>

{#if displays.battery && batterySupported}
	<div id="battery-display" class="hidden sm:block">
		<BatteryIcon
			fillLevel={batteryLevel ? batteryLevel * 100 : 100}
			charging={batteryIsCharging}
			class="inline w-6 h-6 md:w-8 md:h-8 mb-8" />

		<h2 class="inline">{Math.round(batteryLevel * 100)}%</h2>
	</div>
{/if}

<style lang="postcss">
	#primary-display {
		position: absolute;
		top: 25%;
		left: 0%;
		right: 0%;
		font-weight: var(--primary-font-weight);
	}
	#primary-display h1 {
		@apply text-7xl md:text-8xl lg:text-9xl xl:text-10xl tracking-widest text-center px-8 leading-tight;
	}
	#primary-display.datetime h1 {
		@apply text-5xl md:text-6xl lg:text-7xl;
	}
	#primary-display,
	#secondary-display {
		/* Set numbers to be monospace
		only works on some fonts, such as Bitter
		https://stackoverflow.com/a/56266636/4907950 */
		font-variant-numeric: tabular-nums;

		white-space: break-spaces;
	}
	#secondary-display {
		@apply pb-4;
	}
	#secondary-display h2,
	#battery-display h2 {
		@apply text-2xl md:text-3xl lg:text-4xl font-normal tracking-widest text-center;
	}
	#secondary-display,
	#battery-display {
		@apply absolute bottom-0;
	}
	#secondary-display {
		@apply left-0 w-full;
	}
	#battery-display {
		@apply right-8;
	}
</style>
