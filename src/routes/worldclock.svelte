<script>
	import { session } from '$app/stores';

	import Worldclocks from '$lib/components/_Worldclock/Worldclocks.svelte';
	// import TimezoneAutocomplete from '../components/TimezoneAutocomplete.svelte';
	import WorldclockTray from '$lib/components/_Worldclock/WorldclockTray.svelte';
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.worldclock}</title>
</svelte:head>

<!-- <TimezoneAutocomplete /> -->

<!-- 4rem is size of worldclock tray, keeps it stuck to bottom -->
<div class="p-16 min-h-[calc(100%-4rem)]">
	<Worldclocks />
</div>
<WorldclockTray />
