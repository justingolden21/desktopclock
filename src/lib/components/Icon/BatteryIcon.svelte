<script>
	import { onMount } from 'svelte';

	const batteryPath =
		'm9 5h-2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2a2 2 0 00-2-2h-2a2 2 0 00-2 2';
	const lightningPath = 'M13 10V3L4 14h7v7l9-11h-7z';

	let batteryLevel, batteryIsCharging;

	let batterySupported = false;
	let listeningToBattery = false;

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

{#if batterySupported}
	<svg
		class="inline w-6 h-6 md:w-8 md:h-8"
		stroke="currentColor"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 24 24">
		{@html batteryPath}

		<defs>
			<linearGradient id="fillLevelGradient" y2="0%" x2="0%" y1="100%" x1="0%"
				><stop stop-color="currentColor" offset={(batteryLevel ? batteryLevel * 100 : 100) + '%'} />
				<stop stop-color="transparent" offset="0%" />
			</linearGradient>
		</defs>

		<path
			fill-rule="evenodd"
			fill="url('#fillLevelGradient')"
			stroke-width="2"
			stroke-linejoin="round"
			d={batteryIsCharging ? batteryPath + lightningPath : batteryPath} />
	</svg>

	{Math.round(batteryLevel * 100)}%
{/if}
