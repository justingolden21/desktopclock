<script>
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	$: displays = $session.settings.clock.displays;
	$: dateSettings = $session.settings.clock.dateSettings;
	$: timeSettings = $session.settings.clock.timeSettings;
	$: dateTimeSettings = $session.settings.clock.dateTimeSettings;

	let now = new Date();

	// TODO
	let lang = 'en';
	let options = {};

	// these update automatically with `now`
	$: date = now.toLocaleDateString(lang, dateSettings);
	$: time = now.toLocaleTimeString(lang, timeSettings);
	$: datetime = now.toLocaleString(lang, dateTimeSettings);

	$: timeout = timeSettings.second || dateTimeSettings.second ? 1000 : 1000 * 60;

	onMount(() => {
		const dateTimeInterval = setInterval(() => {
			now = new Date();
		}, timeout);

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
				{datetime}
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
				{datetime}
			{/if}
		</h2>
	{/if}
</div>

<style>
	#primary-display {
		position: absolute;
		top: 25%;
		width: 100%;
	}
	#primary-display h1 {
		@apply block text-7xl md:text-8xl lg:text-9xl font-bold tracking-widest text-center;
	}
	#secondary-display {
		position: absolute;
		bottom: 0%;
		left: 0%;
		width: 100%;
		@apply block text-2xl md:text-3xl lg:text-4xl font-normal tracking-widest text-center pb-4;
	}
</style>
