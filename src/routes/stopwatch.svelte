<script>
	import { session } from '$app/stores';
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.stopwatch}</title>
</svelte:head>

<h1 class="mt-16 text-3xl">{$session.languageDictionary['Coming soon']}</h1>
