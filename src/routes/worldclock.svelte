<script>
	import { session } from '$app/stores';

	import WorldclockHome from '../components/_Worldclock/WorldclockHome.svelte';
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.worldclock}</title>
</svelte:head>

<section>
	<WorldclockHome />
</section>
