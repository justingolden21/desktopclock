<script>
	import { session } from '$app/stores';

	import { settings } from '../components/settings';

	import Displays from '../components/_Clock/DigitalDisplays.svelte';
	import AnalogClock from '../components/_Clock/AnalogClock.svelte';
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.home}</title>
</svelte:head>

<section>
	<Displays />
	<AnalogClock theme={$settings.clock.theme} />
</section>
