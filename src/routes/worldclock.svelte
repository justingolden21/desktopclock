<script>
	import { session } from '$app/stores';
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.worldclock}</title>
</svelte:head>

<h1 class="mt-16 text-3xl">{$session.languageDictionary.messages['Coming soon']}</h1>
