<script>
	import { session } from '$app/stores';

	import Worldclocks from '../components/_Worldclock/Worldclocks.svelte';
	import Autocomplete from '../components/Autocomplete.svelte';
	import WorldclockTray from '../components/_Worldclock/WorldclockTray.svelte';

	import timezones from '../data/timezones';

	const timezoneArr = [];
	for (const zone of Object.keys(timezones)) {
		for (const tz of timezones[zone]) {
			timezoneArr.push((zone + '/' + tz).split('_').join(' '));
		}
	}
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.worldclock}</title>
</svelte:head>

<Autocomplete options={timezoneArr} />

<!-- 4rem is size of worldclock tray, keeps it stuck to bottom -->
<div class="p-16 min-h-[calc(100%-4rem)]">
	<Worldclocks />
</div>
<WorldclockTray />
