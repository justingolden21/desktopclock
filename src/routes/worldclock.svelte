<script>
	import { session } from '$app/stores';

	import Worldclocks from '../components/_Worldclock/Worldclocks.svelte';
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.worldclock}</title>
</svelte:head>

<Worldclocks />
