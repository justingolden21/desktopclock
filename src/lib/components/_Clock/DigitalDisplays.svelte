<script>
	import TailwindColors from 'tailwindcss/colors.js';

	import { onMount } from 'svelte';

	import { settings } from '$lib/stores/settings';

	/// COMPONENTS ///
	import { BatteryIcon, Icon } from '$lib/components/Icon';

	/// UITLS ///
	import { time, date } from '$lib/util/timeText';

	/// STATE ///
	$: clockSettings = $settings.clock;
	$: displays = clockSettings.displays;

	let batteryLevel, batteryIsCharging;
	let batterySupported = false;
	let listeningToBattery = false;

	// @see displayOptions in util/toggleDisplay
	$: primaryDisplayMap = {
		time: $time,
		date: $date,
		datetime: `${$time}\n${$date}`
	};
	$: secondaryDisplayMap = {
		time: $time,
		date: $date,
		datetime: `${$time}\n${$date}`
	};

	$: baseColorPalette = TailwindColors[$settings.baseColorPalette];
	$: accentColorPalette = TailwindColors[$settings.accentColorPalette];
	$: shade = $settings.darkMode ? 400 : 900;

	/// LIFECYCLE HOOKS ///
	onMount(async () => {
		// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery
		if (!(navigator && navigator.getBattery)) return;
		if (listeningToBattery) return;
		batterySupported = true;
		const battery = await navigator.getBattery();
		batteryLevel = battery.level;

		battery.addEventListener('levelchange', function () {
			batteryLevel = battery.level;
		});
		battery.addEventListener('chargingchange', function () {
			batteryIsCharging = battery.charging;
		});
		listeningToBattery = true;
	});
</script>

<div class="flex">
	<h1
		id="primary-display"
		style:--primary-font-weight={$settings.clock.datetimeFontWeight}
		style:color={displays.primaryPalette === 'base'
			? baseColorPalette[shade]
			: accentColorPalette[shade]}
		class={displays.primary + ' text-' + displays.primaryFontSize}>
		{#if displays.primary !== 'analog'}
			{primaryDisplayMap[displays.primary]}
		{/if}
	</h1>
	<h2
		id="secondary-display"
		style:color={displays.secondaryPalette === 'base'
			? baseColorPalette[shade]
			: accentColorPalette[shade]}
		class={'m-0 text-' + displays.secondaryFontSize}>
		{#if displays.secondary !== 'none'}
			{secondaryDisplayMap[displays.secondary]}
		{/if}
	</h2>
</div>

{#if displays.battery && batterySupported}
	<h2
		id="battery-display"
		class={'m-0 hidden sm:block text-' + displays.secondaryFontSize}
		style:color={displays.secondaryPalette === 'base'
			? baseColorPalette[shade]
			: accentColorPalette[shade]}>
		<BatteryIcon
			fillLevel={batteryLevel ? batteryLevel * 100 : 100}
			charging={batteryIsCharging}
			class="inline w-6 h-6 md:w-8 md:h-8" />

		{Math.round(batteryLevel * 100)}%
	</h2>
{/if}

<style lang="postcss">
	#primary-display {
		@apply top-[15%] short:top-[10%] supershort:top-[0%] tall:top-[20%] absolute left-0 right-0;
		font-weight: var(--primary-font-weight);
	}

	#primary-display {
		@apply tracking-widest text-center leading-snug px-8;
	}

	#primary-display.text-small {
		@apply text-6xl md:text-7xl lg:text-8xl xl:text-9xl;
		@apply supershort:text-4xl short:text-5xl supershort:md:text-6xl short:lg:text-7xl;
	}
	#primary-display {
		@apply text-7xl md:text-8xl lg:text-9xl xl:text-10xl;
		@apply supershort:text-5xl short:text-6xl supershort:md:text-7xl short:lg:text-8xl;
	}
	#primary-display.text-large {
		@apply text-8xl md:text-9xl lg:text-10xl xl:text-11xl;
		@apply supershort:text-6xl short:text-7xl supershort:md:text-8xl short:lg:text-9xl;
	}

	#primary-display.datetime.text-small {
		@apply text-4xl md:text-5xl lg:text-6xl;
	}
	#primary-display.datetime {
		@apply text-5xl md:text-6xl lg:text-7xl;
	}
	#primary-display.datetime.text-large {
		@apply text-6xl md:text-7xl lg:text-8xl;
	}

	#primary-display,
	#secondary-display {
		white-space: break-spaces;
	}

	#secondary-display,
	#battery-display {
		@apply font-normal tracking-widest text-center;
	}

	#secondary-display.text-small,
	#battery-display.text-small {
		@apply text-xl md:text-2xl lg:text-3xl;
	}
	#secondary-display,
	#battery-display {
		@apply text-2xl md:text-3xl lg:text-4xl;
	}
	#secondary-display.text-large,
	#battery-display.text-large {
		@apply text-3xl md:text-4xl lg:text-5xl;
	}

	#secondary-display,
	#battery-display {
		@apply absolute bottom-4 supershort:opacity-0;
	}
	#secondary-display {
		@apply left-0 w-full;
	}
	#battery-display {
		@apply right-8;
	}

	@font-face {
		font-family: 'technology';
		src: url('/font/technology/Technology-Bold.ttf') format('truetype');
	}

	.seven-segment {
		font-family: 'technology';
	}
</style>
