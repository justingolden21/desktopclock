<script>
	import { session } from '$app/stores';

	import Worldclocks from '../components/_Worldclock/Worldclocks.svelte';
	import WorldclockTray from '../components/_Worldclock/WorldclockTray.svelte';
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.worldclock}</title>
</svelte:head>

<div class="p-16">
	<Worldclocks />
</div>
<WorldclockTray />
