<script>
	import { session } from '$app/stores';

	import Worldclock from '../components/_Worldclock/Worldclock.svelte';
</script>

<svelte:head>
	<title>{$session.languageDictionary.pageNames.worldclock}</title>
</svelte:head>

<section>
	<Worldclock />
</section>
