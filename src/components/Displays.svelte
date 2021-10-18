<script>
	import colors from 'tailwindcss/colors.js';

	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	import BatteryIcon from './BatteryIcon.svelte';
	import dayjs from 'dayjs';
	import { now } from './now.js';

	// approx 163kb (comment out and compare build sizes in network tab)
	import './all_locales.js';

	$: clockSettings = $session.settings.clock;

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

	// these update automatically with `$now`
	$: time = new dayjs($now).locale(clockSettings.datetimeLocale).format(timeFormat);
	$: date = new dayjs($now).locale(clockSettings.datetimeLocale).format(dateFormat);

	// TODO: starts an event listener each time displays.svelte is mounted, can add up
	// should unmount the event listener, look into svelte window access navigator
	onMount(() => {
		// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery
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

	$: colorPalette = colors[$session.settings.colorPalette];
	$: shade = $session.settings.darkMode ? 200 : 900;
</script>

<div style="color:{colorPalette[shade]}; display: flex">
	<div id="primary-display">
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

{#if displays.battery}
	<div id="battery-display">
		<BatteryIcon
			fillLevel={batteryLevel ? batteryLevel * 100 : 100}
			charging={batteryIsCharging}
			class="inline w-6 h-6 md:w-8 md:h-8"
		/>

		{batteryLevel * 100}%
	</div>
{/if}

<style>
	#primary-display {
		position: absolute;
		top: 25%;
		left: 0%;
		right: 0%;
	}
	#primary-display h1 {
		@apply text-7xl md:text-8xl lg:text-9xl font-bold tracking-widest text-center;
	}
	#secondary-display,
	#battery-display {
		@apply text-2xl md:text-3xl lg:text-4xl font-normal tracking-widest text-center pb-4;
	}
	#secondary-display {
		position: absolute;
		bottom: 0%;
		left: 0%;
		width: 100%;
	}
	#battery-display {
		position: absolute;
		bottom: 0%;
		right: 10%;
	}
</style>
