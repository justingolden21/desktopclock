<script>
	import { session } from '$app/stores';

	import { settings } from '$lib/stores/settings';

	import Displays from '$lib/components/_Clock/DigitalDisplays.svelte';
	import AnalogClock from '$lib/components/_Clock/AnalogClock.svelte';
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.home}</title>
</svelte:head>

<section>
	<Displays />

	<!-- by using `opacity-0` instead of `hidden` or `{#if}` it ensures the clock continues in the background
    so when switching to it, it continues moving instantly -->
	<div class:opacity-0={$settings.clock.displays.primary !== 'analog'}>
		<AnalogClock theme={$settings.clock.theme} />
	</div>
</section>
