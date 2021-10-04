<script>
	// TODO: implement date and datetime also. TODO: add modal from dayjs documentation table
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	import BatteryIcon from './BatteryIcon.svelte';
	import dayjs from 'dayjs';

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

	let now = new Date();

	// these update automatically with `now`
	$: time = new dayjs(now).locale(clockSettings.datetimeLocale).format(timeFormat);
	$: date = new dayjs(now).locale(clockSettings.datetimeLocale).format(dateFormat);

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

		const dateTimeInterval = setInterval(() => {
			now = new Date(); // update computed properties
		}, 1000); // browser is optimized anyway, no need to detect seconds

		return () => {
			clearInterval(dateTimeInterval);
		};
	});
</script>

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
		width: 100%;
	}
	#primary-display h1 {
		@apply block text-7xl md:text-8xl lg:text-9xl font-bold tracking-widest text-center;
	}
	#secondary-display,
	#battery-display {
		@apply block text-2xl md:text-3xl lg:text-4xl font-normal tracking-widest text-center pb-4;
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
