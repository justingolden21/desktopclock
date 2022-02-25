<script>
	export let fillLevel = -1;
	export let charging = false;

	const batteryPath =
		'm9 5h-2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2a2 2 0 00-2-2h-2a2 2 0 00-2 2';

	const lightningPath = 'M13 10V3L4 14h7v7l9-11h-7z';
</script>

<svg
	class={$$props.class}
	stroke="currentColor"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 24 24">
	{@html batteryPath}

	<defs>
		<linearGradient id="fillLevelGradient" y2="0%" x2="0%" y1="100%" x1="0%"
			><stop stop-color="currentColor" offset={fillLevel + '%'} />
			<stop stop-color="transparent" offset="0%" />
		</linearGradient>
	</defs>

	<path
		fill-rule="evenodd"
		fill="url('#fillLevelGradient')"
		stroke-width="2"
		stroke-linejoin="round"
		d={charging ? batteryPath + lightningPath : batteryPath} />
</svg>
